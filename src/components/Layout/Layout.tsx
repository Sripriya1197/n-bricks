import React from "react"
import Header from "../Header/Header";

const Layout = (props: any) => {
        return (
            <>
                <Header />
                <main>{props.children}</main>
            </>
        )
}
export default Layout;
