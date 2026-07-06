import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Lock, Mail, User, ArrowRight, ShieldAlert } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!email.trim() || !email.includes("@") || !email.endsWith("gmail.com")) {
      setError("Please enter a valid Gmail address (e.g. user@gmail.com).");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Simulated role redirection
    const lowerEmail = email.toLowerCase();
    const lowerUser = username.toLowerCase();

    if (lowerEmail.includes("admin") || lowerUser.includes("admin")) {
      navigate("/dashboard/admin");
    } else if (lowerEmail.includes("mentor") || lowerUser.includes("mentor")) {
      navigate("/dashboard/mentor");
    } else {
      navigate("/dashboard/mentee");
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-[#050510] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 glass-card p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div>
          <h2
            className="text-center text-4xl font-800 text-white uppercase tracking-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Sign In to <span className="text-primary">MSME Hub</span>
          </h2>
          <p className="mt-2 text-center text-sm text-white/50">
            Welcome back! Please enter your details.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-center gap-3 text-sm">
            <ShieldAlert size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-2">
                Email Address (Gmail)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="name@gmail.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-mono uppercase tracking-widest text-white/60">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline font-semibold"
                  onClick={() => alert("Simulation: A password reset link has been sent to your email.")}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-primary focus:ring-0"
              />
              <span>Remember Me</span>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-primary hover:opacity-90 transition-all"
            >
              Sign In <ArrowRight size={16} />
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-white/40">
          New to MSME Hub?{" "}
          <Link to="/register" className="text-primary hover:underline font-semibold">
            Create New Account
          </Link>
        </div>

        {/* Tip section to help testing */}
        <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[10px] font-mono text-white/50 leading-normal">
            💡 **Testing Tip:** For simulation, enter `admin` in Username/Email to access Admin Dashboard, `mentor` to access Mentor Dashboard, and anything else for Mentee Dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
