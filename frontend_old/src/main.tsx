import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import Home from './pages/Home';
import ApiBasics from './pages/ApiBasics';
import Forms from './pages/Forms';
import Lists from './pages/Lists';
import Jobs from './pages/Jobs';
import Frameworks from './pages/Frameworks';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/basics', element: <ApiBasics /> },
      { path: '/forms', element: <Forms /> },
      { path: '/lists', element: <Lists /> },
      { path: '/jobs', element: <Jobs /> },
      { path: '/frameworks', element: <Frameworks /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
