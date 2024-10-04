import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '../src/global.css'
import Authprovidernavi from './auth/Authprovidernavi.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

      <QueryClientProvider client={queryClient}>

        <Authprovidernavi>
          <App />
          <Toaster visibleToasts={1} position={'top-right'} richColors />
        </Authprovidernavi>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
