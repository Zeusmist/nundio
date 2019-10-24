import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import styles from "./Nav.module.css";
import cx from "classnames";
import logo from "./logo.png"
import rain from "./rain.png";
import snow from "./snow.png";
import clouds from "./clouds.png";
import drizzle from "./drizzle.png";
import thunderstorm from "./thunderstorm.png";

class Nav extends React.Component{
    constructor(){
        super();
        this.state = {
            lat: '',
            long: '',
            weathers: [{}],
            weatherLoaded: false,
            error: null,
            weatherElement: [],
            noWeather: false
        }
        this.showLocation = this.showLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setWeather = this.setWeather.bind(this);
    }

    getLocation(){
        let error = "Couldn't get Location"
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.showLocation);
        }
        else{console.log(error);}
    }
    showLocation(position){
        this.setState({
            long: position.coords.longitude,
            lat: position.coords.latitude
        })
    }

    componentDidMount(){
        this.getLocation();
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit(event){
        (event.target.value).toArray().join("+");
    }

    getWeather(){
        let long = this.state.long;
        let lat = this.state.lat;

        let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}
        &key=9f904ce496d843a9aa1de07857054101`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    weatherLoaded: true,
                    weathers: data.data
                })
            },
            (error) => {
                this.setState({
                    weatherLoaded: true,
                    error  
                })
            })
            .then(()=>{
                this.setWeather();
            })
    }

    setWeather(){
        let weatherElement = this.state.weathers.slice(0,2).map( weather => (
            <li className={cx(styles.li, styles.weather, "text-light nav-item")} key={weather.valid_date}>
                {/* {this.state.weathers.valid_date ? "Today" : "Tomorrow"} */}
                <div>
                    {/* {weather[0] ? "TODAY : " : "TOMMOROW : "} */}
                    {/* <h6>{weather.valid_date[0] ? "Today" : "Tomorrow"}</h6> */}
                    {(weather.weather.code >= 200 && weather.weather.code <= 233) ?
                    <div>
                        {weather.weather.description}&nbsp;
                        <img src={thunderstorm} width="20px" height="20px" alt="Thunderstorm"/>
                    </div>
                    : (weather.weather.code >= 300 && weather.weather.code <= 302) ?
                    <div>
                        {weather.weather.description}&nbsp;
                        <img src={drizzle} width="20px" height="20px" alt="Drizzle"/>
                    </div>
                    : (weather.weather.code >= 500 && weather.weather.code <= 522) ? 
                    <div>
                        {weather.weather.description}&nbsp;
                        <img src={rain} width="20px" height="20px" alt="rain"/>
                    </div>
                    : (weather.weather.code >= 600 && weather.weather.code <= 623) ?
                    <div>
                        {weather.weather.description}&nbsp;
                        <img src={snow} width="20px" height="20px" alt="snow"/>
                    </div>
                    :
                    <div>
                        {weather.weather.description}&nbsp;
                        <img src={clouds} width="20px" height="20px" alt="clouds"/>
                    </div>}
                    <p className={cx(styles.weatherList)}>Min:{weather.min_temp}&#8451; &nbsp; | &nbsp;</p>
                    <p className={cx(styles.weatherList)}>Max:{weather.max_temp}&#8451;</p>
                </div>
            </li>
        ));
        // this.state.weathers.length === 0 ? this.setState({noWeather: true})
        this.setState({weatherElement: weatherElement});
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.lat !== prevState.lat){
            this.getWeather();
        }
    }

    render(){
        return(
            <nav className={cx("navbar navbar-expand-lg sticky-top bg-dark navbar-dark", styles.sticky)} >
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navBar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={cx("collapse navbar-collapse", styles.nav)} id="navBar">
                    <ul className="navbar-nav">
                        <Link to="/">
                            <li className="navbar-brand">
                                <img src={logo} alt="logo" width="100px"/>
                            </li>
                        </Link>
                        <Link to="/top-stories" className="nav-link">
                            <li className="nav-item">Top Stories</li>
                        </Link>
                        <Link to="/business" className="nav-link">
                            <li className="nav-item">Business</li>
                        </Link>
                        <Link to="/entertainment" className="nav-link">
                            <li className="nav-item">Entertainment</li>
                        </Link>
                        <Link to="/sports" className="nav-link">
                            <li className="nav-item">Sports</li>
                        </Link>
                        <Link to="/technology" className="nav-link">
                            <li className="nav-item">Technology</li>
                        </Link>
                        <Link to="/general" className="nav-link">
                            <li className="nav-item">General</li>
                        </Link>
                    </ul>
                    <form onSubmit={this.handleSubmit} className={cx("form-inline")} method="POST" action="/search-post">
                        <input
                            type="text"
                            placeholder="search"
                            className={cx("form-control mr-sm-2")}
                            name="search"
                            value={this.state.search}
                            onChange={this.handleChange}
                        />
                        <button className={cx("btn btn-success")} type="submit">Search</button>
                    </form>
                </div>
                {this.state.noWeather ? <h6>Couldn't get weather</h6>
                : <ul className={cx("float-md-right small")}>
                    <p className="text-info lead small ">TODAY AND TOMORROW WEATHERS</p>
                    {this.state.weatherLoaded ? 
                    this.state.weatherElement
                    : <div className="spinner-border text-light"></div>}
                  </ul>}
                
                
            </nav>
        )
    }
}

export default Nav;