export default function NeonDivider() {
    return (
        <div>
            <div className="relative w-full flex justify-center -mt-8 mb-12 z-20 overflow-visible">
                {/* outer glow */}
                <div className="absolute -inset-x-0 top-1/2 -translate-y-1/2 h-[22px] w-4/5 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-3xl opacity-90" />

                {/* inner glow */}
                <div className="absolute -inset-x-0 top-1/2 -translate-y-1/2 h-[10px] w-4/5 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent blur-xl opacity-90" />

                {/* core line */}
                <div className="h-[2px] w-4/5 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
                <div className="absolute ... blur-3xl opacity-90 animate-pulse" />
            </div>
        </div>
    );
}