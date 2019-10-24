import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./Home.module.css";
import ReactPaginate from "react-paginate";
import cx from "classnames";

class Home extends Component{
    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
            articles: [],
            perPage: 3,
            currentPage: 0,
            elements: [],
            offset: 0
        }
        this.dataFromApi = this.dataFromApi.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    dataFromApi(category){
        category = this.props.category
        let url = 'https://newsapi.org/v2/top-headlines?' +
        'pageSize=9&' +
        `category=${category}&` +
        'country=us&' +
        'apiKey=7a241e177afe47b99d8bf0be5a610cb6';
        let req = new Request(url);

        fetch(req)
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
                    <div className={cx("card", styles.news)}>
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className={cx("card-img-top")}
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
                                className={cx("btn btn-success")}
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
                    <div className={cx("spinner-border", styles.spinner)}></div>
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
                <div className={cx(`container-fluid`, styles.sections)}>
                    <h4>{this.props.name}</h4>
                    {paginationElement}
                    <ul className="row list-unstyled">
                        {this.state.elements}
                    </ul>
                </div>
            );
        }
    }
}
export default Home;