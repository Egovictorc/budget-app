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
            value: {inc: (0).toFixed(2), exp: (0).toFixed(2)},
            budget: {
                value: (0.00).toFixed(2),
                 sign: "-" 
            },

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
            let budget = {
                sign: (Math.sign(value - this.state.budget.value) === 1) ? "+" : "-"
            };

            this.setState( 
                (prevState) => ({
                    value: {
                        inc: (Number(prevState.value.inc) + Number(value) ).toFixed(2),
                        exp: prevState.value.exp 
                    },
                    budget: {
                        sign: budget.sign,
                        value: (Number(prevState.budget.value) + Number(value)).toFixed(2),
                    },
                    
                })
            )
            console.log(this.state.budget.value)
            console.log(typeof this.state.budget.value)
        } else if(select.value === "minus" &&           event.target.id === "budget-amount") {
            let budget = {
                sign: (Math.sign(value - this.state.budget.value) === 1) ? "+" : "-",
                value: (this.state.value.inc - value).toFixed(2),
            };

            this.setState(
                (prevState) => ({
                value: {
                    exp: (Number(prevState.value.exp) + Number(value) ).toFixed(2),
                    inc: prevState.value.inc,
                },
                budget: {
                    sign: budget.sign,
                    value: (Number(prevState.budget.value) - Number(value)).toFixed(2), 
                }
            }))
            console.log(this.state.budget.value)
            console.log(typeof this.state.budget.value)
        } }

    }
/*
    componentDidMount(prevProps, prevState, snapshot) {

    }
    shouldComponentUpdate(prevProps, prevState, snapshot) {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
  }
*/
    render() {
        let header = {
            value__inc: this.state.value.inc,   
            value__exp: this.state.value.exp,
            budget: `${this.state.budget.sign} ${this.state.budget.value}`,
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