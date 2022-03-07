import {
    Autocomplete,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Container,
    DialogContent,
    DialogContentText,
    Divider,
    FormHelperText,
    Grid,
    Hidden,
    IconButton,
    Stack,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import axiosInstance from "../Axios/axios";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";


const useStyles = makeStyles((theme) => ({
    Container: {
        paddingBottom: "3vh",
        marginTop: "3vh",
    },
}));

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}
export default function Journal() {
    const styles = useStyles();


    const [editjournal, setEditjournal] = useState([]);
    const [data1, setData1] = useState([]);
    const [requette, setRequette] = useState(null);
    const theme = useTheme();

    //////////////////////////////////////////////////////////////////////////
    const [openedit, setOpenedit] = React.useState(false);
    const handleClickOpenedit = () => {
        setOpenedit(true);
    };
    const handleCloseedit = () => {
        setOpenedit(false);
    };

    //////////////////////////////////////////////////////////////////////////
    const [open1, setOpen1] = React.useState(false);
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };

    //////////////////////////////////////////////////////////////////////////
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //////////////////////////////////////////////////////////////////////////
    const [journalEdit, setJournalEdit] = React.useState({});
    const [openEditConf, setOpenEditConf] = React.useState(false);
    const handleOpenEditConf = () => {
        setOpenEditConf(true);
    };
    const handleCloseEditConf = () => {
        setOpenEditConf(false);
    };


    const Input = styled("input")({
        display: "none",
    });

    const FILE_SIZE = 1 * 1024 * 1024;
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
    ];
    const [pageCount, setpageCount] = useState(0);
    let history = useNavigate();


    useEffect(() => {
        GetData();

    }, []);

    const getJournal = (e) => {
        setpageCount(1)
        if (e) {
            axiosInstance
                .get("api/journaux/search/?nomJournal=" + e.nomJournal)
                .then((response) => {
                    response.data.map((journal, index) => {
                        setJournal([]);
                        setJournal((j) => [...j, journal]);
                        setpageCount(response.data.total_pages)
                    });
                });
        } else {
            setJournal([]);
            GetData();
        }
    };

    const [journal, setJournal] = useState([]);


    const GetData = (page) => {
        setJournal([]);
        if (page == null) {
            page = 1;
        }

        axiosInstance
            .get("api/journaux/client/", { params: { page: page } })
            .then((json) => {
                setpageCount(json.data.total_pages)
                setJournal(json.data.results);
            }).catch(function (error) { });
        axiosInstance
            .get("api/journaux/test/",)
            .then((json) => {
                setData1(json.data);
            })

    };



    const GottoEdition = (Journa) => {
        history('/edition', { state: { detail: Journa } })
    }
    useEffect(() => {
        GetData();

    }, []);


    return (
        <Container className={styles.Container}>
            <Card>
                <CardContent>
                    <Grid
                        justifyContent="space-between"
                        container
                        direction="row"
                        alignItems="Center"
                        spacing={3}
                    >
                        <Grid item xs={12} sm={4}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={requette}
                                options={data1.map((d) => d)}
                                getOptionLabel={(d) => d.nomJournal}
                                onChange={(Event, value) => {
                                    setRequette(value);
                                    getJournal(value);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Journal" />
                                )}
                            />
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={0} sm={3} md={5}>
                                <Typography></Typography>
                            </Grid>
                        </Hidden>

                    </Grid>
                </CardContent>
            </Card>

            <Stack
                mt={3}
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid container spacing={2}>
                    {journal.map((d, index) => (
                        <Grid item xs={12} sm={6}>

                            <Card>
                                <CardActionArea onClick={() => {
                                    GottoEdition(d)
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={d.image}
                                        alt="Logo du journal"
                                    />
                                </CardActionArea>
                                <Divider />

                                <Grid justifyContent="space-between" // Add it here :)
                                    container
                                    direction="row"
                                    alignItems="center">
                                    <CardHeader title={d.nomJournal} />

                                </Grid>


                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    color='primary'
                    count={pageCount}
                    onChange={(event, value) => {
                        GetData(value);
                    }}
                />
            </Stack>




        </Container>
    );
}
