import SectionHeading from '@/components/ui/SectionHeading';
import React, { useState, useRef, useEffect } from 'react';

const FeedbackForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('How satisfied were you?');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        satisfaction: '',
        comment: ''
    });

    const selectRef = useRef<HTMLDivElement>(null);

    const satisfactionOptions = [
        { value: 'very-satisfied', label: 'Very Satisfied' },
        { value: 'satisfied', label: 'Satisfied' },
        { value: 'not-satisfied', label: 'Not Satisfied' }
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectOption = (value: string, label: string) => {
        setSelectedOption(label);
        setFormData({ ...formData, satisfaction: value });
        setIsOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Feedback submitted successfully!');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-1">
            <div className="">

                <SectionHeading title="Leave a Feedback" widthClass="w-60"></SectionHeading>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-5 py-4 bg-[#f0f0f0] text-base text-gray-800 rounded placeholder-gray-400 focus:outline-none focus:bg-[#e8e8e8] transition-colors"
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-5 py-4 bg-[#f0f0f0] text-base text-gray-800 rounded placeholder-gray-400 focus:outline-none focus:bg-[#e8e8e8] transition-colors"
                        />
                    </div>

                    <div className="relative" ref={selectRef}>
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full px-5 py-4 bg-[#f0f0f0] rounded text-base text-gray-800 cursor-pointer flex justify-between items-center hover:bg-[#e8e8e8] transition-colors"
                        >
                            <span>{selectedOption}</span>
                            <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </div>

                        <div
                            className={`absolute top-full left-0 right-0 mt-0.5 bg-[#f0f0f0] rounded overflow-hidden z-10 transition-all duration-300 ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            {satisfactionOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleSelectOption(option.value, option.label)}
                                    className="px-5 py-4 bg-[#d9d9d9] text-gray-800 cursor-pointer hover:bg-[#c5c5c5] border-b border-[#c0c0c0] last:border-b-0 transition-colors"
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <textarea
                            name="comment"
                            placeholder="Your comment here...."
                            value={formData.comment}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full px-5 py-4 bg-[#f0f0f0] text-base text-gray-800 rounded placeholder-gray-400 focus:outline-none focus:bg-[#e8e8e8] transition-colors resize-y min-h-[150px]"
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-full md:w-auto bg-[#002855] text-white px-6 py-3 rounded"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;