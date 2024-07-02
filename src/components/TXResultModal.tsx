import React from 'react';
import Modal from './Modal';
const copyIcon = require('../assets/copy_icon.png').default;

import Loader from './Loader';

const TXResultModal = ({
    txHash,
    isTXResultModal,
    setIsTXResultModal
}: {
    txHash: string;
    isTXResultModal: boolean;
    setIsTXResultModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <>
            <Modal
                open={isTXResultModal}
                onClose={() => setIsTXResultModal(false)}
            >
                <>
                    <p className='font-medium text-center'> Transaction Result </p>
                    {!txHash
                        ? <Loader />
                        : <>
                            <div className='pt-7'>
                                <p className='font-bold text-sm'> Transaction Hash </p>
                                <div className='flex gap-1 items-center'>
                                    <p className='font-light text-[10px]'>
                                        {txHash}
                                    </p>
                                    <button className='w-4 h-4' onClick={() => navigator.clipboard.writeText(txHash)}>
                                        <img src={copyIcon} alt='copy' className='w-full h-full' />
                                    </button>
                                </div>
                            </div>

                            <div className='pt-7'>
                                <p className='font-bold text-sm'> View on Block Explorer </p>
                                <p className='font-light text-[10px] text-sky-30 break-words whitespace-normal'>
                                    <a href={`https://tzkt.io/${txHash}`} target='_blank' rel='noopener noreferrer' className='break-all'>
                                        {`https://tzkt.io/${txHash}`}
                                    </a>
                                </p>
                            </div>
                        </>
                    }
                </>
            </Modal>
        </>
    )
}

export default TXResultModal