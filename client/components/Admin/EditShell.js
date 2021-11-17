import React from "react";
import { connect } from "react-redux";
import { fetchSingleShell } from "../../store/singleShell";
import { updateShell } from "../../store/allProducts";

//accessible through the shells table or a ternary that renders this when a logged in user is an admin
class EditShell extends React.Component {
    constructor(){
        super()
        this.state = {
            id: 0,
            name: '',
            marineType: 'gastropoda',
            color: "blue",
            pattern: "spotted",
            waterType: "freshwater",
            quantity: 0,
            price: 0
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
componentDidMount() {
    try {
    this.props.fetchShell(this.props.match.params.id);
    } catch (e){
        console.error(e);
    }

}
componentDidUpdate(){
    const shell = this.props.shell;
    if (shell.id !== this.state.id){
        this.setState({
            id: shell.id,
            name: shell.name,
            marineType: shell.marineType,
            color: shell.color,
            pattern: shell.pattern,
            waterType: shell.waterType,
            quantity: shell.quantity,
            price: shell.price
        })
    }
}

handleChange(evt){
    this.setState({
        [evt.target.name]: evt.target.value

    });
}

handleSubmit(evt){
    console.log('submitted')
    evt.preventDefault();
    this.props.updatesShell({...this.state})
}

render(){
    let shell = this.props.shell || {};
    const { handleSubmit, handleChange } = this;
return (
    <div>
    <form id="create-form" onSubmit={handleSubmit}>
    <label> Edit Shell: </label>
    <input name="name" onChange={handleChange} />
    <select name="marineType"
    value={this.state.marineType}
    onChange={this.handleChange}
  >
    <option value="gastropoda"> gastropoda </option>
    <option value="bivalvia">bivalvia </option>
    <option value="monoplacophora"> monoplacophora </option>
    <option value="cephalopoda">cephalopoda</option>
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
)
}
}

const mapState = (state) => {
    return{
        shell: state.singleShell
    }
}

const mapDispatch = (dispatch) => {
    return{
    updatesShell: (shell) => dispatch(updateShell(shell)),
    fetchShell: (id) => dispatch(fetchSingleShell(id))
    }
}

export default connect(mapState, mapDispatch)(EditShell)
