import React from 'react';
import './css/style.css';
import Header from './Header';
import Budget from './Budget';
import Footer from './Footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 'plus',
            value: {inc: "+0.00", exp: "-0.00"},

        }
        this.selectRef = React.createRef();
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        
        console.log(this.state.select)
    }

    handleBlur(event) {
        let select = document.getElementById('budget-select');
        let budgetDesc = document.getElementById('budget-desc'); 
        let budgetAmount = document.getElementById('budget-amount'); 
        
        event.target.classList.remove('active-primary', 'active-secondary')
        /*budgetDesc.classList.remove('active-primary', 'active-secondary')
        budgetAmount.classList.remove('active-primary', 'active-secondary')
        */
       budgetDesc.value="";
       budgetAmount.value="";

        console.log(event.target)
    }

    handleChange(event) {
        let select = document.getElementById('budget-select');
        let budgetDesc = document.getElementById('budget-desc');
        let budgetAmount = document.getElementById('budget-amount'); 

        if(select.value === "plus") {               select.classList.add("active-primary");
        select.classList.remove("active-secondary");
            this.setState({
                select: select.value
            })
        } else {
            select.classList.remove("active-primary")
            select.classList.add("active-secondary")
            this.setState({
                select: select.value
            })
        }

        console.log(event.target)
    }
    
    handleFocus(event) {
        let select = document.getElementById('budget-select');
        let budgetDesc = document.getElementById('budget-desc'); 
        let budgetAmount = document.getElementById('budget-amount'); 
        
         select.value === 'minus' ? this.setState({
             select : 'minus'
         }) : this.setState({
             select: 'plus',
         })  
        
        select.value === "plus" ? (event.target.classList.add('active-primary')) :
        (event.target.classList.add('active-secondary'));
        console.log(event.target)
        
    }

    handleKeyPress(event) {
        let select = document.getElementById('budget-select');
        let budgetDesc = document.getElementById('budget-desc');
        let budgetAmount = document.getElementById('budget-amount'); 
        console.log(event.which)

        if(event.which === 13) {
            let value = Number(event.target.value).toFixed(2);
        if(select.value === "plus" && event.target.id === "budget-amount") {
            
            this.setState( 
                (prevState) => ({
                    value: {
                        inc: `+ ${value}`,
                        exp: prevState.value.exp 
                    }
                })
            )
        } else if(select.value === "minus" && event.target.id === "budget-amount") {

            this.setState(
                (prevState) => ({
                value: {
                    exp: `- ${value}`,
                    inc: prevState.value.inc,
                      
                }
            }))
        } }

    }

    render() {
        let header = {
            value__inc: this.state.value.inc,   
            value__exp: this.state.value.exp,   
        }

        let budget = {
            handleBlur: this.handleBlur,
            handleChange: this.handleChange,
            handleFocus: this.handleFocus,
            select: this.state.select,
            keyPress: this.handleKeyPress, 
            
        }
        
        return(
            <div className="container">
                <Header {...header} />
                
                <Budget {...budget} />
                
                <Footer />
            </div>
        )
    }
}

export default App;