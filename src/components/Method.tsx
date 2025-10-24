import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Target, GitBranch, PlaySquare, TrendingUp } from "lucide-react";

const methods = [
  {
    number: "1",
    title: "Diagnóstico Preciso",
    description: "Identificamos as lacunas de aprendizado com uma avaliação completa.",
    icon: Target,
  },
  {
    number: "2",
    title: "Trilha de Estudos Individual",
    description: "Criamos um plano de recuperação focado exatamente onde seu filho precisa.",
    icon: GitBranch,
  },
  {
    number: "3",
    title: "Aulas e Exercícios Interativos",
    description: "Conteúdo de alta qualidade para um aprendizado engajador e eficaz.",
    icon: PlaySquare,
  },
  {
    number: "4",
    title: "Acompanhamento de Resultados",
    description: "Relatórios claros para você e seu filho acompanharem cada conquista.",
    icon: TrendingUp,
  },
];

const Method = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="metodo" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Nosso método em 4 passos simples
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-xl">
                      {method.number}
                    </div>
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {method.description}
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

export default Method;
