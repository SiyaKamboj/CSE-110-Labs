import "./App.css";
import { ToDoList } from "./toDoList";
import { Route, Routes } from "react-router-dom";
import { MyStickyNotes } from "./MyStickyNotes";
import { Navbar } from "./navbar";

const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route path="/" element={<MyStickyNotes />} />
      <Route path="/todolist/:name" element={<ToDoList />} />
     </Routes>
   </div>
 );
};

export default App;
