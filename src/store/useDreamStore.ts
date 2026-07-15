import { create } from 'zustand';
import type { Dream, Scene, Branch, Draft, GenerationProgress } from '../types';
import { mockDreams, mockDrafts, mockUser } from '../utils/mock';
import { generateId, delay } from '../utils/helpers';
import { highQualityScripts } from '../services/aiService';

const IMG_BASE = `${import.meta.env.BASE_URL}images/`;

const scriptImages: Record<string, string[]> = {
  office: ['script-office-1', 'script-office-2', 'script-office-3', 'script-office-4'],
  forest: ['script-forest-1', 'script-forest-2', 'script-forest-3', 'scene-3-3'],
  school: ['script-school-1', 'script-school-2', 'script-school-3', 'script-school-4'],
  ocean: ['scene-2-1', 'scene-2-2', 'scene-2-3', 'script-office-4'],
  sky: ['script-sky-1', 'script-sky-2', 'script-sky-1', 'script-office-4'],
  house: ['script-house-1', 'script-house-2', 'script-house-3', 'script-office-4'],
  train: ['script-train-1', 'script-train-2', 'script-train-3', 'script-office-4'],
};

const getImageByKeyword = (content: string, index: number): string => {
  let key = 'forest';
  if (content.includes('办公室') || content.includes('工作') || content.includes('同事') || content.includes('电脑')) {
    key = 'office';
  } else if (content.includes('森林') || content.includes('树') || content.includes('鹿')) {
    key = 'forest';
  } else if (content.includes('学校') || content.includes('教室') || content.includes('同学') || content.includes('老师')) {
    key = 'school';
  } else if (content.includes('海') || content.includes('水') || content.includes('鱼') || content.includes('鲸')) {
    key = 'ocean';
  } else if (content.includes('飞') || content.includes('云') || content.includes('天空')) {
    key = 'sky';
  } else if (content.includes('房子') || content.includes('家') || content.includes('奶奶') || content.includes('老')) {
    key = 'house';
  } else if (content.includes('火车') || content.includes('列车') || content.includes('车站') || content.includes('地铁')) {
    key = 'train';
  }
  const images = scriptImages[key];
  return `${IMG_BASE}${images[index % images.length]}.jpg`;
};

interface DreamState {
  dreams: Dream[];
  currentDream: Dream | null;
  currentSceneIndex: number;
  drafts: Draft[];
  currentDraft: Draft | null;
  generationProgress: GenerationProgress | null;
  isGenerating: boolean;
  myDreams: Dream[];
  myBranches: Branch[];
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  setCurrentDream: (dream: Dream | null) => void;
  setCurrentSceneIndex: (index: number) => void;
  nextScene: () => void;
  prevScene: () => void;
  getDreams: () => Dream[];
  getDreamById: (id: string) => Dream | undefined;
  createDraft: (title: string, content: string) => Draft;
  updateDraft: (id: string, title: string, content: string) => void;
  deleteDraft: (id: string) => void;
  setCurrentDraft: (draft: Draft | null) => void;
  generateVisualNovel: (
    title: string,
    content: string,
    onProgress?: (progress: GenerationProgress) => void
  ) => Promise<Dream>;
  regenerateScene: (
    dreamId: string,
    sceneIndex: number
  ) => Promise<Scene>;
  publishDream: (dreamId: string, tags: string[]) => void;
  createBranch: (
    parentDreamId: string,
    parentSceneId: string,
    content: string
  ) => Promise<Branch>;
  getBranchById: (branchId: string) => Branch | undefined;
}

const irrelevantPatterns = [
  /我记不清了/g, /我忘了/g, /大概是/g, /好像是/g, /应该是/g, /可能是/g, /不确定/g,
  /我要记录这个梦/g, /我想记录这个梦/g, /我得把这个梦记下来/g, /我要把这个梦写下来/g,
  /我要赶紧记下来/g, /这是一个梦/g, /昨晚做了一个梦/g, /我做了一个梦/g,
  /然后我就醒了/g, /突然就醒了/g, /结果就醒了/g, /梦醒了/g, /就这样醒了/g,
  /气死我了/g, /太可惜了/g, /还没看完/g, /还没问完/g, /还没说完/g,
  /啊/g, /哎呀/g, /哦/g, /嗯/g, /吧/g, /呢/g, /嘛/g,
];

