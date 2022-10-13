import react from 'react';

const Text = (props: { value?: string; type?: string; placeholder?: string; required?: boolean; className?: string; id:string }) => {

    const { value, type, required, className, id, placeholder } = props;

return (
    <input type={type} value={value} placeholder={placeholder} required={required} className={className} id={id} />)}

export default Text;
