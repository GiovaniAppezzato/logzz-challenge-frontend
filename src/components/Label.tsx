import React from 'react';

interface IProps {
  children?: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export default function Label({
  children,
  className = '',
  ...rest
}: IProps) {
  return (
    <label className={`block text-sm mb-1 ${className}`} {...rest}>
      {children}
    </label>
  );
}