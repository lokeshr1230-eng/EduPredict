"use client";

import { useState, useEffect } from "react";
import FilterSidebar from "@/components/college/FilterSidebar";
import CollegeCard from "@/components/college/CollegeCard";
import { useSearchStore } from "@/store/useSearchStore";

interface CoursePreview {
  totalFee: string;
}

interface CollegeListing {
  id: string;
  name: string;
  location: string;
  overallRating: number | null;
  averagePackage: string | null;
  accreditation: string | null;
  imageUrl: string | null;
  courses: CoursePreview[];
}

interface Filters {
  location: string;
  minRating: number;
}

export default function Home() {
  const [colleges, setColleges] = useState<CollegeListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ location: "", minRating: 0, course: "" });

  const searchQuery = useSearchStore((state) => state.searchQuery);
  const hasActiveSearch = searchQuery.trim() !== "" || filters.location !== "";
  const handleCourseChange = (val: string) => setFilters((prev) => ({ ...prev, course: val }));


  useEffect(() => {
    async function fetchColleges() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        if (filters.location) params.set("location", filters.location);
        if (filters.minRating) params.set("minRating", String(filters.minRating));
        if (filters.course) params.set("course", filters.course);


        const response = await fetch(`http://localhost:5000/api/colleges?${params.toString()}`);
        const data: CollegeListing[] = await response.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, [searchQuery, filters]);

  const handleLocationChange = (val: string) => {
    setFilters((prev) => ({ ...prev, location: val }));
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full px-gutter py-xl flex flex-col md:flex-row gap-xl">
      <FilterSidebar filters={filters} onLocationChange={handleLocationChange} onCourseChange={handleCourseChange} />

      <section className="w-full md:w-9/12 flex flex-col gap-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-md">
          <div>
            <h1 className="font-h2 text-h2 text-primary mb-xs">
              {loading
                ? "Loading colleges..."
                : hasActiveSearch
                ? `Found ${colleges.length} College${colleges.length !== 1 ? "s" : ""}`
                : `All Colleges (${colleges.length})`}
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {hasActiveSearch
                ? `Results for "${searchQuery || filters.location}"`
                : "Browse all available colleges"}
            </p>
          </div>
          <select className="border border-outline-variant rounded bg-surface-container-lowest text-on-surface py-sm px-sm outline-none cursor-pointer">
            <option>Highest Rating</option>
            <option>Lowest Fees</option>
          </select>
        </div>

        <div className="flex flex-col gap-lg">
          {loading ? (
            <div className="flex justify-center py-xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : colleges.length > 0 ? (
            colleges.map((college: CollegeListing) => (
              <CollegeCard
                key={college.id}
                id={college.id}
                name={college.name}
                location={college.location}
                rating={college.overallRating ?? 0}
                totalFees={college.courses[0]?.totalFee ?? "N/A"}
                avgPackage={college.averagePackage ?? "N/A"}
                accreditation={college.accreditation ?? undefined}
                imageUrl={college.imageUrl ?? ""}
              />
            ))
          ) : (
            <div className="text-center py-xl bg-surface-container-low rounded-xl border border-dashed border-outline-variant">
              <p className="font-body-md text-on-surface-variant">
                {hasActiveSearch
                  ? `No colleges found matching "${searchQuery || filters.location}".`
                  : "No colleges available."}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}