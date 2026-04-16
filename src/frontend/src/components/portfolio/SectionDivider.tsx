export function SectionDivider() {
  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <div
        className="h-px max-w-7xl mx-auto"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.38 0.02 85 / 0.35), transparent)",
        }}
      />
    </div>
  );
}
