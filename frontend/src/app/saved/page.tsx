"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function SavedPage() {
  const { token } = useAuthStore();
  interface SavedEntry { college: { id: string; name: string; location: string } }

  const [savedColleges, setSavedColleges] = useState<SavedEntry[]>([]);
  useEffect(() => {
    if (!token) return;
    fetch(`${API}/auth/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => setSavedColleges(data.savedColleges || []));
  }, [token]);

  if (!token) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-md">
      <p className="font-body-lg text-on-surface-variant">Please sign in to view saved colleges.</p>
      <Link href="/auth" className="bg-secondary text-on-secondary px-lg py-sm rounded font-label-md hover:opacity-90">Sign In</Link>
    </div>
  );

  return (
    <main className="max-w-[800px] mx-auto px-gutter py-xl">
      <h1 className="font-h1 text-h1 text-primary mb-xl">Saved Colleges</h1>
      {savedColleges.length === 0 ? (
        <p className="text-on-surface-variant font-body-md text-center py-xl">No saved colleges yet.</p>
      ) : (
        <div className="flex flex-col gap-md">
          {savedColleges.map(({ college }) => (
            <div key={college.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex justify-between items-center">
              <div>
                <h3 className="font-h3 text-h3 text-primary">{college.name}</h3>
                <p className="font-body-sm text-on-surface-variant">📍 {college.location}</p>
              </div>
              <Link href={`/colleges/${college.id}`}
                className="bg-secondary text-on-secondary px-md py-sm rounded font-label-md text-label-md hover:opacity-90">
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}