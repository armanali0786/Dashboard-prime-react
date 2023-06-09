import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/users");
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
    filterUsers(searchText); 
    setCurrentPage(1);
  };

  const handleSort = (event) => {
    const { field, order } = event.sort;
    setSortField(field);
    setSortOrder(order);
    filterUsers(searchText, field, order);
    setCurrentPage(1);
  };

  const filterUsers = (searchText) => {
    let filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(searchText)
    );

    if (sortField) {
      filteredData.sort((a, b) => {
        const valueA = a[sortField].toLowerCase();
        const valueB = b[sortField].toLowerCase();
        if (valueA < valueB) {
          return sortOrder === 1 ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === 1 ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredUsers(filteredData);
  };

  return (
    <div className="users-table">
      <h3 className="table">User Table</h3>
      <DataTable
        value={filteredUsers} // Use currentUsers instead of filteredUsers
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
      >
        <Column
          sortable
          style={{ width: "10%" }}
          field="id"
          header="ID"
          sortField="id"
          sortOrder={sortField === "id" ? sortOrder : null}
          onSort={handleSort}
        ></Column>
        <Column
          sortable
          style={{ width: "30%" }}
          field="username"
          header="Username"
          sortField="username"
          sortOrder={sortField === "username" ? sortOrder : null}
          onSort={handleSort}
        ></Column>
        <Column
          sortable
          style={{ width: "10%" }}
          field="name"
          header="Name"
          sortField="name"
          sortOrder={sortField === "name" ? sortOrder : null}
          onSort={handleSort}
        ></Column>
        <Column
          sortable
          style={{ width: "15%" }}
          field="email"
          header="Email"
          sortField="email"
          sortOrder={sortField === "email" ? sortOrder : null}
          onSort={handleSort}
        ></Column>
        <Column
          sortable
          style={{ width: "10%" }}
          field="status"
          header="Status"
        ></Column>
      </DataTable>
    </div>
  );
};

export default UsersTable;
