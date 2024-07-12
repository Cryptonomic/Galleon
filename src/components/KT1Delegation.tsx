import React, { useState } from 'react';

const KT1Delegation = () => {
  const [isDelegationContract, setIsDelegationContract] = useState(false);

  return (
    <div className='bg-grey-20 flex flex-col gap-2 py-4 px-6 mt-4 border border-grey-10 rounded-lg'>
      {isDelegationContract
        ? <p>fghbgfdfg</p>
        : <>
          <p className='font-bold text-lg'> Legacy KT1 Delegation Contracts </p>
          <div className='flex flex-col gap-7 py-7'>
            <p className='text-sky-70'> No legacy KT1 delegation contracts found. </p>
            <p className='text-sky-70'> Legacy KT1 contracts were an older way to delegate funds. You no longer need to use them.</p>
          </div>
        </>
      }
    </div>
  )
}

export default KT1Delegation;