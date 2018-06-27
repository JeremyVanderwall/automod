import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,BrowserRouter as Router, Route, Link} from 'react-router-dom';
import $ from 'jquery';
	
	class MyTalk extends React.Component{
	

		render(){
			var url = "/talk/" + this.props.id + "/" + this.props.uid;
			return (
				<tr>
					<td><Link to={url}>{this.props.name} </Link></td>	
					<td>{this.props.presenter} </td>	
								
				</tr>)
								
		}
	}
	
	class TalkList extends React.Component{
		
		constructor(props){
			super(props);
			this.state={			
			talks:[],
			userid:null};
	}		
	
	componentDidMount(){
		
		const { uid } = this.props.match.params;
		this.setState({userid: uid});
        var a =this;
		$.get("http://localhost:8181/talk/getAll", function(data){
            a.setState({talks:data});
        });
	}
		
		
		render(){
			
				
				var rows=[];
				
				var uid = this.state.userid;
                this.state.talks.forEach(function(prod,index){
				rows.push(<MyTalk key = {prod.id} id={prod.id} name={prod.name} presenter={prod.presenter} uid = {uid}/>);
                });
				var newTalk = "/createTalk/" + uid;

			return (
					<div>
						<h1>LIST PAGE</h1>
						<div>
						{/*
							<Link to = {newTalk}>Create Talk</Link> 
						*/}
						</div>
						<table className="table" >
							<tbody>
								<tr>
									<th>Name</th>
									<th>Presenter</th>
								</tr>
								{ rows }
							</tbody>
						</table>                
					</div>
				)
		}
	}

export default TalkList;