const cleanContent = (content: string): string => {
  let cleaned = content;
  irrelevantPatterns.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, '');
  });
  cleaned = cleaned.replace(/[。！？]{2,}/g, '。');
  cleaned = cleaned.replace(/\s+/g, '');
  return cleaned.trim();
};

interface EventNode {
  text: string;
  timeMarker: string;
  location?: string;
  action?: string;
  emotion?: string;
  isFlashback: boolean;
}

const timeMarkers = [
  { marker: '一开始', order: 1 },
  { marker: '首先', order: 1 },
  { marker: '起初', order: 1 },
  { marker: '开始', order: 1 },
  { marker: '进入', order: 1 },
  { marker: '来到', order: 2 },
  { marker: '然后', order: 3 },
  { marker: '接着', order: 3 },
  { marker: '之后', order: 3 },
  { marker: '随后', order: 3 },
  { marker: '突然', order: 4 },
  { marker: '就在这时', order: 4 },
  { marker: '这时', order: 4 },
  { marker: '后来', order: 5 },
  { marker: '最后', order: 6 },
  { marker: '结局', order: 6 },
  { marker: '醒之前', order: 6 },
];

const parseEvents = (content: string): EventNode[] => {
  const cleaned = cleanContent(content);
  const sentences = cleaned.split(/[。！？.!?]+/).filter((s) => s.trim().length > 4);
  
  const events: EventNode[] = [];
  
  sentences.forEach((sentence) => {
    let timeMarker = '然后';
    let isFlashback = false;
    
    for (const { marker, order } of timeMarkers) {
      if (sentence.includes(marker)) {
        timeMarker = marker;
        break;
      }
    }
    
    if (sentence.includes('之前') || sentence.includes('曾经') || sentence.includes('回忆')) {
      isFlashback = true;
    }
    
    events.push({
      text: sentence.replace(timeMarker, '').trim(),
      timeMarker,
      isFlashback,
    });
  });
  
  const orderedEvents = events.sort((a, b) => {
    const orderA = timeMarkers.find((t) => t.marker === a.timeMarker)?.order || 3;
    const orderB = timeMarkers.find((t) => t.marker === b.timeMarker)?.order || 3;
    
    if (a.isFlashback && !b.isFlashback) return -1;
    if (!a.isFlashback && b.isFlashback) return 1;
    
    return orderA - orderB;
  });
  
  return orderedEvents;
};

interface DreamElements {
  characters: string[];
  locations: string[];
  objects: string[];
  emotions: string[];
  timePeriod: string;
  atmosphere: string;
  visualStyle: string;
}

