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

import React, { useRef } from "react";
import { useLocation } from "react-router";
import { makeStyles } from "@material-ui/styles";
import { useReactToPrint } from "react-to-print";

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

export default function PubInfo(props) {
    const styles = useStyles();
    const location = useLocation();
    const pub = location.state.pub;
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <Container sx={{ width: "100%", marginTop: "3vh", paddingBottom: "3vh" }}>
            <Container sx={{ width: '100%', marginTop: '3vh', paddingBottom: '3vh' }}>
                <Container>

                    <Button variant="contained" onClick={handlePrint}>Télécharger pdf</Button>
                </Container>

                <Stack mt={2} ref={componentRef}>
                    <Container>
                        <Grid container spacing={2}>
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
                                            <Typography variant="subtitle2"> <strong> Hauteur : </strong>{pub.panneau_detail.hauteur}</Typography>
                                            <Typography variant="subtitle2"> <strong> Elevation : </strong>{pub.panneau_detail.elevation}</Typography>
                                            <Typography variant="subtitle2"> <strong> Type : </strong>{pub.panneau_detail.type}</Typography>
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
                                                <strong>Publicité</strong>{" "}
                                            </Divider>
                                        </Typography>
                                        <div>
                                            <Typography variant="subtitle2">
                                                <strong>Code :</strong>{" "}{pub.code}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                <strong>Face :</strong>{" "}{pub.circulation ? 'A' : 'B'}
                                            </Typography>
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
                                                image={pub.image}
                                                alt="pub"
                                            />
                                        </Card>
                                    </Grid>

                                </Grid>
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
                                            {pub.accroche}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </Stack>
            </Container>
        </Container>
    );
}
