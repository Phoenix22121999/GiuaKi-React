import React, { Component } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Title from "./Component/Title";
import Search from "./Component/Search";
import SortDropDown from "./Component/SortDropDown";
import AddTaskButton from "./Component/AddTaskButton";
import AddTaskForm from "./Component/AddTaskForm";
import TaskTable from "./Component/TaskTable";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            edit: false,
            search: "",
            by: "Name",
            dir: "ASC",
            newTask: null,
            updateTask: null,
            oldName: null,
            name: "",
            level: 1,
        };
        // console.log("app:" + this.state.adding);
        this.showForm = this.showForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.addTask = this.addTask.bind(this);
        this.resetNewTask = this.resetNewTask.bind(this);
        this.setNameAndLevel = this.setNameAndLevel.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }

    showForm() {
        this.setState({
            edit: false,
            showForm: !this.state.showForm,
            name: "",
            level: 1,
        });
        // console.log("change: " + this.state.showForm);
    }
    closeForm() {
        this.setState({
            showForm: false,
            edit: false,
            name: "",
            level: 1,
        });
    }

    onClickSearch(search) {
        this.setState({
            search: search,
        });
    }

    sortChange(by, dir) {
        this.setState({
            by: by,
            dir: dir,
        });
    }

    updateTask(oldname, name, level) {
        this.setState({
            updateTask: {
                name: name,
                level: level,
                oldName: oldname,
            },
            name: "",
            level: 1,
        });
    }

    addTask(name, level) {
        this.setState({
            newTask: [
                {
                    name: name,
                    level: level,
                },
            ],
        });
    }

    resetNewTask() {
        this.setState({
            newTask: null,
        });
    }

    setNameAndLevel(name, level) {
        this.setState({
            edit: true,
            showForm: true,
            name: name,
            level: level,
        });
    }

    render() {
        // console.log("App: ", this.state.edit);
        if (this.state.showForm) {
            var form = (
                <AddTaskForm
                    closeForm={this.closeForm}
                    showForm={this.state.showForm}
                    addTask={this.addTask}
                    name={this.state.name}
                    level={this.state.level}
                    updateTask={this.updateTask}
                    edit={this.state.edit}
                >
                    {" "}
                </AddTaskForm>
            );
        } else form = null;

        return (
            <Container>
                <Row>
                    <Title></Title>
                </Row>

                <Row>
                    <Search onClickSearch={this.onClickSearch}></Search>
                    <SortDropDown sortChange={this.sortChange}></SortDropDown>
                    <AddTaskButton
                        showForm={this.showForm}
                        adding={this.state.showForm}
                    ></AddTaskButton>
                </Row>

                <Row>{form}</Row>
                <Row>
                    <TaskTable
                        search={this.state.search}
                        by={this.state.by}
                        dir={this.state.dir}
                        newTask={this.state.newTask}
                        resetNewTask={this.resetNewTask}
                        setNameAndLevel={this.setNameAndLevel}
                        updateTask={this.state.updateTask}
                        //oldName={this.state.oldName}
                    ></TaskTable>
                </Row>
            </Container>
        );
    }
}

export default App;
