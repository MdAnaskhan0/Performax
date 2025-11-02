import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white mt-16 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Bottom Bar */}
                <div className="py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-300 mb-4 md:mb-0">
                            © {currentYear} <span className='uppercase text-white font-bold'>Performax</span> Pro. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-300">
                            <p>Made with ❤️ By <Link to="https://mdanaskhan.vercel.app" className='font-bold cursor-pointer hover:text-white transition-colors'>Md. Anas Khan</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;