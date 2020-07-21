import React from 'react';
import RestaurantItem from './RestaurantItem.js';
import PaginationItem from './PaginationItem.js';
import MapContainer from './MapContainer.js';

class ResultsContainer extends React.Component {
            
    render() {       
       
        let restaurants = []
        if(this.props.restaurant_data.restaurants !== undefined) {
            restaurants = this.props.restaurant_data.restaurants.map( (restaurant) => {
                return <RestaurantItem key={restaurant.id} current_location={this.props.current_location} data={restaurant}></RestaurantItem>
            })
        }
        
        return (

        <div className="container mt-3">
            <div className = "row results-row">
                    <div className = "col-md-8 restaurant-container">
                        
                        {restaurants}  

                        <PaginationItem restaurant_data={this.props.restaurant_data} pages_per_page={this.props.pages_per_page} changePage={this.props.changePage}></PaginationItem>
                          
                    </div>
                    <div className = "col-md-4 map-container ">
                        {restaurants.length > 0 ? 
                       <MapContainer restaurant_data={this.props.restaurant_data}></MapContainer>
                       :''
                        }
                    </div>
                          
              </div>
        </div>       
        
      )
   }
}



export default ResultsContainer;
