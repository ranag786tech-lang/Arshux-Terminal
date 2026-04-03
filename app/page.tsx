"use client";
import { useState } from "react";
import Terminal from "@/components/Terminal"; // Aapka existing terminal component

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Aapka Secret Password
  const SECRET_KEY = "arshux786"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_KEY) {
      setIsAuthenticated(true);
    } else {
      setError("❌ ACCESS DENIED: INVALID SYSTEM KEY");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-black font-mono text-green-500 p-4">
        <div className="border-2 border-red-600 p-8 rounded-lg bg-red-950/10 shadow-[0_0_20px_rgba(220,38,38,0.5)] max-w-sm w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4 animate-pulse">⚠️ SYSTEM RESTRICTED</h1>
          <p className="mb-6 text-sm text-gray-400">Arshux Terminal requires authorization to initialize kernel environment.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="ENTER SECRET KEY..."
              className="w-full bg-black border-b-2 border-red-600 p-2 outline-none focus:border-green-500 transition-colors text-center uppercase tracking-widest"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button 
              type="submit" 
              className="w-full bg-red-600 text-black font-bold py-2 hover:bg-green-500 transition-all active:scale-95"
            >
              INITIALIZE_BOOT_SEQUENCE
            </button>
          </form>
          {error && <p className="mt-4 text-xs text-red-500 text-center animate-bounce">{error}</p>}
        </div>
        <p className="mt-10 text-[10px] text-gray-700">© 2026 ARSHUX SECURE LAYER v1.0.0</p>
      </div>
    );
  }

  // Agar password sahi hai toh terminal load hoga
  return <Terminal />;
}

