import React from 'react';
import { IoPerson } from "react-icons/io5";

interface IProps {
  className?: string;
  src?: string;
  icon?: React.ReactNode;
}

export default function Label({
  className = '',
  src = '',
  icon,
  ...rest
}: IProps) {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt="User Avatar"
          className={`w-10 h-10 object-cover rounded-full ${className}`}
          {...rest}
        />
      ) : (
        <div
          className={`w-10 h-10 bg-gray-200 rounded-full ${className} flex items-center justify-center dark:!bg-zinc-800`}
          {...rest}
        >
          {icon || <IoPerson className="w-4 h-4 m-auto text-gray-600" />}
        </div>
      )}
    </>
  );
}