import { cn } from '@/util/cn';

export interface BaseIconProps {
  color?: string;
  size?: number;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  path: string;
  ariaLabel?: string;
  title?: string;
}

export function BaseIcon({
  color,
  size = 24,
  radius = 'none',
  className,
  path,
  ariaLabel,
  title,
}: BaseIconProps) {
  const radiusMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      className={cn(radiusMap[radius], className)}
      aria-label={ariaLabel}
      preserveAspectRatio="xMidYMid meet"
    >
      {title && <title>{title}</title>}
      <path d={path} />
    </svg>
  );
}
