"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Heading from "@/components/typography/Headings";
import Paragraph from "@/components/typography/Paragraphs";
import FloatingElements from "@/components/background/FloatingElements";

export default function Setup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [setupAllowed, setSetupAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if setup is allowed
    const checkSetup = async () => {
      try {
        const response = await fetch('/api/setup/check');
        const data = await response.json();
        
        if (data.allowed) {
          setSetupAllowed(true);
        } else {
          // Redirect to sign-in if setup is not allowed
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('Failed to check setup status:', error);
        router.push('/auth/signin');
      } finally {
        setChecking(false);
      }
    };

    checkSetup();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/setup/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to sign-in page
        router.push('/login?success=true');
      } else {
        setError(data.error || 'Failed to create admin account');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <Paragraph className="text-neutral-400">Checking setup status...</Paragraph>
        </div>
      </div>
    );
  }

  if (!setupAllowed) {
    return null; // Will redirect to sign-in
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
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
            Initial Setup
          </Heading>
          <Paragraph className="text-neutral-400">
            Create your admin account
          </Paragraph>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-200 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-neutral-200 placeholder-neutral-400 transition-colors"
              placeholder="Bailey Carroll"
              required
            />
          </div>

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
              placeholder="admin@baileycarroll.dev"
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
              placeholder="Enter a strong password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-200 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-neutral-200 placeholder-neutral-400 transition-colors"
              placeholder="Confirm your password"
              required
            />
          </div>

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
            {loading ? "Creating Account..." : "Create Admin Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Paragraph className="text-xs text-neutral-500">
            This setup page is only available for initial admin creation.
          </Paragraph>
        </div>
      </motion.div>
    </div>
  );
}
