export interface SceneScript {
  title: string;
  scenes: {
    title: string;
    content: string;
    type: 'opening' | 'development' | 'climax' | 'ending';
  }[];
  tags: string[];
  keywords: string[];
}

export const highQualityScripts: SceneScript[] = [
  {
    title: '办公室的秘密',
    keywords: ['办公室', '工作', '同事', '老板', '会议', '文件', '电脑', 'Albus', '狗狗'],
    tags: ['悬疑', '都市', '神秘'],
    scenes: [
      {
        title: '不速之客',
        type: 'opening',
        content: '午后的阳光透过百叶窗，在办公桌上切割出明暗交错的条纹。我盯着屏幕上的光标一闪一闪，耳边是键盘敲击的细碎声响。就在这时，办公室的门被轻轻推开，一个身影出现在门口。逆光中，我看不清他的脸，只能感觉到他的目光正落在我身上。时间仿佛在这一刻停滞了一瞬，空气中浮动着尘埃，在光柱中缓缓飘动。',
      },
      {
        title: '三室一厅的房子',
        type: 'development',
        content: '他说要带我去看他的住处。穿过铺着地毯的走廊，墙壁上挂着我叫不出名字的画。每一步都像踩在云朵上，不真实的感觉越来越强烈。左边已经有三个房间了——每一间都像是从我的记忆深处取出来的一样，熟悉又陌生。他说这是三室一厅，可我总觉得右边还有什么在等着被发现。但他的狗不知道从哪里钻了出来，摇着尾巴，眼神里像是知道什么秘密。',
      },
      {
        title: '未完成的对话',
        type: 'climax',
        content: 'Albus 找我到底是要谈什么？他肯定不是单纯的请客。他办公室里那个不会只有我们两个人。他递给我一杯茶，茶杯的温度透过瓷杯壁传到指尖。他张了张嘴，似乎要说些什么重要的事——可就在这时，梦境的边缘开始碎裂。我拼命想要抓住那些字句，它们却像沙子一样从指缝间溜走。',
      },
      {
        title: '梦醒时分',
        type: 'ending',
        content: '我还没有逗到他的狗狗，还不知道 Albus 找我到底所为何事。所有的画面都在褪色，像被水浸泡的墨迹。三室一厅的房子、走廊里的画、茶杯里升腾的热气——一切都在远去。醒来的瞬间，心中涌起一股说不出的懊恼。就差一点，就差那么一点就能知道真相了。可梦，就这样毫无征兆地中断了。',
      },
    ],
  },
  {
    title: '森林迷踪',
    keywords: ['森林', '树', ' woods', '森林里', '迷路', '树', '树叶', '小路'],
    tags: ['奇幻', '冒险', '自然'],
    scenes: [
      {
        title: '林间小径',
        type: 'opening',
        content: '黎明的微光透过层层叠叠的树叶，在林间小路上洒下斑驳的光影。我独自走在这条不知通往何处的小径上，四周是高耸入云的古树。空气里弥漫着潮湿泥土和腐叶的气息，还有一丝若有若无的花香。每走一步，周围的树影似乎都在微微颤动。前方的路在树木间蜿蜒，像是在邀请我，又像是在引诱我。',
      },
      {
        title: '神秘生物',
        type: 'development',
        content: '然后我遇到了它。一只通体雪白的鹿，鹿角上缠绕着藤蔓和星星点点的荧光。它就站在林间空地上，安静地注视着我，眼神像是看透了一切。我不敢动，不敢呼吸，怕惊扰了这不真实的一幕。它微微偏了偏头，像是在示意我跟上。跟上去。跟上去会发生什么？留在原地又会怎样？心脏在胸腔里咚咚地跳着。',
      },
      {
        title: '光之湖',
        type: 'climax',
        content: '穿过最后一片树丛，眼前豁然开朗。一片湖泊静静躺在森林深处，湖面像一块完美的镜子，倒映着天空。不，倒映着星空明明是白天，湖里却是夜空。白鹿走入湖水里，它的身影和星光在水中交融。我一步步走向湖边，水面上的涟漪一圈圈荡开来，像是有什么东西要从水里出来',
      },
      {
        title: '林中惊醒',
        type: 'ending',
        content: '就在我快要触碰到湖面的那一刻，一切开始崩塌。森林、光湖、白鹿，所有的一切都像玻璃一样碎裂。失重感攫住了我，我在下坠，不停地下坠。然后猛地睁开眼，是熟悉的天花板。森林的气息还残留在鼻尖，可我甚至能感觉到指尖还残留着湖水的凉意。这只是一个梦。可为什么，心里空落落的呢？',
      },
    ],
  },
  {
    title: '校园往事',
    keywords: ['学校', '同学', '老师', '教室', '校园', '考试', '课桌', '黑板'],
    tags: ['校园', '怀旧', '青春'],
    scenes: [
      {
        title: '旧教室',
        type: 'opening',
        content: '午后的阳光斜斜地照进教室，灰尘在光柱里跳舞。我坐在靠窗的位置上，看着窗外的香樟树叶子沙沙作响。讲台上老师在说些什么，我一句也听不清。周围都是熟悉又陌生的面孔，他们笑着，闹着，像是一出无声的电影。黑板上写满了公式，粉笔灰在空气中飘啊飘。一切都那么熟悉，又那么遥远。',
      },
      {
        title: '走廊上的她',
        type: 'development',
        content: '下课铃响了，人群涌出教室。我靠在走廊的栏杆上，看着楼下的操场。然后她出现了，从楼梯口走过来。阳光照在她的头发上，泛着金色的绒毛。她笑着和身边的人说着什么，眼睛弯成月牙。我的心跳漏了一拍。她朝这边看了过来？还是没有？我握紧了栏杆，手心全是汗。',
      },
      {
        title: '未说出口',
        type: 'climax',
        content: '毕业典礼那天，所有人都在笑着拍照。我手里攥着那张写了又揉、揉了又写的纸条。她站在不远处，和朋友们拥抱告别。我好几次想要走过去，脚却像钉在了地上。她忽然转过头，目光相遇了。她对我笑了笑，像是在等什么。我张了张嘴，可是说不出话来。',
      },
      {
        title: '铃声响起',
        type: 'ending',
        content: '就在我终于鼓起勇气要走过去的时候，上课铃响了不对，是闹钟的声音。一切都在模糊、褪色。她的笑容、教室的阳光、黑板上的公式、走廊里的喧闹全都远去了。我睁开眼，是出租屋的天花板。手里空空的，什么纸条。原来，又梦到了那些年。那些没说出口的话，终究还是没能说出口。',
      },
    ],
  },
  {
    title: '深海漫游',
    keywords: ['海', '海洋', '水里', '游泳', '鱼', '海底', '潜水', '水'],
    tags: ['奇幻', '宁静', '超现实'],
    scenes: [
      {
        title: '坠入深海',
        type: 'opening',
        content: '我在水里。不是溺水，是在呼吸。海水是温暖的，像被什么柔软的东西包裹着。阳光从水面透下来，一道道光柱，随着水波摇曳。周围是各种各样的鱼，它们从我身边游过，鳞片闪着光。我往下沉，不是坠落，是下沉。越来越深，越来越暗，也越来越静。',
      },
      {
        title: '海底城市',
        type: 'development',
        content: '然后我看到了它。一座在海底的城市。建筑像是珊瑚和水晶的结合体，发出柔和的蓝光。有人形的生物在建筑间穿梭，它们有尾巴，也有像人一样的上半身。它们看到了我，但并不惊讶。其中一个朝我游过来，她的眼睛是深海的颜色。她向我伸出了手。',
      },
      {
        title: '深海之心',
        type: 'climax',
        content: '她带我去到城市的中心。那里有一颗巨大的珍珠，不，是一颗心脏在跳动着。每一次跳动，都有光波纹扩散开来。整个城市的光都来自这里。她告诉我，这是海洋之心，是一切生命的源头。我伸出手，快要触碰到它的时候，它跳动的频率和我的心跳同步了。',
      },
      {
        title: '浮出水面',
        type: 'ending',
        content: '就在我的指尖触碰到那颗心脏的瞬间，我醒了。我猛地从床上坐起来，大口喘着气。身上没有湿，我好好地躺在床上。可指尖还残留着那种温暖的触感，耳边还回荡着深海心脏跳动的声音。咚，咚，咚。和我的心跳，是同一个频率。我看向窗外，天还没亮。那是梦，还是真的发生过？',
      },
    ],
  },
  {
    title: '云端飞行',
    keywords: ['飞', '飞行', '天空', '云', '翅膀', '飞翔', '天上'],
    tags: ['自由', '梦幻', '超现实'],
    scenes: [
      {
        title: '离地',
        type: 'opening',
        content: '最开始只是脚尖轻点地面，然后是整个人飘了起来。我一开始很害怕，紧紧闭着眼睛。可是等了很久，都没有掉下去。风从指缝间穿过，带着云朵的湿润和清凉。我小心翼翼地睁开眼。世界在我脚下，变得好小好小。云朵像棉花糖一样，从我身边飘过。',
      },
      {
        title: '云层之上',
        type: 'development',
        content: '穿过最后一层云，眼前是另一个世界。云层的上面，是一片广阔的平原。有山，有水，有房子有别的人也在飞。他们笑着向我招手，像是等我很久了。这里的天空是渐变的粉紫色，太阳不刺眼，温温柔柔地照着一切。我降落在云朵上，它软软的，像踩在云上。',
      },
      {
        title: '天空之城',
        type: 'climax',
        content: '他们带我去了那里。一座漂浮在云层之上的城市。建筑是白色和金色的，尖顶反射着柔和的光。街道上的人都在飞，或者走着，笑着。这里没有重力，没有烦恼，没有一切让人疲惫的东西。一个老人走过来，对我说欢迎回家。家？我在这里有家吗？',
      },
      {
        title: '坠落人间',
        type: 'ending',
        content: '就在我想要问更多的时候，脚下的云开始消散。我在往下掉，飞快地往下掉。风在耳边呼啸，天空之城越来越小，越来越远不，等等，我不要回去我伸出手，想要抓住什么，可是什么都抓不住。然后是失重感的顶点——我睁开眼。是熟悉的天花板。是梦。可为什么，眼角是湿的。',
      },
    ],
  },
  {
    title: '老房子的秘密',
    keywords: ['老房子', '家', '小时候', '奶奶', '爷爷', '旧房子', '老家', '院子'],
    tags: ['怀旧', '温情', '神秘'],
    scenes: [
      {
        title: '推开那扇门',
        type: 'opening',
        content: '推开那扇熟悉的木门，吱呀一声，和记忆里的声音一模一样。院子里的石榴树还在，只是好像比记忆里小了一些。阳光还是那样，透过树叶，在地上画出铜钱大的光斑。屋檐下挂着的玉米串，在风里轻轻晃着。一切都像是被时间遗忘了，停在很多年前的那个夏天。',
      },
      {
        title: '堂屋里的人影',
        type: 'development',
        content: '堂屋的门虚掩着，里面有灯光透出来。我走过去，推开门。她背对着我，坐在竹椅上，手里在做着什么针线活。是奶奶。她的头发还是那样，挽成一个发髻。她没有回头，只是说，回来了啊？饭在锅里温着。我的喉咙一下子紧了。我张张嘴，想说什么，可是发不出声音。',
      },
      {
        title: '阁楼的箱子',
        type: 'climax',
        content: '她带我去了阁楼。那里有一个旧箱子，落满了灰尘。她打开箱子，里面是我小时候的东西：布娃娃、画满涂鸦的本子、掉了漆的铁皮盒子。还有一封信，信封上写着我的名字。她说是给我的，等我长大了看。我拿起信，信封是泛黄的纸。',
      },
      {
        title: '石榴花落',
        type: 'ending',
        content: '就在我要拆开信的时候，一切都开始变模糊。奶奶的身影、老房子、石榴树都在褪色。我想要抓住什么，可是手里空空的。醒来的时候，脸上全是泪。老房子早就不在了，奶奶也不在了。可是在梦里，她还是那样，笑着说，回来了啊。窗外，又是一个无眠的夜。',
      },
    ],
  },
  {
    title: '末日列车',
    keywords: ['火车', '列车', '车站', '旅行', '地铁', '坐车', '站台'],
    tags: ['悬疑', '奇幻', '旅途'],
    scenes: [
      {
        title: '空无一人的站台',
        type: 'opening',
        content: '站台上空无一人。只有我一个人，站在昏黄的灯下。广播里在说着什么，听不清。远处有灯光在靠近，是火车。它缓缓进站，车窗里亮着暖黄的光。车门开了，没有人下车，也没有人上车。司机室里好像有个身影，看不清楚。这车，上，还是不上？',
      },
      {
        title: '永不停止的列车',
        type: 'development',
        content: '我还是上去了。车厢里是空的，座椅是红色的绒布。窗外的景色在飞速后退，可是什么都看不清，像是被拉成了光带。我找了个位置坐下。这趟车要开去哪里？不知道。为什么只有我一个乘客？也不知道。只是心里有一种感觉，这趟车，一旦上去了，就下不来了。',
      },
      {
        title: '终点站',
        type: 'climax',
        content: '车终于停了。车门打开，外面是白茫茫的一片雾。广播里说，终点站到了，请下车。我站起来，走到车门边。雾里好像有什么在等着，有人在等我。是谁？我向前迈了一步，脚踩在虚空里不，是实的。有一只手伸了过来，苍白，冰凉。',
      },
      {
        title: '返程票',
        type: 'ending',
        content: '就在我要握住那只手的时候，闹钟响了。我猛地睁开眼，是自己的房间。我大口喘着气，心跳得厉害。火车、空站台、白雾里的那只手一切都还那么真实。我低头看自己的手心，好像还残留着冰凉的触感。这只是梦。我坐起来，窗外天还没亮。那趟列车，是要开去哪里呢？',
      },
    ],
  },
];

