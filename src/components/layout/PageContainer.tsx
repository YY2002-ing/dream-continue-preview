import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageContainerProps {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
}

const PageContainer = ({ children, showNav = true, className = '' }: PageContainerProps) => {
  const location = useLocation();
  const isPlayerPage = location.pathname.startsWith('/dream/') || location.pathname.startsWith('/branch/');

  return (
    <div className="h-full relative flex flex-col">
      <div className="oil-bg" />
      <main
        className={`relative flex-1 ${className}`}
      >
        {children}
      </main>
    </div>
  );
};

export default PageContainer;
