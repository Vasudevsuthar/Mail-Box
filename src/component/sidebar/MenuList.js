import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { LuMailOpen } from "react-icons/lu";
import { Link } from 'react-router-dom';

const MenuList =() => {

  return (
    <Menu className='menu-bar'>
        <Menu.Item icon={<HomeOutlined />}  ><Link to={"/home"} /> Home</Menu.Item>
        <Menu.Item  icon={<LuMailOpen />}> <Link to={"/inbox"} /> Inbox</Menu.Item>
    </Menu>
  )
}

export default MenuList