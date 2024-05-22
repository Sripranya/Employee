import logo from './logo.svg';
import './App.css';
import details from "./db/EmployeeDetails.json";
import Task from './Task';
// import Addele from './Addele';
import Fetching from './Fetching';
import Radio from './Radio';
import TestEmail from './Components/TestEmail';
import { ContactUs } from './Components/ContactUs';
import Login from './Components/Login';

function App() {
// console.log(details)
  return (
    <div className="App">
      {/* <Fetching/> */}
       <Login/>
      {/* <Radio/> */}
     {/* <Task/> */}
     {/* <Addele/> */}
     {/* <Sample/> */}
     {/* <TestEmail/> */}
     {/* <ContactUs></ContactUs> */}
    </div>
  );
}

export default App;
