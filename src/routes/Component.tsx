import { useEffect, type FC } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { indexRouteStyles as styles } from './styles.css';

export const IndexRouteComponent: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') navigate('/deals', { replace: true });
  }, [navigate, pathname]);

  return (
    <>
      <header className={styles.headerClass}>
        <h1 className={styles.headingClass}>IQ Group | Тестовое задание</h1>

        <NavLink to="/deals" className={styles.navLinkClass}>
          Сделки
        </NavLink>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};
