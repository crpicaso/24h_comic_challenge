/**
 * Nova Webtoon - Vertical Scrolling Reader (80% Default Scale)
 * 24h Comic Challenge
 */
document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // Comic Configurations
  // =========================================================================
  const comics = {
    light: {
      id: 'light',
      title: 'Light',
      folder: 'pages_light',
      totalPages: 24,
      prefix: 'page_',
      ext: '.png',
      synopsis: 'A mysterious glow appears across a quiet desert landscape, sparking an evocative visual journey through silent human figures, towering architectural vistas, and celestial illumination.',
      nextComic: 'loy'
    },
    loy: {
      id: 'loy',
      title: 'From Nobody to Somebody',
      folder: 'pages_loy',
      totalPages: 25,
      prefix: 'page_',
      ext: '.png',
      synopsis: 'An aspiring young aviator navigates boundless cloudscapes in a handmade flying ship. Driven by wonder and curiosity, he embarks on an adventurous quest toward a mythical golden tree in the heavens.',
      nextComic: 'yeogi'
    },
    yeogi: {
      id: 'yeogi',
      title: 'Yeogi & Jeogi',
      folder: 'pages_yeogi',
      totalPages: 24,
      prefix: 'page_',
      ext: '.png',
      synopsis: 'Born on planet Yeogi and cast away to Jeogi as an infant, an alien traveler searches for belonging. Torn between two distant worlds, they journey across deep celestial divides to rediscover their true home.',
      nextComic: 'still'
    },
    still: {
      id: 'still',
      title: 'Still Feels Right',
      folder: 'pages_still',
      totalPages: 24,
      prefix: 'page_',
      ext: '.png',
      synopsis: 'A ten-year-old discovers an immediate, unbreakable passion the very first time he grips a basketball. Through grueling drills, tough coaches, and relentless asphalt court training, his love for the game never fades.',
      nextComic: 'bunnies'
    },
    bunnies: {
      id: 'bunnies',
      title: 'Our Bunnies Sorolla & Aalto',
      folder: 'pages_bunnies',
      totalPages: 24,
      prefix: 'page_',
      ext: '.png',
      synopsis: 'Two adopted bunnies, Sorolla and Aalto, navigate life together—from playful jumps and territorial rivalry to vet visits, comfort snuggles, and an endearing bond.',
      nextComic: 'light'
    }
  };

  // =========================================================================
  // Ambient Sound Engine (Based on Page_Audio_Liste_Light.xlsx)
  // Continuous cinematic crossfades - zero silence gaps between tracks & pages
  // =========================================================================
  const LIGHT_PAGE_AUDIO = {
    1: [
      { file: 'freesound_community-desert-monolith-6369.wav', label: 'Desert Monolith', durationSec: 9.0, targetVol: 0.50 },
      { file: 'soundreality-distant-glow-189361.wav', label: 'Distant Glow', durationSec: 9.0, targetVol: 0.45 }
    ],
    2: [
      { file: 'saboteurcomics-bone-snap-408148.wav', label: 'Bone Snap SFX', durationSec: 4.5, targetVol: 0.35 },
      { file: 'soundreality-distant-glow-189361.wav', label: 'Distant Glow', durationSec: 8.5, targetVol: 0.45 },
      { file: 'freesound_community-footsteps-dirt-gravel-6823.wav', label: 'Dirt Footsteps', durationSec: 8.5, targetVol: 0.40 }
    ],
    3: [
      { file: 'freesound_community-windy-forest-32853.wav', label: 'Windy Forest', durationSec: 8.5, targetVol: 0.48 },
      { file: 'dragon-studio-desert-sand-dunes-482890.wav', label: 'Desert Sand Dunes', durationSec: 9.5, targetVol: 0.45 },
      { file: 'freesound_community-lower-pitched-windy-drone-77237.wav', label: 'Low Windy Drone', durationSec: 8.5, targetVol: 0.45 }
    ],
    4: [
      { file: 'freesound_community-windy-forest-32853.wav', label: 'Windy Forest', durationSec: 7.5, targetVol: 0.48 },
      { file: 'freesound_community-footsteps-dirt-gravel-6823.wav', label: 'Dirt Footsteps', durationSec: 7.5, targetVol: 0.40 },
      { file: 'freesound_community-high-pitched-windy-drone-34477.wav', label: 'High Windy Drone', durationSec: 7.5, targetVol: 0.42 },
      { file: 'dragon-studio-desert-sand-dunes-482890.wav', label: 'Desert Sand Dunes', durationSec: 8.5, targetVol: 0.45 }
    ],
    5: [
      { file: 'freesound_community-dark-ambient-sound-windy-17404.wav', label: 'Dark Windy Ambient', durationSec: 9.0, targetVol: 0.48 },
      { file: 'freesound_community-highway-from-a-distance-48842.wav', label: 'Distant Highway', durationSec: 8.5, targetVol: 0.42 },
      { file: 'data_pion-sfx29-wind-by-wind-gust-338387.wav', label: 'Wind Gust SFX', durationSec: 5.5, targetVol: 0.35 }
    ],
    6: [
      { file: 'freesound_community-walk-down-donner-hall-79217.wav', label: 'Donner Hall Walk', durationSec: 8.5, targetVol: 0.45 },
      { file: 'freesound_community-murmullos-7133.wav', label: 'Murmullos Voices', durationSec: 8.0, targetVol: 0.40 },
      { file: 'soundreality-distant-embers-189359.wav', label: 'Distant Embers', durationSec: 8.5, targetVol: 0.40 }
    ],
    7: [
      { file: 'freesound_community-magical-glowing-37417.wav', label: 'Magical Glowing', durationSec: 8.0, targetVol: 0.45 },
      { file: 'freesound_community-four_voices_whispering-6943.wav', label: 'Whispering Voices', durationSec: 7.5, targetVol: 0.40 },
      { file: 'freesound_community-fx-light-90387.wav', label: 'Light Flare SFX', durationSec: 5.0, targetVol: 0.35 },
      { file: 'freesound_community-murmur-27730.wav', label: 'Murmur Ambience', durationSec: 7.5, targetVol: 0.42 }
    ]
  };

  class ComicAudioEngine {
    constructor() {
      this.pool = new Map(); // file -> { audio, fadeRAF, isPlaying, onEndedHandler }
      this.currentComic = 'light';
      this.currentPage = null;
      this.isInReader = false;
      this.isMuted = false;
      this.isAutoplay = false;
      // Default to 30% volume - gentle, non-intrusive ambient background level
      const savedVol = localStorage.getItem('nova_ambient_volume');
      this.masterVolume = savedVol !== null ? Math.max(0, Math.min(1, parseFloat(savedVol))) : 0.30;
      this.isPageFinished = false;

      // Sequential continuous crossfade state
      this.currentTrackData = null;
      this.currentTrackIndex = -1;
      this.sequenceTimer = null;

      // UI elements
      this.headerAudioGroup = document.getElementById('header-audio-group');
      this.readerAudioGroup = document.getElementById('reader-audio-group');
      this.headerAudioBtn = document.getElementById('header-btn-audio');
      this.readerAudioBtn = document.getElementById('reader-btn-audio');
      this.floatAudioBtn = document.getElementById('btn-float-audio');
      this.headerVolumeSlider = document.getElementById('header-volume-slider');
      this.readerVolumeSlider = document.getElementById('reader-volume-slider');
      this.headerVolumePct = document.getElementById('header-volume-pct');
      this.readerVolumePct = document.getElementById('reader-volume-pct');
      this.audioPill = document.getElementById('reader-audio-pill');
      this.audioTrackLabel = document.getElementById('audio-track-label');
      this.audioEqBars = document.getElementById('audio-eq-bars');

      this.initButtons();
      this.initSliders();
      this.updateVolumeUI();
      this.initUserGestureUnlock();
    }

    getTrack(file) {
      if (!this.pool.has(file)) {
        const audio = new Audio(`Audio/Light/${encodeURIComponent(file)}`);
        audio.preload = 'auto';
        // Graceful error fallback to original MP3 if WAV fails to load
        audio.addEventListener('error', () => {
          if (file.endsWith('.wav')) {
            const fallbackMp3 = file.replace(/\.wav$/i, '.mp3');
            audio.src = `Audio/Light/${encodeURIComponent(fallbackMp3)}`;
            audio.load();
          }
        }, { once: true });
        this.pool.set(file, {
          audio,
          fadeRAF: null,
          isPlaying: false,
          onEndedHandler: null
        });
      }
      return this.pool.get(file);
    }

    fadeTrack(trackData, toVol, durationMs, onComplete) {
      if (!trackData) return;
      if (trackData.fadeRAF) {
        cancelAnimationFrame(trackData.fadeRAF);
        trackData.fadeRAF = null;
      }

      const audio = trackData.audio;
      const startVol = audio.volume;
      const diff = toVol - startVol;

      if (Math.abs(diff) < 0.01 || durationMs <= 0) {
        audio.volume = Math.max(0, Math.min(1, toVol));
        if (onComplete) onComplete();
        return;
      }

      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        // Smooth sine ease (equal-energy feel)
        const ease = Math.sin((progress * Math.PI) / 2);
        const nextVol = Math.max(0, Math.min(1, startVol + diff * ease));
        audio.volume = nextVol;

        if (progress < 1) {
          trackData.fadeRAF = requestAnimationFrame(step);
        } else {
          audio.volume = Math.max(0, Math.min(1, toVol));
          trackData.fadeRAF = null;
          if (onComplete) onComplete();
        }
      };

      trackData.fadeRAF = requestAnimationFrame(step);
    }

    /**
     * Seamlessly crossfades to a new track:
     * Next track starts playing and fading IN immediately,
     * while previous track fades OUT simultaneously over crossfadeDuration.
     * At no point does the volume drop to silence!
     */
    crossfadeToTrack(cfg, crossfadeDuration = 2200) {
      const nextTrackData = this.getTrack(cfg.file);
      const prevTrackData = this.currentTrackData;

      if (prevTrackData === nextTrackData && nextTrackData.isPlaying) {
        // Keep playing, smoothly adjust target volume
        const targetVol = this.isMuted ? 0 : (cfg.targetVol * this.masterVolume);
        this.fadeTrack(nextTrackData, targetVol, 800);
        return;
      }

      this.currentTrackData = nextTrackData;
      const nextAudio = nextTrackData.audio;
      nextTrackData.isPlaying = true;
      nextAudio.loop = false;
      nextAudio.currentTime = 0;
      nextAudio.volume = 0;

      const targetVol = this.isMuted ? 0 : (cfg.targetVol * this.masterVolume);

      // 1. Start & fade in the incoming track
      const playPromise = nextAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (!this.isMuted) {
            this.fadeTrack(nextTrackData, targetVol, crossfadeDuration);
          }
        }).catch(() => {
          nextTrackData.isPlaying = false;
        });
      }

      // 2. Simultaneously fade out the outgoing track with smooth overlap
      if (prevTrackData && prevTrackData.isPlaying) {
        if (prevTrackData.onEndedHandler) {
          prevTrackData.audio.removeEventListener('ended', prevTrackData.onEndedHandler);
          prevTrackData.onEndedHandler = null;
        }
        this.fadeTrack(prevTrackData, 0, crossfadeDuration, () => {
          prevTrackData.audio.pause();
          prevTrackData.audio.currentTime = 0;
          prevTrackData.isPlaying = false;
        });
      }
    }

    stopCurrentTrack(fadeDuration = 1000) {
      if (this.sequenceTimer) {
        clearTimeout(this.sequenceTimer);
        this.sequenceTimer = null;
      }

      if (this.currentTrackData && this.currentTrackData.isPlaying) {
        const td = this.currentTrackData;
        if (td.onEndedHandler) {
          td.audio.removeEventListener('ended', td.onEndedHandler);
          td.onEndedHandler = null;
        }
        this.fadeTrack(td, 0, fadeDuration, () => {
          td.audio.pause();
          td.audio.currentTime = 0;
          td.isPlaying = false;
        });
        this.currentTrackData = null;
      }
    }

    setComic(comicKey) {
      this.currentComic = comicKey;
      if (comicKey !== 'light') {
        this.fadeOutAll(1200);
        this.updateUI(null, false);
      } else if (this.isInReader && this.currentPage) {
        this.setPage(this.currentPage, true);
      }
    }

    setInReader(inReader) {
      if (this.isInReader === inReader) return;
      this.isInReader = inReader;
      if (!inReader) {
        this.fadeOutAll(1200);
        this.updateUI(null, false);
      } else if (this.currentComic === 'light' && this.currentPage) {
        this.setPage(this.currentPage, true);
      }
    }

    setAutoplay(isAuto) {
      this.isAutoplay = isAuto;
      if (isAuto && this.currentComic === 'light' && this.isInReader && this.currentPage) {
        // Ensure seamless playback for the current page
        this.setPage(this.currentPage, false);
      }
    }

    setPage(pageNum, forceRestart = false) {
      if (!forceRestart && this.currentPage === pageNum) {
        // Already on this page (currently playing or finished, no loop)
        return;
      }

      this.currentPage = pageNum;
      this.isPageFinished = false;

      if (this.currentComic !== 'light' || !this.isInReader) {
        this.fadeOutAll(1000);
        this.updateUI(null, false);
        return;
      }

      const tracks = LIGHT_PAGE_AUDIO[pageNum] || [];
      if (tracks.length === 0) {
        this.stopCurrentTrack(1500);
        this.isPageFinished = true;
        this.updateUI(null, false);
        return;
      }

      // Clear any pending timer from the previous page
      if (this.sequenceTimer) {
        clearTimeout(this.sequenceTimer);
        this.sequenceTimer = null;
      }

      // Seamlessly crossfade directly into the new page's first sound effect!
      this.playTrackInSequence(pageNum, 0, 2000);
    }

    playTrackInSequence(pageNum, index, crossfadeDuration = 2200) {
      if (this.currentPage !== pageNum || !this.isInReader || this.currentComic !== 'light') {
        return;
      }

      const tracks = LIGHT_PAGE_AUDIO[pageNum] || [];
      if (!tracks || tracks.length === 0) {
        this.stopCurrentTrack(1500);
        this.isPageFinished = true;
        this.updateUI(null, false);
        return;
      }

      // KEIN LOOP: Wenn alle Audios der Seite durch sind, stoppen!
      if (index >= tracks.length) {
        this.isPageFinished = true;
        return;
      }

      const cfg = tracks[index];
      this.currentTrackIndex = index;
      const isLastTrack = (index === tracks.length - 1);

      // Crossfade into this track simultaneously (no silence gap!)
      this.crossfadeToTrack(cfg, crossfadeDuration);
      this.updateUI(`${cfg.label} (${index + 1}/${tracks.length})`, true);

      // Clear any previous sequence timer
      if (this.sequenceTimer) {
        clearTimeout(this.sequenceTimer);
        this.sequenceTimer = null;
      }

      const currentTrack = this.currentTrackData;
      const currentAudio = currentTrack ? currentTrack.audio : null;

      // Handle natural ending of the audio file (e.g. short SFX or sound finishes before duration)
      if (currentTrack && currentAudio) {
        if (currentTrack.onEndedHandler) {
          currentAudio.removeEventListener('ended', currentTrack.onEndedHandler);
        }
        currentTrack.onEndedHandler = () => {
          if (currentTrack.onEndedHandler) {
            currentAudio.removeEventListener('ended', currentTrack.onEndedHandler);
            currentTrack.onEndedHandler = null;
          }
          if (this.currentPage !== pageNum) return;

          if (!isLastTrack) {
            // Short sound effect ended: transition to next track immediately without silence gap
            if (this.sequenceTimer) {
              clearTimeout(this.sequenceTimer);
              this.sequenceTimer = null;
            }
            this.playTrackInSequence(pageNum, index + 1, 1500);
          } else {
            // Last track reached natural end: KEIN LOOP!
            currentTrack.isPlaying = false;
            currentTrack.audio.currentTime = 0;
            if (this.currentTrackData === currentTrack) {
              this.currentTrackData = null;
              this.isPageFinished = true;
              this.updateUI(null, false);
            }
          }
        };
        currentAudio.addEventListener('ended', currentTrack.onEndedHandler, { once: true });
      }

      const durationMs = (cfg.durationSec || 8.5) * 1000;
      const nextCrossfadeMs = 2200;

      if (!isLastTrack) {
        // Overlapping crossfade: schedule next track BEFORE current track finishes
        const timeUntilNextTrack = Math.max(durationMs - nextCrossfadeMs, 2500);
        this.sequenceTimer = setTimeout(() => {
          if (this.currentPage === pageNum) {
            this.playTrackInSequence(pageNum, index + 1, nextCrossfadeMs);
          }
        }, timeUntilNextTrack);
      } else {
        // KEIN LOOP: Letztes Audio der Seite läuft aus und blendet sanft aus!
        const fadeOutDuration = 2200;
        const timeUntilFadeOut = Math.max(durationMs - fadeOutDuration, 1000);
        this.sequenceTimer = setTimeout(() => {
          if (this.currentPage === pageNum && this.currentTrackData) {
            const lastTrack = this.currentTrackData;
            if (lastTrack.onEndedHandler) {
              lastTrack.audio.removeEventListener('ended', lastTrack.onEndedHandler);
              lastTrack.onEndedHandler = null;
            }
            this.fadeTrack(lastTrack, 0, fadeOutDuration, () => {
              if (lastTrack.isPlaying) {
                lastTrack.audio.pause();
                lastTrack.audio.currentTime = 0;
                lastTrack.isPlaying = false;
              }
              if (this.currentTrackData === lastTrack && this.currentPage === pageNum) {
                this.currentTrackData = null;
                this.isPageFinished = true;
                this.updateUI(null, false);
              }
            });
          }
        }, timeUntilFadeOut);
      }
    }

    fadeOutAll(durationMs = 1500) {
      this.stopCurrentTrack(durationMs);
      this.pool.forEach((trackData) => {
        if (trackData.onEndedHandler) {
          trackData.audio.removeEventListener('ended', trackData.onEndedHandler);
          trackData.onEndedHandler = null;
        }
        if (trackData.isPlaying) {
          this.fadeTrack(trackData, 0, durationMs, () => {
            trackData.audio.pause();
            trackData.audio.currentTime = 0;
            trackData.isPlaying = false;
          });
        }
      });
    }

    toggleMute() {
      this.isMuted = !this.isMuted;

      if (this.isMuted) {
        if (this.currentTrackData && this.currentTrackData.isPlaying) {
          this.fadeTrack(this.currentTrackData, 0, 400);
        }
      } else {
        if (this.masterVolume <= 0.02) {
          this.masterVolume = 0.30;
          try {
            localStorage.setItem('nova_ambient_volume', '0.30');
          } catch (e) {}
        }
        if (this.currentComic === 'light' && this.isInReader && this.currentPage) {
          if (this.currentTrackData && this.currentTrackData.isPlaying) {
            const tracks = LIGHT_PAGE_AUDIO[this.currentPage] || [];
            const cfg = tracks[this.currentTrackIndex] || tracks[0];
            const targetVol = (cfg ? cfg.targetVol : 0.45) * this.masterVolume;
            this.fadeTrack(this.currentTrackData, targetVol, 600);
          } else {
            this.setPage(this.currentPage, true);
          }
        }
      }

      this.updateUI();
      this.updateVolumeUI();
    }

    setMasterVolume(vol, isUserAction = true) {
      const clamped = Math.max(0, Math.min(1, parseFloat(vol)));
      this.masterVolume = clamped;
      if (isUserAction) {
        try {
          localStorage.setItem('nova_ambient_volume', clamped.toString());
        } catch (e) {}
      }

      if (clamped === 0) {
        this.isMuted = true;
      } else if (this.isMuted && clamped > 0 && isUserAction) {
        this.isMuted = false;
      }

      if (this.currentTrackData && this.currentTrackData.isPlaying) {
        if (this.isMuted) {
          this.fadeTrack(this.currentTrackData, 0, 200);
        } else {
          const tracks = LIGHT_PAGE_AUDIO[this.currentPage] || [];
          const cfg = tracks[this.currentTrackIndex] || tracks[0];
          const targetVol = (cfg ? cfg.targetVol : 0.45) * this.masterVolume;
          this.fadeTrack(this.currentTrackData, targetVol, 200);
        }
      }

      this.updateUI();
      this.updateVolumeUI();
    }

    updateVolumeUI() {
      const pct = Math.round(this.masterVolume * 100);
      const displayPct = this.isMuted ? '0%' : `${pct}%`;
      const sliderVal = this.isMuted ? 0 : pct;

      [this.headerVolumeSlider, this.readerVolumeSlider].forEach(slider => {
        if (slider) {
          slider.value = sliderVal;
          slider.style.setProperty('--val-pct', `${sliderVal}%`);
        }
      });

      [this.headerVolumePct, this.readerVolumePct].forEach(label => {
        if (label) {
          label.textContent = displayPct;
        }
      });
    }

    initSliders() {
      const onInput = (e) => {
        const val = parseFloat(e.target.value);
        this.setMasterVolume(val / 100, true);
      };

      if (this.readerVolumeSlider) {
        this.readerVolumeSlider.addEventListener('input', onInput);
      }
      if (this.headerVolumeSlider) {
        this.headerVolumeSlider.addEventListener('input', onInput);
      }
    }

    updateUI(activeLabel = null, isPlaying = null) {
      const isCurrentlyPlaying = (isPlaying !== null)
        ? isPlaying
        : (!this.isMuted && Boolean(this.currentTrackData && this.currentTrackData.isPlaying));

      const buttons = [this.headerAudioBtn, this.readerAudioBtn, this.floatAudioBtn];
      buttons.forEach(btn => {
        if (!btn) return;
        if (this.isMuted) {
          btn.classList.add('is-muted');
          btn.classList.remove('is-active');
          btn.title = 'Ambient Sound: Muted (Hotkey: M)';
        } else if (isCurrentlyPlaying) {
          btn.classList.remove('is-muted');
          btn.classList.add('is-active');
          btn.title = 'Ambient Sound: Active (Hotkey: M)';
        } else {
          btn.classList.remove('is-muted');
          btn.classList.remove('is-active');
          btn.title = 'Ambient Sound: Ruhend (Hotkey: M)';
        }
      });

      const groups = [this.headerAudioGroup, this.readerAudioGroup];
      groups.forEach(grp => {
        if (!grp) return;
        if (this.isMuted) {
          grp.classList.add('is-muted');
        } else {
          grp.classList.remove('is-muted');
        }
      });

      if (this.audioPill) {
        if (this.currentComic === 'light' && this.isInReader) {
          this.audioPill.style.display = 'inline-flex';
          const tracks = LIGHT_PAGE_AUDIO[this.currentPage] || [];

          if (this.isMuted) {
            this.audioPill.classList.add('is-muted');
            this.audioPill.classList.remove('is-idle');
            if (this.audioTrackLabel) {
              this.audioTrackLabel.textContent = `Page ${this.currentPage}: Stumm`;
            }
          } else if (isCurrentlyPlaying) {
            this.audioPill.classList.remove('is-muted');
            this.audioPill.classList.remove('is-idle');
            const label = activeLabel || (tracks[this.currentTrackIndex] ? tracks[this.currentTrackIndex].label : 'Playing');
            if (this.audioTrackLabel) {
              this.audioTrackLabel.textContent = `Page ${this.currentPage}: ${label}`;
            }
          } else {
            // Audio ist durch / Ruhend
            this.audioPill.classList.remove('is-muted');
            this.audioPill.classList.add('is-idle');
            if (this.audioTrackLabel) {
              this.audioTrackLabel.textContent = `Page ${this.currentPage}: Audio beendet`;
            }
          }
        } else {
          this.audioPill.style.display = 'none';
        }
      }
    }

    initButtons() {
      const toggle = () => this.toggleMute();
      if (this.headerAudioBtn) this.headerAudioBtn.addEventListener('click', toggle);
      if (this.readerAudioBtn) this.readerAudioBtn.addEventListener('click', toggle);
      if (this.floatAudioBtn) this.floatAudioBtn.addEventListener('click', toggle);
      if (this.audioPill) this.audioPill.addEventListener('click', toggle);
    }

    initUserGestureUnlock() {
      const unlock = () => {
        if (this.currentComic === 'light' && this.isInReader && this.currentPage) {
          this.setPage(this.currentPage, true);
        }
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
    }
  }

  // =========================================================================
  // State
  // =========================================================================
  let currentComicKey = 'light';
  let currentScale = '80'; // Default 80% scale as requested
  let isAutoScrolling = false;
  let autoScrollAnimationId = null;
  let autoScrollSpeed = 1.8;
  let pageObserver = null;
  let audioEngine = null;

  // =========================================================================
  // DOM Elements - Views
  // =========================================================================
  const viewOverview = document.getElementById('view-overview');
  const viewReader = document.getElementById('view-reader');

  // Sticky Header
  const btnBackOverview = document.getElementById('btn-back-overview');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const scaleButtons = document.querySelectorAll('.scale-btn');
  const headerCurrentPage = document.getElementById('header-current-page');
  const headerTotalPages = document.getElementById('header-total-pages');
  const btnToggleFullscreen = document.getElementById('btn-toggle-fullscreen');
  const iconExpand = btnToggleFullscreen ? btnToggleFullscreen.querySelector('.icon-expand') : null;
  const iconCompress = btnToggleFullscreen ? btnToggleFullscreen.querySelector('.icon-compress') : null;
  const readingProgressBar = document.getElementById('reading-progress-bar');

  // Main Vertical Stream
  const webtoonMain = document.getElementById('webtoon-main');
  const webtoonStream = document.getElementById('webtoon-stream');

  // Outro Section
  const outroComicTitle = document.getElementById('outro-comic-title');
  const nextComicImg = document.getElementById('next-comic-img');
  const nextComicTitle = document.getElementById('next-comic-title');
  const nextComicDesc = document.getElementById('next-comic-desc');
  const btnReadNext = document.getElementById('btn-read-next');
  const btnRestartComic = document.getElementById('btn-restart-comic');
  const btnReturnOverview = document.getElementById('btn-return-overview');

  // Floating Controls for Scroll Mode
  const floatingControls = document.getElementById('floating-controls');
  const floatCurrentPage = document.getElementById('float-current-page');
  const floatTotalPages = document.getElementById('float-total-pages');
  const btnAutoScroll = document.getElementById('btn-auto-scroll');
  const iconPlay = btnAutoScroll ? btnAutoScroll.querySelector('.icon-play') : null;
  const iconPause = btnAutoScroll ? btnAutoScroll.querySelector('.icon-pause') : null;
  const btnBackToTop = document.getElementById('btn-back-to-top');

  // Overview Cards
  const comicCards = document.querySelectorAll('.comic-card');

  // =========================================================================
  // Helpers
  // =========================================================================
  function getPageSrc(comic, pageNum) {
    const padded = String(pageNum).padStart(2, '0');
    return `${comic.folder}/${comic.prefix}${padded}${comic.ext}`;
  }

  // =========================================================================
  // Smooth Animated Scroll Engine (Visible, cinematic transition - never jumps)
  // =========================================================================
  let scrollAnimationId = null;

  function cancelScrollAnimation() {
    if (scrollAnimationId) {
      cancelAnimationFrame(scrollAnimationId);
      scrollAnimationId = null;
    }
  }

  function animatedScrollTo(targetY, duration = 850, onComplete = null) {
    stopAutoScroll();
    cancelScrollAnimation();

    const startY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetY - startY;

    if (Math.abs(distance) < 3) {
      if (onComplete) onComplete();
      return;
    }

    const startTime = performance.now();

    // Luxurious easeInOutCubic: gentle start, visible flowing middle, soft landing
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        scrollAnimationId = requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        scrollAnimationId = null;
        if (onComplete) onComplete();
      }
    }

    scrollAnimationId = requestAnimationFrame(step);
  }

  // Gracefully stop animation if user manually scrolls
  window.addEventListener('wheel', (e) => {
    if (scrollAnimationId && Math.abs(e.deltaY) > 6) {
      cancelScrollAnimation();
    }
  }, { passive: true });

  window.addEventListener('touchmove', () => {
    if (scrollAnimationId) {
      cancelScrollAnimation();
    }
  }, { passive: true });

  // =========================================================================
  // View Navigation: Overview vs Vertical Webtoon Reader
  // =========================================================================
  function showOverview(updateHash = true) {
    stopAutoScroll();
    if (pageObserver) {
      pageObserver.disconnect();
    }
    if (audioEngine) {
      audioEngine.setInReader(false);
    }

    viewOverview.removeAttribute('hidden');
    animatedScrollTo(0, 800);

    if (updateHash) {
      if (history.replaceState) {
        history.replaceState(null, '', ' ');
      } else {
        window.location.hash = '';
      }
    }
  }

  function openReader(comicKey, updateHash = true, smoothScroll = true) {
    if (!comics[comicKey]) return;
    const isNewComic = currentComicKey !== comicKey;
    currentComicKey = comicKey;
    const comic = comics[comicKey];
    const nextComic = comics[comic.nextComic];

    stopAutoScroll();
    if (pageObserver) {
      pageObserver.disconnect();
    }

    // Keep overview visible above and reveal the reader below
    viewOverview.removeAttribute('hidden');
    viewReader.removeAttribute('hidden');

    // Update active state on cards in overview
    comicCards.forEach(card => {
      const key = card.getAttribute('data-comic');
      const badge = document.getElementById(`badge-${key}`);
      if (key === comicKey) {
        card.classList.add('is-active-card');
        card.setAttribute('aria-selected', 'true');
        if (badge) badge.style.display = 'inline-flex';
        // Add momentary click pulse
        card.classList.add('card-clicked-anim');
        setTimeout(() => card.classList.remove('card-clicked-anim'), 450);
      } else {
        card.classList.remove('is-active-card');
        card.removeAttribute('aria-selected');
        if (badge) badge.style.display = 'none';
      }
    });

    // Update Header Tabs
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-comic') === comicKey) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    // Update Page Numbers
    headerTotalPages.textContent = comic.totalPages;
    if (floatTotalPages) floatTotalPages.textContent = comic.totalPages;
    headerCurrentPage.textContent = '1';
    if (floatCurrentPage) floatCurrentPage.textContent = '1';

    // Apply Active Scale (Default: 80% scale)
    applyScale(currentScale);

    // Update Outro Details
    if (outroComicTitle) outroComicTitle.textContent = comic.title;
    if (nextComic && nextComicImg) {
      nextComicImg.src = getPageSrc(nextComic, 1);
      nextComicImg.alt = `Preview of ${nextComic.title}`;
      nextComicTitle.textContent = nextComic.title;
      nextComicDesc.textContent = nextComic.synopsis;
    }

    // Build Continuous Vertical Stream if comic changed or not yet built
    if (isNewComic || !webtoonStream.children.length) {
      buildWebtoonStream(comic);
    }

    // Audio Engine synchronization
    if (audioEngine) {
      if (comicKey === 'light') {
        audioEngine.setComic('light');
        audioEngine.setInReader(true);
        audioEngine.setPage(1);
      } else {
        audioEngine.setComic(comicKey);
      }
    }

    // Measure target position cleanly
    const targetY = viewReader.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || document.documentElement.scrollTop);

    // Move visibly and smoothly down to the comic reader section
    if (smoothScroll) {
      animatedScrollTo(targetY, 850);
    } else {
      window.scrollTo(0, targetY);
    }

    // Update URL hash
    if (updateHash) {
      if (history.replaceState) {
        history.replaceState(null, '', `#read-${comicKey}`);
      } else {
        window.location.hash = `#read-${comicKey}`;
      }
    }
  }

  // =========================================================================
  // Vertical Stream Builder
  // =========================================================================
  function buildWebtoonStream(comic) {
    webtoonStream.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= comic.totalPages; i++) {
      const panel = document.createElement('div');
      panel.className = 'webtoon-panel';
      panel.id = `panel-${i}`;
      panel.setAttribute('data-page', i);

      const frame = document.createElement('div');
      frame.className = 'panel-frame';

      const img = document.createElement('img');
      img.className = 'webtoon-page-img';
      img.src = getPageSrc(comic, i);
      img.alt = `${comic.title} - Page ${i}`;
      // Eager load first 2 pages for immediate display, lazy load remaining
      img.loading = i <= 2 ? 'eager' : 'lazy';
      img.decoding = 'async';

      const watermark = document.createElement('span');
      watermark.className = 'panel-number-watermark';
      watermark.textContent = `Page ${i}`;

      frame.appendChild(img);
      frame.appendChild(watermark);
      panel.appendChild(frame);
      fragment.appendChild(panel);
    }

    webtoonStream.appendChild(fragment);
    setupPageObserver();
  }

  /**
   * Tracks current page dynamically as the user scrolls vertically
   */
  function setupPageObserver() {
    if (pageObserver) pageObserver.disconnect();
    const panels = document.querySelectorAll('.webtoon-panel');
    if (!panels.length) return;

    pageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const pageNum = entry.target.getAttribute('data-page');
          if (pageNum) {
            headerCurrentPage.textContent = pageNum;
            if (floatCurrentPage) floatCurrentPage.textContent = pageNum;
            if (audioEngine && currentComicKey === 'light') {
              audioEngine.setPage(parseInt(pageNum, 10));
            }
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-25% 0px -40% 0px',
      threshold: 0.15
    });

    panels.forEach(p => pageObserver.observe(p));
  }

  // =========================================================================
  // Scale Controls (80% default, 100%, 150%)
  // =========================================================================
  function applyScale(scale) {
    currentScale = String(scale);
    webtoonMain.classList.remove('scale-80', 'scale-100', 'scale-150');
    webtoonMain.classList.add(`scale-${currentScale}`);

    scaleButtons.forEach(btn => {
      if (btn.getAttribute('data-scale') === currentScale) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  scaleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const scale = btn.getAttribute('data-scale');
      if (scale) applyScale(scale);
    });
  });

  // =========================================================================
  // Scroll Progress Tracker & Real-Time Focal Page Tracking
  // =========================================================================
  let currentFocalPage = 1;

  function getFocalPage() {
    const panels = document.querySelectorAll('.webtoon-panel');
    if (!panels.length) return 1;
    // 38% down the screen: exact focal reading position
    const focalY = window.innerHeight * 0.38;

    for (let i = 0; i < panels.length; i++) {
      const rect = panels[i].getBoundingClientRect();
      if (rect.top <= focalY && rect.bottom >= focalY) {
        const pageNum = parseInt(panels[i].getAttribute('data-page'), 10);
        if (pageNum) return pageNum;
      }
    }

    let closestPage = 1;
    let minDistance = Infinity;
    panels.forEach(panel => {
      const rect = panel.getBoundingClientRect();
      const center = (rect.top + rect.bottom) / 2;
      const dist = Math.abs(center - focalY);
      if (dist < minDistance) {
        minDistance = dist;
        closestPage = parseInt(panel.getAttribute('data-page'), 10);
      }
    });
    return closestPage;
  }

  function updateScrollProgress() {
    if (viewReader.hasAttribute('hidden')) {
      readingProgressBar.style.width = '0%';
      if (floatingControls) floatingControls.classList.remove('is-visible');
      if (audioEngine) audioEngine.setInReader(false);
      return;
    }

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const readerTop = viewReader.getBoundingClientRect().top + scrollTop;
    const readerHeight = viewReader.offsetHeight;

    // Show floating controls when near or inside reader
    if (floatingControls) {
      if (scrollTop >= readerTop - 250) {
        floatingControls.classList.add('is-visible');
      } else {
        floatingControls.classList.remove('is-visible');
      }
    }

    // Synchronize reader ambient audio state
    const inReaderArea = scrollTop >= readerTop - 250;
    if (audioEngine) {
      audioEngine.setInReader(inReaderArea);
    }

    // Real-time focal page detection during manual and auto-scroll
    if (inReaderArea) {
      const focalPage = getFocalPage();
      if (focalPage && focalPage !== currentFocalPage) {
        currentFocalPage = focalPage;
        headerCurrentPage.textContent = focalPage;
        if (floatCurrentPage) floatCurrentPage.textContent = focalPage;
        if (audioEngine && currentComicKey === 'light') {
          audioEngine.setPage(focalPage);
        }
      }
    }

    // Reading progress bar tracks position through current comic
    if (scrollTop < readerTop) {
      readingProgressBar.style.width = '0%';
    } else {
      const scrollable = readerHeight - window.innerHeight;
      if (scrollable > 0) {
        const progressPercent = Math.min(100, Math.max(0, ((scrollTop - readerTop) / scrollable) * 100));
        readingProgressBar.style.width = `${progressPercent}%`;
      } else {
        readingProgressBar.style.width = '100%';
      }
    }

    if (isAutoScrolling && scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 10) {
      stopAutoScroll();
    }
  }

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateScrollProgress);
  }, { passive: true });

  // =========================================================================
  // Auto-Scroll Feature (45 px/sec: relaxed, comfortable reading pace)
  // =========================================================================
  let lastAutoScrollTime = null;

  function startAutoScroll() {
    if (isAutoScrolling || !btnAutoScroll) return;
    isAutoScrolling = true;
    lastAutoScrollTime = null;
    if (iconPlay) iconPlay.style.display = 'none';
    if (iconPause) iconPause.style.display = 'block';
    btnAutoScroll.classList.add('is-active');

    // Immediately adapt sound when Playbutton is clicked
    const focalPage = getFocalPage();
    currentFocalPage = focalPage;
    headerCurrentPage.textContent = focalPage;
    if (floatCurrentPage) floatCurrentPage.textContent = focalPage;
    if (audioEngine) {
      audioEngine.setAutoplay(true);
      if (currentComicKey === 'light') {
        audioEngine.setInReader(true);
        const needsRestart = !audioEngine.currentTrackData || !audioEngine.currentTrackData.isPlaying;
        audioEngine.setPage(focalPage, needsRestart);
      }
    }

    function step(now) {
      if (!isAutoScrolling) return;
      if (!lastAutoScrollTime) lastAutoScrollTime = now;
      const delta = Math.min((now - lastAutoScrollTime) / 1000, 0.1);
      lastAutoScrollTime = now;

      // 45 pixels per second: calm, leisurely reading speed (takes ~22s per 1000px page)
      window.scrollBy(0, 45 * delta);
      autoScrollAnimationId = requestAnimationFrame(step);
    }

    autoScrollAnimationId = requestAnimationFrame(step);
  }

  function stopAutoScroll() {
    if (!isAutoScrolling || !btnAutoScroll) return;
    isAutoScrolling = false;
    lastAutoScrollTime = null;
    if (audioEngine) audioEngine.setAutoplay(false);
    if (iconPlay) iconPlay.style.display = 'block';
    if (iconPause) iconPause.style.display = 'none';
    btnAutoScroll.classList.remove('is-active');
    if (autoScrollAnimationId) {
      cancelAnimationFrame(autoScrollAnimationId);
      autoScrollAnimationId = null;
    }
  }

  function toggleAutoScroll() {
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  }

  if (btnAutoScroll) btnAutoScroll.addEventListener('click', toggleAutoScroll);

  window.addEventListener('wheel', (e) => {
    if (isAutoScrolling && Math.abs(e.deltaY) > 15) {
      stopAutoScroll();
    }
  }, { passive: true });

  window.addEventListener('touchstart', () => {
    if (isAutoScrolling) {
      stopAutoScroll();
    }
  }, { passive: true });

  // =========================================================================
  // Fullscreen Toggle
  // =========================================================================
  const headerBtnFullscreen = document.getElementById('header-btn-fullscreen');
  const fsIconExpand = headerBtnFullscreen ? headerBtnFullscreen.querySelector('.fs-icon-expand') : null;
  const fsIconCompress = headerBtnFullscreen ? headerBtnFullscreen.querySelector('.fs-icon-compress') : null;

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  document.addEventListener('fullscreenchange', () => {
    const isFs = !!document.fullscreenElement;
    if (iconExpand && iconCompress) {
      iconExpand.style.display = isFs ? 'none' : 'block';
      iconCompress.style.display = isFs ? 'block' : 'none';
    }
    if (fsIconExpand && fsIconCompress) {
      fsIconExpand.style.display = isFs ? 'none' : 'block';
      fsIconCompress.style.display = isFs ? 'block' : 'none';
    }
  });

  if (btnToggleFullscreen) {
    btnToggleFullscreen.addEventListener('click', toggleFullscreen);
  }
  if (headerBtnFullscreen) {
    headerBtnFullscreen.addEventListener('click', toggleFullscreen);
  }

  // =========================================================================
  // Top Header Controls: About, Shuffle, Ambient Audio
  // =========================================================================
  // 1. About Modal
  const headerBtnAbout = document.getElementById('header-btn-about');
  const aboutModal = document.getElementById('aboutModal');
  const aboutModalClose = document.getElementById('aboutModalClose');
  const aboutModalOk = document.getElementById('aboutModalOk');

  function openAboutModal() {
    if (!aboutModal) return;
    aboutModal.style.display = 'flex';
    requestAnimationFrame(() => {
      aboutModal.classList.add('is-open');
      aboutModal.setAttribute('aria-hidden', 'false');
    });
  }

  function closeAboutModal() {
    if (!aboutModal) return;
    aboutModal.classList.remove('is-open');
    aboutModal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (!aboutModal.classList.contains('is-open')) {
        aboutModal.style.display = 'none';
      }
    }, 260);
  }

  if (headerBtnAbout) headerBtnAbout.addEventListener('click', openAboutModal);
  if (aboutModalClose) aboutModalClose.addEventListener('click', closeAboutModal);
  if (aboutModalOk) aboutModalOk.addEventListener('click', closeAboutModal);
  if (aboutModal) {
    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) closeAboutModal();
    });
  }

  // =========================================================================
  // Event Listeners: Navigation & Actions
  // =========================================================================
  // Overview Card Clicks -> Move down to the comic
  comicCards.forEach(card => {
    card.addEventListener('click', () => {
      const comicKey = card.getAttribute('data-comic');
      if (comicKey) {
        openReader(comicKey, true, true);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const comicKey = card.getAttribute('data-comic');
        if (comicKey) {
          openReader(comicKey, true, true);
        }
      }
    });
  });

  // Return to Overview buttons (Smooth scroll back up)
  if (btnBackOverview) btnBackOverview.addEventListener('click', () => showOverview(true));
  if (btnReturnOverview) btnReturnOverview.addEventListener('click', () => showOverview(true));

  // Back to Comic Page 1 button (Restart / Top of Comic)
  function scrollToComicTop() {
    stopAutoScroll();
    const targetY = viewReader.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || document.documentElement.scrollTop);
    animatedScrollTo(targetY, 700);
  }

  if (btnBackToTop) btnBackToTop.addEventListener('click', scrollToComicTop);
  if (btnRestartComic) btnRestartComic.addEventListener('click', scrollToComicTop);

  // Outro Read Next Comic button
  if (btnReadNext) {
    btnReadNext.addEventListener('click', () => {
      const nextKey = comics[currentComicKey].nextComic;
      openReader(nextKey, true, true);
    });
  }

  // Reader Comic Switcher Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const comicKey = btn.getAttribute('data-comic');
      if (comicKey && comicKey !== currentComicKey) {
        openReader(comicKey, true, true);
      }
    });
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const inReader = !viewReader.hasAttribute('hidden');

    if (e.key === 'Escape') {
      if (aboutModal && aboutModal.classList.contains('is-open')) {
        closeAboutModal();
        return;
      }
      if (inReader) {
        showOverview(true);
      }
    } else if (inReader) {
      if (e.key === 'm' || e.key === 'M') {
        if (audioEngine) audioEngine.toggleMute();
      } else if (e.key === '+' || e.key === '=') {
        if (audioEngine) audioEngine.setMasterVolume(Math.min(1, audioEngine.masterVolume + 0.05));
      } else if (e.key === '-' || e.key === '_') {
        if (audioEngine) audioEngine.setMasterVolume(Math.max(0, audioEngine.masterVolume - 0.05));
      } else if (e.key === 'a' || e.key === 'A') {
        toggleAutoScroll();
      } else if (e.key === '1') {
        applyScale('80');
      } else if (e.key === '2') {
        applyScale('100');
      } else if (e.key === '3') {
        applyScale('150');
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === ']') {
        const nextKey = comics[currentComicKey].nextComic;
        openReader(nextKey, true);
      } else if (e.key === '[') {
        const keys = Object.keys(comics);
        const currIdx = keys.indexOf(currentComicKey);
        const prevIdx = (currIdx - 1 + keys.length) % keys.length;
        openReader(keys[prevIdx], true);
      }
    }
  });

    // Initialize ambient audio engine
    audioEngine = new ComicAudioEngine();

    // URL Hash routing on load and back/forward navigation
    function handleHashRoute() {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#read-')) {
        const comicKey = hash.replace('#read-', '');
        if (comics[comicKey]) {
          openReader(comicKey, false, false);
          return;
        }
      }
      // No hash: prepare initial stream so DOM height is stable, start at top (overview)
      openReader('light', false, false);
      if (audioEngine) audioEngine.setInReader(false);
      window.scrollTo(0, 0);
    }

    window.addEventListener('popstate', handleHashRoute);
    handleHashRoute();
});
