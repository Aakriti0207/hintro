import React from 'react';
import { getAvatarColor, getInitials } from '@/utils';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { outer: 'w-7 h-7 text-[10px]', radius: '6px' },
  md: { outer: 'w-8 h-8 text-xs', radius: '8px' },
  lg: { outer: 'w-10 h-10 text-sm', radius: '10px' },
};

export const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', className = '' }) => {
  const { bg, text } = getAvatarColor(name);
  const { outer, radius } = sizeMap[size];

  return (
    <div
      className={`${outer} flex items-center justify-center font-bold font-display flex-shrink-0 ${className}`}
      style={{ backgroundColor: bg, color: text, borderRadius: radius }}
      aria-label={`Avatar for ${name}`}
    >
      {getInitials(name)}
    </div>
  );
};

// User profile avatar with image fallback
interface ProfileAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  name,
  size = 32,
  className = '',
}) => {
  const { bg, text } = getAvatarColor(name);

  return (
    <div
      className={`flex items-center justify-center font-bold font-display flex-shrink-0 select-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        color: text,
        borderRadius: '50%',
        fontSize: size * 0.35,
      }}
      aria-label={`Profile avatar for ${name}`}
    >
      {getInitials(name)}
    </div>
  );
};
