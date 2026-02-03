import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Createbook from './pages/Createbook';
import Listbook from './pages/Listbooks';
import UpdateBook from './pages/updateBook';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listbook/>}/>
        <Route path="/create_book" element={<Createbook/>}/>
        <Route path="/update_book/:edit_id" element={<UpdateBook/>}/>
      </Routes>
    </BrowserRouter>  
  )
}

export default App;
