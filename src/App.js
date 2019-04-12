import React from 'react';
import './css/style.css';
import Header from './Header';
import Budget from './Budget';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';

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
            desc: {
                inc: [],
                exp: [],
            },
            current: {
                inc: [],
                exp: [],
            }

        }
        this.selectRef = React.createRef();
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
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

        if(select.value === "plus") { 
            select.classList.add("active-primary");
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

    handleClick(event) {
        let budgetDesc = document.getElementById('budget-desc'); 
        let budgetAmount = document.getElementById('budget-amount'); 
        
        (event.target.id === "budget__reset") && (
            this.setState({
                select: 'plus',
            value: {
                inc: (0).toFixed(2), 
                exp: (0).toFixed(2),
            },
            budget: {
                value: (0.00).toFixed(2),
                sign: "-", 
            },
            current: {
                inc: [],
                exp: [],
            },
        desc: {
            inc: [],
            exp: []
        }})
        )
        budgetDesc.value = "";
        budgetAmount.value = "";
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
                sign: (Math.sign(Number(value) + Number(this.state.budget.value) ) === 1) ? "+" : "-",
                value: (Number(this.state.budget.value) + Number(value)).toFixed(2),
            };
            this.setState( 
                (prevState) => ({
                    value: {
                        inc: (Number(prevState.value.inc) + Number(value) ).toFixed(2),
                        exp: prevState.value.exp 
                    },
                    budget: {
                        sign: budget.sign,
                        value: budget.value,
                        /*
                        sign: (Math.sign(Number(value) + Number(prevState.budget.value) ) === 1) ? "+" : "-",
                        value: (Number(prevState.budget.value) + Number(value)).toFixed(2),
                        */
                    },
                    desc: {
                        inc: [...prevState.desc.inc, budgetDesc.value],
                        exp: prevState.desc.exp,
                    },
                    current: {
                        inc: [...prevState.current.inc, budgetAmount.value],
                        exp:[...prevState.current.exp]
                    }     
                })
            )
            console.log((Math.sign(Number(value) + this.state.budget.value) === 1) ? "+" : "-")
            ///FOR TEST
            console.log(`value: ${this.state.budget.value}`)
            console.log(`current-inc: ${this.state.current.inc} `)
            console.log(` current-exp: ${this.state.current.exp} `)
            console.log(typeof this.state.budget.value)
        } else if(
            select.value === "minus" && event.target.id === "budget-amount") {
            let budget = {
                sign: (Math.sign(this.state.budget.value - Number(value) ) === 1) ? "+" : "-",
                value: (Number(this.state.budget.value) - Number(value)).toFixed(2), 
            };

            this.setState(
                (prevState) => ({
                value: {
                    exp: (Number(prevState.value.exp) + Number(value) ).toFixed(2),
                    inc: prevState.value.inc,
                },
                budget: {
                    sign: budget.sign,
                    value: budget.value, 
                    /*sign: (Math.sign(prevState.budget.value - Number(value) ) === 1) ? "+" : "-",
                    value: (Number(prevState.budget.value) - Number(value)).toFixed(2), 
                    */
                },
                desc: {
                    inc: prevState.desc.inc,
                    exp: [...prevState.desc.exp, budgetDesc.value],
                },
                current: {
                    inc: [...prevState.current.inc],
                    exp: [...prevState.current.exp, budgetAmount.value]
                }
            }))
            console.log(`value: ${this.state.budget.value}`)
            console.log(`current-inc.value: ${this.state.current.inc} `)
            console.log(` current-exp: ${this.state.current.exp} `)
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
            budget: this.state.budget.sign === "+" ? `${this.state.budget.sign} ${this.state.budget.value}` : `${this.state.budget.sign} ${Math.abs(this.state.budget.value).toFixed(2)}`,
        }

        let budget = {
            handleBlur: this.handleBlur,
            handleChange: this.handleChange,
            handleClick: this.handleClick,
            handleFocus: this.handleFocus,
            select: this.state.select,
            keyPress: this.handleKeyPress,
            value: {
                inc: this.state.value.inc,
                exp: this.state.value.exp
            },
            current: {
                inc: this.state.desc.inc.map( (item, index) =>  { return (
                    <li className="budget__item" key={`${item}-${index}`} > {item} <span className="budget__amount budget__amount--inc">+&nbsp;{Number(this.state.current.inc[index]).toFixed(2)}</span></li> )}
                    ),
                exp: this.state.desc.exp.map( (item, index) => {
                    return (<li className="budget__item" key={`${item}-${index}`} >{item} <span className="budget__amount budget__amount--exp"> -&nbsp;{Number(this.state.current.exp[index]).toFixed(2)}</span></li>
                        )
                    }), 
            },
            desc: {     
                /*inc: <li className="budget__item">{this.state.desc.inc} <span className="budget__amount"> +&nbsp; {this.state.value.inc}</span></li>,

                exp: <li className="budget__item">{this.state.desc.exp} <span className="budget__amount"> +&nbsp; {this.state.value.exp}</span></li>,
                /*
                inc: this.state.desc.inc,
                exp: this.state.desc.exp,*/
            }  
        }

        return(
            <ErrorBoundary>    
                <div className="container">
                    <Header {...header} />
                    
                    <Budget {...budget}  />
                    
                    <Footer />
                </div>
            </ErrorBoundary>
        )
    }
}

export default App;