import React, { useState } from "react";
import StoryModal from "./StoryModal";
import { useLanguage } from "../contexts/LanguageContext";
import { useMobileGate } from "../contexts/MobileGateContext";
import { translations } from "../translations/index";
import styles from "./Stories.module.css";
const HERO_VIDEO_URL = "https://vz-347babc2-229.b-cdn.net/f608bb0a-b3a1-4cd2-aa8d-2e170a217380/play_480p.mp4";

// Import all category images
import actionJpg from "../assets/Images/action.jpg";
import fantasyJpg from "../assets/Images/fantasy.jpg";
import scifiJpg from "../assets/Images/scifi.jpg";
import horrorJpg from "../assets/Images/horror.jpg";
import mysteryJpg from "../assets/Images/Mystery.jpeg";
import fairyTaleJpg from "../assets/Images/FairyTale.jpg";

// Import individual story images for each category
import codeBlack from "../assets/Images/action/Code-Black.jpg";
import garageAmbush from "../assets/Images/action/Garage-Ambush.jpg";
import midnightChase from "../assets/Images/action/Midnight-Chase.jpg";
import skyfallRescue from "../assets/Images/action/Skyfall-Rescue.jpg";
import tunnelEscape from "../assets/Images/action/The-Tunnel-Escape.jpg";
import trainDanger from "../assets/Images/action/Train-to-Danger.jpg";

import stormborn from "../assets/Images/Fantasy/Stormborn.jpg";
import crystalTime from "../assets/Images/Fantasy/The-Crystal-o-Time.jpg";
import cursePrince from "../assets/Images/Fantasy/The-Curse-prince.jpg";
import mirrorGate from "../assets/Images/Fantasy/The-Mirror-Gate.jpg";
import phoenixReborn from "../assets/Images/Fantasy/The-Phoenix-Reborn.jpg";
import whispersForest from "../assets/Images/Fantasy/Whispers-of-the-Forest.jpg";

import chronRewind from "../assets/Images/SciFi/Chron-Rewind.jpg";
import digitalGhost from "../assets/Images/SciFi/Digital-Ghost.jpg";
import echoesTitan from "../assets/Images/SciFi/Echoes-of-Titan.jpg";
import neuroNet from "../assets/Images/SciFi/NeuroNet.jpg";
import starlightSeed from "../assets/Images/SciFi/Starligh-Seed.jpg";
import androidsDilemma from "../assets/Images/SciFi/The-Androids-Dilemma.jpg";

import room404 from "../assets/Images/Horror/Room-404.jpg";
import sleepParalysis from "../assets/Images/Horror/Sleep-Paralysis.jpg";
import dollMaker from "../assets/Images/Horror/The-Doll-Maker.jpg";
import lastPhotograph from "../assets/Images/Horror/The-Last-Photograph.jpg";
import shadowMan from "../assets/Images/Horror/The-Shadow-Man.jpg";
import voicesWell from "../assets/Images/Horror/Voices-in-the-Well.jpg";

import midnightCaller from "../assets/Images/Mystery/Midnigh-Caller.jpg";
import disappearingVillage from "../assets/Images/Mystery/The-Disappearing-Village.jpg";
import mirrorClue from "../assets/Images/Mystery/The-Mirror-Clue.jpg";
import silentWitness from "../assets/Images/Mystery/The-Silent-Witness.jpg";
import vanishingTrain from "../assets/Images/Mystery/The-Vanishing-Train.jpg";
import whispersLibrary from "../assets/Images/Mystery/Whispers-in-the-Library.jpg";

// Import Fairy Tale images with safe variable names
import clockmakerSecretImg from "../assets/Images/FairyTale/The-Clockmaker-Secret.jpg";
import featherMoonBirdImg from "../assets/Images/FairyTale/The-Feather-of-the-Moon-Bird.jpg";
import invisibleBridgeImg from "../assets/Images/FairyTale/The-Invisible-Bridge.jpg";
import snowFoxImg from "../assets/Images/FairyTale/The-Snow-Fox.jpg";
import tailorTalkingCatImg from "../assets/Images/FairyTale/The-Tailor-and-the-Talking-Cat.jpg";
import threeWishesImg from "../assets/Images/FairyTale/The-Three-Wishes.jpg";

