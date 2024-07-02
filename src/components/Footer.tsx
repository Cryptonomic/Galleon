import React from 'react';

const Footer = () => {
    return (
        <div>
            <p className='text-xs font-light pt-6 pb-10 text-center'> {`[帆船ウォレット]`} </p>
            <div className='flex flex-wrap justify-center gap-4'>
                <p className='text-black text-sm font-light'> Copyright 2024, Cryptonomic Inc. </p>
                <a href={'#'} target='_blank' rel='noopener noreferrer' className='text-sky-30 text-xs font-light'>
                    Terms of Service
                </a>
                <a href={'#'} target='_blank' rel='noopener noreferrer' className='text-sky-30 text-xs font-light'>
                    Privacy Policy
                </a>
            </div>
        </div>
    )
}

export default Footer;