import { useEffect } from 'react';
import './App.css'
import './index.css'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import AuthProvider from './context/AuthProvider';
import { Protectedroute } from './routes/ProtectedRoute';
import Home from './pages/Home';
import { RolebasedRoute } from './routes/RolebasedRoute';
import BugForm from './pages/BugForm';
import BugUpdate from './pages/BugUpdate';
import BugList from './pages/BugList';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Comment from './pages/Comment';
import CommentList from './pages/CommentList';
import DevAndTester from './pages/DevAndTester';
import Help from './pages/Help';

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/test')  
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error('Error connecting:', err));
  }, []);

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/help' element={<Help />} />

      <Route element={<Protectedroute />}>
      <Route path='/dashboard' element={<Home />} />

      <Route element={<RolebasedRoute allowedRoute={['Tester']} />}>
      <Route path='/bugreport' element={<BugForm />} />
      </Route>

      <Route element={<RolebasedRoute allowedRoute={['Developer','ProjectManager']} />}>
      <Route path='/bugList' element={<BugList />} />
      </Route>

      <Route element={<RolebasedRoute allowedRoute={['Developer']} />}>
      <Route path='/bugUpdate/:id' element={<BugUpdate />} />
      </Route>

      <Route element={<RolebasedRoute allowedRoute={['ProjectManager']} />}>
      <Route path='/createComment' element={<Comment /> } />
      </Route>

      <Route element={<RolebasedRoute allowedRoute={['ProjectManager']} />}>
      <Route path='/employees' element={<DevAndTester /> } />
      </Route>

      <Route path='/commentList' element={<CommentList />} />

      <Route path='/help' element={<Help />} /> 
      </Route>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App
