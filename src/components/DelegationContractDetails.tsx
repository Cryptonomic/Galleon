import React, { useState } from 'react';
import Amount from './Amount';

const DelegationContractDetails = ({
  contractAddress,
  balance,
  onClickWithdraw,
  disabled
}:{
  contractAddress: string;
  balance: number;
  onClickWithdraw: (amountInTez: string) => void;
  disabled: boolean;
}) => {

  const [amount, setAmount] = useState('');

  const contractAddressLink = `https://tzkt.io/${contractAddress}/operations`

  return(
      <div>
          <p>
              <span className='font-bold'> Contract Address: </span>
              <a href={contractAddressLink} target='_blank' rel='noopener noreferrer' className='break-all text-sky-30'>
                  { contractAddress}
              </a>
          </p>
          <p className='pb-8'>
              <span className='font-bold'> Balance: </span>
              { balance }  ꜩ
          </p>
          <Amount
              { ...{amount, setAmount, disabled }}
              buttonText={'Withdraw'}
              onButtonClick={() => {
                onClickWithdraw(amount);
                setAmount('');
              }}
          />
      </div>
  )
}

export default DelegationContractDetails;