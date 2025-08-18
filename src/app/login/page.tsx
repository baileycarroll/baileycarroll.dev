"use client";

import { useState, useEffect } from "react";
import { signIn } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import FloatingElements from "@/components/background/FloatingElements";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // Check for success message in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    if (success) {
      setSuccessMessage('Account created successfully! Please sign in.');
      // Clear the message from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn.email({
        email,
        password,
        callbackURL: "/admin/dashboard",
      }, {
        onSuccess: () => {
          window.location.href = "/admin/dashboard";
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Invalid email or password");
        },
      });
    } catch (error) {
      console.error("Signin error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4" style={{ maxWidth: 'none' }}>
      {/* Background with floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElements />
      </div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-neutral-900/80 backdrop-blur-xl border border-primary/20 rounded-xl shadow-2xl p-8 relative z-10"
        style={{ maxWidth: '32rem', minWidth: '24rem' }}
      >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <Heading Level={1} className="text-2xl font-bold mb-2 text-white">
              Admin Sign In
            </Heading>
            <Paragraph className="text-neutral-400">
              Sign in to access the admin portal
            </Paragraph>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-200 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-neutral-200 placeholder-neutral-400 transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-200 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-neutral-200 placeholder-neutral-400 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {successMessage && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Paragraph className="text-green-400 text-sm">{successMessage}</Paragraph>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <Paragraph className="text-red-400 text-sm">{error}</Paragraph>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Paragraph className="text-xs text-neutral-500">
              This is a private admin portal. Registration is disabled.
            </Paragraph>
          </div>
        </motion.div>
    </div>
  );
}
