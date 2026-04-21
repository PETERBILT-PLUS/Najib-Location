import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from "react-helmet-async";
import "tailwindcss/tailwind.css"

createRoot(document.getElementById('root')!).render(

  <HelmetProvider>
    <App />
  </HelmetProvider>,
)
