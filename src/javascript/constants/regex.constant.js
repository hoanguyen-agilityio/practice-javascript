const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const PASSWORD_RULE = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

const NUMBER_PHONE_RULE = /((09|03|07|08|05)+([0-9]{8})\b)/g;

const NAME_RULE = /^[a-zA-Z]+$/;

export { EMAIL_REGEX, PASSWORD_RULE, NUMBER_PHONE_RULE, NAME_RULE };
