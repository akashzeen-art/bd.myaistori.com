import React from "react";
import styles from "./Features.module.css";
import { 
  FaMagic, FaMicrophoneAlt, FaPenNib, FaLanguage, FaClock, FaCloud, 
  FaShieldAlt, FaBolt, FaGlobe, FaStar, FaPlay
} from "react-icons/fa";
import { FaWandMagicSparkles, FaWaveSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useMobileGate } from "../contexts/MobileGateContext";
import { translations } from "../translations/index";
const HERO_VIDEO_URL = "https://vz-347babc2-229.b-cdn.net/f608bb0a-b3a1-4cd2-aa8d-2e170a217380/play_480p.mp4";

const Features = () => {
  const { language } = useLanguage();
  const { requireMobile } = useMobileGate();
  const navigate = useNavigate();
  const t = translations[language] || translations.EN;

  const features = [
    { icon: <FaMicrophoneAlt />, title: t.features.featureList.voiceFirst.title, desc: t.features.featureList.voiceFirst.desc },
    { icon: <FaPenNib />, title: t.features.featureList.textPrompting.title, desc: t.features.featureList.textPrompting.desc },
    { icon: <FaMagic />, title: t.features.featureList.styleTone.title, desc: t.features.featureList.styleTone.desc },
    { icon: <FaLanguage />, title: t.features.featureList.multilingual.title, desc: t.features.featureList.multilingual.desc },
    { icon: <FaClock />, title: t.features.featureList.realtimeDrafts.title, desc: t.features.featureList.realtimeDrafts.desc },
    { icon: <FaCloud />, title: t.features.featureList.cloudSave.title, desc: t.features.featureList.cloudSave.desc },
    { icon: <FaShieldAlt />, title: t.features.featureList.safeByDefault.title, desc: t.features.featureList.safeByDefault.desc },
    { icon: <FaBolt />, title: t.features.featureList.fastRendering.title, desc: t.features.featureList.fastRendering.desc },
    { icon: <FaGlobe />, title: t.features.featureList.shareAnywhere.title, desc: t.features.featureList.shareAnywhere.desc }
  ];

  const steps = [
    { step: 1, title: t.features.steps.tell.title, desc: t.features.steps.tell.desc, icon: <FaMicrophoneAlt /> },
    { step: 2, title: t.features.steps.tweak.title, desc: t.features.steps.tweak.desc, icon: <FaStar /> },
    { step: 3, title: t.features.steps.enjoy.title, desc: t.features.steps.enjoy.desc, icon: <FaPlay /> }
  ];
  return (
    <>
      <video className={styles.videoBackground} src={HERO_VIDEO_URL} autoPlay muted loop playsInline />
      <div className={styles.videoOverlay} />
      <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>{t.features.heroTitle}</h1>
          <p className={styles.subtitle}>{t.features.heroSubtitle}</p>
          <div className={styles.heroButtons}>
            <a href="/voice" className={styles.primaryBtn} onClick={(e) => { e.preventDefault(); requireMobile(() => navigate("/voice")); }}>{t.features.startForFree}</a>
            <a href="/stories" className={styles.secondaryBtn}>{t.features.exploreStories}</a>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHead}>
          <h2>{t.features.coreFeatures}</h2>
          <p>{t.features.coreFeaturesSubtitle}</p>
        </div>
        <div className={styles.grid}>
          {features.map((f, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardIcon}>{f.icon}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className={styles.howSection}>
        <div className={styles.sectionHead}>
          <h2>{t.features.howItWorks}</h2>
          <p>{t.features.howItWorksSubtitle}</p>
        </div>
        <div className={styles.steps}>
          {steps.map((s) => (
            <div key={s.step} className={styles.stepCard}>
              <div className={styles.stepBadge}>{s.step}</div>
              <div className={styles.stepIcon}>{s.icon}</div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h3 className={styles.ctaTitle}>{t.features.readyToCreate}</h3>
          <p className={styles.ctaText}>{t.features.readyToCreateSubtitle}</p>
          <div className={styles.heroButtons}>
            <a href="/voice" className={styles.primaryBtn} onClick={(e) => { e.preventDefault(); requireMobile(() => navigate("/voice")); }}>{t.features.startForFree}</a>
            <a href="/faq" className={styles.secondaryBtn}>{t.features.questions}</a>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Features;
