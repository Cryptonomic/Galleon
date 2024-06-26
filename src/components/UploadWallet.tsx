import React from 'react';
import PassphraseInput from './PassphraseInput';
import Button from './Button';

const UploadWallet = ({
  handleFileChange,
  passphraseRef,
  unlockWallet,
  disabled
}: {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passphraseRef: React.RefObject<HTMLInputElement>;
  unlockWallet: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}) => {
  return (
    <div className='bg-sky-20 py-4 px-6 border rounded-3xl'>
      <p className='font-bold'> Open Existing Wallet </p>
      <div className='flex items-end gap-x-8'>
        <div>
          <p> Upload Wallet </p>
          <input type="file" onChange={handleFileChange} className='w-[242px]'/>
        </div>
        <PassphraseInput ref={passphraseRef} />
        <Button text={'Open'} onButtonClick={unlockWallet} disabled={disabled} />
      </div>
    </div>
  )
}

export default UploadWallet;