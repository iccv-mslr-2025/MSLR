// src/components/sections/Program.jsx
import React from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, UserCircle, Clock, Coffee, Users, Mic, Presentation, MessageSquare, Award as AwardIcon } from 'lucide-react';

import Prof_Richard from "../../assets/images/RichardBowden.webp";
import Dr_Oscar from "../../assets/images/oscarkoller.jpg";
import Dr_Ehsan from "../../assets/images/ehsan.jpeg";

const programSchedule = [
    { time: "08:30-08:45", event: "Opening remarks, goals, challenge overview", icon: Mic, type: "general" },
    { time: "08:45-09:45", event: "Oral presentations (Session 1)", icon: Presentation, type: "presentation" },
    { time: "09:45-10:15", event: "Keynote 1: Prof. Richard Bowden", icon: UserCircle, type: "keynote" },
    { time: "10:15-11:15", event: "Oral presentations (Session 2)", icon: Presentation, type: "presentation" },
    { time: "11:15-11:30", event: "Coffee Break & Networking", icon: Coffee, type: "break" },
    { time: "11:30-12:00", event: "Keynote 2: Dr. Oscar Koller", icon: UserCircle, type: "keynote" },
    { time: "12:00-13:00", event: "Oral presentations (Session 3)", icon: Presentation, type: "presentation" },
    { time: "13:00-14:00", event: "Lunch Break", icon: Coffee, type: "break" }, // Using Coffee for generic break
    { time: "14:00-15:00", event: "Oral presentations (Session 4)", icon: Presentation, type: "presentation" },
    { time: "15:00-15:30", event: "Keynote 3: Dr. Ehsan Hoque", icon: UserCircle, type: "keynote" },
    { time: "15:30-17:30", event: "Poster Session & Demos", icon: Users, type: "poster" },
    { time: "17:30-18:00", event: "Panel Discussion: Dataset Curation & Future Directions", icon: MessageSquare, type: "panel" },
    { time: "18:00-18:15", event: "Awards and Closing Remarks", icon: AwardIcon, type: "general" },
];

const speakersData = [
    { name: "Prof. Richard Bowden", affiliation: "University of Surrey, UK", imgSrc: Prof_Richard, bio: "Richard Bowden is Professor of Computer Vision and Machine Learning at the University of Surrey where he leads the Cognitive Vision Group within CVSSP and is Associate Dean for postgraduate research within his faculty. His research centres on the use of computer vision to locate, track, understand and learn from humans.", link: "https://scholar.google.com/citations?user=mvvgDvcAAAAJ" },
    { 
        name: "Dr. Oscar Koller", 
        affiliation: "Microsoft Inc., USA", 
        imgSrc: Dr_Oscar, 
        bio: "Oscar Koller is an applied scientist in Microsoft's Speech and Language group. His research interests span many topics across speech recognition, sign language translation, sign language production, and computer vision in general.", 
        title: "Delivering Sign Language AI at Scale: From Synthetic Data to Real-World Use",
        abstract: "In this keynote, we share our journey toward making sign language technologies a core part of Microsoft’s accessibility efforts—particularly in enhancing communication experiences for Deaf and sign language users in Microsoft Teams. We highlight the transformative role of synthetic data in overcoming the scarcity of annotated sign language datasets, enabling scalable, inclusive, and diverse training resources. By leveraging time-synchronized multi-view capture, precise registration, and rendering pipelines, we generate richly labeled synthetic data across varied identities and environments. We advocate for community-driven multi-view data collection and emphasize that zero-shot evaluation—without fine-tuning—is the true benchmark for real-world deployment. This talk outlines our key learnings and invites collaboration to advance sign language technology for all.",
        link: "https://scholar.google.com/citations?hl=it&user=vZrN9OgAAAAJ" 
    },
    { name: "Dr. Ehsan Hoque", affiliation: "University of Rochester, USA", imgSrc: Dr_Ehsan, bio: "Ehsan Hoque (Ph.D. MIT, 2013) is a tenured Professor (on-leave) of Computer Science at the University of Rochester and co-leads the Rochester Human-Computer Interaction (ROC HCI) Lab. Hoque’s research focuses on AI-driven health technologies, human-centered computing, and leveraging AI to improve socioemotional skills and healthcare interactions.", link: "https://scholar.google.com/citations?hl=it&user=ZJrR0KQAAAAJ" },
];

const cardVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay } }
});

const listItemVariants = (delay = 0) => ({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay } }
});

const getTypeColor = (type) => {
    switch (type) {
        case 'keynote': return 'bg-brand-accent/10 text-brand-accent-dark border-brand-accent';
        case 'presentation': return 'bg-brand-primary/10 text-brand-primary-dark border-brand-primary';
        case 'break': return 'bg-yellow-400/10 text-yellow-700 border-yellow-500';
        case 'poster': return 'bg-purple-500/10 text-purple-700 border-purple-600';
        case 'panel': return 'bg-indigo-500/10 text-indigo-700 border-indigo-600';
        default: return 'bg-gray-400/10 text-gray-700 border-gray-500';
    }
};

const Program = () => {
    return (
        <>
            <SectionWrapper id="program-schedule-internal" title="Workshop Program" subtitle="Day at a Glance" bgColor="bg-brand-neutral-100">
                <motion.div
                    className="bg-white shadow-xl rounded-xl overflow-hidden"
                    variants={cardVariants(0)}
                >
                    <div className="divide-y divide-brand-neutral-200">
                        {programSchedule.map((item, index) => {
                            const Icon = item.icon;
                            const typeClasses = getTypeColor(item.type);
                            return (
                                <motion.div
                                    key={index}
                                    className={`p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 hover:bg-brand-neutral-50 transition-colors duration-200 ${index % 2 === 0 ? '' : 'bg-brand-neutral-50/50'}`}
                                    variants={listItemVariants(index * 0.05)}
                                >
                                    <div className="flex items-center shrink-0 w-full sm:w-auto">
                                        <span className={`p-2 rounded-full mr-3 ${typeClasses.split(' ')[0]}`}>
                                            <Icon size={20} className={`${typeClasses.split(' ')[1]}`} />
                                        </span>
                                        <span className="font-sharetech text-sm sm:text-base text-brand-neutral-700 w-28 sm:w-32">{item.time}</span>
                                    </div>
                                    <p className="text-sm sm:text-base text-brand-neutral-800 flex-grow">{item.event}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </SectionWrapper>

            <SectionWrapper id="program-speakers-internal" title="Invited Speakers" subtitle="Learn from the Leaders" bgColor="bg-white">
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                    {speakersData.map((speaker, index) => (
                        <motion.div
                            key={speaker.name}
                            className="content-card flex flex-col text-center transform hover:scale-[1.02]"
                            variants={cardVariants(index * 0.1)}
                        >
                            <img
                                src={speaker.imgSrc}
                                alt={speaker.name}
                                className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover mx-auto mb-5 border-4 border-brand-accent/40 group-hover:border-brand-accent transition-colors duration-300 shadow-md"
                            />
                            <h3 className="text-xl lg:text-2xl font-semibold text-brand-primary-dark mb-1">{speaker.name}</h3>
                            <p className="text-brand-neutral-600 text-sm mb-3">{speaker.affiliation}</p>
                            <p className="text-sm text-brand-neutral-700 leading-relaxed flex-grow mb-4 px-2">{speaker.bio}</p>
                            {speaker.title && (
                                <h4 className="text-lg font-semibold text-brand-primary-dark mt-2 px-2">
                                    {speaker.title}
                                </h4>
                            )}
                            {speaker.abstract && (
                                <p className="text-sm text-brand-neutral-700 leading-relaxed mb-4 px-2">
                                    {speaker.abstract}
                                </p>
                            )}
                            {speaker.link && (
                                <a
                                    href={speaker.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-link text-sm inline-flex items-center justify-center mt-auto"
                                >
                                    View Profile <ExternalLink size={14} className="ml-1.5" />
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>
        </>
    );
};

export default Program;