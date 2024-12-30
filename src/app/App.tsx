import { Routes, Route } from 'react-router-dom';
import { Feed } from '../pages/Feed';
import { Football } from '../pages/Football';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/football/:matchId" element={<Football />} />
    </Routes>
  );
}
export { App };

