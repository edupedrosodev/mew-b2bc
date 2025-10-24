import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import computador from "@/assets/computador.png";
import quartoEstudo from "@/assets/quarto-estudo.jpg";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero text-primary-foreground overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${quartoEstudo})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight"
            >
              A confiança que seu filho precisa para brilhar nos estudos
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl md:text-2xl font-body mb-12 opacity-95"
            >
              Ajudamos seu filho a alcançar todo o potencial com a nossa plataforma completa de aprendizado do 6º ao 9º ano.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => window.open('https://plataformamew.com.br/login', '_blank')}
                variant="secondary"
                size="lg"
                className="rounded-full px-8 text-lg h-14"
              >
                Acessar Plataforma
              </Button>
              <Button
                onClick={() => window.open('https://api.whatsapp.com/send?phone=+5511933846570&text=Ol%C3%A1,+quero+assinar+um+pacote!', '_blank')}
                size="lg"
                className="rounded-full px-8 text-lg h-14 bg-white text-primary hover:bg-white/90"
              >
                Assinar Agora
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block"
          >
            <img 
              src={computador} 
              alt="Plataforma Me Explica Web" 
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