const extractDreamElements = (content: string): DreamElements => {
  const characters: string[] = [];
  const locations: string[] = [];
  const objects: string[] = [];
  const emotions: string[] = [];

  const characterPatterns = [
    /老师/g, /同学/g, /朋友/g, /家人/g, /妈妈/g, /爸爸/g, /猫/g, /狗/g,
    /朋友/g, /同事/g, /陌生人/g, /老人/g, /小孩/g, /少年/g, /少女/g,
    /精灵/g, /怪物/g, /天使/g, /恶魔/g, /幽灵/g,
  ];
  
  const locationPatterns = [
    /森林/g, /城市/g, /学校/g, /家里/g, /办公室/g, /海边/g, /山上/g, /城堡/g,
    /房间/g, /街道/g, /公园/g, /图书馆/g, /医院/g, /车站/g, /机场/g,
    /梦境/g, /幻境/g, /异界/g, /未来/g, /过去/g, /天空/g, /海底/g,
    /废墟/g, /宫殿/g, /花园/g, /迷宫/g, /洞穴/g,
  ];

  const objectPatterns = [
    /书/g, /手机/g, /电脑/g, /钥匙/g, /门/g, /窗/g, /花/g, /树/g,
    /水/g, /火/g, /光/g, /影子/g, /镜子/g, /钟/g, /表/g, /画/g,
    /刀/g, /剑/g, /信/g, /盒子/g, /钥匙/g, /宝石/g, /星星/g, /月亮/g,
  ];

  const emotionPatterns = [
    /害怕/g, /开心/g, /难过/g, /生气/g, /惊讶/g, /困惑/g, /温暖/g, /寒冷/g,
    /紧张/g, /放松/g, /兴奋/g, /失落/g, /怀念/g, /期待/g, /奇怪/g,
    /迷茫/g, /绝望/g, /希望/g, /恐惧/g, /悲伤/g, /喜悦/g, /震撼/g,
  ];

  characterPatterns.forEach((pattern) => {
    const match = content.match(pattern);
    if (match) {
      match.forEach((m) => {
        if (!characters.includes(m) && characters.length < 6) {
          characters.push(m);
        }
      });
    }
  });

  locationPatterns.forEach((pattern) => {
    const match = content.match(pattern);
    if (match) {
      match.forEach((m) => {
        if (!locations.includes(m) && locations.length < 5) {
          locations.push(m);
        }
      });
    }
  });

  objectPatterns.forEach((pattern) => {
    const match = content.match(pattern);
    if (match) {
      match.forEach((m) => {
        if (!objects.includes(m) && objects.length < 8) {
          objects.push(m);
        }
      });
    }
  });

  emotionPatterns.forEach((pattern) => {
    const match = content.match(pattern);
    if (match) {
      match.forEach((m) => {
        if (!emotions.includes(m) && emotions.length < 5) {
          emotions.push(m);
        }
      });
    }
  });

  if (characters.length === 0) {
    characters.push('旅人');
  }

  if (locations.length === 0) {
    const defaultLocations = ['迷雾森林', '遗忘之境', '记忆回廊'];
    locations.push(defaultLocations[Math.floor(Math.random() * defaultLocations.length)]);
  }

  if (emotions.length === 0) {
    const defaultEmotions = ['恍惚', '迷茫', '神秘'];
    emotions.push(defaultEmotions[Math.floor(Math.random() * defaultEmotions.length)]);
  }

  const timeOptions = ['黎明', '黄昏', '深夜', '午后', '凌晨', '午夜'];
  const timePeriod = timeOptions[Math.floor(Math.random() * timeOptions.length)];

  const atmospheres = ['梦幻', '神秘', '温暖', '诡异', '宁静', '躁动', '怀旧', '悲伤', '希望'];
  const atmosphere = atmospheres[Math.floor(Math.random() * atmospheres.length)];

  const styles = ['油画风格', '水彩风格', '动画风格', '写实风格', '插画风格', '赛博朋克'];
  const visualStyle = styles[Math.floor(Math.random() * styles.length)];

  return {
    characters,
    locations,
    objects,
    emotions,
    timePeriod,
    atmosphere,
    visualStyle,
  };
};

interface SceneStructure {
  type: 'opening' | 'development' | 'climax' | 'ending';
  title: string;
  description: string;
}

const createSceneStructure = (events: EventNode[], elements: DreamElements): SceneStructure[] => {
  const structures: SceneStructure[] = [];
  
  const totalEvents = events.length;
  
  if (totalEvents === 0) {
    return [
      { type: 'opening', title: '梦境之门', description: '故事从这里开始...' },
      { type: 'development', title: '迷雾深处', description: '未知的世界在眼前展开' },
      { type: 'ending', title: '梦醒时分', description: '一切都在消散...' },
    ];
  }

  const openingEvents = events.slice(0, Math.ceil(totalEvents * 0.2));
  const developmentEvents = events.slice(Math.ceil(totalEvents * 0.2), Math.ceil(totalEvents * 0.7));
  const climaxEvents = events.slice(Math.ceil(totalEvents * 0.7), Math.ceil(totalEvents * 0.9));
  const endingEvents = events.slice(Math.ceil(totalEvents * 0.9));

  const opening = {
    type: 'opening' as const,
    title: generateTitle(elements, 'opening'),
    description: openingEvents.map((e) => e.text).join('。'),
  };

  const developments: SceneStructure[] = [];
  const devCount = Math.max(1, Math.ceil(developmentEvents.length / 2));
  for (let i = 0; i < devCount; i++) {
    const start = i * Math.ceil(developmentEvents.length / devCount);
    const end = Math.min(start + Math.ceil(developmentEvents.length / devCount), developmentEvents.length);
    const devEvents = developmentEvents.slice(start, end);
    developments.push({
      type: 'development' as const,
      title: generateTitle(elements, 'development', i),
      description: devEvents.map((e) => e.text).join('。'),
    });
  }

  const climax = climaxEvents.length > 0 ? {
    type: 'climax' as const,
    title: generateTitle(elements, 'climax'),
    description: climaxEvents.map((e) => e.text).join('。'),
  } : null;

  const ending = endingEvents.length > 0 ? {
    type: 'ending' as const,
    title: '梦醒时分',
    description: endingEvents.map((e) => e.text).join('。'),
  } : {
    type: 'ending' as const,
    title: '梦醒时分',
    description: '就在最关键的时刻，梦突然中断了...',
  };

  structures.push(opening);
  structures.push(...developments);
  if (climax) structures.push(climax);
  structures.push(ending);

  return structures;
};

