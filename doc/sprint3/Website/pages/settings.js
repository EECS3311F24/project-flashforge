import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Select from 'react-dropdown-select';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  useEffect(() => {
    // Load dark mode and preferences from localStorage
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedDarkMode);

      const savedPreferences = JSON.parse(localStorage.getItem('preferences')) || [];
      setSelectedPreferences(savedPreferences);
    }
  }, []);

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode);
      if (darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }, [darkMode]);

  const options = [
    { id: 'Software Design', name: 'Software Design' },
    { id: 'Java Basics', name: 'Java Basics' },
    { id: 'Algorithms', name: 'Algorithms' },
    { id: 'Data Structures', name: 'Data Structures' },
  ];

  const handlePreferencesChange = (values) => {
    setSelectedPreferences(values.map((option) => option.name));
    localStorage.setItem('preferences', JSON.stringify(values.map((option) => option.name)));
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <p>Adjust your preferences here.</p>

      {/* Dark mode toggle */}
      <div className="settings-header">
        <h3>THEME</h3>
        <div>————————————————————</div>
        <div className="setting">
          <label htmlFor="darkMode">Enable Dark Mode</label>
          <input
            type="checkbox"
            id="darkMode"
            checked={darkMode}
            onChange={handleDarkModeToggle}
          />
        </div>

        <h3>PREFERENCES</h3>
        <div>————————————————————</div>
        <div className="dropdown-text">
          <div className="dropdown">
            Course Preferences:
            <Select
              name="select"
              options={options}
              labelField="name"
              valueField="id"
              multi
              values={options.filter((option) =>
                selectedPreferences.includes(option.name)
              )}
              onChange={handlePreferencesChange}
            />
            
          </div>
          
        </div>
        
      </div>
      <div className="sidebar"><Navbar /></div>
    </div>
  );
}
