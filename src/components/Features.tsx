import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Zap, Award, Users, Clock, BookOpen, CheckCircle } from "lucide-react";

const features = [
  {
    title: "Recuperação Eficiente",
    description: "Metodologia comprovada para recuperar defasagens de aprendizado rapidamente.",
    icon: Zap,
  },
  {
    title: "Conteúdo Certificado",
    description: "Material didático desenvolvido por especialistas com anos de experiência.",
    icon: Award,
  },
  {
    title: "Suporte Personalizado",
    description: "Professores disponíveis para tirar dúvidas e acompanhar o progresso.",
    icon: Users,
  },
  {
    title: "Estude no Seu Ritmo",
    description: "Acesso à plataforma 24hs por dia, todos os dias para estudar quando e onde quiser.",
    icon: Clock,
  },
  {
    title: "Conteúdo Completo",
    description: "Todas as matérias do 6º ao 9º ano em um único lugar.",
    icon: BookOpen,
  },
  {
    title: "Resultados Comprovados",
    description: "Milhares de alunos melhoraram as suas notas com nossa metodologia.",
    icon: CheckCircle,
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="diferenciais" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Por que escolher o Me Explica Web?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
