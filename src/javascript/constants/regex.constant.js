const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

const PHONE_NUMBER_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/;

const NAME_REGEX = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;

export { EMAIL_REGEX, PASSWORD_REGEX, PHONE_NUMBER_REGEX, NAME_REGEX };
