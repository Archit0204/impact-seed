"use client"

type ProgressBarProps = {
    raised: number;
    goal: number;
    showLabel?: boolean;
    size?: "sm" | "md" | "lg";
};

export default function ProgressBar({ raised, goal, showLabel = true, size = "md" }: ProgressBarProps) {
    const percentage = Math.min(Math.round((raised / goal) * 100), 100);
    const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

    return (
        <div className="w-full">
            <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heights[size]}`}>
                <div
                    className={`${heights[size]} rounded-full gradient-primary progress-fill transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {showLabel && (
                <div className="flex justify-between items-center mt-1.5">
                    <span className="text-xs font-medium text-slate-500">
                        ${raised.toLocaleString()} raised
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">
                        {percentage}%
                    </span>
                </div>
            )}
        </div>
    );
}
