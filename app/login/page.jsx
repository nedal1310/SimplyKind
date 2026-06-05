"use client"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/');
  }, [session]);

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(209,191,176,0.15) 0%, rgba(72,107,127,0.1) 100%)"
      }}>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="relative rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
          style={{ background: "rgba(255,255,255,0.92)" }}>

          {/* Top Accent Bar */}
          <div className="h-1 w-full bg-linear-to-r from-accent via-primary to-secondary" />

          <div className="px-8 py-8">
            {/* Logo Section */}
            {/* Logo Section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Image
                  src="/favicon.ico"
                  alt="logo"
                  width={48}
                  height={48}
                  className="rounded-full shadow-lg"
                />
              </div>

              <h1 className="text-3xl font-bold tracking-tight mb-2"
                style={{ color: "var(--color-primary)" }}>
                SimplyKind
              </h1>
              <p className="text-sm font-medium"
                style={{ color: "var(--color-secondary)", opacity: 0.9 }}>
                Sign in to continue making an impact
              </p>
            </div>

            {/* Auth Buttons */}
            <div className="space-y-3">
              {/* Google Sign In */}
              <button
                onClick={() => signIn("google")}
                className="group w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg active:scale-[0.98] relative overflow-hidden hover:cursor-pointer"
                style={{
                  background: "white",
                  color: "var(--color-textcolor)",
                  border: "1px solid rgba(72,107,127,0.15)",
                }}>
                <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg className="w-5 h-5 shrink-0 relative z-10" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="relative z-10 font-semibold">Continue with Google</span>
              </button>

              {/* GitHub Sign In */}
              <button
                onClick={() => signIn("github")}
                className="group w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm text-white transition-all duration-300 hover:shadow-lg active:scale-[0.98] relative overflow-hidden hover:cursor-pointer"
                style={{ background: "var(--color-primary)" }}>
                <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg className="w-5 h-5 shrink-0 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="relative z-10 font-semibold">Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-8">
              <div className="flex-1 h-px" style={{ background: "var(--color-textcolor)", opacity: 0.15 }} />
              <span className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--color-textcolor)", opacity: 0.5 }}>
                Secure Access
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--color-textcolor)", opacity: 0.15 }} />
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "var(--color-secondary)", opacity: 0.5 }}>
                  <svg className="w-3.5 h-3.5" style={{ color: "var(--color-primary)" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <span className="text-xs font-medium"
                  style={{ color: "var(--color-textcolor)", opacity: 1 }}>
                  No password needed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "var(--color-secondary)", opacity: 0.5 }}>
                  <svg className="w-3.5 h-3.5" style={{ color: "var(--color-primary)" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25-2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <span className="text-xs font-medium"
                  style={{ color: "var(--color-textcolor)", opacity: 1 }}>
                  SSL encrypted
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}