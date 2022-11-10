import { FormHelperText, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import react, { useState } from 'react';

const Dropdown = (props: { value?: string; options?: any; placeholder?: string; required?: boolean; 
    className?: string; id: string; onChange?: any, helperText?:string, disabled?: boolean }) => {

    const { value, required, className, id, placeholder, options, onChange, helperText, disabled } = props;
    const [newValue, updateValue] = useState(value);

    const onChangeValue = (event: any) => {
        onChange(event);
        updateValue(event.target.value)
    }

    return (
        // <select className={className} id={id} required={required} placeholder={placeholder} value={newValue} onChange={(value) => onChangeValue(value)}>
        //     {options.map((option: any, index: number) => <option key={option.value + index} value={option.value}>{option.label}</option>)}
        // </select>
        <>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={newValue}
                label={placeholder}
                onChange={onChangeValue}
                required={required}
                disabled={disabled}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options.map((option: any, index: number) => <MenuItem key={option.uid + index} value={option.uid}>{option.description}</MenuItem>)}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </>
    )
}


export default Dropdown;
