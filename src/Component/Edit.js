import React, { Component } from "react";
import Form from "react-bootstrap/Form";
export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: this.props.newName,
        };
        this.nameChange = this.nameChange.bind(this);
    }

    nameChange(e) {
        this.setState({ newName: e.target.value });
    }

    render() {
        console.log("edit-render");
        return (
            <td>
                <Form.Control
                    type="text"
                    value={this.state.newName}
                    onChange={this.nameChange}
                ></Form.Control>
            </td>
        );
    }
}
