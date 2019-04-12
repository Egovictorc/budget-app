import React, {Component} from 'react';
/*
import BudgetDescription from './BudgetDescription';
import BudgetComputation from './BudgetComputation';

*/

function Budget(props) {
    /*
    const inc = props.inc.map( (item, index) => <li key="item" className="budget__item">{item} <span className="budget__amount">{props.current.inc[index]}</span></li>);
    const exp = props.exp.map( 
    (item, index) => <li key="item" className="budget__item">{item} <span className="budget__amount">{props.current.exp[index]}</span></li>);
        */
    let select = {
        onBlur: props.handleBlur, 
        onFocus: props.handleFocus,
        value: props.select,
        onChange: props.handleChange,
    }
    
    let input = {
        text: {
            id: "budget-desc", 
            className: "budget__desc--input", 
            name: "description", 
            placeholder: "Add description", 
            onBlur: props.handleBlur, 
            onFocus: props.handleFocus, 
        },
        
        num: {
            id: "budget-amount",
            className: "budget__desc--input",
            type: "number",
            name: "amount", 
            placeholder: "Value", 
            onBlur: props.handleBlur, 
            onFocus: props.handleFocus, 
            onKeyPress: props.keyPress,
        }
    }
    let button = {
        onClick: props.handleClick,
        onFocus: props.handleFocus,
        onBlur: props.handleBlur,
    }
    

    return(
        <main className="budget">
            <section className="budget__desc">

                <select id="budget-select" className="budget__desc--select" {...select} >
                    <option value="plus">+</option>
                    <option value="minus">-</option>
                </select>

                <input type="text" {...input.text} />

                <input type="number" {...input.num} />

                <button id="budget__reset" className="budget__desc--reset" {...button} >reset</button>
            </section>
            

            <section className="budget__calc">

                <ul id="budget-income" className="budget__list budget__list--income">
                    
                    <li className="budget__item" data-type="income">income</li>
                    {/*
                    <li className="budget__item">Transport <span className="budget-amount"> +&nbsp; {props.value.inc}</span></li>
                    <li className="budget__item">Transport <span className="budget-amount"> +&nbsp; {props.value.inc}</span></li>
                    */} 
                    {props.current.inc}
                    
                </ul>

                <ul id="budget-expense" className="budget__list budget__list--income">
                    
                    <li className="budget__item" data-type="expenses">expenses</li>
                    {/*
                    <li className="budget__item">Transport <span className="budget__amount">-&nbsp; {props.value.exp}</span></li>
                    <li className="budget__item">Transport <span className="budget__amount">-&nbsp; {props.value.exp}</span></li>
                    */}
                    {props.current.exp}
                    
                </ul>
                {/*
                <table className="budget-table">
                    <thead className="budget-table__head">
                        <tr>
                            <th className="budget-table__head--inc">income</th>
                            <th className="budget-table__head--exp">expenses</th>
                        </tr>   
                    </thead>

                    <tbody className="budget-table__body">
                        <tr>
                            <td className="budget-table__body--inc">Transport</td>
                            <td className="budget-table__body--exp">Transport</td>
                        </tr>
                        <tr>
                            <td className="budget-table__body--exp">Transport</td>
                            <td className="budget-table__body--exp">Transport</td>
                        </tr>
                    </tbody>
                </table>
                */}

            </section>
        </main>
    )
}

/*
//Class
class Budget extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render () {
        return(
            <main className="budget">
                <section className="budget__desc">
    
                    <select id="budget-select" className="budget__desc--select" onChange={this.props.handleSelect} value="plus">
                        <option value="plus">+</option>
                        <option value="minus">-</option>
                    </select>
    
                    <input id="budget-desc" className="budget__desc--input" type="text" name="description" placeholder="Add description" />
    
                    <input id="budget-amount" className="budget__desc--input" type="number" name="amount" placeholder="Value" />
                </section>
                
    
                <section className="budget__calc">
                    <table className="budget-table">
                        <thead className="budget-table__head">
                            <tr>
                                <th className="budget-table__head--inc">income</th>
                                <th className="budget-table__head--exp">expenses</th>
                            </tr>   
                        </thead>
    
                        <tbody className="budget-table__body">
                            <tr>
                                <td className="budget-table__body--inc">Transport</td>
                                <td className="budget-table__body--exp">Transport</td>
                            </tr>
                            <tr>
                                <td className="budget-table__body--exp">Transport</td>
                                <td className="budget-table__body--exp">Transport</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        )
    }
}
*/
export default Budget;