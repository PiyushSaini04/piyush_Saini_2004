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
    <section id="experience" className="py-16 md:py-24 relative z-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white my-10 md:my-16 mx-auto text-center h-fit"
        >
          Coding Profiles
        </motion.h2>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full overflow-x-auto overflow-y-hidden"
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
              className="w-full overflow-x-auto overflow-y-hidden"
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
