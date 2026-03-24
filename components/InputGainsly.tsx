export default function InputGainsly({ label, value, onChange, currency, subValue }: any) {
  return (
    <div className="group flex flex-col gap-1.5 w-full">
      <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400 ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors font-semibold">
          {currency === "USD" ? "$" : "Rp"}
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-gray-700 font-medium"
          placeholder="0.00"
        />
      </div>
      {subValue && (
        <span className="text-[10px] text-gray-400 ml-1 font-medium italic opacity-0 group-focus-within:opacity-100 transition-opacity">
          {subValue}
        </span>
      )}
    </div>
  );
}