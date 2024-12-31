import { Routes, Route } from 'react-router-dom';
import { Feed } from '../pages/Feed';
import { Football } from '../pages/Football';
import { Basketball } from '../pages/Basketball';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/football/:matchId" element={<Football />} />
      <Route path="/basketball" element={<Basketball />} />
    </Routes>
  );
}
export { App };

