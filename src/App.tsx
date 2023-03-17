import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.page';
import { Generate } from './pages/Generate.page';

import { ThemeProvider } from './ThemeProvider';
import { HeaderAction } from './components/HeaderAction.component';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div style={{ padding: '20px' }}>
          <HeaderAction />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<Generate />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
