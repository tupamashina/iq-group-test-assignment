import { IndexRouteComponent } from './Component';
import { dealsRoute } from './deals';
import { dealRoute } from './deals/$id';

import type { RouteObject } from 'react-router-dom';

export const indexRoute: RouteObject = {
  path: '/',
  element: <IndexRouteComponent />,
  children: [dealsRoute, dealRoute],
};
