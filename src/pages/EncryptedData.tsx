import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { EncryptedDataManager } from '@/components/EncryptedDataManager';

const EncryptedData: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Encrypted Data Management
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Securely store and manage your encrypted yield farming data on-chain using 
            advanced cryptographic techniques for maximum privacy protection.
          </p>
        </div>
        <EncryptedDataManager />
      </main>
      <Footer />
    </div>
  );
};

export default EncryptedData;
