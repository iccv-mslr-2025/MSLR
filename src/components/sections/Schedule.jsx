// src/components/sections/Schedule.jsx
import React from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import { motion } from 'framer-motion';
import { CalendarDays, CheckCircle, ListChecks, Award, Mic, Paperclip, Rocket, TestTube2, Clock } from 'lucide-react';

const deadlinesData = {
    workshop: [
        { date: "May 12, 2025", event: "Launch of the Challenge", icon: Rocket },
        { date: "June 20, 2025", event: "Workshop Paper Submission Deadline", icon: Paperclip },
        { date: "July 9, 2025", event: "Notification to Authors", icon: CheckCircle },
        { date: "August 10, 2025", event: "Camera-ready Deadline", icon: ListChecks },
        { date: "October 20, 2025", event: "Workshop Date", icon: Mic, highlight: true },
    ],
    challenge: [
        { date: "May 12, 2025", event: "Release of training and development sets", icon: Rocket },
        { date: "June 2, 2025", event: "Release of test sets", icon: TestTube2 },
        { date: "June 23, 2025", event: "Challenge submission deadline", icon: Paperclip },
        { date: "June 24, 2025", event: "Announcement of results", icon: Award },
        { date: "July 3, 2025", event: "Paper submission deadline", icon: ListChecks },
    ]
};

const cardVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay } }
});

const listItemVariants = (delay = 0) => ({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay } }
});

const DeadlineItem = ({ date, event, Icon, highlight, delay }) => (
    <motion.li
        className={`relative pl-12 py-3 border-l-2 ${highlight ? 'border-brand-accent' : 'border-brand-neutral-300 hover:border-brand-primary-light transition-colors'}`}
        variants={listItemVariants(delay)}
    >
        <div className={`absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${highlight ? 'bg-brand-accent text-white' : 'bg-brand-primary text-white'}`}>
            <Icon size={18} />
        </div>
        <h4 className={`text-lg font-semibold ${highlight ? 'text-brand-accent-dark' : 'text-brand-primary-dark'}`}>{date}</h4>
        <p className="text-brand-neutral-700 text-sm sm:text-base">{event}</p>
    </motion.li>
);

const Schedule = () => {
    return (
        <SectionWrapper id="schedule-internal" title="Important Dates" subtitle="" bgColor="bg-brand-neutral-50">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {/* Workshop Deadlines Card */}
                <motion.div className="content-card" variants={cardVariants(0)}>
                    <div className="flex items-center mb-6">
                        <span className="p-3 bg-brand-primary/10 rounded-full mr-4 shadow-sm">
                            <CalendarDays className="w-8 h-8 text-brand-primary" />
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-semibold text-brand-primary-dark">Workshop Deadlines</h3>
                    </div>
                    <ul className="space-y-4">
                        {deadlinesData.workshop.map((item, index) => (
                            <DeadlineItem
                                key={`ws-${index}`}
                                date={item.date}
                                event={item.event}
                                Icon={item.icon}
                                highlight={item.highlight}
                                delay={index * 0.1}
                            />
                        ))}
                    </ul>
                </motion.div>

                {/* Challenge Deadlines Card */}
                <motion.div className="content-card" variants={cardVariants(0.15)}>
                    <div className="flex items-center mb-6">
                        <span className="p-3 bg-brand-accent/10 rounded-full mr-4 shadow-sm">
                            <Award className="w-8 h-8 text-brand-accent" />
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-semibold text-brand-accent-dark">Challenge Deadline</h3>
                    </div>
                    <ul className="space-y-4">
                        {deadlinesData.challenge.map((item, index) => (
                            <DeadlineItem
                                key={`ch-${index}`}
                                date={item.date}
                                event={item.event}
                                Icon={item.icon}
                                highlight={item.highlight}
                                delay={index * 0.1}
                            />
                        ))}
                    </ul>
                </motion.div>
            </div>
            <motion.p
                className="mt-12 text-center text-brand-neutral-600 italic flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Clock size={18} className="mr-2 text-brand-neutral-500" /> All deadlines are at 23:59 Anywhere on Earth (AoE).
            </motion.p>
        </SectionWrapper>
    );
};

export default Schedule;