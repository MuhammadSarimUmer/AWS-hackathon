// Patient Types
export interface VitalReading {
  timestamp: string;
  heartRate: number;
  bloodPressure: string;
  respiratoryRate: number;
  oxygenSaturation: number;
  temperature: number;
  hrvScore: number;
}

export interface SleepData {
  date: string;
  hoursSlept: number;
  deepSleepPercentage: number;
  remSleepPercentage: number;
  sleepQualityScore: number;
}

export interface RecoveryMetrics {
  painLevel: number;
  mobilityScore: number;
  energyLevel: number;
  mentalWellnessScore: number;
  inflammationMarkers: number;
  recoveryProgress: number;
}

export interface HealingRitual {
  name: string;
  compliance: number;
  effectivenessScore: number;
}

export interface EnvironmentalExposure {
  naturalLightHours: number;
  outdoorTimeHours: number;
  airQualityExposure: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  treatmentStart: string;
  vitals: VitalReading[];
  sleepData: SleepData[];
  recoveryMetrics: RecoveryMetrics;
  healingRituals: HealingRitual[];
  communityConnections: number;
  environmentalExposure: EnvironmentalExposure;
}

// Environmental Types
export interface AirQuality {
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  co2: number;
  voc: number;
}

export interface LightQuality {
  intensity: number;
  colorTemperature: number;
  naturalLightRatio: number;
}

export interface Soundscape {
  ambientNoiseLevel: number;
  predominantFrequency: number;
  tranquilityScore: number;
}

export interface BioactiveElements {
  negativeIonDensity: number;
  phytoncideLevel: number;
  terpenoidConcentration: number;
}

export interface EnvironmentalMeasurement {
  timestamp: string;
  airQuality: AirQuality;
  temperature: number;
  humidity: number;
  lightQuality: LightQuality;
  soundscape: Soundscape;
  bioactiveElements: BioactiveElements;
}

export interface BiophilicElements {
  indoorPlantsCount: number;
  plantSpeciesDiversity: number;
  naturalMaterialsPercentage: number;
  waterFeatures: number;
  visibleSkyPercentage: number;
}

export interface EnergyBalance {
  renewablePercentage: number;
  carbonOffset: number;
  energyEfficiencyRating: string;
}

export interface EcologicalFootprint {
  waterUsage: number;
  wasteRecyclingRate: number;
  biodiversityIndexLocal: number;
}

export interface EnvironmentalLocation {
  locationId: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  measurements: EnvironmentalMeasurement[];
  biophilicElements: BiophilicElements;
  energyBalance: EnergyBalance;
  ecologicalFootprint: EcologicalFootprint;
}

// Community Types
export interface ActivityMetrics {
  dailyActiveMembers: number;
  weeklyActiveMembers: number;
  monthlyActiveMembers: number;
  averageSessionDuration: number;
  engagementScore: number;
}

export interface SupportAction {
  timestamp: string;
  actionType: string;
  fromMemberId: string;
  toPatientId: string;
  content: string;
  impactScore: number;
}

export interface GroupRitual {
  name: string;
  schedule: string;
  participants: number;
  duration: number;
  focusElement: string;
  cumulativeHealingScore: number;
}

export interface EnvironmentalAction {
  actionType: string;
  participants: number;
  locationId: string;
  impact: Record<string, number>;
}

export interface Community {
  communityId: string;
  name: string;
  members: number;
  location: string;
  focusAreas: string[];
  activityMetrics: ActivityMetrics;
  supportActions: SupportAction[];
  groupRituals: GroupRitual[];
  environmentalActions: EnvironmentalAction[];
}