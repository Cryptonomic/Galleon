import React from 'react';

const Button = ({
    text,
    onButtonClick,
    disabled,
    iconSrc,
}: {
    text: string;
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    iconSrc?: string;
}) => {
    return (
        <div>
            <button
                onClick={onButtonClick}
                disabled={disabled}
                className='bg-sky-30 flex items-center gap-2 font-medium text-white min-w-fit py-1.5 px-6 rounded-2xl disabled:opacity-50'
            >
                {iconSrc &&
                    <span>
                        <img src={iconSrc} alt={text} className='w-6 h-6' />
                    </span>
                }
                <span> { text } </span>
            </button>
        </div>
    )
}

export default Button