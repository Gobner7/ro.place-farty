import React from 'react';
import { X, Package, ArrowUp, ArrowDown } from 'lucide-react';
import { format } from 'date-fns';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: number;
  type: 'price_drop' | 'price_rise' | 'available' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'price_drop',
    title: 'Price Drop Alert',
    message: 'Dominus Aureus price dropped by 15%',
    timestamp: new Date(),
    read: false,
  },
  {
    id: 2,
    type: 'available',
    title: 'Item Available',
    message: 'Limited item "Golden Crown" is now available',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: 3,
    type: 'price_rise',
    title: 'Price Increase',
    message: 'Tracked item "Valkyrie Helm" price increased by 25%',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'price_drop':
      return <ArrowDown className="text-green-500" />;
    case 'price_rise':
      return <ArrowUp className="text-red-500" />;
    case 'available':
      return <Package className="text-blue-500" />;
    default:
      return null;
  }
};

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={`
        fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white border-l border-gray-200
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-lg">Notifications</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer
                ${notification.read ? 'opacity-75' : ''}
              `}
            >
              <div className="flex gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {format(notification.timestamp, 'h:mm a')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}