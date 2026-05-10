import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-tertiary dark:bg-tertiary-container w-full mt-auto">
      <div className="max-w-[1280px] mx-auto px-gutter py-xl flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="flex flex-col gap-sm items-center md:items-start">
          <span className="font-h3 text-h3 text-on-tertiary font-bold">EduPredict</span>
          <p className="font-body-sm text-body-sm text-on-tertiary opacity-80 text-center md:text-left">
            © 2024 EduPredict Academic Insights. Institutional Trust & Data Authority.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-md md:gap-lg">
          <Link href="#" className="font-body-sm text-body-sm text-on-tertiary opacity-80 hover:opacity-100 transition-opacity">About Institutions</Link>
          <Link href="#" className="font-body-sm text-body-sm text-on-tertiary opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</Link>
          <Link href="#" className="font-body-sm text-body-sm text-on-tertiary opacity-80 hover:opacity-100 transition-opacity">Fee Research</Link>
        </nav>
      </div>
    </footer>
  );
}