'use client'

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface FilterContextType {
  selectedDateRange: string;
  selectedCountry: string;
  selectedBrands: string[];
  selectedPlatforms: string[];
  selectedFormats: string[];
  setSelectedDateRange: (range: string) => void;
  setSelectedCountry: (country: string) => void;
  setSelectedBrands: (brands: string[]) => void;
  setSelectedPlatforms: (platforms: string[]) => void;
  setSelectedFormats: (formats: string[]) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 Days');
  const [selectedCountry, setSelectedCountry] = useState('All EU5');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['All']);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['All']);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['All']);

  return (
    <FilterContext.Provider
      value={{
        selectedDateRange,
        selectedCountry,
        selectedBrands,
        selectedPlatforms,
        selectedFormats,
        setSelectedDateRange,
        setSelectedCountry,
        setSelectedBrands,
        setSelectedPlatforms,
        setSelectedFormats,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
