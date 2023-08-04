import './App.css';
import Homepage from './pages/Homepage';
import ErrorPage from './pages/ErrorPage';
import LogIn from './pages/LogIn';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPost from './pages/AddPost';
import {ProtectedRoutes} from './middlewares/ProtectedRoutes';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='logIn' element={<LogIn />} />
        <Route path='SinglePost/:id' element={<SinglePost />} />

        <Route element={<ProtectedRoutes/>}>
          <Route path='AddPost' element={<AddPost />} />
        </Route>
        
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
