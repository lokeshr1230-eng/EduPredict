"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

interface Course {
  id: string;
  courseName: string;
  duration: string;
  totalFee: string;
  eligibility: string;
}

interface ReviewUser {
  name: string;
  avatarUrl: string | null;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: ReviewUser;
}

interface CollegeDetail {
  id: string;
  name: string;
  location: string;
  accreditation: string | null;
  campusSize: string | null;
  totalFaculty: string | null;
  totalStudents: string | null;
  highestPackage: string | null;
  averagePackage: string | null;
  placementRate: number | null;
  overallRating: number | null;
  logoUrl: string | null;
  imageUrl: string | null;
  courses: Course[];
  reviews: Review[];
}

export default function CollegeDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const [college, setCollege] = useState<CollegeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollege() {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/colleges/${params.id}`);
        if (!response.ok) throw new Error("College not found");
        const data: CollegeDetail = await response.json();
        setCollege(data);
      } catch (error) {
        console.error("Error fetching college details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollege();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-md">
        <h1 className="font-h2 text-h2 text-primary">College Not Found</h1>
        <Link href="/" className="text-secondary hover:underline">Return to Search</Link>
      </div>
    );
  }

  return (
    <main className="flex-1 w-full max-w-[1280px] mx-auto px-gutter py-xl">
      <section className="relative rounded-xl overflow-hidden mb-xl bg-surface-container-lowest border border-outline-variant shadow-sm">
        <div className="h-64 md:h-80 w-full bg-surface-container-high relative">
          <img
            alt={`${college.name} campus view`}
            className="w-full h-full object-cover"
            src={college.imageUrl || "https://via.placeholder.com/1280x800?text=College+Campus"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 px-lg pb-lg">
            <div className="flex flex-wrap items-center gap-sm mb-sm">
              {college.accreditation && (
                <span className="bg-secondary px-sm py-xs rounded font-label-sm text-label-sm text-on-secondary">
                  {college.accreditation}
                </span>
              )}
              <span className="bg-white/20 px-sm py-xs rounded border border-white/30 font-label-sm text-label-sm flex items-center gap-xs text-white">
                ★ {college.overallRating ?? "N/A"} / 5
              </span>
            </div>
            <h1 className="font-h1 text-h1 mb-xs text-white">{college.name}</h1>
            <p className="font-body-lg text-body-lg text-white/90 flex items-center gap-xs">📍 {college.location}</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-lg">
        <div className="flex-1 flex flex-col gap-xl">
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm">
            <h2 className="font-h2 text-h2 text-primary mb-md pb-sm border-b border-outline-variant">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              {[
                { label: "Campus Size", value: college.campusSize },
                { label: "Total Faculty", value: college.totalFaculty },
                { label: "Total Students", value: college.totalStudents },
                { label: "Average Fee", value: college.courses[0]?.totalFee },
              ].map(({ label, value }) => (
                <div key={label} className="bg-surface-container-low p-md rounded-lg border border-outline-variant">
                  <div className="text-on-surface-variant font-label-sm text-label-sm mb-xs">{label}</div>
                  <div className="font-h3 text-h3 text-primary">{value ?? "N/A"}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm">
            <h2 className="font-h2 text-h2 text-primary mb-md pb-sm border-b border-outline-variant">Placements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-lg">
              <div className="bg-primary text-on-primary p-md rounded-lg flex flex-col justify-center">
                <div className="font-label-sm text-label-sm opacity-80 mb-xs uppercase tracking-wide">Highest Package</div>
                <div className="font-h2 text-h2 font-bold">{college.highestPackage ?? "N/A"}</div>
              </div>
              <div className="bg-surface-container-high border border-outline-variant p-md rounded-lg flex flex-col justify-center">
                <div className="text-on-surface-variant font-label-sm text-label-sm mb-xs uppercase tracking-wide">Average Package</div>
                <div className="font-h2 text-h2 text-primary">{college.averagePackage ?? "N/A"}</div>
              </div>
              <div className="bg-surface-container-high border border-outline-variant p-md rounded-lg flex flex-col justify-center">
                <div className="text-on-surface-variant font-label-sm text-label-sm mb-xs uppercase tracking-wide">Placement Rate</div>
                <div className="font-h2 text-h2 text-primary">{college.placementRate != null ? `${college.placementRate}%` : "N/A"}</div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm">
            <h2 className="font-h2 text-h2 text-primary mb-md pb-sm border-b border-outline-variant">Courses & Eligibility</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-primary font-label-md text-label-md">
                    <th className="p-md border border-outline-variant">Course Name</th>
                    <th className="p-md border border-outline-variant">Duration</th>
                    <th className="p-md border border-outline-variant">Fees</th>
                    <th className="p-md border border-outline-variant">Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  {college.courses.map((course) => (
                    <tr key={course.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-md border border-outline-variant font-body-md text-on-surface">{course.courseName}</td>
                      <td className="p-md border border-outline-variant font-body-sm text-on-surface-variant">{course.duration}</td>
                      <td className="p-md border border-outline-variant font-data-tabular text-on-surface font-semibold">{course.totalFee}</td>
                      <td className="p-md border border-outline-variant font-body-sm text-on-surface-variant">{course.eligibility}</td>
                    </tr>
                  ))}
                  {college.courses.length === 0 && (
                    <tr><td colSpan={4} className="p-md text-center text-on-surface-variant font-body-sm">No courses listed.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm">
            <h2 className="font-h2 text-h2 text-primary mb-md pb-sm border-b border-outline-variant">Student Reviews</h2>
            <div className="flex flex-col gap-md">
              {college.reviews.map((review) => (
                <div key={review.id} className="p-md bg-surface-container-low rounded-lg border border-outline-variant">
                  <div className="flex justify-between items-center mb-sm">
                    <span className="font-label-md text-label-md text-primary">{review.user.name}</span>
                    <span className="text-secondary font-bold">★ {review.rating}/5</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant">{review.comment}</p>
                </div>
              ))}
              {college.reviews.length === 0 && (
                <p className="text-center py-md text-on-surface-variant font-body-sm">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </section>
        </div>

        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-[88px] flex flex-col gap-md">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm">
              <h3 className="font-h3 text-h3 text-primary mb-sm">Interested in this College?</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">Get detailed info on admissions, fees, and placements.</p>
              <div className="flex flex-col gap-sm">
                <button className="w-full h-[44px] bg-secondary text-on-secondary rounded font-label-md text-label-md hover:opacity-90 transition-opacity">Apply Now</button>
                <Link href="/" className="w-full h-[44px] bg-surface-container-lowest text-primary border border-primary rounded font-label-md text-label-md flex items-center justify-center hover:bg-surface-container-low transition-colors">Back to Search</Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}