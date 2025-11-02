import React, { useState, useRef, useEffect } from 'react';
import { FaCamera, FaCameraRetro, FaRedo, FaVideo, FaVideoSlash } from 'react-icons/fa';

const WebCam = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isSupported, setIsSupported] = useState(true);
    const [error, setError] = useState('');
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const videoRef = useRef(null);
    const streamRef = useRef(null);

    // Get available camera devices
    useEffect(() => {
        const getDevices = async () => {
            try {
                const mediaDevices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = mediaDevices.filter(device => device.kind === 'videoinput');
                setDevices(videoDevices);

                if (videoDevices.length > 0) {
                    setSelectedDevice(videoDevices[0].deviceId);
                }
            } catch (err) {
                console.error('Error getting devices:', err);
            }
        };

        getDevices();
    }, []);

    const startCamera = async () => {
        try {
            setIsLoading(true);
            setError('');

            const constraints = {
                video: {
                    deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
            }

            setIsCameraOn(true);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError('Unable to access camera. Please check your permissions.');
            console.error('Camera error:', err);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                track.stop();
            });
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setIsCameraOn(false);
    };

    const toggleCamera = () => {
        if (isCameraOn) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    const takeScreenshot = () => {
        if (!videoRef.current || !isCameraOn) return;

        const canvas = document.createElement('canvas');
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Create download link
        const link = document.createElement('a');
        link.download = `webcam-screenshot-${new Date().getTime()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    const handleDeviceChange = (event) => {
        setSelectedDevice(event.target.value);
        if (isCameraOn) {
            stopCamera();
            setTimeout(() => startCamera(), 500);
        }
    };

    const resetTest = () => {
        stopCamera();
        setError('');
    };

    if (!isSupported) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <FaCameraRetro className="text-6xl text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Camera Not Supported</h2>
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

                {/* Main Test Area */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    {/* Camera Preview */}
                    <div className="mb-6">
                        <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video max-h-96">
                            {!isCameraOn ? (
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    <div className="text-center">
                                        <FaCameraRetro className="text-6xl text-gray-500 mb-4 mx-auto" />
                                        <p className="text-gray-400">Camera preview will appear here</p>
                                        <p className="text-sm text-gray-500 mt-2">Click "Start Camera" to begin</p>
                                    </div>
                                </div>
                            ) : (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-contain"
                                />
                            )}

                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="text-white text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                                        <p>Starting camera...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Device Selection */}
                    {devices.length > 1 && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Camera:
                            </label>
                            <select
                                value={selectedDevice}
                                onChange={handleDeviceChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={isLoading}
                            >
                                {devices.map((device, index) => (
                                    <option key={device.deviceId} value={device.deviceId}>
                                        {device.label || `Camera ${index + 1}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={toggleCamera}
                            disabled={isLoading}
                            className={`flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-all ${isCameraOn
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-green-500 hover:bg-green-600'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isCameraOn ? (
                                <>
                                    <FaVideoSlash className="mr-2" />
                                    Stop Camera
                                </>
                            ) : (
                                <>
                                    <FaVideo className="mr-2" />
                                    Start Camera
                                </>
                            )}
                        </button>

                        <button
                            onClick={takeScreenshot}
                            disabled={!isCameraOn || isLoading}
                            className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaCameraRetro className="mr-2" />
                            Take Screenshot
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                            {error}
                        </div>
                    )}
                </div>

                {/* Status Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow">
                        <h4 className="font-semibold text-gray-800 mb-2">Camera Status</h4>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${isCameraOn ? 'bg-green-500' : 'bg-gray-400'
                                }`}></div>
                            <span className="text-sm text-gray-600">
                                {isCameraOn ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow">
                        <h4 className="font-semibold text-gray-800 mb-2">Available Cameras</h4>
                        <span className="text-sm text-gray-600">
                            {devices.length} detected
                        </span>
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

export default WebCam;