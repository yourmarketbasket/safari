"use client";

import { useEffect, useState } from 'react';
import { usePageTitleStore } from '@/app/store/pageTitle.store';
import PrivateRoute from '@/app/components/PrivateRoute';

const EscalationsPage = () => {
    const { setTitle } = usePageTitleStore();
    useEffect(() => {
        setTitle("Escalate Issue");
    }, [setTitle]);

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Escalating issue:\nSubject: ${subject}\nDescription: ${description}\nPriority: ${priority}`);
        // Here you would typically make an API call to submit the escalation
        setSubject('');
        setDescription('');
        setPriority('medium');
    };

    return (
        <PrivateRoute allowedRoles={['support_staff']}>
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                    <h1 className="text-2xl font-bold mb-6">Escalate an Issue to Admin</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                            >
                                Escalate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default EscalationsPage;
