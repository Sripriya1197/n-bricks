import React from 'react';
import Select from '../../components/Select/Select';
import Text from '../../components/Text/Text';
import "./signup.scss";
import constant from './constants';

const Signup = () => {

  return (

    <div className='signup'>
      <form>
        <div className="form-group text-center">
          <h2>Please Sign up</h2>
        </div>
        <div className="form-group">
          <Text className="form-control" id="firstName" placeholder="First Name" />
        </div>
        <div className="form-group">
          <Text className="form-control" id="middleName" placeholder="Middle Name" />
        </div>
        <div className="form-group">
          <Text className="form-control" id="lastName" placeholder="Last Name" />
        </div>
        <div className="form-group">
          <Text className="form-control" id="userId" placeholder="User ID" />
          <small>Must be unique and 8-20 characters long.</small>
        </div>
        <div className="form-group">
          <Text className="form-control" id="password" placeholder="Password" />
          <small>Must be 8-20 characters long, atleast one letter and one number.</small>
        </div>
        <div className="form-group">
          <Select className="form-control" id="hintQuestion" placeholder="Hint Question" options={constant.hintQuestions} />
        </div>
        <div className="form-group">
          <Text className="form-control" id="passwordHint" placeholder="Password Hint" />
          <small>Remember this to recover your User ID / Password.</small>
        </div>
        <div className="form-group">
          <Text className="form-control" id="homePhone" placeholder="Home Phone #" />
        </div>
        <div className="form-group">
          <Text className="form-control" id="mobilePhone" placeholder="Mobile Phone #" />
        </div>
        <div className="form-group">
          <Text type="email" className="form-control" id="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <Select className="form-control" id="userClassification" placeholder="Classification" value="MYORG" options={constant.userClassification} />
        </div>
        <div className="form-group">
          <Select className="form-control" id="role" placeholder="Role" value="AGT" options={constant.role} />
        </div>
        <div className="form-group">
          <Text className="form-control" id="nameOfBusiness" placeholder="Name of your Business" />
        </div>
        <div className="form-group">
          <Text className="form-control" id="businessStructure" placeholder="Inc, LLC, Ltd *" />
        </div>
        <div className="form-group">
          <Text className="form-control" id="streetAddres" placeholder="Street address, P.O. Box, c/o *" />
        </div>
        <div className="form-group">
          <Text className="form-control" id="infraStructureType" placeholder="Suite, unit, building, floor etc." />
        </div>
        <div className="form-group">
          <Text className="form-control" id="city" placeholder="City" />
        </div>
        <div className="form-group">
          <Text className="form-control" id="state" placeholder="State/Province/Region *" />
        </div>
        <div className="form-group">
          <Text className="form-control" id="postalCode" placeholder="Postal Code *" />
        </div>
        <div className="form-group">
          <Select className="form-control" id="country" placeholder="Country" options={constant.countries} value={"US"} />
        </div>
        <div className="form-group">
          <small id="signupterms" className="text-muted">By signing up you agree to our <a href="/termsofservice">Terms of Service</a>.</small>
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>


  );
}


export default Signup;
