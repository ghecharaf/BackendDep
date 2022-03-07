/** @format */

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
	Avatar,
	Button,
	Card,
	CardContent,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MdVerified, MdOutlineDoNotDisturbOn } from "react-icons/md";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

import { FaSolarPanel } from "react-icons/fa";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { AiOutlineDropbox } from "react-icons/ai";
import axiosInstance from "../Axios/axios";
import { useLocation } from "react-router-dom";
const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
	color: theme.palette.text.secondary,
	[`& .${treeItemClasses.content}`]: {
		color: theme.palette.text.secondary,
		borderTopRightRadius: theme.spacing(2),
		borderBottomRightRadius: theme.spacing(2),
		paddingRight: theme.spacing(1),
		fontWeight: theme.typography.fontWeightMedium,
		"&.Mui-expanded": {
			fontWeight: theme.typography.fontWeightRegular,
		},
		"&:hover": {
			backgroundColor: theme.palette.action.hover,
		},
		"&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
			backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
			color: "var(--tree-view-color)",
		},
		[`& .${treeItemClasses.label}`]: {
			fontWeight: "inherit",
			color: "inherit",
		},
	},
	[`& .${treeItemClasses.group}`]: {
		marginLeft: 0,
		[`& .${treeItemClasses.content}`]: {
			paddingLeft: theme.spacing(2),
		},
	},
}));

function StyledTreeItem(props) {
	const {
		bgColor,
		color,
		labelIcon: LabelIcon,
		labelInfo,
		labelText,
		...other
	} = props;

	return (
		<StyledTreeItemRoot
			label={
				<Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
					<Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
					<Typography
						variant="body1"
						sx={{ fontWeight: "inherit", flexGrow: 1 }}
					>
						{labelText}
					</Typography>
					<Typography variant="caption" color="inherit">
						{labelInfo}
					</Typography>
				</Box>
			}
			style={{
				"--tree-view-color": color,
				"--tree-view-bg-color": bgColor,
			}}
			{...other}
		/>
	);
}

export default function Contract() {
	const [contracts, setContracts] = React.useState([]);
	const location = useLocation();
	const [open, setOpen] = React.useState(false);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [cell, setCell] = React.useState({
		id: "",
		abonnement: "",
		produits: [],
		annonceurs: [],
		marques: [],
		date_debut: "",
		date_fin: "",
		detail: [
			{
				idAnnonceur: "",
				marques: [
					{
						marque: {
							id: "",
							NomAnnonceur: "",
							Nom: "",
							Logo: "",
							nbProduit: "",
						},
						produits: [
							{
								id: "",
								NomMarque: "",
								Nom: "",
								Logo: "",
							},
						],
					},
				],
			},
		],
	});

	const columns = [

		{ field: "date_debut", headerName: "Date de debut", width: 180 },
		{ field: "date_fin", headerName: "Date de fin", width: 180 },
		{
			field: "annonceurs",
			headerName: "Nombre d'annonceurs",
			width: 200,
			renderCell: (cell) => {
				return cell.value.length;
			},
		},
		{
			field: "marques",
			headerName: "Nombre de marques",
			width: 200,
			renderCell: (cell) => {
				return cell.value.length == 0 ? '-' : cell.value.length;
			},
		},
		{
			field: "produits",
			headerName: "Nombre de produits",
			width: 200,
			renderCell: (cell) => {
				return cell.value.length == 0 ? '-' : cell.value.length;
			},
		},
	];
	React.useEffect(() => {
		axiosInstance("api/clientcontart/", {
			params: { abonnoment: location.state.id },
		}).then((response) => {
			setContracts(response.data);
		});
	}, []);
	return (
		<Container
			style={{
				marginTop: "3vh",
				paddingBottom: "3vh",
			}}
		>
			<Card
				style={{
					marginTop: "3vh",
					paddingBottom: "5vh",
				}}
			>
				<Container style={{ height: 420, paddingTop: "4vh" }}>
					<DataGrid
						rows={contracts}
						columns={columns}
						pageSize={contracts.length}
						onCellClick={(cell, event) => {
							handleClick(event);
							setCell(cell.row);
						}}
						rowsPerPageOptions={[5]}
					/>
				</Container>
			</Card>
			<Dialog
				maxWidth="sm"
				fullWidth={true}
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Contract</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<TreeView
							aria-label="file system navigator"
							defaultCollapseIcon={<ExpandMoreIcon />}
							defaultExpandIcon={<ChevronRightIcon />}
							sx={{
								height: 240,
								flexGrow: 1,
								maxWidth: 400,
								overflowY: "auto",
							}}
						>
							{cell.detail.map((annonceur) => (
								<StyledTreeItem
									nodeId={annonceur.idAnnonceur}
									labelText={annonceur.idAnnonceur}
									labelIcon={FaSolarPanel}
									color="#3c8039"
									bgColor="#e6f4ea"
								>
									{annonceur.marques.map((marque) => (
										<StyledTreeItem
											nodeId={marque.marque.Nom}
											labelText={marque.marque.Nom}
											labelIcon={LocalOfferIcon}
											color="#3c8039"
											bgColor="#e6f4ea"
										>
											{marque.produits.map((produit) => (
												<StyledTreeItem
													nodeId={produit.Nom}
													labelText={produit.Nom}
													labelIcon={AiOutlineDropbox}
													color="#3c8039"
													bgColor="#e6f4ea"
												/>
											))}
										</StyledTreeItem>
									))}
								</StyledTreeItem>
							))}
						</TreeView>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={handleClose}
					>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}
