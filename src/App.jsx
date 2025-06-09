import { useEffect } from 'react';
import { useState } from 'react';
// import Header from './components/Header';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [habits, setHabits] = useState(() => {
    // Загружаем привычки из localStorage при инициализации
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

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
              placeholder="Новая задача"
              value={inputValue}
              onKeyPress={(e) => e.key === 'Enter' && addHabits()}
            />
            <button className="btn" onClick={addHabits}>
              Добавить задачу
            </button>
            <div className="filter">
              <div className="link active">
                <a href="">Все</a>
              </div>
              <div className="link">
                <a href="">Выполненные</a>
              </div>
              <div className="link">
                <a href="">Важные</a>
              </div>
            </div>
          </div>

          {habits.length === 0 ? (
            <div className="empty-state">
              <p>Список задач пуст. Добавьте первую задачу!</p>
            </div>
          ) : (
            <ul>
              {habits.map((habit) => (
                <li key={habit.id}>
                  {habit.text}
                  <div className="divs">
                    <span className="done">✓</span>
                    <span
                      className="delete"
                      onClick={() => deleteHabits(habit.id)}
                    >
                      ×
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <footer className="footer">
        <p>© 2025 Приложение для задач</p>
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
