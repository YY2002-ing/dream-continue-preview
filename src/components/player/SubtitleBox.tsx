import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, GitBranch } from 'lucide-react';
import type { Scene } from '../../types';

interface SubtitleBoxProps {
  scene: Scene;
  totalScenes: number;
  currentIndex: number;
  isLastScene: boolean;
  isInterrupt: boolean;
  onPrev: () => void;
  onNext: () => void;
  onCreateBranch: () => void;
  onViewBranches: () => void;
}

const SubtitleBox = ({
  scene,
  totalScenes,
  currentIndex,
  isLastScene,
  isInterrupt,
  onPrev,
  onNext,
  onCreateBranch,
  onViewBranches,
}: SubtitleBoxProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const textRef = useRef(scene.content);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const typeNextChar = useCallback(() => {
    if (indexRef.current < textRef.current.length) {
      setDisplayedText(textRef.current.slice(0, indexRef.current + 1));
      indexRef.current++;
      timerRef.current = setTimeout(typeNextChar, 40);
    } else {
      setIsTyping(false);
    }
  }, []);

  const skipTyping = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDisplayedText(textRef.current);
    setIsTyping(false);
    indexRef.current = textRef.current.length;
  }, []);

  useEffect(() => {
    textRef.current = scene.content;
    indexRef.current = 0;
    setDisplayedText('');
    setIsTyping(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    typeNextChar();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [scene.id, scene.content, typeNextChar]);

  const handleClick = () => {
    if (isTyping) {
      skipTyping();
    } else if (!isLastScene) {
      onNext();
    }
  };

  const hasBranches = scene.branches && scene.branches.length > 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dream-text-primary/60 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative p-4 pb-6">
        <div
          onClick={handleClick}
          className="bg-white/30 backdrop-blur-md rounded-2xl p-5 cursor-pointer border border-white/20"
        >
          <p
            className={`text-white leading-relaxed min-h-[60px] text-lg drop-shadow-lg ${
              isTyping ? 'typewriter-cursor' : ''
            }`}
          >
            {displayedText}
          </p>

          {isLastScene && !isTyping && (
            <div className="mt-4 pt-4 border-t border-white/20">
              {isInterrupt && (
                <div className="text-center mb-4">
                  <p className="text-dream-accent-gold font-serif-sc text-lg mb-1">
                    然后我醒了
                  </p>
                  <p className="text-sm text-white/80">
                    梦到这里就断了...你觉得后面会发生什么？
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                {hasBranches && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewBranches();
                    }}
                    className="flex-1 py-3 px-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
                  >
                    <GitBranch className="w-5 h-5" />
                    查看续写 ({scene.branches?.length})
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateBranch();
                  }}
                  className="flex-1 py-3 px-4 oil-btn-primary rounded-xl font-medium flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  我来续写
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-2 px-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              currentIndex === 0
                ? 'text-white/30 cursor-not-allowed bg-white/10'
                : 'text-white bg-white/20 hover:bg-white/30'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={isLastScene}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isLastScene
                ? 'text-white/30 cursor-not-allowed bg-white/10'
                : 'text-white bg-white/20 hover:bg-white/30'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubtitleBox;
