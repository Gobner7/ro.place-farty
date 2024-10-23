import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Bell, TrendingUp, Eye } from 'lucide-react';
import { Item } from '../types';
import { fetchItems } from '../lib/api';
import SnipeModal from './SnipeModal';

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return 'text-yellow-500 bg-yellow-50';
    case 'rare':
      return 'text-purple-500 bg-purple-50';
    case 'uncommon':
      return 'text-green-500 bg-green-50';
    default:
      return 'text-gray-500 bg-gray-50';
  }
};

export default function ItemGrid() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [trackedItems, setTrackedItems] = useState<number[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (err) {
        setError('Failed to load items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadItems();
    // Set up real-time updates
    const ws = new WebSocket('wss://api.ro.place/ws');
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setItems(current => 
        current.map(item => 
          item.id === update.itemId 
            ? { ...item, ...update }
            : item
        )
      );
    };

    return () => ws.close();
  }, []);

  const toggleTrack = (itemId: number) => {
    setTrackedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <button 
                onClick={() => toggleTrack(item.id)}
                className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                  trackedItems.includes(item.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Bell size={16} />
              </button>
              <span className={`
                absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium
                ${getRarityColor(item.rarity)}
              `}>
                {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
              </span>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Eye size={14} />
                  <span>{item.views.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500">Current Price</p>
                  <p className="font-semibold">R$ {item.price.toLocaleString()}</p>
                  {item.lastSale && (
                    <p className="text-xs text-gray-500 mt-1">
                      Last sale: R$ {item.lastSale.toLocaleString()}
                    </p>
                  )}
                </div>
                <div className={`flex items-center ${
                  item.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span className="ml-1">{Math.abs(item.change)}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <TrendingUp size={14} />
                  <span>{item.available} available</span>
                </div>
                <button 
                  onClick={() => setSelectedItem(item)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Snipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <SnipeModal
          item={selectedItem}
          isOpen={true}
          onClose={() => setSelectedItem(null)}
          onSuccess={() => {
            // Refresh items after successful snipe
            fetchItems().then(setItems);
          }}
        />
      )}
    </>
  );
}