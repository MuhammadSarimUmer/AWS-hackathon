import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockPatientData } from '../data/mockPatientData';
import { mockEnvironmentalData } from '../data/mockEnvironmentalData';
import { mockCommunityData } from '../data/mockCommunityData';

interface DataContextType {
  patientData: any[];
  environmentalData: any[];
  communityData: any[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [patientData, setPatientData] = useState<any[]>([]);
  const [environmentalData, setEnvironmentalData] = useState<any[]>([]);
  const [communityData, setCommunityData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    try {
      setIsLoading(true);
      // In a real application, these would be API calls
      // For now, we're using mock data
      setTimeout(() => {
        setPatientData(mockPatientData);
        setEnvironmentalData(mockEnvironmentalData);
        setCommunityData(mockCommunityData);
        setIsLoading(false);
      }, 1000); // Simulate API delay
    } catch (err) {
      setError('Failed to fetch data');
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        patientData,
        environmentalData,
        communityData,
        isLoading,
        error,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};