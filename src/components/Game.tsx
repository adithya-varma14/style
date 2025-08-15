import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Game= () => {
  const navigate = useNavigate();

  const handlePlayGames = () => {
    navigate("/game"); 
  };

  return (
    <section
      id="gamification"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Interactive Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Immerse yourself in two unique digital experiences designed to
              engage your senses and creativity. From mesmerizing animations to
              artistic expression, discover new ways to connect with technology.
            </p>
            <button
              onClick={handlePlayGames}
              className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-colors"
            >
              Play Games
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Game;
