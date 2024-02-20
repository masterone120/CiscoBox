import React, {} from 'react';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import {Breadcrumb, Layout, Menu, theme} from "antd";
// import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import ListDevicePage from "./pages/ListDevicePage";
import AddDevice from "./pages/AddDevice";
import EditDevice from "./pages/EditDevice";

const {Header, Content, Footer, Sider} = Layout;

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
            const subkey = index * 4 + j + 1;
            return {
                key: subkey,
                label: `option${subkey}`,
            };
        }),
    };
});

const App = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    allignItems: 'center',
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
                        minwidth: 0,
                    }}
                />
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0'
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                            }}
                            items={items2}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        <div className='vh-100 gradiant-custom'>
                            <div className='container'>
                                <h1 className='page-header text-center'>List Devices</h1>

                                <BrowserRouter>
                                    <Routes>
                                        <Route path='/' element={<ListDevicePage/>}/>
                                        <Route path='/addnewdevice' element={<AddDevice/>}/>
                                        <Route path='/device/:id_device/edit' element={<EditDevice/>}/>
                                    </Routes>

                                </BrowserRouter>
                            </div>

                        </div>
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >

            </Footer>
        </Layout>
    );

};

export default App;