import logoWhite from "@/assets/logo-white.png";
import { Apple, PlayCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 items-start">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <img src={logoWhite} alt="Me Explica Web" className="h-24 mb-6" />
            <p className="text-base font-medium mb-3 text-center">
              Clicou, estudou, aprendeu!
            </p>
            <p className="text-xs opacity-70 text-center">
              © {new Date().getFullYear()} Me Explica Web. Todos os direitos reservados.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-6 text-base">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#metodo" className="opacity-80 hover:opacity-100 transition-opacity">
                  Método
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="opacity-80 hover:opacity-100 transition-opacity">
                  Diferenciais
                </a>
              </li>
              <li>
                <a href="#equipe" className="opacity-80 hover:opacity-100 transition-opacity">
                  Equipe
                </a>
              </li>
              <li>
                <a href="#planos" className="opacity-80 hover:opacity-100 transition-opacity">
                  Planos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-6 text-base">Produtos</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Preparatório SAEB
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Preparatório Instituto Federal
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                  Teste Vocacional
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-6 text-base">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://api.whatsapp.com/send?phone=5527999493497&text=Ol%C3%A1%2C%20estou%20com%20d%C3%BAvida...%20pode%20me%20ajudar%3F" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                  Suporte
                </a>
              </li>
              <li>
                <a href="/termos-de-uso" className="opacity-80 hover:opacity-100 transition-opacity">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="/politica-de-privacidade" className="opacity-80 hover:opacity-100 transition-opacity">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-6 text-base">Baixe o App</h4>
            <p className="text-sm opacity-90 mb-6">Estude onde e quando quiser</p>
            <div className="space-y-3.5">
              <a
                href="https://apps.apple.com/br/app/me-explica-web/id6748916971"
                className="flex items-center justify-start gap-3 bg-background/10 backdrop-blur-sm text-primary-foreground px-5 py-3 rounded-xl hover:bg-background/20 transition-all border border-primary-foreground/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Apple className="w-6 h-6 shrink-0" />
                <div className="text-left">
                  <div className="text-[10px] opacity-75 leading-tight">BAIXAR NA</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=br.com.mew.twa"
                className="flex items-center justify-start gap-3 bg-background/10 backdrop-blur-sm text-primary-foreground px-5 py-3 rounded-xl hover:bg-background/20 transition-all border border-primary-foreground/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlayCircle className="w-6 h-6 shrink-0" />
                <div className="text-left">
                  <div className="text-[10px] opacity-75 leading-tight">DISPONÍVEL NO</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
