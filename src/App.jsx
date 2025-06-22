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

  const addHabit = () => {
    if (inputValue.trim()) {
      setHabits([
        {
          id: Date.now(),
          text: inputValue,
          important: false,
        },
        ...habits,
      ]);
      setInputValue('');
    }
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
    setCompletedHabits(completedHabits.filter((habit) => habit.id !== id));
  };

  const toggleComplete = (id) => {
    const habit =
      habits.find((h) => h.id === id) ||
      completedHabits.find((h) => h.id === id);

    if (habit) {
      if (habits.some((h) => h.id === id)) {
        setHabits(habits.filter((h) => h.id !== id));
        setCompletedHabits([habit, ...completedHabits]);
      } else {
        setCompletedHabits(completedHabits.filter((h) => h.id !== id));
        setHabits([habit, ...habits]);
      }
    }
  };

  const toggleImportant = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, important: !habit.important } : habit
      )
    );
  };

  const filteredHabits = () => {
    switch (activeFilter) {
      case 'completed':
        return completedHabits;
      case 'active':
        return habits;
      case 'important':
        return [...habits, ...completedHabits].filter(
          (habit) => habit.important
        );
      default:
        return [...habits, ...completedHabits];
    }
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
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            />
            {/* <button className="btn" onClick={addHabit}>
              Добавить задачу
            </button> */}
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
              <div
                className={`link gold ${
                  activeFilter === 'important' ? 'active' : ''
                }`}
                onClick={() => setActiveFilter('important')}
              >
                Важные
              </div>
            </div>
          </div>

          {filteredHabits().length === 0 ? (
            <div className="empty-state">
              <p>
                {activeFilter === 'completed'
                  ? 'Нет выполненных задач'
                  : activeFilter === 'important'
                  ? 'Нет важных задач'
                  : 'Список задач пуст. Добавьте первую задачу!'}
              </p>
            </div>
          ) : (
            <ul>
              {filteredHabits().map((habit) => (
                <li
                  key={habit.id}
                  className={`
                    ${
                      completedHabits.some((h) => h.id === habit.id)
                        ? 'completed'
                        : ''
                    }
                    ${habit.important ? 'important' : ''}
                  `}
                >
                  {habit.text}
                  <div className="divs">
                    <span
                      className={`star ${habit.important ? 'active' : ''}`}
                      onClick={() => toggleImportant(habit.id)}
                    >
                      ★
                    </span>
                    <span
                      className={`done ${
                        completedHabits.some((h) => h.id === habit.id)
                          ? 'completed'
                          : ''
                      }`}
                      onClick={() => toggleComplete(habit.id)}
                      style={{
                        display: completedHabits.some((h) => h.id === habit.id)
                          ? 'none'
                          : 'inline-block',
                      }}
                    >
                      ✓
                    </span>
                    <span
                      className="delete"
                      onClick={() => deleteHabit(habit.id)}
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
