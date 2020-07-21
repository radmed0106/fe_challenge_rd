import React from 'react';
import SeeWebsiteItem from './SeeWebsiteItem.js';
import PriceItem from './PriceItem.js';

class RestaurantItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.getDistance = this.getDistance.bind(this)
             
    }

    getDistance(restaurant, current_location){
       
        let dist = 0;
        if(current_location !== undefined){
            const lat1 = current_location.lat;
            const lat2 = restaurant.lat;
            const lng1 = current_location.lng;
            const lng2 = restaurant.lng;
    
            const R = 6371e3; // metres
            const C1 = lat1 * Math.PI/180; // φ, λ in radians
            const C2 = lat2 * Math.PI/180;

            const D1 = (lat2-lat1) * Math.PI/180;
            const D2 = (lng2-lng1) * Math.PI/180;         

            const a = Math.sin(D1/2) * Math.sin(D1/2) +
                    Math.cos(C1) * Math.cos(C2) *
                    Math.sin(D2/2) * Math.sin(D2/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));              

            dist = (R * c)/1600; // in miles
        }   

      return dist.toFixed(2);
    }

    
    
    render() {               
        const { data, current_location } = this.props;       
        return (

        <div className="card shadow-sm p-1 mb-2 bg-white rounded">
            <div className="">
            <div className="container">
            <div className="row">
                <div className="col-auto">
                    <div className="avatar"></div>
                </div>
                <div className="col-sm restaurant-info">
                    <div className="restaurant-name">{ data.name }</div>
                    <div className="restaurant-location">{data.city}, {data.state}</div>
                    { current_location !== undefined ?
                    <div>
                        <div className="location-item mr-1"></div>
                        <div className="location-text">{this.getDistance(data,current_location)} mi</div>
                    </div>
                        :''}
                    <div className="cut-text restaurant-address" title={data.address}><span>{data.address}</span>                        
                    </div>                    
                    <PriceItem data={data}></PriceItem>
                </div>                  
                <div className="col-sm ">                    
                    <SeeWebsiteItem data={data}></SeeWebsiteItem>
                </div>            
                </div>
            </div>                     
            </div>        
        </div>      
      )
   }
}

export default RestaurantItem;