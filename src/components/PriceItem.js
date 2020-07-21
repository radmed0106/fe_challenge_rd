import React from 'react';

class PriceItem extends React.Component {
    
       
    render() {               
        const { data } = this.props;
        const MAX_PRICE = 4;
        let price = data.price;

        if(data.price >  MAX_PRICE) {
          price = MAX_PRICE;
        }

        let priceScore = [];
        let i = 0;
        let key = 0;
        for (i = 0; i < price; i++) {
            key= data.id + "a" + i;
            priceScore.push( <div key={key} className="price-img-active mr-1"/>  )
          }  
        for (i = 0; i < MAX_PRICE - price; i++) {
            key= data.id + "i" + i;
            priceScore.push( <div key={key} className="price-img-inactive mr-1"/>  )
          }          
               
        return (     
            <div>
                { priceScore }
            </div>     
        
      )
   }
}

export default PriceItem;