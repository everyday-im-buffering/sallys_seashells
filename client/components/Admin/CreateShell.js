import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewShell } from "../../store/allProducts";

class CreateShell extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      marineType: "gastropoda",
      color: "blue",
      pattern: "spotted",
      waterType: "freshwater",
      quantity: 0,
      price: 0,
    };
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.create({
      ...this.state,
    });
  }
  render() {
    const { shell } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <form id="create-form" onSubmit={handleSubmit}>
          <label> New Shell: </label>
          <input name="name" onChange={handleChange} />
          <select
            name="marineType"
            value={this.state.marineType}
            onChange={this.handleChange}
          >
            <option value="gastropoda"> Gastropoda </option>
            <option value="bivalvia">Bivalvia </option>
            <option value="scaphopoda"> Scaphopoda </option>
            <option value="polyplacophora"> Polyplacophora </option>
            <option value="monoplacophora"> Monoplacophora </option>
            <option value="cephalopoda">Cephalopoda</option>
          </select>
          <select
            name="color"
            value={this.state.color}
            onChange={this.handleChange}
          >
            <option value="blue"> blue </option>
            <option value="green"> green </option>
            <option value="brown"> brown </option>
            <option value="white">white</option>
            <option value="grey">grey</option>
            <option value="red">red</option>
            <option value="multi">multi</option>
          </select>
          <select
            name="pattern"
            value={this.state.pattern}
            onChange={this.handleChange}
          >
            <option value="spotted">spotted</option>
            <option value="striped">striped</option>
            <option value="solid">solid</option>
          </select>
          <select
            name="waterType"
            value={this.state.waterType}
            onChange={this.handleChange}
          >
            <option value="freshwater">freshwater</option>
            <option value="marine">marine</option>
          </select>
          <button type="submit">Submit Shell </button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  create: (shell) => dispatch(createNewShell(shell)),
});

export default connect(null, mapDispatch)(CreateShell);
