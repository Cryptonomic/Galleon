import React from 'react';

interface ITextInput {
    id: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

const TextInput = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    className,
}: ITextInput) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label htmlFor={id}>
                {label}
            </label>
            <input
                type="text"
                id={id}
                value={value}
                placeholder={placeholder ?? label}
                onChange={onChange}
                className='w-full h-[26px] flex items-center border border-grey rounded-sm pl-2 outline-none'
            />
        </div>
    )
}

export default TextInput

