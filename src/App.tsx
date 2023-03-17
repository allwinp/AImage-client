import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.page';
import { Generate } from './pages/Generate.page';

import { ThemeProvider } from './ThemeProvider';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
