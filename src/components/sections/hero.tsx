import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, TrendingUp } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Status Badge */}
          <Badge 
            variant="outline" 
            className="border-accent text-accent glow-neon mb-4"
          >
            <Lock className="w-3 h-3 mr-2" />
            Secure RWA Trading Platform
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            <span className="text-primary glow-gold">Confidential</span>
            <br />
            Commodity Exchange
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Trade physical commodities with end-to-end encryption. 
            Gold, oil, and agricultural assets secured until delivery confirmation.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 my-8">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-4 h-4 text-accent" />
              <span>Encrypted Until Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success" />
              <span>Real-World Assets</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Lock className="w-4 h-4 text-primary" />
              <span>Smart Contract Security</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-gradient-gold text-primary-foreground hover:opacity-90 glow-gold px-8 py-3"
            >
              Start Trading
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground glow-neon px-8 py-3"
            >
              Connect Wallet
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/30">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">$2.4B+</p>
              <p className="text-sm text-muted-foreground">Volume Traded</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">15,000+</p>
              <p className="text-sm text-muted-foreground">Active Traders</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-success">99.98%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated circuit elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 border border-accent rounded-full circuit-glow" />
        <div className="absolute bottom-32 right-16 w-8 h-8 border border-primary rounded-sm circuit-glow" />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-success rounded-full circuit-glow" />
      </div>
    </section>
  );
};