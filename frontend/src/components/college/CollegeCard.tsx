"use client"; // Add this at the very top!
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from 'next/link';
import { useCompareStore, College } from '@/store/useCompareStore';

export default function CollegeCard(props: College) {
  // Pull our global state and toggle function
  const selectedColleges = useCompareStore((state) => state.selectedColleges);
  const toggleCollege = useCompareStore((state) => state.toggleCollege);
  const { token } = useAuthStore(); // import from '@/store/useAuthStore'
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!token) return alert("Please sign in to save colleges.");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/colleges/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ collegeId: props.id }),
    });
    const data = await res.json();
    setSaved(data.saved);
  };
  // Check if this specific card is currently selected
  const isSelected = selectedColleges.some((c) => c.id === props.id);

  return (
    <article className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow duration-300 mb-lg">
      <div className="w-full md:w-1/3 h-[200px] md:h-auto relative bg-surface-container-highest">
        <img alt={`${props.name} Campus`} className="w-full h-full object-cover" src={props.imageUrl} />
        <div className="absolute top-sm left-sm flex flex-col gap-xs">
          <span className="bg-surface-container-lowest text-secondary font-label-sm text-label-sm px-sm py-xs rounded shadow-sm flex items-center gap-xs">
            ★ {props.rating}
          </span>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-lg flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-sm mb-sm">
            <div>
              <h3 className="font-h3 text-h3 text-primary mb-xs">{props.name}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs">
                📍 {props.location}
              </p>
            </div>
            {props.accreditation && (
              <span className="bg-surface-variant text-primary font-label-sm text-label-sm px-sm py-xs rounded hidden md:inline-block whitespace-nowrap">
                {props.accreditation}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-md border-t border-b border-outline-variant py-md my-md">
            <div>
              <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Total Fees</span>
              <span className="block font-data-tabular text-data-tabular text-on-surface font-semibold">{props.totalFees}</span>
            </div>
            <div>
              <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Avg. Package</span>
              <span className="block font-data-tabular text-data-tabular text-secondary font-semibold">{props.avgPackage}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-md mt-sm">
          <Link href={`/colleges/${props.id}`} className="flex-1 bg-secondary text-on-secondary py-sm rounded font-label-md text-label-md hover:opacity-90 transition-opacity text-center h-[44px] flex items-center justify-center">
            View Details
          </Link>
          
          {/* THE MAGIC BUTTON */}
          <button 
            onClick={() => toggleCollege(props)}
            className={`flex items-center justify-center gap-xs px-md py-sm border rounded font-label-md text-label-md transition-colors h-[44px] ${
              isSelected 
                ? "bg-primary text-on-primary border-primary" 
                : "border-outline-variant text-primary hover:bg-surface-container-low"
            }`}
          >
            <span className="hidden md:inline">{isSelected ? "Added to Compare" : "Compare"}</span>
          </button>
          
          <button onClick={handleSave}
            className={`flex items-center justify-center gap-xs px-md py-sm border rounded font-label-md text-label-md h-[44px] transition-colors ${
              saved ? "bg-primary text-on-primary border-primary" : "border-outline-variant text-primary hover:bg-surface-container-low"
            }`}>
            <span className="hidden md:inline">{saved ? "Saved ✓" : "Save"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}