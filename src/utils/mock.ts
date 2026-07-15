import type { User, Dream, Scene, Branch, Draft } from '../types';

export const mockUser: User = {
  id: 'user-1',
  nickname: '梦游者',
  avatar: 'transparent',
  isLoggedIn: true,
};

export const mockUsers: User[] = [
  mockUser,
  {
    id: 'user-2',
    nickname: '星河捕手',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=starlight',
    isLoggedIn: true,
  },
  {
    id: 'user-3',
    nickname: '云端漫步',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cloudwalker',
    isLoggedIn: true,
  },
  {
    id: 'user-4',
    nickname: '午夜诗人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=midnight',
    isLoggedIn: true,
  },
];

const sceneImages = {
  hogwarts: [
    'https://images.unsplash.com/photo-1585543805890-6051f7829f98?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=1280&h=720&fit=crop',
  ],
  ocean: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1280&h=720&fit=crop',
  ],
  forest: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1496442266868-6d9c4036e3b6?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&h=720&fit=crop',
  ],
  subway: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1546484959-ba64b0756a1e?w=1280&h=720&fit=crop',
  ],
  library: [
    'https://images.unsplash.com/photo-1478737270239-2f02b77ac2a7?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1280&h=720&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5770?w=1280&h=720&fit=crop',
  ],
};

const getImageForScene = (content: string, index: number): string => {
  if (content.includes('霍格沃茨') || content.includes('邓布利多') || content.includes('城堡')) {
    return sceneImages.hogwarts[index % sceneImages.hogwarts.length];
  }
  if (content.includes('海') || content.includes('水') || content.includes('鲸鱼') || content.includes('水母')) {
    return sceneImages.ocean[index % sceneImages.ocean.length];
  }
  if (content.includes('森林') || content.includes('树') || content.includes('小鹿') || content.includes('衣柜')) {
    return sceneImages.forest[index % sceneImages.forest.length];
  }
  if (content.includes('地铁') || content.includes('飞')) {
    return sceneImages.subway[index % sceneImages.subway.length];
  }
  if (content.includes('图书馆') || content.includes('书') || content.includes('猫')) {
    return sceneImages.library[index % sceneImages.library.length];
  }
  return sceneImages.forest[index % sceneImages.forest.length];
};

const createScene = (
  id: string,
  index: number,
  title: string,
  content: string,
  _imageSeed: string
): Scene => ({
  id,
  index,
  title,
  content,
  imageUrl: getImageForScene(content, index),
  branches: [],
});

