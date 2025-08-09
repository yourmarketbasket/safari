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
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
                <h2 className="text-sm font-normal text-gray-500">{title}</h2>
                <div className={`p-2 rounded-full bg-${color}-100`}>
                    <Icon className={`w-5 h-5 ${colorClasses}`} />
                </div>
            </div>
            <div>
                <p className={`text-4xl font-bold ${colorClasses}`}>{value}</p>
            </div>
        </div>
    );
};

export default SummaryCard;
