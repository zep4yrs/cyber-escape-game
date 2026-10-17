import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LangProvider } from './i18n/LangContext';
import { ProgressProvider } from './lib/ProgressContext';
import './styles/tokens.css';
import './styles/thunder.css';
import './styles/base.css';
import './styles/app.css';
import './styles/thunder-ui.css';
import './styles/unify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/cyber-escape-game">
      <LangProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>
);
