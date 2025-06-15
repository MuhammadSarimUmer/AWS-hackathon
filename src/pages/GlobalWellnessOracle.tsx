import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import { MessageCircle, Send, AlertCircle, Leaf, Brain, Activity, Moon, Zap, Bookmark, BookmarkCheck, Users } from 'lucide-react';

const GlobalWellnessOracle: React.FC = () => {
  const { patientData, environmentalData, communityData, isLoading } = useData();
  const [messages, setMessages] = useState<Array<{text: string; sender: 'user' | 'oracle'; timestamp: Date; isSaved?: boolean}>>([
    {
      text: "Hello! I'm your Wellness Oracle, here to provide personalized advice based on your health data, community insights, and environmental conditions. How can I assist you today?",
      sender: 'oracle',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [savedInsights, setSavedInsights] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Suggested questions
  const suggestedQuestions = [
    "How can I improve my sleep quality?",
    "What environmental factors affect my recovery most?",
    "Which community rituals would benefit me?",
    "How do my vitals correlate with air quality?",
    "What's the best time for my healing practices?",
    "Give me a quick health summary",
    "What should I focus on today?"
  ];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const generateQuickInsights = () => {
    const patient = patientData[0];
    const env = environmentalData[0];
    
    return `🔍 **Quick Health Insights**

📊 **Current Status:**
• Recovery Progress: ${patient?.recoveryMetrics.recoveryProgress}% (${patient?.recoveryMetrics.recoveryProgress > 70 ? 'Excellent' : patient?.recoveryMetrics.recoveryProgress > 50 ? 'Good' : 'Needs Attention'})
• Energy Level: ${patient?.recoveryMetrics.energyLevel}/100
• Pain Level: ${patient?.recoveryMetrics.painLevel}/10

🌿 **Environmental Factors:**
• Air Quality: ${env?.measurements[0].airQuality.aqi} AQI (${env?.measurements[0].airQuality.aqi < 50 ? 'Good' : env?.measurements[0].airQuality.aqi < 100 ? 'Moderate' : 'Poor'})
• Natural Light: ${patient?.environmentalExposure.naturalLightHours}h/day
• Temperature: ${env?.measurements[0].temperature}°C

💡 **Today's Focus:**
${patient?.recoveryMetrics.painLevel > 5 ? '• Prioritize pain management activities' : ''}
${patient?.recoveryMetrics.energyLevel < 60 ? '• Focus on energy-boosting practices' : ''}
${env?.measurements[0].airQuality.aqi > 100 ? '• Use air purifier and limit outdoor activities' : ''}
• Join community support activities for mental wellness

🎯 **Recommended Action:**
${patient?.recoveryMetrics.recoveryProgress < 50 ? 'Schedule a consultation with your healthcare provider' : 'Continue with current recovery plan and monitor progress'}`;
  };
  
  const generateResponse = (query: string) => {
    // Enhanced AI response generation with more context
    const responseOptions = [
      {
        trigger: 'sleep',
        response: `Based on your sleep data, I notice your deep sleep percentage is only ${patientData[0]?.sleepData[0].deepSleepPercentage}%. To improve sleep quality, try:
1. Reducing blue light exposure 2 hours before bed
2. Creating a ritual with the Forest Ambience sound environment
3. Ensuring your bedroom has proper air circulation (current indoor air quality is ${environmentalData[0]?.measurements[0].airQuality.aqi} AQI)
4. Joining the community evening meditation ritual, which has shown to improve deep sleep by 18% among participants with similar profiles.

💡 **Pro Tip:** Your sleep quality correlates 76% with your recovery progress. Improving sleep by 1 hour could boost recovery by 12%.`
      },
      {
        trigger: 'environmental',
        response: `The most significant environmental factors affecting your recovery are:
1. Air Quality: Current reading of ${environmentalData[0]?.measurements[0].airQuality.aqi} AQI (moderate)
2. Natural Light Exposure: You're currently getting ${patientData[0]?.environmentalExposure.naturalLightHours} hours daily (optimal is 5-6 hours)
3. Negative Ion Concentration: ${environmentalData[0]?.measurements[0].bioactiveElements.negativeIonDensity} ions/cm³

I recommend increasing your time at the Forest Retreat Center, which has significantly better readings across all metrics. Specifically, spending 30 more minutes there daily could improve your recovery metrics by approximately 12% based on community data patterns.

🌱 **Environmental Impact Score:** ${Math.round((100 - environmentalData[0]?.measurements[0].airQuality.aqi) * 0.8)}/100`
      },
      {
        trigger: 'ritual',
        response: `Based on your ${patientData[0]?.condition} and current recovery metrics, these community rituals would be most beneficial:

1. ${communityData[0]?.groupRituals[0].name} (${communityData[0]?.groupRituals[0].schedule}) - Particularly helpful for your inflammation markers
2. Heart Rhythm Synchronization (Daily at 7:00 AM) - Would support your cardiovascular recovery
3. Pain Relief Meditation (Daily at 9:00 AM) - Shown to reduce pain levels by 15% among similar patients

The ${communityData[0]?.groupRituals[0].name} has the highest compatibility score (82%) with your current healing needs.

🤝 **Community Connection:** You're part of a network of ${communityData[0]?.activityMetrics.dailyActiveMembers} active members who can provide support and motivation.`
      },
      {
        trigger: 'vitals',
        response: `I've analyzed the correlation between your vital signs and air quality:

1. Heart Rate Variability shows a 68% positive correlation with air quality improvements
2. Respiratory rate decreases by approximately 1-2 breaths per minute when air quality index improves by 10 points
3. Your inflammation markers show the strongest correlation with air pollutant levels (76% correlation coefficient)

The most pronounced effect occurs between 2-4 hours after air quality changes. I recommend using the air purifier in adaptive mode during periods of poor air quality (AQI > 50).

📈 **Current Vital Trends:**
• HRV: ${patientData[0]?.vitals[0].hrvScore} (${patientData[0]?.vitals[0].hrvScore > 50 ? 'Good' : 'Needs improvement'})
• Heart Rate: ${patientData[0]?.vitals[0].heartRate} bpm
• Oxygen Saturation: ${patientData[0]?.vitals[0].oxygenSaturation}%`
      },
      {
        trigger: 'time',
        response: `Based on your chronobiology patterns and vital sign fluctuations:

Optimal times for your healing practices are:
- Physical therapy: 10:00-11:30 AM (when your mobility metrics peak)
- Mental wellness activities: 3:00-5:00 PM (when your cognitive metrics are highest)
- Meditation: 7:30-8:30 PM (when your HRV is most responsive)

Your body shows particular receptivity to healing interventions on Tuesday and Saturday mornings, based on pattern analysis of your recovery metrics.

⏰ **Next Optimal Session:** ${new Date().getDay() === 2 || new Date().getDay() === 6 ? 'Today is optimal for healing practices!' : 'Next optimal day: ' + (new Date().getDay() === 1 ? 'Tuesday' : 'Saturday')}`
      },
      {
        trigger: 'summary',
        response: generateQuickInsights()
      },
      {
        trigger: 'focus',
        response: `🎯 **Today's Focus Areas**

Based on your current metrics, here's what you should prioritize today:

${patientData[0]?.recoveryMetrics.painLevel > 5 ? '🔥 **Pain Management Priority**\n• Use the pain relief meditation at 9:00 AM\n• Apply heat therapy for 20 minutes\n• Join the community pain support group\n\n' : ''}
${patientData[0]?.recoveryMetrics.energyLevel < 60 ? '⚡ **Energy Boost Focus**\n• Take a 15-minute walk in natural light\n• Practice the energy restoration ritual\n• Consume energy-supporting nutrition\n\n' : ''}
${patientData[0]?.recoveryMetrics.mentalWellnessScore < 75 ? '🧠 **Mental Wellness**\n• Join the gratitude circle at 6:00 PM\n• Practice 10 minutes of mindfulness\n• Connect with 2 community members\n\n' : ''}
🌿 **Environmental Optimization:**
• Spend 30 minutes at the Forest Retreat Center
• Use air purifier during peak pollution hours
• Ensure proper ventilation in your space

💪 **Recovery Milestone:** You're ${100 - patientData[0]?.recoveryMetrics.recoveryProgress}% away from your next recovery milestone!`
      },
      {
        trigger: 'default',
        response: `Based on my analysis of your health data and environmental conditions, I can offer these insights:

1. Your recovery progress is at ${patientData[0]?.recoveryMetrics.recoveryProgress}%, which is 7% above average for patients with similar conditions at this stage
2. Your environmental exposure could be optimized - particularly natural light (currently ${patientData[0]?.environmentalExposure.naturalLightHours} hours daily)
3. Community support shows strong correlation with your mental wellness scores

Would you like specific recommendations about sleep quality, environmental factors, community rituals, vital correlations, optimal timing for healing practices, or a quick health summary?`
      }
    ];
    
    // Find matching response or use default
    const lowerQuery = query.toLowerCase();
    const responseOption = responseOptions.find(option => 
      lowerQuery.includes(option.trigger)
    ) || responseOptions.find(option => option.trigger === 'default');
    
    return responseOption?.response || "I don't have enough information to answer that question. Could you provide more details?";
  };
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = {
      text: input,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      const response = generateResponse(input);
      
      const oracleMessage = {
        text: response,
        sender: 'oracle' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, oracleMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleQuickInsights = () => {
    const insights = generateQuickInsights();
    const oracleMessage = {
      text: insights,
      sender: 'oracle' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, oracleMessage]);
  };

  const toggleSaveInsight = (messageIndex: number) => {
    const message = messages[messageIndex];
    if (message.sender === 'oracle') {
      if (savedInsights.includes(message.text)) {
        setSavedInsights(prev => prev.filter(text => text !== message.text));
      } else {
        setSavedInsights(prev => [...prev, message.text]);
      }
      
      // Update the message's saved status
      setMessages(prev => prev.map((msg, idx) => 
        idx === messageIndex ? { ...msg, isSaved: !msg.isSaved } : msg
      ));
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-36 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Wellness Oracle</h1>
          <p className="text-gray-600">AI-powered insights from your health, community, and environmental data</p>
        </div>
        <motion.button
          onClick={handleQuickInsights}
          className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap size={20} />
          <span>Quick Insights</span>
        </motion.button>
      </motion.div>

      {/* Oracle Interface */}
      <motion.div 
        className="bg-white rounded-xl shadow-neumorph h-[600px] flex flex-col"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Oracle Header */}
        <div className="p-4 border-b flex items-center">
          <div className="h-12 w-12 bg-accent-500 rounded-full flex items-center justify-center text-white mr-4">
            <MessageCircle size={24} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">Wellness Oracle</h2>
            <p className="text-sm text-gray-500">Contextual health & wellness advisor</p>
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-lg relative ${
                  message.sender === 'user' 
                    ? 'bg-primary-500 text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                <div className={`flex items-center justify-between mt-2 ${
                  message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                }`}>
                  <p className="text-xs">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {message.sender === 'oracle' && (
                    <button
                      onClick={() => toggleSaveInsight(index)}
                      className={`ml-2 p-1 rounded hover:bg-opacity-20 ${
                        message.isSaved 
                          ? 'text-yellow-500 hover:bg-yellow-500' 
                          : 'hover:bg-gray-500'
                      }`}
                      title={message.isSaved ? 'Remove from saved' : 'Save insight'}
                    >
                      {message.isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggested Questions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-1 bg-white text-primary-600 text-sm rounded-full border border-primary-200 hover:bg-primary-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about your health, environment, or community..."
            className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={input.trim() === ''}
            className={`ml-2 p-2 rounded-full ${
              input.trim() === '' 
                ? 'bg-gray-200 text-gray-400' 
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </motion.div>

      {/* Data Sources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Oracle Knowledge Sources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-neumorph-sm p-5 border-t-4 border-primary-500">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mr-3">
                <Activity size={20} />
              </div>
              <h3 className="font-medium text-gray-800">Health Data</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Vital Readings</span>
                <span className="font-medium">{patientData[0]?.vitals.length} entries</span>
              </li>
              <li className="flex justify-between">
                <span>Sleep Metrics</span>
                <span className="font-medium">{patientData[0]?.sleepData.length} entries</span>
              </li>
              <li className="flex justify-between">
                <span>Recovery Indicators</span>
                <span className="font-medium">6 metrics</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-neumorph-sm p-5 border-t-4 border-secondary-500">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-500 mr-3">
                <Leaf size={20} />
              </div>
              <h3 className="font-medium text-gray-800">Environmental Data</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Locations</span>
                <span className="font-medium">{environmentalData.length}</span>
              </li>
              <li className="flex justify-between">
                <span>Air Quality Readings</span>
                <span className="font-medium">{environmentalData[0]?.measurements.length * environmentalData.length} entries</span>
              </li>
              <li className="flex justify-between">
                <span>Biophilic Elements</span>
                <span className="font-medium">5 metrics</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-neumorph-sm p-5 border-t-4 border-accent-500">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-accent-100 rounded-full flex items-center justify-center text-accent-500 mr-3">
                <Users size={20} />
              </div>
              <h3 className="font-medium text-gray-800">Community Insights</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Communities</span>
                <span className="font-medium">{communityData.length}</span>
              </li>
              <li className="flex justify-between">
                <span>Group Rituals</span>
                <span className="font-medium">{communityData.reduce((sum, comm) => sum + comm.groupRituals.length, 0)}</span>
              </li>
              <li className="flex justify-between">
                <span>Support Actions</span>
                <span className="font-medium">{communityData.reduce((sum, comm) => sum + comm.supportActions.length, 0)}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-neumorph-sm p-5 border-t-4 border-indigo-500">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 mr-3">
                <Brain size={20} />
              </div>
              <h3 className="font-medium text-gray-800">Knowledge Graph</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Research Papers</span>
                <span className="font-medium">2,850+</span>
              </li>
              <li className="flex justify-between">
                <span>Clinical Guidelines</span>
                <span className="font-medium">142</span>
              </li>
              <li className="flex justify-between">
                <span>Healing Protocols</span>
                <span className="font-medium">348</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Featured Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Activity className="text-primary-500 mr-2" size={20} />
            <h3 className="font-medium text-primary-700">Recovery Priority</h3>
          </div>
          
          <p className="text-gray-700 mb-3">
            Based on your latest metrics, focus on inflammation reduction this week.
          </p>
          
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Recommended Action</h4>
            <p className="text-sm text-gray-600">
              Join the "Anti-Inflammatory Nutrition" workshop on Thursday at 6PM with 24 others in similar recovery stages.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Leaf className="text-secondary-500 mr-2" size={20} />
            <h3 className="font-medium text-secondary-700">Environmental Insight</h3>
          </div>
          
          <p className="text-gray-700 mb-3">
            Air quality drops between 4-6PM in your area, affecting recovery metrics.
          </p>
          
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Recommended Action</h4>
            <p className="text-sm text-gray-600">
              Schedule indoor activities during this window and use purifier on high setting to maintain optimal healing environment.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl shadow-neumorph-sm p-5">
          <div className="flex items-center mb-4">
            <Moon className="text-accent-500 mr-2" size={20} />
            <h3 className="font-medium text-accent-700">Sleep Optimization</h3>
          </div>
          
          <p className="text-gray-700 mb-3">
            Your deep sleep is 22% below optimal for your recovery stage.
          </p>
          
          <div className="p-3 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-1">Recommended Action</h4>
            <p className="text-sm text-gray-600">
              Try the 10-minute Forest Sound meditation before bed, which improved deep sleep by 28% for similar patients.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3 text-sm text-gray-600">
        <AlertCircle className="text-yellow-500 mt-0.5 flex-shrink-0" size={16} />
        <p>
          The Wellness Oracle provides general guidance based on available data and is not a substitute for 
          professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers 
          with questions about medical conditions.
        </p>
      </div>
    </div>
  );
};

export default GlobalWellnessOracle;