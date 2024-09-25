import React from 'react';

const ReminderItem = ({ reminder, index, editReminder, removeReminder }) => {
  const toggleReminder = () => {
    const updatedReminder = { ...reminder, active: !reminder.active };
    editReminder(index, updatedReminder);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {`${reminder.day} at ${reminder.time}: ${reminder.activity}`}
      <div>
        <button
          className={`btn ${reminder.active ? 'btn-success' : 'btn-secondary'} btn-sm me-2`}
          onClick={toggleReminder}
        >
          {reminder.active ? 'On' : 'Off'}
        </button>
        <button className="btn btn-warning btn-sm me-2" onClick={() => editReminder(index, reminder)}>
          <i className="fa fa-edit"></i>
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => removeReminder(index)}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </li>
  );
}

export default ReminderItem;
