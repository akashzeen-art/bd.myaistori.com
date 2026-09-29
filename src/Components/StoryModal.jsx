import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import styles from "./StoryModal.module.css";
import { fetchStoriesByCategory, pickMatchingStory } from "../api/stories";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/index";

const DEFAULT_TYPING_SPEED_MS = 14;

// ─── helpers ────────────────────────────────────────────────────────────────

const joinStoryText = (story) => {
  if (!story) return "";
  const title    = story.title    || story.name    || story.heading  || "";
  const subtitle = story.subTitle || story.subtitle|| story.tagline  || "";
  const body     = story.dsc || story.desc || story.description ||
                   story.story || story.content || story.text || story.body || "";
  return `${title ? title + "\n" : ""}${subtitle ? subtitle + "\n\n" : ""}${body}`.trim();
};

// ─── voice config ────────────────────────────────────────────────────────────
// gender field is used to pick Male vs Female when both share the same lang tag

const VOICE_OPTIONS = [
  { id: "default",      label: "Default Voice",                   group: "EN", lang: null,    gender: null, nameMatch: null                    },
  { id: "en-us",        label: "Google US English (en-US)",        group: "EN", lang: "en-US", gender: null, nameMatch: "Google US English"     },
  { id: "bn",           label: "Bangla (bn-BD)",                   group: "BN", lang: "bn-BD", gender: null, nameMatch: null                    },
];

const BENGALI_SCRIPT = /[\u0980-\u09FF]/;

// ─── voice resolution ─────────────────────────────────────────────────────────
/**
 * Given the full list of browser voices and a VOICE_OPTIONS entry,
 * return the best matching SpeechSynthesisVoice.
 *
 * Priority:
 *  1. Exact lang match + gender keyword in name
 *  2. Exact lang match (first available)
 *  3. Prefix lang match  (e.g. "fr" matches "fr-CA")
 *  4. null  (browser default)
 */
const resolveVoice = (browserVoices, opt) => {
  if (!opt || !opt.lang) return null;

  const langPrefix = opt.lang.split("-")[0].toLowerCase();
  const exactLang  = browserVoices.filter(v => v.lang === opt.lang);
  const prefixLang = browserVoices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));

  let resolved = null;

  // Step 1: exact full name match
  if (opt.nameMatch) {
    resolved = browserVoices.find(v => v.name === opt.nameMatch) || null;
  }

  // Step 2: partial name match (e.g. nameMatch="Google UK English Female" inside longer name)
  if (!resolved && opt.nameMatch) {
    resolved = browserVoices.find(v => v.name.includes(opt.nameMatch)) || null;
  }

  // Step 3: gender keyword in name within exact lang pool
  if (!resolved && opt.gender && exactLang.length > 0) {
    resolved = exactLang.find(v => v.name.toLowerCase().includes(opt.gender.toLowerCase())) || null;
  }

  // Step 4: gender keyword in name within prefix lang pool
  if (!resolved && opt.gender && prefixLang.length > 0) {
    resolved = prefixLang.find(v => v.name.toLowerCase().includes(opt.gender.toLowerCase())) || null;
  }

  // Step 5: index-based for en-GB — sort by name so Female < Male alphabetically, then pick by index
  if (!resolved && opt.gender && exactLang.length > 1) {
    const sorted = [...exactLang].sort((a, b) => a.name.localeCompare(b.name));
    // After sort: "Google UK English Female" comes before "Google UK English Male"
    resolved = opt.gender === "male" ? sorted[sorted.length - 1] : sorted[0];
  }

  // Step 6: single exact lang match
  if (!resolved && exactLang.length === 1) resolved = exactLang[0];

  // Step 7: prefix match fallback
  if (!resolved) resolved = prefixLang[0] || null;

  console.log("en-GB voices available:", exactLang.map(v => v.name));
  console.log("Resolved:", opt.id, "->", resolved?.name || "none", "(", resolved?.lang, ")");

  return resolved;
};

// ─── speech helpers ───────────────────────────────────────────────────────────

// Most Windows/desktop browsers ship without a Bangla speech voice, so Bangla
// text is read with Google's online TTS instead. It only accepts ~200 chars per
// request and rejects requests that carry a Referer header.
const ONLINE_TTS_URL = "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob";
const ONLINE_TTS_CHUNK = 180;
let onlineSession = null;

