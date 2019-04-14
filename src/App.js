import React from 'react';
import './css/style.css';
//import Header from './Header';
import Budget from './Budget';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';

const Header = React.lazy( ()=> import('./Header'));
const year = new Date().getFullYear();
const month = new Date().getMonth();
let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: {
                month: monthArray[month],
                year: year,
            },
            select: 'plus',
            value: {
                inc: (0).toFixed(2),
                exp: (0).toFixed(2)
            },
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
        };

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
        
    }

    handleClick(event) {
        let budgetDesc = document.getElementById('budget-desc');
        let budgetAmount = document.getElementById('budget-amount');
        let budgetDel =  document.getElementById("budget-del-Inc");

        
        //HANDLE RESET
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
        
    }

    handleKeyPress(event) {
        let select = document.getElementById('budget-select');
        let budgetDesc = document.getElementById('budget-desc');
        let budgetAmount = document.getElementById('budget-amount');

        if(event.which === 13 && budgetDesc.value && budgetAmount.value) {
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
                        exp: [...prevState.desc.exp],
                    },
                    current: {
                        inc: [...prevState.current.inc, budgetAmount.value],
                        exp:[...prevState.current.exp]
                    }
                })
            )

           
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


        } }

    }

    componentDidMount() {
        let month = prompt('Please enter month: ', '');
        let year = prompt('Please enter year: ', '');

        this.setState(
            (prevState) => ({
                date: {
                    month: month || prevState.date.month,
                    year: year || this.state.date.year
                }
            })
        )
        
    }

/*
    shouldComponentUpdate(nextProps, nextState, snapshot) {

    let select = document.getElementById('budget-select');
    let budgetDesc = document.getElementById('budget-desc');
    let budgetAmount = document.getElementById('budget-amount');

        if (budgetDesc.value.length > 1 && budgetAmount.value.length > 1) {
            return true
        } else {

        return false
        }

    }
*/
    componentDidUpdate(prevProps, prevState) {
        
        let select = document.getElementById('budget-select');
        let budgetDesc = document.getElementById('budget-desc');
        let budgetAmount = document.getElementById('budget-amount');
        //Here
        if(budgetAmount.value) {
            budgetDesc.value = "";
            budgetAmount.value = "";
        }
    }

    render() {

        const currentInc = this.state.current.inc.map(
            (currentInc, index) => (
                Number(currentInc).toFixed(2)
            ));
        const formatInc = currentInc.map(
            (income) => (
                income.length < 7 ? income :
            (`${income.substr(0, income.length-6)},${income.substr(income.length-6)}` )
        ));
        const currentExp = this.state.current.exp.map(
            (currentExp) => (
                Number(currentExp).toFixed(2)
            )
        )
        const formatExp = currentExp.map(
            (expense) => (
                expense.length < 7 ? expense :
                `${expense.substr(0, expense.length-6)},${expense.substr(expense.length-6)}`
            )
        )
        const value__inc = this.state.value.inc.length < 7 ? this.state.value.inc : `${this.state.value.inc.substr(0, this.state.value.inc.length-6)},${this.state.value.inc.substr(this.state.value.inc.length-6)}`;

        const value__exp = this.state.value.exp.length < 7 ? this.state.value.exp : `${this.state.value.exp.substr(0, this.state.value.exp.length-6)},${this.state.value.exp.substr(this.state.value.exp.length-6)}`;

        const budgetValue = this.state.budget.sign === "+" ? `${this.state.budget.sign} ${this.state.budget.value}` : `${this.state.budget.sign} ${Math.abs(this.state.budget.value).toFixed(2)}`;

        const budgetFormat = budgetValue.length < 9 ? budgetValue : `${budgetValue.substr(0, budgetValue.length - 6)},${budgetValue.substr(budgetValue.length-6)}`;

        let header = {
           value__inc: value__inc,
           value__exp: value__exp,

            budget: budgetFormat,
            month: this.state.date.month,
            year: this.state.date.year,
        }

        let budget = {
            handleBlur: this.handleBlur,
            handleChange: this.handleChange,
            handleClick: this.handleClick,
            handleFocus: this.handleFocus,
            select: this.state.select,
            keyPress: this.handleKeyPress,
            value: {
                /*inc: this.state.value.inc,
                exp: this.state.value.exp
                */
               /*inc: `${this.state.value.inc.substr(0, this.state.value.inc.length-6)},${this.state.value.inc.substr(this.state.value.inc.length-6)}`,
               exp: this.state.value.exp
               */
            },
            current: {
                inc: this.state.desc.inc.map( (item, index) => (
                    <li id={`${item}-${index}`} className="budget__item" key={`${item}-${index}`} onClick={this.handleClick}  data-value={item}> {item} <span className="budget__amount budget__amount--inc">+&nbsp;{
                    formatInc[index] }</span>
                    <span id={ `budget-del-inc-${index}` } className="budget__delete budget__del-inc"> del</span>
                    </li> )
                ),
                exp: this.state.desc.exp.map(
                    (item, index) => (
                    <li className="budget__item" key={`${item}-${index}`} onClick={this.handleClick} > {item} <span className="budget__amount budget__amount--exp"> -&nbsp;
                    { formatExp[index]}</span>
                    <span id={ `budget-del-exp-${index}` }  className="budget__delete budget__del-exp" title="delete Entry"> del</span>
                    </li>)
                ),
            },
            desc: {
                /*inc: <li className="budget__item">{this.state.desc.inc} <span className="budget__amount"> +&nbsp; {this.state.value.inc}</span></li>,

                exp: <li className="budget__item">{this.state.desc.exp} <span className="budget__amount"> +&nbsp; {this.state.value.exp}</span></li>,
                /*
                inc: this.state.desc.inc,
                exp: this.state.desc.exp,*/
            }
        }
        const fallback = <p> Loading... please wait</p>
        return(
            <ErrorBoundary>
                <div className="container">
                    <React.Suspense fallback={fallback} >
                    <Header {...header} />
                    </React.Suspense>
                    <Budget {...budget}  />

                    <Footer />
                </div>
            </ErrorBoundary>
        )
    }
}

export default App;
