import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermosDeUso = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
        </Link>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-center">
          Termos de Uso
        </h1>
        
        <div className="max-w-4xl mx-auto prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">1. Introdução</h2>
            <p className="mb-4">
              Bem-vindo ao www.meexplicaweb.com.br (o "Website"). O Website é de propriedade e operado pela MEW INTELIGENCIA EDUCACIONAL LTDA. ("MEW", "Me Explica Web" ou "nós"). Estes termos também incluem plataformamew.com.br, painel.meexplicaweb.com.br, ava.meexplicaweb.com.br, bem como todos e quaisquer websites usados ​​por nós para acessar todos e quaisquer Eventos Virtuais MEW.
            </p>
            <p className="mb-4">
              LEIA ESTES TERMOS DE USO COM ATENÇÃO ANTES DE USAR O SITE. Ao usar o Site, você indica sua concordância com estes Termos de Uso. Se você não concordar com estes Termos de Uso, você não poderá usar o Site. Além disso, quando você usar qualquer um dos nossos serviços atuais ou futuros, você também estará sujeito às nossas diretrizes, termos, condições e acordos aplicáveis ​​a esses serviços. Se estes Termos de Uso forem inconsistentes com as diretrizes, termos e acordos aplicáveis ​​a esses serviços, estes Termos de Uso prevalecerão.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">2. Privacidade e Sua Conta</h2>
            <p className="mb-4">
              Revise nossa Política de Privacidade, que também rege sua visita ao Site, para entender nossas práticas de privacidade.
            </p>
            <p className="mb-4">
              Podemos vender produtos para crianças, mas vendê-los para adultos que podem comprar com cartão de crédito ou outro método de pagamento permitido. Se você tiver menos de 18 anos, poderá usar o Site somente com o envolvimento de um dos pais ou responsável. Reservamo-nos o direito de recusar o serviço, encerrar contas, remover ou editar conteúdo ou cancelar pedidos a nosso exclusivo critério.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">3. Consideração</h2>
            <p className="mb-4">
              Você concorda que estes Termos de Uso são apoiados por uma contraprestação razoável e valiosa, cujo recebimento e adequação você reconhece, incluindo, sem limitação, seu acesso e uso do Site e dados, materiais e informações disponíveis no Site ou por meio dele.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">4. Restrições de Uso; Licença Limitada</h2>
            <p className="mb-4">
              Todo o conteúdo contido no Website (coletivamente, "Conteúdo"), como texto, gráficos, logotipos, ícones, imagens, clipes de áudio e vídeo, downloads digitais, compilações de dados e software, é nossa propriedade ou propriedade de nossos licenciadores ou licenciados, e a compilação do Conteúdo no Website é nossa propriedade exclusiva, protegida pelas leis, tratados e convenções de direitos autorais do Brasil e internacionais. Todo o software usado no Website é nossa propriedade ou propriedade de nossos fornecedores de software e protegido pelas leis, tratados e convenções de direitos autorais dos Brasil e internacionais.
            </p>
            <p className="mb-4">
              Quaisquer marcas registradas, marcas de serviço, gráficos, logotipos, cabeçalhos de página, ícones, scripts e nomes comerciais (cada um, uma "Marca") contidos no Site são de nossa propriedade ou de nossos licenciadores ou licenciados. Nossas Marcas não podem ser usadas em conexão com qualquer produto ou serviço que não seja nosso de nenhuma maneira que possa causar confusão entre os usuários ou que deprecie ou desacredite a nós ou a qualquer outra pessoa. Todas as outras Marcas que não são de nossa propriedade e que aparecem no Site são de propriedade de seus respectivos proprietários, que podem ou não ser afiliados, conectados ou patrocinados por nós.
            </p>
            <p className="mb-4">
              Concedemos a você uma licença limitada para acessar e fazer uso pessoal do Site. Nenhum Conteúdo do Site ou de qualquer outro site da Internet de nossa propriedade, operado, licenciado ou controlado por nós pode ser copiado, reproduzido, republicado, baixado (exceto cache de página), carregado, postado, transmitido ou distribuído de qualquer forma, ou vendido, revendido, visitado ou explorado de outra forma para qualquer propósito comercial, exceto que você pode baixar uma (1) cópia do Conteúdo que disponibilizamos a você para tais propósitos em um único computador para seu uso pessoal, não comercial e doméstico apenas, desde que você: (a) mantenha intactos todos os direitos autorais, marcas registradas e outros avisos de direitos de propriedade; (b) não modifique nenhum Conteúdo; (c) não use nenhum Conteúdo de uma maneira que sugira uma associação com qualquer um de nossos produtos, serviços ou marcas; e (d) não baixe o Conteúdo para evitar downloads futuros do Site. Seu uso do Conteúdo em qualquer outro site ou ambiente de computador é estritamente proibido.
            </p>
            <p className="mb-4">
              A licença concedida a você não inclui, e exclui especificamente, quaisquer direitos para: revender ou fazer qualquer uso comercial do Site ou qualquer Conteúdo; coletar e usar quaisquer listagens de produtos, descrições ou preços; fazer qualquer uso derivado do Site ou Conteúdo; baixar ou copiar informações de conta para o benefício de qualquer outra pessoa; ou usar qualquer forma de mineração de dados, robôs ou ferramentas semelhantes de coleta e extração de dados. Você não pode enquadrar, ou utilizar técnicas de enquadramento para incluir, qualquer Marca, Conteúdo ou outras informações proprietárias, ou usar quaisquer meta tags ou qualquer outro "texto oculto" utilizando qualquer propriedade intelectual, sem o nosso consentimento expresso por escrito e de cada proprietário aplicável. Qualquer uso não autorizado encerra automaticamente a licença concedida a você aqui. Você recebe um direito limitado, revogável e não exclusivo de criar um hiperlink apenas para nossa página inicial, desde que o link não nos retrate ou nossos licenciadores ou licenciados, ou seus respectivos produtos ou serviços, de forma falsa, enganosa, depreciativa ou ofensiva. Você não pode usar nenhuma propriedade intelectual nossa ou de terceiros como parte do link sem o consentimento expresso por escrito nosso e de cada um desses terceiros.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">5. Uso e Proteção de Senha e ID</h2>
            <p className="mb-4">
              O MEW atribuirá uma senha e ID de conta a você para que você possa acessar e usar determinadas áreas do Site. Cada usuário que usar tal senha e ID atribuídos será considerado autorizado por você a acessar e usar o Site, e o MEW não terá obrigação de investigar a autorização ou fonte de tal acesso ou uso. VOCÊ RECONHECE E CONCORDA QUE ENTRE VOCÊ E O MEW, VOCÊ SERÁ O ÚNICO RESPONSÁVEL POR TODO ACESSO E USO DO SITE POR QUALQUER PESSOA QUE USE A SENHA E ID ATRIBUÍDOS A VOCÊ, SEJA OU NÃO TAL ACESSO E USO DO SITE REALMENTE AUTORIZADO POR VOCÊ, INCLUINDO TODAS AS COMUNICAÇÕES E TRANSMISSÕES E TODAS AS OBRIGAÇÕES (INCLUINDO OBRIGAÇÕES FINANCEIRAS PARA COMPRAS ATRAVÉS DO SITE) QUE POSSAM RESULTAR DE TAL ACESSO OU USO.
            </p>
            <p className="mb-4">
              Você é o único responsável por proteger a segurança e a confidencialidade da senha e do ID atribuídos a você. Você deve notificar imediatamente o MEW sobre qualquer uso não autorizado da senha ou ID atribuídos, ou qualquer outra violação ou ameaça de violação da segurança do Website da qual você tenha conhecimento. Você será responsável por qualquer atividade conduzida sob sua senha ou ID atribuídos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">6. Requisitos do Sistema</h2>
            <p className="mb-4">
              O uso de certas áreas do Website requer acesso à Internet, software gerenciador de áudio ou outro software que permita o download e armazenamento de arquivos de áudio e audiovisuais em MP3 ou outro formato digital (o "Software") e, para certos conteúdos para download, um dispositivo de reprodução compatível (o "Dispositivo"). O MEW pode, a qualquer momento e de tempos em tempos, a seu exclusivo critério, modificar, revisar ou de outra forma alterar os requisitos de sistema para o Website e o formato de qualquer conteúdo para download, ou de outra forma modificar o Software e os Dispositivos necessários para acessar e usar o Site e seu conteúdo. Embora o MEW faça todos os esforços para fornecer-lhe avisos sobre essas modificações, revisões ou outras alterações, você concorda que essas notificações não são obrigatórias.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground mb-2">
              © 2020-2025 Mew Inteligencia Educacional LTDA. CNPJ 46.585.986/0001-00.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Clicou, estudou, aprendeu!
            </p>
            <p className="text-sm text-muted-foreground">
              Copyright © 2025 - Todos os direitos reservados
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosDeUso;
