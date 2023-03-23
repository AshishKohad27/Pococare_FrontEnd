import './App.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AllRoutes from './Routes/AllRoutes';
function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Login /> */}
      {/* <SignUp /> */}
      <AllRoutes/>
    </div>
  );
}

export default App;
