import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Item } from '../types';

interface PriceChartProps {
  item?: Item;
  data?: Array<{ timestamp: number; price: number }>;
}

export default function PriceChart({ item, data = [] }: PriceChartProps) {
  const chartData = item ? item.priceHistory : data;
  
  const formatPrice = (value: number) => `R$ ${value.toLocaleString()}`;
  const formatDate = (timestamp: number) => format(new Date(timestamp), 'MMM d');

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatDate}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis
            tickFormatter={formatPrice}
            tick={{ fill: '#6B7280' }}
          />
          <Tooltip
            contentStyle={{ background: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy')}
            formatter={(value: number) => [formatPrice(value), 'Price']}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#priceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}