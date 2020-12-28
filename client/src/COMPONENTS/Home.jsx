import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./Home.module.css";
import cx from "classnames";
import TopStoriesSection from "./TopStoriesSection";
import BusinessSection from "./BusinessSection";
import EntertainmentSection from "./EntertainmentSection";
import SportsSection from "./SportsSection";
import Footer from "./Footer";

class Home extends Component{
    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
        }
        this.dataFromApi = this.dataFromApi.bind(this);
    }

    dataFromApi(){
        let url = 'https://newsapi.org/v2/top-headlines?' +
        'apiKey=7370ae6a9e744948a531c4779c7d1b48';
        let req = new Request(url);

        fetch(req)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    isLoaded: true,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
    }

    componentDidMount(){
        this.dataFromApi();
    }

    render(){
        const {error, isLoaded} = this.state;
        if (error){
            return(
                <h3 className={cx("text-center alert alert-warning ")}>
                    {error.message.toLowerCase() === 'failed to fetch' 
                    ? "Opps... Looks like you're offline" : `Error: ${error.message}`}
                </h3>
            )
        }
        else if(!isLoaded){
            return(
                <div className={cx("text-center")}>
                    <h2>Content loading...</h2>
                    <h3>Please wait</h3><br/>
                    <div className={cx("spinner-grow", styles.spinner)}></div>
                </div>
            )
        }
        else{
            return(
                <div className={cx(styles.mainCon)}>
                    <div className={cx("container-fluid", styles.body)} >
                        <blockquote className={cx("blockquote text-center", styles.quote, styles.message)}>
                            <p>A website for people like me who hate news but understand its importance in life.
                            <br/>Just read the headlines to stay up to date on recent happenings.</p>
                            <div className={cx("blockquote-footer")}>David Erinayo, Founder/CEO</div>
                        </blockquote>
                        <TopStoriesSection/>
                        <BusinessSection/>
                        <EntertainmentSection/>
                        <SportsSection/>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
}
export default Home;
