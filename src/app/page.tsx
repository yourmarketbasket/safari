import LandingNavbar from './components/LandingNavbar';
import Link from 'next/link';
import PublicRoute from './components/PublicRoute';

// Since this is a server component, we can't use hooks.
// We'll define components for each section.

const HeroSection = () => (
  <section className="bg-indigo-700 text-white pt-20 pb-12">
    <div className="container mx-auto text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in-down">
        Welcome to Safary
      </h1>
      <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
        The future of seamless and efficient travel management is here.
      </p>
      <Link href="/signup/role-selection" passHref>
        <div className="bg-white text-indigo-700 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:bg-gray-200 transition-transform transform hover:scale-105 cursor-pointer inline-block">
          Get Started
        </div>
      </Link>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sacco Card */}
        <Link href="/sacco" className="block">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform h-full flex flex-col items-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">For Saccos</h3>
            <p className="text-gray-700">Manage routes, vehicles, fares, and drivers with ease.</p>
          </div>
        </Link>
        {/* Owner Card */}
        <Link href="/owner" className="block">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform h-full flex flex-col items-center">
             <div className="bg-indigo-100 p-4 rounded-full mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013-1.197M15 21a9 9 0 00-9-9m9 9a9 9 0 00-9-9" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">For Owners</h3>
            <p className="text-gray-700">Track your income, manage your vehicles, and approve payroll.</p>
          </div>
        </Link>
        {/* Passenger Card */}
        <Link href="/login" className="block">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform h-full flex flex-col items-center">
             <div className="bg-indigo-100 p-4 rounded-full mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">For Passengers</h3>
            <p className="text-gray-700">Easy booking, digital tickets, and loyalty rewards.</p>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-20">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Safary is a comprehensive platform designed to modernize public transport management in Kenya. Our mission is to bring efficiency, transparency, and convenience to Saccos, vehicle owners, and passengers through technology.
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} Safary. All rights reserved.</p>
    </div>
  </footer>
);

export default function HomePage() {
  return (
    <PublicRoute>
      <div className="bg-white">
        <LandingNavbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </PublicRoute>
  );
}
