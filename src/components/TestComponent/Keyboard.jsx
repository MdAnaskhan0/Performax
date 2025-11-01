import React, { useState, useEffect } from 'react';
import {
    FaBackspace,
    FaArrowLeft,
    FaArrowRight,
    FaArrowUp,
    FaArrowDown,
    FaWindows
} from 'react-icons/fa';

const Keyboard = () => {
    const [pressedKeys, setPressedKeys] = useState(new Set());
    const [typedText, setTypedText] = useState('');
    const [keyCount, setKeyCount] = useState(0);

    const keyboardLayout = [
        // Row 1
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        // Row 2
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        // Row 3
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        // Row 4
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
        // Row 5
        ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↑', '↓', '→']
    ];

    const specialKeyIcons = {
        'Backspace': <FaBackspace size={14} />,
        'Tab': 'Tab',
        'CapsLock': 'Caps',
        'Enter': 'Enter',
        'Shift': 'Shift',
        'Ctrl': 'Ctrl',
        'Alt': 'Alt',
        'Win': <FaWindows size={12} />,
        'Space': 'Space',
        '←': <FaArrowLeft size={12} />,
        '↑': <FaArrowUp size={12} />,
        '↓': <FaArrowDown size={12} />,
        '→': <FaArrowRight size={12} />
    };

    const getKeyWidth = (key) => {
        const wideKeys = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'Shift', 'Space'];
        const extraWideKeys = ['Space'];

        if (extraWideKeys.includes(key)) return 'w-64';
        if (wideKeys.includes(key)) return 'w-20';
        return 'w-12';
    };

    const getKeyDisplay = (key) => {
        return specialKeyIcons[key] || key;
    };

    const handleKeyDown = (event) => {
        event.preventDefault();
        const key = event.key;
        let displayKey = key;

        // Handle special cases
        if (key === ' ') displayKey = 'Space';
        if (key === 'ArrowLeft') displayKey = '←';
        if (key === 'ArrowUp') displayKey = '↑';
        if (key === 'ArrowDown') displayKey = '↓';
        if (key === 'ArrowRight') displayKey = '→';
        if (key === 'Control') displayKey = 'Ctrl';
        if (key === 'Meta') displayKey = 'Win';
        if (key === 'Alt') displayKey = 'Alt';
        if (key === 'Enter') displayKey = 'Enter';
        if (key === 'Backspace') displayKey = 'Backspace';
        if (key === 'Tab') {
            event.preventDefault(); // Prevent default tab behavior
            displayKey = 'Tab';
        }
        if (key === 'CapsLock') displayKey = 'CapsLock';
        if (key === 'Shift') displayKey = 'Shift';
        if (key === 'Escape') displayKey = 'Esc';

        setPressedKeys(prev => new Set(prev).add(displayKey));

        if (key.length === 1 || key === ' ') {
            setTypedText(prev => prev + key);
            setKeyCount(prev => prev + 1);
        } else if (key === 'Backspace') {
            setTypedText(prev => prev.slice(0, -1));
        }
    };

    const handleKeyUp = (event) => {
        const key = event.key;
        let displayKey = key;

        // Handle special cases (same as keydown)
        if (key === ' ') displayKey = 'Space';
        if (key === 'ArrowLeft') displayKey = '←';
        if (key === 'ArrowUp') displayKey = '↑';
        if (key === 'ArrowDown') displayKey = '↓';
        if (key === 'ArrowRight') displayKey = '→';
        if (key === 'Control') displayKey = 'Ctrl';
        if (key === 'Meta') displayKey = 'Win';
        if (key === 'Alt') displayKey = 'Alt';
        if (key === 'Enter') displayKey = 'Enter';
        if (key === 'Backspace') displayKey = 'Backspace';
        if (key === 'Tab') displayKey = 'Tab';
        if (key === 'CapsLock') displayKey = 'CapsLock';
        if (key === 'Shift') displayKey = 'Shift';
        if (key === 'Escape') displayKey = 'Esc';

        setPressedKeys(prev => {
            const newSet = new Set(prev);
            newSet.delete(displayKey);
            return newSet;
        });
    };

    const handleVirtualKeyPress = (key) => {
        // Simulate key press for virtual keyboard
        setPressedKeys(prev => new Set(prev).add(key));
        setTimeout(() => {
            setPressedKeys(prev => {
                const newSet = new Set(prev);
                newSet.delete(key);
                return newSet;
            });
        }, 200);

        // Add to typed text if it's a character
        if (key.length === 1 && key !== ' ') {
            setTypedText(prev => prev + key);
            setKeyCount(prev => prev + 1);
        } else if (key === 'Space') {
            setTypedText(prev => prev + ' ');
            setKeyCount(prev => prev + 1);
        } else if (key === 'Backspace') {
            setTypedText(prev => prev.slice(0, -1));
        }
    };

    const clearTest = () => {
        setPressedKeys(new Set());
        setTypedText('');
        setKeyCount(0);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const isKeyPressed = (key) => pressedKeys.has(key);

    return (
        <div className="min-h-screen md:mt-20 p-4">
            <div className="max-w-6xl mx-auto">

                {/* Virtual Keyboard */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-2xl">
                    <div className="text-center mb-4">
                        <h3 className="text-white text-lg font-semibold">Virtual Keyboard</h3>
                        <p className="text-gray-400 text-sm">
                            Keys will highlight when pressed on your physical keyboard
                        </p>
                    </div>

                    <div className="space-y-2">
                        {keyboardLayout.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center gap-1">
                                {row.map((key, keyIndex) => (
                                    <button
                                        key={keyIndex}
                                        className={`
                      ${getKeyWidth(key)}
                      h-12 flex items-center justify-center 
                      rounded text-sm font-medium transition-all duration-150
                      ${isKeyPressed(key)
                                                ? 'bg-white text-gray-800 transform scale-105 shadow-lg'
                                                : 'bg-gray-600 text-white hover:bg-gray-500'
                                            }
                      ${key === 'Space' ? 'min-w-64' : ''}
                    `}
                                        onClick={() => handleVirtualKeyPress(key)}
                                    >
                                        {getKeyDisplay(key)}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Keyboard;