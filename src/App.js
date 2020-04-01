import React, { Component } from 'react';
import './App.css';
import "./css/custom.css";
import {UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col} from "reactstrap";
import { Switch, Route } from 'react-router-dom';
import NoteTable from './components/notetable';
import NoteDetail from './components/notedetail';
import ErrorPage from './components/errorpage';
import counterpart from "counterpart";
import Translate from "react-translate-component";
import cs from "./translations/cs";
import en from "./translations/en";


counterpart.registerTranslations("cs", cs);
counterpart.registerTranslations("en", en);
counterpart.setLocale("cs");


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        language: "cs"
    };        
  }


  languageChange = (event) => {
    this.setState({language: event.target.innerText});
    counterpart.setLocale(event.target.innerText);
  };


  render() {
    return (   
      <React.Fragment>
        <Container>
          <Row>                   
            <Col md="9">
              <UncontrolledButtonDropdown className="float-right pt-4">               
                <Translate content="changeLanguage" component="span" className="mr-2" /> 
                <DropdownToggle className="btn btn-outline-secondary radius" caret size="sm" color="light">
                    {this.state.language}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.languageChange}>en</DropdownItem>
                    <DropdownItem onClick={this.languageChange}>cs</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </Col>          
          </Row>
        </Container>  
        <Switch>
          <Route exact path="/" component={NoteTable} />
          <Route path="/detail" component={NoteDetail} />
          <Route component={ErrorPage} />
        </Switch>       
      </React.Fragment>   
    );
  }
}

export default App;
