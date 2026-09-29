import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Verification.module.css";
import VerificationLayout from "./VerificationLayout";
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
  const [barFull, setBarFull] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setBarFull(true));
    return () => cancelAnimationFrame(frame);
  }, []);

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

  const [welcomeBefore, welcomeAfter] = t.thankYouPage.welcome.split("{brand}");
  const [redirectBefore, redirectAfter] = t.thankYouPage.redirecting.split("{seconds}");

  return (
    <VerificationLayout>
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h1 className={styles.successTitle}>{t.thankYouPage.title}</h1>
        <p className={styles.successMsg}>
          {t.thankYouPage.verified}<br />
          {welcomeBefore}<strong>MyAiStori</strong>{welcomeAfter}<br />
          {t.thankYouPage.access}
        </p>

        <div className={styles.progressWrap}>
          <div
            className={styles.progressBar}
            style={{ width: barFull ? "100%" : "0%", transitionDuration: `${REDIRECT_SECONDS}s` }}
          />
        </div>
        <p className={styles.redirectMsg} aria-live="polite">
          {redirectBefore}<strong>{secondsLeft}</strong>{redirectAfter}
        </p>

        <button type="button" className={styles.button} onClick={() => navigate("/", { replace: true })}>
          {t.thankYouPage.goNow}
        </button>
    </VerificationLayout>
  );
};

export default ThankYouPage;
