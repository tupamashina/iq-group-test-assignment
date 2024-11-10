import { lazy } from 'react';

import type { RouteObject } from 'react-router-dom';

export const dealRoute: RouteObject = {
  path: '/deals/:id',

  Component: lazy(() =>
    import('./Component').then(({ DealRouteComponent }) => ({
      default: DealRouteComponent,
    })),
  ),
};
