import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "classnames";
import styles from "./Footer.module.css";

function Footer(){
    return(
        <div className={cx(styles.footer, "text-center text-light")}>
            Concept and theme created by <kbd>David Erinayo Obidu</kbd><br/>
            &copy;opyright 2019 
        </div>
    )
}

export default Footer;