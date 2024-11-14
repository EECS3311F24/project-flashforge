import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Select from 'react-dropdown-select';



export default function Settings() {
    const [darkMode, setDarkMode] = useState(false);

    // Ensure localStorage is accessed only in the browser
    useEffect(() => {
        // Check if we're running in the browser
        if (typeof window !== 'undefined') {
            const savedDarkMode = localStorage.getItem('darkMode') === 'true';
            setDarkMode(savedDarkMode);
        }
    }, []);

    // Toggle dark mode
    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    // Persist the dark mode preference
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
        {id: "EECS3311", name: 1},
        {id: "EECS3215", name: 2},
        {id: "EECS3421", name: 3},
        {id: "EECS3461", name: 4},
    ]

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <p>Adjust your preferences here.</p>

            {/* Dark mode toggle */}
            <div className="settings-header">
                THEME       
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
                PREFERENCES
                <div>————————————————————</div>      
                <div className="dropdown-text">
                <div className="dropdown">
                Course Preferences: <Select 
                    name="select"
                    options={options}
                    labelField="id"
                    valueField="name"
                    multi>   
                </Select>
                </div>
            </div>
            </div>
            <div className="sidebar"><Navbar></Navbar></div>
        </div>
        
    );
}
