import React from 'react';

const EmptyDelegationState = () => {
  return(
      <div className='w-[498px] text-lg'>
          <p className='font-bold text-lg'> Legacy KT1 Delegation Contracts </p>
          <div className='flex flex-col gap-7 py-7'>
              <p className='text-sky-70'> No legacy KT1 delegation contracts found. </p>
              <p className='text-sky-70'> Legacy KT1 contracts were an older way to delegate funds. You no longer need to use them.</p>
          </div>
      </div>
  )
}

export default EmptyDelegationState;