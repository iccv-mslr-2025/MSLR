// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowUpCircle } from 'lucide-react';
// import ImageWithSkeleton from '../layout/ImageWithSkeleton';
// import { preloadCriticalImages } from '../../utils/imageOptimizer';

// // Using the provided images
// import iccv from "../../assets/images/iccv2025.svg";
// import signLanguageHands from "../../assets/images/1__LRD9SzCgmze-8jC25O3KA.png";
// import honoluluSkyline from "../../assets/images/honoluluSkyline.jpeg";

// const Hero = () => {
//     const title = "Multimodal Sign Language Recognition";
//     const subtitle = "IEEE/CVF ICCV 2025 Workshop";

//     // Preload critical images for best LCP performance
//     useEffect(() => {
//         preloadCriticalImages([
//             signLanguageHands,
//             honoluluSkyline,
//             iccv
//         ]);
//     }, []);

//     const textVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.005,
//                 ease: "easeOut",
//                 staggerChildren: 0.0008,
//                 delayChildren: 0.0003
//             }
//         }
//     };

//     const letterVariants = {
//         hidden: { opacity: 0, y: 10 },
//         visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 5 } }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
//     };

//     return (
//         <section className="relative bg-brand-neutral-900 overflow-hidden py-14 md:py-20">
//             {/* Dark background base */}
//             <div className="absolute inset-0 bg-gradient-to-r from-brand-neutral-900 via-brand-neutral-800 to-brand-neutral-900"></div>

//             {/* Background right image - Honolulu */}
//             <motion.div
//                 className="absolute inset-0 w-full h-full overflow-hidden z-0"
//                 initial={{ opacity: 0, scale: 1.1 }}
//                 animate={{ opacity: 0.85, scale: 1 }}
//                 transition={{ duration: 1.2, ease: "easeOut" }}
//             >
                
//             <div className="relative w-full h-full">
//             {/* Uniform dark overlay */}
//             <div className="absolute inset-0 bg-black/60 z-10"></div>

//             {/* Background image */}
//             <ImageWithSkeleton
//                 src={honoluluSkyline}
//                 alt="Honolulu skyline"
//                 className="w-full h-full object-cover object-center"
//                 width="100%"
//                 height="100%"
//                 priority={true}
//                 loading="eager"
//                 sizes="(max-width: 768px) 100vw, 60vw"
//             />
//             </div>


//             </motion.div>

//             {/* Left side blurred sign language hands */}
//             {/* <motion.div
//                 className="absolute top-0 left-0 w-full md:w-2/5 h-full overflow-hidden z-0"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.75 }}
//                 transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-neutral-900/40 to-brand-neutral-900"></div>
//                 <motion.div
//                     initial={{ filter: "blur(0px)" }}
//                     animate={{ filter: "blur(4px)" }}
//                     transition={{ duration: 1.5, delay: 0.5 }}
//                     className="w-full h-full"
//                 >
//                     <ImageWithSkeleton
//                         src={signLanguageHands}
//                         alt="Sign language hands illustration"
//                         className="w-full h-full object-cover object-center"
//                         width="100%"
//                         height="100%"
//                         priority={true}
//                         loading="eager"
//                         sizes="(max-width: 768px) 100vw, 40vw"
//                     />
//                 </motion.div>
//             </motion.div> */}

//             {/* Main content container */}
//             <div className="container-core relative mx-auto z-10">
//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
//                     {/* Main content - centered */}
//                     <motion.div
//                         variants={textVariants}
//                         initial="hidden"
//                         animate="visible"
//                         className="md:col-span-8 md:col-start-3 text-center px-4 md:px-6 py-4 md:py-8"
//                     >
//                         <motion.h1 
//                             className="font-oswald text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
//                             aria-label={title}
//                         >
//                             {title.split(" ").map((word, wordIndex) => (
//                                 <span key={`word-${wordIndex}`} className="inline-block mr-4">
//                                     {word.split("").map((char, charIndex) => (
//                                         <motion.span
//                                             key={`char-${wordIndex}-${charIndex}`}
//                                             variants={letterVariants}
//                                             className="inline-block"
//                                             aria-hidden="true"
//                                         >
//                                             {char}
//                                         </motion.span>
//                                     ))}
//                                 </span>
//                             ))}
//                         </motion.h1>

//                         <motion.p
//                             className="font-roboto text-xl sm:text-2xl md:text-3xl mt-4 mb-6 text-brand-neutral-200"
//                             variants={itemVariants}
//                         >
//                             {subtitle}
//                         </motion.p>

