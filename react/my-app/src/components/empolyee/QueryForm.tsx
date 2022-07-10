import React, { Component, useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { get } from '../../utils/request';
import { GET_EMPLOYEE_URL } from '../../constants/urls';
import { EmployeeRequest, EmployeeResponse } from '../../interface/employee';


const { Option } = Select

interface Props {
    onDataChange(data: EmployeeResponse): void
}

// 参考：https://ant.design/components/form-cn/
class QueryForm extends Component<Props> {

    // formRef = React.createRef<FormInstance>();

    state: EmployeeRequest = {
        name: '',
        departmentId: undefined
    }

    handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            name: e.currentTarget.value
        });
    }

    handleDepartmentChange = (value: number) => {
        this.setState({
            departmentId: value
        });
    }

    handleSubmit = () => {
        this.queryEmployee(this.state);
    }

    componentDidMount() {
        this.queryEmployee(this.state);
    }

    queryEmployee(param: EmployeeRequest) {
        // get(GET_EMPLOYEE_URL, param).then(res => {
        //     this.props.onDataChange(res.data);
        // });
        let res: EmployeeResponse
        res = [{id: 1,
            key: 1,
            name: 'zzh',
            department: 'wx',
            hiredate: '2022-1-10',
            level: 'newer'}]
        this.props.onDataChange(res);
    }

    render() {
        return (
            <Form layout="inline">
                <Form.Item>
                    <Input
                        placeholder="姓名"
                        style={{ width: 120 }}
                        allowClear
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />
                </Form.Item>
                <Form.Item>
                <Select
                    placeholder="部门"
                    style={{ width: 120 }}
                    allowClear
                    value={this.state.departmentId}
                    onChange={this.handleDepartmentChange}
                >
                    <Option value={1}>技术部</Option>
                    <Option value={2}>产品部</Option>
                    <Option value={3}>市场部</Option>
                    <Option value={4}>运营部</Option>
                </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>查询</Button>
                </Form.Item>
            </Form>
        )
    }
}


export default QueryForm;