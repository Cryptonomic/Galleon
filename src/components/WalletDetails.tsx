import React, { useEffect, useState } from 'react';
import Button from './Button';
import { RpcClient } from '@taquito/rpc';

import refreshIcon from '../assets/refresh_icon.png';

const WalletDetails = ({
    walletAddress,
    tezosNodeAddress
}: {
    walletAddress: string;
    tezosNodeAddress: string;
}) => {
    const [accountBalance, setAccountBalance] = useState(0);
    const [currentDelegate, setCurrentDelegate] = useState<string | null>('');

    const handleRefresh = async () => {
        if(walletAddress) {
            const client = new RpcClient(tezosNodeAddress);
            const balanceInMutez = await client.getBalance(walletAddress);
            const balanceInTez = balanceInMutez.toNumber() / 1000000;
            setAccountBalance(balanceInTez);

            const delegateAddress = await client.getDelegate(walletAddress);
            setCurrentDelegate(delegateAddress);
        }
    }

    useEffect(() => {
        handleRefresh();
    }, [walletAddress]);

    const txLink = `https://tzstats.com/${walletAddress}#transactions`;
    const nftLink = `https://tzstats.com/${walletAddress}#nfts`;
    const tokensLink = `https://tzstats.com/${walletAddress}#tokens`;


    return (
        <div className='flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-3xl'>
            <div className='flex justify-between items-start'>
                <p>
                    <span className='font-bold'> Wallet Address: </span>
                    { walletAddress }
                </p>
                <Button
                    text={'Refresh'}
                    onButtonClick={handleRefresh}
                    disabled={!walletAddress}
                    iconSrc={refreshIcon}
                />
            </div>
            <div className='flex gap-x-[3.75rem]'>
                <div>
                    <p className='font-bold'> Balance </p>
                    <p> { accountBalance } ꜩ </p>
                </div>
                <div>
                    <p className='font-bold'> Delegate </p>
                    <p> { currentDelegate } </p>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <p className='font-bold'> View Transactions </p>
                    <p className='text-sky-30'>
                        <a href={txLink} target="_blank" rel="noopener noreferrer">
                            {walletAddress && txLink}
                        </a>
                    </p>
                </div>
                <div className='flex gap-2'>
                    <p className='font-bold'> View NFTs </p>
                    <p className='text-sky-30'>
                        <a href={nftLink} target="_blank" rel="noopener noreferrer">
                            {walletAddress && nftLink}
                        </a>
                    </p>
                </div>
                <div className='flex gap-2'>
                    <p className='font-bold'> View Tokens </p>
                    <p className='text-sky-30'>
                        {}
                        <a href={tokensLink} target="_blank" rel="noopener noreferrer">
                            {walletAddress && tokensLink}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WalletDetails;