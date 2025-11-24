import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { base44 } from '../../api/base44Client';
import GlowButton from '../ui/GlowButton';
import VexaLogo from '../ui/VexaLogo';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
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

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    base44.auth.redirectToLogin(createPageUrl('Dashboard'));
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-[#050805]/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-2">
            <VexaLogo size="default" />
            <span className="text-xl font-bold text-white">VEXA Hub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to={createPageUrl('ComoFunciona')} className="text-gray-300 hover:text-[#00ff88] transition-colors">
              Como Funciona
            </Link>
            <Link to={createPageUrl('Assinatura')} className="text-gray-300 hover:text-[#00ff88] transition-colors">
              Planos
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <GlowButton to={createPageUrl('Dashboard')}>
                Meu Dashboard
              </GlowButton>
            ) : (
              <>
                <button 
                  onClick={handleLogin}
                  className="text-gray-300 hover:text-[#00ff88] transition-colors"
                >
                  Entrar
                </button>
                <GlowButton onClick={handleLogin}>
                  Criar Conta
                </GlowButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-400" />
            ) : (
              <Menu className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050805]/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            <Link 
              to={createPageUrl('ComoFunciona')} 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-[#00ff88] py-2"
            >
              Como Funciona
            </Link>
            <Link 
              to={createPageUrl('Assinatura')} 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-[#00ff88] py-2"
            >
              Planos
            </Link>
            <div className="pt-4 space-y-3">
              {user ? (
                <GlowButton to={createPageUrl('Dashboard')} className="w-full">
                  Meu Dashboard
                </GlowButton>
              ) : (
                <>
                  <button 
                    onClick={handleLogin}
                    className="w-full text-center text-gray-300 hover:text-[#00ff88] py-2"
                  >
                    Entrar
                  </button>
                  <GlowButton onClick={handleLogin} className="w-full">
                    Criar Conta
                  </GlowButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}