export default function NeonDivider() {
  return (
    <div aria-hidden className="relative mx-auto flex w-full max-w-6xl items-center px-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/15" />
      <div className="relative mx-3 h-1.5 w-1.5 rotate-45 border border-violet-300/50">
        <div className="absolute -inset-2 bg-violet-500/30 blur-md" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/15" />
    </div>
  );
}
