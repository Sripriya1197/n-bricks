import { TextField } from '@mui/material';
import react, { useState } from 'react';

const Text = (props: {
    value?: string; type?: string; placeholder?: string; required?: boolean;
    className?: string; id: string; onChange?: any; maxLength?: number; minLength?: number; helperText?: string;
    disabled?: boolean
}) => {

    const { value, type, required, className, id, placeholder, onChange, maxLength, minLength, helperText, disabled} = props;
    const [newValue, updateValue] = useState(value);

    const onchangeValue = (event: any) => {
        updateValue(event.target.value);
        onChange(event);
    }

    return (
        <>
            {/* <input
                type={type}
                value={newValue}
                placeholder={placeholder}
                required={required}
                className={className}
                id={id}
                minLength={minLength}
                maxLength={maxLength}
                onChange={(event) => onchangeValue(event)} />
            {helperText && <small>{helperText}</small>} */}
            <TextField
                type={type}
                required={required}
                id={id}
                disabled={disabled}
                label={placeholder}
                placeholder={placeholder}
                value={newValue}
                onChange={(event) => onchangeValue(event)}
                helperText={helperText}
                inputProps={{ style: { color: 'white' } }}
            />
        </>
    )
}

export default Text;
