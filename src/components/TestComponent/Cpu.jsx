import React, { useState, useEffect, useRef } from 'react';
import { FaMicrochip, FaPlay, FaStop, FaRedo, FaTachometerAlt } from 'react-icons/fa';

const Cpu = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [duration, setDuration] = useState(0);
    const [iterations, setIterations] = useState(0);
    const [performance, setPerformance] = useState(0);
    const [maxPerformance, setMaxPerformance] = useState(0);
    const [testHistory, setTestHistory] = useState([]);
    const [temperatureWarning, setTemperatureWarning] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const workerRef = useRef(null);
    const startTimeRef = useRef(null);
    const animationRef = useRef(null);

    // Complex mathematical operations to stress CPU
    const stressCPU = () => {
        let result = 0;
        // Multiple nested loops and complex calculations
        for (let i = 0; i < 1000; i++) {
            for (let j = 0; j < 1000; j++) {
                // Fibonacci-like calculation
                let a = 0, b = 1;
                for (let k = 0; k < 100; k++) {
                    const temp = a + b;
                    a = b;
                    b = temp;
                    result += Math.sin(temp) * Math.cos(temp);
                }

                // Matrix multiplication simulation
                for (let x = 0; x < 50; x++) {
                    for (let y = 0; y < 50; y++) {
                        result += Math.sqrt(x * y) * Math.log(x + y + 1);
                    }
                }

                // Prime number calculation
                for (let num = 2; num < 200; num++) {
                    let isPrime = true;
                    for (let div = 2; div <= Math.sqrt(num); div++) {
                        if (num % div === 0) {
                            isPrime = false;
                            break;
                        }
                    }
                    if (isPrime) {
                        result += num;
                    }
                }
            }
        }
        return result;
    };

    const startTest = () => {
        if (isRunning) return;

        setIsRunning(true);
        setDuration(0);
        setIterations(0);
        setPerformance(0);
        setTemperatureWarning(false);
        startTimeRef.current = Date.now();

        // Start the stress test loop
        const runStressTest = () => {
            if (!isRunning) return;

            const startTime = performance.now();
            stressCPU(); // Execute CPU-intensive task
            const endTime = performance.now();

            const iterationTime = endTime - startTime;
            const currentPerformance = Math.round(100000 / iterationTime); // Performance score

            setIterations(prev => prev + 1);
            setPerformance(currentPerformance);
            setMaxPerformance(prev => Math.max(prev, currentPerformance));
            setDuration(Math.round((Date.now() - startTimeRef.current) / 1000));

            // Warning if performance drops significantly
            if (currentPerformance < maxPerformance * 0.5 && maxPerformance > 0) {
                setTemperatureWarning(true);
            }

            // Continue the loop
            animationRef.current = requestAnimationFrame(runStressTest);
        };

        animationRef.current = requestAnimationFrame(runStressTest);
    };

    const stopTest = () => {
        setIsRunning(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        // Save test result to history
        if (iterations > 0) {
            const testResult = {
                timestamp: new Date().toLocaleTimeString(),
                duration,
                iterations,
                performance,
                maxPerformance
            };
            setTestHistory(prev => [testResult, ...prev.slice(0, 4)]); // Keep last 5 tests
        }
    };

    const resetTest = () => {
        stopTest();
        setDuration(0);
        setIterations(0);
        setPerformance(0);
        setMaxPerformance(0);
        setTemperatureWarning(false);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Calculate CPU load percentage (simulated)
    const calculateCPULoad = () => {
        if (!isRunning) return 0;
        return Math.min(100, Math.round((performance / 1000) * 100));
    };

    const getPerformanceColor = (perf) => {
        if (perf < 100) return 'text-red-500';
        if (perf < 500) return 'text-yellow-500';
        if (perf < 1000) return 'text-green-500';
        return 'text-blue-500';
    };

    const getLoadColor = (load) => {
        if (load < 50) return 'bg-green-500';
        if (load < 80) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <FaMicrochip className="text-4xl text-blue-500 mr-3" />
                        <h1 className="text-3xl font-bold text-gray-800">CPU Stress Test</h1>
                    </div>
                    <p className="text-gray-600">
                        Test your processor performance under heavy load
                    </p>
                </div>

                {/* Warning */}
                {temperatureWarning && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                        <strong>Warning:</strong> Performance degradation detected. Your CPU may be thermal throttling.
                    </div>
                )}

                {/* Main Test Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    {/* CPU Load Indicator */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold flex items-center">
                                <FaTachometerAlt className="mr-2" />
                                CPU Load
                            </h3>
                            <span className="text-sm font-semibold">{calculateCPULoad()}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className={`h-4 rounded-full transition-all duration-500 ${getLoadColor(calculateCPULoad())}`}
                                style={{ width: `${calculateCPULoad()}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{duration}s</div>
                            <div className="text-sm text-gray-600">Duration</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                                {iterations.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Iterations</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className={`text-2xl font-bold ${getPerformanceColor(performance)}`}>
                                {performance}
                            </div>
                            <div className="text-sm text-gray-600">Current Score</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                                {maxPerformance}
                            </div>
                            <div className="text-sm text-gray-600">Best Score</div>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={isRunning ? stopTest : startTest}
                            className={`flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white transition-all ${isRunning
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            {isRunning ? (
                                <>
                                    <FaStop className="mr-2" />
                                    Stop Test
                                </>
                            ) : (
                                <>
                                    <FaPlay className="mr-2" />
                                    Start Stress Test
                                </>
                            )}
                        </button>

                        <button
                            onClick={resetTest}
                            disabled={isRunning}
                            className="flex items-center justify-center px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaRedo className="mr-2" />
                            Reset
                        </button>
                    </div>
                </div>

                {/* Test History */}
                {testHistory.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold mb-4">Recent Tests</h3>
                        <div className="space-y-3">
                            {testHistory.map((test, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-600">{test.timestamp}</div>
                                    <div className="text-sm">
                                        <span className="font-semibold">{test.duration}s</span> •
                                        <span className="text-green-600 mx-1">{test.iterations.toLocaleString()} iters</span> •
                                        <span className="text-blue-600 mx-1">Score: {test.performance}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Instructions & Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-800 mb-3">Testing Instructions</h3>
                        <ul className="list-disc list-inside text-blue-700 space-y-2">
                            <li>Click "Start Stress Test" to begin CPU load testing</li>
                            <li>Monitor the CPU load percentage and performance score</li>
                            <li>Run for 30-60 seconds to see stable performance</li>
                            <li>Stop immediately if your computer becomes unstable</li>
                            <li>Compare scores across multiple test runs</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Notes</h3>
                        <ul className="list-disc list-inside text-yellow-700 space-y-2">
                            <li>This test puts heavy load on your CPU</li>
                            <li>Your computer may become slow during testing</li>
                            <li>Fans may spin faster due to increased heat</li>
                            <li>Close other applications before testing</li>
                            <li>Not recommended for low-end devices</li>
                        </ul>
                    </div>
                </div>

                {/* Performance Tips */}
                <div className="mt-6 bg-green-50 rounded-lg p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Understanding Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-green-700">
                        <div>
                            <strong>Score &lt; 100:</strong> Very slow performance
                        </div>
                        <div>
                            <strong>Score 100-500:</strong> Average performance
                        </div>
                        <div>
                            <strong>Score &gt; 500:</strong> Good performance
                        </div>
                    </div>
                    <p className="text-sm text-green-600 mt-3">
                        Higher scores indicate better CPU performance under load. Results may vary based on your processor, cooling, and background tasks.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cpu;