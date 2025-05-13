// Mock data for patient vitals and metrics
export const mockPatientData = [
  {
    id: 'p001',
    name: 'John Smith',
    age: 42,
    condition: 'Post-Surgery Recovery',
    treatmentStart: '2025-01-15',
    vitals: [
      { timestamp: '2025-04-01T08:00:00', heartRate: 72, bloodPressure: '120/80', respiratoryRate: 14, oxygenSaturation: 98, temperature: 98.6, hrvScore: 68 },
      { timestamp: '2025-04-01T12:00:00', heartRate: 75, bloodPressure: '122/82', respiratoryRate: 15, oxygenSaturation: 97, temperature: 98.7, hrvScore: 65 },
      { timestamp: '2025-04-01T16:00:00', heartRate: 78, bloodPressure: '125/83', respiratoryRate: 16, oxygenSaturation: 96, temperature: 98.9, hrvScore: 62 },
      { timestamp: '2025-04-01T20:00:00', heartRate: 70, bloodPressure: '118/78', respiratoryRate: 14, oxygenSaturation: 98, temperature: 98.4, hrvScore: 70 },
      { timestamp: '2025-04-02T08:00:00', heartRate: 71, bloodPressure: '119/79', respiratoryRate: 14, oxygenSaturation: 98, temperature: 98.5, hrvScore: 69 },
      { timestamp: '2025-04-02T12:00:00', heartRate: 73, bloodPressure: '121/81', respiratoryRate: 15, oxygenSaturation: 97, temperature: 98.6, hrvScore: 67 },
      { timestamp: '2025-04-02T16:00:00', heartRate: 76, bloodPressure: '123/82', respiratoryRate: 15, oxygenSaturation: 97, temperature: 98.8, hrvScore: 64 },
    ],
    sleepData: [
      { date: '2025-04-01', hoursSlept: 6.5, deepSleepPercentage: 20, remSleepPercentage: 25, sleepQualityScore: 68 },
      { date: '2025-04-02', hoursSlept: 7.2, deepSleepPercentage: 22, remSleepPercentage: 28, sleepQualityScore: 75 },
    ],
    recoveryMetrics: {
      painLevel: 3,
      mobilityScore: 65,
      energyLevel: 60,
      mentalWellnessScore: 72,
      inflammationMarkers: 42,
      recoveryProgress: 58
    },
    healingRituals: [
      { name: 'Morning Meditation', compliance: 80, effectivenessScore: 75 },
      { name: 'Physical Therapy Exercises', compliance: 90, effectivenessScore: 85 },
      { name: 'Evening Breathing Practice', compliance: 70, effectivenessScore: 65 }
    ],
    communityConnections: 5,
    environmentalExposure: {
      naturalLightHours: 4.5,
      outdoorTimeHours: 1.2,
      airQualityExposure: 'Moderate'
    }
  },
  {
    id: 'p002',
    name: 'Emily Johnson',
    age: 35,
    condition: 'Chronic Pain Management',
    treatmentStart: '2025-02-20',
    vitals: [
      { timestamp: '2025-04-01T08:00:00', heartRate: 68, bloodPressure: '118/75', respiratoryRate: 13, oxygenSaturation: 99, temperature: 98.4, hrvScore: 72 },
      { timestamp: '2025-04-01T12:00:00', heartRate: 70, bloodPressure: '120/76', respiratoryRate: 14, oxygenSaturation: 98, temperature: 98.5, hrvScore: 70 },
      { timestamp: '2025-04-01T16:00:00', heartRate: 72, bloodPressure: '122/78', respiratoryRate: 14, oxygenSaturation: 98, temperature: 98.6, hrvScore: 68 },
      { timestamp: '2025-04-01T20:00:00', heartRate: 66, bloodPressure: '116/74', respiratoryRate: 12, oxygenSaturation: 99, temperature: 98.3, hrvScore: 74 },
      { timestamp: '2025-04-02T08:00:00', heartRate: 67, bloodPressure: '117/75', respiratoryRate: 13, oxygenSaturation: 99, temperature: 98.3, hrvScore: 73 },
      { timestamp: '2025-04-02T12:00:00', heartRate: 69, bloodPressure: '119/76', respiratoryRate: 13, oxygenSaturation: 98, temperature: 98.4, hrvScore: 71 },
      { timestamp: '2025-04-02T16:00:00', heartRate: 71, bloodPressure: '121/77', respiratoryRate: 14, oxygenSaturation: 98, temperature: 98.5, hrvScore: 69 },
    ],
    sleepData: [
      { date: '2025-04-01', hoursSlept: 7.8, deepSleepPercentage: 24, remSleepPercentage: 30, sleepQualityScore: 78 },
      { date: '2025-04-02', hoursSlept: 8.2, deepSleepPercentage: 26, remSleepPercentage: 32, sleepQualityScore: 82 },
    ],
    recoveryMetrics: {
      painLevel: 5,
      mobilityScore: 70,
      energyLevel: 65,
      mentalWellnessScore: 80,
      inflammationMarkers: 38,
      recoveryProgress: 62
    },
    healingRituals: [
      { name: 'Guided Imagery Session', compliance: 85, effectivenessScore: 80 },
      { name: 'Gentle Yoga Flow', compliance: 95, effectivenessScore: 90 },
      { name: 'Nature Sound Therapy', compliance: 75, effectivenessScore: 70 }
    ],
    communityConnections: 7,
    environmentalExposure: {
      naturalLightHours: 5.5,
      outdoorTimeHours: 2.0,
      airQualityExposure: 'Good'
    }
  },
  {
    id: 'p003',
    name: 'Michael Chen',
    age: 58,
    condition: 'Cardiac Rehabilitation',
    treatmentStart: '2025-03-05',
    vitals: [
      { timestamp: '2025-04-01T08:00:00', heartRate: 65, bloodPressure: '132/85', respiratoryRate: 14, oxygenSaturation: 96, temperature: 98.6, hrvScore: 60 },
      { timestamp: '2025-04-01T12:00:00', heartRate: 68, bloodPressure: '135/87', respiratoryRate: 15, oxygenSaturation: 95, temperature: 98.7, hrvScore: 58 },
      { timestamp: '2025-04-01T16:00:00', heartRate: 70, bloodPressure: '138/88', respiratoryRate: 16, oxygenSaturation: 95, temperature: 98.8, hrvScore: 56 },
      { timestamp: '2025-04-01T20:00:00', heartRate: 62, bloodPressure: '130/84', respiratoryRate: 14, oxygenSaturation: 96, temperature: 98.5, hrvScore: 62 },
      { timestamp: '2025-04-02T08:00:00', heartRate: 64, bloodPressure: '131/85', respiratoryRate: 14, oxygenSaturation: 96, temperature: 98.6, hrvScore: 61 },
      { timestamp: '2025-04-02T12:00:00', heartRate: 67, bloodPressure: '134/86', respiratoryRate: 15, oxygenSaturation: 95, temperature: 98.7, hrvScore: 59 },
      { timestamp: '2025-04-02T16:00:00', heartRate: 69, bloodPressure: '136/87', respiratoryRate: 15, oxygenSaturation: 95, temperature: 98.7, hrvScore: 57 },
    ],
    sleepData: [
      { date: '2025-04-01', hoursSlept: 6.8, deepSleepPercentage: 18, remSleepPercentage: 22, sleepQualityScore: 65 },
      { date: '2025-04-02', hoursSlept: 7.0, deepSleepPercentage: 20, remSleepPercentage: 24, sleepQualityScore: 68 },
    ],
    recoveryMetrics: {
      painLevel: 2,
      mobilityScore: 60,
      energyLevel: 55,
      mentalWellnessScore: 70,
      inflammationMarkers: 45,
      recoveryProgress: 50
    },
    healingRituals: [
      { name: 'Cardiac Exercise Routine', compliance: 95, effectivenessScore: 85 },
      { name: 'Stress Management Program', compliance: 80, effectivenessScore: 75 },
      { name: 'Heart-Healthy Nutrition Plan', compliance: 90, effectivenessScore: 80 }
    ],
    communityConnections: 4,
    environmentalExposure: {
      naturalLightHours: 3.5,
      outdoorTimeHours: 1.0,
      airQualityExposure: 'Moderate'
    }
  }
];