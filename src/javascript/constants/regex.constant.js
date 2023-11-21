const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const PASSWORD_RULE = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

const VALID_PHONE_NUMBER = /((09|03|07|08|05)+([0-9]{8})\b)/;

const NAME_RULE = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;

export { EMAIL_REGEX, PASSWORD_RULE, VALID_PHONE_NUMBER, NAME_RULE };
