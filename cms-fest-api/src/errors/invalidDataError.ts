export function invalidDataError(details: string) {
    return {
        name: "InvalidDataError",
        message: "Invalid data",
        details,
    };
}

export function fileNotFoundError(details = "") {
    return {
        name: "fileNotFoundError",
        message: "not found file to upload",
        details,
    };
}

export function fileExtError(details = "") {
    return {
        name: "fileExtError",
        message: "extension file is not alowed",
        details,
    };
}

export function fileSizeError(details = "") {
    return {
        name: "fileSizeError",
        message: "size file is more than alowed",
        details,
    };
}

export function mailsendErrorRequest(details = "") {
    return {
        name: "mailsendErrorRequest",
        message: "error sending email",
        details,
    };
}

