import logo from "../../assets/tom_icon.png"

import style from "./Navbar.module.css"

export default function Navbar(){
    return(
        <nav>
            <div className={style.logoContainer}>
                <img src={logo} className={style.logo}></img>
            </div>
            <div className={style.navbarContainer}>
                <ul className={style.navbarButtons}>
                    <li>Profile</li>
                    <li>Stats</li>
                    <li>Ranking</li>
                </ul>
                
            </div>
            <div className={style.navbarAccountControls}>
                <ul className={style.navbarAccountButtons}>
                    <li>Log In</li>
                    <li>Register</li>
                </ul>
            </div>
        </nav>
    )
}