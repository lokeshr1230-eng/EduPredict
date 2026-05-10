"use client";

import { useEffect, useState } from "react";
import { useCompareStore, College } from "@/store/useCompareStore";
import Link from "next/link";

interface CollegeDetail {
  id: string;
  name: string;
  location: string;
  imageUrl: string | null;
  accreditation: string | null;
  overallRating: number | null;
  averagePackage: string | null;
  placementRate: number | null;
  courses: { totalFee: string }[];
}

export default function ComparePage() {
  const { selectedColleges, toggleCollege } = useCompareStore();
  const [hydratedColleges, setHydratedColleges] = useState<CollegeDetail[]>([]);

  useEffect(() => {
    async function hydrateData() {
      const promises = selectedColleges.map(async (c) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/colleges/${c.id}`);
        return response.json();
      });
      const results = await Promise.all(promises);
      setHydratedColleges(results);
    }
    hydrateData();
  }, [selectedColleges]);

  if (selectedColleges.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-gutter py-xl text-center flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="font-h1 text-h1 text-primary mb-md">Nothing to Compare Yet!</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
          Head back to the colleges page and select up to 3 institutions to compare side-by-side.
        </p>
        <Link href="/" className="bg-secondary text-on-secondary px-lg py-sm rounded font-label-md text-label-md hover:opacity-90">
          Browse Colleges
        </Link>
      </div>
    );
  }

  if (hydratedColleges.length === 0) {
    return <div className="flex justify-center py-xl">Loading comparison data...</div>;
  }

  return (
    <main className="flex-grow max-w-[1280px] mx-auto px-gutter py-xl w-full">
      <div className="mb-lg flex flex-col md:flex-row md:items-center justify-between gap-md">
        <div>
          <h1 className="font-h1 text-h1 text-primary mb-xs">Compare Colleges</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
            Analyze institutions side-by-side to make an informed decision for your academic future.
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="bg-surface">
              <tr>
                <th className="w-1/4 p-md border-b border-outline-variant align-bottom">
                  <div className="font-label-md text-label-md text-on-surface-variant mb-sm">Comparison Criteria</div>
                </th>
                {hydratedColleges.map((college, idx) => (
                  <th key={college?.id || idx} className="w-1/4 p-md border-b border-outline-variant border-l align-top relative group">
                    <button
                      onClick={() => toggleCollege(selectedColleges[idx])}
                      className="absolute top-sm right-sm text-outline hover:text-error transition-colors"
                      title="Remove from comparison"
                    >
                      ✕
                    </button>
                    <div className="h-32 bg-surface-variant rounded-lg mb-md overflow-hidden relative">
                      <img alt={college.name} className="w-full h-full object-cover" src={college.imageUrl ?? ""} />
                    </div>
                    <h3 className="font-h3 text-[18px] leading-tight text-primary mb-xs">{college.name}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">📍 {college.location}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-data-tabular text-data-tabular text-on-surface">
              {[
                { label: "Average Package", render: (c: CollegeDetail) => <span className="font-semibold text-secondary">{c.averagePackage || "N/A"}</span> },
                { label: "Overall Rating", render: (c: CollegeDetail) => <span className="font-bold text-primary">★ {c.overallRating || "N/A"}</span> },
                { label: "Accreditation", render: (c: CollegeDetail) => <span className="text-on-surface-variant">{c.accreditation || "N/A"}</span> },
                { label: "Placement Rate", render: (c: CollegeDetail) => <span className="font-semibold text-primary">{c.placementRate ? `${c.placementRate}%` : "N/A"}</span> },
                { label: "Total Fees", render: (c: CollegeDetail) => <span className="font-semibold text-on-surface">{c.courses?.[0]?.totalFee || "N/A"}</span> },
              ].map(({ label, render }, i) => (
                <tr key={label} className={`border-b border-outline-variant hover:bg-surface-container-low transition-colors ${i % 2 !== 0 ? "bg-surface-bright" : ""}`}>
                  <td className="p-md font-label-md text-label-md text-on-surface-variant">{label}</td>
                  {hydratedColleges.map((college, idx) => (
                    <td key={college?.id || idx} className="p-md border-l border-outline-variant">{render(college)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}