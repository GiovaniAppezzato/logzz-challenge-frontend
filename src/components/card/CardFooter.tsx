import { ReactNode } from 'react';

interface CardFooterProps {
  children?: ReactNode;
  className?: string;
}

function CardFooter({ className = '', children, ...rest }: CardFooterProps) {
  return (
    <div className={`card-footer ${className}`} {...rest}>
      {children}
    </div>
  )
}

export default CardFooter