const splitForOnlineTts = (text) => {
  const sentences = text.replace(/\s+/g, " ").match(/[^।.!?]+[।.!?]*/g) || [];
  const chunks = [];
  let current = "";
  sentences.forEach((sentence) => {
    let piece = sentence.trim();
    while (piece.length > ONLINE_TTS_CHUNK) {
      const cut = piece.lastIndexOf(" ", ONLINE_TTS_CHUNK);
      const at = cut > 0 ? cut : ONLINE_TTS_CHUNK;
      if (current) { chunks.push(current); current = ""; }
      chunks.push(piece.slice(0, at));
      piece = piece.slice(at).trim();
    }
    const joined = current ? `${current} ${piece}` : piece;
    if (joined.length > ONLINE_TTS_CHUNK) {
      chunks.push(current);
      current = piece;
    } else {
      current = joined;
    }
  });
  if (current) chunks.push(current);
  return chunks.filter(Boolean);
};

const loadWithoutReferrer = (audio, src) => {
  const meta = document.createElement("meta");
  meta.name = "referrer";
  meta.content = "no-referrer";
  document.head.appendChild(meta);
  const cleanup = () => meta.remove();
  audio.addEventListener("loadedmetadata", cleanup, { once: true });
  audio.addEventListener("error", cleanup, { once: true });
  audio.src = src;
  audio.load();
};

const speakOnline = (text, lang, rate) => {
  const chunks = splitForOnlineTts(text);
  const session = { audio: new Audio(), cancelled: false, index: 0 };
  onlineSession = session;
  const { audio } = session;

  const playNext = () => {
    if (session.cancelled || session.index >= chunks.length) return;
    const chunk = chunks[session.index++];
    loadWithoutReferrer(audio, `${ONLINE_TTS_URL}&tl=${lang}&q=${encodeURIComponent(chunk)}`);
    audio.playbackRate = typeof rate === "number" ? rate : 1;
    audio.play().catch((e) => console.warn("Online TTS error:", e));
  };

  audio.onended = playNext;
  audio.onerror = playNext;
  playNext();
};

const stopSpeaking = () => {
  if (onlineSession) {
    onlineSession.cancelled = true;
    onlineSession.audio.pause();
    onlineSession.audio.removeAttribute("src");
    onlineSession = null;
  }
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
};

const pauseSpeaking = () => {
  if (onlineSession) onlineSession.audio.pause();
  if (window.speechSynthesis?.speaking) window.speechSynthesis.pause();
};

const resumeSpeaking = () => {
  if (onlineSession && onlineSession.audio.paused && onlineSession.audio.src) {
    onlineSession.audio.play().catch(() => {});
  }
  if (window.speechSynthesis?.paused) window.speechSynthesis.resume();
};

const speakText = (text, voice, langBcp47, rate, pitch) => {
  if (!window.speechSynthesis || !text) return null;

  const synth = window.speechSynthesis;
  synth.cancel();

  // Chrome bug: after cancel(), voice assignment is ignored on the very next speak().
  // Fix: queue a silent dummy utterance first, then speak the real one.
  // The dummy utterance "warms up" the engine so the real voice is respected.
  const dummy = new SpeechSynthesisUtterance(" ");
  dummy.volume = 0;
  dummy.onend = () => {
    const freshVoices = synth.getVoices();
    // Match by name first; fall back to gender keyword search within same lang
    let freshVoice = voice
      ? freshVoices.find(v => v.name === voice.name) || null
      : null;
    if (!freshVoice && voice) {
      const langPrefix = voice.lang?.split("-")[0].toLowerCase();
      const sameLang = freshVoices.filter(v => v.lang.toLowerCase().startsWith(langPrefix || ""));
      const genderHint = voice.name.toLowerCase().includes("female") ? "female"
                       : voice.name.toLowerCase().includes("male")   ? "male"
                       : null;
      if (genderHint) {
        freshVoice = sameLang.find(v => v.name.toLowerCase().includes(genderHint)) || null;
      }
      if (!freshVoice) freshVoice = sameLang[0] || null;
    }

    const utter  = new SpeechSynthesisUtterance(text);
    utter.rate   = typeof rate  === "number" ? rate  : 1;
    utter.pitch  = typeof pitch === "number" ? pitch : 1;

    if (freshVoice) {
      utter.voice = freshVoice;
      utter.lang  = freshVoice.lang;
    } else {
      utter.lang  = langBcp47 || "en-US";
    }

    console.log("Speaking with:", utter.voice?.name || "default", "| lang:", utter.lang);

    const isLatinLang = /^(en|fr|es|de|it|pt)/.test(utter.lang);
    let keepAlive = null;
    if (isLatinLang) {
      keepAlive = setInterval(() => {
        if (!synth.speaking) { clearInterval(keepAlive); return; }
        synth.pause();
        synth.resume();
      }, 10000);
    }
    utter.onend   = () => { if (keepAlive) clearInterval(keepAlive); };
    utter.onerror = (e) => { if (keepAlive) clearInterval(keepAlive); console.warn("TTS error:", e.error); };

    synth.speak(utter);
  };

  setTimeout(() => synth.speak(dummy), 100);
  return null;
};

