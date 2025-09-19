import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommodityCard } from "@/components/ui/commodity-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react";

const Markets = () => {
  const commodities = [
    {
      symbol: "GOLD",
      name: "Gold Futures",
      price: "2,024.50",
      change: "+12.30",
      changePercent: "0.61",
      isPositive: true,
      volume: "142.5K",
      encrypted: true,
      lastUpdate: "2 mins ago"
    },
    {
      symbol: "OIL",
      name: "Crude Oil WTI",
      price: "78.92",
      change: "-1.45",
      changePercent: "1.81",
      isPositive: false,
      volume: "89.2K",
      encrypted: true,
      lastUpdate: "1 min ago"
    },
    {
      symbol: "WHEAT",
      name: "Wheat Futures",
      price: "6.42",
      change: "+0.08",
      changePercent: "1.26",
      isPositive: true,
      volume: "34.7K",
      encrypted: false,
      lastUpdate: "3 mins ago"
    },
    {
      symbol: "SILVER",
      name: "Silver Spot",
      price: "24.85",
      change: "+0.32",
      changePercent: "1.30",
      isPositive: true,
      volume: "67.8K",
      encrypted: true,
      lastUpdate: "1 min ago"
    },
    {
      symbol: "COPPER",
      name: "Copper Futures",
      price: "3.89",
      change: "-0.12",
      changePercent: "2.99",
      isPositive: false,
      volume: "45.3K",
      encrypted: false,
      lastUpdate: "4 mins ago"
    },
    {
      symbol: "CORN",
      name: "Corn Futures",
      price: "4.23",
      change: "+0.05",
      changePercent: "1.20",
      isPositive: true,
      volume: "28.1K",
      encrypted: true,
      lastUpdate: "2 mins ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="text-primary glow-gold">Markets</span> Overview
          </h1>
          <p className="text-muted-foreground">
            Real-time commodity prices with encrypted trading protocols
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search commodities..." 
              className="pl-10 bg-card border-border/50"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Badge variant="outline" className="border-success text-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              4 Rising
            </Badge>
            <Badge variant="outline" className="border-destructive text-destructive">
              <TrendingDown className="w-3 h-3 mr-1" />
              2 Falling
            </Badge>
          </div>
        </div>

        {/* Market Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commodities.map((commodity) => (
            <CommodityCard key={commodity.symbol} {...commodity} />
          ))}
        </div>

        {/* Market Stats */}
        <div className="mt-12 p-6 bg-card border border-border/50 rounded-lg">
          <h2 className="text-xl font-bold text-foreground mb-4">Market Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">$847M</p>
              <p className="text-sm text-muted-foreground">24h Volume</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">1,247</p>
              <p className="text-sm text-muted-foreground">Active Trades</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">98.5%</p>
              <p className="text-sm text-muted-foreground">Encryption Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">6</p>
              <p className="text-sm text-muted-foreground">Asset Classes</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Markets;