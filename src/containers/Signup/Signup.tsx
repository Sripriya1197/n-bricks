import React, { useEffect, useState } from 'react';
import Select from '../../components/Select/Select';
import Text from '../../components/Text/Text';
import "./signup.scss";
import constant from './constants';
import useValidator from '../../utilities/hooks/Validation';
import { get, post } from '../../utilities/apiCallerService.tsx/apiCallerService';
import ReCAPTCHA from "react-google-recaptcha"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Agent, Broker, Contractor, Manufacturer, Producer, Provider, Retailer, Specifier, Supplier } from '../../assets/Icons/Svg';

const Signup = () => {

  const [pwdValidation, setPwdValidated] = useState(false);
  const [userIdValidation, setUserIdValidated] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const { ValidatePassword, ValidateMinMaxlength } = useValidator();
  const [captchaToken, setToken] = useState();
  const [showBusinessSection, setBusinessSection] = useState(true);
  const TypeRoles = [
    { id: 'AGT', svg: <Agent />, label: "Agent" },
    { id: 'AGT', svg: <Broker />, label: "Broker" },
    { id: 'AGT', svg: <Contractor />, label: "Contractor" },
    { id: 'AGT', svg: <Manufacturer />, label: "Manufacturer" },
    { id: 'AGT', svg: <Producer />, label: "Producer" },
    { id: 'AGT', svg: <Provider />, label: "Provider" },
    { id: 'AGT', svg: <Retailer />, label: "Retailer" },
    { id: 'AGT', svg: <Specifier />, label: "Specifier" },
    { id: 'AGT', svg: <Supplier />, label: "Supplier" }
  ]

  useEffect(() => {
    get('/dropdown?page=signup').then((response: any) => {
      console.log(response);
    })
  }, []);

  const Type = () => {
    return (
      <>
        <div className="form-group btn-group col-12">
          <button
            onClick={() => setBusinessSection(true)}
            type="button"
            data-toggle="button" aria-pressed="false"
            className={showBusinessSection ? "btn btn-primary" : "btn btn-primary secondary-btn"}>Business</button>
          <button
            onClick={() => setBusinessSection(false)}
            type="button"
            data-toggle="button" aria-pressed="false"
            className={!showBusinessSection ? "btn btn-primary " : "btn btn-primary secondary-btn"}>Individual</button>
        </div>
        <div className='col-12 row'>
          {TypeRoles.map((role: any) => {
            return <>
              <div className='role-icons'>{role.svg}
                <div><small>{role.label}</small></div>
              </div>
            </>
          }
          )}
        </div>

      </>
    )
  }

  const PersonalDetails = () => {
    return (
      <div className='row'>
        <div className="form-group col-4">
          <Text className="form-control" id="firstName" placeholder="First Name" required={true} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group col-4">
          <Text className="form-control" id="firstName" placeholder="Middle Name" required={true} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group col-4">
          <Text className="form-control" id="firstName" placeholder="Full Name" required={true} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group col-12">
          <Text className="form-control" type="number" id="homePhone" placeholder="Home Phone" onChange={(value: any) => createSignupPayload(value, 'contact')} />
        </div>
        <div className="form-group col-12">
          <Text className="form-control" id="mobilePhone" type="number" placeholder="Mobile Phone" required={true} onChange={(value: any) => createSignupPayload(value, 'contact')} />
        </div>
        <div className="form-group col-12">
          <Text type="email" className="form-control" id="email" placeholder="Email" required={true} onChange={(value: any) => createSignupPayload(value, 'contact')} />
        </div>
        <div className="form-group col-12"><h4>Address</h4></div>
        <div className="form-group col-12">
          <Text className="form-control" id="streetAddres" placeholder="Street address, P.O. Box, c/o" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group col-12">
          <Text className="form-control" id="infraStructureType" placeholder="Suite, unit, building, floor etc." onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group col-12">
          <Text className="form-control" id="city" placeholder="City" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group col-12">
          <Text className="form-control" id="state" placeholder="State/Province/Region" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group col-12">
          <Text className="form-control" id="postalCode" placeholder="Postal Code" required={true} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
        <div className="form-group col-12">
          <Select className="form-control" id="country" placeholder="Country" options={constant.countries} value={payload.address.country} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
      </div>
    )
  }

  const BusinessDetails = () => {
    return (
      <div className='row'>
        <div className="form-group col-12">
          <Text className="form-control" id="id" placeholder="User ID" minLength={8} maxLength={20} required={true} onChange={(value: any) => createSignupPayload(value)} helperText="Must be unique and 8-20 characters long." />
        </div>
        <div className="form-group col-12">
          <Text className="form-control" id="password" type='password' placeholder="Password" minLength={8} maxLength={20} required={true} onChange={(value: any) => createSignupPayload(value)} helperText="Must be 8-20 characters long, atleast one letter and one number." />
        </div>
        <div className="form-group col-12">
          <Select className="form-control" id="hintQuestion" value={payload.passwordRecovery.hintQuestion} placeholder="Hint Question" options={constant.hintQuestions} onChange={(value: any) => createSignupPayload(value, 'passwordRecovery')} />
        </div>
        <div className="form-group col-12">
          <Text className="form-control" id="passwordHint" type='password' placeholder="Password Hint" required={true} onChange={(value: any) => createSignupPayload(value, 'passwordRecovery')} helperText="Remember this to recover your User ID / Password." />
        </div>
      </div>
    )
  }

  const steps = [{ label: 'Type', component: <Type /> }, { label: 'User Details', component: <PersonalDetails /> }, { label: 'Set Password', component: <BusinessDetails /> }];

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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const createUser = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() && captchaToken) {
      post('/signup', payload).then((response: any) => {
        if (response && response.data && response.data.hasOwnProperty('userId')) {
          alert("Sign up Successful");
        }
      })
    }
  }



  return (

    <div className='signup'>
      <form>
        <div className='col-12 form-group d-flex justify-content-center'>
          <div className='w-75'>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                return (
                  <Step key={step.label} {...stepProps}>
                    <StepLabel {...labelProps}>{step.label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
        </div>
        <div className='row'>
          <div className="col-6 form-group text-center line-border">
            <h2>Create n-Bricks Account</h2>
            <h4>Welcome to n-Bricks</h4>
          </div>
          <div className="col-6 form-group">
            {steps[activeStep].component}
          </div>
        </div>
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Sign up' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      </form>
    </div>


  );
}


export default Signup;
