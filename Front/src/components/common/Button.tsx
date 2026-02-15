import React from 'react'

interface ButtonProps{
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
}

function Button({ children, onClick, variant = 'primary'}: ButtonProps){

    const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-colors"

    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700"
    }

    const buttonClasses = `${baseStyles} ${variantStyles[variant]}`

    return (
        <button  className={buttonClasses}
      onClick={onClick}
    >
        {children}
        </button>
    )
}

export default Button