import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { makeStyles } from "@material-ui/styles";
import axiosInstance from "../Axios/axios";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: "3vh",

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
        height: "32vh",
    },
    accroche: {
        display: "-webkit-box",
        boxOrient: "vertical",
        wordBreak: "break-all",
        overflow: "hidden",
        color: "black",
    },
}));

export default function AudioInfo(props) {
    const styles = useStyles();
    const location = useLocation();

    const [video, setVideo] = useState({})

    const getVideo = () => {
        axiosInstance.get("api/sonclient/" + location.state.video.lien + "/").then(function (response) {
            setVideo(response.data)
        })
    }

    useEffect(() => {
        getVideo();
    }, [])


    return (
        <Container sx={{ width: "100%", marginTop: "3vh", paddingBottom: "3vh" }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                Information
                            </Typography>
                            <Typography>
                                <Divider textAlign="left" sx={{ color: "#006db3" }}>
                                    <strong>Radio</strong>{" "}
                                </Divider>
                            </Typography>
                            <div>
                                <Typography variant="h6">{video.nomJournal}</Typography>
                                <Typography variant="body2" gutterBottom color="text.secondary">
                                    {video.nom_radio}
                                </Typography>
                            </div>
                            <Typography gutterBottom>
                                <Divider textAlign="left" sx={{ color: "#006db3" }}>
                                    <strong>Produit</strong>{" "}
                                </Divider>
                            </Typography>
                            <div>
                                <Typography variant="subtitle2">
                                    <strong>Annonceur :</strong> {video.nom_annonceur}
                                </Typography>
                                <Typography variant="subtitle2">
                                    <strong>Marque :</strong> {video.nom_marque}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    <strong>Produit :</strong> {video.nom_produit}
                                </Typography>
                            </div>
                            <Typography gutterBottom>
                                <Divider textAlign="left" sx={{ color: "#006db3" }}>
                                    <strong>video</strong>{" "}
                                </Divider>
                            </Typography>
                            <div>
                                <Typography variant="subtitle2">
                                    <strong>Date :</strong>{" "}
                                    {new Date(location.state.jour.date).toLocaleDateString([], {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </Typography>

                                <Typography variant="subtitle2">
                                    <strong>Langue :</strong>{" "}
                                    {video.language == "FR" ? "Fran??ais" : "arabe"}
                                </Typography>

                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card>
                                <Container>
                                    <Stack justify='center' alignItems='center'>
                                        {video.son && (
                                            <ReactAudioPlayer src={video.son} width="100%"

                                                controls
                                            />

                                        )}

                                    </Stack>
                                </Container>

                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        <Divider>Accroche</Divider>
                                    </Typography>
                                    <Typography
                                        className={styles.accroche}
                                        variant="body2"
                                        paragraph
                                        component="div"
                                    >
                                        {video.message}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
