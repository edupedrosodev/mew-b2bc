import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PoliticaDePrivacidade = () => {
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
          Política de Privacidade e Proteção de Dados
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-muted-foreground mb-12">
            Última Atualização: 12 de JULHO de 2025
          </p>

          <div className="prose prose-lg">
            <p className="text-lg mb-8">
              Bem-vindo ao Me Explica Web! Esta Política de Privacidade destina-se a informar nossos usuários sobre como coletamos, utilizamos, divulgamos e protegemos suas informações pessoais. Ao utilizar nosso site/aplicativo, você concorda com as práticas descritas nesta política.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">1. Informações Coletadas:</h2>
              <div className="ml-4">
                <h3 className="text-xl font-heading font-semibold mb-3">1.1. Informações Pessoais:</h3>
                <p className="mb-4">
                  Coletamos informações fornecidas voluntariamente por você, como nome, endereço de e-mail e telefone.
                </p>

                <h3 className="text-xl font-heading font-semibold mb-3">1.2. Informações de Uso:</h3>
                <p className="mb-4">
                  Registramos automaticamente informações sobre como você interage com nosso site/aplicativo, como páginas visitadas, dispositivos utilizados e endereço IP.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">2. Finalidade da Coleta:</h2>
              <div className="ml-4">
                <p className="mb-3">2.1. Utilizamos as informações coletadas para:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Fornecer e melhorar nossos serviços.</li>
                  <li>Processar transações e responder a solicitações.</li>
                  <li>Personalizar a experiência do usuário e fornecer conteúdo relevante.</li>
                  <li>Enviar comunicações sobre atualizações, ofertas e informações relacionadas.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">3. Cookies e Tecnologias Semelhantes:</h2>
              <div className="ml-4">
                <p className="mb-3">3.1. Utilizamos cookies e tecnologias similares para:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Facilitar o acesso e a navegação no site/aplicativo.</li>
                  <li>Analisar tendências, gerenciar o site/aplicativo e coletar informações demográficas sobre nossa base de usuários.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">4. Armazenamento de Dados:</h2>
              <div className="ml-4">
                <p className="mb-4">
                  4.1. Armazenamos suas informações em servidores seguros e adotamos medidas para proteger contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
                <p className="mb-4">
                  4.2. Retemos suas informações pelo tempo necessário para cumprir os fins para os quais foram coletadas ou conforme exigido por leis aplicáveis.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">5. Compartilhamento de Dados:</h2>
              <div className="ml-4">
                <p className="mb-4">
                  5.1. Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto conforme necessário para fornecer os serviços ou quando exigido por lei.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">6. Medidas de Segurança:</h2>
              <div className="ml-4">
                <p className="mb-4">
                  6.1. Implementamos medidas de segurança razoáveis para proteger suas informações pessoais, mas nenhum método de transmissão pela internet ou armazenamento eletrônico é 100% seguro.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">7. Direitos do Usuário:</h2>
              <div className="ml-4">
                <p className="mb-3">7.1. Você tem o direito de:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Acessar, corrigir, ou excluir suas informações pessoais.</li>
                  <li>Retirar seu consentimento para o processamento de dados quando aplicável.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">8. Alterações na Política:</h2>
              <div className="ml-4">
                <p className="mb-4">
                  8.1. Reservamo-nos o direito de atualizar esta política periodicamente. As alterações entrarão em vigor após a publicação da versão atualizada no site/aplicativo.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">9. Informações de Contato:</h2>
              <div className="ml-4">
                <p className="mb-4">
                  9.1. Para dúvidas ou preocupações sobre esta política, entre em contato conosco através de suporte@plataformamew.com.br.
                </p>
              </div>
            </section>

            <p className="text-lg mb-8">
              Ao utilizar nosso site, você concorda com os termos desta Política de Privacidade. Recomendamos revisar esta política regularmente para se manter informado sobre como estamos protegendo suas informações.
            </p>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Clicou, estudou, aprendeu!
              </p>
              <p className="text-sm text-muted-foreground">
                Copyright © 2025 - Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaDePrivacidade;
