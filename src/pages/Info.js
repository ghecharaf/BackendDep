/** @format */

import React from 'react';
import {
	Button,
	Card,
	CardContent,
	Container,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { typography } from '@mui/system';
import axiosInstance from '../Axios/axios';
export default function Info() {
	const [client, setClient] = React.useState({
		id: 11,
		user_name: '',
		email: '',
		first_name: '',
		last_login: '',
		start_date: '',
	});
	React.useEffect(() => {
		axiosInstance.get('api/users/clientinfo/').then((response) => {
			setClient(response.data[0]);
		});
	}, []);
	return (
		<Container
			style={{
				marginTop: '3vh',
				paddingBottom: '3vh',
			}}>

			<Card
				style={{
					marginTop: '3vh',
					paddingBottom: '3vh',
				}}>

				<Container style={{ paddingTop: '4vh' }}>
					<Typography variant='h3'>
						Information du compte
					</Typography>
					<Grid
						container
						direction="row"
						alignItems="center"
						spacing={2}>
						<Grid item xs={6} style={{ textAlign: 'center' }}>
							<TextField
								id="outlined-read-only-input"
								label="Nom d'utilisateur"
								focused
								value={client.user_name}
								InputProps={{
									readOnly: true,
								}}
							/>
						</Grid>
						<Grid item xs={6} style={{ textAlign: 'center' }}>
							<TextField
								id="outlined-read-only-input"
								label="Nom"
								focused
								value={client.first_name}
								InputProps={{
									readOnly: true,
								}}
							/>
						</Grid>
						<Grid item xs={6} style={{ textAlign: 'center' }}>
							<TextField
								id="outlined-read-only-input"
								label="Email"
								focused
								value={client.email}
								InputProps={{
									readOnly: true,
								}}
							/>
						</Grid>
						<Grid item xs={6} style={{ textAlign: 'center' }}>
							<TextField
								id="outlined-read-only-input"
								label="date debut"
								focused
								value={client.start_date}
								InputProps={{
									readOnly: true,
								}}
							/>
						</Grid>
						<Grid item xs={6} style={{ textAlign: 'center' }}>
							<TextField
								id="outlined-read-only-input"
								label="last login"
								focused
								value={client.last_login}
								InputProps={{
									readOnly: true,
								}}
							/>
						</Grid>
					</Grid>
				</Container>
			</Card>

		</Container>
	);
}
