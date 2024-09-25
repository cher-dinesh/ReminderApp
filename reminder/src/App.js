import React, { useState, useEffect } from 'react';
import ReminderForm from './Components/ReminderForm';
import ReminderList from './Components/ReminderList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

const App = () => {
  const [reminders, setReminders] = useState([]);
  const audio = new Audio('/sound.mp3');
  audio.load();

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
      const currentTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

      reminders.forEach((reminder, index) => {
        if (reminder.active && reminder.day === currentDay && reminder.time === currentTime) {
          audio.play().catch(error => console.error("Error playing audio:", error));

          if (Notification.permission === 'granted') {
            new Notification(`Reminder: ${reminder.activity}`, {
              body: `It's time to ${reminder.activity} on ${reminder.day} at ${reminder.time}.`,
            });
          }

          setReminders(prevReminders => {
            const updatedReminders = [...prevReminders];
            updatedReminders[index].active = false;
            return updatedReminders;
          });
        }
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [reminders, audio]);

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  const editReminder = (index, updatedReminder) => {
    const updatedReminders = [...reminders];
    updatedReminders[index] = updatedReminder;
    setReminders(updatedReminders);
  };

  const removeReminder = (index) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4"><i className="fa fa-bell"></i> Daily Reminder App</h1>
      <ReminderForm addReminder={addReminder} />
      <h2 className="mt-3">Reminders</h2>
      <ReminderList
        reminders={reminders}
        editReminder={editReminder}
        removeReminder={removeReminder}
      />
    </div>
  );
}

export default App;
