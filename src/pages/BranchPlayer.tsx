import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import SubtitleBox from '../components/player/SubtitleBox';
import { useDreamStore } from '../store/useDreamStore';

const BranchPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBranchById } = useDreamStore();
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const branch = id ? getBranchById(id) : undefined;

  useEffect(() => {
    setImageLoaded(false);
  }, [currentSceneIndex]);

  if (!branch) {
    return (
      <PageContainer showNav={false}>
        <div className="h-full flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-dream-accent-primary/30 border-t-dream-accent-primary rounded-full animate-spin" />
        </div>
      </PageContainer>
    );
  }

  const currentScene = branch.scenes[currentSceneIndex];
  const isLastScene = currentSceneIndex === branch.scenes.length - 1;

  const nextScene = () => {
    if (currentSceneIndex < branch.scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    }
  };

  const prevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  return (
    <PageContainer showNav={false}>
      <div className="h-full relative">
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
            </div>
          </div>
        </div>

        <SubtitleBox
          scene={currentScene}
          totalScenes={branch.scenes.length}
          currentIndex={currentSceneIndex}
          isLastScene={isLastScene}
          isInterrupt={false}
          onPrev={prevScene}
          onNext={nextScene}
          onCreateBranch={() => {}}
          onViewBranches={() => {}}
        />
      </div>
    </PageContainer>
  );
};

export default BranchPlayer;
