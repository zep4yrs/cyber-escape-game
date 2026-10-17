import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RouteEffects } from './components/RouteEffects';

/* 学习路径首页保持同步加载；模块页与综合演练按需加载（含实战引擎与关卡数据） */
const ModulePage = lazy(() => import('./pages/ModulePage').then((m) => ({ default: m.ModulePage })));
const ChallengePage = lazy(() => import('./pages/ChallengePage').then((m) => ({ default: m.ChallengePage })));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage').then((m) => ({ default: m.GlossaryPage })));

function RouteFallback() {
  return (
    <div className="route-fallback shell" role="status" aria-live="polite">
      <span className="route-fallback__bar" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <AppShell>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/modules/:moduleId" element={<ModulePage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AppShell>
    </>
  );
}
