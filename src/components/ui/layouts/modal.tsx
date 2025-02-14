import type { FunctionComponent, PropsWithChildren } from 'react';

interface ModalProps {
    isOpened: boolean;
}

const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = ({ isOpened, children }) => {
    return (
        <dialog
            className={`fixed top-0 left-0 z-40 w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 transition-all ${
                isOpened ? 'block' : 'hidden'
            }`}
        >
            <div className="w-full h-full flex justify-center items-center">{children}</div>
        </dialog>
    );
};

export default Modal;
