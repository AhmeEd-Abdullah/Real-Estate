export const normalizeString = (value) => {
    if (typeof value !== "string") return value;
    return value.trim().toLowerCase();
};

export const normalizePostPayload = (payload = {}) => {
    const normalizedPayload = { ...payload };

    if (typeof normalizedPayload.city === "string") {
        normalizedPayload.city = normalizeString(normalizedPayload.city);
    }

    if (typeof normalizedPayload.type === "string") {
        normalizedPayload.type = normalizeString(normalizedPayload.type);
    }

    if (typeof normalizedPayload.property === "string") {
        normalizedPayload.property = normalizeString(normalizedPayload.property);
    }

    return normalizedPayload;
};