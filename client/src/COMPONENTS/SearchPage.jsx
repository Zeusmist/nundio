import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./Pages.module.css";
import homeStyle from "./Home.module.css";
import ReactPaginate from "react-paginate";
import cx from "classnames";
import Footer from "./Footer";

class SearchPage extends Component{
    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
            articles: [],
            perPage: 9,
            currentPage: 0,
            elements: [],
            offset: 0
        }
        this.dataFromApi = this.dataFromApi.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    dataFromApi(){
        fetch("/search-get")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    isLoaded: true,
                    articles: data.articles,
                    pageCount: Math.ceil(data.articles.length / this.state.perPage)
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
            .then(() => {
                this.setCurrentPage();
            })
    }
    
    setCurrentPage(){
        let elements = this.state.articles.slice(this.state.offset, this.state.offset + this.state.perPage)
            .map(article => (
                <li className={cx(styles.list, "col-lg-4")} key={article.title}>
                    <div className={cx("card", homeStyle.news)}>
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className={cx("catrd-img-top")}
                            width="100%"
                        />
                        <p className="small">{article.publishedAt}</p>
                        <div className={cx("card-body")}>
                            <h3 >{article.title}</h3>
                            {/* <p className={styles.description}>{article.description}</p> */}
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cx("btn btn-success stretched-link")}
                            >
                                Read More
                            </a>
                            <h5 className={styles.author}>{article.source.name}</h5>
                        </div>    
                    </div>
                </li>

            ));
        this.setState({elements: elements})
    }

    componentDidMount(){
        this.dataFromApi();
    }

    handlePageChange(data){
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {this.setCurrentPage();});
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
            let paginationElement;
            if (this.state.pageCount > 1){
                paginationElement = (
                    <ReactPaginate
                    previousLabel={ "Previous" }
                        nextLabel={ "Next" }
                        breakLabel={<span>...</span>}
                        pageCount={this.state.pageCount}
                        onPageChange={this.handlePageChange}
                        forcePage={this.state.currentPage}
                        containerClassName={"pagination"}
                        previousLinkClassName={"page-link"}
                        pageLinkClassName={"page-link"}
                        pageClassName={"page-item"}
                        breakClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        disabledClassName={"disabled"}
                        activeClassName={"active"}
                    />
                );
            }
            return(
                <div className={cx(homeStyle.mainCon)}>
                    <div className={cx(homeStyle.body)} >
                        <h1 className={cx("alert alert-info text-center")}>
                            {this.state.articles.length === 0 ? `No articles matching that at this time. Try again later`
                            : "Search Results"}
                        </h1>
                        <div className={cx("container-fluid")}>
                            {paginationElement}
                            <ul className="row list-unstyled">
                                {this.state.elements}
                            </ul>
                            {paginationElement}
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
        
    }
}

export default SearchPage;