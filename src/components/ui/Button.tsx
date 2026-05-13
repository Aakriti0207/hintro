import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 rounded-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-[--accent] text-white hover:bg-[--accent-hover] active:scale-[0.98]',
    secondary:
      'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-[0.98]',
    ghost:
      'text-gray-600 hover:bg-gray-100 hover:text-gray-800 active:scale-[0.98]',
    danger:
      'bg-red-50 text-red-600 hover:bg-red-100 active:scale-[0.98]',
    outline:
      'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'h-[36px] px-4 text-[13px]',
    md: 'h-[42px] px-5 text-[14px]',
    lg: 'h-[46px] px-6 text-[15px]',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
};
