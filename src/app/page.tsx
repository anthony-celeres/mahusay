'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<'setup' | 'supabase' | 'oauth' | 'admin'>('setup')
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({})
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(id)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }))
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-150">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 flex flex-col gap-10">
        
        {/* Navigation & Header */}
        <header className="flex flex-col gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Project Brand */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-black dark:text-white select-none">
                ▲ mahusay
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                v0.1.0
              </span>
            </div>
            
            {/* Theme Toggle & Test Action */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <ThemeToggle />
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-black font-medium text-xs rounded-lg transition-all duration-200 shadow-sm inline-flex items-center gap-1.5"
              >
                Login
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2 mt-4">
            <h1 className="text-3xl font-extrabold text-black dark:text-white tracking-tight sm:text-4xl md:text-5xl">
              Next.js 16 + Supabase Boilerplate
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              An open-source, highly responsive template configuration. Built around cookie-based server side sessions (`@supabase/ssr`), Google OAuth authentication, and Edge Proxy session refreshes.
            </p>
          </div>
        </header>

        {/* Tab Selector */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto scrollbar-none">
          {(['setup', 'supabase', 'oauth', 'admin'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-all duration-200 capitalize whitespace-nowrap -mb-px ${
                activeTab === tab
                  ? 'border-neutral-950 dark:border-neutral-100 text-neutral-950 dark:text-white font-bold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
              }`}
            >
              {tab === 'setup' 
                ? '1. Local Quickstart' 
                : tab === 'supabase' 
                ? '2. Supabase Settings' 
                : tab === 'oauth' 
                ? '3. Google OAuth' 
                : '4. Admin & RBAC'}
            </button>
          ))}
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Instructions Column */}
          <div className="lg:col-span-2 space-y-6 min-w-0">
            
            {activeTab === 'setup' && (
              <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                  <span className="w-6.5 h-6.5 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center font-bold text-xs">1</span>
                  Setup Local Environment
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Start by initializing the repository, installing package packages, and creating your local environment storage.
                </p>

                <div className="space-y-6">
                  {/* Step 1.1 */}
                  <div className="flex gap-3.5 items-start">
                    <input
                      type="checkbox"
                      id="setup-1"
                      checked={!!completedSteps['setup-1']}
                      onChange={() => toggleStep('setup-1')}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 accent-black dark:accent-white cursor-pointer"
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <label htmlFor="setup-1" className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
                        Install node modules
                      </label>
                      <div className="relative w-full overflow-hidden">
                        <pre className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300 overflow-x-auto select-all scrollbar-thin w-full max-w-full">
                          <code>npm install</code>
                        </pre>
                        <button
                          onClick={() => handleCopy('npm install', 'setup-1-code')}
                          className="absolute right-2.5 top-2.5 text-[9px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded transition-all duration-200"
                        >
                          {copiedText === 'setup-1-code' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step 1.2 */}
                  <div className="flex gap-3.5 items-start">
                    <input
                      type="checkbox"
                      id="setup-2"
                      checked={!!completedSteps['setup-2']}
                      onChange={() => toggleStep('setup-2')}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 accent-black dark:accent-white cursor-pointer"
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <label htmlFor="setup-2" className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
                        Copy configuration template
                      </label>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                        Copy the template file to build your local workspace configurations.
                      </p>
                      <div className="relative w-full overflow-hidden">
                        <pre className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300 overflow-x-auto select-all scrollbar-thin w-full max-w-full">
                          <code>cp .env.example .env.local</code>
                        </pre>
                        <button
                          onClick={() => handleCopy('cp .env.example .env.local', 'setup-2-code')}
                          className="absolute right-2.5 top-2.5 text-[9px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded transition-all duration-200"
                        >
                          {copiedText === 'setup-2-code' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step 1.3 */}
                  <div className="flex gap-3.5 items-start">
                    <input
                      type="checkbox"
                      id="setup-3"
                      checked={!!completedSteps['setup-3']}
                      onChange={() => toggleStep('setup-3')}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 accent-black dark:accent-white cursor-pointer"
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <label htmlFor="setup-3" className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
                        Run development runtime
                      </label>
                      <div className="relative w-full overflow-hidden">
                        <pre className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300 overflow-x-auto select-all scrollbar-thin w-full max-w-full">
                          <code>npm run dev</code>
                        </pre>
                        <button
                          onClick={() => handleCopy('npm run dev', 'setup-3-code')}
                          className="absolute right-2.5 top-2.5 text-[9px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded transition-all duration-200"
                        >
                          {copiedText === 'setup-3-code' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'supabase' && (
              <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                  <span className="w-6.5 h-6.5 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center font-bold text-xs">2</span>
                  Configure Supabase Project
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Supabase acts as the secure back-end providing session storage, table structures, and client API endpoints.
                </p>

                <div className="space-y-5">
                  {/* Step 2.1 */}
                  <div className="flex gap-3.5 items-start">
                    <input
                      type="checkbox"
                      id="db-1"
                      checked={!!completedSteps['db-1']}
                      onChange={() => toggleStep('db-1')}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 accent-black dark:accent-white cursor-pointer"
                    />
                    <div className="space-y-1 flex-1">
                      <label htmlFor="db-1" className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
                        Create project in Supabase Console
                      </label>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                        Go to the <Link href="https://supabase.com/dashboard" target="_blank" className="text-neutral-900 dark:text-neutral-200 underline">Supabase Dashboard</Link> and select &quot;New Project&quot;. Define your credentials and select your database location.
                      </p>
                    </div>
                  </div>

                  {/* Step 2.2 */}
                  <div className="flex gap-3.5 items-start">
                    <input
                      type="checkbox"
                      id="db-2"
                      checked={!!completedSteps['db-2']}
                      onChange={() => toggleStep('db-2')}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 accent-black dark:accent-white cursor-pointer"
                    />
                    <div className="space-y-1 flex-1">
                      <label htmlFor="db-2" className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
                        Retrieve API Credentials
                      </label>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                        Inside your project, navigate to <strong>Settings &gt; API</strong> on the left panel. Copy the <strong>Project URL</strong> and <strong>Anon Public Key</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Step 2.3 */}
                  <div className="flex gap-3.5 items-start">
                    <input
                      type="checkbox"
                      id="db-3"
                      checked={!!completedSteps['db-3']}
                      onChange={() => toggleStep('db-3')}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 accent-black dark:accent-white cursor-pointer"
                    />
                    <div className="space-y-2 flex-1">
                      <label htmlFor="db-3" className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
                        Insert environment variables
                      </label>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                        Paste the values inside the local <code className="font-mono text-neutral-800 dark:text-neutral-350">.env.local</code> configuration file:
                      </p>
                      <div className="relative w-full overflow-hidden">
                        <pre className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300 overflow-x-auto select-all scrollbar-thin w-full max-w-full">
                          <code>{`NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_copied_anon_key`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'oauth' && (
              <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                  <span className="w-6.5 h-6.5 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center font-bold text-xs">3</span>
                  Configure Google OAuth Integration
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Google sign-in requires linking credentials between Google Cloud Developer platform and Supabase Console.
                </p>

                <div className="space-y-5">
                  {/* Step 3.1 */}
                  <div className="flex gap-3.5 items-start">
                    <input
                      type="checkbox"
                      id="oa-1"
                      checked={!!completedSteps['oa-1']}
                      onChange={() => toggleStep('oa-1')}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 accent-black dark:accent-white cursor-pointer"
                    />
                    <div className="space-y-1 flex-1">
                      <label htmlFor="oa-1" className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
                        Create project in Google Cloud Portal
                      </label>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-normal font-medium">
                        Head to <Link href="https://console.cloud.google.com" target="_blank" className="text-neutral-900 dark:text-neutral-200 underline">Google Cloud Console</Link>. Establish a project, setup an <strong>OAuth consent screen</strong>, select user scopes, and click generate client credentials.
                      </p>
                    </div>
                  </div>

                  {/* Step 3.2 */}
                  <div className="flex gap-3.5 items-start">
                    <input
                      type="checkbox"
                      id="oa-2"
                      checked={!!completedSteps['oa-2']}
                      onChange={() => toggleStep('oa-2')}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 accent-black dark:accent-white cursor-pointer"
                    />
                    <div className="space-y-2 flex-1 min-w-0">
                      <label htmlFor="oa-2" className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
                        Register Redirect URI in Google Web client
                      </label>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                        Under Authorized Redirect URIs, specify the callback handler registered for your Supabase backend:
                      </p>
                      <div className="relative w-full overflow-hidden">
                        <pre className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300 overflow-x-auto select-all scrollbar-thin w-full max-w-full">
                          <code>https://&lt;your-ref-id&gt;.supabase.co/auth/v1/callback</code>
                        </pre>
                        <button
                          onClick={() => handleCopy('https://<your-ref-id>.supabase.co/auth/v1/callback', 'oa-2-code')}
                          className="absolute right-2.5 top-2.5 text-[9px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded transition-all duration-200"
                        >
                          {copiedText === 'oa-2-code' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step 3.3 */}
                  <div className="flex gap-3.5 items-start">
                    <input
                      type="checkbox"
                      id="oa-3"
                      checked={!!completedSteps['oa-3']}
                      onChange={() => toggleStep('oa-3')}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 accent-black dark:accent-white cursor-pointer"
                    />
                    <div className="space-y-1 flex-1">
                      <label htmlFor="oa-3" className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
                        Activate Google Provider in Supabase
                      </label>
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                        Navigate to <strong>Authentication &gt; Providers &gt; Google</strong>. Turn on the provider, insert the <strong>Client ID</strong> and <strong>Client Secret</strong> retrieved from Google, and hit Save.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                  <span className="w-6.5 h-6.5 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center font-bold text-xs">4</span>
                  Creating Admin Profiles & Access
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  To access the protected admin panel at <code className="font-mono bg-neutral-100 dark:bg-neutral-900 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-350">/dashboard/admin</code>, a user must have the <code className="font-mono bg-neutral-100 dark:bg-neutral-900 px-1 py-0.5 rounded text-neutral-800 dark:text-neutral-350">role: &apos;admin&apos;</code> claim inside their Supabase metadata. You can configure this using one of three workflows:
                </p>

                <div className="space-y-6 pt-2">
                  {/* Option 1: Testing Widget */}
                  <div className="space-y-2">
                    <strong className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 block">
                      Workflow A: Using the Local Testing Widget (Fastest)
                    </strong>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      For rapid local testing, first register a standard credentials account or login with Google. Once redirected to your main workspace dashboard, click the <strong>&quot;Promote Role to &apos;admin&apos;&quot;</strong> button. This executes a secure Server Action that triggers `supabase.auth.updateUser()` and instantly sets your claims role to &apos;admin&apos;.
                    </p>
                  </div>

                  {/* Option 2: SQL Editor */}
                  <div className="space-y-2">
                    <strong className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 block">
                      Workflow B: Updating via Supabase SQL Editor (Production Style)
                    </strong>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      To promote a user to admin manually, copy this command, go to your <strong>Supabase Dashboard &gt; SQL Editor</strong>, paste it, replace the email with your user&apos;s email, and click Run:
                    </p>
                    <div className="relative w-full overflow-hidden">
                      <pre className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-lg p-3 sm:p-4 font-mono text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300 overflow-x-auto select-all scrollbar-thin w-full max-w-full">
                        <code>{`update auth.users
set raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
where email = 'your-user-email@example.com';`}</code>
                      </pre>
                      <button
                        onClick={() => handleCopy(`update auth.users\nset raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb\nwhere email = 'your-user-email@example.com';`, 'admin-sql-code')}
                        className="absolute right-2.5 top-2.5 text-[9px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded transition-all duration-200"
                      >
                        {copiedText === 'admin-sql-code' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Option 3: Auth Dashboard */}
                  <div className="space-y-2">
                    <strong className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 block">
                      Workflow C: Editing Raw User Metadata in Supabase Console
                    </strong>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Go to the <strong>Authentication &gt; Users</strong> table in the Supabase Dashboard. Select your target user account, click the dropdown menu, choose <strong>Edit User Metadata</strong>, and add key: <code className="font-mono text-neutral-800 dark:text-neutral-350">&quot;role&quot;</code> and value: <code className="font-mono text-neutral-800 dark:text-neutral-350">&quot;admin&quot;</code> in the JSON editor.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Details Column */}
          <div className="space-y-6 min-w-0">
            
            {/* Tech Specs */}
            <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-950 dark:text-white mb-4 tracking-tight">
                Architecture Blueprint
              </h3>
              
              <ul className="space-y-4 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex gap-3">
                  <span className="text-neutral-900 dark:text-neutral-200 font-semibold select-none">▲</span>
                  <div>
                    <strong className="text-neutral-900 dark:text-neutral-200 font-bold block mb-0.5">Next.js 16 App Router</strong>
                    RSC, server-side data fetching, secure routes and React 19 compliance.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-neutral-900 dark:text-neutral-200 font-semibold select-none">⚡</span>
                  <div>
                    <strong className="text-neutral-900 dark:text-neutral-200 font-bold block mb-0.5">@supabase/ssr</strong>
                    Cookie sync across clients, protecting against out-of-sync session states.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-neutral-900 dark:text-neutral-200 font-semibold select-none">⇿</span>
                  <div>
                    <strong className="text-neutral-900 dark:text-neutral-200 font-bold block mb-0.5">Proxy Layer (proxy.ts)</strong>
                    Dynamic session cookie updates and route blocking at request-level boundary.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-neutral-900 dark:text-neutral-200 font-semibold select-none">◐</span>
                  <div>
                    <strong className="text-neutral-900 dark:text-neutral-200 font-bold block mb-0.5">Adaptive Theme</strong>
                    Fully responsive layout styled in native Next.js black & white design with dark/light themes.
                  </div>
                </li>
              </ul>
            </div>

            {/* Tree */}
            <div className="bg-white dark:bg-[#0d0d0d] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-950 dark:text-white mb-3 tracking-tight">
                Folder Structure
              </h3>
              <pre className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed overflow-x-auto select-all scrollbar-thin">
{`mahusay/
├── .env.example          # Template configs
├── .env.local            # Secret local env (gitignored)
├── next.config.ts        # Next.js configurations
├── package.json          # Dependency mappings
├── tsconfig.json         # TypeScript configuration
├── src/
│   ├── proxy.ts          # Edge Request Interceptor
│   ├── app/
│   │   ├── page.tsx      # Developer Setup Guide
│   │   ├── layout.tsx    # Root layout with ThemeProvider
│   │   ├── globals.css   # Tailwind v4 custom styles
│   │   ├── dashboard/
│   │   │   ├── page.tsx  # Workspace (claims toggler widget)
│   │   │   └── admin/
│   │   │       └── page.tsx # Admin Panel & RLS logs
│   │   └── auth/
│   │       ├── actions.ts# Auth Server Actions
│   │       ├── callback/ # PKCE callback route
│   │       ├── signup/   # Credentials Sign-up View
│   │       └── login/    # Credentials Login View
│   ├── components/       
│   │   ├── theme-provider.tsx # Themes context provider
│   │   ├── theme-toggle.tsx   # Light/dark/system toggle
│   │   ├── submit-btn.tsx     # React 19 Submit helper
│   │   ├── login-btn.tsx      # Google SSO button
│   │   └── logout-btn.tsx     # Sign-out control button
│   └── utils/
│       └── supabase/
│           ├── client.ts # Supabase browser utility
│           └── server.ts # Supabase server utility`}
              </pre>
            </div>
            
          </div>
          
        </div>

      </div>
    </div>
  )
}
