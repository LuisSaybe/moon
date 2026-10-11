import { StrictMode } from 'react'
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from './apollo'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { 
  Index
 } from './pages/index';
 import { 
  Game
 } from './pages/game';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/game/:id' element={<Game />} />
        <Route path='/' element={<Index />} />
      </Routes>
    </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
