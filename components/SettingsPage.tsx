import { useState } from 'react';
import { Settings, Key, Bell, Shield, Database, Mail, Globe, Save, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import '@/styles/SettingsPage.css';

const SettingsPage = () => {
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [savedMessage, setSavedMessage] = useState('');

  const toggleApiKeyVisibility = (key: string) => {
    setShowApiKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSavedMessage('Settings saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const apiKeys = [
    {
      id: 'amazon-advertising',
      name: 'Amazon Advertising API',
      description: 'Access to Sponsored Products, Brands, and Display campaigns',
      placeholder: 'amzn.mws.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      status: 'connected',
      lastUsed: '2 hours ago'
    },
    {
      id: 'amazon-dsp',
      name: 'Amazon DSP API',
      description: 'Programmatic display and video advertising access',
      placeholder: 'dsp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      status: 'connected',
      lastUsed: '5 hours ago'
    },
    {
      id: 'amazon-amc',
      name: 'Amazon Marketing Cloud API',
      description: 'Advanced analytics and attribution data',
      placeholder: 'amc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      status: 'connected',
      lastUsed: '1 day ago'
    },
    {
      id: 'vendor-central',
      name: 'Vendor Central API',
      description: 'Sales, inventory, and order data access',
      placeholder: 'vc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      status: 'connected',
      lastUsed: '3 hours ago'
    },
    {
      id: 'seller-central',
      name: 'Seller Central API',
      description: 'Marketplace seller account integration',
      placeholder: 'sc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      status: 'not-connected',
      lastUsed: 'Never'
    }
  ];

  const notificationSettings = [
    { id: 'daily-report', label: 'Daily Performance Report', enabled: true },
    { id: 'budget-alerts', label: 'Budget Threshold Alerts', enabled: true },
    { id: 'campaign-alerts', label: 'Campaign Performance Alerts', enabled: true },
    { id: 'inventory-alerts', label: 'Inventory Level Warnings', enabled: false },
    { id: 'weekly-summary', label: 'Weekly Summary Email', enabled: true },
    { id: 'anomaly-detection', label: 'Anomaly Detection Alerts', enabled: true }
  ];

  const dataSettings = [
    { id: 'auto-refresh', label: 'Auto-refresh Dashboard', value: '5 minutes', options: ['1 minute', '5 minutes', '15 minutes', '30 minutes', 'Manual'] },
    { id: 'data-retention', label: 'Data Retention Period', value: '12 months', options: ['3 months', '6 months', '12 months', '24 months', 'Unlimited'] },
    { id: 'export-format', label: 'Default Export Format', value: 'CSV', options: ['CSV', 'Excel', 'JSON', 'PDF'] }
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <h1>
            <Settings size={32} className="header-icon" />
            Settings
          </h1>
          <p className="settings-subtitle">Manage your API keys, notifications, and preferences</p>
        </div>
        <button className="btn-save" onClick={handleSave}>
          <Save size={20} />
          Save Changes
        </button>
      </div>

      {savedMessage && (
        <div className="save-message">
          <Check size={20} />
          {savedMessage}
        </div>
      )}

      {/* API Keys Section */}
      <div className="settings-section">
        <div className="section-header">
          <Key size={24} className="section-icon" />
          <div>
            <h2>API Keys & Integrations</h2>
            <p>Manage your Amazon API credentials and integrations</p>
          </div>
        </div>

        <div className="api-keys-grid">
          {apiKeys.map(api => (
            <div key={api.id} className="api-key-card glass-card">
              <div className="api-key-header">
                <div>
                  <h3>{api.name}</h3>
                  <p className="api-description">{api.description}</p>
                </div>
                <span className={`status-badge ${api.status}`}>
                  {api.status === 'connected' ? (
                    <>
                      <Check size={14} />
                      Connected
                    </>
                  ) : (
                    <>
                      <AlertCircle size={14} />
                      Not Connected
                    </>
                  )}
                </span>
              </div>

              <div className="api-key-input-group">
                <input
                  type={showApiKeys[api.id] ? 'text' : 'password'}
                  placeholder={api.placeholder}
                  className="api-key-input"
                  defaultValue={api.status === 'connected' ? api.placeholder : ''}
                />
                <button
                  className="toggle-visibility"
                  onClick={() => toggleApiKeyVisibility(api.id)}
                >
                  {showApiKeys[api.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="api-key-footer">
                <span className="last-used">Last used: {api.lastUsed}</span>
                <button className="btn-test">Test Connection</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="settings-section">
        <div className="section-header">
          <Bell size={24} className="section-icon" />
          <div>
            <h2>Notifications</h2>
            <p>Configure email and in-app notification preferences</p>
          </div>
        </div>

        <div className="notifications-grid">
          {notificationSettings.map(setting => (
            <div key={setting.id} className="notification-item">
              <div className="notification-info">
                <h4>{setting.label}</h4>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked={setting.enabled} />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Data & Display Settings */}
      <div className="settings-section">
        <div className="section-header">
          <Database size={24} className="section-icon" />
          <div>
            <h2>Data & Display</h2>
            <p>Customize data refresh rates and display preferences</p>
          </div>
        </div>

        <div className="data-settings-grid">
          {dataSettings.map(setting => (
            <div key={setting.id} className="data-setting-item">
              <label className="setting-label">{setting.label}</label>
              <select className="setting-select" defaultValue={setting.value}>
                {setting.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Email Settings */}
      <div className="settings-section">
        <div className="section-header">
          <Mail size={24} className="section-icon" />
          <div>
            <h2>Email Settings</h2>
            <p>Configure email recipients and delivery preferences</p>
          </div>
        </div>

        <div className="email-settings">
          <div className="email-input-group">
            <label>Primary Email</label>
            <input type="email" placeholder="your.email@haleon.com" defaultValue="marketing@haleon.com" />
          </div>
          <div className="email-input-group">
            <label>CC Recipients (comma-separated)</label>
            <input type="text" placeholder="email1@haleon.com, email2@haleon.com" />
          </div>
          <div className="email-input-group">
            <label>Report Delivery Time</label>
            <select>
              <option>08:00 AM</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>12:00 PM</option>
              <option>06:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="settings-section">
        <div className="section-header">
          <Globe size={24} className="section-icon" />
          <div>
            <h2>Regional Settings</h2>
            <p>Set your timezone, currency, and language preferences</p>
          </div>
        </div>

        <div className="regional-settings-grid">
          <div className="regional-setting-item">
            <label>Timezone</label>
            <select>
              <option>UTC+01:00 (Central European Time)</option>
              <option>UTC+00:00 (GMT)</option>
              <option>UTC-05:00 (Eastern Time)</option>
              <option>UTC-08:00 (Pacific Time)</option>
            </select>
          </div>
          <div className="regional-setting-item">
            <label>Currency</label>
            <select>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>USD ($)</option>
            </select>
          </div>
          <div className="regional-setting-item">
            <label>Language</label>
            <select>
              <option>English</option>
              <option>Deutsch</option>
              <option>Français</option>
              <option>Español</option>
              <option>Italiano</option>
            </select>
          </div>
          <div className="regional-setting-item">
            <label>Date Format</label>
            <select>
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="settings-section">
        <div className="section-header">
          <Shield size={24} className="section-icon" />
          <div>
            <h2>Security</h2>
            <p>Manage security and access control settings</p>
          </div>
        </div>

        <div className="security-settings">
          <div className="security-item">
            <div>
              <h4>Two-Factor Authentication</h4>
              <p className="security-description">Add an extra layer of security to your account</p>
            </div>
            <button className="btn-secondary">Enable 2FA</button>
          </div>
          <div className="security-item">
            <div>
              <h4>Session Timeout</h4>
              <p className="security-description">Automatically log out after period of inactivity</p>
            </div>
            <select className="security-select">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>4 hours</option>
              <option>Never</option>
            </select>
          </div>
          <div className="security-item">
            <div>
              <h4>API Access Logs</h4>
              <p className="security-description">View recent API access and activity logs</p>
            </div>
            <button className="btn-secondary">View Logs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
