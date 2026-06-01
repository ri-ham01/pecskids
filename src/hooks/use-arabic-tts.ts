"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSettingsStore } from "@/stores/settings-store";

export function useArabicTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { rate, pitch, volume, reduceMotion } = useSettingsStore();

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    setIsSupported(true);

    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const arabicVoices = allVoices.filter(
        (v) => v.lang.startsWith("ar") || v.lang.includes("Arabic")
      );
      setVoices(arabicVoices.length > 0 ? arabicVoices : allVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const getArabicVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (voices.length === 0) return null;
    const arSA = voices.find((v) => v.lang === "ar-SA");
    const arEG = voices.find((v) => v.lang === "ar-EG");
    const arAny = voices.find((v) => v.lang.startsWith("ar"));
    return arSA ?? arEG ?? arAny ?? voices[0];
  }, [voices]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      utterance.rate = reduceMotion ? 0.8 : rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      const voice = getArabicVoice();
      if (voice) utterance.voice = voice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, rate, pitch, volume, reduceMotion, getArabicVoice]
  );

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, isSupported, voices };
}