// ─── voice loader hook ────────────────────────────────────────────────────────

const useSpeechVoices = () => {
  const [voices, setVoices] = useState([]);
  const [supported] = useState(() => typeof window !== "undefined" && !!window.speechSynthesis);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const load = () => {
      const v = synth.getVoices();
      if (v.length) setVoices(v);
    };

    // Immediate attempt
    load();

    // onvoiceschanged fires in Chrome when voices are ready
    synth.onvoiceschanged = load;

    // Polling fallback for browsers that don't fire onvoiceschanged
    let tries = 0;
    const poll = setInterval(() => {
      const v = synth.getVoices();
      if (v.length) { setVoices(v); clearInterval(poll); }
      else if (++tries > 20) clearInterval(poll);
    }, 150);

    return () => {
      clearInterval(poll);
      try { synth.onvoiceschanged = null; } catch (_) {}
    };
  }, []);

  const refreshVoices = useCallback(() => {
    const v = window.speechSynthesis?.getVoices() || [];
    if (v.length) {
      setVoices(v);
      // Log ALL available voices so we can see exactly what the browser has
      console.log("=== ALL AVAILABLE BROWSER VOICES ===");
      v.forEach((voice, i) => console.log(`${i}: ${voice.name} | ${voice.lang} | local: ${voice.localService}`));
    }
  }, []);

  return { voices, refreshVoices, supported };
};

// ─── StoryModal ───────────────────────────────────────────────────────────────

