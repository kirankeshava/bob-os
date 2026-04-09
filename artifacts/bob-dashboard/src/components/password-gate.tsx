import { useState } from "react";
import { Lock, AlertTriangle } from "lucide-react";

const SESSION_KEY = "dashboard_authenticated";
const DASHBOARD_PASSWORD = import.meta.env.VITE_DASHBOARD_PASSWORD as string | undefined;

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (authenticated) {
    return <>{children}</>;
  }

  const noPasswordConfigured = !DASHBOARD_PASSWORD;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (noPasswordConfigured || input === DASHBOARD_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-sm mx-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-4">
              <Lock className="h-7 w-7 text-indigo-400" />
            </div>
            <h1 className="text-white text-2xl font-bold tracking-tight">Mission Control</h1>
            <p className="text-slate-400 text-sm mt-1">Enter your password to continue</p>
          </div>

          {noPasswordConfigured && (
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3 mb-6 text-amber-400 text-xs">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                <strong>VITE_DASHBOARD_PASSWORD</strong> is not set. Access is currently unrestricted — set this environment variable to enable the password gate.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder={noPasswordConfigured ? "No password required" : "Password"}
                disabled={noPasswordConfigured}
                autoFocus
                className={`w-full bg-slate-900 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? "border-red-500/60 focus:ring-red-500/30"
                    : "border-slate-600 focus:ring-indigo-500/40 focus:border-indigo-500/60"
                }`}
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 ml-1">Incorrect password. Please try again.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {noPasswordConfigured ? "Enter Dashboard" : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
