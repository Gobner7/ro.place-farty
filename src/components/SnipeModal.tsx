import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Item, SnipeSettings } from '../types';
import { snipeItem, setItemAlert } from '../lib/api';

interface SnipeModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SnipeModal({ item, isOpen, onClose, onSuccess }: SnipeModalProps) {
  const [settings, setSettings] = useState<SnipeSettings>({
    maxPrice: item.price,
    autoSnipe: true,
    alertPrice: item.price,
  });
  const [loading, setLoading] = useState(false);

  const handleSnipe = async () => {
    try {
      setLoading(true);
      const success = await snipeItem(item.id, settings.maxPrice);
      if (success) {
        onSuccess();
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSetAlert = async () => {
    try {
      setLoading(true);
      await setItemAlert(item.id, settings.alertPrice);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 pointer-events-auto">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Snipe Settings - {item.name}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Purchase Price (R$)
              </label>
              <input
                type="number"
                value={settings.maxPrice}
                onChange={(e) => setSettings({ ...settings, maxPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoSnipe"
                checked={settings.autoSnipe}
                onChange={(e) => setSettings({ ...settings, autoSnipe: e.target.checked })}
                className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="autoSnipe" className="text-sm text-gray-700">
                Auto-snipe when price is below maximum
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alert Price (R$)
              </label>
              <input
                type="number"
                value={settings.alertPrice}
                onChange={(e) => setSettings({ ...settings, alertPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {settings.maxPrice > item.averagePrice! * 1.2 && (
              <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-yellow-700">
                  Your maximum price is significantly higher than the average price (R$ {item.averagePrice?.toLocaleString()}). 
                  Consider lowering it to avoid overpaying.
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
            <button
              onClick={handleSetAlert}
              disabled={loading}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Set Alert Only
            </button>
            <button
              onClick={handleSnipe}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Start Sniping'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}