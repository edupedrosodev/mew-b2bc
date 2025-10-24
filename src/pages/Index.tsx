import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Method from "@/components/Method";
import Features from "@/components/Features";
import Team from "@/components/Team";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Method />
        <Features />
        <Team />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
