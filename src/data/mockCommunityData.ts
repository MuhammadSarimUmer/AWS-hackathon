// Mock community data for simulating social connections and support
export const mockCommunityData = [
  {
    communityId: 'com001',
    name: 'Healing Together Network',
    members: 248,
    location: 'Global',
    focusAreas: ['Post-Surgery Support', 'Chronic Pain Management', 'Mental Wellness'],
    activityMetrics: {
      dailyActiveMembers: 85,
      weeklyActiveMembers: 172,
      monthlyActiveMembers: 220,
      averageSessionDuration: 34, // minutes
      engagementScore: 78 // 0-100 scale
    },
    supportActions: [
      {
        timestamp: '2025-04-01T09:15:00',
        actionType: 'Encouragement Message',
        fromMemberId: 'm042',
        toPatientId: 'p001',
        content: 'Sending healing thoughts your way today. Small steps lead to big progress!',
        impactScore: 7.8 // 0-10 scale
      },
      {
        timestamp: '2025-04-01T10:32:00',
        actionType: 'Shared Recovery Story',
        fromMemberId: 'm078',
        toPatientId: 'p002',
        content: 'I faced similar challenges last year. Here\'s what helped me most...',
        impactScore: 8.5
      },
      {
        timestamp: '2025-04-01T13:45:00',
        actionType: 'Healing Ritual Invitation',
        fromMemberId: 'm105',
        toPatientId: 'p003',
        content: 'Join our synchronized breathing session tomorrow at sunset. 50+ members participating.',
        impactScore: 8.2
      },
      {
        timestamp: '2025-04-01T15:20:00',
        actionType: 'Resource Sharing',
        fromMemberId: 'm061',
        toPatientId: 'p001',
        content: 'This article about recovery nutrition might be helpful for your journey.',
        impactScore: 7.3
      },
      {
        timestamp: '2025-04-01T18:05:00',
        actionType: 'Recovery Celebration',
        fromMemberId: 'm092',
        toPatientId: 'p002',
        content: 'Celebrating your 30-day milestone! The community is lighting candles in your honor tonight.',
        impactScore: 9.1
      }
    ],
    groupRituals: [
      {
        name: 'Global Healing Meditation',
        schedule: 'Daily at 8:00 AM',
        participants: 85,
        duration: 20, // minutes
        focusElement: 'Heart Harmony',
        cumulativeHealingScore: 1850 // cumulative participant-sessions
      },
      {
        name: 'Recovery Journey Sharing Circle',
        schedule: 'Wednesdays at 6:00 PM',
        participants: 42,
        duration: 60,
        focusElement: 'Emotional Release',
        cumulativeHealingScore: 960
      },
      {
        name: 'Nature Connection Walk',
        schedule: 'Saturdays at 10:00 AM',
        participants: 28,
        duration: 90,
        focusElement: 'Environmental Harmony',
        cumulativeHealingScore: 740
      }
    ],
    environmentalActions: [
      {
        actionType: 'Community Garden Project',
        participants: 42,
        locationId: 'loc002',
        impact: {
          biodiversityImprovement: 15, // percentage
          carbonSequestered: 2.8, // tons CO2 equivalent
          foodProduced: 820, // pounds
          wellnessScore: 75 // 0-100 scale
        }
      },
      {
        actionType: 'Air Quality Improvement Initiative',
        participants: 35,
        locationId: 'loc003',
        impact: {
          airQualityImprovement: 18,
          treesPlanted: 65,
          particlesReduced: 12.5, // percentage
          wellnessScore: 82
        }
      },
      {
        actionType: 'Healing Soundscape Creation',
        participants: 28,
        locationId: 'loc001',
        impact: {
          acousticQualityImprovement: 22,
          stressReductionEffect: 35, // percentage
          communityEngagement: 68, // 0-100 scale
          wellnessScore: 79
        }
      }
    ]
  },
  {
    communityId: 'com002',
    name: 'Cardiac Recovery Alliance',
    members: 185,
    location: 'Regional',
    focusAreas: ['Heart Health', 'Cardiac Rehabilitation', 'Lifestyle Medicine'],
    activityMetrics: {
      dailyActiveMembers: 62,
      weeklyActiveMembers: 120,
      monthlyActiveMembers: 168,
      averageSessionDuration: 28,
      engagementScore: 72
    },
    supportActions: [
      {
        timestamp: '2025-04-01T08:40:00',
        actionType: 'Heart Health Tip',
        fromMemberId: 'm112',
        toPatientId: 'p003',
        content: 'Try this gentle 5-minute breathing exercise before your morning walk.',
        impactScore: 7.4
      },
      {
        timestamp: '2025-04-01T11:15:00',
        actionType: 'Exercise Buddy Pairing',
        fromMemberId: 'm124',
        toPatientId: 'p003',
        content: 'Would you like to join our virtual cardiac rehab session tomorrow?',
        impactScore: 8.0
      },
      {
        timestamp: '2025-04-01T14:30:00',
        actionType: 'Recovery Milestone Recognition',
        fromMemberId: 'm098',
        toPatientId: 'p003',
        content: 'Congratulations on 30 days of consistent rehab exercises! Your heart thanks you.',
        impactScore: 8.6
      }
    ],
    groupRituals: [
      {
        name: 'Heart Rhythm Synchronization',
        schedule: 'Daily at 7:00 AM',
        participants: 58,
        duration: 15,
        focusElement: 'Cardiovascular Harmony',
        cumulativeHealingScore: 1240
      },
      {
        name: 'Cardiac Support Circle',
        schedule: 'Mondays at 5:00 PM',
        participants: 38,
        duration: 45,
        focusElement: 'Emotional Well-being',
        cumulativeHealingScore: 820
      }
    ],
    environmentalActions: [
      {
        actionType: 'Heart-Healthy Community Trail',
        participants: 32,
        locationId: 'loc002',
        impact: {
          physicalActivityIncrease: 28,
          communityConnectionImprovement: 35,
          accessToNatureImprovement: 42,
          wellnessScore: 76
        }
      },
      {
        actionType: 'Clean Air Initiative',
        participants: 25,
        locationId: 'loc003',
        impact: {
          airQualityImprovement: 15,
          cardiovascularBenefitScore: 38,
          communityAwarenessIncrease: 45,
          wellnessScore: 70
        }
      }
    ]
  },
  {
    communityId: 'com003',
    name: 'Pain Management Collective',
    members: 210,
    location: 'Global',
    focusAreas: ['Chronic Pain', 'Mind-Body Techniques', 'Holistic Approaches'],
    activityMetrics: {
      dailyActiveMembers: 72,
      weeklyActiveMembers: 145,
      monthlyActiveMembers: 182,
      averageSessionDuration: 32,
      engagementScore: 74
    },
    supportActions: [
      {
        timestamp: '2025-04-01T09:30:00',
        actionType: 'Pain Relief Technique',
        fromMemberId: 'm156',
        toPatientId: 'p002',
        content: 'This gentle movement sequence has been helping me with similar symptoms.',
        impactScore: 7.9
      },
      {
        timestamp: '2025-04-01T12:45:00',
        actionType: 'Emotional Support Message',
        fromMemberId: 'm172',
        toPatientId: 'p002',
        content: 'The invisible nature of chronic pain can be isolating. We see you and stand with you.',
        impactScore: 8.4
      },
      {
        timestamp: '2025-04-01T16:15:00',
        actionType: 'Mindfulness Audio Sharing',
        fromMemberId: 'm189',
        toPatientId: 'p002',
        content: 'I recorded this 10-minute mindfulness practice specifically for pain flare-ups.',
        impactScore: 8.2
      }
    ],
    groupRituals: [
      {
        name: 'Pain Relief Meditation',
        schedule: 'Daily at 9:00 AM and 8:00 PM',
        participants: 65,
        duration: 25,
        focusElement: 'Neural Path Rewiring',
        cumulativeHealingScore: 1480
      },
      {
        name: 'Gentle Movement Circle',
        schedule: 'Tuesdays and Fridays at 11:00 AM',
        participants: 48,
        duration: 40,
        focusElement: 'Mobility and Circulation',
        cumulativeHealingScore: 980
      }
    ],
    environmentalActions: [
      {
        actionType: 'Healing Garden Spaces',
        participants: 35,
        locationId: 'loc001',
        impact: {
          sensoryRichness: 45,
          painReductionScore: 28,
          accessibilityImprovement: 38,
          wellnessScore: 74
        }
      },
      {
        actionType: 'Eco-Therapy Sessions',
        participants: 28,
        locationId: 'loc002',
        impact: {
          natureCommunionScore: 78,
          painPerceptionImprovement: 32,
          mentalHealthBenefit: 42,
          wellnessScore: 82
        }
      }
    ]
  }
];