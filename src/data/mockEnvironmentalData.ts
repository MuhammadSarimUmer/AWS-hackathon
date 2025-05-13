// Mock environmental data for different locations
export const mockEnvironmentalData = [
  {
    locationId: 'loc001',
    name: 'Healing Center - Main Building',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    measurements: [
      {
        timestamp: '2025-04-01T08:00:00',
        airQuality: {
          aqi: 42, // Air Quality Index
          pm25: 10.2, // PM2.5 levels
          pm10: 18.5, // PM10 levels
          o3: 28.3, // Ozone levels
          co2: 420, // CO2 levels (ppm)
          voc: 310, // Volatile Organic Compounds (ppb)
        },
        temperature: 72.4, // Fahrenheit
        humidity: 45, // Percentage
        lightQuality: {
          intensity: 820, // Lux
          colorTemperature: 5200, // Kelvin
          naturalLightRatio: 0.75, // Ratio of natural to artificial
        },
        soundscape: {
          ambientNoiseLevel: 38, // dB
          predominantFrequency: 420, // Hz
          tranquilityScore: 78, // 0-100 score
        },
        bioactiveElements: {
          negativeIonDensity: 1200, // ions/cm³
          phytoncideLevel: 65, // arbitrary units
          terpenoidConcentration: 42, // ppb
        }
      },
      {
        timestamp: '2025-04-01T12:00:00',
        airQuality: {
          aqi: 45,
          pm25: 12.1,
          pm10: 19.8,
          o3: 30.2,
          co2: 450,
          voc: 330,
        },
        temperature: 74.8,
        humidity: 42,
        lightQuality: {
          intensity: 950,
          colorTemperature: 5500,
          naturalLightRatio: 0.85,
        },
        soundscape: {
          ambientNoiseLevel: 42,
          predominantFrequency: 440,
          tranquilityScore: 72,
        },
        bioactiveElements: {
          negativeIonDensity: 1100,
          phytoncideLevel: 60,
          terpenoidConcentration: 40,
        }
      },
      {
        timestamp: '2025-04-01T16:00:00',
        airQuality: {
          aqi: 48,
          pm25: 13.5,
          pm10: 21.2,
          o3: 32.5,
          co2: 480,
          voc: 350,
        },
        temperature: 76.2,
        humidity: 40,
        lightQuality: {
          intensity: 780,
          colorTemperature: 5000,
          naturalLightRatio: 0.70,
        },
        soundscape: {
          ambientNoiseLevel: 45,
          predominantFrequency: 460,
          tranquilityScore: 68,
        },
        bioactiveElements: {
          negativeIonDensity: 1000,
          phytoncideLevel: 55,
          terpenoidConcentration: 38,
        }
      }
    ],
    biophilicElements: {
      indoorPlantsCount: 42,
      plantSpeciesDiversity: 18,
      naturalMaterialsPercentage: 65,
      waterFeatures: 3,
      visibleSkyPercentage: 40,
    },
    energyBalance: {
      renewablePercentage: 75,
      carbonOffset: 12.5, // tons CO2 equivalent
      energyEfficiencyRating: 'A',
    },
    ecologicalFootprint: {
      waterUsage: 280, // gallons per day
      wasteRecyclingRate: 82, // percentage
      biodiversityIndexLocal: 68, // 0-100 score
    }
  },
  {
    locationId: 'loc002',
    name: 'Forest Retreat Center',
    coordinates: { lat: 37.8651, lng: -122.2431 },
    measurements: [
      {
        timestamp: '2025-04-01T08:00:00',
        airQuality: {
          aqi: 28,
          pm25: 5.2,
          pm10: 9.5,
          o3: 22.1,
          co2: 380,
          voc: 180,
        },
        temperature: 68.5,
        humidity: 58,
        lightQuality: {
          intensity: 750,
          colorTemperature: 4800,
          naturalLightRatio: 0.95,
        },
        soundscape: {
          ambientNoiseLevel: 32,
          predominantFrequency: 380,
          tranquilityScore: 92,
        },
        bioactiveElements: {
          negativeIonDensity: 2800,
          phytoncideLevel: 95,
          terpenoidConcentration: 85,
        }
      },
      {
        timestamp: '2025-04-01T12:00:00',
        airQuality: {
          aqi: 30,
          pm25: 5.8,
          pm10: 10.2,
          o3: 24.5,
          co2: 390,
          voc: 195,
        },
        temperature: 72.3,
        humidity: 55,
        lightQuality: {
          intensity: 920,
          colorTemperature: 5100,
          naturalLightRatio: 0.98,
        },
        soundscape: {
          ambientNoiseLevel: 34,
          predominantFrequency: 390,
          tranquilityScore: 90,
        },
        bioactiveElements: {
          negativeIonDensity: 2700,
          phytoncideLevel: 92,
          terpenoidConcentration: 82,
        }
      },
      {
        timestamp: '2025-04-01T16:00:00',
        airQuality: {
          aqi: 32,
          pm25: 6.5,
          pm10: 11.0,
          o3: 26.0,
          co2: 400,
          voc: 210,
        },
        temperature: 70.8,
        humidity: 60,
        lightQuality: {
          intensity: 680,
          colorTemperature: 4600,
          naturalLightRatio: 0.90,
        },
        soundscape: {
          ambientNoiseLevel: 35,
          predominantFrequency: 400,
          tranquilityScore: 88,
        },
        bioactiveElements: {
          negativeIonDensity: 2600,
          phytoncideLevel: 90,
          terpenoidConcentration: 80,
        }
      }
    ],
    biophilicElements: {
      indoorPlantsCount: 85,
      plantSpeciesDiversity: 32,
      naturalMaterialsPercentage: 92,
      waterFeatures: 5,
      visibleSkyPercentage: 75,
    },
    energyBalance: {
      renewablePercentage: 95,
      carbonOffset: 28.3,
      energyEfficiencyRating: 'A+',
    },
    ecologicalFootprint: {
      waterUsage: 180,
      wasteRecyclingRate: 95,
      biodiversityIndexLocal: 88,
    }
  },
  {
    locationId: 'loc003',
    name: 'Urban Healing Pod',
    coordinates: { lat: 37.7847, lng: -122.4093 },
    measurements: [
      {
        timestamp: '2025-04-01T08:00:00',
        airQuality: {
          aqi: 52,
          pm25: 15.2,
          pm10: 24.5,
          o3: 35.3,
          co2: 520,
          voc: 420,
        },
        temperature: 71.5,
        humidity: 38,
        lightQuality: {
          intensity: 780,
          colorTemperature: 4900,
          naturalLightRatio: 0.60,
        },
        soundscape: {
          ambientNoiseLevel: 48,
          predominantFrequency: 520,
          tranquilityScore: 62,
        },
        bioactiveElements: {
          negativeIonDensity: 800,
          phytoncideLevel: 40,
          terpenoidConcentration: 32,
        }
      },
      {
        timestamp: '2025-04-01T12:00:00',
        airQuality: {
          aqi: 56,
          pm25: 16.8,
          pm10: 26.3,
          o3: 37.8,
          co2: 550,
          voc: 450,
        },
        temperature: 74.2,
        humidity: 35,
        lightQuality: {
          intensity: 850,
          colorTemperature: 5200,
          naturalLightRatio: 0.65,
        },
        soundscape: {
          ambientNoiseLevel: 52,
          predominantFrequency: 540,
          tranquilityScore: 58,
        },
        bioactiveElements: {
          negativeIonDensity: 750,
          phytoncideLevel: 38,
          terpenoidConcentration: 30,
        }
      },
      {
        timestamp: '2025-04-01T16:00:00',
        airQuality: {
          aqi: 60,
          pm25: 18.5,
          pm10: 28.8,
          o3: 40.2,
          co2: 580,
          voc: 480,
        },
        temperature: 76.8,
        humidity: 32,
        lightQuality: {
          intensity: 720,
          colorTemperature: 5000,
          naturalLightRatio: 0.55,
        },
        soundscape: {
          ambientNoiseLevel: 55,
          predominantFrequency: 560,
          tranquilityScore: 55,
        },
        bioactiveElements: {
          negativeIonDensity: 700,
          phytoncideLevel: 35,
          terpenoidConcentration: 28,
        }
      }
    ],
    biophilicElements: {
      indoorPlantsCount: 28,
      plantSpeciesDiversity: 12,
      naturalMaterialsPercentage: 45,
      waterFeatures: 1,
      visibleSkyPercentage: 25,
    },
    energyBalance: {
      renewablePercentage: 60,
      carbonOffset: 8.2,
      energyEfficiencyRating: 'B',
    },
    ecologicalFootprint: {
      waterUsage: 350,
      wasteRecyclingRate: 70,
      biodiversityIndexLocal: 42,
    }
  }
];