import * as React from 'react';

interface IModal {
    open: boolean;
    children: React.ReactElement;
    onClose: React.MouseEventHandler;
    height?: string;
};

const Modal = (props: IModal) => {

    if(!props.open) {
        return null;
    };

    return (
        <div
            className='bg-[#00000014] flex justify-center fixed left-0 right-0 top-0 bottom-0 z-[100]'
       >
            <div className={`bg-white w-[451px] ${props.height ?? 'h-[209px]'} p-7 mt-[137px] rounded-3xl relative flex flex-col overflow-scroll`}>
              {props.children}
                <button
                  className='absolute top-4 right-6'
                  onClick={props.onClose}
                >&#x2715;</button>
            </div>
        </div>
    );
}

export default Modal;