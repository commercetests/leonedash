import { Calendar, MapPin, Package, Filter, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useFilters } from '../context/FilterContext';
import '@/styles/FilterBar.css';

const DSPFilterBar = () => {
  const {
    selectedDateRange,
    selectedCountry,
    selectedBrands,
    selectedFormats,
    setSelectedDateRange,
    setSelectedCountry,
    setSelectedBrands,
    setSelectedFormats,
  } = useFilters();
  
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setDateDropdownOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const brands = [
    { name: 'Centrum', logo: '/logos/centrum.png' },
    { name: 'Corega', logo: '/logos/corega.avif' },
    { name: 'Parodontax', logo: '/logos/parodontax.png' },
    { name: 'Sensodyne', logo: '/logos/senodyne.png' },
    { name: 'Voltaren Natura', logo: '/logos/voltanatura.avif' },
  ];

  const dateRanges = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Month', 'Last Month', 'This Quarter', 'Custom'];
  const countries = ['All EU5', 'Germany', 'France', 'Italy', 'Spain', 'United Kingdom'];
  const formats = [
    'All',
    'Display',
    'Video',
    'Audio',
    'Custom',
    'Amazon Live'
  ];

  const toggleSelection = (item: string, selectedItems: string[], setSelectedItems: (items: string[]) => void) => {
    if (item === 'All') {
      setSelectedItems(['All']);
    } else {
      const newSelection = selectedItems.includes(item)
        ? selectedItems.filter(i => i !== item && i !== 'All')
        : [...selectedItems.filter(i => i !== 'All'), item];
      setSelectedItems(newSelection.length === 0 ? ['All'] : newSelection);
    }
  };

  return (
    <div className="filter-bar glass-card">
      <div className="filter-header">
        <div className="filter-title">
          <Filter size={20} />
          <h3>Filters</h3>
        </div>
      </div>

      <div className="filters-grid">
        {/* Date Range Filter */}
        <div className="filter-group" ref={dateDropdownRef}>
          <label className="filter-label">
            <Calendar size={16} />
            Date Range
          </label>
          <div className="custom-dropdown">
            <button 
              className="dropdown-trigger"
              onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
            >
              <span>{selectedDateRange}</span>
              <ChevronDown size={16} className={dateDropdownOpen ? 'rotate' : ''} />
            </button>
            {dateDropdownOpen && (
              <div className="dropdown-menu">
                {dateRanges.map(range => (
                  <div
                    key={range}
                    className={`dropdown-item ${selectedDateRange === range ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedDateRange(range);
                      setDateDropdownOpen(false);
                    }}
                  >
                    {range}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Country Filter */}
        <div className="filter-group" ref={countryDropdownRef}>
          <label className="filter-label">
            <MapPin size={16} />
            Country
          </label>
          <div className="custom-dropdown">
            <button 
              className="dropdown-trigger"
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
            >
              <span>{selectedCountry}</span>
              <ChevronDown size={16} className={countryDropdownOpen ? 'rotate' : ''} />
            </button>
            {countryDropdownOpen && (
              <div className="dropdown-menu">
                {countries.map(country => (
                  <div
                    key={country}
                    className={`dropdown-item ${selectedCountry === country ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCountry(country);
                      setCountryDropdownOpen(false);
                    }}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="filter-group filter-group-wide">
          <label className="filter-label">
            <Package size={16} />
            Brand
          </label>
          <div className="brand-filters">
            <button
              className={`brand-chip ${selectedBrands.includes('All') ? 'active' : ''}`}
              onClick={() => toggleSelection('All', selectedBrands, setSelectedBrands)}
            >
              All Brands
            </button>
            {brands.map(brand => (
              <button
                key={brand.name}
                className={`brand-chip ${selectedBrands.includes(brand.name) ? 'active' : ''}`}
                onClick={() => toggleSelection(brand.name, selectedBrands, setSelectedBrands)}
              >
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
                <span>{brand.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Format Filter */}
        <div className="filter-group filter-group-wide">
          <label className="filter-label">
            <Filter size={16} />
            DSP Format
          </label>
          <div className="chip-group">
            {formats.map(format => (
              <button
                key={format}
                className={`filter-chip ${selectedFormats.includes(format) ? 'active' : ''}`}
                onClick={() => toggleSelection(format, selectedFormats, setSelectedFormats)}
              >
                {format}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSPFilterBar;
