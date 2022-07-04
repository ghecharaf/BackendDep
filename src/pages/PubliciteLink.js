import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router';
import axiosInstance from '../Axios/axios';
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

import { makeStyles } from "@material-ui/styles";



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




export default function PubLiciteLink() {

    const styles = useStyles();
    const location = useLocation();
    let { id } = useParams();
    const [video, setPub] = useState({
        panneau_detail: {

        }
    })
    const getPub = () => {
        const url = "api/publicite/link/"
        axiosInstance
            .get(url, { params: { id: id } })
            .then(function (response) {
                console.log(response.data);
                setPub(response.data[0]);
            })
            .catch(function (error) { });
    }
    useEffect(() => {
        getPub();
    }, [])
    return (

        <Container sx={{ width: "100%", marginTop: "3vh", paddingBottom: "3vh" }}>
            {video ? <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                Information
                            </Typography>
                            <Typography>
                                <Divider textAlign="left" sx={{ color: "#006db3" }}>
                                    <strong>Chaine</strong>{" "}
                                </Divider>
                            </Typography>
                            <div>
                                <Typography variant="h6">{video.nomJournal}</Typography>
                                <Typography variant="body2" gutterBottom color="text.secondary">
                                    {video.nom_chaine}
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
                                    <strong>Langue :</strong>{" "}
                                    {video.language == "FR" ? "Français" : "arabe"}
                                </Typography>

                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card>
                                <CardMedia
                                    component="video"
                                    height="100%"
                                    image={video.video}
                                    alt="video"
                                    controls
                                />
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
                                        {video.accroche}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
                :

                <Stack spacing={2} justifyContent="center" alignItems="center" mt={1} mb={2}>
                    <Typography variant="h5">
                        Page intovable
                    </Typography>

                </Stack>
            }

        </Container>
    )
}