import react, { useState } from 'react';

const Text = (props: { value?: string; type?: string; placeholder?: string; required?: boolean; 
    className?: string; id:string; onChange?: any; maxLength?: number; minLength?:number }) => {

    const { value, type, required, className, id, placeholder, onChange, maxLength, minLength} = props;
    const [ newValue, updateValue ] = useState(value);

    const onchangeValue = (event: any) => {
        updateValue(event.target.value);
        onChange(event);
    }

return (
    <input 
    type={type} 
    value={newValue} 
    placeholder={placeholder} 
    required={required} 
    className={className} 
    id={id} 
    minLength={minLength}
    maxLength={maxLength}
    onChange={(event) => onchangeValue(event)} />)}

export default Text;
