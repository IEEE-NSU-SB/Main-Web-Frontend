
import ieee from "./../assets/ieee.png";
import insb from "./../assets/insb.png";
function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    {/* IEEE Logo */}
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center">

                            <img src={ieee} alt="IEEE NSU Student Branch" className="h-20" />

                        </div>
                    </div>

                    {/* IEEE NSU Student Branch Logo */}
                    <div className="mb-6 md:mb-0">
                        <div className="px-4 py-2 rounded">
                            <img src={insb} alt="IEEE NSU Student Branch" className="h-20" />
                        </div>
                    </div>
                </div>

                {/* Follow Us Section */}
                <div className="text-center mb-8">
                    <h3 className="text-lg font-semibold mb-4">Follow Us:</h3>

                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    <p>
                        © Copyright 2025 IEEE NSU SB – All rights reserved. Developed by{' '}
                        <a href="#" className="text-amber-300 hover:text-blue-300 transition-colors">
                            IEEE NSU SB Web Development Team
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;