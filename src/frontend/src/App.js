import {getAllStudents, deleteStudent} from "./client";
import React, {useEffect, useState} from "react";

import {
    DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, LoadingOutlined, PlusOutlined
} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme, Table, Spin, Empty, Button, Tag, Avatar, Popconfirm} from 'antd';
import MenuItem from "antd/es/menu/MenuItem";
import StudentDrawerForm from "./StudentDrawerForm";
import {errorMsg, successMsg, warningMsg} from "./Messages";


const spinning = <LoadingOutlined style={{fontSize: 24}} spin/>;

const {Header, Content, Footer, Sider} = Layout;

const TheAvatar = ({firstName, lastName}) => {
    let firstTrim = firstName.trim();
    let lastTrim = lastName.trim();

    if (firstTrim.length === 0 && lastTrim.length === 0) return <Avatar icon={<UserOutlined/>}></Avatar>;
    return <Avatar>{`${firstTrim.charAt(0)}${lastTrim.charAt(0)}`}</Avatar>;
}

const removeStudent = (studentId, callback) => {
    if (studentId == null) warningMsg("StudentId is empty!");
    deleteStudent(studentId).then(() => {
            successMsg(`student with id ${studentId}`);
            callback();
        })
        .catch(err => {
            console.log(err.response);
            err.response.json().then(res => {
                console.log(res);
                errorMsg(`Can't delete this student: ${res.message} - [status coed: ${res.status} ]`);
            });
        })
}

const columns = fetchstudents => [{
    title: '', dataIndex: 'avatar', key: 'avatar', width: 60,
    render: (text, student) => <TheAvatar firstName={student.firstName} lastName={student.lastName}/>
}, {
    title: 'Id', dataIndex: 'id', key: 'id', width: 150,
}, {
    title: 'firstName', dataIndex: 'firstName', key: 'firstName',
}, {
    title: 'lastName', dataIndex: 'lastName', key: 'lastName',
}, {
    title: 'Email', dataIndex: 'email', key: 'email',
}, {
    title: 'Gender', dataIndex: 'gender', key: 'gender', width: 150,
}, {
    title: 'Action', dataIndex: 'action', key: 'action', width: 200,
    render: (text, student) => <>
        <Popconfirm placement='top'
                    title={`Do you want to delete this student with email ${student.email}?`}
                    onConfirm={() => removeStudent(student.id, fetchstudents)}
                    okText={'Yes'}
                    cancelText={"No"}
        ><Button size={"small"} style={{marginRight: "5px"}}>Delete</Button>
        </Popconfirm>
        <Button size={"small"}>Edit</Button>
    </>
}];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[],): MenuItem {
    return {
        key, icon, children, label,
    };
}

const items: MenuItem[] = [getItem('Option 1', '1', <PieChartOutlined/>), getItem('Option 2', '2',
    <DesktopOutlined/>), getItem('User', 'sub1',
    <UserOutlined/>, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5'),]), getItem('Team', 'sub2',
    <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]), getItem('Files', '9', <FileOutlined/>),];

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const fetchStudents = () => getAllStudents()
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setStudents(data);
            setFetching(false);
        }).catch(err => {
            console.log(err.response);
            err.response.json().then(res => {
                console.log(res);
                errorMsg(`Can not load students: ${res.message} - [status coed: ${res.status} ]`);
            });
        }).finally(() => setFetching(false));

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents().then();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={spinning}/>;
        }
        if (students.length <= 0) {
            return <>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Tag style={{marginBottom: "10px"}}>
                    Number of student: {students.length}
                </Tag>
                <br/>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="medium">
                    Add New Student
                </Button>
                <Empty/>
            </>;
        } else {
            return <>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Table dataSource={students}
                       columns={columns(fetchStudents)}
                       bordered
                       title={() =>
                           <>
                               <Tag style={{marginBottom: "10px"}}>
                                   Number of student: {students.length}
                               </Tag>
                               <br/>
                               <Button
                                   onClick={() => setShowDrawer(!showDrawer)}
                                   type="primary" shape="round" icon={<PlusOutlined/>} size="medium">
                                   Add New Student
                               </Button>
                           </>
                       }
                       pagination={{pageSize: 50}}
                       scroll={{y: 500}}
                       rowKey={(student) => student.id}
                />
            </>
        }
    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)'}}/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
        </Sider>
        <Layout className="site-layout">
            <Header style={{padding: 0, background: colorBgContainer}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}} items={[{title: "STUDENTS"}]}/>
                <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>By Plus Li</Footer>
        </Layout>
    </Layout>
}

export default App;
