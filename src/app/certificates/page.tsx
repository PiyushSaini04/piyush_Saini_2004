'use client';

import CertGrid from '@/components/certificates/CertGrid';
import { useTransition } from '@/components/transitions/TransitionContext';
import { ArrowLeft } from 'lucide-react';

export default function CertificatesPage() {
  const { navigate } = useTransition();

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <main className="min-h-screen py-24 bg-black relative z-10">
      <div className="max-w-6xl w-full mx-auto px-6">
        
        <div className="mb-16">
          <a 
            href="/"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </a>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            All Certifications
          </h1>
          <p className="text-gray-400 text-lg">
            A comprehensive overview of my professional training and skill validations.
          </p>
        </div>

        <CertGrid />
        
      </div>
    </main>
  );
}
