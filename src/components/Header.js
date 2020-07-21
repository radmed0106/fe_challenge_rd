import React from 'react';

class Header extends React.Component {

    
    render() {

        

        return(         

            <nav className="navbar navbar-expand-sm navbar-light bg-white">               
                
                <div className="navbar-brand">
                    <div className="logo" ></div>
                </div>  
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse w-100 flex-md-column" id="navbarCollapse">                              
             
                    <ul className="navbar-nav ml-auto small mb-2 mb-md-0">
                        <li className="nav-item">
                            <div className="nav-link header-item">My Dashboard</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link header-item">Search</div>
                        </li>
                        <li className="nav-item header-icon">
                        <i className="fa fa-bell-o text-muted"></i>
                        </li>
                        <li className="nav-item header-icon">
                        <i className="fa fa fa-user-circle-o text-muted"></i>
                        </li>
                    </ul>
                </div> 
            </nav>
            
        )
    }


}
export default Header;