import LandingNavbar from './components/LandingNavbar';
import Link from 'next/link';

// Since this is a server component, we can't use hooks.
// We'll define components for each section.

const HeroSection = () => (
  <section className="bg-indigo-700 text-white pt-20 pb-12">
    <div className="container mx-auto text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in-down">
        Welcome to SafarEasy
      </h1>
      <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
        The future of seamless and efficient travel management is here.
      </p>
      <Link href="/login" passHref>
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
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform">
          <h3 className="text-xl font-bold mb-2">For Saccos</h3>
          <p>Manage routes, vehicles, fares, and drivers with ease.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform">
          <h3 className="text-xl font-bold mb-2">For Owners</h3>
          <p>Track your income, manage your vehicles, and approve payroll.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform">
          <h3 className="text-xl font-bold mb-2">For Passengers</h3>
          <p>Easy booking, digital tickets, and loyalty rewards.</p>
        </div>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-20">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        SafarEasy is a comprehensive platform designed to modernize public transport management in Kenya. Our mission is to bring efficiency, transparency, and convenience to Saccos, vehicle owners, and passengers through technology.
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} SafarEasy. All rights reserved.</p>
    </div>
  </footer>
);

export default function HomePage() {
  return (
    <div className="bg-white">
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
