import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Edit from "./Edit";
import TaskRow from "./TaskRow";
import TaskList from "../Tasks/Task.json";

export default class TaskTable extends Component {
    constructor(props) {
        super(props);
        var local;
        local = localStorage.getItem("Tasks");
        if (local === "undefined") {
            console.log(local);
            //local = JSON.stringify(TaskList.Task);
            localStorage.setItem("Tasks", JSON.stringify(TaskList.Task));
        }

        //localStorage.setItem("Tasks", JSON.stringify(TaskList.Task));
        this.addTask = this.addTask.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.levelChange = this.levelChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.toggleEditOrSave = this.toggleEditOrSave.bind(this);

        // console.log(localStorage.getItem("Tasks"));

        local = localStorage.getItem("Tasks");

        // local = JSON.stringify(TaskList.Task);

        this.state = {
            Task: JSON.parse(local),
            newTask: this.props.newTask,
            isEdit: false,
            editName: "",
            newName: "",
            newLevel: 1,
        };

        //console.log(this.state.TaskList.Task);
    }

    UNSAFE_componentWillMount() {}
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.newTask !== null) {
            // this.addTask(nextProps.newTask);
            this.addTask(nextProps.newTask);
        }
        if (nextProps.updateTask !== null) {
            this.update(
                nextProps.updateTask.oldName,
                nextProps.updateTask.name,
                nextProps.updateTask.level
            );
        }
    }
    componentDidUpdate() {
        // console.log("local save : ", JSON.stringify(this.state.Task));
        localStorage.setItem("Tasks", JSON.stringify(this.state.Task));
    }

    update(oldName, newName, newLevel) {
        // console.log(oldName, newName, newLevel);
        // const index = this.state.Task.findIndex((task) => task.name == oldName);
        const tmpArr = this.state.Task.map((task) => {
            if (task.name === oldName) {
                return { name: newName, level: newLevel };
            } else return task;
        });
        this.setState({
            Task: tmpArr,
        });
        //console.log(tmpArr);
        // this.state.Task[index].name = newName;
        // this.state.Task[index].level = newLevel;
    }

    sortChange(by, dir) {
        this.setState({
            by: by,
            dir: dir,
        });
    }

    delete(name) {
        // console.log("delete");
        const tmpArr = this.state.Task.filter((task) => {
            return task.name !== name;
        });
        this.setState({
            Task: tmpArr,
        });
    }

    handleEdit(name, level) {
        this.setState({
            editName: name,
            newName: name,
            newLevel: level,
            isEdit: true,
        });

        // console.log("edit", name, " ", level);
        this.props.setNameAndLevel(name, level);
    }

    nameChange(e) {
        this.setState({
            newName: e.target.value,
            isEdit: true,
        });
    }

    isEditName(task) {
        if (task.name !== this.state.editName || this.state.isEdit === false) {
            // console.log("nor ", task.name);
            return <td>{task.name}</td>;
        } else if (this.state.isEdit === true) {
            // console.log("text ", task.name);
            return (
                <Edit newName={this.state.newName}></Edit>
                // <td>
                //     <Form.Control
                //         type="text"
                //         value={this.state.newName}
                //         onChange={this.nameChange}
                //     ></Form.Control>
                // </td>
            );
        }
    }

    isEditLevel(task) {
        if (task.name !== this.state.editName || this.state.isEdit === false) {
            // console.log("nor ", task.name);
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

    addTask(newTask) {
        // console.log(newTask);
        if (newTask !== null) {
            const taskListAdded = [...this.state.Task, ...newTask];
            //localStorage.setItem("Tasks", JSON.stringify(taskListAdded));
            this.setState({
                Task: taskListAdded,
            });
            this.props.resetNewTask();
            return taskListAdded;
        } else return this.state.Task;
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

    handleSave(oldName, newName, newLevel) {
        this.setState({ isEdit: false });
        this.update(oldName, newName, parseInt(newLevel));
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

    sort(arr, by, dir) {
        switch (by) {
            case "Name":
                switch (dir) {
                    case "DESC":
                        return arr.sort((a, b) => {
                            // console.log("DESC", a.name - b.name);
                            if (b.name < a.name) {
                                return -1;
                            }
                            if (b.name > a.name) {
                                return 1;
                            }

                            // name trùng nhau
                            return 0;
                            // return b.name - a.name;
                        });

                    default:
                        return arr.sort((a, b) => {
                            // console.log("ASC", a.name - b.name);
                            if (b.name < a.name) {
                                return 1;
                            }
                            if (b.name > a.name) {
                                return -1;
                            }
                            return 0;
                        });
                }

            default:
                switch (dir) {
                    case "DESC":
                        return arr.sort((a, b) => {
                            return b.level - a.level;
                        });

                    default:
                        return arr.sort((a, b) => {
                            return a.level - b.level;
                        });
                }
        }
    }

    render() {
        // console.log("nomal", this.state.Task);
        // if (this.props.newTask !== null) {
        //     const taskListAdded = [...this.state.Task, ...this.props.newTask];
        //     console.log(taskListAdded);
        // }

        const taskListSearched = this.state.Task.filter((task) => {
            return task.name
                .toLowerCase()
                .includes(this.props.search.toLowerCase());
        });

        // const taskListSearched = this.state.Task.filter((task) => {
        //     return task.name
        //         .toLowerCase()
        //         .includes(this.props.search.toLowerCase());
        // });

        // console.log("search", taskListSearched, this.props.by, this.props.dir);

        // const taskListSorted = this.sort(
        //     taskListSearched,
        //     this.props.by,
        //     this.props.dir
        // );
        // console.log("sort", taskListSorted);
        // console.log(taskListSorted);up

        const taskList = this.sort(
            taskListSearched,
            this.props.by,
            this.props.dir
        ).map((task, index) => {
            // console.log("task", task);
            return (
                <TaskRow
                    key={index}
                    index={index}
                    task={task}
                    saveClick={this.handleSave}
                ></TaskRow>
            );
        });

        console.log("table-render");
        return (
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Header as="h3">List Task</Card.Header>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th
                                        style={{ width: "10%" }}
                                        className="text-center"
                                    >
                                        #
                                    </th>
                                    <th>Task</th>
                                    <th
                                        style={{ width: "20%" }}
                                        className="text-center"
                                    >
                                        Level
                                    </th>
                                    <th
                                        style={{ width: "20%" }}
                                        className="text-center"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{taskList}</tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}
