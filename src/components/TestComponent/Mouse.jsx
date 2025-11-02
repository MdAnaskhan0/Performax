import React, { useState } from 'react';
import { FaMouse, FaCheck, FaRedo } from 'react-icons/fa';

const Mouse = () => {
    const [clickCount, setClickCount] = useState({
        left: 0,
        right: 0,
        middle: 0
    });
    const [scrollCount, setScrollCount] = useState(0);
    const [testCompleted, setTestCompleted] = useState({
        leftClick: false,
        rightClick: false,
        middleClick: false,
        scroll: false
    });

    const handleLeftClick = () => {
        const newCount = clickCount.left + 1;
        setClickCount(prev => ({ ...prev, left: newCount }));
        if (newCount >= 3) {
            setTestCompleted(prev => ({ ...prev, leftClick: true }));
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        const newCount = clickCount.right + 1;
        setClickCount(prev => ({ ...prev, right: newCount }));
        if (newCount >= 3) {
            setTestCompleted(prev => ({ ...prev, rightClick: true }));
        }
    };

    const handleMiddleClick = () => {
        const newCount = clickCount.middle + 1;
        setClickCount(prev => ({ ...prev, middle: newCount }));
        if (newCount >= 3) {
            setTestCompleted(prev => ({ ...prev, middleClick: true }));
        }
    };

    // eslint-disable-next-line no-unused-vars
    const handleScroll = (e) => {
        const newCount = scrollCount + 1;
        setScrollCount(newCount);
        if (newCount >= 5) {
            setTestCompleted(prev => ({ ...prev, scroll: true }));
        }
    };

    const resetTest = () => {
        setClickCount({ left: 0, right: 0, middle: 0 });
        setScrollCount(0);
        setTestCompleted({
            leftClick: false,
            rightClick: false,
            middleClick: false,
            scroll: false
        });
    };

    const allTestsCompleted = Object.values(testCompleted).every(test => test);

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
                {/* Test Counters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8">
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-2xl font-bold text-blue-600">{clickCount.left}</div>
                        <div className="text-gray-600">Left Clicks</div>
                        <div className="text-xs mt-1">
                            {testCompleted.leftClick ? '✓ Complete' : 'Click 3 times'}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-2xl font-bold text-green-600">{clickCount.right}</div>
                        <div className="text-gray-600">Right Clicks</div>
                        <div className="text-xs mt-1">
                            {testCompleted.rightClick ? '✓ Complete' : 'Click 3 times'}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-2xl font-bold text-purple-600">{clickCount.middle}</div>
                        <div className="text-gray-600">Middle Clicks</div>
                        <div className="text-xs mt-1">
                            {testCompleted.middleClick ? '✓ Complete' : 'Click 3 times'}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <div className="text-2xl font-bold text-orange-600">{scrollCount}</div>
                        <div className="text-gray-600">Scroll Steps</div>
                        <div className="text-xs mt-1">
                            {testCompleted.scroll ? '✓ Complete' : 'Scroll 5 times'}
                        </div>
                    </div>
                </div>

                {/* Button Test Area */}
                <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-center">Button Test</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Left Click Test */}
                        <div className="text-center">
                            <button
                                onClick={handleLeftClick}
                                className={`w-full py-8 rounded-lg border-2 transition-all ${testCompleted.leftClick
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-700'
                                    }`}
                            >
                                <div className="text-2xl font-bold mb-2">Left Click</div>
                                <div className="text-sm">
                                    {testCompleted.leftClick ? '✓ Test Complete' : 'Click Here'}
                                </div>
                            </button>
                        </div>

                        {/* Right Click Test */}
                        <div className="text-center">
                            <button
                                onContextMenu={handleRightClick}
                                onClick={(e) => e.preventDefault()}
                                className={`w-full py-8 rounded-lg border-2 transition-all ${testCompleted.rightClick
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-green-500 bg-green-50 hover:bg-green-100 text-green-700'
                                    }`}
                            >
                                <div className="text-2xl font-bold mb-2">Right Click</div>
                                <div className="text-sm">
                                    {testCompleted.rightClick ? '✓ Test Complete' : 'Right-Click Here'}
                                </div>
                            </button>
                        </div>

                        {/* Middle Click Test */}
                        <div className="text-center">
                            <button
                                onClick={handleMiddleClick}
                                className={`w-full py-8 rounded-lg border-2 transition-all ${testCompleted.middleClick
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-purple-500 bg-purple-50 hover:bg-purple-100 text-purple-700'
                                    }`}
                            >
                                <div className="text-2xl font-bold mb-2">Middle Click</div>
                                <div className="text-sm">
                                    {testCompleted.middleClick ? '✓ Test Complete' : 'Click Mouse Wheel'}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Test Area */}
                <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-center">Scroll Wheel Test</h2>
                    <div
                        onWheel={handleScroll}
                        className="h-48 border-2 border-dashed border-orange-300 rounded-lg bg-orange-50 flex items-center justify-center cursor-pointer"
                    >
                        <div className="text-center">
                            <div className="text-4xl mb-4">↕</div>
                            <div className="text-lg font-semibold text-orange-700">
                                Scroll Here
                            </div>
                            <div className="text-sm text-orange-600 mt-2">
                                {testCompleted.scroll ? '✓ Scroll test complete!' : 'Scroll up and down 5 times'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-white rounded-lg p-6 shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Test Results</h2>
                        <button
                            onClick={resetTest}
                            className="flex items-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <FaRedo className="mr-2" />
                            Reset Test
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(testCompleted).map(([test, completed]) => (
                            <div
                                key={test}
                                className={`p-4 rounded-lg text-center ${completed
                                    ? 'bg-green-100 text-green-700 border-2 border-green-500'
                                    : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                                    }`}
                            >
                                <div className="font-semibold capitalize">
                                    {test === 'leftClick' && 'Left Button'}
                                    {test === 'rightClick' && 'Right Button'}
                                    {test === 'middleClick' && 'Middle Button'}
                                    {test === 'scroll' && 'Scroll Wheel'}
                                </div>
                                <div className="text-sm mt-1">
                                    {completed ? (
                                        <span className="flex items-center justify-center">
                                            <FaCheck className="mr-1" /> Passed
                                        </span>
                                    ) : (
                                        'Testing...'
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {allTestsCompleted && (
                        <div className="mt-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-center">
                            <div className="text-green-700 font-semibold text-lg">
                                🎉 All Mouse Tests Completed Successfully!
                            </div>
                            <div className="text-green-600 mt-1">
                                Your mouse is working perfectly
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Mouse;