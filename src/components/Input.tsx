import React from 'react';

interface IProps {
  name: string;
  id?: string;
  value?: string;
  error?: string;
  placeholder?: string;
  type?: string
  className?: string
  ref?: React.RefObject<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({
  value = '',
  type = 'text',
  className = '',
  error,
  onChange,
  ...rest  
}: IProps) {
  const inputClasses = `input ${className} ${error ? ' is-input-danger' : ''}`;

  return (
    <>
      <input
        className={inputClasses}
        value={value}
        onChange={onChange}
        type={type}
        {...rest}
      />
      {error && (
        <span
          className="inline-block uppercase text-danger text-[12px] font-medium pl-2 mt-1"
          role="alert"
        >
          {error}
        </span>
      )}
    </>
  );
};