//                         <motion.div
//                             variants={itemVariants}
//                             className="w-fit mx-auto space-y-1 mb-6 bg-brand-neutral-800 bg-opacity-80 p-4 rounded-xl"
//                         >
//                             <p className="w-fit mx-auto text-base sm:text-lg font-sharetech text-brand-accent-light tracking-wider">
//                                 Honolulu, Hawaii, USA
//                             </p>
//                             <p className="w-fit mx-auto text-base sm:text-lg font-sharetech text-brand-accent-light tracking-wider">
//                                 October 20th, 2025
//                             </p>
//                         </motion.div>



//                         <motion.div
//                             variants={itemVariants}
//                             className="mb-8 flex justify-center"
//                         >
//                             <a 
//                                 href="https://iccv.thecvf.com/" 
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 className="inline-block hover:opacity-80 transition-opacity"
//                                 aria-label="ICCV 2025 website"
//                             >
//                                 <img 
//                                     src={iccv} 
//                                     alt="ICCV 2025" 
//                                     className="h-12 w-auto" 
//                                     width="auto"
//                                     height="48"
//                                     loading="eager"
//                                 />
//                             </a>
//                         </motion.div>

//                         <motion.button
//                             variants={itemVariants}
//                             className="px-6 py-3 bg-brand-primary text-white rounded-full font-medium 
//                                     hover:bg-brand-primary-dark transition-all duration-300 
//                                     shadow-lg hover:shadow-brand-primary/30 hover:translate-y-[-2px]
//                                     flex items-center mx-auto"
//                             aria-label="Register Now"
//                         >
//                             <a href="https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2FMSLR2025">Submit Your Paper</a>
//                             <ArrowUpCircle size={18} className="ml-2 text-white" aria-hidden="true" />
//                         </motion.button>
//                     </motion.div>
//                 </div>

//                 {/* Floating sign language symbols - Hidden from screen readers */}
//                 <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
//                     {/* Left side small floating hand symbols */}
//                     {[...Array(6)].map((_, i) => (
//                         <motion.div
//                             key={`left-symbol-${i}`}
//                             className="absolute left-0 overflow-hidden rounded-lg blur-sm opacity-60"
//                             style={{
//                                 width: `${30 + Math.random() * 40}px`,
//                                 height: `${30 + Math.random() * 40}px`,
//                                 left: `${Math.random() * 20}%`,
//                                 top: `${10 + Math.random() * 80}%`,
//                             }}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{
//                                 opacity: [0, 0.6, 0],
//                                 x: [-20, 0, 20],
//                                 y: [0, -10, 0]
//                             }}
//                             transition={{
//                                 duration: 4 + Math.random() * 6,
//                                 repeat: Infinity,
//                                 delay: Math.random() * 5
//                             }}
//                         >
//                             <img 
//                                 src={signLanguageHands} 
//                                 alt="" 
//                                 className="w-full h-full object-cover"
//                                 loading="lazy"
//                             />
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>

//             {/* Decorative dots pattern - Hidden from screen readers */}
//             <div className="absolute bottom-0 right-0 w-full h-24 overflow-hidden z-10 opacity-30 pointer-events-none" aria-hidden="true">
//                 <div className="w-full h-full bg-gradient-to-t from-brand-neutral-900 to-transparent"></div>
//                 {[...Array(15)].map((_, i) => (
//                     <motion.div
//                         key={`dot-${i}`}
//                         className="absolute w-1.5 h-1.5 rounded-full bg-white"
//                         style={{
//                             right: `${Math.random() * 50}%`,
//                             bottom: `${Math.random() * 100}%`,
//                         }}
//                         initial={{ opacity: 0 }}
//                         animate={{
//                             opacity: [0, 0.7, 0],
//                             y: [0, -10, -20]
//                         }}
//                         transition={{
//                             duration: 2 + Math.random() * 3,
//                             repeat: Infinity,
//                             delay: Math.random() * 5
//                         }}
//                     />
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default Hero;


// // src/components/sections/Hero.jsx
// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowUpCircle } from 'lucide-react';
// import ImageWithSkeleton from '../layout/ImageWithSkeleton';
// import { preloadCriticalImages } from '../../utils/imageOptimizer';

// // Using the provided images
// import iccv from "../../assets/images/iccv2025.svg";
// import signLanguageHands from "../../assets/images/1__LRD9SzCgmze-8jC25O3KA.png";
// import honoluluSkyline from "../../assets/images/honolulu_skyline.jpeg";

// const Hero = () => {
//     const title = "Multimodal Sign Language Recognition";
//     const subtitle = "IEEE/CVF ICCV 2025 Workshop";

