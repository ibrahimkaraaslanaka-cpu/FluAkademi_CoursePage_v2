'use client';

import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-accent)]"
            style={{
                backgroundColor: theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(5, 17, 30, 0.2)'
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {/* Slider */}
            <span
                className="absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-md"
                style={{
                    left: theme === 'dark' ? '2px' : 'calc(100% - 26px)',
                    backgroundColor: theme === 'dark' ? '#FFBC0B' : '#05111E'
                }}
            >
                {theme === 'dark' ? (
                    <Moon className="w-3.5 h-3.5 text-black" />
                ) : (
                    <Sun className="w-3.5 h-3.5 text-[#FFBC0B]" />
                )}
            </span>
        </button>
    );
}
