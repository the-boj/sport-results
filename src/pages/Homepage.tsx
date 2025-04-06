import { useState } from 'react';
import { Feed } from '../homepage/Feed';
import { Rankings } from '../homepage/Rankings';

export function Homepage() {
    const [activeTab, setActiveTab] = useState<'feed' | 'rankings'>('feed');

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-100 h-[40px]">
                <button
                    onClick={() => setActiveTab('feed')}
                    className={`w-[50%] p-2 shadow transition-all ${
                        activeTab === 'feed' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Feed
                </button>
                <button
                    onClick={() => setActiveTab('rankings')}
                    className={`w-[50%] shadow transition-all ${
                        activeTab === 'rankings' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Rankings
                </button>
            </div>

            <div>{activeTab === 'feed' ? <Feed /> : <Rankings />}</div>
        </div>
    );
}
