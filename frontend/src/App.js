import {Route, Routes} from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Profile from './components/pages/Profile';
import MyPets from './components/pages/Pet/MyPets';
import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';
import PetDetails from './components/pages/Pet/PetDetails';
import MyAdoptions from './components/pages/Pet/MyAdoptions';

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
      <Route path='/user/profile' element={<Profile/>} />
      <Route path='/pet/mypets' element={<MyPets />} />
      <Route path='/pet/add' element={<AddPet />} />
      <Route path='/pet/adoptions' element={<MyAdoptions />} />
      <Route path='/pet/details/:id' element={<PetDetails/>} />
      <Route path='/pet/edit/:id' element={<EditPet/>} /> 
    </Routes>
  </Container>
  <Footer />
  </UserProvider>
)}

export default App;
