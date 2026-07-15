import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import type { Scene } from '../../types';

interface CreateBranchModalProps {
  scene: Scene;
  dreamId: string;
  onClose: () => void;
}

const CreateBranchModal = ({ scene, dreamId, onClose }: CreateBranchModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsGenerating(false);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-dream-text-primary/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-dream-bg-card rounded-t-3xl p-6 pb-8 safe-bottom animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif-sc text-xl font-semibold text-dream-text-primary">
            续写梦境
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-dream-bg-cream transition-colors"
          >
            <X className="w-5 h-5 text-dream-text-secondary" />
          </button>
        </div>

        <p className="text-sm text-dream-text-secondary mb-4">
          当前剧情：{scene.title}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dream-text-primary mb-2">
              续写标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="给你的续写起个名字..."
              className="oil-input w-full"
              disabled={isGenerating}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dream-text-primary mb-2">
              续写方向描述
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="描述你想如何续写这个故事..."
              rows={4}
              className="oil-input w-full resize-none"
              disabled={isGenerating}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!title.trim() || isGenerating}
            className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              !title.trim() || isGenerating
                ? 'bg-dream-border-warm text-dream-text-muted cursor-not-allowed'
                : 'oil-btn-primary'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-dream-text-primary/30 border-t-dream-text-primary rounded-full animate-spin" />
                正在生成...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                开始续写
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBranchModal;
