import { useState } from 'react';
import TabButton from './TabButton';
import TabPanel  from './TabPanel';

export default function App() {
  const [tab, setTab] = useState('pantry');     //  ← ‘setTab’ uses TabButton

  return (
    <div className="grid h-screen grid-rows-layout">
      <header className="flex items-center justify-center bg-blue-600 text-white">
        <h1 className="text-lg font-semibold">PantryPal</h1>
      </header>

      <nav role="tablist" className="flex">
        {['pantry', 'goals', 'recipes'].map(id => (
          <TabButton
            key={id}
            id={id}
            label={id.charAt(0).toUpperCase() + id.slice(1)}
            active={tab === id}
            onSelect={setTab}
          />
        ))}
      </nav>

      <main className="relative h-full">
        <TabPanel id="pantry"  active={tab === 'pantry'} >Pantry view</TabPanel>
        <TabPanel id="goals"   active={tab === 'goals'}  >Goals view</TabPanel>
        <TabPanel id="recipes" active={tab === 'recipes'}>Recipes view</TabPanel>
      </main>

      <footer className="flex items-center justify-center bg-slate-100 text-xs">
        ©2025 PantryPal
      </footer>
    </div>
  );
}
