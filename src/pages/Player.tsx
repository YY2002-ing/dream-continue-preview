import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Heart, MoreHorizontal } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import SubtitleBox from '../components/player/SubtitleBox';
import BranchList from '../components/player/BranchList';
import CreateBranchModal from '../components/player/CreateBranchModal';
import { useDreamStore } from '../store/useDreamStore';
import type { Branch } from '../types';

const Player = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDreamById, setCurrentDream, currentDream, currentSceneIndex, setCurrentSceneIndex, nextScene, prevScene } = useDreamStore();
  
  const [showBranchList, setShowBranchList] = useState(false);
  const [showCreateBranch, setShowCreateBranch] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const dream = currentDream?.id === id ? currentDream : (id ? getDreamById(id) : undefined);

  useEffect(() => {
    if (id && dream) {
      setCurrentDream(dream);
    }
  }, [id, dream, setCurrentDream]);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentSceneIndex]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextScene();
        } else {
          prevScene();
        }
      }
      setTouchStartX(null);
    },
    [touchStartX, nextScene, prevScene]
  );

  if (!dream) {
    return (
      <PageContainer showNav={false}>
        <div className="h-full flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-dream-accent-primary/30 border-t-dream-accent-primary rounded-full animate-spin" />
        </div>
      </PageContainer>
    );
  }

  const currentScene = dream.scenes[currentSceneIndex];
  const isLastScene = currentSceneIndex === dream.scenes.length - 1;
  const hasBranches = currentScene.branches && currentScene.branches.length > 0;

  const handleViewBranches = () => {
    setShowBranchList(true);
  };

  const handleCreateBranch = () => {
    setShowCreateBranch(true);
  };

  const handleSelectBranch = (branch: Branch) => {
    setShowBranchList(false);
    navigate(`/branch/${branch.id}`);
  };

  return (
    <PageContainer showNav={false}>
      <div
        className="h-full relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-dream-bg-secondary">
              <div className="w-12 h-12 border-4 border-dream-accent-primary/30 border-t-dream-accent-primary rounded-full animate-spin" />
            </div>
          )}
          <img
            src={currentScene.imageUrl}
            alt={currentScene.title}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dream-text-primary/20 via-transparent to-dream-text-primary/60" />
        </div>

        <div className="absolute top-0 left-0 right-0 z-20 safe-top">
          <div className="flex items-center justify-between px-4 pt-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-dream-text-primary hover:bg-white/90 transition-colors shadow-warm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-dream-text-secondary hover:bg-white/90 transition-colors shadow-warm"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? 'text-red-500 fill-red-500' : ''
                  }`}
                />
              </button>
              <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-dream-text-secondary hover:bg-white/90 transition-colors shadow-warm">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-dream-text-secondary hover:bg-white/90 transition-colors shadow-warm">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <SubtitleBox
          scene={currentScene}
          totalScenes={dream.scenes.length}
          currentIndex={currentSceneIndex}
          isLastScene={isLastScene}
          isInterrupt={dream.isInterrupt}
          onPrev={prevScene}
          onNext={nextScene}
          onCreateBranch={handleCreateBranch}
          onViewBranches={handleViewBranches}
        />

        {showBranchList && currentScene.branches && (
          <BranchList
            branches={currentScene.branches}
            onClose={() => setShowBranchList(false)}
            onSelectBranch={handleSelectBranch}
          />
        )}

        {showCreateBranch && (
          <CreateBranchModal
            scene={currentScene}
            dreamId={dream.id}
            onClose={() => setShowCreateBranch(false)}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default Player;
