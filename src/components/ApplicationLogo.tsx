import { StaticImageData } from 'next/image';
import Image from 'next/image';
import logzz from '@/assets/images/logzz.png';

interface IProps {
  className?: string;
  alt?: string;
  src?: StaticImageData; 
}

export default function ApplicationLogo({ 
  alt = 'Application Logo',
  src = logzz,
  ...rest 
}: IProps) {
  return (
    <Image {...rest} src={src} alt={alt} />
  )
}
