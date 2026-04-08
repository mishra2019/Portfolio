export function SectionDivider() {
  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <div
        className="h-px max-w-7xl mx-auto"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.45 0.15 195 / 0.35), oklch(0.5 0.2 312 / 0.4), transparent)",
        }}
      />
    </div>
  );
}
