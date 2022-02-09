import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Cats from "./pages/Cats/Cats";
import Contacts from './pages/Contacts/Contacts';
import Home from './pages/Home/Home';
import Cat from './pages/Cats/Cat/Cat';
import Todo from './pages/Todo/Todo';
import Quotes from './pages/Quotes/Quotes';


function App() {
  return (

      <div className='container'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='contacts' element={<Contacts />} />
            <Route path='todos' element={<Todo />} />
            <Route path='cats' element={<Cats />} />
            <Route path='cats/:id' element={<Cat />} />
            <Route path='quotes' element={<Quotes />} />
          </Route>
        </Routes>
      </div>

  );
}

export default App;
