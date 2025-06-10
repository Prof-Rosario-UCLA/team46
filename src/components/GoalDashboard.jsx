// src/components/GoalDashboard.jsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProgressRing from './ProgressRing';

/**
 * Dashboard that shows “eaten vs goal” for calories and protein.
 *
 * @param {number} refreshSignal – a counter from the parent; whenever it
 *                                increments the dashboard re-fetches.
 */
export default function GoalDashboard({ refreshSignal = 0 }) {
  const [data, setData]     = useState(null);
  const [loading, setLoad]  = useState(true);
  const [error, setError]   = useState('');

  /** reusable fetch so we can call it on mount and on refreshSignal */
  const fetchSnapshot = useCallback(async () => {
    setLoad(true);
    try {
      const resp = await axios.get('/api/goals/snapshot', {
        withCredentials: true,
      });
      setData(resp.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to load goals');
    } finally {
      setLoad(false);
    }
  }, []);
  async function handleReset() {
  try {
    // 1) grab fresh CSRF token
    const { data: { csrfToken } } = await axios.get('/api/csrf-token', { withCredentials: true });

    // 2) call the reset endpoint
    await axios.post(
      '/api/goals/snapshot/reset',
      {},
      { withCredentials: true, headers: { 'CSRF-Token': csrfToken } }
    );

    // 3) re-fetch the snapshot
    fetchSnapshot();
  } catch (err) {
    console.error(err);
    setError('Could not reset today’s counters');
  }
}

  /* Fetch on first mount */
  useEffect(() => {
    fetchSnapshot();
  }, [fetchSnapshot]);

  /* Re-fetch whenever parent bumps refreshSignal */
  useEffect(() => {
    if (refreshSignal > 0) fetchSnapshot();
  }, [refreshSignal, fetchSnapshot]);

  /* ──────────────  render  ────────────── */
  if (loading)              return <p className="text-gray-800">Loading dashboard…</p>;
  if (error)                return <p className="text-red-600">{error}</p>;
  if (!data?.goal)          return <p className="text-gray-800">No goals set yet.</p>;

  const { goal, eaten, pct } = data;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
      
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Daily Macros</h2>
      <button
        onClick={handleReset}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded focus:ring-2 focus:ring-red-700"
      >
        Reset Today
      </button>
    </div>
      

      <div className="flex flex-wrap">
        <ProgressRing
          percent={pct.kcal}
          label={`${Math.round(eaten.kcal)} / ${goal.kcalDaily} kcal`}
        />
        <ProgressRing
          percent={pct.protein}
          label={`${Math.round(eaten.protein)} / ${goal.proteinG} g protein`}
        />
      </div>
      
    </div>
  );
}
