import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { indexRoute } from './routes';
import { persistor, store } from './store';

import 'modern-normalize/modern-normalize.css';
import '@fontsource/inter/cyrillic-400.css';
import '@fontsource/inter/latin-400.css';
import '~/styles/global.css';

const router = createBrowserRouter([indexRoute]);

// eslint-disable-next-line ts/no-non-null-assertion -- I swear it exists
createRoot(document.querySelector('#__root__')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
