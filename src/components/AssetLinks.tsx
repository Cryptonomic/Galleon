import React from 'react';

const AssetLinks = ({
    walletAddress
}: {
    walletAddress: string;
}) => {
    const txLink = `https://tzstats.com/${walletAddress}#transactions`;
    const nftLink = `https://tzstats.com/${walletAddress}#nfts`;
    const tokensLink = `https://tzstats.com/${walletAddress}#tokens`;

    return (
        <div className='bg-sky-30flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-lg'>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-wrap gap-2'>
                    <p className='font-bold'> View Transactions </p>
                    <p className='text-sky-30'>
                        <a href={txLink} target='_blank' rel='noopener noreferrer' className='break-all'>
                            {walletAddress && txLink}
                        </a>
                    </p>
                </div>
                <div className='flex flex-wrap gap-2'>
                    <p className='font-bold'> View NFTs </p>
                    <p className='text-sky-30'>
                        <a href={nftLink} target='_blank' rel='noopener noreferrer' className='break-all'>
                            {walletAddress && nftLink}
                        </a>
                    </p>
                </div>
                <div className='flex flex-wrap gap-2'>
                    <p className='font-bold'> View Tokens </p>
                    <p className='text-sky-30'>
                        <a href={tokensLink} target='_blank' rel='noopener noreferrer' className='break-all'>
                            {walletAddress && tokensLink}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AssetLinks;