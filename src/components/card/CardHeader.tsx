import { ReactNode } from 'react';

interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
}

function CardHeader({ className = '', children, ...rest }: CardHeaderProps) {
  return (
    <div className={`card-header ${className}`} {...rest}>
      {children}
    </div>
  )
}

export default CardHeader
