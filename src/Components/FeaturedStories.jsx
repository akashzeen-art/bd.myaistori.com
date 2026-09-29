import React, { useState, useRef } from "react";
import StoryModal from "./StoryModal";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useMobileGate } from "../contexts/MobileGateContext";
import { translations } from "../translations/index";
import styles from "./FeaturedStories.module.css";

// Import featured story images
import phoenixReborn from "../assets/Images/Fantasy/The-Phoenix-Reborn.jpg";
import digitalGhost from "../assets/Images/SciFi/Digital-Ghost.jpg";
import dollMaker from "../assets/Images/Horror/The-Doll-Maker.jpg";
import mirrorClue from "../assets/Images/Mystery/The-Mirror-Clue.jpg";
import featherMoonBird from "../assets/Images/FairyTale/The-Feather-of-the-Moon-Bird.jpg";
import skyfallRescue from "../assets/Images/action/Skyfall-Rescue.jpg";

const FeaturedStories = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const { requireMobile } = useMobileGate();

  const openStory = (story) => requireMobile(() => {
    setModalCategory(story.categoryKey);
    setModalTitle(story.title);
    setModalOpen(true);
  });

  const featuredStories = [
    {
      id: "phoenix-reborn",
      title: t.featuredStories.titles.phoenixReborn,
      categoryKey: "fantasy",
      category: t.topStories.categories.fantasy,
      image: phoenixReborn,
      author: "AI teller",
      duration: `15 ${t.common.minRead}`,
      description: t.featuredStories.descriptions.phoenixReborn,
      featured: true,
      tags: ["Epic", "Magic", "Redemption"]
    },
    {
      id: "digital-ghost",
      title: t.featuredStories.titles.digitalGhost,
      categoryKey: "scifi",
      category: t.topStories.categories.scifi,
      image: digitalGhost,
      author: "AI teller",
      duration: `12 ${t.common.minRead}`,
      description: t.featuredStories.descriptions.digitalGhost,
      featured: true,
      tags: ["AI", "Consciousness", "Philosophy"]
    },
    {
      id: "doll-maker",
      title: t.featuredStories.titles.dollMaker,
      categoryKey: "horror",
      category: t.topStories.categories.horror,
      image: dollMaker,
      author: "AI teller",
      duration: `18 ${t.common.minRead}`,
      description: t.featuredStories.descriptions.dollMaker,
      featured: true,
      tags: ["Supernatural", "Creepy", "Mystery"]
    },
    {
      id: "mirror-clue",
      title: t.featuredStories.titles.mirrorClue,
      categoryKey: "mystery",
      category: t.topStories.categories.mystery,
      image: mirrorClue,
      author: "AI teller",
      duration: `14 ${t.common.minRead}`,
      description: t.featuredStories.descriptions.mirrorClue,
      featured: true,
      tags: ["Investigation", "Supernatural", "Clues"]
    },
    {
      id: "feather-moon-bird",
      title: t.featuredStories.titles.featherMoonBird,
      categoryKey: "romantic",
      category: t.stories.categories.romantic,
      image: featherMoonBird,
      author: "AI teller",
      duration: `16 ${t.common.minRead}`,
      description: t.featuredStories.descriptions.featherMoonBird,
      featured: true,
      tags: ["Magic", "Adventure", "Wishes"]
    },
    {
      id: "skyfall-rescue",
      title: t.featuredStories.titles.skyfallRescue,
      categoryKey: "action",
      category: t.topStories.categories.action,
      image: skyfallRescue,
      author: "AI teller",
      duration: `13 ${t.common.minRead}`,
      description: t.featuredStories.descriptions.skyfallRescue,
      featured: true,
      tags: ["Adventure", "Rescue", "Thriller"]
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredStories.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredStories.length - 3 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
    <section className={styles.featuredStoriesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{t.featuredStories.title}</h2>
            <div className={styles.badge}>{t.featuredStories.editorsChoice}</div>
          </div>
          <p className={styles.subtitle}>
            {t.featuredStories.subtitle}
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <button 
            className={styles.navButton} 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          
          <div className={styles.carouselWrapper}>
            <div 
              className={styles.carouselTrack}
              ref={carouselRef}
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`
              }}
            >
              {featuredStories.map((story, index) => (
                <div
                  key={story.id}
                  className={styles.storyCard}
                  onClick={() => openStory(story)}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={story.image}
                      alt={story.title}
                      className={styles.storyImage}
                    />
                    <div className={styles.overlay}>
                      <div className={styles.playButton}>
                        <span className={styles.playIcon}>▶</span>
                      </div>
                    </div>
                    {story.featured && (
                      <div className={styles.featuredBadge}>
                        <span className={styles.starIcon}>⭐</span>
                        {t.featuredStories.featured}
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.storyContent}>
                    <div className={styles.categoryRow}>
                      <span className={styles.category}>{story.category}</span>
                      <span className={styles.duration}>{story.duration}</span>
                    </div>
                    
                    <h3 className={styles.storyTitle}>{story.title}</h3>
                    <p className={styles.author}>{t.featuredStories.by} {story.author}</p>
                    <p className={styles.description}>{story.description}</p>
                    
                    <div className={styles.tagsContainer}>
                      {story.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className={styles.actionRow}>
                      <button
                        className={styles.readButton}
                        onClick={(e) => { e.stopPropagation(); openStory(story); }}
                      >
                        {t.featuredStories.readNow}
                      </button>
                      <button className={styles.bookmarkButton}>
                        <span className={styles.bookmarkIcon}>🔖</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className={styles.navButton} 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        <div className={styles.carouselDots}>
          {Array.from({ length: Math.ceil(featuredStories.length / 3) }, (_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>{t.featuredStories.readyToCreate}</h3>
            <p className={styles.ctaText}>
              {t.featuredStories.readyToCreateSubtitle}
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="/voice"
                className={styles.primaryButton}
                onClick={(e) => { e.preventDefault(); requireMobile(() => navigate("/voice")); }}
              >
                {t.featuredStories.startCreating}
              </a>
              <a href="/stories" className={styles.secondaryButton}>
                {t.featuredStories.exploreMoreStories}
              </a>
            </div>
          </div>
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

export default FeaturedStories;
