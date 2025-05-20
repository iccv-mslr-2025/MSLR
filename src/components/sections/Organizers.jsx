// src/components/sections/Organizers.jsx
import React from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import { motion } from 'framer-motion';
import { Users, UserCheck, Mail, ExternalLink, MapPin, Award as AwardIcon } from 'lucide-react'; // Corrected import

import Dr_Hamza from "../../assets/images/HamzahLuqman.jpeg";
import Dr_Simone from "../../assets/images/simone.png";
import Dr_Maad from "../../assets/images/maad.jpg";
import Eng_Raffaele from "../../assets/images/raffaele.jpeg";

const organizersData = {
  chairs: [
    { name: "Dr. Hamzah Luqman", affiliation: "King Fahd University of Petroleum and Minerals, KSA", imgSrc: Dr_Hamza , link: "https://scholar.google.com/citations?user=JgGFu2QAAAAJ&hl=en"},
    { name: "Dr. Simone Palazzo", affiliation: "University of Catania, Italy", imgSrc: Dr_Simone , link:"https://scholar.google.com/citations?hl=en&user=yJr6TqAAAAAJ"},
    { name: "Dr. Maad Alowaifeer", affiliation: "King Fahd University of Petroleum & Minerals, KSA", imgSrc: Dr_Maad , link:"https://scholar.google.com/citations?hl=en&user=dLjEuacAAAAJ"},
    { name: "Eng. Raffaele Mineo", affiliation: "University of Catania, Italy", imgSrc: Eng_Raffaele , link:"https://scholar.google.com/citations?hl=en&user=nYSplWUAAAAJ"},
  ],
  workshopOrganizers: [
    "Dr. Motaz Alfarraj — King Fahd University of Petroleum & Minerals (KFUPM), KSA",
    "Dr. Mufti Mahmud — King Fahd University of Petroleum & Minerals, KSA",
    "Dr. Federica Proietto Salanitri — University of Catania, Italy",
    "Dr. Giovanni Bellitto — University of Catania, Italy",
    "Eng. Amelia Sorrenti — University of Catania, Italy",
    "Dr. Concetto Spampinato — University of Catania, Italy",
    "Dr. Silvio Giancola — King Abdullah University of Science and Technology, KSA",
    "Dr. Muhammad Haris Khan — Mohamed Bin Zayed University of AI, UAE",
    "Dr. Moi Hoon Yap — Manchester Metropolitan University, UK",
  ],
  challengeOrganizers: [
    "Ahmed Abul Hasanaath — King Fahd University of Petroleum & Minerals, KSA",
    "Murtadha Aljubran — Mohamed Bin Zayed University of Artificial Intelligence, UAE",
    "Sarah Alyami — King Fahd University of Petroleum & Minerals, KSA",
    "Dr. Egidio Ragonese — University of Catania, Italy",
    "Dr. Gaia Caligiore - University of Modena and Reggio Emilia, Italy",
    "Dr. Sabina Fontana - University of Catania, Italy",
    "Dr. Senya Polikovsky — Max Planck Institute for Intelligent Systems, Tübingen, Germany",
    "Dr. Sevgi Z. Gurbuz — North Carolina State University, USA",
    "Eng. Kamrul Islam — North Carolina State University, USA",
  ],
  contact: [
    { name: "Eng. Raffaele Mineo", email: "raffaele.mineo[at]unict.it" },
    { name: "Dr. Hamzah Luqman", email: "hluqman[at]kfupm.edu.sa" },
  ]
};

const cardVariants = (delay = 0) => ({
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay } }
});

const listItemVariants = (delay = 0) => ({
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay } }
});


const OrganizerCard = ({ person, delay }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg text-center group transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
    variants={cardVariants(delay)}
  >
    <img
      src={person.imgSrc}
      alt={person.name}
      className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mx-auto mb-4 border-4 border-brand-accent/30 group-hover:border-brand-accent transition-colors duration-300 shadow-md"
    />
    <h4 className="text-lg font-semibold text-brand-primary-dark mb-0.5"><a href={person.link} target="_blank" >{person.name}</a></h4>
    <p className="text-brand-neutral-600 text-xs sm:text-sm">{person.affiliation}</p>
  </motion.div>
);

const InfoListCard = ({ title, items, Icon, delay }) => (
  <motion.div
    className="content-card h-full" // Ensure consistent card height if desired
    variants={cardVariants(delay)}
  >
    <div className="flex items-center mb-5">
      <span className="p-3 bg-brand-accent/10 rounded-full mr-4 shadow-sm">
        <Icon className="w-6 h-6 text-brand-accent" />
      </span>
      <h3 className="text-xl lg:text-2xl font-semibold text-brand-accent-dark">{title}</h3>
    </div>
    <ul className="space-y-2.5 text-brand-neutral-700">
      {items.map((item, index) => (
        <motion.li key={index} className="flex items-start text-sm sm:text-base" variants={listItemVariants(index * 0.05)}>
          <UserCheck className="w-5 h-5 mr-2.5 mt-0.5 text-brand-accent-light flex-shrink-0" />
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);


const Organizers = () => {
  return (
    <>
      <SectionWrapper id="organizers-chairs-internal" title="Workshop Chairs" subtitle="Meet the Leadership" bgColor="bg-brand-neutral-100">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {organizersData.chairs.map((chair, index) => (
            <OrganizerCard key={chair.name} person={chair} delay={index * 0.1} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="organizers-teams-internal" title="Our Teams" subtitle="Dedicated Committees" bgColor="bg-white">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <InfoListCard title="Workshop Organizers" items={organizersData.workshopOrganizers} Icon={Users} delay={0} />
          <InfoListCard title="Challenge Organizers" items={organizersData.challengeOrganizers} Icon={AwardIcon} delay={0.1} /> {/* AwardIcon is now defined via alias */}
        </div>
      </SectionWrapper>

      <SectionWrapper id="organizers-contact-internal" title="Contact Us" subtitle="Get in Touch" bgColor="bg-brand-neutral-800" titleClassName="text-white">
          <motion.div
            className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl text-center"
            variants={cardVariants(0)}
          >
            <Mail className="w-12 h-12 text-brand-accent mx-auto mb-4" />
            <h3 className="text-2xl lg:text-3xl font-semibold text-brand-primary-dark mb-3">Questions or Clarifications?</h3>
            <p className="text-brand-neutral-700 mb-6 leading-relaxed">
              Feel free to reach out to our organizing chairs for any inquiries regarding the workshop.
            </p>
            <div className="space-y-3">
              {organizersData.contact.map(contact => (
                <div key={contact.name}>
                  <p className="font-semibold text-brand-neutral-800">{contact.name}:</p>
                  <a href={`mailto:${contact.email.replace('[at]', '@')}`} className="text-brand-accent hover:underline">
                    {contact.email}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-brand-neutral-200 flex items-center justify-center text-brand-neutral-600">
                <MapPin size={20} className="mr-2 text-brand-primary" />
                <span>IEEE/CVF ICCV 2025, Honolulu, Hawaii, USA</span>
            </div>
          </motion.div>
      </SectionWrapper>
    </>
  );
};

export default Organizers;