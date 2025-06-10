export default function TabButton({ id, label, active, onSelect }) {
  return (
    <button
      role="tab"
      id={id}
      aria-selected={active}
      aria-controls={`${id}-panel`}
      tabIndex={active ? 0 : -1}
      className={`flex-1 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-600 ${
        active ? 'border-b-2 border-blue-600' : 'border-b border-slate-300'
      }`}
      onClick={() => onSelect(id)}
    >
      {label}
    </button>
  );
}