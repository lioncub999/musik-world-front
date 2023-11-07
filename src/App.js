import { Routes, Route, Link } from 'react-router-dom'
import Login from './routes/Login'
import Main from './routes/Main'
import NotFound from './routes/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={< Login /> }></Route>
        <Route path='/main' element= { <Main />}></Route>
        <Route path='/*' element = { <NotFound /> }></Route>
      </Routes>
    </div>
  );
}



export default App;
