import { Alert, AlertTitle, AppBar, Avatar, Button, Card, CardActionArea, CardMedia, Checkbox, Collapse, Container, CssBaseline, Divider, FormControlLabel, Grid, Hidden, IconButton, InputLabel, Link, Menu, Paper, Stack, SvgIcon, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/styles';
import axiosInstance from '../../Axios/axios';
import { useNavigate } from 'react-router';
import image from './pro mediaconseils logo-07.png';
import back from './alger3.jpg';
import { alpha, styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FacebookIcon from '@mui/icons-material/Facebook';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import MenuIcon from '@mui/icons-material/Menu';
import { green, orange, pink } from '@mui/material/colors';


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#707070',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#707070',
        borderRadius: "50vh"

    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: "50vh",
        },
        '&.Mui-focused fieldset': {
            borderColor: '#707070',
        },
    },
});

const useStyles = makeStyles(theme => ({
    container: {
        background: "black",
        height: "100vh"
    },
    div: {
        background: "#4D35E4",
        height: "100vh"
    },
    textfield: {
        borderRadius: "20vh"
    },
    main: {
        paddingTop: '5vh'
    },
    paperContainer: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundImage: `url(${back})`,
        height: "100vh",
        borderRadius: 'none'
    }
}));
export default function Login() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const styles = useStyles()
    let history = useNavigate();
    const Login = (values) => {
        axiosInstance
            .post('api/users/clientlogin/', {
                user_name: values.username,
                password: values.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                history('/content');
            })
            .catch(() => {
                setOpen(true)
            })
    }

    const [open, setOpen] = useState(false)

    return (
        <div className={styles.container}>

            <Paper className={styles.paperContainer} >
                <CssBaseline />

                <AppBar position="static" color="transparent" elevation={0}>
                    <Toolbar mt={-1}>

                        <img src={image} style={{ maxWidth: 350, height: 50 }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                        </Typography>
                        <IconButton sx={{ color: 'white' }} aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}><MenuIcon></MenuIcon></IconButton>
                    </Toolbar>
                </AppBar>


                <Container className={styles.main}>
                    <Grid container direction="row" spacing={2}>
                        <Hidden smDown>
                            <Grid item sm={6} md={8}>


                                <Stack mt={10} direction="column"
                                    justifyContent="center"
                                    alignItems="center" spacing={5}>

                                    <img src={image} style={{ width: "40%" }} />
                                    <Typography variant='h4' color="white">
                                        Fast Source Of Information.
                                    </Typography>
                                </Stack>
                            </Grid>

                        </Hidden>
                        <Grid item sm={6} md={4}>

                            <Card

                                sx={{
                                    backgroundColor: 'background.default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'center',
                                    boxShadow: 10,
                                    borderRadius: "3vh"
                                }}
                            >
                                <Formik
                                    initialValues={{
                                        username: "",
                                        password: '',

                                    }}
                                    validationSchema={
                                        Yup.object().shape({
                                            username: Yup.string().max(255).required('username est obligatoire'),
                                            password: Yup.string().max(255).required('password est obligatoire'),

                                        })
                                    }
                                    onSubmit={(values) => {
                                        Login(values);
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
                                        <Form >

                                            <Container>
                                                <CssBaseline />
                                                <Box
                                                    sx={{
                                                        marginTop: 5,
                                                        marginBottom: 5,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'left',

                                                    }}
                                                >
                                                    <Typography component="h1" variant="h3" >
                                                        <strong>Connexion</strong>
                                                    </Typography>
                                                    <Typography variant="subtitle1" style={{ paddingBottom: '3vh' }}>
                                                        Utiliser votre compte ProMediaConseils
                                                    </Typography>
                                                    <Divider />
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',

                                                    }}>
                                                        <Grid container>
                                                            <Grid item xs={12}>
                                                                <CssTextField
                                                                    className={styles.textfield}
                                                                    fullWidth
                                                                    error={Boolean(touched.username && errors.username)}
                                                                    helperText={touched.username && errors.username}
                                                                    onBlur={handleBlur}
                                                                    margin="normal"
                                                                    label="Nom d'utilisateur"
                                                                    id="username"
                                                                    name="username"
                                                                    value={values.username}
                                                                    onChange={handleChange}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <CssTextField
                                                                    fullWidth
                                                                    error={Boolean(touched.password && errors.password)}
                                                                    helperText={touched.password && errors.password}
                                                                    onBlur={handleBlur}
                                                                    margin="normal"
                                                                    name="password"
                                                                    type="password"
                                                                    label="Mot de passe"
                                                                    value={values.password}
                                                                    onChange={handleChange}
                                                                    id="password"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Button
                                                            type="submit"
                                                            fullWidth
                                                            variant="contained"
                                                            sx={{ mt: 3, mb: 2, borderRadius: "20vh", background: "#f58220" }}
                                                        >
                                                            Login
                                                        </Button>

                                                    </Box>
                                                </Box>

                                            </Container>

                                        </Form>
                                    )}
                                </Formik>

                            </Card>
                        </Grid>

                    </Grid>
                </Container>


                <Collapse in={open} style={{ position: 'absolute', width: '100%', top: "0" }}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <AlertTitle>Invalide nom d'utilisateur ou mot de passe !</AlertTitle>
                        This is an error alert — <strong>check it out!</strong>
                    </Alert>
                </Collapse>

            </Paper>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open1}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ width: 400, maxWidth: '100%', borderRadius: '40px' }}
            >
                <Box sx={{ width: 400, maxWidth: '100%', borderRadius: '40px' }}>
                    <Container>
                        <Stack direction='column'>
                            <Typography variant='h6'><strong>Applications</strong> </Typography>
                            <Grid container spacing={2}>

                                <Grid item xs={4}>
                                    <Card sx={{ paddingBottom: '1vh' }} elevation={0}>
                                        <CardActionArea onClick={() => {
                                            window.location.href = 'https://www.promediaconseils.com/view.html';
                                        }}>

                                            <Stack direction="column"
                                                justifyContent="center"
                                                alignItems="center">

                                                <IconButton disabled={true}>
                                                    <RemoveRedEyeIcon sx={{ fontSize: 50, color: orange[500] }} />

                                                </IconButton>
                                                <Typography variant='subtitle2'><strong>View</strong></Typography>

                                            </Stack>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ paddingBottom: '1vh' }} elevation={0}>
                                        <CardActionArea onClick={() => {
                                            window.location.href = 'https://www.promediaconseils.com/press.html';
                                        }}>

                                            <Stack direction="column"
                                                justifyContent="center"
                                                alignItems="center">

                                                <IconButton disabled={true}>
                                                    <NewspaperIcon sx={{ fontSize: 50 }} color='secondary' />

                                                </IconButton>
                                                <Typography variant='subtitle2'><strong>Press</strong></Typography>

                                            </Stack>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ paddingBottom: '1vh' }} elevation={0}>
                                        <CardActionArea onClick={() => {
                                            window.location.href = 'https://www.promediaconseils.com/ad.html';
                                        }}>

                                            <Stack direction="column"
                                                justifyContent="center"
                                                alignItems="center">

                                                <IconButton disabled={true}>
                                                    <AssessmentIcon sx={{ fontSize: 50 }} />

                                                </IconButton>
                                                <Typography variant='subtitle2'><strong>Ad</strong></Typography>

                                            </Stack>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ paddingBottom: '1vh' }} elevation={0}>
                                        <CardActionArea onClick={() => {
                                            window.location.href = 'https://www.promediaconseils.com/social.html';
                                        }}>

                                            <Stack direction="column"
                                                justifyContent="center"
                                                alignItems="center">

                                                <IconButton disabled={true}>
                                                    <FacebookIcon sx={{ fontSize: 50 }} color='primary' />

                                                </IconButton>
                                                <Typography variant='subtitle2'><strong>Social</strong></Typography>

                                            </Stack>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ paddingBottom: '1vh' }} elevation={0}>
                                        <CardActionArea onClick={() => {
                                            window.location.href = 'https://www.promediaconseils.com/market.html';
                                        }}>

                                            <Stack direction="column"
                                                justifyContent="center"
                                                alignItems="center">

                                                <IconButton disabled={true}>
                                                    <StorefrontIcon sx={{ fontSize: 50, color: pink[500] }} />

                                                </IconButton>
                                                <Typography variant='subtitle2'><strong>Market</strong></Typography>

                                            </Stack>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ paddingBottom: '1vh' }} elevation={0}>
                                        <CardActionArea onClick={() => {
                                            window.location.href = 'https://www.promediaconseils.com/services.html';
                                        }}>

                                            <Stack direction="column"
                                                justifyContent="center"
                                                alignItems="center">

                                                <IconButton disabled={true}>
                                                    <HomeRepairServiceIcon sx={{ fontSize: 50, color: green[500] }} color='action' />

                                                </IconButton>
                                                <Typography variant='subtitle2'><strong>Service</strong></Typography>

                                            </Stack>
                                        </CardActionArea>
                                    </Card>
                                </Grid>

                            </Grid>
                        </Stack>
                    </Container>
                </Box>
            </Menu>
        </div >
    )
}
