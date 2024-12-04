import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, School } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white mb-16"
        >
          <School className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to My Class 
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Academic support staff platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              to="/lecturer-checkin"
              className="block bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
            >
              <GraduationCap className="w-12 h-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Lecturer Check-in System
              </h2>
              <p className="text-white text-opacity-90">
                Manage lecturer room and assignments efficiently
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/student-movement"
              className="block bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
            >
              <Users className="w-12 h-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Student Movement Plan
              </h2>
              <p className="text-white text-opacity-90">
                Track and manage student movements and schedules
              </p>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-white mt-16 text-sm"
        >
          Created by Kwizera • 0781845528
        </motion.div>
      </div>
    </div>
  );
}