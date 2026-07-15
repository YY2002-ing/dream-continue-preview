import { useNavigate } from 'react-router-dom';
import { Eye, GitBranch, Clock } from 'lucide-react';
import type { Dream } from '../../types';
import { formatNumber, formatDate } from '../../utils/helpers';

interface DreamCardProps {
  dream: Dream;
  index?: number;
}

const DreamCard = ({ dream, index = 0 }: DreamCardProps) => {
  const navigate = useNavigate();
  const firstScene = dream.scenes[0];

  const handleClick = () => {
    navigate(`/dream/${dream.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="oil-card rounded-2xl overflow-hidden cursor-pointer group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={firstScene.imageUrl}
          alt={dream.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dream-text-primary/80 via-transparent to-transparent" />
        
        {dream.isInterrupt && (
          <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-dream-accent-primary/95 rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-warm">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            未完待续
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-serif-sc font-semibold text-lg text-white drop-shadow-lg">
            {dream.title}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {dream.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-dream-accent-primary/15 text-dream-accent-primary text-xs font-medium rounded-full border border-dream-accent-primary/20"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-dream-text-secondary text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-dream-accent-teal" />
              <span>{formatNumber(dream.viewCount)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-dream-accent-primary" />
              <span>{dream.branchCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">{formatDate(dream.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-3 oil-divider">
          <img
            src={dream.author.avatar}
            alt={dream.author.nickname}
            className="w-6 h-6 rounded-full bg-dream-bg-cream border border-dream-border-warm"
          />
          <span className="text-sm text-dream-text-secondary font-medium">
            {dream.author.nickname}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DreamCard;
