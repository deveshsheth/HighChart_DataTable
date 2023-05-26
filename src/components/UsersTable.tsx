import React, { FC, useState, useEffect } from 'react';

//mui material
import Grid from '@mui/material/Grid';

import { useNavigate } from 'react-router-dom';

// prime react
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { UserService } from '../service/UserService';


interface User {
    name: string,
    username: string,
    email: string,
    dob: Date,
    no_of_companies: number,
    status: string,
    created_at: Date,
}

const UsersTable: FC<any> = () => {
    const navigate = useNavigate();
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const [users, setUsers] = useState<User[]>([]);


    const handleMenuItemClick = (path: string) => {
        navigate(path);
    };

    const onPageChange = (event: { first: number, rows: number }) => {
        setFirst(event.first);
        setRows(event.rows);
    };



    const items = [
        {
            label: 'Charts',
            icon: 'pi pi-chart-bar',
            command: () => handleMenuItemClick('/'),
        },
        {
            label: 'Data Table',
            icon: 'pi pi-table',
            command: () => handleMenuItemClick('./userstable'),
        },

    ];

    useEffect(() => {
        UserService.getUsersMini().then(data => {
            setUsers(data);
            setTotalRecords(data.length);
        });

    }, []);

    const getHeader = () => {
        return (
            <div className="flex justify-content-end">
                <div className="p-input-icon-left">
                    <i className="pi pi-search"></i>
                    <InputText type="search" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                </div>
            </div>
        );
    };

    const columns = [
        { field: "name", header: 'Name' },
        { field: "username", header: 'Username' },
        { field: "email", header: 'Email' },
        { field: "dob", header: "Date_of_Birth" },
        { field: "no_of_companies", header: "No of Companies" },
        { field: "status", header: "Status" },
        { field: "created_at", header: "CreatedAt" },
        { field: "updated_at", header: "UpdatedAt" }
    ];

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} columnKey={col.field} field={col.field} header={col.header} />;
    });

    let header = getHeader();

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

    return (
        <div>
            <Menubar model={items} start={start} />
            <div style={{ float: 'left', margin: '20px 20px 10px 60px' }}>

            </div>
            <Grid container spacing={2} justifyContent="center"
                alignItems="center" style={{ marginTop: '10px' }}>
                <Grid xs={11} style={{ padding: '20px 20px 20px 20px' }}>

                    <DataTable value={users}
                        removableSort
                        globalFilter={globalFilter}
                        header={header}
                        paginator
                        rows={rows}
                        first={first}
                        totalRecords={totalRecords}
                        onPage={onPageChange}
                        emptyMessage="No records found"
                        reorderableColumns reorderableRows
                        onRowReorder={(e) => setUsers(e.value)}
                        scrollable
                        className="mt-4"
                        tableStyle={{ minWidth: '50rem' }}>
                        
                        <Column rowReorder style={{ width: '3rem' }} />
                        <Column field="name" header="Name" frozen sortable style={{ width: '25%' }}
                         ></Column>
                        <Column field="username" header="Username" sortable style={{ width: '25%' }}></Column>
                        <Column field="email" header="Email" sortable style={{ width: '25%' }}></Column>
                        <Column field="dob" header="Date_of_Birth" sortable style={{ width: '25%' }}></Column>
                        <Column field="no_of_companies" header="No of Companies" sortable style={{ width: '25%' }}></Column>
                        <Column field="status" header="Status" sortable style={{ width: '25%' }}></Column>
                        <Column field="created_at" header="CreatedAt" sortable style={{ width: '25%' }}></Column>
                        <Column field="updated_at" header="UpdatedAt" sortable style={{ width: '25%' }}></Column>

                    </DataTable>

                </Grid>
            </Grid>

        </div>
    );
};

export default UsersTable;