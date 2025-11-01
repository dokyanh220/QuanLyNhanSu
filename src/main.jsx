import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { store } from './redux/store.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfirmProvider
          defaultOptions={{
            title: 'Xác nhận',
            confirmationText: 'Xác nhận',
            cancellationText: 'Hủy',
            confirmationButtonProps: { variant: 'contained', color: 'primary' },
            cancellationButtonProps: { variant: 'outlined' }
          }}
        >
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ConfirmProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)