import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './../assets/Images/Logoo.png'

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <header className="shadow-md">
                <div className='flex justify-between items-center mx-25 py-6'>
                    {/* Left Side - Logo */}
                    <div>
                        <Link to="/" onClick={closeMobileMenu}>
                            <img src={Logo} alt="logo" className="h-15" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <ul className="flex gap-6 text-center text-base font-semibold">
                            <li><Link to="/monitor-test" className="hover:text-blue-200 transition-colors">Monitor Test</Link></li>
                            <li><Link to="/keyboard-test" className="hover:text-blue-200 transition-colors">Keyboard Test</Link></li>
                            <li><Link to="/mouse-test" className="hover:text-blue-200 transition-colors">Mouse Test</Link></li>
                            <li><Link to="/microphone-test" className="hover:text-blue-200 transition-colors">Microphone Test</Link></li>
                            <li><Link to="/webcam-test" className="hover:text-blue-200 transition-colors">Webcam Test</Link></li>
                            <li><Link to="/cpu-test" className="hover:text-blue-200 transition-colors">CPU Test</Link></li>
                            <li><Link to="/gpu-test" className="hover:text-blue-200 transition-colors">GPU Test</Link></li>
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } md:hidden`}>
                {/* Sidebar Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <Link to="/" onClick={closeMobileMenu}>
                        <img src={Logo} alt="logo" className="h-6 w-auto" />
                    </Link>
                    <button
                        onClick={toggleMobileMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="mt-8">
                    <ul className="space-y-4 px-4">
                        <li>
                            <Link
                                to="/monitor-test"
                                className="text-white hover:text-gray-300 transition-colors block py-2"
                                onClick={closeMobileMenu}
                            >
                                Monitor Test
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/keyboard-test"
                                className="text-white hover:text-gray-300 transition-colors block py-2"
                                onClick={closeMobileMenu}
                            >
                                Keyboard Test
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/microphone-test"
                                className="text-white hover:text-gray-300 transition-colors block py-2"
                                onClick={closeMobileMenu}
                            >
                                Microphone Test
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/CPU-test"
                                className="text-white hover:text-gray-300 transition-colors block py-2"
                                onClick={closeMobileMenu}
                            >
                                CPU Test
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/GPU-test"
                                className="text-white hover:text-gray-300 transition-colors block py-2"
                                onClick={closeMobileMenu}
                            >
                                GPU Test
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}
        </>
    )
}

export default Header