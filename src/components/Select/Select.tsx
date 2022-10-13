import react from 'react';

const Select = (props: { value?: string; options?: any; placeholder?: string; required?: boolean; className?: string; id:string }) => {

    const { value, required, className, id, placeholder, options } = props;

return (
    <select className={className} id={id} required={required} placeholder={placeholder} value={value}>
        {options.map((option: any) => <option value={option.key}>{option.value}</option>)}
    </select>)}

export default Select;
