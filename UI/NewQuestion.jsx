import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import $ from 'jquery';
	
class NewQuestion extends React.Component{
	constructor(props){
		super(props);
		this.state={			
			id:null,
			value: 'Ask your Question'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	handleSubmit(event) {
		
		var question = { question:this.state.value,
							upvotes:[this.props.user]
		};
		$.ajax({
            url: 'http://localhost:8181/talk/newQuestion/' + this.props.id,
            type: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
			async: false,
			timeout: 3000,
            data: JSON.stringify(question),
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
				this.state.value = 'Thank you';
			}
		);
		//event.preventDefault();
	}	
	
	render(){
		
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Question:
						<textarea value={this.state.value} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}
export default NewQuestion;