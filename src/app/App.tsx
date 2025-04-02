import { Routes, Route } from 'react-router-dom';
import { Feed } from '../pages/Feed';
import { Football } from '../pages/Football';
import { Basketball } from '../pages/Basketball';
import { Rankings } from '../pages/Rankings';
import { PullToRefresh } from './PullToRefresh';

function App() {
    return (
        <PullToRefresh>
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/football/:matchId" element={<Football />} />
                <Route path="/basketball" element={<Basketball />} />
                <Route path="/rankings/:sport/:competition" element={<Rankings />} />
            </Routes>
        </PullToRefresh>
    );
}
export { App };
