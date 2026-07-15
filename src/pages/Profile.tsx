import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  BookOpen,
  GitBranch,
  FileText,
  ChevronRight,
  LogOut,
  Edit3,
  Trash2,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import DreamCard from '../components/dream/DreamCard';
import { useUserStore } from '../store/useUserStore';
import { useDreamStore } from '../store/useDreamStore';
import type { TabType } from '../types';
import { formatDate } from '../utils/helpers';
import dreamBg from '../assets/dream_bg.png';

const Profile = () => {
  const navigate = useNavigate();
  const { user, activeTab, setActiveTab } = useUserStore();
  const { myDreams, myBranches, drafts, deleteDraft, setCurrentDraft } = useDreamStore();
  const [showSettings, setShowSettings] = useState(false);

  const tabs: { id: TabType; label: string; icon: typeof BookOpen; count: number }[] = [
    { id: 'published', label: '我的梦', icon: BookOpen, count: myDreams.length },
    { id: 'continued', label: '我的续写', icon: GitBranch, count: myBranches.length },
    { id: 'drafts', label: '草稿箱', icon: FileText, count: drafts.length },
  ];

  const handleEditDraft = (draft: typeof drafts[0]) => {
    setCurrentDraft(draft);
    navigate('/record');
  };

  const handleDeleteDraft = (draftId: string) => {
    if (confirm('确定要删除这个草稿吗？')) {
      deleteDraft(draftId);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-lg mx-auto px-4 pt-6 safe-top">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif-sc text-xl font-bold text-dream-text-primary">我的</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 -mr-2 hover:bg-dream-bg-cream rounded-full transition-colors"
          >
            <Settings className="w-6 h-6 text-dream-text-secondary" />
          </button>
        </div>

        <div className="relative rounded-3xl overflow-hidden mb-6 shadow-warm-xl">
          <img
            src={dreamBg}
            alt="梦境背景"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dream-text-primary/60 via-transparent to-dream-text-primary/20" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-dream-accent-secondary/60 shadow-warm-lg">
                {user.avatar && user.avatar !== 'transparent' ? (
                  <img
                    src={user.avatar}
                    alt={user.nickname}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-transparent" />
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 oil-btn-primary rounded-full flex items-center justify-center shadow-warm">
                <Edit3 className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1 pb-2">
              <h2 className="font-serif-sc text-xl font-semibold text-white mb-1 drop-shadow-md">
                {user.nickname}
              </h2>
              <p className="text-sm text-dream-accent-cream/80">
                ID: {user.id}
              </p>
            </div>
          </div>
        </div>

        <div className="oil-card rounded-2xl p-4 mb-6 border border-dream-border-warm">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-dream-accent-primary">
                {myDreams.length}
              </p>
              <p className="text-xs text-dream-text-muted mt-1">发布的梦</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-dream-accent-secondary">
                {myBranches.length}
              </p>
              <p className="text-xs text-dream-text-muted mt-1">续写分支</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-dream-accent-amber">
                {drafts.length}
              </p>
              <p className="text-xs text-dream-text-muted mt-1">草稿</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 mb-4 oil-card rounded-xl p-1 border border-dream-border-warm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'oil-btn-primary shadow-warm'
                    : 'text-dream-text-secondary hover:text-dream-text-primary hover:bg-dream-bg-cream'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span
                  className={`text-xs ${
                    isActive ? 'text-white/80' : 'text-dream-text-muted'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="pb-6">
          {activeTab === 'published' && (
            <div className="space-y-4">
              {myDreams.length > 0 ? (
                myDreams.map((dream, index) => (
                  <DreamCard key={dream.id} dream={dream} index={index} />
                ))
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-dream-text-muted opacity-50" />
                  <p className="text-dream-text-secondary mb-1">还没有发布过梦境</p>
                  <p className="text-sm text-dream-text-muted">
                    记录你的第一个梦吧
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'continued' && (
            <div className="space-y-3">
              {myBranches.length > 0 ? (
                myBranches.map((branch) => (
                  <div
                    key={branch.id}
                    onClick={() => navigate(`/branch/${branch.id}`)}
                    className="oil-card rounded-xl p-4 cursor-pointer hover:shadow-warm transition-all border border-dream-border-warm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-dream-accent-secondary/10 flex items-center justify-center flex-shrink-0">
                        <GitBranch className="w-5 h-5 text-dream-accent-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2 mb-1 text-dream-text-primary">
                          {branch.preview}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-dream-text-muted">
                          <span>来自原梦境</span>
                          <span>{formatDate(branch.createdAt)}</span>
                          <span>{branch.likeCount} 赞</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-dream-text-muted flex-shrink-0" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <GitBranch className="w-12 h-12 mx-auto mb-3 text-dream-text-muted opacity-50" />
                  <p className="text-dream-text-secondary mb-1">还没有续写过</p>
                  <p className="text-sm text-dream-text-muted">
                    去广场看看别人的梦吧
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'drafts' && (
            <div className="space-y-3">
              {drafts.length > 0 ? (
                drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="oil-card rounded-xl p-4 border border-dream-border-warm"
                  >
                    <div
                      onClick={() => handleEditDraft(draft)}
                      className="cursor-pointer"
                    >
                      <h4 className="font-medium text-dream-text-primary mb-1">{draft.title}</h4>
                      <p className="text-sm text-dream-text-secondary line-clamp-2 mb-2">
                        {draft.content}
                      </p>
                      <p className="text-xs text-dream-text-muted">
                        最后编辑：{formatDate(draft.updatedAt)}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3 pt-3 oil-divider">
                      <button
                        onClick={() => handleEditDraft(draft)}
                        className="flex-1 py-2 text-sm oil-btn-secondary rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit3 className="w-4 h-4" />
                        继续编辑
                      </button>
                      <button
                        onClick={() => handleDeleteDraft(draft.id)}
                        className="flex-1 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        删除
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-dream-text-muted opacity-50" />
                  <p className="text-dream-text-secondary mb-1">暂无草稿</p>
                  <p className="text-sm text-dream-text-muted">
                    记录梦境时会自动保存
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showSettings && (
        <div className="absolute inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-dream-text-primary/50 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          />
          <div className="relative w-full max-w-lg bg-dream-bg-card rounded-t-3xl animate-slide-up safe-bottom">
            <div className="p-5 border-b border-dream-border-warm">
              <h3 className="font-serif-sc font-semibold text-lg text-center text-dream-text-primary">
                设置
              </h3>
            </div>

            <div className="p-4 space-y-2">
              <button className="w-full flex items-center justify-between p-4 oil-card rounded-xl hover:shadow-warm transition-all border border-dream-border-warm">
                <span className="text-dream-text-primary">修改昵称</span>
                <ChevronRight className="w-5 h-5 text-dream-text-muted" />
              </button>
              <button className="w-full flex items-center justify-between p-4 oil-card rounded-xl hover:shadow-warm transition-all border border-dream-border-warm">
                <span className="text-dream-text-primary">修改头像</span>
                <ChevronRight className="w-5 h-5 text-dream-text-muted" />
              </button>
              <button className="w-full flex items-center justify-between p-4 oil-card rounded-xl hover:shadow-warm transition-all border border-dream-border-warm">
                <span className="text-dream-text-primary">隐私设置</span>
                <ChevronRight className="w-5 h-5 text-dream-text-muted" />
              </button>
              <button className="w-full flex items-center justify-between p-4 oil-card rounded-xl hover:shadow-warm transition-all border border-dream-border-warm">
                <span className="text-dream-text-primary">关于续写梦</span>
                <ChevronRight className="w-5 h-5 text-dream-text-muted" />
              </button>
            </div>

            <div className="p-4 border-t border-dream-border-warm safe-bottom">
              <button className="w-full py-4 text-red-500 font-medium flex items-center justify-center gap-2 hover:bg-red-500/10 rounded-xl transition-colors">
                <LogOut className="w-5 h-5" />
                退出登录
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Profile;
