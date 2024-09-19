import { ReactNode } from 'react';

interface CardBodyProps {
  children?: ReactNode;
  className?: string;
}

function CardBody({ className = '', children, ...rest }: CardBodyProps) {
  return (
    <div className={`card-body ${className}`} {...rest}>
      {children}
    </div>
  )
}

export default CardBody
