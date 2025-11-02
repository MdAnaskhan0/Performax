import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaRedo } from 'react-icons/fa';

const Microphone = () => {
    const [isListening, setIsListening] = useState(false);
    const [volume, setVolume] = useState(0);
    const [isSupported, setIsSupported] = useState(true);
    const [error, setError] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [microphone, setMicrophone] = useState(null);
    const [javascriptNode, setJavascriptNode] = useState(null);

    const audioContextRef = useRef(null);

    useEffect(() => {
        // Check if browser supports audio context
        if (!navigator.mediaDevices || !window.AudioContext) {
            setIsSupported(false);
            setError('Your browser does not support microphone access');
            return;
        }

        return () => {
            stopListening();
        };
    }, []);

    const startListening = async () => {
        try {
            setError('');

            // Create audio context if it doesn't exist
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                setAudioContext(audioContextRef.current);
            }

            // Get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            // Create analyser
            const analyserNode = audioContextRef.current.createAnalyser();
            analyserNode.fftSize = 256;
            setAnalyser(analyserNode);

            // Create microphone source
            const microphoneNode = audioContextRef.current.createMediaStreamSource(stream);
            setMicrophone(microphoneNode);

            // Connect microphone to analyser
            microphoneNode.connect(analyserNode);

            // Create script processor for volume analysis
            const scriptProcessorNode = audioContextRef.current.createScriptProcessor(2048, 1, 1);
            setJavascriptNode(scriptProcessorNode);

            analyserNode.connect(scriptProcessorNode);
            scriptProcessorNode.connect(audioContextRef.current.destination);

            scriptProcessorNode.onaudioprocess = () => {
                const array = new Uint8Array(analyserNode.frequencyBinCount);
                analyserNode.getByteFrequencyData(array);

                let values = 0;
                const length = array.length;

                for (let i = 0; i < length; i++) {
                    values += array[i];
                }

                const average = values / length;
                setVolume(Math.min(100, (average / 256) * 200)); // Convert to percentage
            };

            setIsListening(true);

        } catch (err) {
            setError('Unable to access microphone. Please check your permissions.');
            setIsSupported(false);
            console.error('Microphone error:', err);
        }
    };

    const stopListening = () => {
        if (microphone) {
            microphone.disconnect();
        }
        if (javascriptNode) {
            javascriptNode.disconnect();
        }
        if (analyser) {
            analyser.disconnect();
        }

        // Stop all audio tracks
        if (microphone && microphone.mediaStream) {
            microphone.mediaStream.getTracks().forEach(track => track.stop());
        }

        setIsListening(false);
        setVolume(0);
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const resetTest = () => {
        stopListening();
        setVolume(0);
        setError('');
    };

    const getVolumeColor = (vol) => {
        if (vol < 30) return 'bg-red-500';
        if (vol < 60) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getVolumeStatus = (vol) => {
        if (vol === 0) return 'No input detected';
        if (vol < 10) return 'Very quiet';
        if (vol < 30) return 'Quiet';
        if (vol < 60) return 'Moderate';
        if (vol < 80) return 'Loud';
        return 'Very loud';
    };

    if (!isSupported) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <FaMicrophoneSlash className="text-6xl text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Microphone Not Supported</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={resetTest}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
                {/* Main Test Card */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6 mt-15">
                    {/* Volume Visualization */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center">
                                <FaVolumeUp className="mr-2" />
                                Input Level
                            </h3>
                            <span className="text-sm text-gray-500">{getVolumeStatus(volume)}</span>
                        </div>

                        {/* Volume Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-6 mb-2 overflow-hidden">
                            <div
                                className={`h-6 rounded-full transition-all duration-100 ${getVolumeColor(volume)}`}
                                style={{ width: `${volume}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between text-xs text-gray-500">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    {/* Volume Percentage */}
                    <div className="text-center mb-8">
                        <div className="text-4xl font-bold text-gray-800 mb-2">
                            {Math.round(volume)}%
                        </div>
                        <div className="text-sm text-gray-500">
                            Current microphone input level
                        </div>
                    </div>

                    {/* Control Button */}
                    <div className="text-center">
                        <button
                            onClick={toggleListening}
                            className={`flex items-center justify-center mx-auto px-8 py-4 rounded-lg font-semibold text-white transition-all ${isListening
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            {isListening ? (
                                <>
                                    <FaMicrophoneSlash className="mr-2" />
                                    Stop Test
                                </>
                            ) : (
                                <>
                                    <FaMicrophone className="mr-2" />
                                    Start Test
                                </>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                            {error}
                        </div>
                    )}
                </div>
                {/* Status Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow">
                        <h4 className="font-semibold text-gray-800 mb-2">Microphone Status</h4>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${isListening ? 'bg-green-500' : 'bg-gray-400'
                                }`}></div>
                            <span className="text-sm text-gray-600">
                                {isListening ? 'Active - Listening' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow">
                        <h4 className="font-semibold text-gray-800 mb-2">Test Controls</h4>
                        <button
                            onClick={resetTest}
                            className="flex items-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors"
                        >
                            <FaRedo className="mr-2" />
                            Reset Test
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Microphone;