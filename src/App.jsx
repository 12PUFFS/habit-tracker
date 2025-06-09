import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [completedHabits, setCompletedHabits] = useState(() => {
    const savedCompleted = localStorage.getItem('completedHabits');
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('completedHabits', JSON.stringify(completedHabits));
  }, [habits, completedHabits]);

  const addHabits = () => {
    if (inputValue.trim()) {
      setHabits([{ id: Date.now(), text: inputValue }, ...habits]);
      setInputValue('');
    }
  };

  const deleteHabits = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
    setCompletedHabits(completedHabits.filter((habit) => habit.id !== id));
  };

  const toggleComplete = (id) => {
    const habit =
      habits.find((h) => h.id === id) ||
      completedHabits.find((h) => h.id === id);

    if (habit) {
      if (habits.some((h) => h.id === id)) {
        // Перемещаем из активных в выполненные
        setHabits(habits.filter((h) => h.id !== id));
        setCompletedHabits([habit, ...completedHabits]);
      } else {
        // Перемещаем из выполненных обратно в активные
        setCompletedHabits(completedHabits.filter((h) => h.id !== id));
        setHabits([habit, ...habits]);
      }
    }
  };

  const filteredHabits =
    activeFilter === 'completed'
      ? completedHabits
      : activeFilter === 'active'
      ? habits
      : [...habits, ...completedHabits];

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
              <div
                className={`link ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                Все
              </div>
              <div
                className={`link ${activeFilter === 'active' ? 'active' : ''}`}
                onClick={() => setActiveFilter('active')}
              >
                Активные
              </div>
              <div
                className={`link ${
                  activeFilter === 'completed' ? 'active' : ''
                }`}
                onClick={() => setActiveFilter('completed')}
              >
                Выполненные
              </div>
            </div>
          </div>

          {filteredHabits.length === 0 ? (
            <div className="empty-state">
              <p>
                {activeFilter === 'completed'
                  ? 'Нет выполненных задач'
                  : 'Список задач пуст. Добавьте первую задачу!'}
              </p>
            </div>
          ) : (
            <ul>
              {filteredHabits.map((habit) => (
                <li
                  key={habit.id}
                  className={
                    completedHabits.some((h) => h.id === habit.id)
                      ? 'completed'
                      : ''
                  }
                >
                  {habit.text}
                  <div className="divs">
                    <span
                      className={`done ${
                        completedHabits.some((h) => h.id === habit.id)
                          ? 'completed'
                          : ''
                      }`}
                      onClick={() => toggleComplete(habit.id)}
                    >
                      ✓
                    </span>
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
