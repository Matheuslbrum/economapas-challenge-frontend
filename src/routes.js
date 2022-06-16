import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/initalpage/login'; 
import Dashboard from './pages/dashboard/dashboard';
import { useAuthContext } from '../src/contexts/auth';
import CardGroup from './components/cardgroup/cardGroup';

const Private = ({Item}) => {
  const { isSinged } = useAuthContext();

  return isSinged > 0 ? <Item /> : <Login />;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={ <Login /> } />
        <Route exact path='/dashboard' element={ <Private Item={Dashboard} /> } />
        <Route path='*' element={ <Login /> } />
        <Route path='/teste' element={ <CardGroup /> } />
      </Routes>
    </BrowserRouter>
  )
}