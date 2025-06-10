import { useState, useEffect } from 'react';
import axios from 'axios';
import TabButton from './TabButton';
import TabPanel from './TabPanel';
import AiRecipeSuggest from './AiRecipeSuggest';
import FastAddModal from './FastAddModal';
import LoginForm from './LoginForm';
import GoalDashboard from './GoalDashboard';

export default function App() {
  const [tab, setTab] = useState('pantry');
  const [items, setItems] = useState([]);
  const [showFastAdd, setShowFastAdd] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [snapshotVersion, setSnapshotVersion] = useState(0);

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);
  const [editExpires, setEditExpires] = useState('');

  // Online/offline indicator
  useEffect(() => {
    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  // Fetch pantry items on tab or login change
  useEffect(() => {
    if (tab === 'pantry' && loggedIn) fetchItems();
  }, [tab, loggedIn]);

  async function fetchItems() {
    setLoading(true);
    try {
      const resp = await axios.get('/api/pantry', { withCredentials: true });
      setItems(resp.data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  function onItemAdded(item) {
    setItems((prev) => [item, ...prev]);
  }

  async function handleCook(id) {
    try {
      const { data } = await axios.get('/api/csrf-token', { withCredentials: true });
      const resp = await axios.patch(
        `/api/pantry/${id}/decrement`,
        {},
        { withCredentials: true, headers: { 'CSRF-Token': data.csrfToken } }
      );
      const d = resp.data;
      setItems((prev) =>
        d.removed
          ? prev.filter((i) => i.id !== id)
          : prev.map((i) => (i.id === id ? d : i))
      );
      setSnapshotVersion((v) => v + 1);
    } catch {
      alert('Could not update item. Please try again.');
    }
  }
  async function handleClearPantry() {
  if (!window.confirm('Remove ALL items from your pantry?')) return;
  try {
    const { data } = await axios.get('/api/csrf-token', { withCredentials: true });
    await axios.delete('/api/pantry/clear', {
      headers: { 'CSRF-Token': data.csrfToken },
      withCredentials: true,
    });
    setItems([]);                 // empty UI list
    setSnapshotVersion((v) => v + 1);
  } catch {
    alert('Could not clear pantry. Please try again.');
  }
}
  // Handle manual edits
  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.get('/api/csrf-token', { withCredentials: true });
      const resp = await axios.patch(
        `/api/pantry/${editingId}`,
        { quantity: editQuantity, expiresAt: editExpires },
        { withCredentials: true, headers: { 'CSRF-Token': data.csrfToken } }
      );
      const updated = resp.data;
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      setEditingId(null);
      setSnapshotVersion((v) => v + 1);
    } catch {
      alert('Failed to save changes.');
    }
  }

  if (!loggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <LoginForm onLoginSuccess={() => setLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className="relative grid h-screen grid-rows-layout">
      {isOffline && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-x-0 top-0 bg-yellow-400 text-black text-center py-1 z-10"
        >
          Reconnecting…
        </div>
      )}

      <header role="banner" className="flex items-center justify-center bg-blue-600 text-white p-4">
        <h1 className="text-xl font-semibold">PantryPal</h1>
      </header>

      <nav role="tablist" aria-label="Main navigation" className="flex bg-gray-100">
        {['pantry', 'goals', 'recipes'].map((id) => (
          <TabButton
            key={id}
            id={id}
            label={id.charAt(0).toUpperCase() + id.slice(1)}
            active={tab === id}
            onSelect={setTab}
          />
        ))}
      </nav>

      <main id="main-content" role="main" className="overflow-auto p-4 bg-white mt-1">
        <TabPanel id="pantry" active={tab === 'pantry'}>
          <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-semibold text-gray-800">My Pantry</h2>
  <div className="flex gap-2">
    <button
      onClick={handleClearPantry}
      className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-blue-600 text-white px-3 py-1 rounded"
    >
      Clear Pantry
    </button>
    <button
      onClick={() => setShowFastAdd(true)}
      className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-blue-600 text-white px-3 py-1 rounded"
    >
      Fast Add
    </button>
  </div>
</div>

          {loading ? (
            <p className="text-gray-800">Loading…</p>
          ) : items.length ? (
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border border-gray-300 p-2 rounded"
                >
                  {editingId === item.id ? (
                    <form onSubmit={handleEditSubmit} className="flex items-center space-x-2 w-full">
                      <input
                        type="number"
                        min="1"
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(parseInt(e.target.value, 10))}
                        className="w-20 border border-gray-300 rounded p-1"
                        required
                      />
                      <input
                        type="date"
                        value={editExpires}
                        onChange={(e) => setEditExpires(e.target.value)}
                        className="border border-gray-300 rounded p-1"
                      />
                      <button type="submit" className="bg-blue-600 text-white px-2 py-1 rounded">
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="text-gray-600 px-2"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.product.name} × {item.quantity}
                        </p>
                        <p className="text-sm text-gray-800">
                          Expires:{' '}
                          {item.expiresAt
                            ? new Date(item.expiresAt).toLocaleDateString()
                            : '—'}
                        </p>
                        {item.product.nutrition && (
                          <p className="text-sm text-gray-600">
                            {item.product.nutrition['energy-kcal_value']} kcal,&nbsp;
                            {item.product.nutrition['proteins_value']} g protein
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            setEditQuantity(item.quantity);
                            setEditExpires(item.expiresAt?.split('T')[0] || '');
                          }}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleCook(item.id)}
                          className="bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-blue-600 text-white px-2 py-1 rounded"
                        >
                          Cook
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-800">No items in your pantry yet.</p>
          )}
        </TabPanel>

        <TabPanel id="goals" active={tab === 'goals'}>
          <GoalDashboard refreshSignal={snapshotVersion} />
        </TabPanel>

        <TabPanel id="recipes" active={tab === 'recipes'}>
          <AiRecipeSuggest />
        </TabPanel>
      </main>

      <footer role="contentinfo" className="flex items-center justify-center bg-slate-100 text-xs p-2">
        ©2025 PantryPal
      </footer>

      <FastAddModal isOpen={showFastAdd} onClose={() => setShowFastAdd(false)} onItemAdded={onItemAdded} />
    </div>
  );
}
