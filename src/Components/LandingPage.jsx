import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Verification.module.css";
import VerificationLayout from "./VerificationLayout";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/index";
import { sendOtp } from "../api/otp";
import {
  COUNTRY_CODE,
  getPendingMobile,
  isValidMobile,
  normalizeNumber,
  setPendingMobile,
  toFullNumber,
} from "../utils/mobile";

const LandingPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const navigate = useNavigate();
  const [number, setNumber] = useState(() => {
    const saved = normalizeNumber(getPendingMobile());
    return saved ? `0${saved}` : "";
  });
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!number.trim()) {
      setError(t.lpPage.emptyNumber);
      return;
    }
    const digits = normalizeNumber(number);
    if (!isValidMobile(digits)) {
      setError(t.lpPage.invalidNumber);
      return;
    }
    const fullNumber = toFullNumber(digits);
    setIsSending(true);
    try {
      await sendOtp(fullNumber);
      setPendingMobile(fullNumber);
      navigate("/otp");
    } catch {
      setError(t.lpPage.sendFailed);
      setIsSending(false);
    }
  };

  return (
    <VerificationLayout>
        <h1 className={styles.title}>{t.lpPage.title}</h1>
        <p className={styles.subtitle}>{t.lpPage.subtitle}</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputRow}>
            <span className={styles.prefix}>{COUNTRY_CODE}</span>
            <input
              className={styles.input}
              type="tel"
              inputMode="numeric"
              autoComplete="off"
              maxLength={11}
              placeholder="01XXXXXXXXX"
              aria-label={t.mobileModal.label}
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
              autoFocus
            />
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button type="submit" className={styles.button} disabled={isSending}>
            {isSending ? "..." : t.lpPage.next}
          </button>
        </form>

        <p className={styles.footerNote}>{t.lpPage.footer}</p>
    </VerificationLayout>
  );
};

export default LandingPage;
