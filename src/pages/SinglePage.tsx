import { Wrench, Clock } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white rounded-full p-6 shadow-lg">
              <Wrench className="w-16 h-16 text-blue-600 animate-pulse" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Under Maintenance
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          We're currently performing scheduled maintenance to improve your experience. We'll be back shortly!
        </p>

        <div className="flex items-center justify-center gap-2 text-gray-500 mb-12">
          <Clock className="w-5 h-5" />
          <span className="text-sm">Estimated completion: 2-3 hours</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Need immediate assistance?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact our support team for urgent matters
          </p>
          <a 
            href="mailto:support@example.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
        </div>

        <footer className="mt-12 text-sm text-gray-400">
          © 2026 Your Company. All rights reserved.
        </footer>
      </div>
    </div>
  );
}