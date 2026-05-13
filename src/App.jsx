import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);

  // إضافة مهمة جديدة أو حفظ التعديل
  const handleAddOrUpdateTask = () => {
    if (inputValue.trim() === '') return;

    if (editingId !== null) {
      setTasks(tasks.map(task => 
        task.id === editingId ? { ...task, text: inputValue } : task
      ));
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTasks([...tasks, newTask]);
    }
    setInputValue('');
  };

  // حذف مهمة
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // بدء عملية التعديل
  const startEdit = (task) => {
    setEditingId(task.id);
    setInputValue(task.text);
  };

  // تغيير حالة اكتمال المهمة
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {/* قسم الإدخال كما في image_395251.png */}
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="text" 
          placeholder="Enter Task" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: '5px', fontSize: '16px' }}
        />
        <button 
          onClick={handleAddOrUpdateTask}
          style={{ padding: '5px 10px', fontSize: '16px', marginLeft: '5px' }}
        >
          {editingId !== null ? 'Update' : 'Add Task'}
        </button>
      </div>

      {/* قائمة المهام */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ 
              fontSize: '18px', 
              marginRight: '10px',
              textDecoration: task.completed ? 'line-through' : 'none' 
            }}>
              {task.text}
            </span>
            <button 
              onClick={() => deleteTask(task.id)}
              style={{ marginRight: '5px' }}
            >
              Remove
            </button>
            <button onClick={() => startEdit(task)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;