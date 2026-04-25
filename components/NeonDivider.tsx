export default function NeonDivider() {
  return (
    <div className="relative w-full flex justify-center -mt-8 mb-12 z-20 overflow-visible">
      {/* outer glow */}
      <div className="absolute top-1/2 left-[10%] right-[10%] h-[22px] -translate-y-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-3xl opacity-90" />
      {/* inner glow */}
      <div className="absolute top-1/2 left-[10%] right-[10%] h-[10px] -translate-y-1/2 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent blur-xl opacity-90" />
      {/* pulsing core */}
      <div className="h-[2px] w-4/5 bg-gradient-to-r from-transparent via-purple-300 to-transparent animate-pulse" />
    </div>
  );
}