const StoryModal = ({ isOpen, onClose, category, preferredTitle, rawText }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;

  const [isLoading,        setIsLoading]        = useState(false);
  const [stories,          setStories]          = useState([]);
  const [activeIndex,      setActiveIndex]      = useState(0);
  const [typedText,        setTypedText]        = useState("");
  const [isTyping,         setIsTyping]         = useState(true);
  const [typingSpeed,      setTypingSpeed]      = useState(DEFAULT_TYPING_SPEED_MS);
  const [speakEnabled,     setSpeakEnabled]     = useState(false);
  const [speechRate,       setSpeechRate]       = useState(() => Number(localStorage.getItem("story_voice_rate"))  || 1);
  const [speechPitch,      setSpeechPitch]      = useState(() => Number(localStorage.getItem("story_voice_pitch")) || 1);
  const [selectedVoiceId,  setSelectedVoiceId]  = useState(() => localStorage.getItem("story_voice_id") || "default");
  const [originalPrompt,   setOriginalPrompt]   = useState("");
  const [generatedStories, setGeneratedStories] = useState([]);

  const { voices, refreshVoices, supported } = useSpeechVoices();

  const typingTimerRef      = useRef(null);
  const currentUtteranceRef = useRef(null);
  const loadedLanguageRef   = useRef(null);
  const activeIndexRef      = useRef(0);
  activeIndexRef.current = activeIndex;

  // Active VOICE_OPTIONS entry
  const activeVoiceOption = useMemo(
    () => VOICE_OPTIONS.find(v => v.id === selectedVoiceId) || VOICE_OPTIONS[0],
    [selectedVoiceId]
  );

  // Resolved browser SpeechSynthesisVoice — recomputed whenever voices load or option changes
  const resolvedVoice = useMemo(
    () => resolveVoice(voices, activeVoiceOption),
    [voices, activeVoiceOption]
  );

  const handleVoiceChange = useCallback((voiceId) => {
    setSelectedVoiceId(voiceId);
    localStorage.setItem("story_voice_id", voiceId);
    // If voice is on, restart speech with new voice immediately
    if (speakEnabled) {
      stopSpeaking();
      setSpeakEnabled(false); // will re-enable via effect after state settles
    }
  }, [speakEnabled]);

  // ── story text ───────────────────────────────────────────────────────────────
  const activeStory = generatedStories[activeIndex]
    || stories[activeIndex]
    || (rawText ? { title: preferredTitle || t.storyModal.story, dsc: rawText } : null);

  const fullText = useMemo(() => {
    if (generatedStories[activeIndex]) return generatedStories[activeIndex].dsc;
    return rawText ? String(rawText) : joinStoryText(activeStory);
  }, [activeStory, rawText, generatedStories, activeIndex]);

  // ── load stories ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) {
      loadedLanguageRef.current = null;
      return;
    }
    let mounted = true;
    setIsLoading(true);
    setTypedText("");
    setIsTyping(true);
    stopSpeaking();
    setSpeakEnabled(false);

    if (rawText) {
      setStories([]);
      setActiveIndex(0);
      setGeneratedStories([{ title: preferredTitle || t.storyModal.story, dsc: rawText }]);
      setIsLoading(false);
      setOriginalPrompt(preferredTitle || "");
      return;
    }

    setGeneratedStories([]);
    fetchStoriesByCategory(category, language.toLowerCase())
      .then((list) => {
        if (!mounted) return;
        const normalize = (s) => ({
          ...s,
          title:    s?.title    || s?.name    || s?.heading  || "",
          subTitle: s?.subTitle || s?.subtitle|| s?.tagline  || "",
          dsc:      s?.dsc || s?.desc || s?.description || s?.story ||
                    s?.content || s?.text || s?.body || "",
        });
        const ordered = Array.isArray(list) ? list.map(normalize) : [];
        // English and Bangla story lists share the same order, so a language switch
        // while the modal is open keeps the reader on the same story.
        const languageSwitched = loadedLanguageRef.current && loadedLanguageRef.current !== language;
        loadedLanguageRef.current = language;
        if (languageSwitched && activeIndexRef.current < ordered.length) {
          setStories(ordered);
          setActiveIndex(activeIndexRef.current);
          return;
        }
        const first = pickMatchingStory(ordered, preferredTitle);
        const startIndex = first ? ordered.findIndex(s => s === first) : 0;
        setStories(ordered);
        setActiveIndex(Math.max(0, startIndex));
      })
      .finally(() => mounted && setIsLoading(false));

    return () => { mounted = false; };
  }, [isOpen, category, preferredTitle, rawText, language]);

  // ── reset typing + speech when story changes ─────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    setTypedText("");
    setIsTyping(true);
    stopSpeaking();
    setSpeakEnabled(false);
  }, [fullText, isOpen]);

  // ── typing animation ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !isTyping || !fullText) return;
    if (typedText.length >= fullText.length) { setIsTyping(false); return; }
    const t = setTimeout(() => setTypedText(prev => prev + fullText[prev.length]), typingSpeed);
    typingTimerRef.current = t;
    return () => clearTimeout(t);
  }, [typedText, isTyping, typingSpeed, fullText, isOpen]);

  // ── speak when speakEnabled / rate / pitch / voice changes ───────────────────
  useEffect(() => {
    if (!isOpen || !speakEnabled || !fullText) return;

    const isBangla  = BENGALI_SCRIPT.test(fullText);
    const langBcp47 = isBangla ? "bn-BD" : (activeVoiceOption.lang || "en-US");

    stopSpeaking();
    if (isBangla) {
      const banglaVoice = resolvedVoice?.lang?.toLowerCase().startsWith("bn")
        ? resolvedVoice
        : resolveVoice(voices, VOICE_OPTIONS.find(v => v.id === "bn"));
      if (banglaVoice) speakText(fullText, banglaVoice, langBcp47, speechRate, speechPitch);
      else speakOnline(fullText, "bn", speechRate);
    } else {
      currentUtteranceRef.current = speakText(fullText, resolvedVoice, langBcp47, speechRate, speechPitch);
    }
    return () => stopSpeaking();
  }, [speakEnabled, resolvedVoice, voices, speechRate, speechPitch, fullText, isOpen, activeVoiceOption]);

  // ── handlers ─────────────────────────────────────────────────────────────────
  const handleClose = () => {
    clearTimeout(typingTimerRef.current);
    stopSpeaking();
    onClose?.();
  };

  const handleTogglePlay = () => {
    if (isTyping) {
      setIsTyping(false);
      clearTimeout(typingTimerRef.current);
      pauseSpeaking();
    } else {
      setIsTyping(true);
      resumeSpeaking();
    }
  };

  const handleRestart = () => {
    clearTimeout(typingTimerRef.current);
    stopSpeaking();
    setSpeakEnabled(false);
    setTypedText("");
    setIsTyping(true);
  };

  const handleSpeakToggle = () => {
    const next = !speakEnabled;
    setSpeakEnabled(next);
    if (!next) stopSpeaking();
    // If turning ON, the useEffect above will fire and call speakText
  };

  const handleNext = async () => {
    if (!originalPrompt && stories.length <= 1) return;
    if (originalPrompt) {
      setIsLoading(true);
      stopSpeaking();
      try {
        const { sendStoryPrompt } = await import("../api/stories");
        const newStory = await sendStoryPrompt(originalPrompt, language.toLowerCase());
        if (newStory) {
          setGeneratedStories(prev => {
            const updated = [...prev, { title: originalPrompt, dsc: newStory }];
            setActiveIndex(updated.length - 1);
            return updated;
          });
        }
      } catch (e) {
        console.error("Failed to generate story:", e);
      } finally {
        setIsLoading(false);
      }
    } else {
      setActiveIndex((activeIndex + 1) % stories.length);
    }
  };

  // ── persist settings ──────────────────────────────────────────────────────────
  useEffect(() => { localStorage.setItem("story_voice_rate",  String(speechRate));  }, [speechRate]);
  useEffect(() => { localStorage.setItem("story_voice_pitch", String(speechPitch)); }, [speechPitch]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.toolbar}>
          {supported ? (
            <>
              <select
                className={styles.select}
                value={selectedVoiceId}
                onChange={(e) => handleVoiceChange(e.target.value)}
              >
                {VOICE_OPTIONS.map((v) => (
                  <option key={v.id} value={v.id}>{v.id === "default" ? t.storyModal.defaultVoice : v.label}</option>
                ))}
              </select>
              <button className={styles.controlBtn} onClick={refreshVoices}>{t.storyModal.reload}</button>
            </>
          ) : (
            <div className={styles.label}>{t.storyModal.voiceNotSupported}</div>
          )}
          <div className={styles.controlGroup}>
            <label className={styles.label}>{t.storyModal.pitch}</label>
            <input
              type="range" min="0.5" max="2" step="0.1"
              value={speechPitch}
              onChange={(e) => setSpeechPitch(Number(e.target.value))}
            />
          </div>
          <div className={styles.progressWrap}>
            <div
              className={styles.progressBar}
              style={{ width: fullText ? `${Math.min(100, (typedText.length / fullText.length) * 100)}%` : "0%" }}
            />
          </div>
        </div>

        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.categoryPill}>
              {t.storyModal.categories[String(category || "").toLowerCase()] || String(category || "").toUpperCase()}
            </div>
            <h3 className={styles.titleText}>{activeStory?.title || t.storyModal.story}</h3>
            {activeStory?.subTitle && (
              <div className={styles.subtitleText}>{activeStory.subTitle}</div>
            )}
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label={t.storyModal.close}>✕</button>
        </div>

        <div className={styles.contentArea}>
          {isLoading ? (
            <div className={styles.loading}>{t.storyModal.loading}</div>
          ) : (
            <pre className={styles.storyText}>{typedText}</pre>
          )}
        </div>

        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={handleTogglePlay}>
            {isTyping ? t.storyModal.pause : t.storyModal.play}
          </button>
          <button className={styles.controlBtn} onClick={handleRestart}>{t.storyModal.repeat}</button>
          <button
            className={`${styles.controlBtn} ${!speakEnabled ? styles.voiceHighlight : ""}`}
            onClick={handleSpeakToggle}
          >
            {speakEnabled ? `🔊 ${t.storyModal.voiceOn}` : `🔇 ${t.storyModal.voiceOff}`}
          </button>
          <div className={styles.controlGroup}>
            <label className={styles.label}>{t.storyModal.voiceRate}</label>
            <input
              type="range" min="0.7" max="1.4" step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(Number(e.target.value))}
            />
          </div>
        </div>

        {speakEnabled && (
          <div className={styles.eq} aria-hidden="true">
            <div className={styles.eqBar}></div>
            <div className={styles.eqBar}></div>
            <div className={styles.eqBar}></div>
            <div className={styles.eqBar}></div>
            <div className={styles.eqBar}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryModal;
