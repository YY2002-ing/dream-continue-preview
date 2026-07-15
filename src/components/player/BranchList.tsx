import { X, Eye } from 'lucide-react';
import type { Branch } from '../../types';

interface BranchListProps {
  branches: Branch[];
  onClose: () => void;
  onSelectBranch: (branch: Branch) => void;
}

const BranchList = ({ branches, onClose, onSelectBranch }: BranchListProps) => {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-dream-text-primary/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-dream-bg-card rounded-t-3xl p-6 pb-8 safe-bottom animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif-sc text-xl font-semibold text-dream-text-primary">
            续写分支
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-dream-bg-cream transition-colors"
          >
            <X className="w-5 h-5 text-dream-text-secondary" />
          </button>
        </div>

        <p className="text-sm text-dream-text-secondary mb-4">
          其他用户为这个梦境续写了不同的故事线...
        </p>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {branches.map((branch, index) => (
            <div
              key={branch.id}
              onClick={() => onSelectBranch(branch)}
              className="oil-card rounded-xl p-4 cursor-pointer hover:shadow-warm transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dream-accent-primary/10 flex items-center justify-center font-serif-sc font-bold text-dream-accent-primary">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-dream-text-primary group-hover:text-dream-accent-primary transition-colors">
                      {branch.scenes[0]?.title || '续写分支'}
                    </h4>
                    <p className="text-xs text-dream-text-muted">
                      {branch.author.nickname} · {branch.likeCount} 赞
                    </p>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-dream-bg-cream group-hover:bg-dream-accent-primary/10 transition-colors">
                  <Eye className="w-4 h-4 text-dream-text-secondary" />
                </div>
              </div>
              <p className="mt-2 text-sm text-dream-text-secondary line-clamp-2">
                {branch.preview}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchList;
