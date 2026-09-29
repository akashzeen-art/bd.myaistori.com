import React, { useEffect, useRef, useState } from "react";
import styles from "./VoiceRecording.module.css";
import mikeVideo from "../assets/Images/mikevideo.mp4";
import voiceVideo from "../assets/Images/video3.mp4";
const HERO_VIDEO_URL = "https://vz-347babc2-229.b-cdn.net/f608bb0a-b3a1-4cd2-aa8d-2e170a217380/play_480p.mp4";
import { FaMicrophone, FaEdit, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { sendStoryPrompt } from "../api/stories";
import StoryModal from "./StoryModal";
import { useLanguage } from "../contexts/LanguageContext";
import { useMobileGate } from "../contexts/MobileGateContext";
import { translations } from "../translations/index";

// Import all story images
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

const VoiceRecording = ({ onBack }) => {
  const { language } = useLanguage();
  const { requireMobile } = useMobileGate();
  const t = translations[language] || translations.EN;
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("Your AI Story");
  const [selectedCategory, setSelectedCategory] = useState("action");
  const [isGenerating, setIsGenerating] = useState(false);

  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");
  const sttSupported = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const [liveTranscript, setLiveTranscript] = useState("");

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

  // Sample featured stories
  const featuredStories = [
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

  const startVoiceRecognition = () => {
    if (!sttSupported) return;
    
    if (isRecording) {
      stopVoiceRecognition();
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'BN' ? 'bn-BD' : 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    transcriptRef.current = "";
    setLiveTranscript("");
    setIsRecording(true);

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      transcriptRef.current = transcript;
      setLiveTranscript(transcript);
      setInputValue(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = async () => {
      setIsRecording(false);
      const prompt = (transcriptRef.current || inputValue).trim();
      if (prompt) {
        setIsGenerating(true);
        const text = await sendStoryPrompt(prompt, language.toLowerCase());
        setIsGenerating(false);
        if (text) {
          setModalTitle(prompt);
          setModalText(text);
          setModalOpen(true);
        }
      }
      setLiveTranscript("");
    };

    recognitionRef.current = recognition;
    try { recognition.start(); } catch (_) {}
  };

  const stopVoiceRecognition = () => {
    const r = recognitionRef.current;
    if (r) {
      try { r.stop(); } catch (_) {}
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredStories = selectedCategory === "all" 
    ? featuredStories 
    : featuredStories.filter(story => story.category === selectedCategory);

  return (
    <>
      <video className={styles.videoBackground} src={HERO_VIDEO_URL} autoPlay muted loop playsInline />
      <div className={styles.videoOverlay} />
      <div className={styles.voicePage}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Back">
        <FaArrowLeft />
      </button>
      <div className={styles.contentWrapper}>
        <div className={styles.leftSection}>
          <div className={styles.heading}>{t.voiceRecording.listening}</div>
          <div className={styles.waveContainer}>
            <video
              className={styles.waveVideo}
              src={mikeVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className={styles.micBtnWrapper}>
              <button
                className={`${styles.micBtn} ${isRecording ? styles.micActive : ""}`}
                aria-label={isRecording ? "Click to stop" : "Click to speak"}
                onClick={startVoiceRecognition}
              >
                <FaMicrophone />
              </button>
            </div>
            <div className={styles.listenStatus}>
              <span className={`${styles.dot} ${isRecording ? styles.dotOn : ""}`}></span>
              <span className={styles.statusText}>{isRecording ? t.voiceRecording.listeningStatus : t.voiceRecording.clickToSpeak || "Click to speak"}</span>
            </div>
            {liveTranscript && (
              <div className={styles.liveTranscript}>{liveTranscript}</div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Preloader */}
      {isGenerating && (
        <div className={styles.preloader}>
          <div className={styles.preloaderContent}>
            <div className={styles.spinner}></div>
            <p className={styles.preloaderText}>{t.voiceRecording.preparingChat}</p>
          </div>
        </div>
      )}

      {/* Story Suggestions Section */}
      <div className={styles.suggestionsSection}>
        <h2 className={styles.suggestionsTitle}>{t.voiceRecording.featuredStories}</h2>
        
        {/* Category Filter */}
        <div className={styles.categoryFilter}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                selectedCategory === category.id ? styles.categoryButtonActive : ""
              }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryName}>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Story Cards */}
        <div className={styles.storiesGrid}>
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className={styles.storyCard}
              onClick={() => requireMobile(() => {
                setInputValue(language === "BN"
                  ? `"${story.title}" নিয়ে একটি ${t.storyModal.categories[story.category] || story.category} গল্প তৈরি করুন`
                  : `Create a ${story.category} story about ${story.title}`);
                setShowInput(true);
              })}
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

      {/* Bottom dock text search */}
      <div className={styles.inputPopup} style={{ display: showInput ? 'flex' : 'none' }}>
        <div className={styles.inputTitle}>{t.voiceRecording.sendToAI}</div>
        <div className={styles.inputSubtitle}>{t.voiceRecording.storyPrompt}</div>
        <div className={styles.inputRow}>
          <input
            className={styles.textInput}
            type="text"
            placeholder={t.voiceRecording.typePlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className={styles.sendBtn}
            aria-label="Send"
            onClick={async () => {
              const prompt = inputValue.trim();
              if (!prompt) return;
              setIsGenerating(true);
              const text = await sendStoryPrompt(prompt, language.toLowerCase());
              setIsGenerating(false);
              if (text) {
                setModalTitle(prompt);
                setModalText(text);
                setModalOpen(true);
              }
            }}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <button
        className={styles.editBtn}
        aria-label={showInput ? t.voiceRecording.close : t.voiceRecording.createStory}
        aria-expanded={showInput}
        onClick={() => setShowInput((v) => !v)}
        style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 120, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', width: 'auto' }}
      >
        <FaEdit /> {showInput ? t.voiceRecording.close : t.voiceRecording.createStory}
      </button>
      <StoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preferredTitle={modalTitle}
        rawText={modalText}
      />
    </div>
    </>
  );
};

export default VoiceRecording;