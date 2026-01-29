import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Createbook from './pages/Createbook';
import Listbook from './pages/Listbooks';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listbook/>}/>
        <Route path="/create_book" element={<Createbook/>}/>
      </Routes>
    </BrowserRouter>  
  )
}

export default App;
