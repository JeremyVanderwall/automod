import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import $ from 'jquery';
class MyQuestion extends React.Component{
	constructor(props){
		super(props);
		this.handleUpvote = this.handleUpvote.bind(this);
	}
	handleUpvote(event){
		if (this.props.quest.upvotes.includes(this.props.uid)){
			return;
		}
		var tmp = this.props.quest;
		tmp.upvotes.push(this.props.uid);
		alert(JSON.stringify(tmp));
		
		$.ajax({
            url: 'http://localhost:8181/talk/upvote/' + this.props.talkid,
            type: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
			async: false,
			timeout: 3000,
            data: JSON.stringify(tmp),
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
				
			}
		);
	}
	render(){
		return (
			<tr>
				<td> <button onClick={this.handleUpvote}> Upvote </button> </td>
				<td> {this.props.quest.upvotes.length} </td>
				<td> {this.props.quest.question}</td>
			</tr>);
	}
}
class Questions extends React.Component{
	constructor(props){
		super(props);
		this.state={			
			talk:null
		};
		this.tick = this.tick.bind(this);
	}	
	
	 tick() {
		 var a= this;
		 $.get("http://localhost:8181/talk/getTalk/" + a.state.talk.id, function(data){
            a.setState({talk:data});
        });
        
    }
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
		this.setState({talk:this.props.talk});
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
	render(){
		function compare(a,b) {
			if (a.upvotes.length > b.upvotes.length)
				return -1;
			if (a.upvotes.length < b.upvotes.length)
				return 1;
			return 0;
}
		var rows=[];
		var uid = this.props.uid;
		var talk = this.state.talk;
		if (this.state.talk != null){
			var questions = this.state.talk.questions;
			questions.sort(compare);
			questions.forEach(function(prod,index){
				rows.push(<MyQuestion key = {prod.id} talkid={talk.id} quest={prod} uid = {uid}/>);
			});
		}
		
		//alert(JSON.stringify(questions));
        

		return (
			<div>
				<h1>LIST PAGE</h1>
				<table className="table" >
					<tbody>
						<tr>
							<th>Upvote</th>
							<th>Count</th>
							<th>Question</th>
						</tr>
						{ rows }
					</tbody>
				</table>                
			</div>
				)
		}
}
export default Questions;