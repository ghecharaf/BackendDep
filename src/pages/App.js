import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "./Navigator";
import Content from "./Content";
import Header from "./Header";
import TabContext from '@mui/lab/TabContext';
import axiosInstance from "../Axios/axios";
import { useNavigate } from 'react-router';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
import Abonnement from "./Abonnement";
import { Stack } from "@mui/material";
function Copyright() {
	return (
		<Stack sx={{marginBottom:'2vh',paddingTop:'2vh'}} 
		direction="column"
		justifyContent="center"
		alignItems="center"
		spacing={1}
		>
			<Typography variant="body1" color="text.secondary" align="center">
				{"Copyright © "}
				<Link color="inherit" href="https://mui.com/">
					PromediaConseils
				</Link>{" "}
				{new Date().getFullYear()}.
				{"All Rights Reserved"}
			</Typography>
			<Typography variant="body2">
				{"Designed By "}
				<Link color="inherit" href="https://artivisio.com">
					Artivisio
				</Link>
			</Typography>
		</Stack>
	);
}

let theme = createTheme({
	palette: {
		primary: {
			light: "#63ccff",
			main: "#009be5",
			dark: "#006db3",
		},
	},
	typography: {
		h5: {
			fontWeight: 500,
			fontSize: 26,
			letterSpacing: 0.5,
		},
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiTab: {
			defaultProps: {
				disableRipple: true,
			},
		},
	},
	mixins: {
		toolbar: {
			minHeight: 48,
		},
	},
});

theme = {
	...theme,
	components: {
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: "#081627",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
				contained: {
					boxShadow: "none",
					"&:active": {
						boxShadow: "none",
					},
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					marginLeft: theme.spacing(1),
				},
				indicator: {
					height: 3,
					borderTopLeftRadius: 3,
					borderTopRightRadius: 3,
					backgroundColor: theme.palette.common.white,
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: "none",
					margin: "0 16px",
					minWidth: 0,
					padding: 0,
					[theme.breakpoints.up("md")]: {
						padding: 0,
						minWidth: 0,
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					padding: theme.spacing(1),
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					borderRadius: 4,
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					backgroundColor: "rgb(255,255,255,0.15)",
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						color: "#4fc3f7",
					},
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				primary: {
					fontSize: 14,
					fontWeight: theme.typography.fontWeightMedium,
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					color: "inherit",
					minWidth: "auto",
					marginRight: theme.spacing(2),
					"& svg": {
						fontSize: 20,
					},
				},
			},
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					width: 32,
					height: 32,
				},
			},
		},
	},
};

const drawerWidth = 256;

export default function App(props) {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

	let history = useNavigate();
	const [state, setstate] = React.useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const test = () => {
		let formData = new FormData();
		formData.append('refresh', localStorage.getItem('refresh_token'));
		axiosInstance
			.get('api/users/testlogin/', formData)
			.then((response) => {
				setstate(true);
			})
			.catch((erreur) => {
				history('/login');
				setstate(false);
			});
	}
	return (
		<div>
			{test(), state === true ?
				<ThemeProvider theme={theme}>

					<Box sx={{ display: "flex", minHeight: "100vh" }}>
						<CssBaseline />
						<Box
							component="nav"
							sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
						>
							{isSmUp ? null : (
								<Navigator
									PaperProps={{ style: { width: drawerWidth } }}
									variant="temporary"
									open={mobileOpen}
									onClose={handleDrawerToggle}
								/>
							)}

							<Navigator
								PaperProps={{ style: { width: drawerWidth } }}
								sx={{ display: { sm: "block", xs: "none" } }}
							/>
						</Box>
						<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>

							<Header onDrawerToggle={handleDrawerToggle} />
							<Box
								component="main"
								sx={{ bgcolor: "#eaeff1", height: '100%' }}
							>
								{props.children}
							</Box>
							<Box component="footer" sx={{ bgcolor: "#DCDCDC" }}>
								<Copyright />

							</Box>
						</Box>
					</Box>
				</ThemeProvider>
				: <p></p>
			}
		</div >
	);
}
