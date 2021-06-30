import React ,{ Component } from "react";
import "./Calculator.css"
import Display from "../components/Display";
import Button from "../components/Button";
const initialState ={
    displauValue:"0",
    clearDisplay :false,
    operation:null,
    values:[0,0],
    current:0
}
export default class Calculator extends  Component{

    state = {...initialState}
    
    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this) 
        this.setOperation = this.setOperation.bind(this) 
        this.addDigito = this.addDigito.bind(this) 
    }
    clearMemory(){
        this.setState({...initialState})
    }
    setOperation(operation){
        if (this.state.current === 0){
            this.setState({operation, current : 1, clearDisplay: true})
        } else{
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)

            }catch(e){
                values[0]=this.state.values[0]
            }
            values[1] =0

            this.setState({
                displauValue : values[0],
                operation: equals ? null : operation,
                current: equals ? 0:1,
                clearDisplay: !equals,
                values
            })

        }
    }
    addDigito(n){
        if(n === '.' && this.state.displauValue.includes('.')){
            return
        }
        const clearDisplay = this.state.displauValue === '0'
        || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displauValue
        const displauValue = currentValue + n
        this.setState({displauValue, clearDisplay: false})
    
        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displauValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
        }
    }

    render(){


        return (
            <div className="calculator">
                <Display value={this.state.displauValue}></Display>
                <Button  triple="triple" label="AC" click={this.clearMemory}/>
                <Button click={this.setOperation} operation="operation" label="/"/>
                <Button click={this.addDigito} label="7"/>
                <Button click={this.addDigito} label="8"/>
                <Button click={this.addDigito} label="9"/>
                <Button click={this.setOperation} operation="operation" label="*"/>
                <Button click={this.addDigito} label="4"/>
                <Button click={this.addDigito} label="5"/>
                <Button click={this.addDigito} label="6"/>
                <Button click={this.setOperation} operation="operation" label="-"/>
                <Button click={this.addDigito} label="1"/>
                <Button click={this.addDigito} label="2"/>
                <Button click={this.addDigito} label="3"/>
                <Button click={this.setOperation} operation="operation" label="+"/>
                <Button click={this.addDigito} double="double" label="0"/>
                <Button click={this.addDigito}  label="."/>
                <Button  click={this.setOperation} operation="operation" label="="/>
            </div>
        )
    }
}