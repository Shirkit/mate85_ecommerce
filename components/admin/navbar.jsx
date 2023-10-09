"use client"
import { theme } from '@/utils/tailwind';
import { FilesIcon, PackageIcon, SettingsIcon, UsersIcon, ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';




export default function AdminNavbar() {
    const [collapsed, setCollapsed] = React.useState(false);


    React.useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            setCollapsed(window.innerWidth < 1000)
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return (
        <Sidebar rootStyles={{ borderRightColor: theme.colors.zinc[600] }} backgroundColor="unset" className="bg-[url('/static/images/dash_bg.jpg')] bg-slate-100 text-white" collapsed={collapsed}>
            <Menu menuItemStyles={{
                button: {
                    paddingLeft: theme.padding[1],

                    '&:only-child': {
                        paddingLeft: theme.padding[4]
                    },

                    '&:hover': {
                        backgroundColor: theme.colors.zinc[700],
                    },
                },
                subMenuContent: {
                    width: 'auto',
                    minWidth: '200px'
                }
            }} >
                <SubMenu icon={<UsersIcon></UsersIcon>} label="Usuários">
                    <MenuItem component={<Link href="/admin/users/add"></Link>} className="bg-zinc-800"> Adicionar novo usuário </MenuItem>
                    <MenuItem component={<Link href="/admin/users/manage"></Link>} className="bg-zinc-800"> Gerenciar usuários </MenuItem>
                </SubMenu>
                <SubMenu icon={<PackageIcon></PackageIcon>} label="Produtos">
                    <MenuItem component={<Link href="/admin/products/add"></Link>} className="bg-zinc-800"> Adicionar novo produto </MenuItem>
                    <MenuItem component={<Link href="/admin/products"></Link>} className="bg-zinc-800"> Gerenciar produtos </MenuItem>
                    <MenuItem component={<Link href="/admin/products/categories/add"></Link>} className="bg-zinc-800"> Adicionar categoria </MenuItem>
                    <MenuItem component={<Link href="/admin/products/categories"></Link>} className="bg-zinc-800"> Gerenciar categorias </MenuItem>
                </SubMenu>
                <SubMenu icon={<FilesIcon></FilesIcon>} label="Relatórios">
                    <MenuItem component={<Link href="/admin/reports"></Link>} className="bg-zinc-800"> Pie charts </MenuItem>
                    <MenuItem component={<Link href="/admin/reports"></Link>} className="bg-zinc-800"> Line charts </MenuItem>
                </SubMenu>
                <SubMenu icon={<SettingsIcon></SettingsIcon>} label="Configurações">
                    <MenuItem component={<Link href="/admin/settings"></Link>} className="bg-zinc-800"> Geral do site </MenuItem>
                </SubMenu>
                <SubMenu icon={<ShoppingBagIcon />} label="Pedidos">
                    <MenuItem component={<Link href="/admin/order"></Link>} className="bg-zinc-800"> Gerenciar pedidos </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    )
}