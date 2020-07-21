import React from 'react';
import ReactPaginate from 'react-paginate';

class PaginationItem extends React.Component {
    
    constructor(props) {
        super(props);          
        this.handlePageClick = this.handlePageClick.bind(this); 
    }

    handlePageClick = data => {
        let selected = data.selected + 1;     
        this.props.changePage(selected);
      };

      componentDidMount(){
    }

   
    
    render() {                     

        let totalPage = 0;
        let current_page = 0;
        if(this.props.restaurant_data !== '' && this.props.restaurant_data) {           
            const per_page = this.props.pages_per_page;
            totalPage = this.props.restaurant_data.total_entries / per_page;     
            current_page = this.props.restaurant_data.current_page - 1;
        }
        const hasPages = totalPage > 0
        
        return (
              
            <div>
            { 
                hasPages ?

              <div className="fixed-bottom p-4 bt-4 shadow pagination-container">
                 <div className="container">
                 <div className = "row">
                    <div className = "col-md-8">
                <ReactPaginate
                    initialPage={0}
                    forcePage={current_page}
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    breakLabel={'...'}                    
                    pageCount={totalPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={1}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination pagination-sm justify-content-center'}
                    pageClassName={'page-item'}                    
                    activeClassName={'active'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    breakClassName={'page-item'}   
                    breakLinkClassName={'page-link'}
                    pageLinkClassName={'page-link'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}  
                                   

                ></ReactPaginate>  
                </div>
               </div>
                </div>
               </div>
               : '' 
             }
            </div>
      )
   }
}



export default PaginationItem;
