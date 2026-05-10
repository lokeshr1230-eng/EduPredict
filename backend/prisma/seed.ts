import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  const colleges = [
    {
      name: "Indian Institute of Technology, Bombay",
      location: "Mumbai, Maharashtra",
      accreditation: "NAAC A++",
      campusSize: "550 Acres",
      totalFaculty: "600+",
      totalStudents: "10,000+",
      highestPackage: "₹3.67 Cr",
      averagePackage: "₹21.8 LPA",
      placementRate: 95,
      overallRating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80",
      courses: [
        { courseName: "B.Tech Computer Science", duration: "4 Years", totalFee: "₹8.5 Lakhs", eligibility: "JEE Advanced" },
        { courseName: "M.Tech Data Science", duration: "2 Years", totalFee: "₹1.2 Lakhs", eligibility: "GATE" },
      ],
    },
    {
      name: "Birla Institute of Technology and Science",
      location: "Pilani, Rajasthan",
      accreditation: "UGC Approved",
      campusSize: "328 Acres",
      totalFaculty: "900+",
      totalStudents: "15,000+",
      highestPackage: "₹60.75 LPA",
      averagePackage: "₹18.2 LPA",
      placementRate: 91,
      overallRating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=1280&q=80",
      courses: [
        { courseName: "B.E. Computer Science", duration: "4 Years", totalFee: "₹15.2 Lakhs", eligibility: "BITSAT" },
        { courseName: "B.E. Electronics", duration: "4 Years", totalFee: "₹15.2 Lakhs", eligibility: "BITSAT" },
      ],
    },
    {
      name: "Indian Institute of Technology, Madras",
      location: "Chennai, Tamil Nadu",
      accreditation: "NAAC A++",
      campusSize: "617 Acres",
      totalFaculty: "700+",
      totalStudents: "9,500+",
      highestPackage: "₹2.4 Cr",
      averagePackage: "₹20.5 LPA",
      placementRate: 93,
      overallRating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1280&q=80",
      courses: [
        { courseName: "B.Tech Computer Science", duration: "4 Years", totalFee: "₹8.5 Lakhs", eligibility: "JEE Advanced" },
        { courseName: "B.Tech Mechanical Engineering", duration: "4 Years", totalFee: "₹8.5 Lakhs", eligibility: "JEE Advanced" },
      ],
    },
    {
      name: "Indian Institute of Technology, Delhi",
      location: "New Delhi, Delhi",
      accreditation: "NAAC A++",
      campusSize: "320 Acres",
      totalFaculty: "650+",
      totalStudents: "8,500+",
      highestPackage: "₹2.05 Cr",
      averagePackage: "₹19.8 LPA",
      placementRate: 92,
      overallRating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1280&q=80",
      courses: [
        { courseName: "B.Tech Computer Science", duration: "4 Years", totalFee: "₹8.5 Lakhs", eligibility: "JEE Advanced" },
        { courseName: "M.Tech VLSI Design", duration: "2 Years", totalFee: "₹1.2 Lakhs", eligibility: "GATE" },
      ],
    },
    {
      name: "Indian Institute of Science",
      location: "Bengaluru, Karnataka",
      accreditation: "NAAC A++",
      campusSize: "371 Acres",
      totalFaculty: "500+",
      totalStudents: "4,500+",
      highestPackage: "₹85 LPA",
      averagePackage: "₹28 LPA",
      placementRate: 96,
      overallRating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1280&q=80",
      courses: [
        { courseName: "B.S. Research Programme", duration: "4 Years", totalFee: "₹35,000", eligibility: "JEE Advanced / KVPY" },
        { courseName: "M.Tech Computer Science", duration: "2 Years", totalFee: "₹35,000", eligibility: "GATE" },
      ],
    },
    {
      name: "Vellore Institute of Technology",
      location: "Vellore, Tamil Nadu",
      accreditation: "NAAC A++",
      campusSize: "250 Acres",
      totalFaculty: "3,800+",
      totalStudents: "50,000+",
      highestPackage: "₹44 LPA",
      averagePackage: "₹7.5 LPA",
      placementRate: 88,
      overallRating: 4.2,
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&q=80",
      courses: [
        { courseName: "B.Tech Computer Science", duration: "4 Years", totalFee: "₹8.95 Lakhs", eligibility: "VITEEE" },
        { courseName: "B.Tech AI & Machine Learning", duration: "4 Years", totalFee: "₹9.5 Lakhs", eligibility: "VITEEE" },
      ],
    },
    {
      name: "National Institute of Technology, Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      accreditation: "NAAC A++",
      campusSize: "800 Acres",
      totalFaculty: "450+",
      totalStudents: "6,000+",
      highestPackage: "₹41.6 LPA",
      averagePackage: "₹14.2 LPA",
      placementRate: 89,
      overallRating: 4.4,
      imageUrl: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1280&q=80",
      courses: [
        { courseName: "B.Tech Computer Science", duration: "4 Years", totalFee: "₹5.6 Lakhs", eligibility: "JEE Mains" },
        { courseName: "B.Tech Civil Engineering", duration: "4 Years", totalFee: "₹5.6 Lakhs", eligibility: "JEE Mains" },
      ],
    },
    {
      name: "Delhi Technological University",
      location: "New Delhi, Delhi",
      accreditation: "NAAC A",
      campusSize: "164 Acres",
      totalFaculty: "400+",
      totalStudents: "8,000+",
      highestPackage: "₹60 LPA",
      averagePackage: "₹12.5 LPA",
      placementRate: 85,
      overallRating: 4.1,
      imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1280&q=80",
      courses: [
        { courseName: "B.Tech Computer Science", duration: "4 Years", totalFee: "₹4.2 Lakhs", eligibility: "JEE Mains" },
        { courseName: "B.Tech Software Engineering", duration: "4 Years", totalFee: "₹4.2 Lakhs", eligibility: "JEE Mains" },
      ],
    },
    {
      name: "Manipal Institute of Technology",
      location: "Manipal, Karnataka",
      accreditation: "NAAC A++",
      campusSize: "180 Acres",
      totalFaculty: "1,200+",
      totalStudents: "18,000+",
      highestPackage: "₹43.5 LPA",
      averagePackage: "₹8.2 LPA",
      placementRate: 83,
      overallRating: 4.0,
      imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1280&q=80",
      courses: [
        { courseName: "B.Tech Computer Science", duration: "4 Years", totalFee: "₹14.8 Lakhs", eligibility: "MET / JEE Mains" },
        { courseName: "B.Tech Information Technology", duration: "4 Years", totalFee: "₹14.8 Lakhs", eligibility: "MET / JEE Mains" },
      ],
    },
    {
      name: "SRM Institute of Science and Technology",
      location: "Chennai, Tamil Nadu",
      accreditation: "NAAC A++",
      campusSize: "250 Acres",
      totalFaculty: "3,000+",
      totalStudents: "52,000+",
      highestPackage: "₹39 LPA",
      averagePackage: "₹6.8 LPA",
      placementRate: 80,
      overallRating: 3.9,
      imageUrl: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=1280&q=80",
      courses: [
        { courseName: "B.Tech Computer Science", duration: "4 Years", totalFee: "₹12 Lakhs", eligibility: "SRMJEEE" },
        { courseName: "B.Tech Data Science", duration: "4 Years", totalFee: "₹13 Lakhs", eligibility: "SRMJEEE" },
      ],
    },
  ];

  for (const college of colleges) {
    const { courses, ...collegeData } = college;
    await prisma.college.create({
      data: {
        ...collegeData,
        courses: { create: courses },
      },
    });
  }

  console.log(`✅ Seeded ${colleges.length} colleges successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });