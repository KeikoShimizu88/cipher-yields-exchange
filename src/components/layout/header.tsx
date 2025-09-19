import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <img 
              src={logo} 
              alt="Confidential Commodity Exchange" 
              className="w-10 h-10 glow-gold"
            />
            <div>
              <h1 className="text-xl font-bold text-primary">
                Confidential Commodity Exchange
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                Encrypted RWA Trading Platform
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/markets" className="text-sm hover:text-accent transition-colors">
              Markets
            </a>
            <a href="/portfolio" className="text-sm hover:text-accent transition-colors">
              Portfolio
            </a>
            <a href="/analytics" className="text-sm hover:text-accent transition-colors">
              Analytics
            </a>
            <a href="/encrypted-data" className="text-sm hover:text-accent transition-colors">
              Encrypted Data
            </a>
            <Badge variant="outline" className="border-success text-success">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
              LIVE
            </Badge>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-3">
            <ConnectButton />
            <Button 
              size="sm"
              className="bg-gradient-gold text-primary-foreground hover:opacity-90"
            >
              Trade Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};