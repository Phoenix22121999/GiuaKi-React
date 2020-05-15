import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class AddTaskButton extends Component {
    constructor(props) {
        super(props);
        this.addClick = this.addClick.bind(this);
    }
    addClick() {
        this.props.showForm();
    }

    render() {
        var btn = null;
        if (this.props.adding) {
            btn = (
                <Button onClick={this.addClick} variant="info" block>
                    Close
                </Button>
            );
        } else
            btn = (
                <Button onClick={this.addClick} variant="info" block>
                    Add Task
                </Button>
            );
        return (
            <Col sm={5} xs={5} md={5} lg={5}>
                {btn}
            </Col>
        );
    }
}
