import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Grid, Container, CardActionArea } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { format } from "date-fns";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, Pagination } from "@mui/material";
import { useHistory, useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import { BsNewspaper } from "react-icons/bs";
import ArticleIcon from "@mui/icons-material/Article";
import axiosInstance from "../Axios/axios";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({
	Container: {
		paddingBottom: "3vh",
		marginTop: "3vh",
	},
}));

export default function Edition() {
	const location = useLocation();
	var journal;

	const [pageCount, setpageCount] = useState(0);
	const getEdition = (range, page) => {
		if (typeof (location.state) !== 'undefined') {
			journal = location.state.detail;
		}
		let start;
		let end;
		if (range == null) {
			start = "1050-01-01";
			end = "2080-01-01";
		} else {
			if (range[0] != null) {
				start = format(range[0], "yyyy-MM-dd");
			} else {
				start = "1050-01-01";
			}

			if (range[1] != null) {
				end = format(range[1], "yyyy-MM-dd");
			} else {
				end = "2080-01-01";
			}
		}

		axiosInstance.get("api/editions/client/", {
			params: { start: start, end: end, journal: journal.id, page: page },
		}).then(function (response) {

			setpageCount(response.data.total_pages);
			setItems(response.data.results);

		}).catch(function (error) { });
	};

	useEffect(() => {

		getEdition();


	}, []);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 500,
		bgcolor: "background.paper",
		borderRadius: 2,
		boxShadow: 24,
		p: 4,
	};
	const Input = styled("input")({
		display: "none",
	});
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [openE, setOpenE] = React.useState(false);
	const handleOpenE = () => setOpenE(true);
	const handleCloseE = () => setOpenE(false);

	const [Items, setItems] = useState([]);
	const [edition, setEdition] = useState({
		date: null,
		numero: "",
		Image: null,
		id: 0,
	});
	const [range, setRange] = React.useState([null, null]);
	const styles = useStyles();

	let history = useNavigate();

	const GotoArticle = (edition) => {
		history('/article', { state: { detail: edition, nom: location.state.detail.nomJournal } })

	};



	const [openDialog, setOpenDialog] = React.useState(false);
	const handleClickOpenDialog = () => { setOpenDialog(true); };
	const handleCloseDialog = () => { setOpenDialog(false); };

	const [editConf, setEditConf] = React.useState({});
	const [openEditConf, setOpenEditConf] = React.useState(false);
	const handleOpenEditConf = () => { setOpenEditConf(true); };
	const handleCloseEditConf = () => { setOpenEditConf(false); };


	return (
		<Container className={styles.Container}>
			<Stack spacing={2} justifyContent="center" alignItems="center">
				<Card>
					<CardContent>
						<Grid container justifyContent="space-between">
							<Grid item>
								<Grid container>
									<Grid item>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<MobileDateRangePicker
												inputFormat="dd/MM/yyyy"
												startText="date debut"
												endText="date fin"
												value={range}
												onChange={(newRange) => {
													setRange(newRange);
												}}
												renderInput={(startProps, endProps) => (
													<React.Fragment>
														<TextField size="small" {...startProps} />
														<Box sx={{ mx: 2 }}> to </Box>
														<TextField size="small" {...endProps} />
													</React.Fragment>
												)}
											/>
										</LocalizationProvider>
									</Grid>
									<Grid item>
										<IconButton
											color="primary"
											aria-label="add"
											onClick={() => {
												getEdition(range);
											}}
										>
											<SearchIcon size="small" />
										</IconButton>
									</Grid>
									<Grid item>
										<IconButton
											color="primary"
											aria-label="add"
											onClick={() => {
												setRange([null, null]);
												getEdition();

											}}
										>
											<ClearIcon />
										</IconButton>
									</Grid>
								</Grid>
							</Grid>

						</Grid>
					</CardContent>
				</Card>
				<Grid container>
					<Grid container spacing={3} direction="row" style={{ marginTop: 2 }}>
						{Items.map((item, index) => (
							<Grid key={index} item xs={12} sm={4} >
								<Card>
									<CardActionArea
										onClick={() => {
											GotoArticle(item);
										}}
									>
										<CardMedia
											component="img"
											height={500}
											image={item.image}
										/>
									</CardActionArea>
									<CardContent>
										<Typography gutterBottom variant="h7" component="div">
											Date de creation : {item.date}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Numero d'edition : {item.numero}
										</Typography>
									</CardContent>
									<CardActions>
										<Grid
											container
											direction="row"
											justifyContent="space-between"
											alignItems="center"
											spacing={2}
										>
											<Grid item></Grid>

										</Grid>
									</CardActions>
								</Card>
							</Grid>
						))}

					</Grid>
				</Grid>
				{
					Items.length < 1 ?
						<Typography gutterBottom variant="h8" color="text.secondary">
							<strong>Aucune édition trouvée !</strong>
						</Typography> :
						<Pagination
							color="primary"
							count={pageCount}
							onChange={(event, value) => {
								getEdition(range, value);
							}}
						/>
				}

			</Stack>

		</Container>
	);
}
