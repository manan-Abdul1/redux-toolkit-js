import Navbar from "../Navbar/Navbar";
import TodoList from "../TodoList/TodoList";

function Home() {
  
  return (
    <div className='center'>
      <Navbar />
      <TodoList />
    </div>
  );
}

export default Home;
