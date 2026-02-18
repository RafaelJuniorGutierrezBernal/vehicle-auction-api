import React from 'react'

interface ButtonProps{
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    variant?: 'primary' | 'secondary' | 'danger' | 'confirmacionPuja';
    className?: string;
}

function Button({ children, onClick, variant = 'primary', className = ''}: ButtonProps){

    const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-colors"
    
    

    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700",
        confirmacionPuja: "bg-blue-600 text-white hover:bg-green-700 transition-colors"
    }

    const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className}`.trim()

    return (
        <button  className={buttonClasses}
      onClick={onClick}
    >
        {children}
        </button>
    )
}

export default Button