import React from 'react';

interface SummaryCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  color: string;
}

const SummaryCard = ({ icon: Icon, title, value, color }: SummaryCardProps) => {
    const colorClasses = {
        blue: 'text-blue-500',
        green: 'text-green-500',
        yellow: 'text-yellow-500',
        purple: 'text-purple-500',
    }[color] || 'text-gray-500';

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-48 flex">
            <div className="flex flex-col items-center justify-center w-1/2">
                <div className={`p-4 rounded-full bg-${color}-100`}>
                    <Icon className={`w-12 h-12 ${colorClasses}`} />
                </div>
                <p className={`text-4xl font-bold mt-2 ${colorClasses}`}>{value}</p>
            </div>
            <div className="w-1/2 flex items-center justify-end">
                <h2 className="text-lg font-normal text-gray-500 text-right">{title}</h2>
            </div>
        </div>
    );
};

export default SummaryCard;
