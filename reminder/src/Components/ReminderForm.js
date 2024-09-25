import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const activities = [
  "Wake up", "Go to gym", "Breakfast", "Meetings", "Lunch",
  "Quick nap", "Go to library", "Dinner", "Go to sleep"
];

const ReminderForm = ({ addReminder }) => {
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [selectedActivity, setSelectedActivity] = useState(activities[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reminder = { day: selectedDay, time: selectedTime, activity: selectedActivity, active: true };
    addReminder(reminder);
    resetForm();
  };

  const resetForm = () => {
    setSelectedDay(daysOfWeek[0]);
    setSelectedTime('10:00');
    setSelectedActivity(activities[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="daySelect">Select Day:</label>
        <select
          id="daySelect"
          className="form-control"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="timePicker">Select Time:</label>
        <TimePicker
          onChange={setSelectedTime}
          value={selectedTime}
          disableClock={true}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="activitySelect">Select Activity:</label>
        <select
          id="activitySelect"
          className="form-control"
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
        >
          {activities.map(activity => <option key={activity} value={activity}>{activity}</option>)}
        </select>
      </div>

      <button className="btn btn-primary mt-3" type="submit">
        <i className="fa fa-plus"></i> Add Reminder
      </button>
    </form>
  );
}

export default ReminderForm;
