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
import { useLocation, useNavigate } from 'react-router';
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
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 20%)",
        height: "50vh",
        position: "absolute",
        top: "0%",
        width: "100%",
        color: "white",
    },
}));


export default function Articles() {
    const styles = useStyles();
    const [collapse, setCollapse] = useState(false)
    const [searchValueArt, setSearchValueArt] = useState({})



    const [articles, setArticles] = useState([])
    const [pageCount, setpageCount] = useState(0);
    const [pageArt, setPageArt] = useState(1);


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
    const location = useLocation();


    const getArticle = (values, page) => {
        setSearchValueArt(values)
        setPageArt(page)
        if (!page) {
            page = 1
            setPageArt(1)
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


            axiosInstance.get('api/articleclient/', {
                params: {
                    langue: values.langue,
                    edition: location.state.detail.id,
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
                    setpageCount(response.data.total_pages)
                    setArticles(response.data.results)
                })
        }
        else {

            start = "1050-01-01";
            end = "2080-01-01";
            axiosInstance.get('api/articleclient/', {
                params: {
                    langue: '',
                    edition: location.state.detail.id,
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
                    setpageCount(response.data.total_pages)
                    setArticles(response.data.results)
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
    let navigate = useNavigate()

    useEffect(() => {
        getArticle()
        getAnnonceurs();
        getMarques();
        getProduits();
        getJournaux();
    }, [])


    return (
        <Container>
            <Stack spacing={2} justifyContent="center" alignItems="center" mt={1} mb={2}>
                <Container>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center" spacing={2}
                    >
                        <Grid item xs={10}>
                            <Button variant="contained" onClick={() => { setCollapse(!collapse) }} endIcon={<FilterListIcon />}>Rechercher article</Button>

                        </Grid>

                    </Grid>
                </Container>
                <Collapse in={collapse}>
                    <Card>
                        <Container>
                            <Formik
                                initialValues={{
                                    langue: '',
                                    search: '',
                                    annonceur: {},
                                    marque: {},
                                    produit: {},
                                    journal: {},
                                    range: [null, null],
                                }}
                                validationSchema={
                                    Yup.object().shape({
                                    })
                                }
                                onSubmit={(values) => {
                                    getArticle(values,);
                                }}
                            >
                                {({
                                    errors,
                                    handleBlur,
                                    handleChange,
                                    touched,
                                    values,
                                    setFieldValue,
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
                                                    label="Search"
                                                    value={values.search}
                                                    fullWidth
                                                    variant="standard"
                                                    name="search"
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
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
                                                    <MenuItem value={'AF'}>Arab + Francais</MenuItem>

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

                                            <Grid item xs={12} md={6}>
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


                                            <Grid item xs={12} md={6}>
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
                                            <Grid item xs={12} md={6}>
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
                                            <IconButton variant="contained"
                                                onClick={() => {
                                                    setFieldValue("langue", '')
                                                    setFieldValue("search", '')
                                                    setFieldValue("annonceur", {})
                                                    setFieldValue("marque", {})
                                                    setFieldValue("produit", {})
                                                    setFieldValue("journal", {})
                                                    setFieldValue("range", [null, null])
                                                    getArticle();
                                                }}
                                            >
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
            <Stack spacing={2} justifyContent="center" alignItems="center" mt={1} mb={2}>
                <Grid container spacing={3} direction="row">
                    {articles.map((article, index) => (
                        <Grid key={index} item xs={12}>
                            <Hidden mdDown>
                                <Card style={{ height: "40vh" }}>
                                    <CardActionArea
                                        onClick={() => {
                                            navigate('/articleinfo', { state: { article: article } })
                                        }}
                                    >
                                        <Grid container>
                                            <Grid item xs={3}>

                                                <CardMedia
                                                    component="img"
                                                    style={{ width: "35vh", height: "40vh" }}
                                                    image={article.image}
                                                />
                                            </Grid>
                                            <Grid item xs={9}>
                                                <CardContent className={styles.card}>
                                                    <Grid container justifyContent="space-between">
                                                        <Grid item >
                                                            <Grid container direction="row"
                                                                justifyContent="space-around"
                                                                alignItems="center">
                                                                <Grid item>
                                                                    <CalendarTodayIcon color="primary" />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography color="primary" gutterBottom variant="h8">

                                                                        &nbsp; {new Date(article.date_creation).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container direction="row"
                                                                justifyContent="space-around"
                                                                alignItems="center">
                                                                <Grid item>
                                                                    <Grid item >
                                                                        <Typography color="primary" gutterBottom variant="subtitle2" >

                                                                            <strong>Journal : </strong> {article.nomJournal}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container direction="row"
                                                                justifyContent="space-around"
                                                                alignItems="center">
                                                                <Grid item>
                                                                    <LanguageIcon color="primary" />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Grid item >
                                                                        <Typography color="primary" gutterBottom variant="subtitle2" >

                                                                            &nbsp;
                                                                            {article.language == 'FR' ? 'Français' : article.language == 'AR' ? 'Arabe' : "Arabe + Français"}

                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>
                                                    <Grid container justifyContent="space-around" style={{ marginTop: "2vh" }}>
                                                        <Grid item >
                                                            <Grid container direction="row"
                                                                justifyContent="center"
                                                                alignItems="center">
                                                                <Grid item>
                                                                    <SvgIcon>

                                                                        <FaSolarPanel color="#081627" />
                                                                    </SvgIcon>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography color="#081627" variant="h8">
                                                                        &nbsp; <strong> {article.nom_annonceur} </strong>
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container direction="row"
                                                                justifyContent="center"
                                                                alignItems="center">
                                                                <Grid item>
                                                                    <LocalOfferIcon color="#081627" />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography color="#081627" gutterBottom variant="subtitle2" >
                                                                        &nbsp; <strong>{article.nom_marque} </strong>
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container direction="row"
                                                                justifyContent="center"
                                                                alignItems="center">
                                                                <Grid item>
                                                                    <SvgIcon fontSize="medium">

                                                                        <AiOutlineDropbox color="081627" />
                                                                    </SvgIcon>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography color="#081627" gutterBottom variant="subtitle2" >
                                                                        &nbsp; <strong>{article.nom_produit}  </strong>
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>



                                                    <Typography className={styles.accroche} style={{ marginTop: "1vh" }} variant="body2">
                                                        <strong style={{ color: "black" }}>Accroche: </strong><br /> {article.accroche}<br />
                                                    </Typography>
                                                </CardContent >

                                            </Grid >

                                        </Grid >
                                    </CardActionArea>

                                </Card >

                            </Hidden>

                            <Hidden mdUp>
                                <Card style={{ height: "40vh" }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <CardContent className={styles.card}>
                                                <Grid container justifyContent="space-between">
                                                    <Grid item >
                                                        <Grid container direction="row"
                                                            justifyContent="space-around"
                                                            alignItems="center">
                                                            <Grid item>
                                                                <CalendarTodayIcon color="primary" />
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography color="primary" gutterBottom variant="h8">

                                                                    &nbsp; {new Date(article.date_creation).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container direction="row"
                                                            justifyContent="space-around"
                                                            alignItems="center">
                                                            <Grid item>
                                                                <LanguageIcon color="primary" />
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid item >
                                                                    <Typography color="primary" gutterBottom variant="subtitle2" >

                                                                        &nbsp; {article.language == 'FR' ? 'Français' : 'arabe'}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                                <Grid container justifyContent="space-around" style={{ marginTop: "2vh" }}>
                                                    <Grid item >
                                                        <Grid container direction="row"
                                                            justifyContent="center"
                                                            alignItems="center">
                                                            <Grid item>
                                                                <SvgIcon>

                                                                    <FaSolarPanel color="#081627" />
                                                                </SvgIcon>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography color="#081627" variant="h8">
                                                                    &nbsp; <strong> {article.nom_annonceur} </strong>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container direction="row"
                                                            justifyContent="center"
                                                            alignItems="center">
                                                            <Grid item>
                                                                <LocalOfferIcon color="#081627" />
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography color="#081627" gutterBottom variant="subtitle2" >
                                                                    &nbsp; <strong>{article.nom_marque} </strong>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container direction="row"
                                                            justifyContent="center"
                                                            alignItems="center">
                                                            <Grid item>
                                                                <SvgIcon fontSize="medium">

                                                                    <AiOutlineDropbox color="081627" />
                                                                </SvgIcon>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography color="#081627" gutterBottom variant="subtitle2" >
                                                                    &nbsp; <strong>{article.nom_produit}  </strong>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>



                                                <Typography className={styles.accroche} style={{ marginTop: "1vh" }} variant="body2">
                                                    <strong style={{ color: "black" }}>Accroche: </strong><br /> {article.accroche}<br />
                                                </Typography>
                                            </CardContent >

                                        </Grid >

                                    </Grid >

                                </Card>
                            </Hidden>
                        </Grid >
                    ))
                    }

                </Grid >
                {
                    articles.length < 1 ?
                        <Typography gutterBottom variant="h8" color="text.secondary">
                            <strong>Aucun article trouvé !</strong>
                        </Typography> :
                        <Pagination
                            color="primary"
                            page={pageArt}
                            count={pageCount}
                            onChange={(event, value) => {
                                setPageArt(value)
                                getArticle(searchValueArt, value);
                            }}
                        />

                }

            </Stack >
        </Container>
    )
}
