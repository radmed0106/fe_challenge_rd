import React from 'react';
import axios from 'axios';
import states_data from './data/states_data.json'


class SearchBarItem extends React.Component {

   
    state = {
        cities: [],
        states: [],
    }

    componentDidMount () {
  
        axios.get('https://opentable.herokuapp.com/api/cities').then(
            response => {                
                this.setState({ cities: response.data.cities})
            }
        ).catch(
            error => {
                return error;
            }
        );    

    }
    
    render() {

        let cities = [];
        cities.push(<option key={0} value="">Select city</option>);
        cities.push(this.state.cities.map( (city, index) => {
                return <option key={index + 1}>{city}</option>
        }));

        let states = [];
        states.push(<option key={0} value="">Select state</option>);
        states.push(states_data.map( (state, index) => {
                return <option key={index + 1} value={state.abbreviation}>{state.name}</option>
        }));
              

        return(
            <div>
              
                <form className="form" onSubmit={ this.props.search }>
                <div className="shadow-sm search-bar-item pl-2">    
                <div className = "row justify-content-between">

                    <div className = "col-12 col-sm-6 col-md-auto">
                        <div>
                            <i className="fa fa-cutlery mr-1"></i>
                            <input className="search-bar-box" type = "text" placeholder="Restaurant name" id="RestName">                            
                            </input>
                        </div>                     
                    </div>                       
                  
                    <div className = "col-12 col-sm-6 col-md-auto">      
                        <div >                  
                            <i className="fa fa-map-marker mr-1"></i>
                            <input className="search-bar-box" type = "text" placeholder="Zip code" id="Zipcode" pattern="[0-9]*">                
                            </input>
                        </div> 
                    </div> 
                    <div className = "col-12 col-sm-6 col-md-auto">          
                        <div>  
                            <i className="fa fa-map-o mr-1"></i>      
                            <select placeholder="State" id="State"> 
                                { states }
                            </select>
                        </div>   
                    </div> 
                    <div className = "col-12 col-sm-6 col-md-auto">          
                        <div>  
                            <i className="fa fa-map-signs mr-1"></i>      
                            <select placeholder="City" id="City"> 
                                { cities }
                            </select>
                        </div>   
                    </div> 
                    <div className = "col-12 col-md-auto">  
                        <button className="btn btn-sm btn-primary challenge-color" >
                            <i className="fa fa-search text-white"></i> Search
                        </button> 
                    </div> 
                    </div> 
                    </div> 
                </form>                  
                      
            </div>
        )}


    }
export default SearchBarItem;