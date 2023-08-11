import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import TodoList from "../TodoList/TodoList";

function Home() {
useSelector(state=>console.log(state))


  return (
    <div className='center'>
        <Navbar/>
        <TodoList/>
    </div>
  );
}

export default Home;
