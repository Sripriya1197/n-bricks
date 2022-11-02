import react, { useState } from 'react';

const Select = (props: { value?: string; options?: any; placeholder?: string; required?: boolean; className?: string; id:string; onChange?: any }) => {

    const { value, required, className, id, placeholder, options, onChange } = props;
    const [ newValue, updateValue ] = useState(value);

    const onChangeValue = (value: any) => {
        onChange(value);
        updateValue(value)
    }
    
return (
    <select className={className} id={id} required={required} placeholder={placeholder} value={newValue} onChange={(value) => onChangeValue(value)}>
        {options.map((option: any, index: number) => <option key={option.value+index} value={option.value}>{option.label}</option>)}
    </select>)}

export default Select;
