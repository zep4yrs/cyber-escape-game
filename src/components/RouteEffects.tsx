import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** 路由变化时回到页首；带 hash 时滚到对应锚点（如 #lesson-game） */
export function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
