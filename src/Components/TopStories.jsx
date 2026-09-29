import React, { useState } from "react";
import styles from "./TopStories.module.css";
import { useLanguage } from "../contexts/LanguageContext";
import { useMobileGate } from "../contexts/MobileGateContext";
import { translations } from "../translations/index";
import StoryModal from "./StoryModal";

// Images
import stormborn from "../assets/Images/Fantasy/Stormborn.jpg";
import codeBlack from "../assets/Images/action/Code-Black.jpg";
import chronRewind from "../assets/Images/SciFi/Chron-Rewind.jpg";
import room404 from "../assets/Images/Horror/Room-404.jpg";
import clockmakerSecret from "../assets/Images/FairyTale/The-Clockmaker-Secret.jpg";
import midnightCaller from "../assets/Images/Mystery/Midnigh-Caller.jpg";

const TopStories = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const { requireMobile } = useMobileGate();

  const openStory = (story) => requireMobile(() => {
    setModalCategory(story.categoryKey);
    setModalTitle(story.title);
    setModalOpen(true);
  });

  const topStories = [
    {
      id: "stormborn",
      title: t.topStories.titles.stormborn,
      categoryKey: "fantasy",
      category: t.topStories.categories.fantasy,
      image: stormborn,
      rating: 4.9,
      readCount: "12.5K",
      description: t.topStories.stories.stormborn,
    },
    {
      id: "code-black",
      title: t.topStories.titles.codeBlack,
      categoryKey: "action",
      category: t.topStories.categories.action,
      image: codeBlack,
      rating: 4.8,
      readCount: "10.2K",
      description: t.topStories.stories.codeBlack,
    },
    {
      id: "chron-rewind",
      title: t.topStories.titles.chronRewind,
      categoryKey: "scifi",
      category: t.topStories.categories.scifi,
      image: chronRewind,
      rating: 4.7,
      readCount: "9.8K",
      description: t.topStories.stories.chronRewind,
    },
    {
      id: "room-404",
      title: t.topStories.titles.room404,
      categoryKey: "horror",
      category: t.topStories.categories.horror,
      image: room404,
      rating: 4.6,
      readCount: "8.9K",
      description: t.topStories.stories.room404,
    },
    {
      id: "clockmaker-secret",
      title: t.topStories.titles.clockmakerSecret,
      categoryKey: "drama",
      category: t.topStories.categories.drama,
      image: clockmakerSecret,
      rating: 4.9,
      readCount: "11.3K",
      description: t.topStories.stories.clockmakerSecret,
    },
    {
      id: "midnight-caller",
      title: t.topStories.titles.midnightCaller,
      categoryKey: "mystery",
      category: t.topStories.categories.mystery,
      image: midnightCaller,
      rating: 4.5,
      readCount: "7.6K",
      description: t.topStories.stories.midnightCaller,
    },
  ];

  return (
    <>
      <section className={styles.topStoriesSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>{t.topStories.title}</h2>
            <p className={styles.subtitle}>
              {t.topStories.subtitle}
            </p>
          </div>

          <div className={styles.storiesGrid}>
            {topStories.map((story, index) => (
              <div
                key={story.id}
                className={styles.storyCard}
                onClick={() => openStory(story)}
              >
                <div className={styles.rankBadge}>#{index + 1}</div>
                <div className={styles.imageContainer}>
                  <img src={story.image} alt={story.title} className={styles.storyImage} />
                  <div className={styles.overlay}>
                    <div className={styles.playButton}>
                      <span className={styles.playIcon}>▶</span>
                    </div>
                  </div>
                </div>

                <div className={styles.storyContent}>
                  <div className={styles.storyMainContent}>
                    <div className={styles.categoryTag}>{story.category}</div>
                    <h3 className={styles.storyTitle}>{story.title}</h3>
                    <p className={styles.storyDescription}>{story.description}</p>

                    <div className={styles.storyStats}>
                      <div className={styles.rating}>
                        <span className={styles.star}>⭐</span>
                        <span className={styles.ratingText}>{story.rating}</span>
                      </div>
                      <div className={styles.readCount}>
                        <span className={styles.readIcon}>👁️</span>
                        <span className={styles.readText}>{story.readCount}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className={styles.readButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      openStory(story);
                    }}
                  >
                    {t.topStories.readStory}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.viewAllSection}>
            <a href="/stories" className={styles.viewAllButton}>
              {t.topStories.viewAllTopStories}
            </a>
          </div>
        </div>
      </section>

      <StoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        category={modalCategory}
        preferredTitle={modalTitle}
      />
    </>
  );
};

export default TopStories;