const generateTitle = (elements: DreamElements, type: string, index = 0): string => {
  const titles: Record<string, string[]> = {
    opening: [
      `${elements.locations[0]}的入口`,
      '梦的开始',
      `${elements.timePeriod}的微光`,
      '踏入未知',
      `${elements.atmosphere}的序幕`,
    ],
    development: [
      `探索${elements.locations[1] || elements.locations[0]}`,
      `与${elements.characters[0]}相遇`,
      `${elements.objects[0]}的秘密`,
      `${elements.emotions[0]}的预感`,
      '逐渐清晰的真相',
      '隐藏的线索',
    ],
    climax: [
      '命运的交汇',
      `${elements.emotions[0]}的顶点`,
      '真相大白',
      '最终的抉择',
      '梦的核心',
    ],
    ending: [
      '梦醒时分',
      '回归现实',
      '残留的余韵',
      '未完的故事',
    ],
  };

  const list = titles[type];
  return list[Math.min(index, list.length - 1)];
};

const literaryProcess = (rawText: string, elements: DreamElements, sceneType: string): string => {
  if (!rawText || rawText.length < 5) {
    return generateDefaultText(elements, sceneType);
  }

  let processed = rawText;

  processed = processed.replace(/我/g, '我');
  processed = processed.replace(/他/g, '他');
  processed = processed.replace(/她/g, '她');

  const softReplacements: Record<string, string> = {
    '走了': '缓缓走向',
    '跑去': '快步奔向',
    '看着': '注视着',
    '想到': '心中浮现出',
    '听到了': '耳边传来',
    '看到了': '眼前出现了',
    '很大': '巨大',
    '很小': '微小',
    '很美': '美得令人窒息',
    '很奇怪': '透着说不出的诡异',
    '很害怕': '心跳加速，脊背发凉',
    '很开心': '心中涌起暖意',
  };

  Object.keys(softReplacements).forEach((key) => {
    processed = processed.split(key).join(softReplacements[key]);
  });

  const atmospherePrefixes = {
    opening: [
      `朦胧中，${elements.timePeriod}的光透过薄雾洒下。`,
      `一切都像隔着一层薄纱，梦境缓缓展开。`,
    ],
    development: [
      `空气里弥漫着${elements.atmosphere}的气息。`,
      `时间在这里仿佛放慢了脚步。`,
    ],
    climax: [
      `就在这一刻，所有的一切都变得不同了。`,
      `心跳声在耳边清晰地响起。`,
    ],
    ending: [
      `意识开始模糊，梦境的边缘在碎裂。`,
      `光影开始扭曲，一切都在远去...`,
    ],
  };

  const atmosphereSuffixes = {
    opening: ['一切都笼罩在不真实之中。', '故事就这样开始了。'],
    development: ['仿佛有什么在悄然变化。', '空气中浮动着不安的因子。'],
    climax: ['世界仿佛静止了一瞬。', '所有的线索在此刻交汇。'],
    ending: ['画面开始褪色...', '只剩下残留的感觉。'],
  };

  const prefix = atmospherePrefixes[sceneType as keyof typeof atmospherePrefixes][Math.floor(Math.random() * 2)];
  const suffix = atmosphereSuffixes[sceneType as keyof typeof atmosphereSuffixes][Math.floor(Math.random() * 2)];

  return `${prefix}${processed}${suffix}`;
};

