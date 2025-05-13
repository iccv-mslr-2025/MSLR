// src/components/layout/SectionWrapper.jsx
import React from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const SectionWrapper = ({
    children,
    id,
    title,
    subtitle,
    className = "",
    bgColor = "bg-brand-neutral-50",
    titleClassName = "text-brand-primary-dark",
    contentMaxWidth = "max-w-7xl"
}) => {
    const [ref, inView] = useIntersectionObserver({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
    });

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.5,
                delayChildren: 0.2,
                ease: "easeOut"
            }
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    };

    const lineVariants = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: {
                duration: 0.7,
                ease: 'circOut',
                delay: 0.2
            }
        }
    };

    return (
        <motion.section
            ref={ref}
            className={`section-padding relative ${bgColor} ${className} min-h-section`}
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            // Improve initial load CLS by setting initial opacity
            style={{ opacity: 0 }}
            aria-labelledby={title ? `${id}-title` : undefined}
        >
            <div className={`container-core ${contentMaxWidth} mx-auto`}>
                {(title || subtitle) && (
                    <div className="mb-12 md:mb-16 text-center">
                        {subtitle && (
                            <motion.p
                                className="text-base md:text-lg font-poppins text-brand-accent uppercase tracking-wider mb-2 font-medium"
                                variants={titleVariants}
                            >
                                {subtitle}
                            </motion.p>
                        )}
                        {title && (
                            <motion.h2
                                id={`${id}-title`}
                                className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${titleClassName} font-poppins`}
                                variants={titleVariants}
                            >
                                {title}
                            </motion.h2>
                        )}
                        {title && (
                            <motion.div
                                className={`mt-4 h-1 w-20 mx-auto ${titleClassName.includes("white") || titleClassName.includes("light") || titleClassName.includes("brand-neutral-50") ? "bg-brand-accent" : "bg-brand-accent"}`}
                                variants={lineVariants}
                                style={{ transformOrigin: 'center' }}
                                aria-hidden="true"
                            />
                        )}
                    </div>
                )}
                {children}
            </div>
        </motion.section>
    );
};

export default SectionWrapper;