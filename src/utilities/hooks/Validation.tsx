import { useCallback } from "react";

export interface ErrorField {
    error: string | null,
    valid: boolean
}

const useValidator = () => {

    const Validation = useCallback ((newValue: any, type?:string, config?: any) => {
        let validate: ErrorField = {
            error: '',
            valid: true
        }
        validate = ValidateMinMaxValue(newValue, validate, config);

        switch(type) {
            case 'email':
                validate = ValidateEmail(newValue, validate);
                break;
            case 'number':
                validate = ValidateNumber(newValue, validate);
                break;
        }
        
        return validate;
    },[])

    const ValidateMinMaxValue = (value: any, errorField: ErrorField, config:any): ErrorField => {
        //Check for max and min values
        if (config?.min || config?.max) {
            if ((+value) > config.max) {
                errorField.error = 'MORE_THAN_MAXVALUE';
                errorField.valid = false
            }
            else if ((+value) < config?.min) {
                errorField.error = 'LESS_THAN_MINVALUE';
                errorField.valid = false
            }
            
            return errorField;
        }
        
        return errorField;
    }

    const ValidateMinMaxlength = (event: any) => {
        //Check for max and min values
        if (event.target.minLength || event.target.maxLength) {
            if (event.target.value.length > event.target.maxLength) {
                return false
            }
            else if (event.target.value.length < event.target.minLength) {
                return false
            }
            
            return true;
        }
        
        return true;
    }
    
    const ValidateEmail = (value: any, errorField: ErrorField) => {
        if (value && value !== '') {
            const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$');
            const emailValidation = emailRegex.test(value);
            if (!emailValidation) {
                errorField.error = '_ENTER_VALID_EMAIL';
                errorField.valid = false;
            }
        }  
        
        return errorField;
    }

    const ValidateNumber = (value: any, errorField: ErrorField) => {
        if(value && value !== '') {
            if (!Number(value)) {
                errorField.error = 'INVALID_NUMBER';
                errorField.valid = false;
            }
        }
        
        return errorField;
    }

    const ValidatePassword = (value:any, config?: any) => {
        const pwdRegex = config ? config.regex : new RegExp('^(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
        const valid = pwdRegex.test(value);
        return valid ?  true : false
    }

    return { Validation, ValidatePassword, ValidateMinMaxlength}
}

export default useValidator
