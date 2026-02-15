import React from 'react';

interface CardProps{
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;

}

function Card ({children, className = '', onClick}: CardProps){

    const baseStyles = "bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"

    const cardClasses = `${baseStyles} ${className}`

    const clickableStyles = onClick ? "cursor-pointer hover:shadow-xl": ""

    return (
        <div className={`${cardClasses} ${clickableStyles}`}
        onClick={onClick}
        >
            {children}
        </div>
    )
}

export default Card