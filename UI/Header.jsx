import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Header extends React.Component{
    constructor(props){
         super(props);
         this.state={
             user:''
         }
    }
    render() {
		return (
			<div >
            Auto Moderator Web App
			<div style={{textAlign: 'right'}}>{this.props.name}  </div>
			</div>); 
                     
        }
    }

export default Header;


