import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Clock,
  Sparkles,
  ChevronLeft,
  FileText,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { useDreamStore } from '../store/useDreamStore';
import { formatDate } from '../utils/helpers';

const Record = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showDrafts, setShowDrafts] = useState(false);
  const [autoSaveHint, setAutoSaveHint] = useState('');
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { drafts, createDraft, updateDraft, currentDraft, setCurrentDraft } =
    useDreamStore();

  useEffect(() => {
    if (currentDraft) {
      setTitle(currentDraft.title);
      setContent(currentDraft.content);
    }
  }, [currentDraft]);

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }
    };
  }, []);

  const handleAutoSave = () => {
    if (!title.trim() && !content.trim()) return;

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      if (currentDraft) {
        updateDraft(currentDraft.id, title, content);
      } else {
        const draft = createDraft(title || '未命名的梦', content);
        setCurrentDraft(draft);
      }
      setAutoSaveHint('已自动保存');
      setTimeout(() => setAutoSaveHint(''), 2000);
    }, 1000);
  };

  useEffect(() => {
    handleAutoSave();
  }, [title, content]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime((t) => t + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }

    const mockTexts = [
      '我梦到自己在一片紫色的森林里，树木都是透明的，能看到里面流动的光。远处有一座水晶做的城堡，塔顶发出柔和的光芒...',
      '昨晚的梦里，我会飞。不是那种超人的飞，而是像游泳一样在空中划动。城市在我脚下变成了小小的积木...',
      '我在一个巨大的图书馆里，书架高得看不到顶。有一只戴着眼镜的猫在看书，它抬头看了我一眼，说"你终于来了"...',
    ];
    const mockText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
    setContent((prev) => (prev ? prev + '\n\n' : '') + mockText);
  };

  const handlePressStart = () => {
    pressTimerRef.current = setTimeout(() => {
      startRecording();
    }, 300);
  };

  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }
    if (isRecording) {
      stopRecording();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const canGenerate = title.trim().length > 0 && content.trim().length >= 50;

  const handleGenerate = () => {
    if (!canGenerate) return;
    navigate('/generate', { state: { title, content, draftId: currentDraft?.id } });
  };

  const handleSelectDraft = (draft: typeof drafts[0]) => {
    setCurrentDraft(draft);
    setShowDrafts(false);
  };

  return (
    <PageContainer>
      <div className="max-w-lg mx-auto px-4 pt-6 safe-top flex flex-col min-h-full">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-dream-bg-cream rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-dream-text-secondary" />
          </button>
          <h1 className="font-serif-sc text-lg font-semibold text-dream-text-primary">
            记录梦境
          </h1>
          <button
            onClick={() => setShowDrafts(!showDrafts)}
            className="p-2 -mr-2 hover:bg-dream-bg-cream rounded-full transition-colors relative"
          >
            <FileText className="w-6 h-6 text-dream-text-secondary" />
            {drafts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-dream-accent-primary rounded-full text-xs flex items-center justify-center text-dream-text-primary font-medium">
                {drafts.length}
              </span>
            )}
          </button>
        </div>

        {showDrafts && (
          <div className="oil-card rounded-2xl p-4 mb-4 animate-fade-in">
            <h3 className="font-medium mb-3 flex items-center gap-2 text-dream-text-primary">
              <Clock className="w-4 h-4 text-dream-accent-primary" />
              草稿箱
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {drafts.map((draft) => (
                <button
                  key={draft.id}
                  onClick={() => handleSelectDraft(draft)}
                  className="w-full text-left p-3 rounded-xl hover:bg-dream-bg-cream transition-colors border border-dream-border-warm/50"
                >
                  <p className="font-medium text-dream-text-primary truncate">
                    {draft.title}
                  </p>
                  <p className="text-xs text-dream-text-muted mt-1">
                    {formatDate(draft.updatedAt)} · {draft.content.length} 字
                  </p>
                </button>
              ))}
              {drafts.length === 0 && (
                <p className="text-center text-dream-text-muted py-4">暂无草稿</p>
              )}
            </div>
          </div>
        )}

        {autoSaveHint && (
          <div className="text-center text-sm text-dream-accent-primary mb-4 animate-fade-in">
            ✓ {autoSaveHint}
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <input
            type="text"
            placeholder="给这个梦起个标题..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-xl font-serif-sc font-semibold text-dream-text-primary placeholder-dream-text-muted focus:outline-none mb-4"
            maxLength={50}
          />

          <div className="relative flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="描述你梦到了什么...

不用组织语言，想到什么就写什么。
也可以按住下方按钮，用语音记录。"
              className="w-full h-full min-h-[300px] bg-transparent text-dream-text-secondary placeholder-dream-text-muted focus:outline-none resize-none leading-relaxed"
              maxLength={5000}
            />
          </div>
        </div>

        <div className="sticky bottom-0 z-40 safe-bottom">
          <div className="max-w-lg mx-auto px-4">
            <div className="py-3 oil-glass rounded-t-2xl border-t border-dream-border-warm">
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="text-sm text-dream-text-muted">
                  {content.length} / 5000 字
                  {content.length < 50 && (
                    <span className="text-dream-accent-primary ml-2 font-medium">
                      (至少50字才能生成)
                    </span>
                  )}
                </div>
                {isRecording && (
                  <div className="flex items-center gap-2 text-red-600">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-mono">{formatTime(recordingTime)}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center mb-3">
                <button
                  onMouseDown={handlePressStart}
                  onMouseUp={handlePressEnd}
                  onMouseLeave={handlePressEnd}
                  onTouchStart={handlePressStart}
                  onTouchEnd={handlePressEnd}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 select-none ${
                    isRecording
                      ? 'bg-red-500 recording-pulse scale-110'
                      : 'bg-gradient-to-br from-dream-accent-primary to-dream-accent-gold shadow-warm-lg hover:scale-105'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="w-7 h-7 text-white" />
                  ) : (
                    <Mic className="w-7 h-7 text-dream-text-primary" />
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-dream-text-muted mb-3">
                {isRecording ? '松开结束录音' : '长按 抢救模式 快速记录'}
              </p>

              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all mx-auto max-w-[90%] ${
                  canGenerate
                    ? 'oil-btn-primary'
                    : 'oil-btn-secondary cursor-not-allowed opacity-60'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                AI 生成视觉小说
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Record;
