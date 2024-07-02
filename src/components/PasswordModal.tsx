import React from 'react';
import Modal from './Modal';
import PassphraseInput from './PassphraseInput';
import Button from './Button';

const PasswordModal = ({
  passphrase,
  setPassphrase,
  isPasswordModal,
  setIsPasswordModal,
  onUnlockWallet
}:{
    passphrase: string;
    setPassphrase: React.Dispatch<React.SetStateAction<string>>;
    isPasswordModal: boolean;
    setIsPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
    onUnlockWallet: (event: React.MouseEvent<HTMLButtonElement>) => void;
} ) => {


    return (
        <>
            <Modal
                open={isPasswordModal}
                onClose={() => setIsPasswordModal(false)}
            >
                <>
                  <p className='font-medium text-center pb-9'> Enter Passphrase to Unlock </p>
                  <div className='flex flex-wrap justify-center items-end gap-8'>
                    <PassphraseInput value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
                    <Button
                        text={'Unlock'}
                        onButtonClick={(e) =>{
                            onUnlockWallet(e);
                            setIsPasswordModal(false);
                        }}
                        disabled={!passphrase}
                    />
                  </div>
                </>
            </Modal>
        </>
    )
}

export default PasswordModal;