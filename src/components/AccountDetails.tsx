import React, { useEffect, useState } from 'react';
import Button from './Button';
import { RpcClient } from '@taquito/rpc';

const refreshIcon = require('../assets/refresh_icon.png').default;

const AccountDetails = ({
    walletAddress,
    tezosNodeAddress
}: {
    walletAddress: string;
    tezosNodeAddress: string;
}) => {
    const [accountBalance, setAccountBalance] = useState(0);
    const [currentDelegate, setCurrentDelegate] = useState<string | null>('');

    const handleRefresh = async () => {
        try {
            if(walletAddress) {
                const client = new RpcClient(tezosNodeAddress);
                const balanceInMutez = await client.getBalance(walletAddress);
                const balanceInTez = balanceInMutez.toNumber() / 1000000;
                setAccountBalance(balanceInTez);

                const delegateAddress = await client.getDelegate(walletAddress);
                setCurrentDelegate(delegateAddress);
            }
        } catch (error) {
            console.log('Failed to fetch account details: ' + error);
        }
    }

    useEffect(() => {
        handleRefresh();
    }, [walletAddress]);

    return (
        <div className='bg-sky-30 text-white flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-lg'>
            <div className='flex flex-wrap gap-y-2 justify-between items-start'>
                <p className='break-all'>
                    <span className='font-bold text-xl'> Wallet Address: </span>
                    { walletAddress }
                </p>
                <Button
                    text={'Refresh'}
                    onButtonClick={handleRefresh}
                    disabled={!walletAddress}
                    iconSrc={refreshIcon}
                />
            </div>
            <div className='flex flex-wrap gap-y-2 gap-x-[3.75rem]'>
                <div>
                    <p className='font-bold text-lg'> Balance </p>
                    <p> { accountBalance } ꜩ </p>
                </div>
                <div>
                    <p className='font-bold text-lg'> Delegate </p>
                    <p className='break-all'> { currentDelegate } </p>
                </div>
            </div>
        </div>
    )
}

export default AccountDetails;