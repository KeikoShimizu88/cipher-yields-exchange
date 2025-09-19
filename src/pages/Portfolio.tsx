import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Shield, Eye, EyeOff, Wallet } from "lucide-react";

const Portfolio = () => {
  const holdings = [
    {
      symbol: "GOLD",
      name: "Gold Futures",
      quantity: "2.5 oz",
      currentPrice: "2,024.50",
      totalValue: "5,061.25",
      change: "+156.75",
      changePercent: "+3.20",
      isPositive: true,
      encrypted: true,
      allocation: 45
    },
    {
      symbol: "OIL",
      name: "Crude Oil WTI",
      quantity: "50 barrels",
      currentPrice: "78.92",
      totalValue: "3,946.00",
      change: "-72.50",
      changePercent: "-1.81",
      isPositive: false,
      encrypted: true,
      allocation: 35
    },
    {
      symbol: "WHEAT",
      name: "Wheat Futures",
      quantity: "1,000 bushels",
      currentPrice: "6.42",
      totalValue: "6,420.00",
      change: "+80.00",
      changePercent: "+1.26",
      isPositive: true,
      encrypted: false,
      allocation: 20
    }
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + parseFloat(holding.totalValue.replace(',', '')), 0);
  const totalChange = holdings.reduce((sum, holding) => {
    const change = parseFloat(holding.change.replace('+', '').replace(',', ''));
    return sum + change;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="text-primary glow-gold">Portfolio</span> Overview
          </h1>
          <p className="text-muted-foreground">
            Your encrypted commodity holdings and performance metrics
          </p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                ${totalValue.toLocaleString()}
              </p>
              <p className={`text-sm font-mono mt-1 ${totalChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                {totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)} ({((totalChange / (totalValue - totalChange)) * 100).toFixed(2)}%)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Encrypted Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">
                {holdings.filter(h => h.encrypted).length}/{holdings.length}
              </p>
              <div className="flex items-center mt-2">
                <Shield className="w-4 h-4 text-accent mr-2" />
                <span className="text-sm text-muted-foreground">Secure until delivery</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Active Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{holdings.length}</p>
              <div className="flex items-center mt-2">
                <Wallet className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Commodity contracts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Holdings List */}
        <Card className="bg-card border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="text-foreground">Current Holdings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {holdings.map((holding) => (
              <div key={holding.symbol} className="p-4 border border-border/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-bold text-lg text-primary">{holding.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{holding.name}</p>
                    </div>
                    <Badge 
                      variant={holding.encrypted ? "default" : "secondary"}
                      className={holding.encrypted ? "bg-accent text-accent-foreground glow-neon" : ""}
                    >
                      {holding.encrypted ? (
                        <>
                          <Shield className="w-3 h-3 mr-1" />
                          ENCRYPTED
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 mr-1" />
                          PENDING
                        </>
                      )}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-mono text-sm">{holding.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="font-mono text-sm">${holding.currentPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="font-bold">${holding.totalValue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">P&L</p>
                    <p className={`font-mono text-sm ${holding.isPositive ? 'text-success' : 'text-destructive'}`}>
                      {holding.change} ({holding.changePercent})
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">Portfolio Allocation:</span>
                    <span className="text-xs font-mono">{holding.allocation}%</span>
                  </div>
                  <Progress value={holding.allocation} className="w-32 h-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-gradient-gold text-primary-foreground hover:opacity-90">
            <TrendingUp className="w-4 h-4 mr-2" />
            Add Position
          </Button>
          <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <TrendingDown className="w-4 h-4 mr-2" />
            Close Position
          </Button>
          <Button variant="outline">
            <Shield className="w-4 h-4 mr-2" />
            Encrypt Holdings
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;