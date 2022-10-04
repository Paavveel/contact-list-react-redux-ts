import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AppRoutes } from './helpers/routes';
import { Contacts, Login } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={AppRoutes.HOME} element={<Login />} />
      <Route path={AppRoutes.CONTACTS} element={<Contacts />} />
    </Route>
  )
);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
