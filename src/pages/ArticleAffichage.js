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


export default function ArticleAffichage(props) {
	const styles = useStyles();
	const location = useLocation();
	const article = location.state.article;
	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});




	return (
		<Container id="divToPrint" sx={{ width: "100%", marginTop: "3vh", paddingBottom: "3vh" }} >
			<Container>

				<Button variant="contained" onClick={handlePrint}>Télécharger pdf</Button>
			</Container>

			<Stack mt={2}>

				<Container ref={componentRef} >

					<Grid container spacing={2} >

						<Grid item xs={4}>
							<Card>
								<CardContent>
									<Typography gutterBottom variant="h5">
										Information
									</Typography>
									<Typography>
										<Divider textAlign="left" sx={{ color: "#006db3" }}>
											<strong>Journal</strong>{" "}
										</Divider>
									</Typography>
									<div>
										<Typography variant="h6">{article.nomJournal}</Typography>
										<Typography variant="body2" gutterBottom color="text.secondary">
											Num° edition : {article.numEdition}
										</Typography>
									</div>
									<Typography gutterBottom>
										<Divider textAlign="left" sx={{ color: "#006db3" }}>
											<strong>Produit</strong>{" "}
										</Divider>
									</Typography>
									<div>
										<Typography variant="subtitle2">
											<strong>Annonceur :</strong> {article.nom_annonceur}
										</Typography>
										<Typography variant="subtitle2">
											<strong>Marque :</strong> {article.nom_marque}
										</Typography>
										<Typography variant="subtitle2" gutterBottom>
											<strong>Produit :</strong> {article.nom_produit}
										</Typography>
									</div>
									<Typography gutterBottom>
										<Divider textAlign="left" sx={{ color: "#006db3" }}>
											<strong>Article</strong>{" "}
										</Divider>
									</Typography>
									<div>
										<Typography variant="subtitle2">
											<strong>Date :</strong>{" "}
											{new Date(article.date_creation).toLocaleDateString([], {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</Typography>

										<Typography variant="subtitle2">
											<strong>Langue :</strong>{" "}
											{article.language == "FR" ? "Français" : "arabe"}
										</Typography>
										<Typography variant="subtitle2">
											<strong>Page précédente :</strong> {article.page_precedente}
										</Typography>
										<Typography variant="subtitle2">
											<strong>Page suivante :</strong> {article.page_suivante}
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
											component="img"
											image={article.image}
											alt="Article"
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
												{article.accroche}
											</Typography>
										</CardContent>
									</Card>
								</Grid>

							</Grid>
						</Grid>

					</Grid>
				</Container>
			</Stack>
		</Container >
	);
}