const generateDefaultText = (elements: DreamElements, sceneType: string): string => {
  const defaults: Record<string, string[]> = {
    opening: [
      `${elements.locations[0]}在${elements.timePeriod}的微光中若隐若现，旅人踏入这片未知的土地。四周弥漫着${elements.atmosphere}的气息，一切都像隔着一层薄纱。`,
      `梦的帷幕缓缓拉开，${elements.locations[0]}出现在眼前。${elements.timePeriod}的光芒洒落在${elements.objects[0] || '大地'}上，勾勒出神秘的轮廓。`,
    ],
    development: [
      `旅人继续前行，${elements.objects.slice(0, 2).join('和')}在光影中若隐若现。${elements.atmosphere}的感觉越来越强烈，仿佛有什么在等待着被发现。`,
      `在${elements.locations[1] || elements.locations[0]}深处，${elements.characters[0]}的身影悄然浮现。${elements.emotions[0] || '神秘'}的气息笼罩着一切，故事开始变得复杂起来。`,
    ],
    climax: [
      `就在这时，一切都发生了变化。${elements.locations[0]}开始崩塌，${elements.objects[0]}发出耀眼的光芒。真相终于浮出水面，但梦也即将结束...`,
      `命运的交汇点到来了。${elements.characters[0]}与旅人对视，${elements.emotions[0]}的感觉达到了顶点。所有的谜团都在这一刻解开。`,
    ],
    ending: [
      `就在最关键的时刻，梦突然中断了。${elements.locations[0]}的画面逐渐消散，只留下${elements.emotions[0] || '恍惚'}的感觉在心中久久不散...`,
      `现实的光芒渗入梦境，${elements.timePeriod}的景象开始崩塌。旅人挣扎着想要抓住什么，但一切都在化为虚无。`,
    ],
  };

  return defaults[sceneType][Math.floor(Math.random() * defaults[sceneType].length)];
};

const generateVisualNovelScript = (
  title: string,
  content: string
): { scenes: { title: string; content: string; imagePrompt: string }[]; elements: DreamElements } => {
  const events = parseEvents(content);
  const elements = extractDreamElements(content);
  const sceneStructures = createSceneStructure(events, elements);

  const scenes: { title: string; content: string; imagePrompt: string }[] = sceneStructures.map((structure) => {
    const literaryContent = literaryProcess(structure.description, elements, structure.type);
    
    return {
      title: structure.title,
      content: literaryContent,
      imagePrompt: generateImagePrompt(structure.title, literaryContent, elements),
    };
  });

  return { scenes, elements };
};

const generateImagePrompt = (
  sceneTitle: string,
  sceneContent: string,
  elements: DreamElements
): string => {
  const keyVisuals = [
    ...elements.locations.slice(0, 2),
    ...elements.objects.slice(0, 4),
    elements.atmosphere,
    elements.timePeriod,
  ];

  const styleDescriptions: Record<string, string> = {
    '油画风格': 'oil painting style, impressionistic, rich textures, warm color palette, dreamlike atmosphere, painterly strokes',
    '水彩风格': 'watercolor painting, soft edges, ethereal, pastel colors, delicate brushstrokes, dreamy',
    '动画风格': 'anime style, cinematic lighting, highly detailed, dreamy atmosphere, vibrant colors, Studio Ghibli inspired',
    '写实风格': 'photorealistic, cinematic, dramatic lighting, hyper detailed, moody atmosphere, atmospheric',
    '插画风格': 'digital illustration, concept art, fantasy style, atmospheric perspective, beautiful composition, detailed',
    '赛博朋克': 'cyberpunk, neon lights, futuristic, dreamlike, surreal, atmospheric lighting, neon colors',
  };

  const style = styleDescriptions[elements.visualStyle] || styleDescriptions['油画风格'];
  const visuals = keyVisuals.join(', ');

  return `${sceneTitle}, ${sceneContent.slice(0, 80)}, ${visuals}, ${style}, 16:9 ratio, masterpiece, high quality, highly detailed, atmospheric lighting, cinematic composition, surreal, dreamlike`;
};

