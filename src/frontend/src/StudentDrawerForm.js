import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {addNewStudent} from "./client";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from 'react';
import {success, error} from './Messages';

const {Option} = Select;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = student => {
        setSubmitting(true)
        console.log(JSON.stringify(student, null, 2));
        addNewStudent(student)
            .then(() => {
                setSubmitting(false);
                console.log("student added");
                onCLose();
                fetchStudents();
                success(`student with email ${student.email} added`);
            }).catch(err => {
            console.log(err);
            error(err);
        }).finally(() => {
            setSubmitting(false);
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new student"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
        <div style={{textAlign: 'right'}}>
            <Button onClick={onCLose} style={{marginRight: 8}}>
                Cancel
            </Button>
        </div>}
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{required: true, message: 'Please enter student\'s first name'}]}
                    >
                        <Input placeholder="Please enter first name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{required: true, message: 'Please enter student\'s last name'}]}
                    >
                        <Input placeholder="Please enter last name"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter student email"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon}/>}
            </Row>
        </Form>
    </Drawer>
}

export default StudentDrawerForm;