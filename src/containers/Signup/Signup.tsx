import React, { useState } from 'react';
import Select from '../../components/Select/Select';
import Text from '../../components/Text/Text';
import "./signup.scss";
import constant from './constants';
import axios from 'axios';
import useValidator from '../../utilities/hooks/Validation';

const Signup = () => {

  const [pwdValidation, setPwdValidated] = useState(false);
  const [userIdValidation, setUserIdValidated] = useState(false);

  const { ValidatePassword, ValidateMinMaxlength } = useValidator();


  const defaultPayload = {
    userClassification: "MYORG",
    role: "AGT",
    address: {
      country: "US"
    },
    passwordRecovery: {
      hintQuestion: "QU1"
    }
  }
  const [payload, updatePayload] = useState<any>(defaultPayload);

  const createSignupPayload = (event: any, group?: any) => {

      getValidation(event);
      if (Object.hasOwn(payload, group)) {
        Object.assign(payload, { [group]: { ...payload[group], ...{ [event.target.id]: event.target.value } } });
      } else if (group) {
        Object.assign(payload, { [group]: { [event.target.id]: event.target.value } });
      } else {
        Object.assign(payload, { [event.target.id]: event.target.value });
      }
      updatePayload(payload);
  }

  const getValidation = (event: any) => {
    if (event.target.id === 'password') {
      setPwdValidated(ValidatePassword(event.target.value))
    } else if (event.target.id === 'id') {
      setUserIdValidated(ValidateMinMaxlength(event));
    }
  }

  const createUser = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity()) {
      axios.post(' http://localhost:8080/signup', payload).then((response) => {
        if (response && response.data && response.data.hasOwnProperty('userId')) {
          alert("Sign up Successful");
        }
      })
    }
  }

  return (

    <div className='signup'>
      <form onSubmit={(event) => createUser(event)}>
        <div className="form-group text-center">
          <h2>Please Sign up</h2>
        </div>
        <div className="form-group input-group">
          <Text className="form-control required" id="firstName" placeholder="First Name" required={true} onChange={(value: any) => createSignupPayload(value)} />
          <span className='required'></span>
        </div>
        <div className="form-group input-group">
          <Text className="form-control" id="middleName" placeholder="Middle Name" onChange={(value: any) => createSignupPayload(value)} />
          <span className='required'></span>
        </div>
        <div className="form-group input-group">
          <Text className="form-control required" id="lastName" placeholder="Last Name" required={true} onChange={(value: any) => createSignupPayload(value)} />
          <span className='required'></span>
        </div>
        <div className="form-group input-group">
          <Text className={userIdValidation ? "form-control is-valid" : "form-control"} id="id" placeholder="User ID" minLength={8} maxLength={20} required={true} onChange={(value: any) => createSignupPayload(value)} />
          <span className='required'></span>
          <div style={{ width: 'inherit' }}>
            <small>Must be unique and 8-20 characters long.</small>
          </div>
        </div>
        <div className="form-group input-group">
          <Text className={pwdValidation ? "form-control is-valid" : "form-control"} id="password" type='password' placeholder="Password" minLength={8} maxLength={20} required={true} onChange={(value: any) => createSignupPayload(value)} />
          <span className='required'></span>
          <div style={{ width: 'inherit' }}>
            <small>Must be 8-20 characters long, atleast one letter and one number.</small>
          </div>
        </div>
        <div className="form-group input-group">
          <Select className="form-control" id="hintQuestion" value={payload.passwordRecovery.hintQuestion} placeholder="Hint Question" options={constant.hintQuestions} onChange={(value: any) => createSignupPayload(value, 'passwordRecovery')} />
        </div>
        <div className="form-group input-group">
          <Text className="form-control required" id="passwordHint" type='password' placeholder="Password Hint" required={true} onChange={(value: any) => createSignupPayload(value, 'passwordRecovery')} />
          <span className='required'></span>
          <div style={{ width: 'inherit' }}>
            <small>Remember this to recover your User ID / Password.</small>
          </div>
        </div>
        <div className="form-group">
          <Text className="form-control" type="number" id="homePhone" placeholder="Home Phone" onChange={(value: any) => createSignupPayload(value, 'contact')} />
        </div>
        <div className="form-group input-group">
          <Text className="form-control required" id="mobilePhone" type="number" placeholder="Mobile Phone" required={true} onChange={(value: any) => createSignupPayload(value, 'contact')} />
          <span className='required'></span>
        </div>
        <div className="form-group input-group">
          <Text type="email" className="form-control required" id="email" placeholder="Email" required={true} onChange={(value: any) => createSignupPayload(value, 'contact')} />
          <span className='required'></span>
        </div>
        <div className="form-group input-group">
          <Select className="form-control" id="userClassification" placeholder="Classification" value={payload.userClassification} options={constant.userClassification} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group">
          <Select className="form-control" id="role" placeholder="Role" value={payload.role} options={constant.role} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group">
          <Text className="form-control" id="nameOfBusiness" placeholder="Name of your Business" required={true} onChange={(value: any) => createSignupPayload(value, 'businessInfo')} />
        </div>
        <div className="form-group input-group">
          <Text className="form-control required" id="businessStructure" placeholder="Inc, LLC, Ltd" required={true} onChange={(value: any) => createSignupPayload(value, 'businessInfo')} />
          <span className='required'></span>
        </div>
        <div className="form-group input-group">
          <Text className="form-control required" id="streetAddres" placeholder="Street address, P.O. Box, c/o" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
          <span className='required'></span>
        </div>
        <div className="form-group">
          <Text className="form-control" id="infraStructureType" placeholder="Suite, unit, building, floor etc." onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group input-group">
          <Text className="form-control required" id="city" placeholder="City" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
          <span className='required'></span>
        </div>
        <div className="form-group input-group">
          <Text className="form-control required" id="state" placeholder="State/Province/Region" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
          <span className='required'></span>
        </div>
        <div className="form-group input-group">
          <Text className="form-control required" id="postalCode" placeholder="Postal Code" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
          <span className='required'></span>
        </div>
        <div className="form-group">
          <Select className="form-control" id="country" placeholder="Country" options={constant.countries} value={payload.address.country} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group">
          <small id="signupterms" className="text-muted">By signing up you agree to our <a href="/termsofservice">Terms of Service</a>.</small>
        </div>
        <div className="form-group">
          <div className="g-recaptcha" style={{marginLeft: '7rem'}} data-sitekey="6LeNQ4YiAAAAACr0Ds8VmpuDdrQ76oFFfYyLAAkN"></div>
        </div>
        <div className="form-group text-center">
          <button
            type="submit"
            data-sitekey="6LeNQ4YiAAAAACr0Ds8VmpuDdrQ76oFFfYyLAAkN"
            data-callback='createUser'
            data-action='submit'
            className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>


  );
}


export default Signup;
