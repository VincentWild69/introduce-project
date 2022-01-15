import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Contacts from './pages/Contacts/Contacts';
import Home from './pages/Home/Home';
import Quotes from './pages/Quotes/Quotes';


function App() {
  return (

      <div className='container'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='contacts' element={<Contacts />} />
            <Route path='quotes' element={<Quotes />} />
          </Route>
        </Routes>
      </div>

  );
}

export default App;
