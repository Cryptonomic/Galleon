import React from 'react';
import Modal from './Modal';

const ErrorModal = ({
    error,
    setError,
}:{
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
} ) => {
    return (
        <>
            <Modal
                open={!!error}
                onClose={() => setError('')}
            >
                <>
                    <p className='font-medium text-center'> Error </p>
                    <p className='font-light pt-7 text-center'> { error } </p>
                </>
            </Modal>
        </>
    )
}

export default ErrorModal;