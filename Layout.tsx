import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from './api/base44Client';
import VexaLogo from './components/ui/VexaLogo';
import { 
  Menu, X, LayoutDashboard, MessageSquare, 
  Utensils, Dumbbell, Activity, LogOut
} from 'lucide-react';
import { cn } from './lib/utils';

interface LayoutProps {
  children?: React.ReactNode;
  currentPageName: string;
}

export default function Layout({ children, currentPageName }: LayoutProps) {
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const publicPages = ['Home', 'ComoFunciona', 'Assinatura'];
  const isPublicPage = publicPages.includes(currentPageName);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
        }
      } catch (error) {
        // Not logged in
      }
    };
    loadUser();
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', page: 'Dashboard' },
    { icon: MessageSquare, label: 'Chat IA', page: 'Chat' },
    { icon: Utensils, label: 'Dieta', page: 'Dieta' },
    { icon: Dumbbell, label: 'Treino', page: 'Treino' },
    { icon: Activity, label: 'Corpo', page: 'Holografico' },
  ];

  const handleLogout = () => {
    base44.auth.logout(createPageUrl('Home'));
  };

  // Don't show layout on public pages
  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#050805]">
      {/* Top Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050805]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Dashboard')} className="flex items-center gap-2">
              <VexaLogo size="sm" />
              <span className="text-lg font-bold text-white hidden sm:block">VEXA Hub</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                    currentPageName === item.page
                      ? "bg-[#00ff88]/10 text-[#00ff88]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              {user && (
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-white text-sm font-medium">{user.full_name?.split(' ')[0]}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-400" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#050805]/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    currentPageName === item.page
                      ? "bg-[#00ff88]/10 text-[#00ff88]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sair</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}