import { Item } from '../types';

const API_BASE = 'https://api.ro.place';

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(`${API_BASE}/items/limited`);
  if (!response.ok) throw new Error('Failed to fetch items');
  return response.json();
}

export async function snipeItem(itemId: number, maxPrice: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId,
        maxPrice,
      }),
    });
    
    if (!response.ok) throw new Error('Purchase failed');
    return true;
  } catch (error) {
    console.error('Snipe failed:', error);
    return false;
  }
}

export async function getItemDetails(itemId: number) {
  const response = await fetch(`${API_BASE}/items/${itemId}`);
  if (!response.ok) throw new Error('Failed to fetch item details');
  return response.json();
}

export async function setItemAlert(itemId: number, maxPrice: number) {
  const response = await fetch(`${API_BASE}/alerts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      itemId,
      maxPrice,
    }),
  });
  if (!response.ok) throw new Error('Failed to set alert');
  return response.json();
}