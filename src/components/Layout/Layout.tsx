import React from "react"
import Header from "../Header/Header";
import background from '../../assets/background.svg';

const Layout = (props: any) => {
        return (
            <>
                {/* <Header /> */}
                <main style={{ backgroundImage: `url(${background})` }}>{props.children}</main>
            </>
        )
}
export default Layout;
