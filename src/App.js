
import './App.css';
import {Route, Routes} from "react-router-dom";
import UploadPage from './pages/UploadPage';
import UsersPage from './pages/UsersPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
     {/* <nav className="nav">
      <Link to="/admin/uploads">Upload</Link> 
     <Link to="/admin/users">View Users</Link> </nav> */}
      <Routes> 
        <Route path="/" element={<NotFoundPage />} />
      <Route path="/admin/uploads" element={<UploadPage/>} /> 
     <Route path="/admin/users" element={<UsersPage />} />
     <Route path="/search" element={<SearchPage />} />
      </Routes>
     
    </div>
  );
}

export default App;
