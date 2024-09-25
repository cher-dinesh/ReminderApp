import React from 'react';
import ReminderItem from './ReminderItem';

const ReminderList = ({ reminders, editReminder, removeReminder }) => {
  return (
    <ul className="list-group">
      {reminders.map((reminder, index) => (
        <ReminderItem
          key={index}
          reminder={reminder}
          index={index}
          editReminder={editReminder}
          removeReminder={removeReminder}
        />
      ))}
    </ul>
  );
}

export default ReminderList;
