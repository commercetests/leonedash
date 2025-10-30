// Utility to generate dynamic data based on filters

interface FilterState {
  selectedDateRange: string;
  selectedCountry: string;
  selectedBrands: string[];
  selectedPlatforms: string[];
  selectedFormats: string[];
}

// Brand multipliers for revenue/performance
const brandMultipliers: Record<string, number> = {
  'Centrum': 1.2,
  'Corega': 0.8,
  'Parodontax': 1.0,
  'Sensodyne': 1.3,
  'Voltaren Natura': 0.9,
};

// Country multipliers
const countryMultipliers: Record<string, number> = {
  'All EU5': 1.0,
  'Germany': 1.3,
  'France': 1.1,
  'Italy': 0.9,
  'Spain': 0.85,
  'United Kingdom': 1.2,
};

// Date range multipliers (affects data points count and values)
const dateRangeConfig: Record<string, { points: number, multiplier: number }> = {
  'Last 7 Days': { points: 7, multiplier: 0.2 },
  'Last 30 Days': { points: 6, multiplier: 1.0 },
  'Last 90 Days': { points: 12, multiplier: 2.8 },
  'This Month': { points: 4, multiplier: 0.9 },
  'Last Month': { points: 4, multiplier: 0.85 },
  'This Quarter': { points: 12, multiplier: 2.5 },
  'Custom': { points: 6, multiplier: 1.0 },
};

export const calculateMultiplier = (filters: FilterState): number => {
  let multiplier = 1.0;
  
  // Apply country multiplier
  multiplier *= countryMultipliers[filters.selectedCountry] || 1.0;
  
  // Apply brand multipliers (average if multiple selected)
  if (!filters.selectedBrands.includes('All') && filters.selectedBrands.length > 0) {
    const brandMult = filters.selectedBrands.reduce((sum, brand) => {
      return sum + (brandMultipliers[brand] || 1.0);
    }, 0) / filters.selectedBrands.length;
    multiplier *= brandMult;
  }
  
  // Apply date range multiplier
  const dateConfig = dateRangeConfig[filters.selectedDateRange];
  if (dateConfig) {
    multiplier *= dateConfig.multiplier;
  }
  
  // Apply platform/format filters (reduce if specific selections)
  if (!filters.selectedPlatforms.includes('All') && filters.selectedPlatforms.length > 0) {
    multiplier *= (0.7 + (filters.selectedPlatforms.length * 0.15));
  }
  
  if (!filters.selectedFormats.includes('All') && filters.selectedFormats.length > 0) {
    multiplier *= (0.8 + (filters.selectedFormats.length * 0.1));
  }
  
  return multiplier;
};

export const getDataPointsCount = (dateRange: string): number => {
  return dateRangeConfig[dateRange]?.points || 6;
};

export const generateMonthLabels = (count: number, dateRange: string): string[] => {
  if (dateRange === 'Last 7 Days') {
    return Array.from({ length: count }, (_, i) => `Day ${i + 1}`);
  }
  if (dateRange === 'Last 90 Days' || dateRange === 'This Quarter') {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].slice(0, count);
  }
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].slice(0, count);
};

export const generateWeekLabels = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => `W${i + 1}`);
};
