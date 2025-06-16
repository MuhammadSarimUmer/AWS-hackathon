import React, { useEffect, useState } from 'react';
import { Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DRONE_ROWS = 5;
const DRONE_COLS = 9;
const DRONE_SIZE = 18;
const DRONE_GAP = 28;

const getDronePositions = () => {
  const positions = [];
  for (let row = 0; row < DRONE_ROWS; row++) {
    for (let col = 0; col < DRONE_COLS; col++) {
      positions.push({
        x: col * DRONE_GAP,
        y: row * DRONE_GAP,
        key: `${row}-${col}`,
      });
    }
  }
  return positions;
};

const VitalitySkyMosaic: React.FC = () => {
  const [pulse, setPulse] = useState(false);
  const [scatter, setScatter] = useState(false);
  const [positions, setPositions] = useState(getDronePositions());

  // Animate between scattered and mosaic
  useEffect(() => {
    const interval = setInterval(() => {
      setScatter((prev) => !prev);
      setPulse((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // For scattered state, randomize positions
  const scatteredPositions = positions.map((pos) => ({
    ...pos,
    x: pos.x + (Math.random() - 0.5) * 80,
    y: pos.y + (Math.random() - 0.5) * 80,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto bg-white/80 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="bg-sky-500 text-white rounded-full p-3 mr-4">
            <Grid size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Vitality Sky Mosaic</h1>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          The Vitality Sky Mosaic forms recovery patterns in the sky via synchronized drones, creating a stunning public spectacle. (IoT Core, Bedrock)
        </p>
        <div className="h-64 flex items-center justify-center bg-sky-100 rounded-lg border border-sky-200 relative overflow-hidden">
          <motion.div
            className="relative"
            style={{ width: DRONE_COLS * DRONE_GAP, height: DRONE_ROWS * DRONE_GAP }}
          >
            {positions.map((pos, i) => (
              <motion.div
                key={pos.key}
                initial={false}
                animate={scatter
                  ? { x: scatteredPositions[i].x, y: scatteredPositions[i].y, scale: 0.7, opacity: 0.7 }
                  : { x: pos.x, y: pos.y, scale: pulse ? 1.2 : 1, opacity: 1 }
                }
                transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                className="absolute"
                style={{ left: 0, top: 0 }}
              >
                <span
                  className="block rounded-full bg-sky-400 shadow-lg"
                  style={{ width: DRONE_SIZE, height: DRONE_SIZE, boxShadow: '0 0 8px #38bdf8' }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VitalitySkyMosaic; 