"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  CheckCircle, 
  Activity, 
  ShoppingCart, 
  User, 
  LogOut,
  Menu
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
  onNavigate?: (href: string) => void;
  currentRoute?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className, onNavigate, currentRoute }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const navItems = [
    { 
      name: 'Home', 
      href: '/Home', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      name: 'Verify', 
      href: '/verify', 
      icon: <CheckCircle className="h-5 w-5" /> 
    },
    { 
      name: 'Health Check', 
      href: '/health-check', 
      icon: <Activity className="h-5 w-5" /> 
    },
    { 
      name: 'Explore', 
      href: '/explore', 
      icon: <ShoppingCart className="h-5 w-5" /> 
    },
    { 
      name: 'Profile', 
      href: '/profile', 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      name: 'Logout', 
      href: '/logout', 
      icon: <LogOut className="h-5 w-5" /> 
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-screen bg-background border-r transition-all duration-300 sticky top-0",
      isCollapsed ? "w-[5%] px-0 py-5" : "w-[22%] p-5 rounded-2xl",
      className
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between mb-4 pl-4",
        isCollapsed && "opacity-0"
      )}>
        {!isCollapsed && (
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#47049f] via-[#732aa4] to-[#bb22fd] bg-clip-text text-transparent bg-[length:300%_300%] animate-gradient">
            VeriTrust
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-1">
          {navItems.map((item) => {
            // Use currentRoute if provided, otherwise fall back to pathname
            const isActive = currentRoute 
              ? currentRoute === item.href 
              : pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                    isActive 
                      ? "bg-[#47049f] text-white" 
                      : "hover:bg-[#47049f] hover:text-white",
                    isCollapsed && "justify-center"
                  )}
                >
                  <span className={cn(
                    "text-lg",
                    isCollapsed ? "mr-0" : "mr-2"
                  )}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.name}</span>}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-background border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer with Theme Toggle and Collapse Button */}
      <div className="mt-auto flex flex-col items-center gap-2 pt-4">
        {/* Theme Toggle */}
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
        
        {/* Collapse/Expand Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#b013e4] p-2 rounded-full cursor-pointer text-xl"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;