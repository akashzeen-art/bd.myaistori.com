import React, { useState } from "react";
import styles from "./StorySeries.module.css";
import actionJpg from "../assets/Images/action.jpg";
import fantasyJpg from "../assets/Images/fantasy.jpg";
import scifiJpg from "../assets/Images/scifi.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useMobileGate } from "../contexts/MobileGateContext";
import { translations } from "../translations/index";

const StorySeries = () => {
  const { language } = useLanguage();
  const { requireMobile } = useMobileGate();
  const navigate = useNavigate();
  const t = translations[language] || translations.EN;
  
  // Define the data for each story type
  const STORY_TYPES = [
    {
      id: "action",
      title: t.storySeries.storyTypes.action,
      image: actionJpg,
      description: t.storySeries.descriptions.action
    },
    {
      id: "drama",
      title: t.storySeries.storyTypes.drama,
      image: fantasyJpg,
      description: t.storySeries.descriptions.drama
    },
    {
      id: "romantic",
      title: t.storySeries.storyTypes.romantic,
      image: scifiJpg,
      description: t.storySeries.descriptions.romantic
    },
  ];
  
  // State to track which story type is currently selected
  const [selectedStory, setSelectedStory] = useState(STORY_TYPES[0]);

  const handleSelectStory = (storyId) => {
    const story = STORY_TYPES.find(s => s.id === storyId);
    setSelectedStory(story);
  };

  return (
    <section className={styles.storySeriesSection}>
      <div className={styles.seriesContent}>
        {/* Left Section - AI Story Generation Content */}
        <div className={styles.leftSection}>
          <div className={styles.marketingContent}>
            <h1 className={styles.mainHeadline}>
              {t.storySeries.mainHeadline}
            </h1>
            <p className={styles.marketingDescription}>
              {t.storySeries.marketingDescription}
            </p>
            <button className={styles.startFreeBtn}>
              <a
                className="text-decoration-none"
                href="/stories"
                onClick={(e) => { e.preventDefault(); requireMobile(() => navigate("/stories")); }}
              >   {t.storySeries.startCreatingStories}</a>
           
            </button>
            <div className={styles.separator}></div>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <span className={styles.benefitNumber}>{t.storySeries.aiPowered}</span>
                <span className={styles.benefitText}>{t.storySeries.poweredStoryCreation}</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.benefitNumber}>{t.storySeries.unlimitedIdeas}</span>
                <span className={styles.benefitText}>{t.storySeries.unlimitedStoryIdeas}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Story Showcase Interface */}
        <div className={styles.rightSection}>
          <div className={styles.videoHeader}>
            <div className={styles.videoTitle}>
              <span className={styles.tvIcon}>📚</span>
              {t.storySeries.aiStoryGenerator}
            </div>
            <a
              href="/voice"
              className={styles.getStartedBtn}
              onClick={(e) => { e.preventDefault(); requireMobile(() => navigate("/voice")); }}
            >
              {t.storySeries.createNewStory}
            </a>
          </div>
          
          <div className={styles.mainVideoPlayer}>
            <div className={styles.videoContainer}>
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className={styles.mainVideo}
              />
              {/* Story type overlay at bottom */}
              <div className={styles.storyTitleOverlay}>
                <div className={styles.storyInfo}>
                  <span className={styles.storyTitle}>{selectedStory.title}</span>
                  <span className={styles.storyDescription}>{selectedStory.description}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.episodeThumbnails}>
            {STORY_TYPES.map((story) => (
              <div
                key={story.id}
                className={`${styles.thumbnailCard} ${selectedStory.id === story.id ? styles.active : ''}`}
                onClick={() => requireMobile(() => handleSelectStory(story.id))}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className={styles.thumbnailImage}
                />
                <div className={styles.thumbnailLabel}>{story.title}</div>
              </div>
            ))}
            {/* Generate More Stories Card */}
            <div as={Link} to="/stories" className={styles.viewMoreCard}>
              <div className={styles.viewMoreImageArea}>
                <div className={styles.viewMoreIcon}>✨</div>
              </div>
              <div  className={styles.viewMoreLabel}>{t.storySeries.generateMore}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySeries;