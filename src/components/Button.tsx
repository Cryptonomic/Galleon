import React from 'react';

const Button = ({
    text,
    onButtonClick,
    disabled
}: {
    text: string;
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}) => {
    return (
        <div>
            <button
                onClick={onButtonClick}
                disabled={disabled}
                className='bg-sky-30 font-medium text-white min-w-fit py-2 px-6 rounded-2xl disabled:opacity-50'
            >
                { text }
            </button>
        </div>
    )
}

export default Button