//     // Preload critical images for best LCP performance
//     useEffect(() => {
//         preloadCriticalImages([
//             signLanguageHands,
//             honoluluSkyline,
//             iccv
//         ]);
//     }, []);

//     const textVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.005,
//                 ease: "easeOut",
//                 staggerChildren: 0.0008,
//                 delayChildren: 0.0003
//             }
//         }
//     };

//     const letterVariants = {
//         hidden: { opacity: 0, y: 10 },
//         visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 5 } }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
//     };

//     return (
//         <section className="relative bg-brand-neutral-900 overflow-hidden py-14 md:py-20">
//             {/* Dark background base */}
//             <div className="absolute inset-0 bg-gradient-to-r from-brand-neutral-900 via-brand-neutral-800 to-brand-neutral-900"></div>

//             {/* Background right image - Honolulu */}
//             <motion.div
//                 className="absolute top-0 right-0 w-full md:w-3/5 h-full overflow-hidden z-0"
//                 initial={{ opacity: 0, scale: 1.1 }}
//                 animate={{ opacity: 0.85, scale: 1 }}
//                 transition={{ duration: 1.2, ease: "easeOut" }}
//             >
//                 <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-neutral-900/30 to-brand-neutral-900"></div>
//                 <ImageWithSkeleton
//                     src={honoluluSkyline}
//                     alt="Honolulu skyline"
//                     className="w-full h-full object-cover object-center"
//                     width="100%"
//                     height="100%"
//                     priority={true} // Mark as high priority for LCP
//                     loading="eager"
//                     sizes="(max-width: 768px) 100vw, 60vw"
//                 />
//             </motion.div>

//             {/* Left side blurred sign language hands */}
//             <motion.div
//                 className="absolute top-0 left-0 w-full md:w-2/5 h-full overflow-hidden z-0"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.75 }}
//                 transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-neutral-900/40 to-brand-neutral-900"></div>
//                 <motion.div
//                     initial={{ filter: "blur(0px)" }}
//                     animate={{ filter: "blur(4px)" }}
//                     transition={{ duration: 1.5, delay: 0.5 }}
//                     className="w-full h-full"
//                 >
//                     <ImageWithSkeleton
//                         src={signLanguageHands}
//                         alt="Sign language hands illustration"
//                         className="w-full h-full object-cover object-center"
//                         width="100%"
//                         height="100%"
//                         priority={true}
//                         loading="eager"
//                         sizes="(max-width: 768px) 100vw, 40vw"
//                     />
//                 </motion.div>
//             </motion.div>

//             {/* Main content container */}
//             <div className="container-core relative mx-auto z-10">
//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
//                     {/* Main content - centered */}
//                     <motion.div
//                         variants={textVariants}
//                         initial="hidden"
//                         animate="visible"
//                         className="md:col-span-8 md:col-start-3 text-center px-4 md:px-6 py-4 md:py-8"
//                     >
//                         <motion.h1 
//                             className="font-oswald text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
//                             aria-label={title}
//                         >
//                             {title.split(" ").map((word, wordIndex) => (
//                                 <span key={`word-${wordIndex}`} className="inline-block mr-4">
//                                     {word.split("").map((char, charIndex) => (
//                                         <motion.span
//                                             key={`char-${wordIndex}-${charIndex}`}
//                                             variants={letterVariants}
//                                             className="inline-block"
//                                             aria-hidden="true"
//                                         >
//                                             {char}
//                                         </motion.span>
//                                     ))}
//                                 </span>
//                             ))}
//                         </motion.h1>

//                         <motion.p
//                             className="font-roboto text-xl sm:text-2xl md:text-3xl mt-4 mb-6 text-brand-neutral-200"
//                             variants={itemVariants}
//                         >
//                             {subtitle}
//                         </motion.p>

//                         <motion.div
//                             variants={itemVariants}
//                             className="space-y-1 mb-6"
//                         >
//                             <p className="text-base sm:text-lg font-sharetech text-brand-accent-light tracking-wider">
//                                 Honolulu, Hawaii, USA
//                             </p>
//                             <p className="text-base sm:text-lg font-sharetech text-brand-accent-light tracking-wider">
//                                 October 20th, 2025
//                             </p>
//                         </motion.div>

