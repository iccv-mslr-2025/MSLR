// src/components/sections/Submission.jsx
import React from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import { motion } from 'framer-motion';
import { FileText, EyeOff, Users, CheckSquare, Download, Link as LinkIcon, Edit3, ChevronRight } from 'lucide-react';

const submissionGuidelines = [
    {
        title: "Paper Submission Platform",
        icon: Edit3,
        content: "All papers must be submitted via the Microsoft CMT platform.",
        link: { text: "Submit via CMT", url: "https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2FMSLR2025" }
    },
    {
        title: "Formatting Your Manuscript",
        icon: FileText,
        items: [
            "<strong>Page limit:</strong> 5 to 8 pages (including figures and tables). References may be on additional pages.",
            "<strong>Formatting style:</strong> Follow the ICCV 2025 formatting guidelines.",
            "<strong>File type:</strong> Submit as a single PDF file."
        ],
        link: { text: "Download ICCV Author Kit", url: "https://media.eventhosts.cc/Conferences/ICCV2025/ICCV2025-Author-Kit-Feb.zip" }
    },
    {
        title: "Double-Blind Peer Review",
        icon: EyeOff,
        content: "We follow a <strong>double-blind review process</strong> with no rebuttal period. Submissions must be anonymized:",
        items: [
            "Remove all author names and affiliations.",
            "Anonymize any references, acknowledgements, code, and datasets.",
            "Non-anonymized submissions may be desk-rejected."
        ],
        footer: "Review criteria include relevance, novelty, technical merit, and clarity."
    },
    {
        title: "Presentation & Attendance",
        icon: Users,
        items: [
            "Accepted papers will be presented as either <strong>oral</strong> or <strong>poster presentations</strong>.",
            "At least one author (or a designated representative) must attend the workshop <strong>in person</strong> to present the accepted paper.",
            "By submitting a paper, authors also agree to potentially serve as reviewers for the workshop."
        ]
    },
    {
        title: "Proceedings & Policy",
        icon: CheckSquare,
        items: [
            "Accepted papers will be published in the official <strong>ICCV 2025 workshop proceedings</strong>.",
            "Failure to comply with submission and attendance requirements may result in removal from the program.",
            "By submitting to MSLR 2025, authors affirm that the paper (or a substantially similar version) is <strong>not under review elsewhere</strong> and will not be submitted to another venue before the review process concludes."
        ]
    }
];

const cardVariants = (delay = 0) => ({
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay } }
});

const GuidelineCard = ({ guideline, index }) => {
    const Icon = guideline.icon;
    return (
        <motion.div
            className="content-card h-full flex flex-col" // content-card from index.css, h-full for equal height if in grid
            variants={cardVariants(index * 0.1)}
        >
            <div className="flex items-center mb-4">
                <span className="p-3 bg-brand-primary/10 rounded-full mr-4 shadow-sm">
                    <Icon className="w-6 h-6 text-brand-primary" />
                </span>
                <h3 className="text-xl lg:text-2xl font-semibold text-brand-primary-dark">{guideline.title}</h3>
            </div>
            {guideline.content && <p className="text-brand-neutral-700 mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: guideline.content }} />}
            {guideline.items && (
                <ul className="space-y-2 text-brand-neutral-700 mb-3 leading-relaxed list-none">
                    {guideline.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                            <ChevronRight className="w-5 h-5 mr-2 mt-1 text-brand-primary flex-shrink-0" />
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                    ))}
                </ul>
            )}
            {guideline.footer && <p className="text-sm text-brand-neutral-600 mt-auto pt-3 border-t border-brand-neutral-200 leading-relaxed">{guideline.footer}</p>}
            {guideline.link && (
                <a
                    href={guideline.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary text-sm mt-auto w-full sm:w-auto" // Full width on small screens
                >
                    {guideline.link.text.includes("Download") ? <Download size={16} className="mr-2" /> : <LinkIcon size={16} className="mr-2" />}
                    {guideline.link.text}
                </a>
            )}
        </motion.div>
    );
};

const Submission = () => {
    return (
        <SectionWrapper id="submission-internal" title="Submission Guidelines" subtitle="Share Your Work" bgColor="bg-brand-neutral-100">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {submissionGuidelines.map((guideline, index) => (
                    <GuidelineCard key={guideline.title} guideline={guideline} index={index} />
                ))}
            </div>
            <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: submissionGuidelines.length * 0.1 + 0.2 }}
            >
                <a
                    href="https://cmt3.research.microsoft.com/User/Login?ReturnUrl=%2FMSLR2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg text-lg px-8 py-4" // Larger primary button
                >
                    <Edit3 size={20} className="mr-2.5" /> Go to CMT Submission Portal
                </a>
            </motion.div>
            <div className="mt-8 text-center text-sm text-brand-neutral-600">
                The Microsoft CMT service (https://cmt3.research.microsoft.com/) was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
            </div>
        </SectionWrapper>
    );
};

export default Submission;