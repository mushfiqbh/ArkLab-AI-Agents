export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="relative">
          <div className="rounded-full h-12 w-12 border-2 border-primary/20 border-t-primary mx-auto mb-4" />
          <div className="absolute inset-0 rounded-full h-12 w-12 border-2 border-transparent border-l-primary/40 mx-auto" />
        </div>
        <p className="text-muted-foreground">Loading agents...</p>
        <div className="flex justify-center mt-3 gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1 h-1 bg-primary rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
