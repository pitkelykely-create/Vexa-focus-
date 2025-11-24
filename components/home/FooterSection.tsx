import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import VexaLogo from '../ui/VexaLogo';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="py-16 px-4 sm:px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <VexaLogo size="default" />
              <span className="text-xl font-bold text-white">VEXA Hub</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Plataforma futurista de saúde com IA que ajusta automaticamente 
              dieta e treino com base na sua rotina real.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#00ff88]/20 hover:text-[#00ff88] transition-colors text-gray-400"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Plataforma</h4>
            <ul className="space-y-3">
              {[
                { label: 'Como Funciona', page: 'ComoFunciona' },
                { label: 'Planos', page: 'Assinatura' },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={createPageUrl(link.page)} 
                    className="text-gray-400 hover:text-[#00ff88] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {[
                { label: 'Termos de Uso', page: 'Home' },
                { label: 'Privacidade', page: 'Home' },
                { label: 'Contato', page: 'Home' },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={createPageUrl(link.page)} 
                    className="text-gray-400 hover:text-[#00ff88] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 VEXA Hub. Todos os direitos reservados.
          </p>
          <a 
            href="mailto:contato@vexahub.com" 
            className="flex items-center gap-2 text-gray-400 hover:text-[#00ff88] transition-colors"
          >
            <Mail className="w-4 h-4" />
            contato@vexahub.com
          </a>
        </div>
      </div>
    </footer>
  );
}