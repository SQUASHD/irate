function ColouredIntensity({ intensity }: { intensity: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(intensity)].map((_, i) => (
        <div key={i} className="h-4 w-1 bg-zinc-200"></div>
      ))}
    </div>
  );
}

function UncolouredIntensity({ intensity }: { intensity: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(12 - intensity)].map((_, i) => (
        <div key={i} className="h-4 w-1 bg-zinc-600"></div>
      ))}
    </div>
  );
}

export default function IntensityField({ intensity }: { intensity: number }) {
  return (
    <div className="flex items-center gap-1">
      <ColouredIntensity intensity={intensity} />
      {intensity}
      <UncolouredIntensity intensity={intensity} />
    </div>
  );
}
