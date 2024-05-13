import {Route, Routes} from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Profile from './components/pages/Profile';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message from './components/layout/Message';

import { UserProvider } from './context/UserContext';

function App() {
  return (
  <UserProvider>
  <Navbar />
  <Message />
  <Container>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
  </Container>
  <Footer />
  </UserProvider>
)}

export default App;