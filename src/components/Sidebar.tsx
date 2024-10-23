import React from 'react';
import { Home, Package, History, Bell, Heart, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <Package size={20} />, label: 'Items', count: 247 },
    { icon: <History size={20} />, label: 'History' },
    { icon: <Bell size={20} />, label: 'Alerts', count: 24 },
    { icon: <Heart size={20} />, label: 'Watchlist', count: 12 },
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <HelpCircle size={20} />, label: 'Help' },
  ];

  return (
    <aside className={`
      fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200
      transition-all duration-300 ease-in-out z-20
      ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                ${item.active 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.count && (
                <span className={`
                  ml-auto px-2 py-0.5 text-xs rounded-full
                  ${item.active 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}