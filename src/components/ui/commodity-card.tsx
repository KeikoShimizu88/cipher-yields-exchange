import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CommodityCardProps {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  volume: string;
  encrypted: boolean;
  lastUpdate: string;
}

export const CommodityCard = React.forwardRef<
  HTMLDivElement,
  CommodityCardProps
>(({
  symbol,
  name,
  price,
  change,
  changePercent,
  isPositive,
  volume,
  encrypted,
  lastUpdate,
  ...props
}, ref) => {
  return (
    <Card 
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-card border-border/50 hover:border-accent/50",
        "transition-all duration-300 hover:glow-neon hover:scale-[1.02]",
        "backdrop-blur-sm bg-gradient-industrial"
      )}
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-primary">{symbol}</h3>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          <Badge 
            variant={encrypted ? "default" : "secondary"}
            className={cn(
              "font-mono text-xs",
              encrypted && "bg-accent text-accent-foreground glow-neon"
            )}
          >
            {encrypted ? "ENCRYPTED" : "PENDING"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-foreground price-pulse">
              ${price}
            </p>
            <p className={cn(
              "text-sm font-mono",
              isPositive ? "text-success" : "text-destructive"
            )}>
              {isPositive ? "+" : ""}{change} ({changePercent}%)
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Volume</p>
            <p className="font-mono text-sm">{volume}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="text-xs text-muted-foreground font-mono">
            {lastUpdate}
          </span>
          <Button 
            size="sm" 
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Trade
          </Button>
        </div>
      </CardContent>
      
      {/* Circuit overlay effect */}
      <div className="absolute inset-0 opacity-10 circuit-glow pointer-events-none">
        <div className="absolute top-2 right-2 w-8 h-8 border border-accent rounded-full" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border border-primary rounded-sm" />
      </div>
    </Card>
  );
});

CommodityCard.displayName = "CommodityCard";