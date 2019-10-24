import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Header.module.css";
import cx from "classnames";
import logo from "./logo.png";

class Header extends React.Component{
    render(){
        return(
            <div className={cx(styles.header, "text-center container-fluid")}>
                <img className="mx-auto d-block" height="50px" src={logo} alt="logo" />
            </div>
        )
    }
}

export default Header;