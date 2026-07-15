import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Square from './pages/Square';
import Record from './pages/Record';
import Generate from './pages/Generate';
import Player from './pages/Player';
import BranchPlayer from './pages/BranchPlayer';
import Profile from './pages/Profile';
import BottomNav from './components/layout/BottomNav';

const MobileContent = () => {
  const location = useLocation();
  const isPlayerPage = location.pathname.startsWith('/dream/') || location.pathname.startsWith('/branch/');
  
  return (
    <div className="w-full h-full bg-dream-bg-primary flex flex-col relative">
      {!isPlayerPage && <div className="safe-top h-10 bg-dream-bg-primary" />}
      <div className={`flex-1 overflow-y-auto ${isPlayerPage ? '' : 'pb-20'}`}>
        <Routes>
          <Route path="/" element={<Square />} />
          <Route path="/record" element={<Record />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/dream/:id" element={<Player />} />
          <Route path="/branch/:id" element={<BranchPlayer />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {!isPlayerPage && <BottomNav />}
    </div>
  );
};

const MobileApp = () => (
  <Router>
    <MobileContent />
  </Router>
);

const DesktopPreview = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
    <div className="relative">
      <div className="w-[337px] h-[731px] bg-gray-100 rounded-[43px] shadow-2xl overflow-hidden border-[11px] border-gray-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[27px] bg-gray-900 rounded-b-[18px] z-20" />
        <div className="w-full h-full overflow-hidden bg-dream-bg-primary">
          <MobileApp />
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[108px] h-[5px] bg-gray-700 rounded-full z-20" />
      </div>
      <div className="absolute -right-11 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <div className="w-3 h-3 rounded-full bg-gray-600" />
        <div className="w-3 h-10 rounded-full bg-gray-600" />
      </div>
      <div className="absolute -left-7 top-1/2 -translate-y-1/2 flex flex-col gap-6">
        <div className="w-2 h-8 rounded-full bg-gray-600" />
        <div className="w-2 h-8 rounded-full bg-gray-600" />
      </div>
    </div>
  </div>
);

export default function App() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth > 640);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isDesktop) {
    return <DesktopPreview />;
  }

  return <MobileApp />;
}
