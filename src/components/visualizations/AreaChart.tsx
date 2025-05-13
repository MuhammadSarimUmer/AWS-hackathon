import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataPoint {
  [key: string]: any;
}

interface AreaChartProps {
  data: DataPoint[];
  areas: {
    key: string;
    color: string;
    name: string;
    fillOpacity?: number;
  }[];
  xAxisKey: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  title?: string;
  height?: number;
  grid?: boolean;
  stacked?: boolean;
  className?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  areas,
  xAxisKey,
  xAxisLabel,
  yAxisLabel,
  title,
  height = 300,
  grid = true,
  stacked = false,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-neumorph-sm p-5 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      )}
      
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          {grid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#94a3b8"
            label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -10 } : undefined}
          />
          <YAxis 
            stroke="#94a3b8"
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none'
            }} 
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          
          {areas.map((area, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={area.key}
              name={area.name}
              stroke={area.color}
              fill={area.color}
              fillOpacity={area.fillOpacity || 0.3}
              stackId={stacked ? "1" : undefined}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;