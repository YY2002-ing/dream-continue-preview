import { NavLink, useLocation } from 'react-router-dom';
import { Home, Mic, User, Moon } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', icon: Home, label: '广场' },
    { path: '/record', icon: Mic, label: '记录', special: true },
    { path: '/profile', icon: User, label: '我的' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 border-t border-dream-border-warm safe-bottom">
      <div className="oil-glass">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            if (item.special) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center -mt-6"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-br from-dream-accent-primary to-dream-accent-gold shadow-warm-lg animate-glow scale-110'
                        : 'bg-gradient-to-br from-dream-accent-primary/90 to-dream-accent-gold/90 hover:scale-105 shadow-warm'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-dream-text-primary" />
                  </div>
                  <span
                    className={`text-xs mt-1 font-medium ${
                      active ? 'text-dream-accent-primary' : 'text-dream-text-muted'
                    }`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center py-2 px-6 transition-colors"
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    active ? 'text-dream-accent-primary' : 'text-dream-text-muted'
                  }`}
                />
                <span
                  className={`text-xs mt-1 font-medium transition-colors ${
                    active ? 'text-dream-accent-primary' : 'text-dream-text-muted'
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
