import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Verification.module.css";
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
  const [number, setNumber] = useState(() => normalizeNumber(getPendingMobile()));
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const digits = normalizeNumber(number);
    if (!isValidMobile(digits)) {
      setError(t.mobileModal.invalidNumber);
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
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <section className={styles.hero}>
          <span className={styles.badge}>{t.lpPage.badge}</span>
          <h1 className={styles.heroTitle}>{t.lpPage.title}</h1>
          <p className={styles.heroSubtitle}>{t.lpPage.subtitle}</p>
          <ul className={styles.benefits}>
            {t.lpPage.benefits.map((benefit) => (
              <li key={benefit}>
                <span className={styles.check}>✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>{t.mobileModal.title}</h2>
          <p className={styles.cardSubtitle}>{t.mobileModal.subtitle}</p>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="lpMobileNumber" className={styles.label}>{t.mobileModal.label}</label>
            <div className={`${styles.phoneRow} ${error ? styles.inputError : ""}`}>
              <span className={styles.countryCode}>🇧🇩 {COUNTRY_CODE}</span>
              <input
                id="lpMobileNumber"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={14}
                className={styles.input}
                placeholder={t.mobileModal.placeholder}
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value.replace(/[^\d\s-]/g, ""));
                  if (error) setError("");
                }}
                autoFocus
              />
            </div>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" className={styles.submitButton} disabled={isSending}>
              {isSending ? t.lpPage.sending : t.lpPage.getOtp}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
