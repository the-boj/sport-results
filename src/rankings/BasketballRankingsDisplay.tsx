import { useState } from 'react';
import { Link } from 'react-router-dom';

function BasketballRankingsDisplay() {
    const [activeTab, setActiveTab] = useState<'West' | 'East'>('West');

    return (
        <div className="flex flex-col h-[100vh] max-w-[100wh]">
            <Link style={{ width: '100px' }} to="/">
                <div className="text-md p-2">{'< Retour'}</div>
            </Link>
            <div className="flex flex-col flex-1">
                <div className="flex w-full">
                    <button
                        onClick={() => setActiveTab('West')}
                        className={`w-[50%] px-4 py-2 font-medium focus:outline-none ${
                            activeTab === 'West'
                                ? 'border-b-2 border-blue-500 text-blue-800'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        West
                    </button>
                    <button
                        onClick={() => setActiveTab('East')}
                        className={`w-[50%] px-4 py-2 font-medium focus:outline-none ${
                            activeTab === 'East'
                                ? 'border-b-2 border-blue-500 text-blue-800'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        East
                    </button>
                </div>
                <div className="flex-1">
                    {activeTab === 'West' && (
                        <div className="p-3 h-full">
                            <iframe
                                style={{ height: '100%', width: '100%' }}
                                src="https://webapp.lequipe.fr/Basket/BasketClassementNBA2025_W.html?isUpwa=true&isFrame=true"
                            ></iframe>
                        </div>
                    )}
                    {activeTab === 'East' && (
                        <div className="p-3 h-full">
                            <iframe
                                style={{ height: '100%', width: '100%' }}
                                src="https://webapp.lequipe.fr/Basket/BasketClassementNBA2025_E.html?isUpwa=true&isFrame=true"
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export { BasketballRankingsDisplay };
