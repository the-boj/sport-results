import { Link } from 'react-router-dom';

function BetclicEliteRankingDisplay() {
    return (
        <div className="flex flex-col h-[100vh] max-w-[100wh]">
            <Link style={{ width: '100px' }} to="/">
                <div className="text-md p-2">{'< Retour'}</div>
            </Link>
            <iframe
                style={{ height: '100%', width: '100%' }}
                src="https://deskview.lequipe.fr/Basket/CLA_PROA.html?isUpwa=true&isFrame=true"
            ></iframe>
        </div>
    );
}

export { BetclicEliteRankingDisplay };
