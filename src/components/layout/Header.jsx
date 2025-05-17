// src/components/layout/Header.jsx
import React, { useState, useEffect, forwardRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logo from "../../assets/images/logo.jpeg"

const Header = forwardRef(({ navLinks, activeSection, onNavClick }, ref) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItem = ({ id, name, isMobile = false }) => (
    <button
      onClick={() => {
        onNavClick(id);
        if (isMobile) setIsMobileMenuOpen(false);
      }}
      className={`relative px-3 py-2 rounded-md text-base font-bold transition-all duration-200 ease-in-out group font-poppins
                  ${isMobile ? 'block w-full text-left text-lg py-3' : ''}
                  ${activeSection === id 
                    ? (isMobile ? 'bg-brand-primary-light text-white' : (isScrolled ? 'text-brand-accent-light' : 'text-brand-primary-dark')) 
                    : (isMobile ? 'text-brand-neutral-200 hover:bg-brand-neutral-700 hover:text-white' : (isScrolled ? 'text-white hover:text-brand-accent-light' : 'text-brand-neutral-800 hover:text-brand-primary'))
                  }`}
    >
      {name}
      {!isMobile && activeSection === id && (
        <motion.div
          className={`absolute -bottom-1 left-0 right-0 h-1 ${isScrolled ? 'bg-brand-accent' : 'bg-brand-primary-dark'} rounded-t-md`} 
          layoutId="activePill"
          initial={false}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
    </button>
  );

  // Add Hero to navigation for logo click if activeSection can be 'hero'
  const allNavigableLinks = [{ id: 'hero', name: 'Top' }, ...navLinks];


  return (
    <motion.header
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out
                  ${isScrolled || isMobileMenuOpen ? 
                    'bg-brand-neutral-900/90 shadow-xl backdrop-blur-md py-3' : 
                    'bg-white/80 py-4 shadow-md backdrop-blur-sm'}`}
    >
      <div className="container-core">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <button onClick={() => onNavClick('hero')} className="flex items-center space-x-2 transition-opacity">
            <img src={logo} alt="MSLR Logo" className="h-10 w-30 rounded-full" />
            {/* <span className={`font-poppins text-xl font-semibold hidden sm:inline ${isScrolled ? 'text-brand-accent-light' : 'text-brand-primary-dark'}`}>MSLR 2025</span> */}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 items-center">
            {navLinks.map(link => (
              <NavItem key={link.id} id={link.id} name={link.name} />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md focus:outline-none ${isScrolled ? 'text-white hover:text-brand-accent-light' : 'text-brand-neutral-800 hover:text-brand-primary'}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-full left-0 right-0 bg-brand-neutral-800 shadow-xl rounded-b-lg overflow-hidden"
          >
            <div className="px-3 pt-2 pb-4 space-y-1 sm:px-4">
              {allNavigableLinks.map(link => (
                <NavItem key={link.id} id={link.id} name={link.name} isMobile={true} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Active nav indicator blur glow */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${isScrolled ? 'bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent' : 'bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent'} opacity-70`}></div>
    </motion.header>
  );
});

Header.displayName = 'Header'; // for DevTools
export default Header;