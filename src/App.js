import './App.css';
import Home from './components/HomePage/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Instructions from './components/Instructions';
import Layouts from './components/Layouts';
import CameraPage from './components/CameraPage';
import Rearrange from './components/Rearrange';

function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/instructions' element={<Instructions />} />
            <Route path='/layouts' element={<Layouts />} />
            <Route path='/camera' element={<CameraPage />} />
            <Route path='/preview' element={<Rearrange />} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
