

import React, {Component} from 'react';

import './index.css';



class TestComponent extends Component {
 render(){

 console.log(this.props)

     return (

        
         <div>{this.props.greet}</div>
     )
 }   
}

export default TestComponent



// state = {
//     name:'Piet',
//     age: '223'
// }
