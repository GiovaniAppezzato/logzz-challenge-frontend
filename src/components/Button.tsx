import React from 'react';
import { Spinner } from '@/components';

interface IProps {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  size?: 'xs'|'sm'|'lg'|'xl';
  type?: 'button'|'submit'|'reset';
  variant?: 'primary'|'primary-outline'|'primary-soft'
    |'secondary'|'secondary-outline'|'secondary-soft'
    |'success'|'success-outline'|'success-soft'
    |'danger'|'danger-outline'|'danger-soft';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  onClick,
  className = '',
  size,
  variant = 'primary',
  children,
  loading = false,
  ...rest
}: IProps) {
  const sizeClass = size ? `button-${size}` : '';
  const variantClass = variant ? `button-${variant}` : '';

  return (
    <button
      onClick={onClick}
      className={`button ${sizeClass} ${variantClass} ${className}`}
      disabled={loading}
      {...rest}
    >
      {
        !loading 
          ? children 
          : <Spinner />
      }
    </button>
  );
}
