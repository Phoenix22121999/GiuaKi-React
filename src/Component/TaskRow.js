import React, { Component } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

// import Edit from "./Edit";
export default class TaskRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            task: this.props.task,
            editName: this.props.task.name,
            newName: this.props.task.name,
            newLevel: 1,
            isEdit: false,
        };
        this.nameChange = this.nameChange.bind(this);
        this.levelChange = this.levelChange.bind(this);
    }

    update(oldName, newName, newLevel) {
        // console.log(oldName, newName, newLevel);
        // const index = this.state.Task.findIndex((task) => task.name == oldName);
        const local = localStorage.getItem("Tasks");
        let taskList = JSON.parse(local);
        const tmpArr = taskList.map((task) => {
            if (task.name === oldName) {
                return { name: newName, level: newLevel };
            } else return task;
        });
        localStorage.setItem("Tasks", JSON.stringify(tmpArr));
        // this.setState({
        //     Task: tmpArr,
        // });
        //console.log(tmpArr);
        // this.state.Task[index].name = newName;
        // this.state.Task[index].level = newLevel;
    }

    handleSave() {
        this.props.saveClick(
            this.state.editName,
            this.state.newName,
            this.state.newLevel
        );
        console.log(
            this.state.editName,
            this.state.newName,
            this.state.newLevel
        );
        this.setState({
            isEdit: false,
            task: {
                name: this.state.newName,
                level: parseInt(this.state.newLevel),
            },
        });
        // this.update(
        //     this.state.editName,
        //     this.state.newName,
        //     parseInt(this.state.newLevel)
        // );
    }

    toggleEditOrSave(task) {
        if (this.state.isEdit) {
            return (
                <Button
                    variant="warning"
                    onClick={() => this.handleSave(task.name, task.level)}
                >
                    Save
                </Button>
            );
        } else {
            return (
                <Button
                    variant="warning"
                    onClick={() => this.handleEdit(task.name, task.level)}
                >
                    Edit
                </Button>
            );
        }
    }

    handleEdit(name, level) {
        this.setState({
            editName: name,
            newName: name,
            newLevel: level,
            isEdit: true,
        });

        // console.log("edit", name, " ", level);
        //this.props.setNameAndLevel(name, level);
    }

    level(level) {
        switch (level) {
            case 1:
                return <Badge variant="light">Low</Badge>;
            case 2:
                return <Badge variant="info">Medium</Badge>;
            case 3:
                return <Badge variant="danger">High</Badge>;
            default:
                return <Badge variant="primary">No Level</Badge>;
        }
    }

    nameChange(e) {
        this.setState({ newName: e.target.value });
    }

    isEditName(task) {
        if (task.name !== this.state.editName || this.state.isEdit === false) {
            // console.log("nor ", task.name);
            return <td>{task.name}</td>;
        } else if (this.state.isEdit === true) {
            // console.log("text ", task.name);
            return (
                // <Edit newName={this.state.newName}></Edit>
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

    delete(name) {
        // console.log("delete");
        this.props.deleteClick(name);
        // const tmpArr = this.state.Task.filter((task) => {
        //     return task.name !== name;
        // });
        // this.setState({
        //     Task: tmpArr,
        // });
    }

    isEditLevel(task) {
        if (task.name !== this.state.editName || this.state.isEdit === false) {
            return <td className="text-center">{this.level(task.level)}</td>;
        } else if (this.state.isEdit === true) {
            // console.log("select ", task.name);
            return (
                <td className="text-center">
                    <Form.Control
                        value={this.state.newLevel}
                        as="select"
                        name="ds"
                        id="inputDs"
                        onChange={this.levelChange}
                    >
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                    </Form.Control>
                </td>
            );
        }
    }

    levelChange(e) {
        this.setState({
            newLevel: e.target.value,
        });
    }

    render() {
        // console.log(this.state.task);
        console.log("row-render");
        return (
            // <tr key={index}>
            <tr>
                <td className="text-center">{this.props.index + 1}</td>
                {this.isEditName(this.props.task)}
                {this.isEditLevel(this.props.task)}
                {/* <td>{task.name}</td> */}
                {/* <td className="text-center">{this.level(task.level)}</td> */}
                <td className="text-center">
                    <ButtonGroup>
                        {this.toggleEditOrSave(this.props.task)}
                        {/* <Button
                    variant="warning"
                    onClick={() =>
                        this.handleEdit(task.name, task.level)
                    }
                >
                    Edit
                </Button> */}
                        <Button
                            variant="danger"
                            onClick={() => {
                                return this.delete(this.props.task.name);
                            }}
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    }
}
