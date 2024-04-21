import React, { useState } from 'react';

const defaultComparisons = [
    { left: './img/comparisons/1.png', right: './img/comparisons/2.png', leftGroup: 'Blu-ray', rightGroup: 'WEB' },
    { left: './img/comparisons/3.png', right: './img/comparisons/4.png', leftGroup: 'Blu-ray', rightGroup: 'WEB' },
    { left: './img/comparisons/5.png', right: './img/comparisons/6.png', leftGroup: 'DE Blu-ray', rightGroup: 'NL Blu-ray' },
    { left: './img/comparisons/7.png', right: './img/comparisons/8.png', leftGroup: 'Blu-ray', rightGroup: 'Disney+' },
    { left: './img/comparisons/9.png', right: './img/comparisons/10.png', leftGroup: 'Amazon', rightGroup: 'Hulu' },
];

export default function Home() {

    const [comparisonIndex, setComparisonIndex] = useState(0);
    const [percentage, setPercentage] = useState<number | null>(50);
    const [isDragging, setIsDragging] = useState(false);
    const [firstImage, setFirstImage] = useState<string | null>(null);
    const [secondImage, setSecondImage] = useState<string | null>(null);

    const handleRandomComparison = () => {
        setPercentage(50);
        if (comparisonIndex !== defaultComparisons.length - 1) {
            setComparisonIndex(comparisonIndex + 1);
        } else {
            setComparisonIndex(0);
        }
    };

    const handleImage1Change = (event: any) => {
        const file = event.target.files[0];
        setFirstImage(URL.createObjectURL(file));
    };

    const handleImage2Change = (event: any) => {
        const file = event.target.files[0];
        setSecondImage(URL.createObjectURL(file));
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            const { left, width } = event.currentTarget.getBoundingClientRect();
            const offsetX = event.clientX - left;
            const calculatedPercentage = (offsetX / width) * 100;
            setPercentage(calculatedPercentage);
        }
    };

    const clipPathStyle = percentage !== null && percentage >= 0 && percentage <= 100
        ? `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`
        : '';

    const clipPathStyleSecond = percentage !== null && percentage >= 0 && percentage <= 100
        ? `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`
        : '';

    return (
        <>
            <div
                className="comparison-container"
                onMouseMove={handleMouseMove}
            >
                <div className="absolute top-0 left-0 w-full h-full" >
                    <img
                        className="absolute w-full h-full object-cover"
                        src={firstImage && secondImage ? firstImage : defaultComparisons[comparisonIndex].left}
                        alt="First image"
                        style={{ clipPath: clipPathStyle }}
                    />

                    <img
                        className='absolute w-full h-full object-cover'
                        src={firstImage && secondImage ? secondImage : defaultComparisons[comparisonIndex].right}
                        alt="Second image"
                        style={{ clipPath: clipPathStyleSecond }}
                    />

                </div>

                <div className="group-names-container">
                    <div className="first-group">{firstImage && secondImage ? "First image" : defaultComparisons[comparisonIndex].leftGroup}</div>
                    <div className="second-group">{firstImage && secondImage ? "Second image" : defaultComparisons[comparisonIndex].rightGroup}</div>
                </div>

                <div
                    className="line-container"
                    style={{ left: `${percentage}%` }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                >
                    <div className="first-line"></div>
                    <div className="circle">
                        <svg className="first" xmlns="http://www.w3.org/2000/svg" fill="#ddd" viewBox="0 0 20 20"><path d="M14 5v10l-9-5 9-5z" /></svg>
                        <svg className="second" xmlns="http://www.w3.org/2000/svg" fill="#ddd" viewBox="0 0 20 20"><path d="M15 10l-9 5V5l9 5z" /></svg>
                    </div>
                    <div className='second-line'></div>
                </div>

            </div>

            <div className="infos-container">

                <div className="random-container flex justify-end">
                    <button
                        className="absolute bottom-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-md cursor-pointer text-sm hover:bg-gray-700 transition-colors duration-300"
                        onClick={handleRandomComparison}
                    >
                        Random
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Compare Images</h1>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md w-full flex">
                        <div className="flex flex-grow space-x-2">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="image1"
                                onChange={handleImage1Change}
                            />
                            <label
                                htmlFor="image1"
                                className="text-center flex-1 py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
                            >
                                Load first image
                            </label>
                        </div>
                        <div className="flex flex-grow space-x-2">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="image2"
                                onChange={handleImage2Change}
                            />
                            <label
                                htmlFor="image2"
                                className="text-center flex-1 py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
                            >
                                Load second image
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
