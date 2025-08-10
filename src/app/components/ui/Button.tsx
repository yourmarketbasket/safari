import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg',
  {
    variants: {
      variant: {
        primary: 'border border-purple-600 text-purple-600 hover:bg-purple-100 focus:ring-purple-500',
        secondary: 'border border-gray-400 text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        danger: 'border border-pink-600 text-pink-600 hover:bg-pink-100 focus:ring-pink-500',
        success: 'border border-lime-500 text-lime-600 hover:bg-lime-100 focus:ring-lime-500',
        ghost: 'hover:bg-gray-100',
        link: 'text-purple-600 underline-offset-4 hover:underline',
        pagination: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 rounded-md',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
