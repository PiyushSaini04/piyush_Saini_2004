'use client';

import { motion, Variants } from 'framer-motion';
import { contactData } from '@/data/contact';
import SocialIcon from './SocialIcon';
import Footer from './Footer';

export default function ContactSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="contact" className="pt-24 relative z-10 border-t border-white/5">
      <div className="max-w-6xl w-full mx-auto px-6 pb-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Panel */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Let's create something together.
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-400 text-lg mb-12 max-w-md">
              Whether you have a project in mind or just want to say hi, my inbox is always open.
            </motion.p>
            
            <motion.div variants={itemVariants} className="space-y-6 mb-12">
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">Email</div>
                <a href={`mailto:${contactData.email}`} className="text-xl text-white hover:text-gray-300 transition-colors">
                  {contactData.email}
                </a>
              </div>
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">Location</div>
                <div className="text-xl text-white">{contactData.location}</div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex gap-4">
              {contactData.socials.map((social) => (
                <SocialIcon key={social.name} social={social} />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Form */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="John Doe" />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="john@example.com" />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder="Hello..." />
              </motion.div>
              
              <motion.button 
                variants={itemVariants}
                className="w-full bg-white text-black font-semibold rounded-xl py-4 mt-2 hover:bg-gray-200 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
          
        </div>
      </div>
      
      <Footer />
    </section>
  );
}
