import { Routes, Route, Link } from 'react-router-dom'
import Login from './routes/Login'
import Register from './routes/Register'
import Main from './routes/Main'
import NotFound from './routes/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={< Login /> }></Route>
        <Route path='/register' element={ <Register /> }></Route>
        <Route path='/main' element= { <Main />}></Route>
        <Route path='/*' element = { <NotFound /> }></Route>
      </Routes>
    </div>
  );
}



export default App;
