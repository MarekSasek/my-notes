import React, {Component} from "react";
import {push} from "connected-react-router";
import {Form, FormGroup, Label, Input, Container, Row, Col, Button} from "reactstrap";
import { connect } from "react-redux";
import {createNote, editNote} from "../actions/actions";
import Translate from "react-translate-component";


const mapDispatchToProps = dispatch => {
    return {
        push: url => dispatch(push(url)),
        createNote: (text) => dispatch(createNote(text)),
        editNote: (id, text) => dispatch(editNote(id, text))
    };
};


const mapStateToProps = state => {
    return {
        note: state.notes.note,
        isCreating: state.notes.isCreating,
        isViewing: state.notes.isViewing,
        isEditing: state.notes.isEditing
    };
};


class NoteDetail extends Component {

    constructor(props) {
        super(props);
    }


    renderLabel = () => {
        const {isCreating, isViewing, isEditing} = this.props;
        if (isCreating) {
            return "labelFor.newNote";
        } else if (isViewing) {
            return "labelFor.noteDetail";
        } else if (isEditing) {
            return "labelFor.editNote";
        }
    };


    renderTextArea = () => {
        const {isCreating, isViewing, isEditing, note} = this.props;
        if (isCreating) {
            return <Input type="textarea" id="noteText" innerRef={(userInput) => this.input = userInput} />          
        } else if (isViewing) {
            return <Input type="textarea" id="noteText" value={note.title} readOnly />
        } else if (isEditing) {
            return <Input type="textarea" id="noteText" innerRef={(userInput) => this.input = userInput} defaultValue={note.title} />
        }
    }; /*Pro větší kontrolu nad formulářem by bylo vhodnější použít controlled přístup přes odchytávání každé změny inputu pomocí onChange s přenášením hodnot rovnou do storu. Nicméně pro toto zadání stačí vzít hodnotu inputu pomocí submit buttonu, až když je celý text poznámky napsaný.*/
    

    renderButton = () => {
        if (this.props.isViewing) {
            return <Translate content="backButton" component={Button} onClick={() => this.props.push("/")} />
        } else {
            return <Translate content="submitButton" component={Button} onClick={this.handleSubmit} type="submit" color="success" />
        }
    };


    handleSubmit = (event) => {
        const {id} = this.props.note;
        event.preventDefault();
        const text = {title: this.input.value};
        this.props.isCreating ? this.props.createNote(text) : this.props.editNote(id, text);
    };
 

    render() {
        return (
            <Container className="pt-5">
                <Row className="mt-5">
                    <Col md="3"></Col>
                        <Col md="6">
                            <Form>
                                <FormGroup>
                                    <Translate content={this.renderLabel()} component={Label} for="noteText" />                           
                                    {this.renderTextArea()}
                                </FormGroup>
                                {this.renderButton()}
                            </Form>
                        </Col>
                    <Col md="3">
                    </Col>
                </Row>  
            </Container>  
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);