import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

export default class SortDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "Name ASC" };
        this.onSortChange = this.onSortChange.bind(this);
    }

    onSortChange(key) {
        this.setState({
            name: key,
        });
        let tmp = key.split(" ");
        // console.log("By:", tmp[0], "Dir:", tmp[1]);
        this.props.sortChange(tmp[0], tmp[1]);
    }

    render() {
        return (
            <Col sm={3} xs={3} md={3} lg={3}>
                <Dropdown onSelect={this.onSortChange}>
                    <Dropdown.Toggle
                        variant="primary"
                        id="dropdownMenu1"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        Sort by
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Name ASC">
                            Name ASC
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Name DESC">
                            Name DESC
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Level ASC">
                            Level ASC
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Level DESC">
                            Level DESC
                        </Dropdown.Item>
                    </Dropdown.Menu>

                    <Badge>{this.state.name}</Badge>
                </Dropdown>
            </Col>
        );
    }
}
