import React, {Component} from "react";
import {push} from "connected-react-router";
import {connect} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";
import {Table, Container, Row, Col, Button} from "reactstrap";
import NoteTableItem from "./notetableitem";
import {loadAllNotes, isCreating} from "../actions/actions";
import Translate from "react-translate-component";


const mapDispatchToProps = dispatch => {
    return {
        loadAllNotes: () => dispatch(loadAllNotes()),
        push: url => dispatch(push(url)),
        isCreating: () => dispatch(isCreating())
    };
};


const mapStateToProps = state => {
    return {
        allNotes: state.notes.allNotes,
        isCreatingg: state.notes.isCreating,
        isViewing: state.notes.isViewing,
        isEditing: state.notes.isEditing
    };
};


class NoteTable extends Component {

    
    componentDidMount() {
        const {isCreatingg, isViewing, isEditing} = this.props; 
                     
        if (!isCreatingg && !isViewing && !isEditing) {
            this.props.loadAllNotes();  
        }
    }


    newNote = () => {
        this.props.isCreating();
        this.props.push("/detail");
    };


    render() {    
        const {allNotes} = this.props;

        return (
            <Container className="pt-4">
                <Row className="mt-5">
                    <Col md="3"></Col>
                    <Col md="6">
                        <Table hover> 
                            <thead>
                                <tr>
                                    <th className="no-border">
                                        <Translate content="newNoteButton" component={Button} onClick={this.newNote} />
                                    </th>
                                </tr>
                            </thead>              
                            <tbody className="last-border">
                                {allNotes.map(note => <NoteTableItem key={note.id} note={note} />)}                                                                   
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="3">                       
                    </Col>
                </Row>
            </Container>
        );  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTable);