import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import logoBlueGreen from "@/assets/logo-blue-green.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    // Se não estiver na home, navega primeiro
    if (location.pathname !== '/') {
      navigate('/');
      // Aguarda a navegação completar antes de rolar
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logoBlueGreen} alt="Me Explica Web" className="h-12" />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('metodo')}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Metodologia
          </button>
          <button
            onClick={() => scrollToSection('diferenciais')}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Diferenciais
          </button>
          <button
            onClick={() => scrollToSection('planos')}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Planos
          </button>
          <button
            onClick={() => window.location.href = '/parcerias'}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Parcerias
          </button>
        </nav>

        <div className="flex gap-2">
          <Button
            onClick={() => window.open('https://plataformamew.com.br/login', '_blank')}
            size="lg"
            variant="outline"
            className="rounded-full"
          >
            Acessar Plataforma
          </Button>
          <Button
            onClick={() => window.open('https://api.whatsapp.com/send?phone=+5511933846570&text=Ol%C3%A1,+quero+assinar+um+pacote!', '_blank')}
            size="lg"
            className="rounded-full"
          >
            Assinar Agora
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
