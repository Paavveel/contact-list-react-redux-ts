import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AppRoutes } from './helpers/routes';
import { Contacts, HomeLayout, Login } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<HomeLayout />}>
        <Route path={AppRoutes.HOME} element={<Login />} />
      </Route>
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
