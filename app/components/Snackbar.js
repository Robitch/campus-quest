import React, { useState } from 'react';

const Snackbar = ({ message, type, handle }) => {
    const [showSnackbar, setShowSnackbar] = useState(false);

    setShowSnackbar(handle);



    // couleur en fonction du type
    let bgColor = 'red';
    if (type === 'success') {
        bgColor = 'green';
    }


    return (
        <>
            {showSnackbar && (
                <div style={{ background: bgColor }} className="snackbar absolute top-10 left-1/2 -translate-x-1/2 pl-6  w-96 rounded-md flex justify-between">
                    <p className='py-4'>{message}</p>

                    <button className="hover:bg-white hover:bg-opacity-20 rounded-md transition-all m-2 aspect-square w-10 flex justify-center items-center" onClick={setShowSnackbar(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

export default Snackbar;