//                         <motion.div
//                             variants={itemVariants}
//                             className="mb-8 flex justify-center"
//                         >
//                             <a 
//                                 href="https://iccv.thecvf.com/" 
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 className="inline-block hover:opacity-80 transition-opacity"
//                                 aria-label="ICCV 2025 website"
//                             >
//                                 <img 
//                                     src={iccv} 
//                                     alt="ICCV 2025" 
//                                     className="h-12 w-auto" 
//                                     width="auto"
//                                     height="48"
//                                     loading="eager"
//                                 />
//                             </a>
//                         </motion.div>

//                         <motion.button
//                             variants={itemVariants}
//                             className="px-6 py-3 bg-brand-primary text-white rounded-full font-medium 
//                                     hover:bg-brand-primary-dark transition-all duration-300 
//                                     shadow-lg hover:shadow-brand-primary/30 hover:translate-y-[-2px]
//                                     flex items-center mx-auto"
//                             aria-label="Register Now"
//                         >
//                             <a href="https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2FMSLR2025">Submit Your Paper</a>
//                             <ArrowUpCircle size={18} className="ml-2 text-white" aria-hidden="true" />
//                         </motion.button>
//                     </motion.div>
//                 </div>

//                 {/* Floating sign language symbols - Hidden from screen readers */}
//                 <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
//                     {/* Left side small floating hand symbols */}
//                     {[...Array(6)].map((_, i) => (
//                         <motion.div
//                             key={`left-symbol-${i}`}
//                             className="absolute left-0 overflow-hidden rounded-lg blur-sm opacity-60"
//                             style={{
//                                 width: `${30 + Math.random() * 40}px`,
//                                 height: `${30 + Math.random() * 40}px`,
//                                 left: `${Math.random() * 20}%`,
//                                 top: `${10 + Math.random() * 80}%`,
//                             }}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{
//                                 opacity: [0, 0.6, 0],
//                                 x: [-20, 0, 20],
//                                 y: [0, -10, 0]
//                             }}
//                             transition={{
//                                 duration: 4 + Math.random() * 6,
//                                 repeat: Infinity,
//                                 delay: Math.random() * 5
//                             }}
//                         >
//                             <img 
//                                 src={signLanguageHands} 
//                                 alt="" 
//                                 className="w-full h-full object-cover"
//                                 loading="lazy"
//                             />
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>

//             {/* Decorative dots pattern - Hidden from screen readers */}
//             <div className="absolute bottom-0 right-0 w-full h-24 overflow-hidden z-10 opacity-30 pointer-events-none" aria-hidden="true">
//                 <div className="w-full h-full bg-gradient-to-t from-brand-neutral-900 to-transparent"></div>
//                 {[...Array(15)].map((_, i) => (
//                     <motion.div
//                         key={`dot-${i}`}
//                         className="absolute w-1.5 h-1.5 rounded-full bg-white"
//                         style={{
//                             right: `${Math.random() * 50}%`,
//                             bottom: `${Math.random() * 100}%`,
//                         }}
//                         initial={{ opacity: 0 }}
//                         animate={{
//                             opacity: [0, 0.7, 0],
//                             y: [0, -10, -20]
//                         }}
//                         transition={{
//                             duration: 2 + Math.random() * 3,
//                             repeat: Infinity,
//                             delay: Math.random() * 5
//                         }}
//                     />
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default Hero;





// src/components/sections/Hero.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpCircle } from 'lucide-react';
import ImageWithSkeleton from '../layout/ImageWithSkeleton';
import { preloadCriticalImages } from '../../utils/imageOptimizer';

// Using the provided images
import iccv from "../../assets/images/iccv2025.svg";
import signLanguageHands from "../../assets/images/1__LRD9SzCgmze-8jC25O3KA.png";
import honoluluSkyline from "../../assets/images/honoluluSkyline.jpeg";

