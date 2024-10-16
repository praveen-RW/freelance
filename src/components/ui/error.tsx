import React from 'react';

type AlertProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning'; // You can add more types as needed
  onDismiss: () => void; // Callback to dismiss the alert
};

const Alert: React.FC<AlertProps> = ({ message, type = 'info', onDismiss }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'info':
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 border-l-4 rounded shadow-md ${getAlertStyles()}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onDismiss}
          className="ml-4 text-lg font-semibold hover:text-opacity-75 focus:outline-none"
        >
          &times; {/* Close button */}
        </button>
      </div>
    </div>
  );
};

export default Alert;
