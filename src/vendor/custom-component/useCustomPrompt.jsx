import { useState, useRef, useEffect } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';
// import { Modal } from 'antd';

const useCustomPrompt = ({ title, contnet }, shouldPrompt) => {
    const retryFn = useRef(() => {});

    const handleBlockNavigation = ({ retry }) => {
        const shouldDisplayPrompt = typeof shouldPrompt === 'boolean' ? shouldPrompt : shouldPrompt();

        if (shouldDisplayPrompt) {
            // confirmation modal opens here
            // Modal.confirm({
            //     title: 'some title',
            //     content: 'this is the contnet',
            //     onOk() {
            //     retry();
            //     },
            //     onCancel() {},
            // });
        } else {
            retry();
        }
    };
    
    useBlocker(handleBlockNavigation, shouldPrompt);
};

export default useCustomPrompt;