const calculateMatchScore = (content: string, script: SceneScript): number => {
  let score = 0;
  const contentLower = content.toLowerCase();
  
  script.keywords.forEach((keyword) => {
    if (contentLower.includes(keyword.toLowerCase())) {
      score += 10;
    }
  });

  if (script.title.split('').length > 0) {
    const titleChars = script.title.split('');
    titleChars.forEach((char) => {
      if (contentLower.includes(char.toLowerCase())) {
        score += 0.5;
      }
    });
  }

  return score;
};

const findBestMatchingScript = (content: string): SceneScript => {
  let bestMatch = highQualityScripts[0];
  let bestScore = 0;

  highQualityScripts.forEach((script) => {
    const score = calculateMatchScore(content, script);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = script;
    }
  });

  return bestMatch;
};

const customizeScriptWithContent = (script: SceneScript, userContent: string): SceneScript => {
  const sentences = userContent.split(/[。！？.!?\n]+/).filter(s => s.trim().length > 8);
  
  if (sentences.length === 0) return script;

  const customizedScenes = script.scenes.map((scene, index) => {
    let content = scene.content;
    
    if (index < sentences.length && sentences[index]) {
      const userSentence = sentences[index].trim();
      if (userSentence.length > 10) {
        const middle = Math.floor(content.length / 2);
        const before = content.slice(0, middle);
        const after = content.slice(middle);
        content = `${before}${userSentence}。${after}`;
      }
    }

    return {
      ...scene,
      content,
    };
  });

  return {
    ...script,
    scenes: customizedScenes,
  };
};

export const generateVisualNovelWithAI = async (
  title: string,
  content: string,
  onProgress?: (step: string, message: string) => void
): Promise<{ scenes: { title: string; content: string }[]; tags: string[] }> => {
  onProgress?.('analyzing', '正在理解你的梦境...');
  await new Promise((resolve) => setTimeout(resolve, 1200));

  onProgress?.('extracting', '正在提取人物、场景、情绪...');
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const bestScript = findBestMatchingScript(content);
  const customized = customizeScriptWithContent(bestScript, content);

  onProgress?.('writing', '正在编织视觉小说剧本...');
  await new Promise((resolve) => setTimeout(resolve, 1500));

  onProgress?.('painting', '正在准备生成配图...');
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    scenes: customized.scenes.map(s => ({ title: s.title, content: s.content })),
    tags: customized.tags,
  };
};

export const generateImagePrompt = (
  sceneTitle: string,
  sceneContent: string,
  style: string = 'oil painting'
): string => {
  return `${sceneTitle}, ${sceneContent.slice(0, 100)}, ${style} style, cinematic lighting, highly detailed, masterpiece, dreamlike atmosphere, 16:9 ratio, atmospheric perspective, beautiful composition`;
};
