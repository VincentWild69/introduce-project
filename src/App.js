import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Cats from "./pages/Cats/Cats";
import Contacts from './pages/Contacts/Contacts';
import Home from './pages/Home/Home';
import Quotes from './pages/Quotes/Quotes';
import Cat from './pages/Cats/Cat/Cat';


function App() {
  return (

      <div className='container'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='contacts' element={<Contacts />} />
            <Route path='quotes' element={<Quotes />} />
            <Route path='cats' element={<Cats />} />
            <Route path='cats/:id' element={<Cat />} />
          </Route>
        </Routes>
      </div>

  );
}

export default App;
