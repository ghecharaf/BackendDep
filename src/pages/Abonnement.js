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

import ReactExport from 'react-data-export';


import AddIcon from "@mui/icons-material/Add";

import { MdVerified, MdOutlineDoNotDisturbOn } from "react-icons/md";
import { useNavigate } from "react-router";
import axiosInstance from "../Axios/axios";
import ExcelFile from "react-data-export/dist/ExcelPlugin/components/ExcelFile";
import ExcelSheet from "react-data-export/dist/ExcelPlugin/elements/ExcelSheet";

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

	const pigesFinale = () => {
		axiosInstance.get("api/pigesfinale/").then((response) => {
			console.log(response.data);
			setProgramme(response.data)
		});
	};





	const [ExcelData, setExcelData] = React.useState([])
	const [programme, setProgramme] = React.useState([])


	const ExcelFile = ReactExport.ExcelFile;
	const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

	const ExoprtToExcel = () => {


		let row = []
		var c = [
			{ value: '', style: { border: { left: { style: "thick", color: { rgb: "000000" } }, top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: 'PromediaConseils', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "35", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { right: { style: "thick", color: { rgb: "000000" } }, top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
		]

		row.push(c)


		c = [
			{ value: '', style: { border: { left: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
			{ value: '', style: { border: { right: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
		]

		row.push(c)

		c = [
			{ value: 'Media', style: { border: { left: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Date', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Support', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Debut', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Durée (sec)', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Couleur', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },

			{ value: 'Code', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Message', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },

			{ value: 'Annonceur', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Marque', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },

			{ value: 'Produit', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Segment', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },

			{ value: 'Marché', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Famille', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },

			{ value: 'Secteur', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Avant', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },

			{ value: 'Aprés', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Ecran', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },

			{ value: 'Afficheur', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Panneau', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },

			{ value: 'Adresse', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'Wilaya', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
			{ value: 'APC', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },

			{ value: 'Tarif brute (DA)', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },


			{ value: 'Tarif 30sec (DA)', style: { border: { right: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
		]

		row.push(c)


		for (let i in programme) {
			var color = "90EE90"

			const v = [
				{ value: programme[i].media, style: { border: { left: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].date, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].support, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].debut, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].duree, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].couleur, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].code, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].message, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].annonceur, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].marque, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].produit, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].segment, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].marche, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].famille, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].secteur, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].avant, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].apres, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].ecran, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].afficheur, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].panneau, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].adresse, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].wilaya, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].apc, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].tarifbrut, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
				{ value: programme[i].tarifsec, style: { border: { right: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
			]
			row.push(v)
		}

		c = [
			{ value: '', style: { border: { left: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "35", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "35", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
			{ value: '', style: { border: { right: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
		]

		row.push(c)



		const multiDataSet = [
			{
				columns: [
					{
						title: '', width: { wpx: 200 }
					},
					{ title: "", width: { wpx: 350 } },
					{ title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } }, { title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } }, { title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } }, { title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } }, { title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } }, { title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } }, { title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } }, { title: "", width: { wpx: 200 } },
					{ title: "", width: { wpx: 200 } }, { title: "", width: { wpx: 200 } },

				],
				data: row
			}
		];


		setExcelData(multiDataSet)
	}

	React.useEffect(() => {
		getAbonnement();
		pigesFinale();

		ExoprtToExcel();
	}, []);

	React.useEffect(() => {
		pigesFinale();

		ExoprtToExcel();
	}, [programme]);

	return (
		<Container
			style={{
				marginTop: "3vh",
				paddingBottom: "3vh",
			}}
		>
			<div>
				<ExcelFile element={<Button variant="contained">Télécharger pige finale</Button>}>
					<ExcelSheet dataSet={ExcelData} name="Organization" />
				</ExcelFile>
			</div>
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
