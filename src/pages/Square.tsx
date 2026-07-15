import { useState, useEffect } from 'react';
import { Search, Sparkles, Moon } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import DreamCard from '../components/dream/DreamCard';
import TagFilter from '../components/dream/TagFilter';
import { useDreamStore } from '../store/useDreamStore';

const Square = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getDreams, activeTag } = useDreamStore();
  const dreams = getDreams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredDreams = dreams.filter((dream) =>
    dream.status === 'published' &&
    (searchQuery === '' ||
      dream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dream.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <PageContainer>
      <div className="max-w-lg mx-auto px-4 pt-6 safe-top">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dream-accent-primary to-dream-accent-gold flex items-center justify-center shadow-warm">
              <Moon className="w-6 h-6 text-dream-text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold oil-text-gradient">
                续写梦
              </h1>
              <p className="text-xs text-dream-text-muted">让你的梦继续下去</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl oil-card flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-dream-accent-primary" />
          </div>
        </div>

        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dream-text-muted" />
          <input
            type="text"
            placeholder="搜索梦境、标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 oil-input rounded-xl text-dream-text-primary placeholder-dream-text-muted"
          />
        </div>

        <div className="mb-5">
          <TagFilter />
        </div>

        <div className="space-y-4 pb-6">
          {filteredDreams.length > 0 ? (
            filteredDreams.map((dream, index) => (
              <div
                key={dream.id}
                className={`fade-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DreamCard dream={dream} index={index} />
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl oil-card flex items-center justify-center">
                <Moon className="w-10 h-10 text-dream-text-muted" />
              </div>
              <p className="text-dream-text-secondary mb-2 font-medium">
                {searchQuery ? '没有找到相关梦境' : '还没有人发布梦境'}
              </p>
              <p className="text-sm text-dream-text-muted">
                {searchQuery ? '试试其他关键词吧' : '来做第一个梦主吧'}
              </p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Square;
