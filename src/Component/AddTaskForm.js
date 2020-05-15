import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default class AddTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adding: this.props.showForm,
            taskName: this.props.name,
            taskLevel: this.props.level,
            oldTaskName: this.props.name,
        };
        this.closeForm = this.closeForm.bind(this);
        this.levelChange = this.levelChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.saveForm = this.saveForm.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            taskName: nextProps.name,
            taskLevel: nextProps.level,
            oldTaskName: nextProps.name,
        });
    }

    submitForm() {
        this.props.addTask(this.state.taskName, parseInt(this.state.taskLevel));
    }

    levelChange(e) {
        this.setState({
            taskLevel: e.target.value,
        });
    }

    nameChange(e) {
        this.setState({
            taskName: e.target.value,
        });
    }
    saveForm() {
        this.props.updateTask(
            this.state.oldTaskName,
            this.state.taskName,
            parseInt(this.state.taskLevel)
        );
    }
    addSaveToggle(edit) {
        // console.log(edit);
        if (edit) {
            return (
                <Button onClick={this.saveForm} variant="primary">
                    Save
                </Button>
            );
        } else
            return (
                <Button onClick={this.submitForm} variant="primary">
                    Add
                </Button>
            );
    }

    closeForm() {
        this.props.closeForm();
    }

    render() {
        return (
            <Col md={{ span: 5, offset: 7 }}>
                <Form>
                    <Form.Row>
                        <Col md={8}>
                            <Form.Group>
                                <Form.Label srOnly={true} htmlFor="true">
                                    label
                                </Form.Label>
                                <Form.Control
                                    value={this.state.taskName}
                                    onChange={this.nameChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Task Name"
                                    ref="task_name"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Label srOnly={true} htmlFor="true">
                                label
                            </Form.Label>
                            <Form.Control
                                value={this.state.taskLevel}
                                as="select"
                                name="ds"
                                id="inputDs"
                                onChange={this.levelChange}
                            >
                                <option value={1}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col md={12}>
                            <ButtonGroup md={12}>
                                {this.addSaveToggle(this.props.edit)}
                                {/* <Button
                                    onClick={this.submitForm}
                                    variant="primary"
                                >
                                    Add
                                </Button> */}

                                <Button onClick={this.closeForm}>Cancel</Button>
                            </ButtonGroup>
                        </Col>
                    </Form.Row>
                </Form>
            </Col>
        );
    }
}
