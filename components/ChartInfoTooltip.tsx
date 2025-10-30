import { Info } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '@/styles/ChartInfoTooltip.css';

interface ChartInfoTooltipProps {
  title: string;
  description: string;
  kpis: string[];
  challenges: string[];
}

const ChartInfoTooltip = ({ title, description, kpis, challenges }: ChartInfoTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (isVisible && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const tooltipWidth = 360;
        
        // Position below the button, aligned to the right of the button
        let left = rect.right - tooltipWidth;
        let top = rect.bottom + 8;
        
        // Ensure it doesn't go off the left edge
        if (left < 10) {
          left = 10;
        }
        
        // Ensure it doesn't go off the right edge
        if (left + tooltipWidth > window.innerWidth - 10) {
          left = window.innerWidth - tooltipWidth - 10;
        }
        
        setPosition({ top, left });
      }
    };

    updatePosition();
    
    if (isVisible) {
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible]);

  const tooltipContent = isVisible ? (
    <div 
      className="tooltip-content"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <h4 className="tooltip-title">{title}</h4>
      <p className="tooltip-description">{description}</p>
      
      <div className="tooltip-section">
        <strong>Key Metrics:</strong>
        <ul>
          {kpis.map((kpi, index) => (
            <li key={index}>{kpi}</li>
          ))}
        </ul>
      </div>
      
      <div className="tooltip-section">
        <strong>Business Challenges:</strong>
        <ul>
          {challenges.map((challenge, index) => (
            <li key={index}>{challenge}</li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="chart-info-tooltip-wrapper">
        <button
          ref={buttonRef}
          className="info-icon-button"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          onClick={() => setIsVisible(!isVisible)}
          aria-label="Chart information"
        >
          <Info size={18} />
        </button>
      </div>
      {tooltipContent && createPortal(tooltipContent, document.body)}
    </>
  );
};

export default ChartInfoTooltip;
