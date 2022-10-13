import react from 'react';

const Label = (props: { label: string; value: string; type: string; placeholder: string; required: boolean; }) => {

    // Todo: Add Label1: Label2 value. For ex Name: FirstName
    const {label} = props;

return (
    <label>{label}</label>)}

export default Label;
