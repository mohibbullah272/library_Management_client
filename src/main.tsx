import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import router from './router/router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Provider store={store}>
  <ToastContainer></ToastContainer>
<RouterProvider router={router}>
</RouterProvider>
    </Provider>

  </StrictMode>,
)
