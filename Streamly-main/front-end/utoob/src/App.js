import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import UploadForm from './components/UploadForm';
import {BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom'
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/upload' Component={UploadForm} />
        <Route path='/streamly/:videoName' Component={VideoPlayer} />
        <Route path='/streamly/search/:keyword' Component={HomeScreen} />
        <Route path='/streamly' exact Component={HomeScreen}/>
        <Route path="/" element={<Navigate to="/streamly" />} />
      </Routes>
    </Router>       
   
  );
}

export default App;
