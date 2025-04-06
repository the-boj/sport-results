import { Routes, Route } from 'react-router-dom';
import { Football } from '../pages/Football';
import { Basketball } from '../pages/Basketball';
import { Ranking } from '../pages/Ranking';
import { Homepage } from '../pages/Homepage';
import { Cycling } from '../pages/Cycling';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/football/:matchId" element={<Football />} />
            <Route path="/cycling/:raceId" element={<Cycling />} />
            <Route path="/basketball" element={<Basketball />} />
            <Route path="/ranking/:sport/:competition" element={<Ranking />} />
        </Routes>
    );
}
export { App };
