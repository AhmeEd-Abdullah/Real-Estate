import "./loaderIndicator.scss";

function LoaderIndicator({ text = "Loading..." }) {
    return (
        <div className="loaderIndicator" role="status" aria-live="polite">
            <div className="loaderIndicator__ring" aria-hidden="true">
                <svg viewBox="0 0 64 64">
                    <path d="M20 28h24v20H20zM24 24h16v6H24zM16 48h32" />
                </svg>
            </div>
            <div className="loaderIndicator__content">
                <h3>Finding your perfect place</h3>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default LoaderIndicator;
