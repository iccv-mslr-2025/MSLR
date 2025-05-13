// src/App.jsx
import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Footer from './components/layout/Footer';
import Home from './components/sections/Home';
import Schedule from './components/sections/Schedule';
import Program from './components/sections/Program';
import Submission from './components/sections/Submission';
import Challenge from './components/sections/Challenge';
import Organizers from './components/sections/Organizers';

export const navLinksData = [
  { id: 'home', name: 'Home', component: Home, hasHero: true },
  { id: 'schedule', name: 'Schedule', component: Schedule },
  { id: 'program', name: 'Program', component: Program },
  { id: 'submission', name: 'Submissions', component: Submission },
  { id: 'challenge', name: 'Challenge', component: Challenge },
  { id: 'organizers', name: 'Organizers', component: Organizers },
];

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionRefs = useRef({});
  const headerRef = useRef(null);
  const observerRef = useRef(null);

  // Initialize refs for scrolling
  sectionRefs.current['hero'] = useRef(null);
  navLinksData.forEach(link => {
    sectionRefs.current[link.id] = useRef(null);
  });

  const handleNavClick = useCallback((sectionId) => {
    const element = sectionRefs.current[sectionId]?.current;
    if (!element) return;
    
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, []);

  // Update active section on scroll with optimized IntersectionObserver
  useEffect(() => {
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 80;
    
    const observerOptions = {
      root: null,
      rootMargin: `-${headerHeight + 10}px 0px -${window.innerHeight - headerHeight - 150}px 0px`,
      threshold: 0.01,
    };

    const callback = (entries) => {
      // Find the most visible section
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Use the one with the highest intersection ratio
        const mostVisible = visibleEntries.reduce((prev, current) => 
          (prev.intersectionRatio > current.intersectionRatio) ? prev : current
        );
        
        setActiveSection(mostVisible.target.id);
      }
    };

    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(callback, observerOptions);
    
    // Observe all section refs
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref.current) observerRef.current.observe(ref.current);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-neutral-50">
      <Header ref={headerRef} navLinks={navLinksData} activeSection={activeSection} onNavClick={handleNavClick} />
      
      <main className="flex-grow">
        {/* Hero is a dedicated section at the top */}
        <div id="hero" ref={sectionRefs.current['hero']}>
          <Hero />
        </div>

        {/* Content Sections */}
        {navLinksData.map(link => {
          const SectionComponent = link.component;
          return (
            // This outer div is what IntersectionObserver and scroll-to will target for content sections
            <div id={link.id} key={link.id} ref={sectionRefs.current[link.id]}>
              <SectionComponent />
            </div>
          );
        })}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;