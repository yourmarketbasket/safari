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
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center h-48">
            <div className={`p-4 rounded-lg bg-${color}-100 mr-6`}>
                <Icon className={`w-24 h-24 ${colorClasses}`} />
            </div>
            <div className="flex flex-col">
                <h2 className="text-sm font-normal text-gray-500 mb-2">{title}</h2>
                <p className={`text-5xl font-bold ${colorClasses}`}>{value}</p>
            </div>
        </div>
    );
};

export default SummaryCard;
