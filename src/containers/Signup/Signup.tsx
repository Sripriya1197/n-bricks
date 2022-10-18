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
      axios.post(process.env.HOST_URL + '/signup', payload).then((response) => {
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
        <div className="form-group required">
          <label>First Name</label>
          <Text className="form-control" id="firstName" placeholder="First Name" required={true} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group">
        <label>Middle Name</label>
          <Text className="form-control" id="middleName" placeholder="Middle Name" onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group required">
        <label>Last Name</label>
          <Text className="form-control" id="lastName" placeholder="Last Name" required={true} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group required">
        <label>User ID</label>
          <Text className={userIdValidation ? "form-control is-valid" : "form-control"} id="id" placeholder="User ID" minLength={8} maxLength={20} required={true} onChange={(value: any) => createSignupPayload(value)} />
          <div style={{ width: 'inherit' }}>
            <small>Must be unique and 8-20 characters long.</small>
          </div>
        </div>
        <div className="form-group required">
        <label>Password</label>
          <Text className={pwdValidation ? "form-control is-valid" : "form-control"} id="password" type='password' placeholder="Password" minLength={8} maxLength={20} required={true} onChange={(value: any) => createSignupPayload(value)} />
          <div style={{ width: 'inherit' }}>
            <small>Must be 8-20 characters long, atleast one letter and one number.</small>
          </div>
        </div>
        <div className="form-group required">
        <label>Hint Question</label>
          <Select className="form-control" id="hintQuestion" value={payload.passwordRecovery.hintQuestion} placeholder="Hint Question" options={constant.hintQuestions} onChange={(value: any) => createSignupPayload(value, 'passwordRecovery')} />
        </div>
        <div className="form-group required">
        <label>Password Hint</label>
          <Text className="form-control" id="passwordHint" type='password' placeholder="Password Hint" required={true} onChange={(value: any) => createSignupPayload(value, 'passwordRecovery')} />
          <div style={{ width: 'inherit' }}>
            <small>Remember this to recover your User ID / Password.</small>
          </div>
        </div>
        <div className="form-group">
          <label>Home Phone</label>
          <Text className="form-control" type="number" id="homePhone" placeholder="Home Phone" onChange={(value: any) => createSignupPayload(value, 'contact')} />
        </div>
        <div className="form-group required">
          <label>Mobile Phone</label>
          <Text className="form-control" id="mobilePhone" type="number" placeholder="Mobile Phone" required={true} onChange={(value: any) => createSignupPayload(value, 'contact')} />
        </div>
        <div className="form-group required">
          <label>Email</label>
          <Text type="email" className="form-control" id="email" placeholder="Email" required={true} onChange={(value: any) => createSignupPayload(value, 'contact')} />
        </div>
        <div className="form-group required">
        <label>Classification</label>
          <Select className="form-control" id="userClassification" placeholder="Classification" value={payload.userClassification} options={constant.userClassification} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group">
        <label>Role</label>
          <Select className="form-control" id="role" placeholder="Role" value={payload.role} options={constant.role} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group">
        <label>Name of your Business</label>
          <Text className="form-control" id="nameOfBusiness" placeholder="Name of your Business" required={true} onChange={(value: any) => createSignupPayload(value, 'businessInfo')} />
        </div>
        <div className="form-group required">
        <label>Inc, LLC, Ltd</label>
          <Text className="form-control" id="businessStructure" placeholder="Inc, LLC, Ltd" required={true} onChange={(value: any) => createSignupPayload(value, 'businessInfo')} />
        </div>
        <div className="form-group required">
        <label>Street address, P.O. Box, c/o</label>
          <Text className="form-control" id="streetAddres" placeholder="Street address, P.O. Box, c/o" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group">
        <label>Suite, unit, building, floor etc.</label>
          <Text className="form-control" id="infraStructureType" placeholder="Suite, unit, building, floor etc." onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group required">
          <label>City</label>
          <Text className="form-control" id="city" placeholder="City" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group required">
          <label>State/Province/Region</label>
          <Text className="form-control" id="state" placeholder="State/Province/Region" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group required">
        <label>Postal Code</label>
          <Text className="form-control" id="postalCode" placeholder="Postal Code" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group">
        <label>Country</label>
          <Select className="form-control" id="country" placeholder="Country" options={constant.countries} value={payload.address.country} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group">
          <small id="signupterms" className="text-muted">By signing up you agree to our <a href='' onClick={() => window.open('https://www.n-bricks.com/termsofservice')}>Terms of Service</a>.</small>
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
