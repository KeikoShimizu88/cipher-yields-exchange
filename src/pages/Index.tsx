import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { TradingDashboard } from "@/components/sections/trading-dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TradingDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
