/** @format */

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
	Button,
	Card,
	CardContent,
	Container,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { MdVerified, MdOutlineDoNotDisturbOn } from "react-icons/md";
import { useNavigate } from "react-router";
import axiosInstance from "../Axios/axios";

export default function Abonnement() {
	const [clients, setClients] = React.useState([]);
	const navigate = useNavigate();
	const [cell, setCell] = React.useState({});

	const columns = [
		{
			field: "Nom",
			headerName: "Nom",
			width: 200,
			align: "center",
		},
		{
			field: "service", headerName: "Service", width: 200,
			renderCell: (cell) => {
				return (
					<div>

						{
							cell.row.service == 'P' ? 'Panneau' : cell.row.service == 'J' ? 'Journal' : 'Chaine'
						}
					</div>
				);
			}
		},
		{ field: "date_debut", headerName: "Date de debut", width: 200 },
		{
			field: "date_fin",
			headerName: "Date de fin",
			width: 200,
		},

	];

	const getAbonnement = () => {
		axiosInstance.get("api/clientabonnement/").then((response) => {
			setClients(response.data);
		});
	};

	React.useEffect(() => {
		getAbonnement();
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
						rows={clients}
						columns={columns}
						pageSize={clients.length}
						onCellClick={(cell, event) => {
							navigate("/contract", {
								state: {
									id: cell.row.id,
								},
							});
						}}
						rowsPerPageOptions={[5]}
					/>
				</Container>
			</Card>
		</Container>
	);
}
