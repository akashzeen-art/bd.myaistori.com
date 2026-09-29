import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Verification.module.css";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/index";
import { OTP_LENGTH, getDemoOtp, isDemoOtp, sendOtp, verifyOtp } from "../api/otp";
import { getPendingMobile, setPendingMobile, setVerifiedMobile } from "../utils/mobile";

const RESEND_SECONDS = 30;

const OtpPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const navigate = useNavigate();
  const [mobile] = useState(getPendingMobile);
  const [digits, setDigits] = useState(() => Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [demoCode, setDemoCode] = useState(() => (isDemoOtp ? getDemoOtp(mobile) : null));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  if (!mobile) return <Navigate to="/lp-page" replace />;

  const focusBox = (index) => inputRefs.current[index]?.focus();

  const fillFrom = (index, value) => {
    const incoming = value.replace(/\D/g, "").slice(0, OTP_LENGTH - index).split("");
    if (!incoming.length) return;
    setDigits((prev) => {
      const next = [...prev];
      incoming.forEach((d, i) => { next[index + i] = d; });
      return next;
    });
    focusBox(Math.min(index + incoming.length, OTP_LENGTH - 1));
  };

  const handleChange = (index, value) => {
    setError("");
    if (!value) {
      setDigits((prev) => prev.map((d, i) => (i === index ? "" : d)));
      return;
    }
    fillFrom(index, value);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      setDigits((prev) => prev.map((d, i) => (i === index - 1 ? "" : d)));
      focusBox(index - 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusBox(index - 1);
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusBox(index + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = digits.join("");
    if (otp.length !== OTP_LENGTH) {
      setError(t.otpPage.incompleteOtp);
      return;
    }
    setIsVerifying(true);
    setInfo("");
    try {
      if (await verifyOtp(mobile, otp)) {
        setVerifiedMobile(mobile);
        setPendingMobile(null);
        navigate("/thankyou", { replace: true, state: { mobile } });
        return;
      }
      setError(t.otpPage.invalidOtp);
    } catch {
      setError(t.otpPage.invalidOtp);
    }
    setIsVerifying(false);
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    try {
      await sendOtp(mobile);
      setDigits(Array(OTP_LENGTH).fill(""));
      if (isDemoOtp) setDemoCode(getDemoOtp(mobile));
      setSecondsLeft(RESEND_SECONDS);
      setInfo(t.otpPage.resent);
      focusBox(0);
    } catch {
      setError(t.lpPage.sendFailed);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.cardTitle}>{t.otpPage.title}</h1>
        <p className={styles.cardSubtitle}>
          {t.otpPage.subtitle}
          <span className={styles.mobileText}>{mobile}</span>
        </p>

        {demoCode && (
          <p className={styles.demoNotice}>
            {t.otpPage.demoNotice}
            <span className={styles.demoCode}>{demoCode}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.otpRow}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={OTP_LENGTH}
                className={`${styles.otpBox} ${error ? styles.inputError : ""}`}
                aria-label={t.otpPage.digitLabel.replace("{n}", index + 1)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={(e) => e.target.select()}
                autoFocus={index === 0}
              />
            ))}
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          {info && !error && <p className={styles.info}>{info}</p>}
          <button type="submit" className={styles.submitButton} disabled={isVerifying}>
            {isVerifying ? t.otpPage.verifying : t.otpPage.verify}
          </button>
        </form>

        <div className={styles.linkRow}>
          <button type="button" className={styles.linkButton} onClick={() => navigate("/lp-page")}>
            {t.otpPage.changeNumber}
          </button>
          <button
            type="button"
            className={styles.linkButton}
            onClick={handleResend}
            disabled={secondsLeft > 0}
          >
            {secondsLeft > 0
              ? t.otpPage.resendIn.replace("{seconds}", secondsLeft)
              : t.otpPage.resend}
          </button>
        </div>
      </section>
    </main>
  );
};

export default OtpPage;
