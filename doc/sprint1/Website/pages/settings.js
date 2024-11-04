import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

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

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <p>Adjust your preferences here.</p>

            {/* Dark mode toggle */}
            <div className="setting">
                <label htmlFor="darkMode">Enable Dark Mode</label>
                <input
                    type="checkbox"
                    id="darkMode"
                    checked={darkMode}
                    onChange={handleDarkModeToggle}
                />
                <div className="sidebar"><Navbar></Navbar></div>
            </div>
        </div>
    );
}
