import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';

class NewTalk extends React.Component{
    constructor(props){
         super(props);
         this.state={			
			userid:null};
         this.handleClick=this.handleClick.bind(this);
     }
	 componentWillMount(){
		const { uid } = this.props.match.params;
		this.setState({userid: uid});
	 }
    
     handleClick(event){
		var talk = { name:this.refs.name.value, presenter:this.refs.presenter.value};
		var context = this;
		
		$.ajax({
            url: 'http://localhost:8181/talk/updateTalk',
            type: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
			async: false,
			timeout: 3000,
            data: JSON.stringify(talk),
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
				
				this.props.history.push("/list/" + this.state.userid);
			}
		);
		
        
     }
             render() {
                 return (
                     <div >
						<div align="center" className="form" width="500px">
						<h4 align="center">login</h4>
				
						
				
						<div className="form-group">
							<label>Name</label>
							<input type = "text" ref = "name" className="form-control" required/><br/><br/>
                
							<label>Presenter</label>
							<input type = "text" ref="presenter" className="form-control" required/>
                </div>
                       
                <br/><br/>
                
                <button type="submit" className="btn btn-primary "  onClick={this.handleClick}>Submit</button>
                
           </div>
           </div>); 
                     
        }
    }

export default NewTalk;


