process.env.validators = JSON.stringify({
    "required":"The :attribute field must not be empty.",
    "email":'E-mail must be a valid email address.',
    "string":'The :attribute field must be a string.',
    "maxLength":'The :attribute field is biggest.',
    "numeric":'The :attribute field must be a number.',
    "boolean":'The :attribute field must be a boolean.',
})