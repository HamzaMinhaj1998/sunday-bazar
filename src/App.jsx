import { HashRouter, RouterProvider } from 'react-router';
import { routes } from './routes';

function App() {
  return (
    <HashRouter>
      <RouterProvider router={routes} />
    </HashRouter>
  );
}

export default App;
