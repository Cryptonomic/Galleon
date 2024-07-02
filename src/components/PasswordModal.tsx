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
                <div className='flex flex-wrap gap-8'>
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
            </Modal>
        </>
    )
}

export default PasswordModal;