const Stories = () => {
  const { language } = useLanguage();
  const { requireMobile } = useMobileGate();
  const t = translations[language] || translations.EN;
  const [selectedCategory, setSelectedCategory] = useState("action");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  // Define categories with their data
  const categories = [

    {
      id: "action",
      name: t.stories.categories.action,
      icon: "⚔️",
      image: actionJpg
    },
    {
      id: "fantasy",
      name: t.stories.categories.fantasy,
      icon: "🐉",
      image: fantasyJpg
    },
    {
      id: "scifi",
      name: t.stories.categories.scifi,
      icon: "🚀",
      image: scifiJpg
    },
    {
      id: "horror",
      name: t.stories.categories.horror,
      icon: "👻",
      image: horrorJpg
    },
    {
      id: "mystery",
      name: t.stories.categories.mystery,
      icon: "🔍",
      image: mysteryJpg
    },
    {
      id: "drama",
      name: t.stories.categories.drama,
      icon: "🎭",
      image: fairyTaleJpg
    },
    {
      id: "romantic",
      name: t.stories.categories.romantic,
      icon: "💖",
      image: fairyTaleJpg
    }
  ];

  // Define stories for each category
  const allStories = [
    // Action Stories
    {
      id: "code-black",
      title: t.voiceRecording.storyTitles.codeBlack,
      category: "action",
      image: codeBlack,
      tags: ["Action", "Technology", "Thriller"]
    },
    {
      id: "garage-ambush",
      title: t.voiceRecording.storyTitles.garageAmbush,
      category: "action",
      image: garageAmbush,
      tags: ["Action", "Suspense", "Urban"]
    },
    {
      id: "midnight-chase",
      title: t.voiceRecording.storyTitles.midnightChase,
      category: "action",
      image: midnightChase,
      tags: ["Action", "Night", "Pursuit"]
    },
    {
      id: "skyfall-rescue",
      title: t.voiceRecording.storyTitles.skyfallRescue,
      category: "action",
      image: skyfallRescue,
      tags: ["Action", "Rescue", "Adventure"]
    },
    {
      id: "tunnel-escape",
      title: t.voiceRecording.storyTitles.tunnelEscape,
      category: "action",
      image: tunnelEscape,
      tags: ["Action", "Escape", "Thriller"]
    },
    {
      id: "train-danger",
      title: t.voiceRecording.storyTitles.trainDanger,
      category: "action",
      image: trainDanger,
      tags: ["Action", "Train", "Adventure"]
    },
    // Fantasy Stories
    {
      id: "stormborn",
      title: t.voiceRecording.storyTitles.stormborn,
      category: "fantasy",
      image: stormborn,
      tags: ["Fantasy", "Magic", "Epic"]
    },
    {
      id: "crystal-time",
      title: t.voiceRecording.storyTitles.crystalTime,
      category: "fantasy",
      image: crystalTime,
      tags: ["Fantasy", "Time", "Magic"]
    },
    {
      id: "curse-prince",
      title: t.voiceRecording.storyTitles.cursePrince,
      category: "fantasy",
      image: cursePrince,
      tags: ["Fantasy", "Curse", "Royalty"]
    },
    {
      id: "mirror-gate",
      title: t.voiceRecording.storyTitles.mirrorGate,
      category: "fantasy",
      image: mirrorGate,
      tags: ["Fantasy", "Portal", "Adventure"]
    },
    {
      id: "phoenix-reborn",
      title: t.voiceRecording.storyTitles.phoenixReborn,
      category: "fantasy",
      image: phoenixReborn,
      tags: ["Fantasy", "Phoenix", "Rebirth"]
    },
    {
      id: "whispers-forest",
      title: t.voiceRecording.storyTitles.whispersForest,
      category: "fantasy",
      image: whispersForest,
      tags: ["Fantasy", "Nature", "Mystery"]
    },
    // Sci-Fi Stories
    {
      id: "chron-rewind",
      title: t.voiceRecording.storyTitles.chronRewind,
      category: "scifi",
      image: chronRewind,
      tags: ["Sci-Fi", "Time Travel", "Technology"]
    },
    {
      id: "digital-ghost",
      title: t.voiceRecording.storyTitles.digitalGhost,
      category: "scifi",
      image: digitalGhost,
      tags: ["Sci-Fi", "Digital", "Mystery"]
    },
    {
      id: "echoes-titan",
      title: t.voiceRecording.storyTitles.echoesTitan,
      category: "scifi",
      image: echoesTitan,
      tags: ["Sci-Fi", "Space", "Adventure"]
    },
    {
      id: "neur-net",
      title: t.voiceRecording.storyTitles.neuroNet,
      category: "scifi",
      image: neuroNet,
      tags: ["Sci-Fi", "AI", "Technology"]
    },
    {
      id: "starlight-seed",
      title: t.voiceRecording.storyTitles.starlightSeed,
      category: "scifi",
      image: starlightSeed,
      tags: ["Sci-Fi", "Space", "Discovery"]
    },
    {
      id: "androids-dilemma",
      title: t.voiceRecording.storyTitles.androidsDilemma,
      category: "scifi",
      image: androidsDilemma,
      tags: ["Sci-Fi", "AI", "Philosophy"]
    },
    // Horror Stories
    {
      id: "room-404",
      title: t.voiceRecording.storyTitles.room404,
      category: "horror",
      image: room404,
      tags: ["Horror", "Mystery", "Supernatural"]
    },
    {
      id: "sleep-paralysis",
      title: t.voiceRecording.storyTitles.sleepParalysis,
      category: "horror",
      image: sleepParalysis,
      tags: ["Horror", "Psychological", "Nightmare"]
    },
    {
      id: "doll-maker",
      title: t.voiceRecording.storyTitles.dollMaker,
      category: "horror",
      image: dollMaker,
      tags: ["Horror", "Creepy", "Supernatural"]
    },
    {
      id: "last-photograph",
      title: t.voiceRecording.storyTitles.lastPhotograph,
      category: "horror",
      image: lastPhotograph,
      tags: ["Horror", "Mystery", "Supernatural"]
    },
    {
      id: "shadow-man",
      title: t.voiceRecording.storyTitles.shadowMan,
      category: "horror",
      image: shadowMan,
      tags: ["Horror", "Supernatural", "Dark"]
    },
    {
      id: "voices-well",
      title: t.voiceRecording.storyTitles.voicesWell,
      category: "horror",
      image: voicesWell,
      tags: ["Horror", "Supernatural", "Mystery"]
    },
    // Mystery Stories
    {
      id: "midnight-caller",
      title: t.voiceRecording.storyTitles.midnightCaller,
      category: "mystery",
      image: midnightCaller,
      tags: ["Mystery", "Suspense", "Thriller"]
    },
    {
      id: "disappearing-village",
      title: t.voiceRecording.storyTitles.disappearingVillage,
      category: "mystery",
      image: disappearingVillage,
      tags: ["Mystery", "Supernatural", "Village"]
    },
    {
      id: "mirror-clue",
      title: t.voiceRecording.storyTitles.mirrorClue,
      category: "mystery",
      image: mirrorClue,
      tags: ["Mystery", "Clues", "Investigation"]
    },
    {
      id: "silent-witness",
      title: t.voiceRecording.storyTitles.silentWitness,
      category: "mystery",
      image: silentWitness,
      tags: ["Mystery", "Witness", "Crime"]
    },
    {
      id: "vanishing-train",
      title: t.voiceRecording.storyTitles.vanishingTrain,
      category: "mystery",
      image: vanishingTrain,
      tags: ["Mystery", "Train", "Disappearance"]
    },
    {
      id: "whispers-library",
      title: t.voiceRecording.storyTitles.whispersLibrary,
      category: "mystery",
      image: whispersLibrary,
      tags: ["Mystery", "Library", "Supernatural"]
    },
    // Drama Stories (replacing Fairy Tale)
    {
      id: "clockmaker-secret",
      title: t.voiceRecording.storyTitles.clockmakerSecret,
      category: "drama",
      image: clockmakerSecretImg,
      tags: ["Drama", "Mystery", "Emotional"]
    },
    {
      id: "invisible-bridge",
      title: t.voiceRecording.storyTitles.invisibleBridge,
      category: "drama",
      image: invisibleBridgeImg,
      tags: ["Drama", "Journey", "Hope"]
    },
    {
      id: "three-wishes",
      title: t.voiceRecording.storyTitles.threeWishes,
      category: "drama",
      image: threeWishesImg,
      tags: ["Drama", "Choices", "Fate"]
    },
    // Romantic Stories
    {
      id: "feather-moon-bird",
      title: t.voiceRecording.storyTitles.featherMoonBird,
      category: "romantic",
      image: featherMoonBirdImg,
      tags: ["Romantic", "Magic", "Adventure"]
    },
    {
      id: "snow-fox",
      title: t.voiceRecording.storyTitles.snowFox,
      category: "romantic",
      image: snowFoxImg,
      tags: ["Romantic", "Winter", "Heartwarming"]
    },
    {
      id: "tailor-talking-cat",
      title: t.voiceRecording.storyTitles.tailorTalkingCat,
      category: "romantic",
      image: tailorTalkingCatImg,
      tags: ["Romantic", "Whimsical", "Companionship"]
    }
  ];

  // Filter stories based on selected category
  const filteredStories = selectedCategory === "all" 
    ? allStories 
    : allStories.filter(story => story.category === selectedCategory);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
      <video className={styles.videoBackground} src={HERO_VIDEO_URL} autoPlay muted loop playsInline />
      <div className={styles.videoOverlay} />
      <div className={styles.storiesContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1 className={styles.mainTitle}>{t.stories.mainTitle}</h1>
        <p className={styles.subtitle}>
          {t.stories.subtitle}
        </p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Left Sidebar - Categories */}
        <div className={styles.sidebar}>
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <div
                key={category.id}
                className={`${styles.categoryItem} ${
                  selectedCategory === category.id ? styles.active : ""
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                {/* <span className={styles.categoryIcon}>{category.icon}</span> */}
                <span className={styles.categoryName}>{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Story Cards */}
        <div className={styles.mainContent}>
          <div className={styles.storiesGrid}>
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className={styles.storyCard}
                onClick={() => requireMobile(() => { setModalCategory(story.category); setModalTitle(story.title); setModalOpen(true); })}
              >
                <div className={styles.storyImageContainer}>
                  <img
                    src={story.image}
                    alt={story.title}
                    className={styles.storyImage}
                  />
                  <div className={styles.playOverlay}>
                    <div className={styles.playButton}>
                      <span className={styles.playIcon}>▶</span>
                      <span className={styles.playText}>Smart Chat</span>
                    </div>
                  </div>
                </div>
                <div className={styles.storyInfo}>
                  <h3 className={styles.storyTitle}>{story.title}</h3>
                  <div className={styles.storyTags}>
                    {story.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {t.voiceRecording.tags[tag] || tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <StoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        category={modalCategory}
        preferredTitle={modalTitle}
      />
    </div>
    </>
  );
};

export default Stories;
