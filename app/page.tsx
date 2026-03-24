"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import InputGainsly from "@/components/InputGainsly";
import { toPng } from 'html-to-image';

export default function Home() {
  const [invest, setInvest] = useState<string>("");
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [sellPrice, setSellPrice] = useState<string>("");
  
  const [coinSearch, setCoinSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res => res.json())
      .then(data => setCoins(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  const handleSelectCoin = (coin: any) => {
    setCoinSearch(coin.name);
    setBuyPrice(coin.current_price.toString());
    setShowDropdown(false);
  };

  const KURS_USD = 15850;
  const toIDR = (val: any) => {
    const num = typeof val === "string" ? parseFloat(val) : val;
    return new Intl.NumberFormat("id-ID", {
      style: "currency", currency: "IDR", maximumFractionDigits: 0,
    }).format((num || 0) * KURS_USD);
  };

  const downloadScreenshot = () => {
    const node = resultRef.current;
    if (!node) return;

    setTimeout(() => {
      toPng(node, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `Gainsly-Profit-${coinSearch || 'Crypto'}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => console.log(err));
    }, 500);
  };

  const stats = useMemo(() => {
    const inv = parseFloat(invest) || 0;
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    if (inv > 0 && buy > 0 && sell > 0) {
      const nominal = (sell - buy) * (inv / buy);
      return {
        profit: nominal, percent: ((sell - buy) / buy) * 100,
        total: inv + nominal, isProfit: nominal >= 0, show: true
      };
    }
    return { show: false };
  }, [invest, buyPrice, sellPrice]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd]">
      <title>Gainsly - Kalkulator Profit Crypto Presisi & Modern</title>
      
      {/* --- HEADER (MASTER TEMPLATE) --- */}
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-black text-xl italic">G</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-gray-900 italic">
              Gainsly<span className="text-blue-600">.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3 md:gap-8">
            <span className="text-[9px] md:text-[11px] font-bold text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
              1 USD = {toIDR(1)}
            </span>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="grow">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Real-time Conversion</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.2]">
              Track your <br />
              <span className="text-blue-600 underline decoration-blue-100 decoration-8 underline-offset-4">crypto gains</span> <br />
              with precision.
            </h2>
            
            <p className="text-lg text-gray-500 max-w-md font-medium leading-relaxed">
              Kalkulator profit crypto minimalis yang membantu Anda menghitung potensi keuntungan dengan konversi otomatis ke Rupiah.
            </p>

            <div className="grid grid-cols-2 gap-5 pt-2">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-gray-950 tracking-tight leading-tight text-nowrap">Harga Real-time</p>
                  <p className="text-xs font-semibold text-gray-400 mt-1">Data akurat dari exchange.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-gray-950 tracking-tight leading-tight text-nowrap">24/7 Access</p>
                  <p className="text-xs font-semibold text-gray-400 mt-1">Analisis pasar kapan saja.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Calculator Card */}
          <div className="lg:sticky lg:top-32 animate-slide-up">
            <div className="bg-white rounded-[2.5rem] p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-gray-100">
              <div className="bg-white rounded-[2.4rem] p-8 space-y-8">
                
                <div className="space-y-6">
                  <div className="relative group flex flex-col gap-1.5 w-full">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1">Select Coin</label>
                    <input
                      type="text"
                      placeholder="Search (e.g. Bitcoin, Eth...)"
                      className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-gray-700 font-medium"
                      value={coinSearch}
                      onFocus={() => setShowDropdown(true)}
                      onChange={(e) => { setCoinSearch(e.target.value); setShowDropdown(true); }}
                    />
                    {showDropdown && (
                      <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                        {coins.filter((c:any) => c.name.toLowerCase().includes(coinSearch.toLowerCase())).slice(0,5).map((coin: any) => (
                          <button key={coin.id} onClick={() => handleSelectCoin(coin)} className="w-full px-5 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                            <img src={coin.image} alt="" className="w-6 h-6 rounded-full" />
                            <span className="font-bold text-gray-700">{coin.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* --- PERBAIKAN DI SINI: MENAMBAHKAN subValue KE SEMUA INPUT --- */}
                  <InputGainsly label="Initial Investment" currency="USD" value={invest} onChange={setInvest} subValue={toIDR(invest)} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGainsly label="Buy Price" currency="USD" value={buyPrice} onChange={setBuyPrice} subValue={toIDR(buyPrice)} />
                    <InputGainsly label="Sell Price" currency="USD" value={sellPrice} onChange={setSellPrice} subValue={toIDR(sellPrice)} />
                  </div>
                </div>

                {stats.show ? (
                  <div className="space-y-6">
                    <div ref={resultRef} className={`relative overflow-hidden p-8 rounded-4xl border transition-all duration-500 ${stats.isProfit ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-rose-600 text-white border-rose-500'}`}>
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-2 opacity-80">
                          <div className="w-6 h-6 bg-white rounded flex items-center justify-center font-black italic text-sm text-gray-900">G</div>
                          <span className="text-sm font-black tracking-tighter">Gainsly.</span>
                        </div>
                        <p className="text-xs font-black uppercase tracking-tight">{coinSearch || 'Asset'}</p>
                      </div>
                      <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1">Estimated Profit</p>
                      <h2 className="text-5xl font-black tracking-tighter mb-2 leading-none">
                        {stats.isProfit ? '+' : ''}{Math.abs(stats.percent as number).toFixed(2)}%
                      </h2>
                      <p className="text-lg font-bold opacity-90">{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(stats.profit as number)}</p>
                      <p className="text-sm font-semibold opacity-60 mt-1">{toIDR(stats.profit)}</p>
                    </div>
                    <button onClick={downloadScreenshot} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                      Save as Image
                    </button>
                  </div>
                ) : (
                  <div className="py-12 text-center border-t border-dashed border-gray-100 text-gray-300 italic text-sm">Enter values to calculate</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

   <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <h3 className="text-xl font-black italic mb-4">Gainsly<span className="text-blue-600">.</span></h3>
              <p className="text-gray-400 font-medium max-w-xs text-sm leading-relaxed">
                The most minimal and elegant crypto profit calculator for modern traders. Built for clarity and speed.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">Product</h4>
              <ul className="space-y-4 text-sm font-semibold text-gray-500">
                <li><a href="#" className="hover:text-blue-600">Calculators</a></li>
                <li><a href="#" className="hover:text-blue-600">Market Cap Tool</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-semibold text-gray-500">
                <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center pt-8 border-t border-gray-50">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">© 2026 GAINSLY.</p>
            <div className="flex gap-6 italic">
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Built With Love</span>
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest underline decoration-blue-500">Powering IDnity</span>
            </div>
          </div>
        </div>
      </footer>
  

      {/* JSON-LD untuk SEO (Hanya untuk Google, tidak terlihat) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Gainsly",
            "applicationCategory": "FinanceApplication",
            "description": "Kalkulator profit crypto modern dengan konversi IDR otomatis.",
          }),
        }}
      />
    </div>
  );
}