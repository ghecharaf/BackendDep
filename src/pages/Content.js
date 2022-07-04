import * as React from "react";
import { Typography, Card, CardActionArea, CardContent, CardMedia, Grid, SvgIcon, IconButton, Stack, Collapse, TextField, MenuItem, Autocomplete, Button, Pagination, Hidden } from "@mui/material";
import { useState, useEffect } from "react";
import TabPanel from "@mui/lab/TabPanel";
import axiosInstance from "../Axios/axios";
import { CardActions, Container } from "@mui/material";
import ArticleAffichage from "./ArticleAffichage";
import { makeStyles } from "@material-ui/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LanguageIcon from "@mui/icons-material/Language";
import { FaSolarPanel } from "react-icons/fa";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { AiFillTag } from "react-icons/ai";

import { AiOutlineDropbox } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Box } from "@mui/system";
import TvIcon from '@mui/icons-material/Tv';



import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import RefreshIcon from '@mui/icons-material/Refresh';
import { format } from 'date-fns'

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import Journal from "./Journal";

const useStyles = makeStyles(theme => ({
	container: {
		paddingBottom: "3vh",
	},
	mainGrid: {
		marginTop: "3vh",
	},
	modal: {
		overflow: "scroll",
		marginTop: "1vh",
		borderRadius: "50px",
	},
	card: {
		height: "30vh",
	},
	accroche: {
		display: "-webkit-box",
		boxOrient: "vertical",
		lineClamp: 4,
		wordBreak: "break-all",
		overflow: "hidden",
		color: "grey",
	},
	font: {
		background:
			"linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 20%)",
		height: "50vh",
		position: "absolute",
		top: "0%",
		width: "100%",
		color: "white",
	},
}));

