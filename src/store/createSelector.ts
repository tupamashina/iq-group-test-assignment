import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '.';

export const createAppSelector = createSelector.withTypes<RootState>();