export const mockDreams: Dream[] = [
  {
    id: 'dream-1',
    title: '邓布利多门口的猫眼',
    author: mockUsers[1],
    tags: ['霍格沃茨', '奇幻', '未完待续'],
    branchCount: 3,
    viewCount: 1234,
    createdAt: '2026-07-01T08:30:00Z',
    status: 'published',
    isInterrupt: true,
    scenes: [
      createScene(
        'scene-1-1',
        1,
        '深夜的走廊',
        '月光穿过高高的拱形窗户，在霍格沃茨的走廊地板上投下斑驳的光影。我独自一人走在寂静的石板路上，脚下的脚步声回荡在空旷的走廊中。远处传来猫头鹰的叫声，空气中弥漫着蜡烛和旧书的味道。',
        'hogwarts corridor at night moonlight'
      ),
      createScene(
        'scene-1-2',
        2,
        '神秘的门',
        '转过一个拐角，我看到了一扇从未见过的门。门上刻着奇怪的符文，在月光下微微发光。门的中央有一个猫眼形状的锁孔，金色的瞳孔似乎在注视着我。我情不自禁地走近，伸手想要触碰那扇门。',
        'mysterious door with cat eye lock hogwarts'
      ),
      createScene(
        'scene-1-3',
        3,
        '猫眼睁开',
        '就在我的手指即将触碰到门的瞬间，那只猫眼突然眨了一下！我吓得后退一步，心跳加速。猫眼的瞳孔收缩了一下，然后门的另一侧传来了轻微的脚步声。有人...或者有什么东西，正在门的另一边向我走来。',
        'cat eye on door opening glowing magical'
      ),
      createScene(
        'scene-1-4',
        4,
        '门的另一边',
        '门缓缓打开，一道金色的光芒从门缝中溢出。我眯起眼睛，试图看清门后的景象。我看到了邓布利多的身影，他背对着我，似乎在和什么人说话。他的声音很低，我听不清内容，但我能感觉到空气中弥漫着一种紧张的气氛。然后，他缓缓转过身来...',
        'dumbledore silhouette golden light doorway'
      ),
    ],
  },
  {
    id: 'dream-2',
    title: '海底城市的鲸鱼歌',
    author: mockUsers[2],
    tags: ['海洋', '科幻', '日常'],
    branchCount: 2,
    viewCount: 856,
    createdAt: '2026-06-30T14:20:00Z',
    status: 'published',
    isInterrupt: true,
    scenes: [
      createScene(
        'scene-2-1',
        1,
        '沉入深海',
        '我不断地下沉，穿过层层海水。阳光从上方透下来，变成越来越深的蓝色。奇怪的是，我可以在水中自由呼吸，衣服也没有被打湿。身边游过一群发光的水母，它们的触须在水中划出梦幻的光轨。',
        'underwater ocean deep blue jellyfish glowing'
      ),
      createScene(
        'scene-2-2',
        2,
        '海底城市',
        '当我终于触碰到海底时，眼前出现了一座璀璨的城市。巨大的气泡罩住了整个城市，里面的建筑发出柔和的光芒。人鱼在街道上游弋，海藻随着水流轻轻摇曳。远处，一头巨大的鲸鱼缓缓游过，它的歌声在水中回荡。',
        'underwater city bubble dome mermaids glowing buildings'
      ),
      createScene(
        'scene-2-3',
        3,
        '鲸鱼的召唤',
        '那头鲸鱼似乎注意到了我，它转过身来，巨大的眼睛直视着我。它的歌声变得更加清晰，我竟然能听懂它在说什么。"你来的正是时候，"它说，"我们需要你的帮助。深海的沉睡者正在苏醒..."',
        'giant whale underwater eye glowing mystical'
      ),
    ],
  },
  {
    id: 'dream-3',
    title: '我家衣柜里有另一个世界',
    author: mockUsers[0],
    tags: ['奇幻', '冒险', '未完待续'],
    branchCount: 5,
    viewCount: 2341,
    createdAt: '2026-06-29T10:15:00Z',
    status: 'published',
    isInterrupt: true,
    scenes: [
      createScene(
        'scene-3-1',
        1,
        '奇怪的声音',
        '那天深夜，我被一阵奇怪的声音吵醒。那声音听起来像是...风铃声？但我的房间里根本没有风铃。我睁开眼睛，发现声音是从衣柜里传出来的。月光透过窗帘的缝隙照进来，在地板上投下长长的影子。',
        'bedroom at night moonlight wardrobe mysterious'
      ),
      createScene(
        'scene-3-2',
        2,
        '打开衣柜',
        '我鼓起勇气，走到衣柜前。声音越来越清晰了，还夹杂着...树叶沙沙作响的声音？我深吸一口气，猛地拉开衣柜门。然而，衣柜里并不是我的衣服，而是一片森林！萤火虫在树木间飞舞，远处隐约可见一座发着光的城堡。',
        'wardrobe opening to magical forest fireflies castle'
      ),
      createScene(
        'scene-3-3',
        3,
        '踏入新世界',
        '我不由自主地伸出手，触碰到了衣柜里的"空气"。我的手指穿过了某种温暖的、带着花香的屏障。下一秒，我发现自己已经站在了森林里。脚下是柔软的草地，头顶是繁星点点的夜空。一只小鹿从树丛后探出头来，好奇地看着我。',
        'magical forest at night stars deer fireflies fantasy'
      ),
      createScene(
        'scene-3-4',
        4,
        '城堡的方向',
        '远处的城堡发出柔和的光芒，仿佛在召唤我。我开始向那个方向走去，森林里的一切都显得那么不真实却又那么熟悉。就在我快要走出森林的时候，一个穿着斗篷的身影出现在我面前。"你终于来了，"他说，"我们等你很久了。"',
        'figure in cloak forest path glowing castle distance'
      ),
      createScene(
        'scene-3-5',
        5,
        '身份之谜',
        '那个人缓缓摘下兜帽，露出了一张...和我一模一样的脸！只是他的眼睛是金色的，头发里夹杂着银丝。"我是另一个你，"他微笑着说，"或者说，是你在这里的样子。来吧，有很多事情需要你去..."他的话还没说完，远处传来了钟声。他的脸色突然变了。',
        'person with golden eyes same face mysterious cloak'
      ),
    ],
  },
  {
    id: 'dream-4',
    title: '会飞的地铁',
    author: mockUsers[3],
    tags: ['都市', '奇幻', '搞笑'],
    branchCount: 1,
    viewCount: 567,
    createdAt: '2026-06-28T18:45:00Z',
    status: 'published',
    isInterrupt: false,
    scenes: [
      createScene(
        'scene-4-1',
        1,
        '早高峰',
        '又是普通的周一早上，我挤在地铁里，周围是密密麻麻的人群。车厢里弥漫着豆浆和包子的味道，每个人都低着头看手机。我打着哈欠，心想今天又是无聊的一天。然而，当地铁驶出隧道的时候，我发现外面的景色不太对劲。',
        'subway train crowded morning commute people phones'
      ),
      createScene(
        'scene-4-2',
        2,
        '飞起来了',
        '地铁没有在轨道上行驶，而是...飞了起来！我们冲出了城市，漂浮在云层之上。阳光透过窗户照进来，每个人都惊讶地抬起头。有人尖叫，有人掏出手机拍照，还有人淡定地继续刷短视频。我看向窗外，看到了其他飞行的地铁，它们像鱼群一样在空中穿梭。',
        'flying subway above clouds sunrise city below'
      ),
    ],
  },
  {
    id: 'dream-5',
    title: '图书馆里的猫馆长',
    author: mockUsers[1],
    tags: ['日常', '治愈', '校园'],
    branchCount: 2,
    viewCount: 987,
    createdAt: '2026-06-27T21:30:00Z',
    status: 'published',
    isInterrupt: true,
    scenes: [
      createScene(
        'scene-5-1',
        1,
        '旧图书馆',
        '那是一座很老很老的图书馆，木质的楼梯踩上去会发出咯吱咯吱的声音。我经常来这里看书，因为几乎没有人来，很安静。但今天，我发现了一件奇怪的事——三楼那扇永远锁着的门，今天竟然开了一条缝。',
        'old library interior wooden shelves books sunlight dust'
      ),
      createScene(
        'scene-5-2',
        2,
        '神秘的房间',
        '我推开门，里面是一个圆形的房间，四周的书架一直延伸到看不见的天花板。房间中央有一张大桌子，桌子上趴着一只橘猫。它戴着一副小小的圆眼镜，爪子里还拿着一本书。听到我进来，它抬起头，用一种很嫌弃的眼神看着我。',
        'orange cat with glasses reading book library round room'
      ),
      createScene(
        'scene-5-3',
        3,
        '猫馆长',
        '"你终于来了，"那只猫竟然开口说话了，"我等你好久了。作为新任的图书馆助理，你有很多东西要学。"我愣住了，什么助理？我只是想借书而已。猫馆长从桌子上跳下来，迈着优雅的步子走向我。"跟我来，"它说，"我带你看看真正的图书馆。"',
        'orange cat walking on hind legs magical library shelves'
      ),
    ],
  },
];

export const mockBranches: Branch[] = [
  {
    id: 'branch-1',
    parentSceneId: 'scene-1-4',
    parentDreamId: 'dream-1',
    author: mockUsers[2],
    createdAt: '2026-07-01T12:00:00Z',
    likeCount: 45,
    preview: '邓布利多微笑着说："你来得正好，凤凰社需要一个新成员..."',
    scenes: [
      createScene(
        'branch-1-scene-1',
        1,
        '凤凰的眼泪',
        '邓布利多完全转过身来，他的眼睛在月光下闪烁着智慧的光芒。他手里拿着一只小玻璃瓶，里面装着发光的金色液体。"这是凤凰福克斯的眼泪，"他说，"它能治愈一切伤痛。但现在，我们需要它来做更重要的事。"',
        'dumbledore holding phoenix tears glowing bottle'
      ),
      createScene(
        'branch-1-scene-2',
        2,
        '新的使命',
        '"你被选中了，"邓布利多继续说道，"不是因为你最强大，而是因为你最善良。在黑暗即将来临的时候，善良比任何魔法都更有力量。"他把玻璃瓶递给我，我的手指触碰到瓶子的那一刻，一股温暖的感觉传遍全身。',
        'hand receiving glowing bottle magical light dumbledore'
      ),
    ],
  },
  {
    id: 'branch-2',
    parentSceneId: 'scene-1-4',
    parentDreamId: 'dream-1',
    author: mockUsers[3],
    createdAt: '2026-07-01T14:30:00Z',
    likeCount: 32,
    preview: '那不是邓布利多，那是伏地魔！他的眼睛里闪着红光...',
    scenes: [
      createScene(
        'branch-2-scene-1',
        1,
        '伪装被揭穿',
        '当那个人完全转过来时，我看到的不是邓布利多慈祥的面孔，而是一张苍白、没有鼻子的脸。是伏地魔！他一直在伪装。"愚蠢的孩子，"他冷笑着说，"你真的以为邓布利多会在这里等你吗？"他举起魔杖，绿光在指尖聚集。',
        'voldemort raising wand green light dark corridor'
      ),
    ],
  },
  {
    id: 'branch-3',
    parentSceneId: 'scene-3-5',
    parentDreamId: 'dream-3',
    author: mockUsers[1],
    createdAt: '2026-06-30T09:00:00Z',
    likeCount: 78,
    preview: '远处传来的钟声是警报——暗影骑士正在追杀我们...',
    scenes: [
      createScene(
        'branch-3-scene-1',
        1,
        '暗影骑士',
        '"快走！"另一个我抓住我的手臂，拉着我向森林深处跑去。身后传来马蹄声和金属碰撞的声音。我回头一看，一群骑着黑马的骑士正在追来，他们穿着黑色的铠甲，脸藏在头盔的阴影中，只有眼睛的位置发出红色的光芒。',
        'shadow knights black armor red eyes forest chase'
      ),
      createScene(
        'branch-3-scene-2',
        2,
        '秘密通道',
        '我们跑到一棵巨大的古树前，另一个我在树干上按了一下，一道暗门打开了。"进去！"他把我推进去，自己也跟了进来。暗门在我们身后关上，外面的声音瞬间消失了。黑暗中，我听到他在我身边喘气。"现在，"他说，"我来告诉你关于你真实身份的事。"',
        'secret door inside ancient tree dark passage glowing runes'
      ),
    ],
  },
];

mockDreams[0].scenes[3].branches = mockBranches.filter(
  (b) => b.parentSceneId === 'scene-1-4'
);
mockDreams[2].scenes[4].branches = mockBranches.filter(
  (b) => b.parentSceneId === 'scene-3-5'
);

export const mockDrafts: Draft[] = [
  {
    id: 'draft-1',
    title: '那个会飞的教室',
    content:
      '昨天晚上我梦到我们的教室飘起来了，就像热气球一样。我们都坐在座位上，老师还在讲课，就好像什么都没发生一样。窗外是云朵，还有鸟从旁边飞过...',
    updatedAt: '2026-07-02T07:30:00Z',
    createdAt: '2026-07-02T07:25:00Z',
  },
];

export const aiInspirations: Record<string, string[]> = {
  default: [
    '这时，一个陌生人从阴影中走了出来...',
    '你发现自己拥有了一种从未有过的能力...',
    '周围的一切开始变得扭曲，时空在你眼前折叠...',
    '一个声音从远方传来，告诉你必须做出选择...',
  ],
};

export const tagPool = [
  '悬疑',
  '奇幻',
  '校园',
  '日常',
  '恐怖',
  '搞笑',
  '爱情',
  '科幻',
  '武侠',
  '未完待续',
];
