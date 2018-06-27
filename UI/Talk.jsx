import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import $ from 'jquery';
import Questions from './Questions.jsx';
import NewQuestion from './NewQuestion.jsx';
	
class Talk extends React.Component{
	constructor(props){
			super(props);
			this.state={			
				talk:null,
				user:null
			};
	}	
	componentWillMount(){
		
		const { mtalk } = this.props.match.params;
		const { uid } = this.props.match.params;
		this.setState({user: uid});
        var a =this;
		$.get("http://localhost:8181/talk/getTalk/" + mtalk, function(data){
            a.setState({talk:data});
        });
		
	}
	render(){
		var myTalk = JSON.stringify(this.state.talk);
		if (this.state.talk == null){
			return(
				<div>
					Talk didn't load for passing to new Question
				</div>);
		}
		return(
			<div className ='rowC'>
				<Questions talk = {this.state.talk} uid={this.state.user}/>
				<NewQuestion id = {this.state.talk.id} user = {this.state.user} />
				
			</div>);
		
	}
}
export default Talk;