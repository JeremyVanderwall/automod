import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Signup extends React.Component{
    constructor(props){
         super(props);
         this.state={
             message:''
         }
         this.handleSignup=this.handleSignup.bind(this);
     }
    
     handleSignup(event){
		var user = { 'name':this.refs.name.value, 'password':this.refs.pswd.value};
        var url = 'http://localhost:8181/user/signup';
		$.post(url, user, function(data, status){
			if (data == null){
				this.setState({message:'Signup Failed'});
			}else{
				this.props.history.push('/list');
				
			}
		});
        
     }
             render() {
                 return (
                     <div >
						<form  align="center" className="form" width="500px">
						<h4 align="center">Sign Up</h4>
				
						<br/>{this.state.message}<br/><br/>
				
						<div className="form-group">
							<label>Name</label>
							<input type = "text" ref = "name" className="form-control" required/><br/><br/>
                
							<label>Password</label>
							<input type = "password" ref="pswd" className="form-control"  placeholder = "Password" required/>
                </div>
                       
                <br/><br/>
                
                <button type="submit" className="btn btn-primary " onClick={this.handleSignup} >Submit</button>
                
           </form>
           </div>); 
                     
        }
    }

export default Signup;