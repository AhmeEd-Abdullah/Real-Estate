import { useEffect, useRef, useState } from "react";

const UploadWidget = ({
    uwConfig,
    setState,
    isLoading,
    value = [],
    maxImages = 1,
    showPreview = true,
}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [message, setMessage] = useState("");

    const handleRemove = (url) => {
        setState((previous) => previous.filter((item) => item !== url));
        setMessage("");
    };

    useEffect(() => {
        if (typeof window === "undefined" || !window.cloudinary) {
            return;
        }

        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "nafdda7a",
                uploadPreset: "estate",
                singleUploadAutoClose: false,
                ...uwConfig,
            },
            function (error, result) {
                if (error) {
                    setMessage("Upload failed. Please try again.");
                    return;
                }

                if (!result || result.event !== "success") {
                    return;
                }

                setState((previous) => {
                    if (maxImages === 1) {
                        return [result.info.secure_url];
                    }

                    if (previous.length >= maxImages) {
                        setMessage(`You can upload up to ${maxImages} images.`);
                        return previous;
                    }

                    if (previous.includes(result.info.secure_url)) {
                        return previous;
                    }

                    return [...previous, result.info.secure_url];
                });
            },
        );

        return () => {
            widgetRef.current?.destroy?.();
            widgetRef.current = null;
        };
    }, [maxImages, setState, uwConfig?.folder, uwConfig?.multiple]);

    const handleOpenWidget = () => {
        if (maxImages === 1) {
            widgetRef.current?.open();
            return;
        }

        if (value.length >= maxImages) {
            setMessage(`You can upload up to ${maxImages} images.`);
            return;
        }

        widgetRef.current?.open();
    };

    return (
        <div className="upload-widget">
            <button
                disabled={isLoading}
                onClick={handleOpenWidget}
                className="upload-btn"
            >
                {maxImages === 1 && value.length > 0
                    ? "Change image"
                    : "Upload images"}
            </button>

            {maxImages !== 1 && (
                <p className="upload-hint">
                    {value.length}/{maxImages} images selected
                </p>
            )}

            {message && <p className="upload-message">{message}</p>}

            {showPreview && value.length > 0 && (
                <div className="upload-preview-grid">
                    {value.map((url, index) => (
                        <div
                            key={`${url}-${index}`}
                            className="upload-preview-card"
                        >
                            <img src={url} alt={`Upload ${index + 1}`} />
                            <button
                                type="button"
                                className="upload-remove-btn"
                                onClick={() => handleRemove(url)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadWidget;
