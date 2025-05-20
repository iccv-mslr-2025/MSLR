// src/components/layout/Footer.jsx
import React from 'react';
import { Mail, MapPin, Copyright, Heart, ExternalLink } from 'lucide-react';
import { navLinksData } from '../../App'; // Import navLinks from App.jsx

import logo from "../../assets/images/logo.jpeg"
import iccv from "../../assets/images/iccv2025.svg"
import SharedTech from "../../assets/images/SharedTech.png"
import jrcai from "../../assets/images/jrc-kfupm-logo-white.png"
import perceivelab from "../../assets/images/PeRCeiVeLab-LogoExtended.png"


const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        const header = document.querySelector('header'); // Assuming header is always rendered
        const headerHeight = header ? header.offsetHeight : 80;

        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-brand-neutral-800 text-brand-neutral-300 section-padding">
            <div className="container-core">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                    <div className="space-y-4">
                        <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-2 group">
                            <img src={logo} alt="MSLR Logo" className="h-10 w-25 rounded-full group-hover:opacity-80 transition-opacity" />
                            <span className="font-poppins text-xl text-white group-hover:text-brand-accent transition-colors">MSLR 2025</span>
                        </button>
                        <p className="text-sm leading-relaxed font-poppins">
                            Multimodal Sign Language Recognition Workshop at IEEE/CVF ICCV 2025.
                            Join us in Honolulu, Hawaii!
                        </p>
                        <div className="mt-4">
                            <a href="https://iccv.thecvf.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <img src={iccv} alt="ICCV 2025" className="w-32 h-auto opacity-80" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h5 className="font-poppins text-lg text-white mb-4 font-medium">Quick Links</h5>
                        <ul className="space-y-2">
                            {navLinksData.map(link => ( 
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-sm hover:text-brand-accent transition-colors duration-200 font-poppins"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-poppins text-lg text-white mb-4 font-medium">Get In Touch</h5>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <Mail size={18} className="mr-3 mt-0.5 text-brand-accent flex-shrink-0" />
                                <div className="font-poppins">
                                    <a href="mailto:raffaele.mineo@unict.it" className="hover:text-brand-accent transition-colors">raffaele.mineo[at]unict.it</a><br />
                                    <a href="mailto:hluqman@kfupm.edu.sa" className="hover:text-brand-accent transition-colors">hluqman[at]kfupm.edu.sa</a>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <MapPin size={18} className="mr-3 text-brand-accent flex-shrink-0" />
                                <span className="font-poppins">ICCV 2025, Honolulu, Hawaii, USA</span>
                            </li>
                        </ul>
                    </div>
                </div> */}

                <div className="mt-16 border-t border-white/20 pt-10">
                    <h5 className="font-poppins text-2xl text-white mb-6 font-semibold text-center">Sponsors</h5>
                    <div className="flex flex-wrap justify-center items-center gap-12">
                        <a
                            href="https://www.sharedtech.com.sa/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <img src={SharedTech} alt="SharedTech Logo" className="h-20 sm:h-24 object-contain" />
                        </a>
                        <a
                            href="https://ri.kfupm.edu.sa/jrcai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <img src={jrcai} alt="JRCAI Logo" className="h-20 sm:h-24 object-contain" />
                        </a>
                        <a
                            href="http://perceivelab.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <img src={perceivelab} alt="PeRCeiVeLab Logo" className="h-20 sm:h-24 object-contain" />
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-brand-neutral-700 text-center text-sm">
                    <p className="flex items-center justify-center font-poppins">
                        <Copyright size={16} className="mr-1.5" /> {currentYear} MSLR Workshop. All Rights Reserved.
                    </p>
                    <p className="mt-1 font-poppins">
                        Crafted with <Heart size={14} className="inline mx-1 text-red-400 fill-current" /> by
                        <a
                            href="https://www.esamjaafar.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center ml-1 text-brand-accent hover:text-brand-accent-light transition-colors group"
                        >
                            Esam Jaafar
                            <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;