import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const CodeReader = ({ onResult }) => {
    const fileRef = useRef(null);
    const [cameraList, setCameraList] = useState([]);
    const [activeCamera, setActiveCamera] = useState();
    const [scannerStarted, setScannerStarted] = useState(false); // Ajout de l'état du scanner

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");
        let currentScanner = html5QrCode; // Stockage de l'instance du scanner

        const startScanner = async () => {
            try {
                await currentScanner.start(
                    { facingMode: "environment" },
                    { fps: 10, qrbox: { width: 300, height: 300 } },
                    (decodedText) => {
                        onResult(decodedText);
                        currentScanner.clear();
                    }
                );
                setScannerStarted(true); // Mise à jour de l'état du scanner
            } catch (err) {
                console.error("Error starting scanner: ", err);
            }
        };

        startScanner(); // Démarrage du scanner

        Html5Qrcode.getCameras()
            .then((devices) => {
                setCameraList(devices);
                setActiveCamera(devices[0]);
            })
            .catch((err) => {
                console.error("Error getting cameras: ", err);
                setCameraList([]);
            });

        // Nettoyage du scanner lorsque le composant est démonté
        return () => {
            if (scannerStarted) { // Vérification si le scanner est démarré
                currentScanner.stop().catch((err) => console.error(err));
            }
        };
    }, [onResult, scannerStarted]);
    const onCameraChange = (e) => {
        const selectedCamera = e.target.options[e.target.selectedIndex];
        const cameraId = selectedCamera.dataset.key;
        setActiveCamera(cameraList.find((cam) => cam.id === cameraId));
    };

    const scanLocalFile = () => {
        fileRef.current.click();
    };

    const scanFile = (e) => {
        if (e.target.files.length === 0) {
            return;
        }
        const imageFile = e.target.files[0];
        Html5Qrcode.scanFile(imageFile, true)
            .then((qrCodeMessage) => {
                onResult(qrCodeMessage);
            })
            .catch((err) => {
                console.log(`Error scanning file: ${err}`);
            });
    };

    return (
        <div>
            <div id="reader" width="100%" />
            <button className="h-14 absolute bottom-10 left-1/2 -translate-x-1/2 aspect-square rounded-lg bg-white text-[#729669] flex justify-center items-center shadow-2xl" onClick={scanLocalFile}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                    <path fill-rule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z" clip-rule="evenodd" />
                </svg>
            </button>
            <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={scanFile}
            />
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
