"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/useSearchStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useEffect } from "react";


export default function TopNavBar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  return (
    <header className="bg-surface dark:bg-surface w-full z-50 sticky top-0 border-b border-outline-variant dark:border-outline shadow-sm">
      <div className="max-w-[1280px] mx-auto px-gutter w-full flex justify-between items-center h-16 gap-lg">

        {/* Brand */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="font-h3 text-h3 font-bold text-primary dark:text-primary-fixed-dim">
            EduPredict
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search colleges"
            className="w-[280px] px-md py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant transition-colors"
          />
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-lg h-full flex-shrink-0">
          <Link
            href="/"
            className={`h-full flex items-center font-label-md text-label-md transition-colors duration-200 ${
              pathname === '/'
                ? "text-primary dark:text-primary-fixed-dim border-b-2 border-secondary dark:border-secondary-fixed-dim pb-1"
                : "text-on-surface-variant hover:text-secondary"
            }`}
          >
            Colleges
          </Link>
          <Link
            href="/compare"
            className={`h-full flex items-center font-label-md text-label-md transition-colors duration-200 ${
              pathname === '/compare'
                ? "text-primary dark:text-primary-fixed-dim border-b-2 border-secondary dark:border-secondary-fixed-dim pb-1"
                : "text-on-surface-variant hover:text-secondary"
            }`}
          >
            Compare
          </Link>
          <Link
            href="/community"
            className={`h-full flex items-center font-label-md text-label-md transition-colors duration-200 ${
              pathname === '/community'
                ? "text-primary dark:text-primary-fixed-dim border-b-2 border-secondary dark:border-secondary-fixed-dim pb-1"
                : "text-on-surface-variant hover:text-secondary"
            }`}
          >
            Community Q&A
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-sm flex-shrink-0">
          {mounted && user ? (
            <>
              <Link href="/saved"
                className="hidden md:flex items-center px-md py-sm rounded border border-outline-variant text-on-surface hover:bg-surface-container-low font-label-md text-label-md h-[44px]">
                Saved
              </Link>
              <button onClick={() => { logout(); router.push('/'); }}
                className="hidden md:flex items-center px-md py-sm rounded border border-primary text-primary hover:bg-surface-container-low font-label-md text-label-md h-[44px]">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth"
              className="hidden md:flex items-center justify-center px-md py-sm rounded border border-primary text-primary hover:bg-surface-container-low transition-colors font-label-md text-label-md h-[44px]">
              Sign In
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}