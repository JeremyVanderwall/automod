import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Signup extends React.Component{
    constructor(props){
         super(props);
         this.state={
             message:'hi'
         }
         this.handleSignup=this.handleSignup.bind(this);
     }
    
     handleSignup(event){
		var user = { 'name':this.refs.name.value, 'password':this.refs.pswd.value, 'admin':this.refs.admin.value};
        var myUrl = 'http://localhost:8181/user/signup';
		var context = this;
		$.ajax({
            url: myUrl,
            type: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
			async: false,
			timeout: 3000,
            data: JSON.stringify(user),
			error: function (jqXHR, exception) {
						var msg = '';
						if (jqXHR.status === 0) {
							alert('Not connect.\n Verify Network.');
						} else if (jqXHR.status == 404) {
							alert('Requested page not found. [404]');
						} else if (jqXHR.status == 500) {
							alert('Internal Server Error [500].');
						} else if (exception === 'parsererror') {
							alert('Requested JSON parse failed.');
						} else if (exception === 'timeout') {
							alert('Time out error.');
						} else if (exception === 'abort') {
							alert('Ajax request aborted.');
						} else {
							alert('Uncaught Error.\n' + jqXHR.responseText);
						}
						
        }
		
		}).then(
			(result) => {
				alert("this is result: ");
				if ($.trim(result)){
					this.props.history.push("/list/" + result.name);
				}
				else{
					context.setState({message:"Name in use"});
				}
			}
		);
        
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
							<input type = "password" ref="pswd" className="form-control"  placeholder = "Password" required/><br/><br/>
                
							<label>Admin</label>
							<input type = "checkbox" ref="admin" className="form-control"/><br/><br/>
				</div>
                       
                <br/><br/>
                
                <button type="submit" className="btn btn-primary " onClick={this.handleSignup} >Submit</button>
                
           </form>
           </div>); 
                     
        }
    }

export default Signup;