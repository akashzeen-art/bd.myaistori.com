import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
const HERO_VIDEO_URL = "https://vz-347babc2-229.b-cdn.net/f608bb0a-b3a1-4cd2-aa8d-2e170a217380/play_480p.mp4";
import { useLanguage } from "../contexts/LanguageContext";
import { useMobileGate } from "../contexts/MobileGateContext";
import { translations } from "../translations/index";
import TopStories from "./TopStories";
import FeaturedStories from "./FeaturedStories";
import StorySeries from "./StorySeries";
import FAQ from "./FAQ";
import TransformSection from "./TransformSection";
import VoiceRecording from "./VoiceRecording";

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const { requireMobile } = useMobileGate();
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showVoice, setShowVoice] = useState(false);

  const WORDS = [
    { text: t.home.words.action, color: "#ff4c4c" },
    { text: t.home.words.fantasy, color: "#ff9f1c" },
    { text: t.home.words.scifi, color: "#2ec4b6" },
    { text: t.home.words.mystery, color: "#8338ec" },
    { text: t.home.words.horror, color: "#ff006e" },
    { text: t.home.words.fairytale, color: "#3a86ff" },
  ];

  useEffect(() => {
    let timeoutId;
    const currentWord = WORDS[wordIndex].text;
    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex <= currentWord.length) {
      setDisplayText(currentWord.substring(0, charIndex));
      timeoutId = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
    }
    else if (!isDeleting && charIndex > currentWord.length) {
      timeoutId = setTimeout(() => setIsDeleting(true), 1000);
    }
    else if (isDeleting && charIndex > 0) {
      setDisplayText(currentWord.substring(0, charIndex));
      timeoutId = setTimeout(() => setCharIndex((c) => c - 1), typingSpeed);
    }
    else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((w) => (w + 1) % WORDS.length);
      timeoutId = setTimeout(() => setCharIndex(1), 200);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, wordIndex, language]);

  const currentColor = WORDS[wordIndex].color;

  if (showVoice) {
    return <VoiceRecording onBack={() => setShowVoice(false)} />;
  }

  return (
    <>
      <section className={styles.heroSection} aria-label="Hero">
        <video
          className={styles.videoBackground}
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        <div className={styles.overlay} aria-hidden="true" />

        <div className={styles.heroContent}>
          <h1 className={styles.mainHeading}>
            {t.home.mainHeading}
            <span
              className={styles.typeWrapper}
              style={{ color: currentColor }}
              aria-live="polite"
            >
              {displayText}
              <span className={styles.cursor} aria-hidden="true">
                |
              </span>
            </span>
          </h1>

          <p className={styles.subHeading}>
            {t.home.subHeading}
          </p>

          <div className={styles.btnGroup}>
            <button onClick={() => requireMobile(() => setShowVoice(true))} className={styles.ctaBtnPrimary}>
              {t.home.startForFree}
            </button>
          </div>
        </div>
      </section>
      
      <TopStories />
      <FeaturedStories />
      <StorySeries />
      <FAQ />
      <TransformSection />
    </>
  );
};

export default Home;