import React, { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const openSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setSnackbarOpen(false);
        setSnackbarMessage('');
    };

    return (
        <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
            {children}
            {snackbarOpen && (
                <div className="snackbar">
                    <p>{snackbarMessage}</p>
                    <button onClick={closeSnackbar}>Fermer</button>
                </div>
            )}
        </SnackbarContext.Provider>
    );
};
