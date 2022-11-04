import React, { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
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
import { East, West } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Logo from '../../assets/favicon.png';

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
    get('/reCaptchaSiteKey').then((response: any) => {
      console.log(response);
    })
    get('/typereferences/groups/CTRY').then((response: any) => {
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
        <div className='col-12 row justify-content-center'>
          {TypeRoles.map((role: any, index: number) => {
            return <span key={role.id + index}>
              <div className='role-icons'>
                <IconButton aria-label="delete">
                  {role.svg}
                </IconButton>
                <div className='text-center'><small>{role.label}</small></div>
              </div>
            </span>
          }
          )}
        </div>

      </>
    )
  }

  const UserDetails = () => {
    return (
      <div className='row'>
        <div className="form-group col-4 pr-0">
          <Text className="form-control" id="firstName" placeholder="First Name" required={true} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group col-4 pr-0">
          <Text className="form-control" id="firstName" placeholder="Middle Name" required={true} onChange={(value: any) => createSignupPayload(value)} />
        </div>
        <div className="form-group col-4 pr-0">
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
          <Dropdown className="form-control" id="country" placeholder="Country" options={constant.countries} value={payload.address.country} onChange={(value: any) => createSignupPayload(value, 'address')} />
        </div>
      </div>
    )
  }

  const SetPassword = () => {
    return (
      <div className='row'>
        <div className="form-group col-12">
          <Text className="form-control" id="id" placeholder="User ID" minLength={8} maxLength={20} required={true} onChange={(value: any) => createSignupPayload(value)} helperText="Must be unique and 8-20 characters long." />
        </div>
        <div className="form-group col-12">
          <Text className="form-control" id="password" type='password' placeholder="Password" minLength={8} maxLength={20} required={true} onChange={(value: any) => createSignupPayload(value)} helperText="Must be 8-20 characters long, atleast one letter and one number." />
        </div>
        <div className="form-group col-12">
          <Dropdown className="form-control" id="hintQuestion" value={payload.passwordRecovery.hintQuestion} placeholder="Hint Question" options={constant.hintQuestions} onChange={(value: any) => createSignupPayload(value, 'passwordRecovery')} />
        </div>
        <div className="form-group col-12">
          <Text className="form-control" id="passwordHint" type='password' placeholder="Password Hint" required={true} onChange={(value: any) => createSignupPayload(value, 'passwordRecovery')} helperText="Remember this to recover your User ID / Password." />
        </div>
        <div className="form-group col-12 text-center">
          <small id="signupterms" className="text-muted">By signing up you agree to our <a href="/termsofservice">Terms of Service</a>.</small>
        </div>
        <div className="form-group col-12 d-flex justify-content-center">
          <ReCAPTCHA sitekey="6LeNQ4YiAAAAACr0Ds8VmpuDdrQ76oFFfYyLAAkN" onChange={(token: any) => token === null ? setToken(undefined) : setToken(token)} />
        </div>


      </div>
    )
  }

  const steps = [{ label: 'Type', component: <Type /> }, { label: 'User Details', component: <UserDetails /> }, { label: 'Set Password', component: <SetPassword /> }];

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
    <div>
      <div className='logo'><img src={Logo}></img></div>
      <div className='col-12 signup'>
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
              <h4>Enormous and Endless Opportunities</h4>
            </div>
            <div className="col-6 form-group">
              {steps[activeStep].component}
              <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="contained"
                    startIcon={<West />}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep === steps.length - 1 ?
                    <Button onClick={handleNext}>Sign up</Button> :
                    <Button onClick={handleNext} endIcon={<East />}>Next</Button>}
                </Box>
              </React.Fragment>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}


export default Signup;
