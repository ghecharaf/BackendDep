import * as React from "react";
import { Typography, Card, CardActionArea, CardContent, CardMedia, Grid, SvgIcon, IconButton, Stack, Collapse, TextField, MenuItem, Autocomplete, Button, Pagination, Hidden, CardHeader, Divider } from "@mui/material";
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
import ArticleIcon from '@mui/icons-material/Article';


import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import RefreshIcon from '@mui/icons-material/Refresh';
import { format } from 'date-fns'

import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import Journal from "./Journal";

import Graph from './Login/graph.png'
import Graph2 from './Login/graph2.png'
import Graph3 from './Login/graph3.png'
import Graph4 from './Login/graph4.png'


import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import RadioIcon from '@mui/icons-material/Radio';


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

export default function Radio() {
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



    const [radios, setRadios] = useState([])
    const getRadios = () => {
        axiosInstance
            .get("api/radio/getall/",)
            .then((json) => {
                setRadios(json.data);
            });
    }




    useEffect(() => {

        getAnnonceurs();
        getMarques();
        getProduits();
        getRadios();
    }, []);


    const [collapse, setCollapse] = useState(false)


    const styles = useStyles();

    return (

        <div>


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
        </div >
    );
}
