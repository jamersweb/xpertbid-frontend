import { Oval } from 'react-loader-spinner';

const LoadingSpinner = ({ loading }) => (
    <div className="spinner-container">
        <Oval
            height={80}
            width={80}
            color="#3498db"
            visible={loading}
            secondaryColor="#f3f3f3"
            ariaLabel="loading-indicator"
        />
        <style jsx>{`
            .spinner-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
        `}</style>
    </div>
);

export default LoadingSpinner;
