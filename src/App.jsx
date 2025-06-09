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
    <div className="app-container">
      <div className="content">
        <div className="container">
          <div className="input-container">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Новая привычка"
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
      </div>
      <footer className="footer">
        <p>© 2025 Приложение для привычек</p>
        <p>
          Наш
          <a target="blank" href="https://github.com/12PUFFS/habit-tracker">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
