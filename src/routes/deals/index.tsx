import { DealsRouteComponent } from './Component';

import type { RouteObject } from 'react-router-dom';

export const dealsRoute: RouteObject = {
  path: '/deals',
  element: <DealsRouteComponent />,
};
