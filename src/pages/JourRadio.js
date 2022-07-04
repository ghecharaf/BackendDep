
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import axiosInstance from '../Axios/axios';
//import { useHistory } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import { MdVerified, MdOutlineDoNotDisturbOn } from 'react-icons/md'
import { makeStyles } from '@material-ui/styles';
import { useLocation, useNavigate } from "react-router";

//oussama
const useStyles = makeStyles((theme) => ({
    Container: {
        paddingBottom: "3vh",
        marginTop: "3vh",
    },
    TableRow: {
        "&:hover": {
            background: "#ededed",
        },
    },
    TableHead: {
        background: "#4D35E4",
        opacity: "0.9",
    },
}));



const columns = [
    {
        field: 'date', headerName: 'Date', width: 900,
        headerAlign: 'center',
        align: 'center',
        renderCell: (cell) => {
            return (
                <Container>
                    <Typography variant='h6'>
                        {cell.value}
                    </Typography>

                </Container>

            );
        }
    },
];

export default function JourRadio(props) {


    const [jour, setJour] = React.useState([]);


    const location = useLocation()
    const idChaine = location.state.detail.id
    const nomChaine = location.state.detail.nom


    const [permission, setPermission] = React.useState(false);


    //const history = useHistory();
    React.useEffect(() => {
        axiosInstance.get('api/jourradioclient/', {
            params: {
                id: idChaine
            }
        }).then((response) => {
            setJour(response.data);
            setPermission(true);
        }).catch(() => {
            setPermission(false);
            //history.push('/authorisation');
        })
    }, []);

    let navigate = useNavigate()




    const styles = useStyles();
    return (
        <Container>
            <Card style={{
                marginTop: '3vh',
                paddingBottom: '5vh',
                marginBottom: '5vh',
            }}>
                <Container style={{ height: 500, paddingTop: '4vh' }}>
                    <DataGrid
                        rows={jour}
                        columns={columns}
                        pageSize={7}
                        onCellClick={(cell) => {
                            navigate('/programmeradio', {
                                state: {
                                    jour: cell.row,
                                    chaine: idChaine
                                },
                            });
                        }}
                    />

                </Container>

            </Card>
        </Container>
    );
}
