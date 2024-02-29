import React, { useEffect, useState, useRef, Fragment } from "react";

import { Html5Qrcode } from "html5-qrcode";

const CodeReader = ({ onResult }) => {
    const fileRef = useRef(null);
    const [cameraList, setCameraList] = useState([]);
    const [activeCamera, setActiveCamera] = useState();
    const [scannerStarted, setScannerStarted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (!isOpen) return; // Ne rien faire si la modale est fermée

        const html5QrCode = new Html5Qrcode("reader");
        let currentScanner = html5QrCode;

        const startScanner = async () => {
            try {
                await currentScanner.start(
                    { facingMode: "environment" },
                    { fps: 10, qrbox: 200 },
                    (decodedText) => {
                        closeModal();
                        onResult(decodedText);
                        console.log("decodedText", decodedText);
                        currentScanner.clear();
                    }
                );
                setScannerStarted(true);
            } catch (err) {
                console.error("Error starting scanner: ", err);
            }
        };

        startScanner();

        return () => {
            if (scannerStarted) {
                currentScanner.stop().catch((err) => console.error(err));
            }
        };
    }, [isOpen, onResult, scannerStarted]);

    useEffect(() => {
        if (!isOpen) return; // Ne rien faire si la modale est fermée

        Html5Qrcode.getCameras()
            .then((devices) => {
                setCameraList(devices);
                setActiveCamera(devices[0]);
            })
            .catch((err) => {
                console.error("Error getting cameras: ", err);
                setCameraList([]);
            });
    }, [isOpen]);



    return (
        <div>

            {isOpen && (
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg
                                            className="h-6 w-6 text-red-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                            />
                                        </svg>
                                    </div>
                                    <div id="reader" width="100%" />

                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                            Scanner le QR Code
                                        </h3>

                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}




            <button className="h-14 absolute bottom-10 left-1/2 -translate-x-1/2 aspect-square rounded-lg bg-white text-[#729669] flex justify-center items-center shadow-2xl" onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                    <path fillRule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z" clipRule="evenodd" />
                </svg>

            </button>
            {/* <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={scanFile}
            /> */}
            {/* {cameraList.length > 0 && (
                <select onChange={onCameraChange}>
                    {cameraList.map((li) => (
                        <option
                            key={li.id}
                            id={li.id}
                            selected={activeCamera && activeCamera.id === li.id}
                        >
                            {li.label}
                        </option>
                    ))}
                </select>
            )} */}
        </div>
    );
};

export default CodeReader;
