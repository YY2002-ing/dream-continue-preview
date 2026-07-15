export interface User {
  id: string;
  nickname: string;
  avatar: string;
  isLoggedIn: boolean;
}

export interface Scene {
  id: string;
  index: number;
  title: string;
  content: string;
  imageUrl: string;
  branches?: Branch[];
}

export interface Branch {
  id: string;
  parentSceneId: string;
  parentDreamId: string;
  author: User;
  scenes: Scene[];
  createdAt: string;
  likeCount: number;
  preview: string;
}

export interface Dream {
  id: string;
  title: string;
  author: User;
  scenes: Scene[];
  tags: string[];
  branchCount: number;
  viewCount: number;
  createdAt: string;
  status: 'draft' | 'published';
  isInterrupt: boolean;
}

export interface Draft {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  createdAt: string;
}

export interface GenerationProgress {
  current: number;
  total: number;
  step: 'splitting' | 'cleaning' | 'analyzing' | 'writing' | 'painting' | 'complete';
  message: string;
}

export type TabType = 'published' | 'continued' | 'drafts';
