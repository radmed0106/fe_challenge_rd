import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { getGoogleApiKey } from '../googleMapsSetting.js'

class MapContainer extends Component {

      constructor(props) {
        super(props);      
        this.state = { 
          selectedPlace: {},
          activeMarker:{},
          showInfoWindow : false,         
        };   
        this.getCenterPoint = this.getCenterPoint.bind(this); 
        this.getMapBounds = this.getMapBounds.bind(this);
        this.getMapMarkers = this.getMapMarkers.bind(this);

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
      }

      getCenterPoint(restaurants){        
     
        let count = restaurants.length;     
       
        if (count === 1)
        {
            return {
              lat: restaurants[0].lat,
              lng: restaurants[0].lng,
              };
        }

        let x = 0;
        let y = 0;
        let z = 0;
        let i = 0;
        for (i = 0; i < count; i++) {

          let latitude = restaurants[i].lat * Math.PI / 180;
          let longitude = restaurants[i].lng * Math.PI / 180;
                 
          x += Math.cos(latitude) * Math.cos(longitude);
          y += Math.cos(latitude) * Math.sin(longitude);
          z += Math.sin(latitude);
        }
      
        x = x / count;
        y = y / count;
        z = z / count;

        let clng = Math.atan2(y, x);
        let cqr = Math.sqrt(x * x + y * y);
        let clat = Math.atan2(z, cqr);

        
        let central_lat = clat * 180 / Math.PI;
        let central_lng = clng * 180 / Math.PI;

        return {
          lat: central_lat,
          lng: central_lng,
          };
    }

      getMapBounds(restaurants) {
      
        const offset = 0.01;
        let lats = [];
        let lngs = [];
        restaurants.forEach( (restaurant) =>  {
          lats.push(restaurant.lat);
          lngs.push(restaurant.lng);
        });        
     
        let points = [
          { lat: Math.max(...lats) + offset, lng: Math.min(...lngs) - offset},
          { lat: Math.max(...lats) + offset, lng: Math.max(...lngs) + offset},
          { lat: Math.min(...lats) - offset, lng: Math.min(...lngs) - offset},
          { lat: Math.min(...lats) - offset, lng: Math.max(...lngs) + offset}
        ]

        return points;
      }

      onMarkerClick(props, marker) {      
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        })
      }

      onInfoWindowClose(){       
        this.setState({
          selectedPlace: {},
          activeMarker: {},
          showingInfoWindow: false
        })
      }     

      getMapMarkers(restaurants){
        let markers = [];
        markers.push(restaurants.map( (restaurant) => {
                  return <Marker
                            onClick={this.onMarkerClick}
                            title={restaurant.name}
                            name={restaurant.name}
                            position={{lat: restaurant.lat, lng: restaurant.lng}} />
              })); 
        return markers;
      }

      componentDidUpdate(prevProps) {
       
        if (this.props.restaurant_data !== prevProps.restaurant_data) {         
          this.onInfoWindowClose();
        }
      }




    render() {
    
      const data = this.props.restaurant_data;      

      let markers = this.getMapMarkers(data.restaurants); 

      let center = this.getCenterPoint(data.restaurants);

      let points = this.getMapBounds(data.restaurants);
 
      let bounds = new this.props.google.maps.LatLngBounds();
      for (var i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
      }      
      
      return (
        <Map
          google={this.props.google}
          zoom={5}
          style={{width: '100%', height: '500px'}}  
          initialCenter={center}
          center={center}
          bounds={bounds}
        >
          { markers }

          <InfoWindow 
            visible={this.state.showingInfoWindow}
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}>
              <div>
                <div className='map-info-text'>{this.state.selectedPlace.name}</div>
              </div>
        </InfoWindow>

        </Map>
      );
    }
  }

  export default GoogleApiWrapper(getGoogleApiKey)(MapContainer);
