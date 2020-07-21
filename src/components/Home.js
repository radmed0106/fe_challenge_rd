import React from 'react';
import SearchBarItem from './SearchBarItem';
import ResultsContainer from './ResultsContainer';
import axios from 'axios';

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            search:
            {
                restaurant_name:'',
                zipcode:'',
                state:'',
                city:'',
                current_page: 0,
                per_page: 5,
                page:1              
            },
            restaurant_data: '',   
            current_location: undefined        
        };
        this.getRestaurantData = this.getRestaurantData.bind(this);
        this.assignSearch = this.assignSearch.bind(this);
        this.assignPage = this.assignPage.bind(this);    
        this.onCloseDiscount = this.onCloseDiscount.bind(this);    
    }

    componentDidMount() {
        if ("geolocation" in navigator) {          
            navigator.geolocation.getCurrentPosition( position => {         
            this.setState({ 
                current_location: { lat:position.coords.latitude, lng: position.coords.longitude }
            });        
          });

        } 
      }

    getRestaurantData(searchParms)
    {
      
        if(searchParms.city === '' && searchParms.zipcode === '' && searchParms.restaurant_name === ''&& searchParms.state === ''){
            this.setState({ restaurant_data:
                {
                total_entries: 0
                }}
            ); 
            return;      
        }

        axios.get('https://opentable.herokuapp.com/api/restaurants', {
            params: {                
                per_page: searchParms.per_page,
                page:searchParms.page,
                city : searchParms.city,  
                zip: searchParms.zipcode,  
                name: searchParms.restaurant_name,
                state: searchParms.state 
            }
        }).then(
            response => {                
                this.setState({ restaurant_data: response.data})
            }
        ).catch(
            error => {                
                this.setState({ restaurant_data:
                    {
                    total_entries: 0
                    }}
                );
            }
        );   
    }   

    assignSearch(evt){
        evt.preventDefault();      
        let searchParms = this.state.search;
        searchParms.page = 1;
        searchParms.zipcode = evt.target['Zipcode'].value;        
        searchParms.city = evt.target['City'].value;         
        searchParms.restaurant_name = evt.target['RestName'].value; 
        searchParms.state = evt.target['State'].value;     
        this.setState({
            search: searchParms
        });

        this.getRestaurantData(searchParms);
       
    }

    assignPage(page){            
        
        let searchParms = this.state.search;
        searchParms.page = page;
        this.setState({
            search: searchParms
        });
        this.getRestaurantData(searchParms);
       
    }

    onCloseDiscount(evt)
    {   
        evt.preventDefault();       
        let discount = document.getElementById("discount");
        discount.style.display = "none";       
    }
    
    render() {               
        
      return (
          <div>              
        <div id="discount" className="discount-bar"><strong><span>Enjoy our discounts! Create an account</span></strong> <span><a href="#top">here</a></span><span onClick={this.onCloseDiscount} className="close discount-close mr-2">x</span></div>
        <div className="container mt-3">
            <div>                
                <SearchBarItem search={this.assignSearch} /> 
                  
                {this.state.restaurant_data !== '' ?
                 <div className="row justify-content-end">
                 <div className="col-sm-auto results-text mt-1">
                    <span>{this.state.restaurant_data.total_entries}</span>
                    {this.state.restaurant_data.total_entries === 1 ?
                        <span> result found</span>
                        :
                        <span> results found</span>
                    }
                </div>  
                </div>   
                :''
                }
                <ResultsContainer 
                current_location={this.state.current_location} 
                restaurant_data = {this.state.restaurant_data } 
                pages_per_page={this.state.search.per_page } 
                changePage={this.assignPage}></ResultsContainer>
            </div>
        </div>
        </div>
      )
   }
}

export default Home;
