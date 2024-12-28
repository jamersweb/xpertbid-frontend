import { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {loading && <Loader />}
            {children}
        </LoaderContext.Provider>
    );
};

const Loader = () => (
    <div className="loaded">
        <div className="loader"></div>
        <style jsx>{`
            /* Same as Loader component above */
        `}</style>
    </div>
);
