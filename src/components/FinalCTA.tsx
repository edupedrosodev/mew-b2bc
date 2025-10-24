import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-gradient-hero text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 max-w-4xl mx-auto leading-tight">
          Comece hoje e acompanhe a evolução do aprendizado do seu filho!
        </h2>
        
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-95">
          Comece hoje mesmo e veja a transformação nos estudos
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => window.open('https://api.whatsapp.com/send?phone=+5511933846570&text=Ol%C3%A1,+quero+assinar+um+pacote!', '_blank')}
            size="lg"
            className="rounded-full px-12 text-lg h-16 bg-white text-primary hover:bg-white/90 shadow-2xl"
          >
            Assinar Agora
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
