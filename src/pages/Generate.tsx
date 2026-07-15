import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  Sparkles,
  Loader2,
  Check,
  Tag,
  Save,
  Send,
  Play,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import SceneCard from '../components/dream/SceneCard';
import { useDreamStore } from '../store/useDreamStore';
import { tagPool } from '../utils/mock';
import type { GenerationProgress } from '../types';

const Generate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, content, draftId } = (location.state as {
    title: string;
    content: string;
    draftId?: string;
  }) || { title: '', content: '' };

  const { generateVisualNovel, currentDream, regenerateScene, publishDream } =
    useDreamStore();

  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showTagSelect, setShowTagSelect] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (!title || !content) {
      navigate('/record');
      return;
    }

    const doGenerate = async () => {
      try {
        await generateVisualNovel(title, content, (p) => {
          setProgress(p);
        });
        setIsGenerated(true);
      } catch (error) {
        console.error('Generation failed:', error);
      }
    };

    doGenerate();
  }, [title, content, generateVisualNovel, navigate]);

  const handleRegenerateScene = async (index: number) => {
    if (!currentDream) return;
    setRegeneratingIndex(index);
    try {
      await regenerateScene(currentDream.id, index);
    } finally {
      setRegeneratingIndex(null);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, tag];
    });
  };

  const handlePublish = () => {
    if (!currentDream) return;
    setShowTagSelect(true);
  };

  const confirmPublish = async () => {
    if (!currentDream) return;
    setIsPublishing(true);
    await new Promise((r) => setTimeout(r, 1000));
    publishDream(currentDream.id, selectedTags);
    setIsPublishing(false);
    navigate(`/dream/${currentDream.id}`);
  };

  const handlePreview = () => {
    if (!currentDream) return;
    navigate(`/dream/${currentDream.id}`);
  };

  const handleSaveDraft = () => {
    navigate('/record');
  };

  if (!isGenerated && progress) {
    return (
      <PageContainer showNav={false}>
        <div className="h-full flex flex-col items-center justify-center px-6 safe-top safe-bottom">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-dream-accent-primary to-dream-accent-gold flex items-center justify-center animate-pulse-slow shadow-warm-lg">
                <Sparkles className="w-10 h-10 text-dream-text-primary" />
              </div>
              <h2 className="font-serif-sc text-xl font-semibold text-dream-text-primary mb-2">
                AI 正在创作中
              </h2>
              <p className="text-sm text-dream-text-secondary">
                {progress.message}
              </p>
            </div>

            <div className="oil-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-dream-text-secondary">进度</span>
                <span className="text-sm text-dream-accent-primary font-medium">
                  {progress.step === 'splitting'
                    ? '打开梦境'
                    : progress.step === 'cleaning'
                    ? '剔除杂质'
                    : progress.step === 'analyzing'
                    ? '梳理时间线'
                    : progress.step === 'writing'
                    ? '编织故事'
                    : progress.step === 'painting'
                    ? `${progress.current - 3}/${progress.total - 3} 幕`
                    : '完成'}
                </span>
              </div>

              <div className="w-full h-2.5 bg-dream-bg-cream rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-dream-accent-primary to-dream-accent-gold rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      progress.step === 'splitting'
                        ? 5
                        : progress.step === 'cleaning'
                        ? 20
                        : progress.step === 'analyzing'
                        ? 40
                        : progress.step === 'writing'
                        ? 60
                        : progress.step === 'painting'
                        ? 60 + ((progress.current - 3) / (progress.total - 3)) * 35
                        : 100
                    }%`,
                  }}
                />
              </div>

              <div className="mt-6 space-y-2">
                {progress.total > 0 &&
                  Array.from({ length: progress.total }, (_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        i < progress.current
                          ? 'bg-dream-accent-primary'
                          : i === progress.current && (progress.step === 'painting' || progress.step === 'writing')
                          ? 'bg-dream-accent-primary/30'
                          : 'bg-dream-bg-cream border border-dream-border-warm'
                      }`}
                    >
                      {i < progress.current ? (
                        <Check className="w-4 h-4 text-dream-text-primary" />
                      ) : i === progress.current &&
                        (progress.step === 'painting' || progress.step === 'writing') ? (
                        <Loader2 className="w-4 h-4 text-dream-accent-primary animate-spin" />
                      ) : (
                          <span className="text-xs text-dream-text-muted">
                            {i + 1}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          i < progress.current
                            ? 'text-dream-text-primary'
                            : 'text-dream-text-muted'
                        }`}
                      >
                        第 {i + 1} 幕
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!currentDream) return null;

  return (
    <PageContainer showNav={false}>
      <div className="min-h-full flex flex-col safe-top">
        <div className="flex items-center justify-between px-4 py-4 border-b border-dream-border-warm oil-glass sticky top-0 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-dream-bg-cream rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-dream-text-secondary" />
          </button>
          <h1 className="font-serif-sc text-lg font-semibold text-dream-text-primary">
            生成预览
          </h1>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-lg mx-auto">
            <h2 className="font-serif-sc text-2xl font-bold text-dream-text-primary mb-2">
              {currentDream.title}
            </h2>
            <p className="text-sm text-dream-text-muted mb-6">
              共 {currentDream.scenes.length} 幕 · 点击图片右上角可重新生成该幕
            </p>

            <div className="space-y-6">
              {currentDream.scenes.map((scene, index) => (
                <SceneCard
                  key={scene.id}
                  scene={scene}
                  isRegenerating={regeneratingIndex === index}
                  onRegenerate={() => handleRegenerateScene(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 left-0 right-0 p-4 safe-bottom oil-glass border-t border-dream-border-warm">
          <div className="max-w-lg mx-auto flex gap-3">
            <button
              onClick={handlePreview}
              className="flex-1 py-4 oil-btn-secondary rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              预览
            </button>
            <button
              onClick={handlePublish}
              className="flex-1 py-4 oil-btn-primary rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              发布到广场
            </button>
          </div>
        </div>
      </div>

      {showTagSelect && (
        <div className="absolute inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-dream-text-primary/30 backdrop-blur-sm"
            onClick={() => setShowTagSelect(false)}
          />
          <div className="relative w-full max-w-lg oil-glass rounded-t-3xl animate-slide-up">
            <div className="p-5 border-b border-dream-border-warm">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-5 h-5 text-dream-accent-primary" />
                <h3 className="font-serif-sc font-semibold text-lg text-dream-text-primary">
                  添加标签
                </h3>
              </div>
              <p className="text-sm text-dream-text-muted">
                选择最多 3 个标签，让更多人看到你的梦
              </p>
            </div>

            <div className="p-5 max-h-64 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {tagPool.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-dream-accent-primary text-white shadow-warm'
                        : 'oil-card text-dream-text-secondary hover:text-dream-text-primary'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 border-t border-dream-border-warm safe-bottom">
              <button
                onClick={confirmPublish}
                disabled={isPublishing}
                className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                  isPublishing
                    ? 'oil-btn-secondary cursor-not-allowed'
                    : 'oil-btn-primary'
                }`}
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    发布中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    确认发布
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Generate;
