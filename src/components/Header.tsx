import React from 'react';

const galleonLogo = require('../assets/logo.png').default;
const openIcon = require('../assets/open.png').default;
const settingsIcon = require('../assets/settings.png').default;
const helpIcon = require('../assets/help.png').default;

import config from '../config.json';

const Header = ({
    tezosNodeAddress,
    setTezosNodeAddress
}: {
    tezosNodeAddress: string;
    setTezosNodeAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {

    return (
        <div className='flex flex-wrap justify-between items-center'>
            <div className='w-[150px] h-[40px]'>
              <img src={galleonLogo} alt='galleon' className='w-full h-full' />
            </div>
            <div className='flex flex-wrap items-center text-sm sm:text-base'>
                <p className='p-4 border-r'> Version {config.version} </p>
                <a
                    href={'https://discourse.cryptonomic.tech/t/creating-a-new-wallet-file/509'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex gap-1 uppercase p-4 font-medium border-r '
                >
                  <span>
                    CREATE NEW WALLET
                  </span>
                  <img src={openIcon} alt='open' className='w-6 h-6' />
                </a>
                <a
                    href={''}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex gap-1 uppercase p-4 font-medium border-r '
                >
                  <span>
                    Tezos Node
                  </span>
                  <img src={settingsIcon} alt='open' className='w-6 h-6' />
                </a>
                <a
                    href={'https://discourse.cryptonomic.tech/tags/c/public/galleon-ext/22/faq'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex flex-col items-center gap-1 uppercase p-4 font-medium '
                >
                  <img src={helpIcon} alt='open' className='w-6 h-6' />
                  <span>
                    Help
                  </span>
                </a>
            </div>
            {/* <div className='flex gap-x-1'>
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
            </div> */}
        </div>
    )
}

export default Header;