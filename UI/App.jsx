import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './signup.jsx';
import TalkList from './TalkList.jsx';
import NewTalk from './NewTalk.jsx';
import Talk from './Talk.jsx';

class App extends React.Component{
	render(){
		return (
            
			<HashRouter>
                <Switch>
					<Route exact path = "/"  component = {Login} />  
					<Route path = "/signup" component = {Signup} />
					<Route path = "/list/:uid" component = {TalkList} />
					<Route path = "/createTalk/:uid" component = {NewTalk} />
					<Route path = "/talk/:mtalk/:uid" component = {Talk} />
					<Route component={NotFound} />
                </Switch>
            </HashRouter>
			)
                     
    }
 }
const NotFound = () => <h1>404.. This page is not found!</h1>



export default App;