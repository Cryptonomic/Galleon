import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const TezosNodeSettings = ({
    tezosNodeAddress,
    setTezosNodeAddress,
    isNodeSettingsModal,
    setIsNodeSettingsModal
}:{
    tezosNodeAddress: string;
    setTezosNodeAddress: React.Dispatch<React.SetStateAction<string>>;
    isNodeSettingsModal: boolean;
    setIsNodeSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
} ) => {
    const [currentNodeAddress, setCurrentNodeAddress] = useState('');

    const mainnetNodes = 'https://taquito.io/docs/rpc_nodes/';

    return (
        <>
            <Modal
                open={isNodeSettingsModal}
                onClose={() => setIsNodeSettingsModal(false)}
                height='h-max'
            >
                <>
                    <p className='font-medium text-center pb-9'>  Tezos Node Settings </p>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <p> Default Tezos Node </p>
                            <p className='font-light'> https://rpc.tzbeta.net/ (Tezos Foundation) </p>
                        </div>

                        <div>
                            <p> Find Mainnet Nodes </p>
                            <a href={mainnetNodes} target='_blank' rel='noopener noreferrer' className='text-sky-30'>
                                {mainnetNodes}
                            </a>
                        </div>

                        <div className='flex flex-wrap justify-between items-end'>
                            <div>
                                <p> Update Node URL </p>
                                <div className='w-[204px] h-[28px]'>
                                <input
                                    type="text"
                                    placeholder={tezosNodeAddress}
                                    value={currentNodeAddress}
                                    onChange={(e) => setCurrentNodeAddress(e.target.value)}
                                    // onChange={setTezosNodeAddress}
                                    className='w-full h-full flex items-center bg-white border border-grey rounded-sm pl-2 outline-none'
                                />
                            </div>
                            </div>

                            <Button
                                text={'Update'}
                                onButtonClick={() => {
                                    setTezosNodeAddress(currentNodeAddress);
                                    setCurrentNodeAddress('');
                                    setIsNodeSettingsModal(false);
                                }}
                                disabled={!currentNodeAddress}
                            />
                        </div>

                    </div>
                </>
            </Modal>
        </>
    )
}

export default TezosNodeSettings;