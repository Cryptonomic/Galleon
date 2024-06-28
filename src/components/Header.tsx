import React from 'react';

import galleonLogo from '../assets/logo.png';

const Header = ({
  tezosNodeAddress,
  setTezosNodeAddress
}: {
  tezosNodeAddress: string;
  setTezosNodeAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {

  return (
    <div className='flex justify-between'>
      <div className='w-[150px] h-[40px]'>
        <img src={galleonLogo} alt='galleon' className='w-full h-full' />
      </div>
      <div className='flex gap-x-1'>
        <p className='text-lg'>Tezos Node</p>
        <div className='w-[204px] h-[28px]'>
          <input
              type="text"
              placeholder="Tezos Node Address"
              value={tezosNodeAddress}
              onChange={setTezosNodeAddress}
              className='w-full h-full flex items-center bg-white border border-grey rounded-sm pl-2 outline-none'
          />
        </div>
      </div>
    </div>
  )
}

export default Header;