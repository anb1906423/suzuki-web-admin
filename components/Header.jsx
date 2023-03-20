import React, { useEffect } from 'react'
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { childrenList, sideBarList, urlchildrenList } from '../datas/data'
import { UserOutlined, CarOutlined, DollarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { adminLogOut } from '@/store/actions';
import { swalert } from '@/mixins/swal.mixin';

const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items2 = [CarOutlined, DollarOutlined, UserOutlined, InfoCircleOutlined].map((icon, index) => {
    const key = String(index);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `QL ${sideBarList[key]}`,
        children: childrenList[key] && childrenList[key].map((childLabel, childIndex) => ({
            key: `${key}-${childIndex}`,
            label: childLabel,
            onClick: () => Router.push(urlchildrenList[key][childIndex]),
        })),
    };
});

const HeaderComponent = ({ children }) => {
    const params = useRouter()
    const isLoggedIn = useSelector((state) => state.admin.isLoggedIn)
    const adminInfor = useSelector((state) => state.admin.adminInfo)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            Router.push('/login')
        }
    }, [])

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            {
                params.pathname === '/login' ? children : isLoggedIn && (

                    <Layout>
                        <Header className="header d-flex justify-content-between">
                            <Head>
                                <meta name="description" content="Generated by create next app" />
                                <link rel="icon" href="https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-6/305980746_404761665121632_2036044433566838028_n.png?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=XCrwrINP6IQAX_ZRw01&_nc_ht=scontent.fvca1-4.fna&oh=00_AfDnGTqf6rB9EzEoHszcbh3adI0b92uRd9bXHLUYCmktQw&oe=63FE8880" />
                            </Head>
                            <div className="logo d-flex align-items-center" >
                                <Image
                                    preview={false}
                                    src="https://suzuki-cantho.vn/public/upload/logo/logo-suzuki-can-tho-official.png"
                                />
                            </div>
                            <div className='header-right-section d-flex align-items-center'>
                                <div className="email-admin btn-outline-dark btn">
                                    {adminInfor.email}
                                </div>
                                <button className='btn-log-out btn-dark btn' onClick={() => {
                                    swalert
                                        .fire({
                                            title: "Đăng xuất",
                                            icon: "warning",
                                            text: "Bạn muốn đăng xuất?",
                                            showCloseButton: true,
                                            showCancelButton: true,
                                        })
                                        .then(async (result) => {
                                            if (result.isConfirmed) {
                                                dispatch(adminLogOut())
                                                window.location.assign('/')
                                            }
                                        })
                                }}>
                                    Đăng xuất
                                </button>
                            </div>
                            {/* <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
                        </Header>
                        <Layout
                            hasSider='true'
                        >
                            <Sider
                                width={220}
                                style={{
                                    background: colorBgContainer,
                                }}
                            >
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['sub0', '0-0']}
                                    defaultOpenKeys={['sub0']}
                                    style={{
                                        height: '100%',
                                        borderRight: 0,
                                    }}
                                    items={items2}
                                />
                            </Sider>
                            <Layout
                                style={{
                                    padding: '0 24px 24px',
                                }}
                            >
                                <Content
                                    style={{
                                        padding: 24,
                                        margin: 0,
                                        minHeight: 280,
                                        background: colorBgContainer,
                                    }}
                                >
                                    {/* layout */}
                                    <div className="cont">
                                        {children}
                                    </div>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                )
            }
        </>
    );
};

export default HeaderComponent