import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Verification.module.css";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/index";
import { getVerifiedMobile } from "../utils/mobile";

const REDIRECT_SECONDS = 5;

const ThankYouPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const navigate = useNavigate();
  const [mobile] = useState(getVerifiedMobile);
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (!mobile) return;
    if (secondsLeft <= 0) {
      navigate("/", { replace: true });
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [mobile, secondsLeft, navigate]);

  if (!mobile) return <Navigate to="/lp-page" replace />;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h1 className={styles.cardTitle}>{t.thankYouPage.title}</h1>
        <p className={styles.cardSubtitle}>{t.thankYouPage.message.replace("{mobile}", mobile)}</p>
        <p className={styles.cardSubtitle} aria-live="polite">
          {t.thankYouPage.redirecting.replace("{seconds}", secondsLeft)}
        </p>
        <button
          type="button"
          className={styles.submitButton}
          onClick={() => navigate("/", { replace: true })}
        >
          {t.thankYouPage.goNow}
        </button>
      </section>
    </main>
  );
};

export default ThankYouPage;