export default function Content() {
	const [pageCount, setpageCount] = useState(0);
	const [pageCountPan, setPageCountPan] = useState(0);
	const [pageCountVid, setPageCountVid] = useState(0);

	const [pageArt, setPageArt] = useState(1);
	const [pagePan, setPagePan] = useState(1);
	const [pageVid, setPageVid] = useState(1);

	let navigate = useNavigate()
	const [articles, setArticles] = useState([]);

	const [searchValueArt, setSearchValueArt] = useState({})
	const [searchValuePan, setSearchValuePan] = useState({})
	const [searchValueVid, setSearchValueVid] = useState({})


	const [pubs, setPubs] = useState([]);

	const getPubs = (values, page) => {
		setSearchValuePan(values)
		setPagePan(page)
		if (!page) {
			page = 1
			setPagePan(1)
		}

		let start;
		let end;


		if (values && values != '') {
			if (!values.range) {
				start = "1050-01-01";
				end = "2080-01-01";
			} else {
				if (values.range[0] != null) {
					start = format(values.range[0], "yyyy-MM-dd");
				} else {
					start = "1050-01-01";
				}

				if (values.range[1] != null) {
					end = format(values.range[1], "yyyy-MM-dd");
				} else {
					end = "2080-01-01";
				}
			}


			axiosInstance.get('api/pubclient/', {
				params: {
					accroche: values.accroche,
					langue: values.langue,
					annonceur: values.annonceur ? values.annonceur.id : null,
					marque: values.marque ? values.marque.id : null,
					produit: values.produit ? values.produit.id : null,
					start: start,
					end: end,
					page: page
				}
			})
				.then(function (response) {
					setPageCountPan(response.data.total_pages)
					setPubs(response.data.results)
				})
		}
		else {

			start = "1050-01-01";
			end = "2080-01-01";
			axiosInstance.get('api/pubclient/', {
				params: {
					accroche: '',
					langue: '',
					annonceur: null,
					marque: null,
					produit: null,
					start: start,
					end: end,
					page: page
				}
			})
				.then(function (response) {
					setPageCountPan(response.data.total_pages)
					setPubs(response.data.results)
				})
		}

	};

	const [journaux, setJournaux] = useState([])
	const getJournaux = () => {
		axiosInstance
			.get("api/journaux/test/",)
			.then((json) => {
				setJournaux(json.data);
			});
	}



	const [produits, setProduits] = useState([])
	const [marques, setMarques] = useState([])
	const [annonceurs, setAnnonceurs] = useState([])

	const getAnnonceurs = () => {
		axiosInstance.get('api/getannonceurs/')
			.then((response) => {
				setAnnonceurs(response.data)
			})
	}

	const getMarques = (value) => {
		if (value) {
			axiosInstance.get('api/marque/filter', {
				params: {
					NomAnnonceur: value.id
				}
			})
				.then((response) => {
					setMarques(response.data)
				})
		}
		else {
			setMarques([])
		}
	}

	const getProduits = (value) => {
		if (value) {
			axiosInstance.get('api/produit/filter', {
				params: {
					NomMarque: value.id,
				}
			})
				.then((response) => {
					setProduits(response.data)
				})
		}
		else {
			setProduits([])
		}
	}


	const [chaines, setChaines] = useState([])
	const getChaines = () => {
		axiosInstance
			.get("api/chaine/getall/",)
			.then((json) => {
				setChaines(json.data);
			});
	}

	const [ChaineVideo, setChaineVideo] = useState([]);
	const getVideos = (values, page) => {
		setSearchValueVid(values)
		setPageVid(page)
		if (!page) {
			page = 1
			setPageVid(1)
		}

		let start;
		let end;


		if (values && values != '') {
			if (!values.range) {
				start = "1050-01-01 00:00:00";
				end = "2080-01-01 00:00:00";
			} else {
				if (values.range[0] != null) {
					start = format(values.range[0], "yyyy-MM-dd");
					start = start + " 00:00:00"
				} else {
					start = "1050-01-01 00:00:00";
				}

				if (values.range[1] != null) {
					end = format(values.range[1], "yyyy-MM-dd");
					end = end + " 00:00:00"
				} else {
					end = "2080-01-01 00:00:00";
				}
			}


			axiosInstance.get('api/videoclient/', {
				params: {
					langue: values.langue,
					chaine: values.chaine.id,
					accroche: values.search,
					annonceur: values.annonceur ? values.annonceur.id : null,
					marque: values.marque ? values.marque.id : null,
					produit: values.produit ? values.produit.id : null,
					start: start,
					end: end,
					page: page
				}
			})
				.then(function (response) {
					setPageCountVid(response.data.total_pages)
					setChaineVideo(response.data.results)
				})
		}
		else {

			start = "1050-01-01 00:00:00";
			end = "2080-01-01 00:00:00";
			axiosInstance.get('api/videoclient/', {
				params: {
					langue: '',
					chaine: null,
					accroche: '',
					annonceur: null,
					marque: null,
					produit: null,
					start: start,
					end: end,
					page: page
				}
			})
				.then(function (response) {
					setPageCountVid(response.data.total_pages)
					setChaineVideo(response.data.results)
				})
		}

	};

	const [radios, setRadios] = useState([])
	const getRadios = () => {
		axiosInstance
			.get("api/radio/getall/",)
			.then((json) => {
				setRadios(json.data);
			});
	}




	useEffect(() => {
		getPubs();
		getVideos();
		getAnnonceurs();
		getMarques();
		getProduits();
		getJournaux();
		getChaines();
		getRadios();
	}, []);


	const [collapse, setCollapse] = useState(false)


	const styles = useStyles();

	return (

		<div>

			<TabPanel value={1}>
				<Container style={{ marginTop: "3vh", paddingBottom: "3vh" }}>

					<Journal></Journal>

				</Container >
			</TabPanel >
			<TabPanel value={2}>
				<Container style={{ marginTop: "3vh", paddingBottom: "3vh" }}>
					<Stack mt={2}>
						<Grid
							container
							direction="row"
							justifyContent="space-between"
							alignItems="center" spacing={2}
						>
							<Grid item xs={10}>
								<Button variant="contained" onClick={() => { setCollapse(!collapse) }} endIcon={<FilterListIcon />}>Rechercher publicité</Button>
							</Grid>
						</Grid>
					</Stack>
					<Stack spacing={2} justifyContent="center" alignItems="center" mt={1}>
						<Collapse in={collapse}>
							<Card>
								<Container>
									<Formik
										initialValues={{
											accroche: '',
											langue: '',
											search: '',
											annonceur: {},
											marque: {},
											produit: {},
											range: [null, null],
										}}
										validationSchema={
											Yup.object().shape({
											})
										}
										onSubmit={(values) => {
											getPubs(values,)
										}}
									>
										{({
											errors,
											handleBlur,
											handleChange,
											touched,
											values,
											setFieldValue
										}) => (
											<Form className={styles.container}>
												<Box sx={{ mb: 3 }}>

												</Box>
												<Grid container spacing={2}>
													<Grid item xs={12} sm={8}>
														<TextField
															size="small"
															autoFocus
															margin="dense"
															label="Accroche"
															value={values.accroche}
															fullWidth
															variant="standard"
															name="accroche"
															onChange={handleChange}
														/>
													</Grid>


													<Grid item xs={4}>
														<TextField
															select
															size="small"
															error={Boolean(touched.langue && errors.langue)}
															helperText={touched.langue && errors.langue}
															onBlur={handleBlur}
															fullWidth
															label="Langue"
															margin="normal"
															name="langue"
															onChange={handleChange}
															value={values.langue}
															variant="outlined"
														>
															<MenuItem value={'AR'}>Arab</MenuItem>
															<MenuItem value={'FR'}>Francais</MenuItem>
														</TextField>
													</Grid>
													<Grid item xs={12}>
														<LocalizationProvider dateAdapter={AdapterDateFns}>
															<MobileDateRangePicker
																startText="date debut"
																endText="date fin"
																value={values.range}
																onChange={(value) => {
																	setFieldValue("range", value)
																}}
																renderInput={(startProps, endProps) => (
																	<React.Fragment>
																		<Box sx={{ mx: 2 }}> De </Box>
																		<TextField
																			fullWidth
																			size="small"
																			name="range"
																			helperText={touched.range && errors.range}
																			onBlur={handleBlur}
																			error={Boolean(touched.range && errors.range)}
																			{...startProps}
																		/>
																		<Box sx={{ mx: 2 }}> à </Box>
																		<TextField
																			fullWidth
																			size="small"
																			name="range"
																			helperText={touched.range && errors.range}
																			onBlur={handleBlur}
																			error={Boolean(touched.range && errors.range)}
																			{...endProps}
																		/>
																	</React.Fragment>
																)}
															/>
														</LocalizationProvider>
													</Grid>

													<Grid item xs={6}>
														<Autocomplete
															size="small"
															value={values.annonceur}
															onChange={(event, newValue) => {
																setFieldValue("annonceur", newValue)
																getMarques(newValue);
															}}
															options={annonceurs.map((annonceur, index) => annonceur)}
															getOptionLabel={(option) => option.Nom || ""}

															id="combo-box-demo"
															renderInput={(params) => <TextField fullWidth {...params} label="Annonceur" />}
														/>
													</Grid>


													<Grid item xs={6}>
														<Autocomplete
															disablePortal
															size="small"
															value={values.marque}
															onChange={(event, newValue) => {
																setFieldValue("marque", newValue)
																getProduits(newValue)
															}}
															options={marques.map((marque) => marque)}
															getOptionLabel={(option) => option.Nom || ""}
															id="combo-box-demo"
															renderInput={(params) => <TextField fullWidth  {...params} label="Marque" />}
														/>
													</Grid>
													<Grid item xs={6}>
														<Autocomplete
															disablePortal
															size="small"
															value={values.produit}
															onChange={(event, value) => setFieldValue("produit", value ? value : {})}
															options={produits.map((produit) => produit)}
															getOptionLabel={(option) => option.Nom || ""}
															id="combo-box-demo"
															renderInput={(params) => <TextField fullWidth  {...params} label="Produit" />}
														/>
													</Grid>
												</Grid>
												<Stack direction="row"
													justifyContent="flex-end"
													alignItems="flex-end"
													spacing={2}>
													<IconButton
														variant="contained"
														onClick={() => {
															setFieldValue("accroche", '')
															setFieldValue("langue", '')
															setFieldValue("search", '')
															setFieldValue("annonceur", {})
															setFieldValue("marque", {})
															setFieldValue("produit", {})
															setFieldValue("range", [null, null])
															getPubs('');
														}}>
														<RefreshIcon />
													</IconButton>
													<Button variant="contained" type="submit">Filtrer</Button>
												</Stack>
											</Form>
										)}
									</Formik>

								</Container>
							</Card>
						</Collapse>
					</Stack>
					<Stack spacing={2} justifyContent="center" alignItems="center" mt={1}>

						<Grid container spacing={3} direction="row">
							{pubs.map((pub, index) => (
								<Grid key={index} item xs={12}>
									<Card style={{ height: "40vh" }}>

										<CardActionArea
											onClick={() => {
												navigate('/pubinfo', { state: { pub: pub } })
											}}
										>
											<CardMedia
												component="img"
												style={{ height: "40vh" }}
												image={pub.image}
											/>


											<CardContent className={styles.font}>

												<Grid container direction="column" justifyContent="space-between">
													<Grid item>
														<Typography color="white" gutterBottom variant="subtitle2" >
															&nbsp; <strong>{pub.langue == 'fr' ? 'Français' : 'Arabe'}</strong>
														</Typography>
														<Typography gutterBottom variant="subtitle2">
															&nbsp; <strong>{new Date(pub.date_creation).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
														</Typography>
														<Typography color="white" variant="subtitle2" sx={{ margintTop: '2vh' }}>
															<strong style={{ color: "#4fc3f7" }}>Code Panneau :</strong>
															&nbsp; <strong>{pub.panneau_detail.code} </strong>
														</Typography>
														<Typography color="white" variant="subtitle2">
															<strong style={{ color: "#4fc3f7" }}>Face de la pub:</strong>
															&nbsp; <strong>{pub.circulation ? 'A' : 'B'} </strong>
														</Typography>
														<Typography color="white" variant="subtitle2">
															<strong style={{ color: "#4fc3f7" }}>Code de la pub:</strong>
															&nbsp; <strong>{pub.code} </strong>
														</Typography>

													</Grid>
													<Grid item sx={{ marginTop: "3vh" }}>

														<Typography color="#4fc3f7" variant="subtitle2">
															<FaSolarPanel />
															&nbsp; <strong>{pub.nom_annonceur} </strong>
														</Typography>

														<Typography color="#4fc3f7" variant="subtitle2" >


															<AiFillTag />
															&nbsp; <strong>{pub.nom_marque} </strong>
														</Typography>

														<Typography color="#4fc3f7" gutterBottom variant="subtitle2" >
															<AiOutlineDropbox />
															&nbsp; <strong>{pub.nom_produit}</strong>
														</Typography>

													</Grid>
												</Grid>
											</CardContent>
										</CardActionArea>
									</Card >
								</Grid >
							))
							}

						</Grid >
						{
							pubs.length < 1 ?
								<Typography gutterBottom variant="h8" color="text.secondary">
									<strong>Aucune publicité trouvée!</strong>
								</Typography> :
								<Pagination
									color="primary"
									page={pagePan}
									count={pageCountPan}
									onChange={(event, value) => {
										setPagePan(value)
										getPubs(searchValuePan, value);
									}}
								/>

						}
					</Stack>

				</Container >
			</TabPanel >
			<TabPanel value={3}>
				<Container style={{ marginTop: "3vh", paddingBottom: "3vh" }}>

					<Stack spacing={2} justifyContent="center" alignItems="center" mt={1} mb={2}>

						<Grid container spacing={2} sx={{ marginTop: "2vh" }}>
							{chaines.map((row) => (
								<Grid item xs={12} sm={6} md={4}>
									<Card sx={{ maxWidth: 600 }}>
										<CardActionArea
											onClick={() => {
												navigate("/jour", {
													state: {
														detail: { id: row.id, nom: row.nom },
													},
												});
												//gotoVideo(row)
											}}
										>
											<CardMedia
												height="180"
												component="img"
												image={row.image}
												title="title"
												controls
											/>
										</CardActionArea>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												{row.nom}
											</Typography>

										</CardContent>

									</Card>
								</Grid>
							))}
						</Grid>

					</Stack>
				</Container>
			</TabPanel>
			<TabPanel value={4}>
				<Container style={{ marginTop: "3vh", paddingBottom: "3vh" }}>

					<Stack spacing={2} justifyContent="center" alignItems="center" mt={1} mb={2}>

						<Grid container spacing={2} sx={{ marginTop: "2vh" }}>
							{radios.map((row) => (
								<Grid item xs={12} sm={6} md={4}>
									<Card sx={{ maxWidth: 600 }}>
										<CardActionArea
											onClick={() => {
												navigate("/jourradio", {
													state: {
														detail: { id: row.id, nom: row.nom },
													},
												});
												//gotoVideo(row)
											}}
										>
											<CardMedia
												height="180"
												component="img"
												image={row.image}
												title="title"
												controls
											/>
										</CardActionArea>
										<CardContent>
											<Typography gutterBottom variant="h5" component="div">
												{row.nom}
											</Typography>

										</CardContent>

									</Card>
								</Grid>
							))}
						</Grid>

					</Stack>
				</Container>
			</TabPanel>
		</div >
	);
}
