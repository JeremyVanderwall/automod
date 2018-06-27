import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
         super(props);
         this.state={			
			message:''
		};
         this.handleLogin=this.handleLogin.bind(this);
     }
	 
	 
    
     handleLogin(event){
		var user = { name:this.refs.name.value, password:this.refs.pswd.value};
		var context = this;
        var url2 = 'http://localhost:8181/user/login';
		
		$.ajax({
            url: 'http://localhost:8181/user/login',
            type: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
			async: true,
			timeout: 3000,
            data: JSON.stringify( user),
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
				alert("the response is: " + result);
				if ($.trim(result)){
					this.props.history.push("/list/" + user.name);
				}else{
					this.setState({message:"Invalid Login"});
				}
			}
		);
		
        
     }
             render() {
                 return (
                     <div >
						<div align="center" className="form" width="500px">
						<h4 align="center">login</h4>
						<div align="center">{this.state.message}</div>
				
						
				
						<div className="form-group">
							<label>Name</label>
							<input type = "text" ref = "name" className="form-control" required/><br/><br/>
                
							<label>Password</label>
							<input type = "password" ref="pswd" className="form-control"  placeholder = "Password" required/>
                </div>
                       
                <br/><br/>
                <Link to="/signup"> Sign up </Link>
                <button type="submit" className="btn btn-primary "  onClick={this.handleLogin}>Submit</button>
                
           </div>
           </div>); 
                     
        }
    }

export default Login;


