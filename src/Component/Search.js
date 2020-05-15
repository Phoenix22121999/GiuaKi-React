import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import _ from "lodash";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value,
        });
        this.debounceSearch(e.target.value);
    }

    debounceSearch = _.debounce((value) => {
        this.props.onClickSearch(value);
    }, 500);

    handleSearch() {
        // console.log(this.state.inputValue);
        this.props.onClickSearch(this.state.inputValue);
    }

    handleClear() {
        this.setState({
            inputValue: "",
        });
        this.props.onClickSearch("");
    }

    render() {
        return (
            <Col sm={4} xs={4} md={4} lg={4}>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search for..."
                        type="text"
                        aria-describedby="basic-addon1"
                        ref="search"
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                        <ButtonGroup>
                            <Button
                                variant="secondary"
                                onClick={this.handleSearch}
                            >
                                Go!
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={this.handleClear}
                            >
                                Clear
                            </Button>
                        </ButtonGroup>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
        );
    }
}
export default Search;
