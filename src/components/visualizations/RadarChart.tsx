import React from 'react';
import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  [key: string]: any;
}

interface RadarChartProps {
  data: DataPoint[];
  dataKeys: {
    key: string;
    color: string;
    name: string;
  }[];
  nameKey: string;
  title?: string;
  height?: number;
  className?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({
  data,
  dataKeys,
  nameKey,
  title,
  height = 300,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-neumorph-sm p-5 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey={nameKey} tick={{ fill: '#64748b', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
          
          {dataKeys.map((item, index) => (
            <Radar
              key={index}
              name={item.name}
              dataKey={item.key}
              stroke={item.color}
              fill={item.color}
              fillOpacity={0.4}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          ))}
          
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;