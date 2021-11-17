import React from "react";
import UsersTable from "./UsersTable";
import ShellsTable from "./ShellsTable";
import CreateShell from "./CreateShell";

// ability to load all products in a table, ability to load all users in a table

class AdminDash extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "users",
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(event) {
    this.setState({
      view: event.target.value,
    });
  }

  render() {
    let view = <UsersTable />;

    if (this.state.view === "users") {
      view = <UsersTable />;
    }
    if (this.state.view === "shells") {
      view = (
        <div>
          <CreateShell />
          <ShellsTable />
        </div>
      );
    }
    return (
      <div>
        <label htmlFor="view">View</label>
        <select name="view" value={this.state.view} onChange={this.changeView}>
          <option value="users">Users</option>
          <option value="shells">Shells</option>
        </select>
        {view}
      </div>
    );
  }
}

export default AdminDash;
