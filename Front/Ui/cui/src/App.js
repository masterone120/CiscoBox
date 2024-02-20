import React, {useState} from 'react';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme, Button} from 'antd';
import {
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Dashboard from './pages/Dashboard'
import ListDevicePage from "./pages/ListDevicePage";
import AddDevice from "./pages/AddDevice";
import EditDevice from "./pages/EditDevice";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Dashboard', '1', <PieChartOutlined/>),
    getItem('Devices', 'cat2', <DesktopOutlined/>, [
        getItem(<a href="/listdevice">Routers</a>, '3', <DesktopOutlined/>),
        getItem('Phones', '4', <DesktopOutlined/>),
    ]),
    getItem('Gateway', '5', <MailOutlined/>),
];

const {Header, Content, Sider} = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const App = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>
            <Layout>
                <Sider
                    width={200}
                >
                    <Button
                        type="primary"
                        onClick={toggleCollapsed}
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['cat2']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={items}
                    />
                </Sider>
                <Layout
                        style={{
                            padding: '0 24px 24px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <div className='vh-100 gradiant-custom'>
                                <div className='container'>
                                    <BrowserRouter>
                                        <Routes>
                                            <Route path='/' element={<Dashboard />} />
                                            <Route path='/listdevice' element={<ListDevicePage/>}/>
                                            <Route path='/addnewdevice' element={<AddDevice/>}/>
                                            <Route path='/device/:id_device/edit' element={<EditDevice/>}/>
                                        </Routes>

                                    </BrowserRouter>
                                </div>

                            </div>
                        </Content>
                    </Layout>
            </Layout>
        </Layout>
);
};
export default App;