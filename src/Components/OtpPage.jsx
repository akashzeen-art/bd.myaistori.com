import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Verification.module.css";
import VerificationLayout from "./VerificationLayout";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/index";
import { OTP_LENGTH, sendOtp, verifyOtp } from "../api/otp";
import { COUNTRY_CODE, getPendingMobile, normalizeNumber, setPendingMobile, setVerifiedMobile } from "../utils/mobile";

const RESEND_SECONDS = 30;

const maskMobile = (fullNumber) => {
  const digits = normalizeNumber(fullNumber);
  return `${COUNTRY_CODE} ${digits.slice(0, 2)}XXXXXX${digits.slice(-2)}`;
};

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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfo("");
    const otp = digits.join("");
    if (otp.length !== OTP_LENGTH) {
      setError(t.otpPage.incompleteOtp);
      return;
    }
    setIsVerifying(true);
    try {
      if (await verifyOtp(mobile, otp)) {
        setVerifiedMobile(mobile);
        setPendingMobile(null);
        navigate("/thankyou", { replace: true });
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
      setSecondsLeft(RESEND_SECONDS);
      setInfo(t.otpPage.resent);
      focusBox(0);
    } catch {
      setError(t.lpPage.sendFailed);
    }
  };

  const [subtitleBefore, subtitleAfter] = t.otpPage.subtitle.split("{mobile}");

  return (
    <VerificationLayout>
        <h1 className={styles.title}>{t.otpPage.title}</h1>
        <p className={styles.subtitle}>
          {subtitleBefore}<strong>{maskMobile(mobile)}</strong>{subtitleAfter}
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.otpBoxes}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                className={styles.otpBox}
                type="tel"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={OTP_LENGTH}
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
          <button type="submit" className={styles.button} disabled={isVerifying}>
            {isVerifying ? "..." : t.otpPage.verify}
          </button>
        </form>

        <div className={styles.resendRow}>
          {t.otpPage.notReceived}{" "}
          <button type="button" className={styles.resendBtn} onClick={handleResend} disabled={secondsLeft > 0}>
            {t.otpPage.resend}
          </button>
          {secondsLeft > 0 && ` (${secondsLeft}s)`}
        </div>

        <button type="button" className={styles.backLink} onClick={() => navigate("/lp-page")}>
          {t.otpPage.changeNumber}
        </button>
    </VerificationLayout>
  );
};

export default OtpPage;
