import { useCallback, useRef, useEffect } from 'react';
import { useSoundStore } from '../store/soundStore';

// Singleton references for background loops
let ambientAudio = null;
let musicAudio = null;

// High-availability direct links
const AMBIENT_URL = 'https://cdn.pixabay.com/audio/2022/03/15/audio_8217f25974.mp3'; // City Ambience
const MUSIC_URL = 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b131a42b.mp3'; // Dark Luxury Ambient

export const useSound = () => {
  const { isMuted, volume, initialize, isInitialized } = useSoundStore();

  const initAudio = useCallback(() => {
    console.log("[AudioEngine] Initializing...");
    
    if (!ambientAudio) {
      ambientAudio = new Audio(AMBIENT_URL);
      ambientAudio.loop = true;
      ambientAudio.crossOrigin = "anonymous";
      ambientAudio.volume = volume * 0.4;
      ambientAudio.addEventListener('error', (e) => console.error("[AudioEngine] Ambient Error:", e));
    }
    
    if (!musicAudio) {
      musicAudio = new Audio(MUSIC_URL);
      musicAudio.loop = true;
      musicAudio.crossOrigin = "anonymous";
      musicAudio.volume = volume * 0.6;
      musicAudio.addEventListener('error', (e) => console.error("[AudioEngine] Music Error:", e));
    }

    if (!isMuted) {
      console.log("[AudioEngine] Starting Playback...");
      ambientAudio.play().then(() => console.log("[AudioEngine] Ambient Playing")).catch(e => console.warn("[AudioEngine] Ambient Blocked:", e));
      musicAudio.play().then(() => console.log("[AudioEngine] Music Playing")).catch(e => console.warn("[AudioEngine] Music Blocked:", e));
    }

    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized, isMuted, volume]);

  const syncLoops = useCallback(() => {
    if (!ambientAudio || !musicAudio) return;
    
    console.log("[AudioEngine] Syncing: muted =", isMuted);
    
    if (isMuted) {
      ambientAudio.pause();
      musicAudio.pause();
    } else {
      ambientAudio.volume = volume * 0.4;
      musicAudio.volume = volume * 0.6;
      ambientAudio.play().catch(() => {});
      musicAudio.play().catch(() => {});
    }
  }, [isMuted, volume]);

  // Sync on state change
  useEffect(() => {
    syncLoops();
  }, [isMuted, volume, syncLoops]);

  // Refined subtle mechanical click
  const playClick = useCallback(() => {
    if (isMuted) return;
    const click = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_c0c1b48b94.mp3');
    click.volume = volume * 0.3;
    click.play().catch(() => {});
  }, [isMuted, volume]);

  const playNav = useCallback(() => {
    if (isMuted) return;
    const nav = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_c0c1b48b94.mp3');
    nav.volume = volume * 0.2;
    nav.play().catch(() => {});
  }, [isMuted, volume]);

  const playAction = useCallback(() => {
    if (isMuted) return;
  }, [isMuted]);

  const playSuccess = useCallback(() => {
    if (isMuted) return;
    const success = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_0625c153f0.mp3');
    success.volume = volume * 0.5;
    success.play().catch(() => {});
  }, [isMuted, volume]);

  return { initAudio, playClick, playNav, playAction, playSuccess };
};
