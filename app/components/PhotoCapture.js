// PhotoCapture.js
import React, { useState } from 'react';

export default function PhotoCapture() {
    const [capturedPhoto, setCapturedPhoto] = useState(null);

    const handlePhotoCapture = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCapturedPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoCapture}
            />
            {capturedPhoto && (
                <div>
                    <p>Photo capturée :</p>
                    <img src={capturedPhoto} alt="Photo capturée" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
        </div>
    );
}
