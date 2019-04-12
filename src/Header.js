import React, {Component} from 'react';

/*
class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <h1>available budget in {} </h1>
        )
    }
}
*/

function Header(props) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return(
        <header className="header" >
        
        <h1 className="heading header__description"> available budget in {monthArray[month]} {year} </h1>

        <div className="revenue-net"> {props.budget} </div>

        <div className="revenue">   
            <div className="revenue__income">income:  
            </div>
                
            <div className="revenue__income--value"> + {props.value__inc}
            </div>
            
            <div className="revenue__expenses">
                expenses: 
            </div>

            <div className="revenue__expenses--value"> - {props.value__exp}
            </div>

        </div>

        </header>
    )
}
export default Header;