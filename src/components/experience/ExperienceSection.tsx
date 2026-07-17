'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';
import TimelineDraw from './TimelineDraw';
import { useLeetCode } from '@/hooks/useLeetCode';
import { useGitHub } from '@/hooks/useGitHub';
import LeetCodeStatsCard from '../leetcode/LeetCodeStatsCard';
import LeetCodeHeatmap from '../leetcode/LeetCodeHeatmap'; 

import GitHubStatsCard from '../github/GitHubStatsCard';
import GitHubHeatmap from '../github/GitHubHeatmap';
import GitHubLanguages from '../github/GitHubLanguages';
import GitHubRepos from '../github/GitHubRepos';

export default function ExperienceSection() {
  const { data: leetCodeData, isLoading: isLeetCodeLoading, error: leetCodeError } = useLeetCode();
  const { data: gitHubData, isLoading: isGitHubLoading, error: gitHubError } = useGitHub();

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="experience" className="min-h-screen py-24 relative z-10">
      <div className="max-w-6xl w-full mx-auto px-6 ">
          {/* Timeline Column */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-16 text-center lg:text-left"
          >
            Experience
          </motion.h2>
          <div className="relative pl-8 max-w-2xl mx-auto lg:mx-0">
            <TimelineDraw />
            
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={exp.id} 
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative z-10"
                >
                  <div className="text-gray-300 font-semibold mb-1">{exp.date}</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-1">{exp.title}</h3>
                  <div className="text-gray-400 font-medium mb-4">{exp.company}</div>
                  <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl   font-bold text-white my-16 mx-auto text-center h-fit"
        >
          Coding Profiles
        </motion.h2>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LeetCode Section */}
          <div className="space-y-6">
            {/* Stats (solved, rank, contest, languages, skills all-in-one) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <LeetCodeStatsCard
                data={leetCodeData}
                isLoading={isLeetCodeLoading}
                error={leetCodeError}
              />
            </motion.div>

            {/* Heatmap */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <LeetCodeHeatmap
                data={leetCodeData}
                isLoading={isLeetCodeLoading}
                error={leetCodeError}
              />
            </motion.div>
          </div>

          {/* GitHub Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GitHubStatsCard
                data={gitHubData}
                isLoading={isGitHubLoading}
                error={gitHubError}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GitHubLanguages
                data={gitHubData}
                isLoading={isGitHubLoading}
                error={gitHubError}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GitHubHeatmap
                data={gitHubData}
                isLoading={isGitHubLoading}
                error={gitHubError}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
