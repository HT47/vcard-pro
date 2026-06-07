"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import templates
import BusinessCardV1 from "@/components/templates/BusinessCardV1";
import BusinessCardV2 from "@/components/templates/BusinessCardV2";
import DailySchedule from "@/components/templates/DailySchedule";
import WeeklyEvents from "@/components/templates/WeeklyEvents";
import BusinessCardStructure from "@/components/templates/BusinessCardStructure";
import BusinessCardClassic from "@/components/templates/BusinessCardClassic";
import BusinessCardWave from "@/components/templates/BusinessCardWave";
import BusinessCardGlass from "@/components/templates/BusinessCardGlass";
import BusinessCardFreelance from "@/components/templates/BusinessCardFreelance";

export default function TemplatesDemo() {
  const [activeTemplate, setActiveTemplate] = useState<number>(1);

  const templates = [
    { id: 1, name: "Business V1", component: <BusinessCardV1 /> },
    { id: 2, name: "Business V2", component: <BusinessCardV2 /> },
    { id: 3, name: "Programme Jour", component: <DailySchedule /> },
    { id: 4, name: "Programme Semaine", component: <WeeklyEvents /> },
    { id: 5, name: "Structure Pro", component: <BusinessCardStructure /> },
    { id: 6, name: "Classic Pro", component: <BusinessCardClassic /> },
    { id: 7, name: "Wave Pro", component: <BusinessCardWave /> },
    { id: 8, name: "Glass Pro", component: <BusinessCardGlass /> },
    { id: 9, name: "Freelance Pro", component: <BusinessCardFreelance /> },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 p-4 md:p-8 flex flex-col items-center font-sans rtl:dir-rtl">
      {/* Chargement des icônes Font Awesome pour les réseaux sociaux */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Selector */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-wrap justify-center gap-3 bg-white p-2 rounded-full shadow-md border border-gray-200 max-w-full"
      >
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setActiveTemplate(template.id)}
            className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors overflow-hidden ${
              activeTemplate === template.id ? "text-white" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {activeTemplate === template.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-600 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{template.name}</span>
          </button>
        ))}
      </motion.div>

      {/* Render Active Template */}
      <div className="w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTemplate}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-center"
          >
            {templates.find((t) => t.id === activeTemplate)?.component}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <p className="text-gray-400 text-xs mt-8 text-center uppercase tracking-widest font-semibold">
        Note : Les images et QR codes sont des exemples.
      </p>
    </div>
  );
}
