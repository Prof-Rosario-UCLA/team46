export default function TabPanel({ id, active, children }) {
  return (
    <section
      role="tabpanel"
      id={`${id}-panel`}
      aria-labelledby={id}
      hidden={!active}
      className="h-full overflow-hidden p-4"
    >
      {children}
    </section>
  );
}