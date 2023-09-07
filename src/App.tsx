import Home from './pages/Home';
import Converter from './pages/Converter';
import WorkoutTimer from './pages/WorkoutTimer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/converter', element: <Converter /> },
      { path: '/workouttimer', element: <WorkoutTimer /> },
      { path: '*', element: <Home /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
