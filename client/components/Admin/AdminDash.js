import React from "react";
import UsersTable from "./UsersTable";
import ShellsTable from "./ShellsTable";
import CreateShell from "./CreateShell";

// ability to load all products in a table, ability to load all users in a table

const AdminDash = () => {

    return(
        <div> 
            <UsersTable />
            <ShellsTable />
            <CreateShell />

        </div>
    )
};

export default AdminDash;
