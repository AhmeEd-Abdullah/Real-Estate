import { useEffect, useRef } from "react";

const UploadWidget = ({ setFormData, isLoading }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "nafdda7a",
                uploadPreset: "estate",
                maxFiles: 1,
                multiple: false,
            },
            function (error, result) {
                if (!error && result && result.event === "success") {
                    setFormData((previous) => ({
                        ...previous,
                        avatar: result.info.secure_url,
                    }));
                }
            },
        );
    }, []);

    return (
        <button disabled={isLoading} onClick={() => widgetRef.current.open()}>
            Upload
        </button>
    );
};

export default UploadWidget;
