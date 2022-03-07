import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
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

export default function PubLink() {
    let { id } = useParams();
    const [pub, setPub] = useState({
        panneau_detail: {

        }
    })
    const getPub = () => {
        const url = "api/pub/link/"
        axiosInstance
            .get(url, { params: { id: id } })
            .then(function (response) {
                setPub(response.data[0]);
            })
            .catch(function (error) { });
    }
    useEffect(() => {
        getPub();
    }, [])
    return (

        <Container sx={{ width: "100%", marginTop: "3vh", paddingBottom: "3vh" }}>
            {
                pub ? <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    Information
                                </Typography>
                                <Typography>
                                    <Divider textAlign="left" sx={{ color: "#006db3" }}>
                                        <strong>Panneau</strong>{" "}
                                    </Divider>
                                </Typography>
                                <div>
                                    <Typography variant="subtitle2"> <strong> Num° panneau : </strong>{pub.code_panneau}</Typography>
                                    <Typography variant="subtitle2"> <strong> Adresse : </strong>{pub.panneau_detail.adresse}</Typography>
                                    <Typography variant="subtitle2"> <strong> Coordonnées gps : </strong>latitude : {pub.panneau_detail.latitude} longitude : {pub.panneau_detail.longitude}</Typography>
                                    <Typography variant="subtitle2"> <strong> Designation : </strong>{pub.panneau_detail.designation}</Typography>
                                    <Typography variant="subtitle2"> <strong> Nombre de facette : </strong>{pub.panneau_detail.nombre_facette}</Typography>
                                    <Typography variant="subtitle2"> <strong> Hauteur : </strong>{pub.panneau_detail.hauteur}</Typography>
                                    <Typography variant="subtitle2"> <strong> Elevation : </strong>{pub.panneau_detail.elevation}</Typography>
                                    <Typography variant="subtitle2"> <strong> Mecanisme : </strong>{pub.panneau_detail.mecanisme}</Typography>

                                    <Typography variant="body2" gutterBottom color="text.secondary">

                                    </Typography>
                                </div>
                                <Typography gutterBottom>
                                    <Divider textAlign="left" sx={{ color: "#006db3" }}>
                                        <strong>Produit</strong>{" "}
                                    </Divider>
                                </Typography>
                                <div>
                                    <Typography variant="subtitle2">
                                        <strong>Annonceur :</strong> {pub.nom_annonceur}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <strong>Marque :</strong> {pub.nom_marque}
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom>
                                        <strong>Produit :</strong> {pub.nom_produit}
                                    </Typography>
                                </div>
                                <Typography gutterBottom>
                                    <Divider textAlign="left" sx={{ color: "#006db3" }}>
                                        <strong>pub</strong>{" "}
                                    </Divider>
                                </Typography>
                                <div>
                                    <Typography variant="subtitle2">
                                        <strong>Date :</strong>{" "}
                                        {new Date(pub.date_creation).toLocaleDateString([], {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </Typography>

                                    <Typography variant="subtitle2">
                                        <strong>Langue :</strong>{" "}
                                        {pub.language == "FR" ? "Français" : "arabe"}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="100%"
                                        image={pub.image}
                                        alt="pub"
                                    />
                                </Card>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid> :

                    <Stack spacing={2} justifyContent="center" alignItems="center" mt={1} mb={2}>
                        <Typography variant="h5">
                            Page intovable
                        </Typography>

                    </Stack>
            }

        </Container>
    )
}