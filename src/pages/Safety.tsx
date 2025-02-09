
import * as React from "react";
import { MapPin, Search, Bell, Menu, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as SheetPrimitive from "@radix-ui/react-sheet";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility functions
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Progress Component
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { indicatorColor?: string }
>(({ className, value, indicatorColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full w-full flex-1 transition-all", indicatorColor)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// Card Component
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// Input Component
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Button Component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "ghost" | "default";
    size?: "icon" | "default";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "h-10 w-10": size === "icon",
          "h-10 px-4 py-2": size === "default",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Sheet Components
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
        className
      )}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

// Main Safety Component
const Safety = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const dangerLevel = 75;
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Main', icon: Home, action: () => navigate('/') },
    { name: 'Search', icon: Search, action: () => navigate('/search') },
    { name: 'Alerts', icon: Bell, action: () => navigate('/safety') },
  ];

  const getDangerColor = (level: number) => {
    if (level <= 30) return 'bg-green-500';
    if (level <= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = () => {
    const date = new Date();
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    }).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-monitor-background">
      {/* Navigation Menu */}
      <div className="fixed top-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-sky-400/20">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-sky-50">
            <SheetHeader>
              <SheetTitle className="text-sky-900">Sea Near Me</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-sky-800 hover:bg-sky-100 hover:text-sky-900"
                  onClick={item.action}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Header */}
      <div className="container pt-4 text-white">
        <div className="flex items-center gap-2 opacity-80 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Université de Montréal, 2900, Boulevard Éd...</span>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">{formatDate()}</h1>
          <p className="text-sm opacity-80">{formatTime()}</p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Sea Near Me</h2>

        {/* Search Bar */}
        <div className="relative max-w-full mb-8">
          <Input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5" />
            <h3 className="text-xl font-semibold">Alerts</h3>
          </div>

          <Card className="bg-white/5 border-white/10">
            <div className="p-6 space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-5xl font-bold text-white">{dangerLevel}%</span>
                  <span className="text-lg text-white">Danger Level</span>
                </div>
                <Progress 
                  value={dangerLevel} 
                  className="h-2" 
                  indicatorColor={getDangerColor(dangerLevel)}
                />
              </div>

              <div className="space-y-2 text-sm text-white">
                <div className="flex justify-between">
                  <span>0% - 30%</span>
                  <span className="text-green-400">Safe</span>
                </div>
                <div className="flex justify-between">
                  <span>31% - 60%</span>
                  <span className="text-yellow-400">Caution</span>
                </div>
                <div className="flex justify-between">
                  <span>61% - 100%</span>
                  <span className="text-red-400">Danger</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Current Status */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Current Status</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm opacity-60 text-white mb-1">Description</p>
                <p className="text-lg text-white">Possible to evacuate</p>
              </div>
              <div>
                <p className="text-sm opacity-60 text-white mb-1">Affected Region</p>
                <p className="text-lg text-white">Montreal Coastal Area</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Map Section */}
        <Card className="bg-white/5 border-white/10">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Safe Region Map</h3>
            <div className="h-64 bg-white/5 rounded-lg" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Safety;
