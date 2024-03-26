export function tokenNotFoundError(details: string) {
    return {
        name: "TokenNotFoundError",
        message: "token not found, invalid or expired, check and try again.",
        details,
    };
}
export function emailnotFoundError(details: string) {
    return {
        name: "EmailnotFoundError",
        message: "email not found, check and try again.",
        details,
    };
}
export function emailDuplicatedError(details: string) {
    return {
        name: "EmailDuplicatedError",
        message: "already have registered email.",
        details,
    };
}

export function passwordNotMatchError(details: string) {
    return {
        name: "PasswordNotMatchError",
        message: "password does not match, check and try again.",
        details,
    };
}

