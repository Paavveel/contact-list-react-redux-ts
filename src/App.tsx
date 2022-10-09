import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AppRoutes } from './helpers/routes';
import { Contacts, HomeLayout, Login, SignUp } from './pages';
import { ProtectedRoute } from './pages/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<HomeLayout />}>
        <Route path={AppRoutes.HOME} element={<Login />} />
        <Route path={AppRoutes.SIGNUP} element={<SignUp />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path={AppRoutes.CONTACTS} element={<Contacts />} />
      </Route>
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
