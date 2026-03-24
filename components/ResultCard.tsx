// components/ResultCard.tsx
interface ResultProps {
  label: string;
  usdValue: number;
  idrValue: string;
  percentage?: number;
  isProfit: boolean;
}

export default function ResultCard({ label, usdValue, idrValue, percentage, isProfit }: ResultProps) {
  return (
    <div className={`p-6 rounded-3xl border transition-all duration-500 ${
      isProfit 
        ? "bg-green-50/50 border-green-100" 
        : "bg-red-50/50 border-red-100"
    }`}>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h2 className={`text-3xl font-black ${isProfit ? "text-green-600" : "text-red-600"}`}>
          {isProfit ? "+" : ""}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(usdValue)}
        </h2>
        {percentage !== undefined && (
          <span className={`text-sm font-bold px-2 py-1 rounded-lg ${isProfit ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {isProfit ? "↑" : "↓"} {percentage.toFixed(2)}%
          </span>
        )}
      </div>
      <p className="text-gray-500 font-medium mt-1">≈ {idrValue}</p>
    </div>
  );
}