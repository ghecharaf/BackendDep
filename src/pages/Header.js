import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import TabList from "@mui/lab/TabList";
import { Card, CardActionArea, CardHeader, Divider, Hidden, ListItemIcon, Menu, MenuItem } from "@mui/material";
import axiosInstance from "../Axios/axios";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router";
import { useState } from "react";
import { Box } from "@mui/system";
const lightColor = "rgba(255, 255, 255, 0.7)";

function Header(props) {
	const { onDrawerToggle } = props;

	let history = useNavigate()

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const logout = () => {
		const response = axiosInstance.post('api/users/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		history('/login');
	};
	const [usrname, setUsrname] = useState('');
	React.useEffect(() => {
		let formData = new FormData();
		formData.append('refresh', localStorage.getItem('refresh_token'));
		axiosInstance
			.get('api/users/testlogin/', formData)
			.then((response) => {
				setUsrname(response.data.name);
			})
			.catch((erreur) => {
				history.push('/login');
			});
	}, [])


	return (
		<React.Fragment>
			<AppBar color="primary" position="sticky" elevation={0}>
				<Toolbar>
					<Grid container spacing={1} alignItems="center">
						<Grid sx={{ display: { sm: "none", xs: "block" } }} item>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={onDrawerToggle}
								edge="start"
							>
								<MenuIcon />
							</IconButton>
						</Grid>
						<Grid item>
						</Grid>
						<Grid item xs />
						<Grid item >
							<Box elevation={0} >
								<Hidden smDown>
									<CardActionArea>
										<CardHeader
											style={{ noShadow: 'true', height: '50px' }}
											avatar={
												<Avatar aria-label="recipe">
													{usrname[0]}
												</Avatar>
											}
											title={usrname}
											subheader={<div style={{ color: "white" }}>{new Date()
												.toString()
												.split(' ')
												.splice(1, 3)
												.join(' ')}</div>}
											onClick={handleClick}
										/>
									</CardActionArea>
								</Hidden>
								<Hidden smUp>
									<Avatar aria-label="recipe" onClick={handleClick}>
										{usrname[0]}
									</Avatar>

								</Hidden>
							</Box>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

				<MenuItem onClick={logout}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}

Header.propTypes = {
	onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
