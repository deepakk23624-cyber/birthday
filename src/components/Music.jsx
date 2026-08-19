import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const bars = [1, 1.6, 0.8, 1.4, 1.1, 0.7, 1.3];
const YOUTUBE_VIDEO_ID = 'UsD_-iorga8';

export default function Music({ autoPlay = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    function initPlayer() {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            setIsReady(true);
            event.target.setVolume(80);
            if (autoPlay) {
              event.target.playVideo();
              setIsPlaying(true);
            }
          },
          onStateChange: (event) => {
            // YT.PlayerState.PLAYING = 1, PAUSED = 2
            setIsPlaying(event.data === 1);
          },
          onError: () => {
            console.log('YouTube player error');
          }
        }
      });
    }

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [autoPlay]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <>
      {/* Hidden YouTube Player */}
      <div
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: 1,
          height: 1,
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <div ref={containerRef} id="yt-player-container" />
      </div>

      {/* Floating music pill — fixed bottom right */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1rem',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          padding: '0.6rem 1rem 0.6rem 0.6rem',
          borderRadius: '9999px',
          boxShadow: '0 4px 20px rgba(236,72,153,0.25)',
          border: '1.5px solid rgba(249,168,212,0.5)',
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
      >
        <button
          onClick={togglePlay}
          style={{
            width: 44, height: 44,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f9a8d4, #c084fc)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(236,72,153,0.35)',
            flexShrink: 0,
            opacity: isReady ? 1 : 0.6,
          }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying
            ? <Pause size={18} color="white" fill="white" />
            : <Play size={18} color="white" fill="white" style={{ marginLeft: 2 }} />
          }
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.68rem',
            fontWeight: 600,
            color: '#db2777',
            letterSpacing: '0.02em',
          }}>
            Naach Meri Jaan 🎵
          </span>
          {/* Animated waveform */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14, marginTop: 2 }}>
            {bars.map((h, i) => (
              <motion.div
                key={i}
                style={{
                  width: 3,
                  borderRadius: 2,
                  background: 'linear-gradient(#f9a8d4, #c084fc)',
                }}
                animate={isPlaying
                  ? { height: [4, 4 + h * 8, 4] }
                  : { height: 4 }
                }
                transition={isPlaying
                  ? { repeat: Infinity, duration: 0.6 + i * 0.12, ease: 'easeInOut' }
                  : { duration: 0.3 }
                }
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
