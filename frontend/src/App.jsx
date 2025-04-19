import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import MarkdownPreview from './pages/MarkdownPreview/MarkdownPreview';

function App() {

  return (
    <Router>
      <Routes>
        <Route 
            path="/" 
            element={
              <Home/> 
            } 
          />
        <Route 
            path="/markdown-preview" 
            element={
              <MarkdownPreview />
            } 
          />
        <Route 
            path="/login" 
            element={
              <Login />
            } 
          />
      </Routes>
    </Router>
  )
}

export default App
