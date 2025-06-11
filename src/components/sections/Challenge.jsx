// src/components/sections/Challenge.jsx
import React from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import { motion } from 'framer-motion';
import { BarChart3, Database, Zap, Users, FileCode, BookOpen, Award, DollarSign, ExternalLink, ShieldCheck } from 'lucide-react';

// Fixed image imports
import task1 from "../../assets/images/track1.png";
import task2 from "../../assets/images/track2.png";

const challengeTracks = [
    {
        id: 1,
        title: "Continuous Sign Language Recognition",
        icon: BarChart3,
        bgColor: "bg-brand-primary-light/10",
        borderColor: "border-brand-primary",
        textColor: "text-brand-primary-dark",
        accentColor: "text-brand-primary",
        // Fixed image reference - direct reference to imported variable
        image: task1, 
        description: "Using the Isharah dataset, this track features around 14,000 videos across 1,000 unique sentences by 18 signers. Participants will be provided with pose modality data consisting of the upper body skeleton, 2D hand keypoints (both hands), face keypoints, and lips contour — totaling 86 keypoints per frame.\n\n",

        evaluation: "<strong>Evaluation:</strong> Submissions will be evaluated using <strong>Word Error Rate (WER)</strong>, which measures the edit distance (substitutions, deletions, insertions) between predicted and reference sentences. Lower WER indicates better performance.",
        subTasks: [
            "<strong>Signer-Independent:</strong> Train your models on a subset of signers and evaluate on entirely unseen signers. This sub-task focuses on cross-signer generalization, which is critical for building scalable real-world continuous sign language recognition systems.",
            "<strong>Unseen Sentences:</strong> Train on a subset of sentences and evaluate on structurally different, unseen sentences. This tests your model's ability to understand grammar, semantics, and sentence-level sign composition without prior exposure."
        ],
        links: [
            { text: "Starter Kit", url: "https://github.com/gufranSabri/Pose86K-CSLR-Isharah", icon: FileCode },
            { text: "Competition - Task 1 (CodaLab)", url: "https://codalab.lisn.upsaclay.fr/competitions/22899", icon: BookOpen },
            { text: "Competition - Task 2 (CodaLab)", url: "https://codalab.lisn.upsaclay.fr/competitions/22900", icon: BookOpen }
        ],

        prizes: [
            { place: "1st Place", amount: "$1,000" },
            { place: "2nd Place", amount: "$750" },
            { place: "3rd Place", amount: "$500" }
        ],

        sponsor: { name: "SharedTech", url: "https://www.sharedtech.com.sa/en" }
    },
    {
        id: 2,
        title: "Isolated Sign Language Recognition",
        icon: Zap,
        bgColor: "bg-brand-accent-light/10",
        borderColor: "border-brand-accent",
        textColor: "text-brand-accent-dark",
        accentColor: "text-brand-accent",
        // Fixed image reference
        image: task2,
        description: "This track presents a sign language recognition task on our multimodal preliminary dataset, featuring RGB videos and 60-GHz radar range-Doppler maps, and including 126 Italian Sign Language gestures (100 medical terms + 26 letters) across 205 expert sessions.",

        evaluation: "<strong>Evaluation:</strong> Submissions will be evaluated using <strong>Top-1 Accuracy</strong>, which measures the percentage of correctly predicted gestures. Higher accuracy indicates better performance.",
        subTasks: [],
        links: [
            { text: "Starter Kit", url: "https://github.com/IngRaffaeleMineo/iccv-mslr-2025-track-2", icon: FileCode },
            { text: "Competition (Kaggle)", url: "https://www.kaggle.com/competitions/iccv-mslr-2025-track-2", icon: BookOpen }
        ],
        sponsor: null, // { name: "TBD", url: "#" },
        prizes: [] // { place: "TBD", amount: "TBD" }
    }
];

const cardVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } }
});

