import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Layout from './components/Layout';
import Authenticate from './components/Authenticate';
import Category from './components/Category';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route element={<Authenticate/>}>
          <Route path="/" element={<Layout/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/categories" element={<Category/>}/>
            <Route path="/quiz" element={<Quiz/>}/>
            <Route path="/result" element={<Result/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
