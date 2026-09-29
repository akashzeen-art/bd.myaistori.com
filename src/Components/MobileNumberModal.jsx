import React, { useEffect, useState } from "react";
import styles from "./MobileNumberModal.module.css";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/index";
import { COUNTRY_CODE, isValidMobile, normalizeNumber, toFullNumber } from "../utils/mobile";

const MobileNumberModal = ({ isOpen, onClose, onSubmit }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNumber("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const digits = normalizeNumber(number);
    if (!isValidMobile(digits)) {
      setError(t.mobileModal.invalidNumber);
      return;
    }
    onSubmit(toFullNumber(digits));
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label={t.mobileModal.close}>
          ×
        </button>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{t.mobileModal.title}</h2>
          <p className={styles.modalSubtitle}>{t.mobileModal.subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="mobileNumber" className={styles.label}>{t.mobileModal.label}</label>
          <div className={`${styles.phoneRow} ${error ? styles.phoneRowError : ""}`}>
            <span className={styles.countryCode}>🇧🇩 {COUNTRY_CODE}</span>
            <input
              id="mobileNumber"
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
          <button type="submit" className={styles.submitButton}>
            {t.mobileModal.continue}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MobileNumberModal;
