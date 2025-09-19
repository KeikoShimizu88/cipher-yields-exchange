import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="mt-16 bg-secondary/50 backdrop-blur-sm">
      {/* Animated Conveyor Belt */}
      <div className="relative overflow-hidden h-16 conveyor-belt">
        <div className="absolute inset-0 flex items-center justify-center space-x-12 opacity-60">
          {/* Shipping Crates */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="flex-shrink-0 w-12 h-8 bg-muted border border-border rounded-sm relative"
              style={{ 
                animationDelay: `${i * 0.5}s`,
                transform: `translateX(${i * 100}px)` 
              }}
            >
              <div className="absolute inset-1 border border-accent/30 rounded-xs" />
              <div className="absolute top-1 left-1 w-2 h-1 bg-primary rounded-xs opacity-70" />
            </div>
          ))}
        </div>
        
        {/* Belt Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/20 to-transparent" />
      </div>

      <Separator className="bg-border/30" />

      {/* Footer Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="font-bold text-primary">Exchange</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Gold Trading</li>
              <li>Oil Futures</li>
              <li>Agricultural</li>
              <li>Precious Metals</li>
            </ul>
          </div>

          {/* Security */}
          <div className="space-y-3">
            <h3 className="font-bold text-accent">Security</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>End-to-End Encryption</li>
              <li>Smart Contracts</li>
              <li>Audit Reports</li>
              <li>Compliance</li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="font-bold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Trading Guide</li>
              <li>API Documentation</li>
              <li>Help Center</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <h3 className="font-bold text-warning">System Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-muted-foreground">Trading Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-muted-foreground">Encryption Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                <span className="text-muted-foreground">Maintenance Soon</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-border/30" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2024 Confidential Commodity Exchange. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="font-mono">Uptime: 99.98%</span>
            <span className="font-mono">Last Update: 2.3s ago</span>
          </div>
        </div>
      </div>
    </footer>
  );
};