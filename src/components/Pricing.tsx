import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Mensal",
    price: "R$ 149,97",
    period: "",
    features: [
      "Trilha de estudos personalizada",
      "Acesso a ano letivo vigente",
      "Com base na BNCC",
      "Aulas em vídeo",
      "Exercícios com solução",
      "Relatórios de progresso",
      "Gamificação",
    ],
    highlighted: false,
    buttonText: "Assinar por 1 mês",
    totalYearLabel: "1 ano de acesso",
    totalYearValue: "R$1799,64",
  },
  {
    name: "Semestral",
    price: "R$ 119,98",
    period: "(20% de desconto)",
    features: [
      "Trilha de estudos personalizada",
      "Acesso a ano letivo vigente",
      "Com base na BNCC",
      "Aulas em vídeo",
      "Exercícios com solução",
      "Relatórios de progresso",
      "Gamificação",
    ],
    highlighted: true,
    badge: "O mais escolhido",
    buttonText: "Assinar por 6 meses",
    totalYearLabel: "1 ano de acesso",
    totalYearValue: "R$1439,71",
  },
  {
    name: "Anual",
    price: "R$ 104,98",
    period: "(30% de desconto)",
    features: [
      "Trilha de estudos personalizada",
      "Acesso a ano letivo vigente",
      "Com base na BNCC",
      "Aulas em vídeo",
      "Exercícios com solução",
      "Relatórios de progresso",
      "Gamificação",
    ],
    highlighted: false,
    buttonText: "Assinar por 1 ano",
    totalYearLabel: "1 ano de acesso",
    totalYearValue: "R$1259,76",
  },
];

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="planos" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Planos e Preços
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o futuro acadêmico do seu filho
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className={plan.highlighted ? "md:-mt-8" : ""}
            >
              <Card
                className={`p-8 h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative ${
                  plan.highlighted
                    ? "border-2 border-primary shadow-xl"
                    : "border-border"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-heading font-bold">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-5xl font-heading font-bold text-primary">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <Button
                    size="lg"
                    className={`w-full rounded-full text-base ${
                      plan.highlighted ? "" : "variant-outline"
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={() => window.open('https://api.whatsapp.com/send?phone=+5511933846570&text=Ol%C3%A1,+quero+assinar+um+pacote!', '_blank')}
                  >
                    {plan.buttonText}
                  </Button>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {plan.totalYearLabel}
                    </p>
                    <p className="text-sm text-muted-foreground font-semibold">
                      {plan.totalYearValue}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
