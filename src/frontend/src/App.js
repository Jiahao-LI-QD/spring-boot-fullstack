import {getAllStudents} from "./client";
import React, {useEffect, useState} from "react";

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme, Table, Spin, Empty, Button} from 'antd';
import MenuItem from "antd/es/menu/MenuItem";

const spinning = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Header, Content, Footer, Sider } = Layout;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'firstName',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'lastName',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    }
];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
                setFetching(false);
            });

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents().then();
    }, []);

    const  renderStudents = () => {
        if (fetching){
            return <Spin indicator={spinning} />;
        }
        if (students.length <= 0){
            return <Empty />;
        }
        else {
            return <Table dataSource={students}
                          columns={columns}
                          bordered
                          title={() => <Button type="primary" shape="round" icon={<PlusOutlined />} size="medium">
                              Add New Student
                              </Button>}
                          pagination={{ pageSize: 50 }}
                          scroll={{ y: 500 }}
                          rowKey={(student) => student.id}
                          />;
        }
    }

    if (students.length <= 0){
        return "no data";
    }

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} items={[{title:"STUDENTS"}]}/>
                <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>By Plus Li</Footer>
        </Layout>
    </Layout>
}

export default App;
