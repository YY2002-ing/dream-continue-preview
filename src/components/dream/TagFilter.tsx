import { tagPool } from '../../utils/mock';
import { useDreamStore } from '../../store/useDreamStore';

const TagFilter = () => {
  const { activeTag, setActiveTag } = useDreamStore();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
      <button
        onClick={() => setActiveTag(null)}
        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          !activeTag
            ? 'bg-dream-accent-primary text-white shadow-warm'
            : 'oil-card text-dream-text-secondary hover:text-dream-text-primary'
        }`}
      >
        全部
      </button>
      {tagPool.map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveTag(tag)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTag === tag
              ? 'bg-dream-accent-primary text-white shadow-warm'
              : 'oil-card text-dream-text-secondary hover:text-dream-text-primary'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
