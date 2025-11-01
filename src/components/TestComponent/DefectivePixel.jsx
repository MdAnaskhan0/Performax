import React, { useState, useEffect } from 'react';
import { FaExpand, FaCompress, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const DefectivePixel = () => {
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const colors = [
        { name: 'Black', class: 'bg-black', text: 'text-white' },
        { name: 'White', class: 'bg-white', text: 'text-black' },
        { name: 'Red', class: 'bg-red-500', text: 'text-white' },
        { name: 'Green', class: 'bg-green-500', text: 'text-white' },
        { name: 'Blue', class: 'bg-blue-500', text: 'text-white' },
        { name: 'Yellow', class: 'bg-yellow-500', text: 'text-black' },
        { name: 'Magenta', class: 'bg-purple-500', text: 'text-white' }
    ];

    const nextColor = () => {
        setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    };

    const prevColor = () => {
        setCurrentColorIndex((prev) => (prev - 1 + colors.length) % colors.length);
    };

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullScreen(false);
        }
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
        document.addEventListener('msfullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
            document.removeEventListener('msfullscreenchange', handleFullScreenChange);
        };
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowUp') {
                prevColor();
            } else if (e.key === 'ArrowDown') {
                nextColor();
            } else if (e.key === 'Escape' && isFullScreen) {
                toggleFullScreen();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [isFullScreen]);

    const currentColor = colors[currentColorIndex];

    if (isFullScreen) {
        return (
            <div
                className={`w-full h-screen ${currentColor.class} ${currentColor.text} flex items-center justify-center relative`}
                onClick={nextColor}
            >
                {/* Full Screen Exit Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFullScreen();
                    }}
                    className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
                >
                    <FaCompress size={20} />
                </button>

                {/* Color Info */}
                <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg">
                    <h2 className="text-3xl font-bold mb-2">{currentColor.name}</h2>
                    <p className="text-xl">
                        Color {currentColorIndex + 1} of {colors.length}
                    </p>
                    <p className="text-lg mt-4 opacity-80">
                        Click anywhere or press ↓ to continue
                    </p>
                    <p className="text-sm mt-2 opacity-60">
                        Press ↑ for previous color • ESC to exit fullscreen
                    </p>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-8">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevColor();
                        }}
                        className="bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition-all"
                    >
                        <FaArrowUp size={24} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextColor();
                        }}
                        className="bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition-all"
                    >
                        <FaArrowDown size={24} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto mt-5 md:mt-10">
                <div className="relative rounded-lg overflow-hidden shadow-2xl mb-6">
                    <button
                        onClick={toggleFullScreen}
                        className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
                    >
                        <FaExpand size={20} />
                    </button>
                    <div
                        className={`w-full h-96 ${currentColor.class} flex items-center justify-center cursor-pointer`}
                        onClick={nextColor}
                    >
                        <div className={`text-center ${currentColor.text}`}>
                            <h3 className="text-4xl font-bold mb-2">{currentColor.name}</h3>
                            <p className="text-xl">
                                Color {currentColorIndex + 1} of {colors.length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-white rounded-lg p-6 shadow-md">
                    <button
                        onClick={prevColor}
                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <FaArrowUp className="mr-2" />
                        Previous Color
                    </button>

                    <div className="text-center">
                        <p className="text-gray-700 font-medium">
                            Current: <span className="font-bold">{currentColor.name}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Use arrow keys for quick navigation
                        </p>
                    </div>

                    <button
                        onClick={nextColor}
                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Next Color
                        <FaArrowDown className="ml-2" />
                    </button>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-700">
                            {currentColorIndex + 1} / {colors.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentColorIndex + 1) / colors.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-center">Color Palette</h3>
                    <div className="grid grid-cols-7 gap-2">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className={`h-12 rounded-lg cursor-pointer transition-transform ${index === currentColorIndex ? 'ring-4 ring-blue-500 ring-offset-2 transform scale-105' : ''
                                    }`}
                                style={{ backgroundColor: getComputedColor(color.class) }}
                                onClick={() => setCurrentColorIndex(index)}
                            >
                                <div className={`h-full flex items-center justify-center text-xs font-bold ${color.text}`}>
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
const getComputedColor = (colorClass) => {
    const colorMap = {
        'bg-black': '#000000',
        'bg-white': '#ffffff',
        'bg-red-500': '#ef4444',
        'bg-green-500': '#22c55e',
        'bg-blue-500': '#3b82f6',
        'bg-yellow-500': '#eab308',
        'bg-purple-500': '#a855f7'
    };
    return colorMap[colorClass] || '#000000';
};

export default DefectivePixel;