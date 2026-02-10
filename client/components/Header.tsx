import { Link } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = false; // TODO: Replace with actual auth state

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Workouts', href: '/workouts' },
    { label: 'Diet', href: '/diet' },
    { label: 'Shop', href: '/shop' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-black via-black to-black/95 text-foreground shadow-2xl border-b border-primary/20 backdrop-blur-md">
      <div className="container-fitness">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold font-khand text-primary-foreground">FIT</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold font-khand">FitStrength</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-semibold uppercase text-sm tracking-wider hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline font-semibold uppercase text-sm tracking-wider hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="hidden sm:inline px-6 py-2 rounded-full bg-primary text-primary-foreground font-bold uppercase text-xs tracking-wider hover:bg-primary/90 transition-colors"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 space-y-3 border-t border-secondary/30">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block font-semibold uppercase text-sm tracking-wider hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="block font-semibold uppercase text-sm tracking-wider hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-6 py-2 rounded-full bg-primary text-primary-foreground font-bold uppercase text-xs tracking-wider text-center hover:bg-primary/90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Now
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
