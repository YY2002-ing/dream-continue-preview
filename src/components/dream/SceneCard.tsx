import { RefreshCw, Image } from 'lucide-react';
import type { Scene } from '../../types';

interface SceneCardProps {
  scene: Scene;
  isRegenerating?: boolean;
  onRegenerate?: () => void;
}

const SceneCard = ({ scene, isRegenerating = false, onRegenerate }: SceneCardProps) => {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="relative aspect-video">
        {isRegenerating ? (
          <div className="w-full h-full flex items-center justify-center bg-dream-bg-card">
            <div className="text-center">
              <RefreshCw className="w-10 h-10 text-dream-accent-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-dream-text-secondary">正在重新生成...</p>
            </div>
          </div>
        ) : (
          <>
            <img
              src={scene.imageUrl}
              alt={scene.title}
              className="w-full h-full object-cover"
            />
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-dream-accent-gold/90 text-dream-bg-primary text-xs font-semibold rounded-full">
              第 {scene.index} 幕
            </span>
            <h4 className="font-serif-sc font-semibold text-white">
              {scene.title}
            </h4>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-dream-text-secondary line-clamp-3">
          {scene.content}
        </p>
      </div>
    </div>
  );
};

export default SceneCard;