const Hero = () => {
    const title = "Multimodal Sign Language Recognition";
    const subtitle = "IEEE/CVF ICCV 2025 Workshop";

    // Preload critical images for best LCP performance
    useEffect(() => {
        preloadCriticalImages([
            signLanguageHands,
            honoluluSkyline,
            iccv
        ]);
    }, []);

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.005,
                ease: "easeOut",
                staggerChildren: 0.0008,
                delayChildren: 0.0003
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="relative bg-brand-neutral-900 overflow-hidden py-14 md:py-20">
            {/* Dark background base */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-neutral-900 via-brand-neutral-800 to-brand-neutral-900"></div>

            {/* Background right image - Honolulu */}
            <motion.div
                className="absolute inset-0 w-full h-full overflow-hidden z-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.85, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                
            <div className="relative w-full h-full">
            {/* Uniform dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* Background image */}
            <ImageWithSkeleton
                src={honoluluSkyline}
                alt="Honolulu skyline"
                className="w-full h-full object-cover object-center"
                width="100%"
                height="100%"
                priority={true}
                loading="eager"
                sizes="(max-width: 768px) 100vw, 60vw"
            />
            </div>


            </motion.div>

            {/* Left side blurred sign language hands */}
            {/* <motion.div
                className="absolute top-0 left-0 w-full md:w-2/5 h-full overflow-hidden z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-neutral-900/40 to-brand-neutral-900"></div>
                <motion.div
                    initial={{ filter: "blur(0px)" }}
                    animate={{ filter: "blur(4px)" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="w-full h-full"
                >
                    <ImageWithSkeleton
                        src={signLanguageHands}
                        alt="Sign language hands illustration"
                        className="w-full h-full object-cover object-center"
                        width="100%"
                        height="100%"
                        priority={true}
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                </motion.div>
            </motion.div> */}

            {/* Main content container */}
            <div className="container-core relative mx-auto z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
                    {/* Main content - centered */}
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="md:col-span-8 md:col-start-3 text-center px-4 md:px-6 py-4 md:py-8"
                    >
                        <motion.h1 
                            className="font-oswald text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                            aria-label={title}
                        >
                            {title.split(" ").map((word, wordIndex) => (
                                <span key={`word-${wordIndex}`} className="inline-block mr-4">
                                    {word.split("").map((char, charIndex) => (
                                        <motion.span
                                            key={`char-${wordIndex}-${charIndex}`}
                                            variants={letterVariants}
                                            className="inline-block"
                                            aria-hidden="true"
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </motion.h1>

                        <motion.p
                            className="font-roboto text-xl sm:text-2xl md:text-3xl mt-4 mb-6 text-brand-neutral-200"
                            variants={itemVariants}
                        >
                            {subtitle}
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="w-fit mx-auto space-y-1 mb-6 bg-brand-neutral-800 bg-opacity-80 p-4 rounded-xl"
                        >
                            <p className="w-fit mx-auto text-base sm:text-lg font-sharetech text-brand-accent-light tracking-wider">
                                Honolulu, Hawaii, USA
                            </p>
                            <p className="w-fit mx-auto text-base sm:text-lg font-sharetech text-brand-accent-light tracking-wider">
                                October 20th, 2025
                            </p>
                        </motion.div>



                        <motion.div
                            variants={itemVariants}
                            className="mb-8 flex justify-center"
                        >
                            <a 
                                href="https://iccv.thecvf.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block hover:opacity-80 transition-opacity"
                                aria-label="ICCV 2025 website"
                            >
                                <img 
                                    src={iccv} 
                                    alt="ICCV 2025" 
                                    className="h-12 w-auto" 
                                    width="auto"
                                    height="48"
                                    loading="eager"
                                />
                            </a>
                        </motion.div>

                        <motion.button
                            variants={itemVariants}
                            className="px-6 py-3 bg-brand-primary text-white rounded-full font-medium 
                                    hover:bg-brand-primary-dark transition-all duration-300 
                                    shadow-lg hover:shadow-brand-primary/30 hover:translate-y-[-2px]
                                    flex items-center mx-auto"
                            aria-label="Register Now"
                        >
                            <a href="https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2FMSLR2025">Submit Your Paper</a>
                            <ArrowUpCircle size={18} className="ml-2 text-white" aria-hidden="true" />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Floating sign language symbols - Hidden from screen readers */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    {/* Left side small floating hand symbols */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`left-symbol-${i}`}
                            className="absolute left-0 overflow-hidden rounded-lg blur-sm opacity-60"
                            style={{
                                width: `${30 + Math.random() * 40}px`,
                                height: `${30 + Math.random() * 40}px`,
                                left: `${Math.random() * 20}%`,
                                top: `${10 + Math.random() * 80}%`,
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                                opacity: [0, 0.6, 0],
                                x: [-20, 0, 20],
                                y: [0, -10, 0]
                            }}
                            transition={{
                                duration: 4 + Math.random() * 6,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                        >
                            <img 
                                src={signLanguageHands} 
                                alt="" 
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Decorative dots pattern - Hidden from screen readers */}
            <div className="absolute bottom-0 right-0 w-full h-24 overflow-hidden z-10 opacity-30 pointer-events-none" aria-hidden="true">
                <div className="w-full h-full bg-gradient-to-t from-brand-neutral-900 to-transparent"></div>
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`dot-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full bg-white"
                        style={{
                            right: `${Math.random() * 50}%`,
                            bottom: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.7, 0],
                            y: [0, -10, -20]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;