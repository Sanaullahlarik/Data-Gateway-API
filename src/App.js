import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageNotFound from './components/page-not-found/PageNotFound';
import { Provider } from 'react-redux';
import { store } from './components/store/store';
import ProductDetail from './components/product-detail/ProductDetail';
import SignUp from './components/sign-up/SignUP';
import SignIn from './components/sign-in/SignIn';
import ProductCarts from './components/product-carts/ProductCarts';
import AppLayout from './components/app-layout/AppLayout';
import ProductRoute from './components/product-route/ProductRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <ProductRoute /> },
        { path: "product-carts", element: <ProductCarts /> },
        { path: "product-detail/:product_id", element: <ProductDetail /> },
      ],
      errorElement: <PageNotFound />,
    },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "*", element: <PageNotFound /> }, 
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
