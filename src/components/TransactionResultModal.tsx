import React from 'react'
import Modal from './Modal'

const TransactionResultModal = ({
    txHash,
    setTxHash
}: {
    txHash: string;
    setTxHash: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <>
            <Modal
                open={!!txHash}
                onClose={() => setTxHash('')}
            >
                <>
                    <p className='font-medium text-center'> Transaction Result </p>
                    <div className='pt-7'>
                        <p className='font-bold text-sm'> Transaction Hash </p>
                        <div className='flex gap-1'>
                            <p className='font-light text-[10px]'>
                                {txHash}
                            </p>
                            {/* TODO ADD ICON */}
                        </div>
                    </div>

                    <div className='pt-7'>
                        <p className='font-bold text-sm'> View on Block Explorer </p>
                        <p className='font-light text-[10px] text-sky-30'>
                            <a href={`https://tzkt.io/${txHash}`} target="_blank" rel="noopener noreferrer">
                                {`https://tzkt.io/${txHash}`}
                            </a>
                        </p>
                    </div>
                </>
            </Modal>
        </>
    )
}

export default TransactionResultModal