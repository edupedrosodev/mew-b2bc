import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import daviVieira from "@/assets/team/davi-vieira.png";
import fernandaSantorio from "@/assets/team/fernanda-santorio.png";
import edianePaganini from "@/assets/team/ediane-paganini.png";
import luisRamos from "@/assets/team/luis-ramos.png";
import isaacCarrafa from "@/assets/team/isaac-carrafa.png";
import sauloSobreira from "@/assets/team/saulo-sobreira.png";
import renanAlmeida from "@/assets/team/renan-almeida.png";
import tiagoGermano from "@/assets/team/tiago-germano.png";
import victoriaMarins from "@/assets/team/victoria-marins.png";
import alineValentini from "@/assets/team/aline-valentini.png";

const team = [
  { name: "Davi Vieira", role: "Matemática", image: daviVieira },
  { name: "Fernanda Santório", role: "Matemática", image: fernandaSantorio },
  { name: "Ediane Paganini", role: "Geografia", image: edianePaganini },
  { name: "Luís Ramos", role: "Matemática", image: luisRamos },
  { name: "Isaac Carrafa", role: "Geografia", image: isaacCarrafa },
  { name: "Saulo Sobreira", role: "Ciências", image: sauloSobreira },
  { name: "Renan Almeida", role: "História", image: renanAlmeida },
  { name: "Tiago Germano", role: "Matemática", image: tiagoGermano },
  { name: "Victoria Marins", role: "Português", image: victoriaMarins },
  { name: "Aline Valentini", role: "História", image: alineValentini },
];

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="equipe" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Conheça nossos Professores
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nosso corpo docente é composto mestres e doutores qualificados e dedicados ao sucesso dos nossos alunos
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-primary/10">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="text-2xl font-heading font-bold bg-primary/10 text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <h3 className="font-heading font-bold text-lg mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
