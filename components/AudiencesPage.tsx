import { useState } from 'react';
import { Users, Target, TrendingUp, Eye, ShoppingBag, Heart, X, MapPin, Calendar, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import '@/styles/AudiencesPage.css';

const AudiencesPage = () => {
  const [selectedAudience, setSelectedAudience] = useState<number | null>(null);
  const audiences = [
    {
      id: 1,
      name: 'Health-Conscious Millennials',
      size: 245000,
      growth: 15,
      engagement: 'High',
      conversionRate: 4.8,
      avgOrderValue: 72,
      topProducts: ['Centrum Multivitamin', 'Voltaren Natura'],
      demographics: { age: '25-34', gender: '60% Female', location: 'Urban' },
      icon: Heart,
      color: '#22ff00',
      details: {
        description: 'Young professionals focused on preventive health and wellness. Active on social media and responsive to health trends.',
        topLocations: ['Berlin', 'Munich', 'Paris', 'London'],
        purchaseFrequency: 'Every 2-3 months',
        preferredChannels: ['Mobile App', 'Social Media', 'Email'],
        lifetimeValue: '€420',
        churnRate: '12%',
        monthlyTrend: [
          { month: 'May', customers: 210000, revenue: 15120 },
          { month: 'Jun', customers: 218000, revenue: 15696 },
          { month: 'Jul', customers: 225000, revenue: 16200 },
          { month: 'Aug', customers: 232000, revenue: 16704 },
          { month: 'Sep', customers: 238000, revenue: 17136 },
          { month: 'Oct', customers: 245000, revenue: 17640 }
        ]
      }
    },
    {
      id: 2,
      name: 'Senior Care Seekers',
      size: 189000,
      growth: 8,
      engagement: 'Medium',
      conversionRate: 5.2,
      avgOrderValue: 85,
      topProducts: ['Parodontax', 'Corega'],
      demographics: { age: '55+', gender: '55% Female', location: 'Suburban' },
      icon: Users,
      color: '#3b82f6',
      details: {
        description: 'Mature customers seeking specialized oral and denture care products. High brand loyalty and repeat purchase rate.',
        topLocations: ['Frankfurt', 'Madrid', 'Rome', 'Manchester'],
        purchaseFrequency: 'Monthly',
        preferredChannels: ['Desktop', 'Phone', 'Email'],
        lifetimeValue: '€680',
        churnRate: '8%',
        monthlyTrend: [
          { month: 'May', customers: 175000, revenue: 14875 },
          { month: 'Jun', customers: 178000, revenue: 15130 },
          { month: 'Jul', customers: 181000, revenue: 15385 },
          { month: 'Aug', customers: 183000, revenue: 15555 },
          { month: 'Sep', customers: 186000, revenue: 15810 },
          { month: 'Oct', customers: 189000, revenue: 16065 }
        ]
      }
    },
    {
      id: 3,
      name: 'Active Lifestyle Enthusiasts',
      size: 312000,
      growth: 22,
      engagement: 'High',
      conversionRate: 4.2,
      avgOrderValue: 68,
      topProducts: ['Voltaren Natura', 'Centrum'],
      demographics: { age: '30-45', gender: '52% Male', location: 'Mixed' },
      icon: TrendingUp,
      color: '#a855f7',
      details: {
        description: 'Active individuals seeking pain relief and wellness products. Engaged with fitness and outdoor activities.',
        topLocations: ['Hamburg', 'Barcelona', 'Milan', 'Birmingham'],
        purchaseFrequency: 'Every 6-8 weeks',
        preferredChannels: ['Mobile App', 'Amazon Fresh', 'Subscribe & Save'],
        lifetimeValue: '€520',
        churnRate: '15%',
        monthlyTrend: [
          { month: 'May', customers: 255000, revenue: 17340 },
          { month: 'Jun', customers: 268000, revenue: 18224 },
          { month: 'Jul', customers: 278000, revenue: 18904 },
          { month: 'Aug', customers: 289000, revenue: 19652 },
          { month: 'Sep', customers: 301000, revenue: 20468 },
          { month: 'Oct', customers: 312000, revenue: 21216 }
        ]
      }
    },
    {
      id: 4,
      name: 'Dental Care Focused',
      size: 198000,
      growth: 12,
      engagement: 'High',
      conversionRate: 5.5,
      avgOrderValue: 58,
      topProducts: ['Sensodyne', 'Parodontax'],
      demographics: { age: '35-50', gender: '58% Female', location: 'Urban' },
      icon: Target,
      color: '#ec4899',
      details: {
        description: 'Customers with specific dental sensitivity needs. Highly engaged with product reviews and recommendations.',
        topLocations: ['Cologne', 'Valencia', 'Turin', 'Leeds'],
        purchaseFrequency: 'Every 4-6 weeks',
        preferredChannels: ['Mobile App', 'Desktop', 'Subscribe & Save'],
        lifetimeValue: '€385',
        churnRate: '10%',
        monthlyTrend: [
          { month: 'May', customers: 177000, revenue: 10266 },
          { month: 'Jun', customers: 182000, revenue: 10556 },
          { month: 'Jul', customers: 186000, revenue: 10788 },
          { month: 'Aug', customers: 190000, revenue: 11020 },
          { month: 'Sep', customers: 194000, revenue: 11252 },
          { month: 'Oct', customers: 198000, revenue: 11484 }
        ]
      }
    }
  ];

  const ageDistribution = [
    { age: '18-24', value: 12 },
    { age: '25-34', value: 28 },
    { age: '35-44', value: 24 },
    { age: '45-54', value: 18 },
    { age: '55+', value: 18 }
  ];

  const deviceUsage = [
    { name: 'Mobile', value: 58, color: '#22ff00' },
    { name: 'Desktop', value: 32, color: '#3b82f6' },
    { name: 'Tablet', value: 10, color: '#a855f7' }
  ];

  const purchaseBehavior = [
    { behavior: 'First-time Buyers', percentage: 35, value: 156000 },
    { behavior: 'Repeat Customers', percentage: 45, value: 201000 },
    { behavior: 'Loyal Advocates', percentage: 20, value: 89000 }
  ];

  const topInterests = [
    { interest: 'Health & Wellness', score: 95 },
    { interest: 'Fitness', score: 78 },
    { interest: 'Natural Products', score: 72 },
    { interest: 'Family Care', score: 68 },
    { interest: 'Beauty', score: 54 }
  ];

  return (
    <div className="audiences-page">
      <div className="audiences-header">
        <div>
          <h1>
            <Users size={32} className="header-icon" />
            Audiences
          </h1>
          <p className="audiences-subtitle">Understand and segment your customer base</p>
        </div>
        <button className="btn-primary">
          <Target size={20} />
          Create New Audience
        </button>
      </div>

      {/* Audience Segments */}
      <div className="audiences-grid">
        {audiences.map(audience => {
          const Icon = audience.icon;
          return (
            <div key={audience.id} className="audience-card glass-card">
              <div className="audience-header">
                <div className="audience-icon" style={{ backgroundColor: `${audience.color}20`, color: audience.color }}>
                  <Icon size={24} />
                </div>
                <span className={`engagement-badge ${audience.engagement.toLowerCase()}`}>
                  {audience.engagement} Engagement
                </span>
              </div>
              
              <h3 className="audience-name">{audience.name}</h3>
              
              <div className="audience-stats">
                <div className="stat-item">
                  <div className="stat-label">Audience Size</div>
                  <div className="stat-value">{(audience.size / 1000).toFixed(0)}K</div>
                  <div className="stat-change positive">+{audience.growth}%</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Conversion Rate</div>
                  <div className="stat-value">{audience.conversionRate}%</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Avg Order Value</div>
                  <div className="stat-value">€{audience.avgOrderValue}</div>
                </div>
              </div>

              <div className="audience-details">
                <div className="detail-section">
                  <div className="detail-label">Demographics</div>
                  <div className="detail-tags">
                    <span className="detail-tag">{audience.demographics.age}</span>
                    <span className="detail-tag">{audience.demographics.gender}</span>
                    <span className="detail-tag">{audience.demographics.location}</span>
                  </div>
                </div>
                
                <div className="detail-section">
                  <div className="detail-label">Top Products</div>
                  <div className="product-list">
                    {audience.topProducts.map((product, idx) => (
                      <div key={idx} className="product-item">
                        <ShoppingBag size={14} />
                        {product}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button className="audience-action" onClick={() => setSelectedAudience(audience.id)}>
                <Eye size={16} />
                View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* Audience Detail Modal */}
      {selectedAudience && (
        <div className="modal-overlay" onClick={() => setSelectedAudience(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const audience = audiences.find(a => a.id === selectedAudience);
              if (!audience) return null;
              const Icon = audience.icon;
              
              return (
                <>
                  <div className="modal-header">
                    <div className="modal-title-section">
                      <div className="modal-icon" style={{ backgroundColor: `${audience.color}20`, color: audience.color }}>
                        <Icon size={32} />
                      </div>
                      <div>
                        <h2>{audience.name}</h2>
                        <p className="modal-description">{audience.details.description}</p>
                      </div>
                    </div>
                    <button className="modal-close" onClick={() => setSelectedAudience(null)}>
                      <X size={24} />
                    </button>
                  </div>

                  <div className="modal-body">
                    {/* Key Metrics */}
                    <div className="modal-metrics">
                      <div className="modal-metric-card">
                        <Users size={20} className="metric-icon" />
                        <div className="metric-info">
                          <div className="metric-label">Audience Size</div>
                          <div className="metric-value">{(audience.size / 1000).toFixed(0)}K</div>
                          <div className="metric-change positive">+{audience.growth}%</div>
                        </div>
                      </div>
                      <div className="modal-metric-card">
                        <TrendingUp size={20} className="metric-icon" />
                        <div className="metric-info">
                          <div className="metric-label">Conversion Rate</div>
                          <div className="metric-value">{audience.conversionRate}%</div>
                        </div>
                      </div>
                      <div className="modal-metric-card">
                        <DollarSign size={20} className="metric-icon" />
                        <div className="metric-info">
                          <div className="metric-label">Avg Order Value</div>
                          <div className="metric-value">€{audience.avgOrderValue}</div>
                        </div>
                      </div>
                      <div className="modal-metric-card">
                        <DollarSign size={20} className="metric-icon" />
                        <div className="metric-info">
                          <div className="metric-label">Lifetime Value</div>
                          <div className="metric-value">{audience.details.lifetimeValue}</div>
                        </div>
                      </div>
                    </div>

                    {/* Growth Trend Chart */}
                    <div className="modal-chart-section">
                      <h3>Audience Growth Trend</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={audience.details.monthlyTrend}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="month" stroke="#888" />
                          <YAxis yAxisId="left" stroke="#888" />
                          <YAxis yAxisId="right" orientation="right" stroke="#888" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(20, 20, 20, 0.95)', 
                              border: '1px solid rgba(34, 255, 0, 0.2)',
                              borderRadius: '8px'
                            }} 
                          />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="customers" stroke={audience.color} strokeWidth={3} name="Customers" />
                          <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue (K€)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Details Grid */}
                    <div className="modal-details-grid">
                      <div className="modal-detail-card">
                        <MapPin size={20} className="detail-icon" />
                        <div>
                          <div className="detail-label">Top Locations</div>
                          <div className="detail-tags">
                            {audience.details.topLocations.map((loc, idx) => (
                              <span key={idx} className="detail-tag">{loc}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="modal-detail-card">
                        <Calendar size={20} className="detail-icon" />
                        <div>
                          <div className="detail-label">Purchase Frequency</div>
                          <div className="detail-value">{audience.details.purchaseFrequency}</div>
                        </div>
                      </div>

                      <div className="modal-detail-card">
                        <Target size={20} className="detail-icon" />
                        <div>
                          <div className="detail-label">Preferred Channels</div>
                          <div className="detail-tags">
                            {audience.details.preferredChannels.map((channel, idx) => (
                              <span key={idx} className="detail-tag">{channel}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="modal-detail-card">
                        <TrendingUp size={20} className="detail-icon" />
                        <div>
                          <div className="detail-label">Churn Rate</div>
                          <div className="detail-value">{audience.details.churnRate}</div>
                        </div>
                      </div>
                    </div>

                    {/* Top Products */}
                    <div className="modal-products-section">
                      <h3>Top Products</h3>
                      <div className="modal-products-list">
                        {audience.topProducts.map((product, idx) => (
                          <div key={idx} className="modal-product-item">
                            <ShoppingBag size={18} />
                            <span>{product}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Rest of the page */}

      {/* Analytics Section */}
      <div className="analytics-row">
        <div className="chart-section glass-card">
          <h2 className="section-title">Age Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="age" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(20, 20, 20, 0.95)', 
                  border: '1px solid rgba(34, 255, 0, 0.2)',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="value" fill="#22ff00" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section glass-card">
          <h2 className="section-title">Device Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceUsage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {deviceUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(20, 20, 20, 0.95)', 
                  border: '1px solid rgba(34, 255, 0, 0.2)',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Purchase Behavior */}
      <div className="behavior-section glass-card">
        <h2 className="section-title">Purchase Behavior</h2>
        <div className="behavior-grid">
          {purchaseBehavior.map((behavior, index) => (
            <div key={index} className="behavior-card">
              <div className="behavior-percentage">{behavior.percentage}%</div>
              <div className="behavior-name">{behavior.behavior}</div>
              <div className="behavior-value">{(behavior.value / 1000).toFixed(0)}K customers</div>
              <div className="behavior-bar">
                <div className="behavior-fill" style={{ width: `${behavior.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Interests */}
      <div className="interests-section glass-card">
        <h2 className="section-title">Top Audience Interests</h2>
        <div className="interests-list">
          {topInterests.map((interest, index) => (
            <div key={index} className="interest-item">
              <div className="interest-info">
                <span className="interest-rank">#{index + 1}</span>
                <span className="interest-name">{interest.interest}</span>
              </div>
              <div className="interest-score-container">
                <div className="interest-bar">
                  <div className="interest-fill" style={{ width: `${interest.score}%` }}></div>
                </div>
                <span className="interest-score">{interest.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudiencesPage;
