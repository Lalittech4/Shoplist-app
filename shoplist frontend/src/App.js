// import logo from './logo.svg';
import './App.css';
import Form from './component/Form.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Update from './component/Update';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/update/:id' element={<Update/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
