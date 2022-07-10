import React, { Component, useState } from 'react';
import { Table } from 'antd';

import './index.css';

import QueryForm from './QueryForm';

import { employeeColumns } from './columns';
import { EmployeeResponse } from '../../interface/employee';

interface State {
    employee: EmployeeResponse
}

class Employee extends Component<{}, State> {
    state: State = {
        employee: undefined
    }

    setEmplyee = (employee: EmployeeResponse) => {
        this.setState({
            employee
        });
    }

    getTotal() {
        let total: number
        if (typeof this.state.employee !== 'undefined') {
            total = this.state.employee.length
        } else {
            total = 0
        }
        return <p>一共 { total } 名员工</p>
    }

    render() {
        return (
            <>
                <QueryForm onDataChange={this.setEmplyee}></QueryForm>
                {/* { this.getTotal() } */}
                <Table columns={employeeColumns} dataSource={this.state.employee} className="table" />
            </>
        )
    }
}

export default Employee