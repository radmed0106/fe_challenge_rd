import React from 'react';

class SeeWebsiteItem extends React.Component {
    
       
    render() {               
        const { data } = this.props;
       
        return (

            <div className="website-item">
                <div className="website-reservation-item">Make a Reservation</div>
                <div>
                    <div className="btn btn-primary challenge-color phone-item">
                        <i className="fa fa-phone mr-1 text-white" aria-hidden="true"></i>{ data.phone }
                    </div>               
                </div>
                <button className="btn btn-sm" >
                    <a className="website-item" href={data.reserve_url}>See website</a> 
                </button>   
                <span className="vertical-line"></span>
                <button className="btn btn-sm" >
                    <i className="fa fa-heart-o mr-1" aria-hidden="true"></i>Save
                </button>                     
            </div>
        
      )
   }
}

export default SeeWebsiteItem;