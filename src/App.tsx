import React, { useState } from 'react';
import { Bell, Search, TrendingUp, ShoppingCart, Settings, Menu, X } from 'lucide-react';
import ItemGrid from './components/ItemGrid';
import PriceChart from './components/PriceChart';
import Sidebar from './components/Sidebar';
import NotificationPanel from './components/NotificationPanel';
import SearchFilters from './components/SearchFilters';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold text-gray-800">RoPlace Sniper</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex pt-16">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-1 p-6 lg:ml-64">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Tracked Items"
              value="247"
              change="+12"
              icon={<TrendingUp className="text-green-500" />}
            />
            <StatCard
              title="Successful Snipes"
              value="18"
              change="+3"
              icon={<ShoppingCart className="text-blue-500" />}
            />
            <StatCard
              title="Active Alerts"
              value="24"
              change="-2"
              icon={<Bell className="text-yellow-500" />}
            />
            <StatCard
              title="Avg. Response Time"
              value="0.8s"
              change="-0.1s"
              icon={<TrendingUp className="text-purple-500" />}
            />
          </div>

          {/* Price Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Price History</h2>
            <PriceChart />
          </div>

          {/* Filters and Items Grid */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <SearchFilters />
            <ItemGrid />
          </div>
        </main>

        {/* Notification Panel */}
        <NotificationPanel isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        {icon}
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold">{value}</p>
        <span className="ml-2 text-sm text-green-500">{change}</span>
      </div>
    </div>
  );
}

export default App;