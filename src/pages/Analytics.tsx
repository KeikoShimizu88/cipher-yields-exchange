import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Activity, Database, Clock, Target } from "lucide-react";

const Analytics = () => {
  const performanceData = [
    { month: 'Jan', portfolio: 12500, market: 12000 },
    { month: 'Feb', portfolio: 13200, market: 12800 },
    { month: 'Mar', portfolio: 12800, market: 12600 },
    { month: 'Apr', portfolio: 14100, market: 13200 },
    { month: 'May', portfolio: 15200, market: 14100 },
    { month: 'Jun', portfolio: 15427, market: 14500 },
  ];

  const volumeData = [
    { commodity: 'Gold', volume: 2400, encrypted: 2100 },
    { commodity: 'Oil', volume: 1398, encrypted: 1200 },
    { commodity: 'Wheat', volume: 980, encrypted: 600 },
    { commodity: 'Silver', volume: 780, encrypted: 720 },
    { commodity: 'Copper', volume: 590, encrypted: 400 },
  ];

  const allocationData = [
    { name: 'Gold', value: 45, color: '#FFD700' },
    { name: 'Oil', value: 35, color: '#FF6B6B' },
    { name: 'Wheat', value: 20, color: '#4ECDC4' },
  ];

  const riskMetrics = [
    { metric: 'Sharpe Ratio', value: '1.34', change: '+0.12', isPositive: true },
    { metric: 'Max Drawdown', value: '8.5%', change: '-1.2%', isPositive: true },
    { metric: 'Volatility', value: '12.3%', change: '+0.8%', isPositive: false },
    { metric: 'Beta', value: '0.87', change: '-0.05', isPositive: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="text-primary glow-gold">Analytics</span> Dashboard
          </h1>
          <p className="text-muted-foreground">
            Advanced portfolio analytics and market insights with encrypted data protection
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-success" />
                Total Return
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success">+23.4%</p>
              <p className="text-xs text-muted-foreground">YTD Performance</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Activity className="w-4 h-4 mr-2 text-accent" />
                Active Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">47</p>
              <p className="text-xs text-muted-foreground">Encrypted positions</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Database className="w-4 h-4 mr-2 text-primary" />
                Encryption Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">87.2%</p>
              <p className="text-xs text-muted-foreground">Of total volume</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Clock className="w-4 h-4 mr-2 text-foreground" />
                Avg Hold Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">14.3d</p>
              <p className="text-xs text-muted-foreground">Until delivery</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
            <TabsTrigger value="volume">Volume Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Portfolio Performance vs Market</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="portfolio" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="market" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Allocation Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {allocationData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{item.value}%</p>
                        <Badge variant="outline" className="text-xs">
                          <Target className="w-3 h-3 mr-1" />
                          Target: {item.value + 5}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {riskMetrics.map((risk) => (
                <Card key={risk.metric} className="bg-card border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">{risk.metric}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-foreground mb-2">{risk.value}</p>
                    <p className={`text-sm font-mono ${risk.isPositive ? 'text-success' : 'text-destructive'}`}>
                      {risk.isPositive ? '+' : ''}{risk.change} vs last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="volume" className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Trading Volume by Commodity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="commodity" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="volume" fill="hsl(var(--primary))" />
                    <Bar dataKey="encrypted" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;