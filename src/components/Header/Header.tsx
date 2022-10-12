import React from "react";
import "./header.scss"
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();


    return (

        <nav className="navbar navbar-expand-lg navbar-light justify-content-center header" style={{backgroundColor : "black"}}>
            <div className="logo" onClick={() => navigate('/')}></div>
            <div className="w-75">
                <button type="button" className="btn btn-info float-right" onClick={() => navigate('/signin')}>SIGN IN</button>
                <button type="button" className="btn btn-warning float-right mx-2" onClick={() => navigate('/signup')}>SIGN UP</button>
            </div>
        </nav>
    )
}
export default Header;
