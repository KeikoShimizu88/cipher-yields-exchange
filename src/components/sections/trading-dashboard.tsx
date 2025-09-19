import { CommodityCard } from "@/components/ui/commodity-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, BarChart3, Database } from "lucide-react";

const commodities = [
  {
    symbol: "GOLD",
    name: "Gold Futures",
    price: "2,342.50",
    change: "+12.30",
    changePercent: "0.53",
    isPositive: true,
    volume: "1.2M oz",
    encrypted: true,
    lastUpdate: "Updated 2s ago"
  },
  {
    symbol: "OIL",
    name: "Crude Oil WTI",
    price: "78.45",
    change: "-0.85",
    changePercent: "1.07",
    isPositive: false,
    volume: "8.5M bbl",
    encrypted: true,
    lastUpdate: "Updated 5s ago"
  },
  {
    symbol: "WHEAT",
    name: "Wheat Futures",
    price: "645.25",
    change: "+3.75",
    changePercent: "0.58",
    isPositive: true,
    volume: "450K bu",
    encrypted: false,
    lastUpdate: "Updated 12s ago"
  },
  {
    symbol: "SILVER",
    name: "Silver Spot",
    price: "24.12",
    change: "+0.18",
    changePercent: "0.75",
    isPositive: true,
    volume: "2.8M oz",
    encrypted: true,
    lastUpdate: "Updated 3s ago"
  },
  {
    symbol: "COPPER",
    name: "Copper Futures",
    price: "3.82",
    change: "-0.05",
    changePercent: "1.29",
    isPositive: false,
    volume: "125K tons",
    encrypted: false,
    lastUpdate: "Updated 8s ago"
  },
  {
    symbol: "CORN",
    name: "Corn Futures",
    price: "423.75",
    change: "+2.10",
    changePercent: "0.50",
    isPositive: true,
    volume: "890K bu",
    encrypted: true,
    lastUpdate: "Updated 6s ago"
  }
];

export const TradingDashboard = () => {
  return (
    <section className="py-16 bg-gradient-industrial">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Badge variant="outline" className="border-success text-success">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
              LIVE MARKETS
            </Badge>
            <Badge variant="outline" className="border-accent text-accent">
              End-to-End Encrypted
            </Badge>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Platform Overview
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive trading platform with encrypted data management and real-time analytics.
          </p>
        </div>

        <Separator className="mb-8 bg-border/30" />

        {/* Platform Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 bg-card/50 rounded-lg border border-border/30 text-center hover:bg-card/70 transition-colors">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Markets</h3>
            <p className="text-sm text-muted-foreground mb-4">Real-time commodity trading with encrypted execution</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/markets'}
              className="w-full"
            >
              View Markets <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="p-6 bg-card/50 rounded-lg border border-border/30 text-center hover:bg-card/70 transition-colors">
            <BarChart3 className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Portfolio</h3>
            <p className="text-sm text-muted-foreground mb-4">Track your encrypted positions and performance</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/portfolio'}
              className="w-full"
            >
              View Portfolio <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="p-6 bg-card/50 rounded-lg border border-border/30 text-center hover:bg-card/70 transition-colors">
            <BarChart3 className="w-8 h-8 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground mb-4">Advanced market insights and trading analytics</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/analytics'}
              className="w-full"
            >
              View Analytics <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="p-6 bg-card/50 rounded-lg border border-border/30 text-center hover:bg-card/70 transition-colors">
            <Database className="w-8 h-8 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Encrypted Data</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage your encrypted trading data securely</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/encrypted-data'}
              className="w-full"
            >
              View Data <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Market Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-card/50 rounded-lg border border-border/30">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="text-xl font-bold text-primary">$847.2B</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="text-xl font-bold text-accent">$12.4B</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Encrypted Trades</p>
            <p className="text-xl font-bold text-success">4,829</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Active Contracts</p>
            <p className="text-xl font-bold text-warning">1,247</p>
          </div>
        </div>

        {/* Quick Market Preview */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Live Market Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {commodities.slice(0, 3).map((commodity, index) => (
              <CommodityCard
                key={commodity.symbol}
                {...commodity}
              />
            ))}
          </div>
          <div className="text-center mt-6">
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/markets'}
              className="glow-neon"
            >
              View All Markets <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Market Status */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-card/30 rounded-full border border-border/30">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-mono">Market Open</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm font-mono text-muted-foreground">
              Next close in 6h 23m
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};