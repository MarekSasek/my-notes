import React, {Component} from "react";
import {push} from "connected-react-router";
import {Button} from "reactstrap";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/custom.css";
import {removeNote, viewNote, isEditing, currentNote} from "../actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTimes, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


const mapDispatchToProps = dispatch => {
    return {
        push: url => dispatch(push(url)),
        removeNote: (id) => dispatch(removeNote(id)),
        viewNote: (id) => dispatch(viewNote(id)),
        currentNote: (note) => dispatch(currentNote(note)),
        isEditing: () => dispatch(isEditing())      
    };
};


class NoteTableItem extends Component {


    startEditNote = () => {
        this.props.currentNote(this.props.note);
        this.props.isEditing();
        this.props.push("/detail");
    };


    render() {
        const {note} = this.props;

        return (
                <tr>
                    <td>{note.title}</td>                    
                    <td>
                        <Button
                            className="mw-42"
                            title="Zobrazit detail"/*V rámci detailnějších úprav (a více času) bych přeložil i title pomocí counterpart.translate a použití nové const v renderu.*/
                            onClick={() => this.props.viewNote(note.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                    </td>
                    <td>
                        <Button
                            className="mw-42"
                            color="info"
                            title="Editovat"
                            onClick={this.startEditNote}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                    </td>
                    <td>
                        <Button
                            className="mw-42"
                            color="danger"
                            title="Smazat"
                            onClick={() => this.props.removeNote(note.id)}/*U větší aplikace by zde z hlediska výkonnosti bylo vhodnější použít volání funkce definované mimo render. Takto pomocí arrow function se při každém renderu vytváří nová funkce.*/>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </td>
                </tr>
        );
    }
}


export default connect(null, mapDispatchToProps)(NoteTableItem);