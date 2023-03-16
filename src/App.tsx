import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.page';

import { ThemeProvider } from './ThemeProvider';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
