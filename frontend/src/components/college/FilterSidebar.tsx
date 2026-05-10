"use client";
import React from "react";

const COURSES = [
  "B.Tech Computer Science",
  "B.Tech Electronics",
  "B.Tech Mechanical",
  "B.Tech Civil",
  "B.Tech AI & ML",
  "B.Tech Data Science",
  "MBA",
  "MCA",
  "M.Tech",
  "B.Sc Data Science",
  "B.Sc Physics",
  "BCA",
];

interface FilterSidebarProps {
  filters: { location: string; minRating: number; course: string };
  onLocationChange: (val: string) => void;
  onCourseChange: (val: string) => void;
}

export default function FilterSidebar({ filters, onLocationChange, onCourseChange }: FilterSidebarProps) {
  return (
    <aside className="w-full md:w-3/12 flex flex-col gap-lg flex-shrink-0">
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-md shadow-sm">
        <div className="flex items-center justify-between border-b border-outline-variant pb-md mb-md">
          <h2 className="font-h3 text-h3 text-primary">Filters</h2>
          <button onClick={() => { onLocationChange(""); onCourseChange(""); }}
            className="text-on-surface-variant font-label-sm text-label-sm hover:text-primary transition-colors">
            Clear All
          </button>
        </div>

        {/* Location */}
        <div className="mb-lg border-b border-outline-variant pb-md">
          <h3 className="font-label-md text-label-md text-primary mb-sm">Location</h3>
          <input type="text" value={filters.location} onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Search cities..."
            className="w-full px-sm py-sm border border-outline-variant rounded bg-surface focus:border-primary outline-none text-body-sm mb-sm" />
          <div className="flex flex-col gap-sm">
            {["Bangalore", "Mumbai", "Delhi NCR", "Chennai"].map((city) => (
              <label key={city} className="flex items-center gap-sm cursor-pointer group">
                <input type="checkbox" checked={filters.location === city}
                  onChange={() => onLocationChange(filters.location === city ? "" : city)}
                  className="rounded border-outline-variant h-4 w-4" />
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-primary">{city}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="mb-lg">
          <h3 className="font-label-md text-label-md text-primary mb-sm">Courses</h3>
          <div className="relative">
            <div className="flex flex-col gap-sm max-h-64 overflow-y-auto">
              {COURSES.map((course) => (
                <label key={course} className="flex items-center gap-sm cursor-pointer group">
                  <input type="checkbox" checked={filters.course === course}
                    onChange={() => onCourseChange(filters.course === course ? "" : course)}
                    className="rounded border-outline-variant h-4 w-4" />
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-primary">{course}</span>
                </label>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </aside>
  );
}