import { useState } from 'react';
// import Header from './components/Header';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [habits, setHabits] = useState([]);

  const addHabits = () => {
    if (inputValue.trim()) {
      setHabits([{ id: Date.now(), text: inputValue }, ...habits]);
      //         ↑ новый элемент сначала ↑ старые элементы
      setInputValue('');
    }
  };

  const deleteHabits = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Новая привычка ..."
          value={inputValue}
          onKeyPress={(e) => e.key === 'Enter' && addHabits()}
        />
        <button className="btn" onClick={addHabits}>
          Добавить привычку
        </button>
      </div>
      <ul className="ulitka">
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.text}
            <span onClick={() => deleteHabits(habit.id)}> ×</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