const generateSceneImage = (prompt: string): string => {
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt
  )}&image_size=landscape_16_9`;
};

export const useDreamStore = create<DreamState>((set, get) => ({
  dreams: mockDreams,
  currentDream: null,
  currentSceneIndex: 0,
  drafts: mockDrafts,
  currentDraft: null,
  generationProgress: null,
  isGenerating: false,
  myDreams: mockDreams.filter((d) => d.author.id === mockUser.id),
  myBranches: [],
  activeTag: null,

  setActiveTag: (tag) => set({ activeTag: tag }),

  setCurrentDream: (dream) =>
    set({ currentDream: dream, currentSceneIndex: 0 }),

  setCurrentSceneIndex: (index) => set({ currentSceneIndex: index }),

  nextScene: () => {
    const { currentDream, currentSceneIndex } = get();
    if (currentDream && currentSceneIndex < currentDream.scenes.length - 1) {
      set({ currentSceneIndex: currentSceneIndex + 1 });
    }
  },

  prevScene: () => {
    const { currentSceneIndex } = get();
    if (currentSceneIndex > 0) {
      set({ currentSceneIndex: currentSceneIndex - 1 });
    }
  },

  getDreams: () => {
    const { dreams, activeTag } = get();
    if (!activeTag) return dreams;
    return dreams.filter((d) => d.tags.includes(activeTag));
  },

  getDreamById: (id) => {
    return get().dreams.find((d) => d.id === id);
  },

  createDraft: (title, content) => {
    const now = new Date().toISOString();
    const draft: Draft = {
      id: generateId(),
      title,
      content,
      updatedAt: now,
      createdAt: now,
    };
    set((state) => ({
      drafts: [draft, ...state.drafts],
    }));
    return draft;
  },

  updateDraft: (id, title, content) => {
    const now = new Date().toISOString();
    set((state) => ({
      drafts: state.drafts.map((d) =>
        d.id === id ? { ...d, title, content, updatedAt: now } : d
      ),
    }));
  },

  deleteDraft: (id) => {
    set((state) => ({
      drafts: state.drafts.filter((d) => d.id !== id),
    }));
  },

  setCurrentDraft: (draft) => set({ currentDraft: draft }),

  generateVisualNovel: async (title, content, onProgress) => {
    set({ isGenerating: true, generationProgress: { current: 0, total: 0, step: 'splitting', message: '正在打开梦境之门...' } });

    await delay(500);

    const matchingScript = highQualityScripts.find(s => 
      s.keywords.some(k => content.includes(k))
    ) || highQualityScripts[0];

    const scriptScenes = matchingScript.scenes.map(s => ({ title: s.title, content: s.content }));
    const tags = matchingScript.tags;

    const progressSteps: GenerationProgress[] = [
      { step: 'cleaning', message: '正在剔除梦境中的杂质...', current: 1, total: 4 + scriptScenes.length },
      { step: 'analyzing', message: '正在梳理时间线...', current: 2, total: 4 + scriptScenes.length },
      { step: 'writing', message: '正在编织故事...', current: 3, total: 4 + scriptScenes.length },
    ];

    for (const p of progressSteps) {
      const progress: GenerationProgress = p;
      set({ generationProgress: progress });
      onProgress?.(progress);
      await delay(600);
    }

    const totalScenes = scriptScenes.length;
    const scenes: Scene[] = [];

    for (let i = 0; i < scriptScenes.length; i++) {
      const scriptScene = scriptScenes[i];

      const sceneProgress: GenerationProgress = {
        current: i + 4,
        total: 4 + totalScenes,
        step: 'painting',
        message: `正在绘制第 ${i + 1} 幕：${scriptScene.title}...`,
      };
      set({ generationProgress: sceneProgress });
      onProgress?.(sceneProgress);

      await delay(800);

      scenes.push({
        id: generateId(),
        index: i + 1,
        title: scriptScene.title,
        content: scriptScene.content,
        imageUrl: getImageByKeyword(scriptScene.content, i),
        branches: [],
      });

      const updateProgress: GenerationProgress = {
        current: i + 4,
        total: 4 + totalScenes,
        step: i === scriptScenes.length - 1 ? 'complete' : 'painting',
        message: i === scriptScenes.length - 1 ? '梦境已编织完成...' : `正在绘制第 ${i + 2} 幕...`,
      };
      set({ generationProgress: updateProgress });
      onProgress?.(updateProgress);
    }

    const newDream: Dream = {
      id: generateId(),
      title: title || matchingScript.title,
      author: mockUser,
      scenes,
      tags,
      branchCount: 0,
      viewCount: 0,
      createdAt: new Date().toISOString(),
      status: 'draft',
      isInterrupt: true,
    };

    set((state) => ({
      dreams: [newDream, ...state.dreams],
      currentDream: newDream,
      isGenerating: false,
      generationProgress: null,
    }));

    return newDream;
  },

  regenerateScene: async (dreamId, sceneIndex) => {
    await delay(800);

    const dream = get().dreams.find((d) => d.id === dreamId);
    if (!dream) throw new Error('Dream not found');

    const scene = dream.scenes[sceneIndex];

    const updatedScene: Scene = {
      ...scene,
      imageUrl: getImageByKeyword(scene.content, (sceneIndex + Date.now()) % 10),
    };

    set((state) => ({
      dreams: state.dreams.map((d) => {
        if (d.id !== dreamId) return d;
        const newScenes = [...d.scenes];
        newScenes[sceneIndex] = updatedScene;
        return { ...d, scenes: newScenes };
      }),
      currentDream:
        state.currentDream?.id === dreamId
          ? {
              ...state.currentDream,
              scenes: state.currentDream.scenes.map((s, i) =>
                i === sceneIndex ? updatedScene : s
              ),
            }
          : state.currentDream,
    }));

    return updatedScene;
  },

  publishDream: (dreamId, tags) => {
    set((state) => ({
      dreams: state.dreams.map((d) =>
        d.id === dreamId
          ? { ...d, status: 'published', tags, createdAt: new Date().toISOString() }
          : d
      ),
      myDreams: state.myDreams.map((d) =>
        d.id === dreamId
          ? { ...d, status: 'published', tags, createdAt: new Date().toISOString() }
          : d
      ),
    }));
  },

  createBranch: async (parentDreamId, parentSceneId, content) => {
    await delay(1500);

    const dream = get().dreams.find((d) => d.id === parentDreamId);
    if (!dream) throw new Error('Dream not found');

    const branchScript = highQualityScripts[Math.floor(Math.random() * highQualityScripts.length)];
    const scenes: Scene[] = branchScript.scenes.slice(0, 2).map((s, i) => ({
      id: generateId(),
      index: i + 1,
      title: s.title,
      content: s.content,
      imageUrl: getImageByKeyword(s.content, i + 10),
      branches: [],
    }));

    const branch: Branch = {
      id: generateId(),
      parentSceneId,
      parentDreamId,
      author: mockUser,
      scenes,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      preview: content.slice(0, 30) + '...',
    };

    set((state) => {
      const updatedDreams = state.dreams.map((d) => {
        if (d.id !== parentDreamId) return d;
        const updatedScenes = d.scenes.map((s) => {
          if (s.id !== parentSceneId) return s;
          return {
            ...s,
            branches: [...(s.branches || []), branch],
          };
        });
        return {
          ...d,
          scenes: updatedScenes,
          branchCount: d.branchCount + 1,
        };
      });

      return {
        dreams: updatedDreams,
        myBranches: [branch, ...state.myBranches],
      };
    });

    return branch;
  },

  getBranchById: (branchId) => {
    const { dreams } = get();
    for (const dream of dreams) {
      for (const scene of dream.scenes) {
        const branch = scene.branches?.find((b) => b.id === branchId);
        if (branch) return branch;
      }
    }
    return undefined;
  },
}));