const ChallengeCard = ({ track, index }) => {
    const Icon = track.icon;
    return (
        <motion.div
            className={`rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row ${track.id % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
            variants={cardVariants(index * 0.15)}
        >
            <div className="lg:w-2/5 xl:w-1/3 relative">
                <img src={track.image} alt={`Track ${track.id} visual`} className="w-full h-64 lg:h-full object-cover" />
                <div className={`absolute inset-0 ${track.id === 1 ? 'bg-brand-primary/30' : 'bg-brand-accent/30'}`}></div> {/* Tint overlay */}
            </div>
            <div className={`lg:w-3/5 xl:w-2/3 p-6 md:p-8 lg:p-10 ${track.bgColor} flex flex-col`}>
                <div className="flex items-center mb-4">
                    <span className={`p-3 rounded-full mr-4 shadow-sm ${track.bgColor === "bg-brand-primary-light/10" ? "bg-brand-primary/20" : "bg-brand-accent/20"}`}>
                        <Icon className={`w-7 h-7 ${track.accentColor}`} />
                    </span>
                    <h3 className={`text-2xl lg:text-3xl font-bold ${track.textColor}`}>{track.title}</h3>
                </div>
                <p className="text-brand-neutral-700 mb-5 leading-relaxed text-sm sm:text-base flex-grow">{track.description}</p>

                {track.subTasks && track.subTasks.length > 0 && (
                    <div className="mb-5">
                        <h4 className={`text-lg font-semibold mb-2 ${track.accentColor}`}>Sub-Tasks:</h4>
                        <ul className="space-y-1 text-brand-neutral-700 text-sm list-none pl-2">
                            {track.subTasks.map((task, idx) => (
                                <li key={idx} className="flex items-start">
                                    <ShieldCheck className={`w-5 h-5 mr-2 mt-0.5 ${track.accentColor} flex-shrink-0`} />
                                    <span dangerouslySetInnerHTML={{ __html: task }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <p
                    className="text-brand-neutral-700 mb-5 leading-relaxed text-sm sm:text-base flex-grow"
                    dangerouslySetInnerHTML={{ __html: track.evaluation }}
                ></p>


                <div className="flex flex-wrap gap-3 mb-6">
                {track.links.map(link => {
                    const LinkIcon = link.icon;
                    const isCompetitionLink = link.text.toLowerCase().includes("competition") || link.text.toLowerCase().includes("task");
                    return (
                    <a
                        key={link.text}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn btn-sm border !py-2 !px-4 text-xs sm:text-sm flex items-center
                        ${isCompetitionLink
                            ? 'bg-teal-700 text-white hover:bg-teal-800'
                            : 'bg-teal-100 text-teal-900 hover:bg-teal-200'
                        }`}
                    >
                        <LinkIcon size={16} className="mr-1.5" /> {link.text}
                    </a>
                    );
                })}
                </div>



                {track.sponsor && (
                    <p className="text-sm text-brand-neutral-600 mb-1">
                        🤝 Sponsor: <a href={track.sponsor.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: track.accentColor.replace('text-', '') }}>{track.sponsor.name}</a>
                    </p>
                )}
                {track.prizes && track.prizes.length > 0 && (
                    <div>
                        <p className={`text-sm font-semibold ${track.accentColor} mb-1 flex items-center`}><DollarSign size={16} className="mr-1.5" />Prizes:</p>
                        <ul className="text-xs sm:text-sm text-brand-neutral-600 list-disc list-inside space-y-0.5">
                            {track.prizes.map(prize => (
                                <li key={prize.place}><strong>{prize.place}:</strong> {prize.amount}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </motion.div>
    );
};


const Challenge = () => {
    return (
        <SectionWrapper id="challenge-internal" title="Take On The Challenge" subtitle="Push the Boundaries" bgColor="bg-white">
            <motion.p
                className="max-w-3xl mx-auto text-center text-lg text-brand-neutral-700 mb-12 md:mb-16 leading-relaxed"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
                The MSLR Challenge comprises two exciting tracks. Whether you're interested in continuous sequences or isolated gestures, there's a challenge waiting for you.
            </motion.p>
            <div className="space-y-12 md:space-y-16">
                {challengeTracks.map((track, index) => (
                    <ChallengeCard key={track.id} track={track} index={index} />
                ))}
            </div>
        </SectionWrapper>
    );
};

export default Challenge;