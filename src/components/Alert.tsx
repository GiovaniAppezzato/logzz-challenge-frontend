import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
  type?: 'danger'|'warning'|'info'|'success'|'primary'|'secondary';
}

export default function Alert({
  children,
  className = '',
  type = 'success',
}: IProps) {
  function getAlertClasses() {
    switch (type) {
      case 'danger':
        return 'text-danger bg-danger/20';
      case 'warning':
        return 'text-warning bg-warning/20';
      case 'info':
        return 'text-info bg-info/20';
      case 'secondary':
        return 'text-secondary bg-secondary/20';
      case 'primary': default:
        return 'text-primary bg-primary/20';
    }
  };

  const alertClasses = `p-4 text-sm rounded-lg ${getAlertClasses()} ${className}`;

  return (
    <div className={alertClasses}>
      {children}
    </div>
  );
}