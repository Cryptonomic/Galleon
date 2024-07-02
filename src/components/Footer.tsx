import React from 'react';

const Footer = () => {
    return (
        <div>
            <p className='text-xs font-light pt-6 pb-10 text-center'> {`[帆船ウォレット]`} </p>
            <div className='flex flex-wrap justify-center items-center gap-4'>
                <a href={'https://cryptonomic.tech/'} target='_blank' rel='noopener noreferrer' className='text-black text-sm font-light'>
                    Copyright 2024, Cryptonomic Inc.
                </a>
                <a href={'https://github.com/Cryptonomic/Deployments/blob/master/Terms_of_Service.pdf'} target='_blank' rel='noopener noreferrer' className='text-sky-30 text-xs'>
                    Terms of Service
                </a>
                <a href={'https://github.com/Cryptonomic/Deployments/blob/master/Terms_of_Service.pdf'} target='_blank' rel='noopener noreferrer' className='text-sky-30 text-xs'>
                    Privacy Policy
                </a>
            </div>
        </div>
    )
}

export default Footer;