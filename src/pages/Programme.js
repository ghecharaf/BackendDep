import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,

    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { makeStyles } from "@material-ui/styles";

import axiosInstance from '../Axios/axios';
//import { useHistory } from 'react-router';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import ReactExport from 'react-data-export';


import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

import { useLocation, useNavigate } from "react-router";

import image from "./Login/alger.jpg"

const useStyles = makeStyles((theme) => ({
    Container: {
        paddingBottom: "3vh",
        marginTop: "3vh",
    },
    TableRow: {
        "&:hover": {
            background: "rgb(11, 255, 171)",
        },
        maxHeight: '1vh'
    },
    TableHead: {
        background: "#009be5",
        opacity: "0.9",
    },
}));

export default function PubEtProgramme(props) {


    const location = useLocation()
    const jour = location.state.jour
    const chaine = location.state.chaine


    const [programme, setProgramme] = useState();


    const [editProg, setEditProg] = useState({});


    let navigate = useNavigate()


    const getProgramme = () => {
        axiosInstance
            .get("api/tableprogrammeclient/", {
                params: {
                    id: jour.id
                }
            })
            .then(function (response) {
                setProgramme(response.data)
            })
            .catch(function (error) { });
    }


    useEffect(() => {
        getProgramme();
    }, []);

    useEffect(() => {
        ExoprtToExcel();
    }, [programme]);

    const styles = useStyles();

    const [openProg, setOpenProg] = React.useState(false);

    const handleClickOpenProg = () => {
        setOpenProg(true);
    };

    const [ExcelData, setExcelData] = useState([])


    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExoprtToExcel = () => {


        let row = []
        var c = [
            { value: '', style: { border: { left: { style: "thick", color: { rgb: "000000" } }, top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
            { value: 'PromediaConseils', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "35", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
            { value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
            { value: '', style: { border: { top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
            { value: '', style: { border: { right: { style: "thick", color: { rgb: "000000" } }, top: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
        ]

        row.push(c)


        c = [
            { value: jour.nom_chaine, style: { border: { left: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
            { value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
            { value: '', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
            { value: '', style: { alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
            { value: jour.date, style: { border: { right: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "ffffff" } } } },
        ]

        row.push(c)

        c = [
            { value: 'Debut', style: { border: { left: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
            { value: 'Annonceur', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
            { value: 'Message', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
            { value: 'Durée', style: { font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
            { value: 'Ecran', style: { border: { right: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "009be5" } } } },
        ]

        row.push(c)


        for (let i in programme) {
            var color = "90EE90"
            if (programme[i].type == 1) {
                color = "F8F8FF"
            }

            const v = [
                { value: programme[i].debut, style: { border: { left: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
                { value: programme[i].annonceur, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
                { value: programme[i].message, style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
                { value: new Date(programme[i].duree * 1000).toISOString().substr(11, 8), style: { font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
                { value: programme[i].ecran, style: { border: { right: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "15" }, fill: { patternType: "solid", fgColor: { rgb: color } } } },
            ]
            row.push(v)
        }

        c = [
            { value: '', style: { border: { left: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
            { value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "35", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
            { value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
            { value: '', style: { border: { bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, alignment: "center", font: { sz: "18", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
            { value: '', style: { border: { right: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } }, bottom: { style: "thick", color: { rgb: "000000" } } }, font: { sz: "24", bold: true }, fill: { patternType: "solid", fgColor: { rgb: "FFEFD5" } } } },
        ]

        row.push(c)



        const multiDataSet = [
            {
                columns: [
                    {
                        title: '', width: { wpx: 200 }
                    },
                    { title: "", width: { wpx: 350 } },
                    { title: "", width: { wpx: 200 } },
                    { title: "", width: { wpx: 200 } },
                    { title: "", width: { wpx: 200 } },
                ],
                data: row
            }
        ];


        setExcelData(multiDataSet)
    }




    //let history = useHistory();


    return (
        <Container style={{ paddingTop: '4vh' }}>
            <Stack spacing={2}>
                <div>
                    <ExcelFile element={<Button variant="contained">Télécharger le planning du jour</Button>}>
                        <ExcelSheet dataSet={ExcelData} name="Organization" />
                    </ExcelFile>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>

                            <TableRow className={styles.TableHead}>
                                <TableCell align="center" style={{ color: "white" }}>
                                    Debut
                                </TableCell>
                                <TableCell align="center" style={{ color: "white" }}>
                                    Annonceur
                                </TableCell>
                                <TableCell align="center" style={{ color: "white" }}>
                                    Message
                                </TableCell>

                                <TableCell align="center" style={{ color: "white" }}>
                                    Duree
                                </TableCell>
                                <TableCell align="center" style={{ color: "white" }}>
                                    Ecran
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {programme ? programme.map((row) => (
                                <TableRow
                                    className={styles.TableRow}
                                    key={row.Nom}
                                    onClick={() => {
                                        if (row.type == 1) {
                                            setEditProg(row);
                                            handleClickOpenProg();
                                        }
                                        else {
                                            navigate('/videoinfo', {
                                                state: {
                                                    video: row,
                                                    jour: location.state.jour
                                                },
                                            });
                                        }
                                    }}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 }, bgcolor: row.type == 2 ? "rgb(193, 255, 171)" : "white", }}
                                >


                                    <TableCell align="center">
                                        {row.debut}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.annonceur}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.message}
                                    </TableCell>
                                    <TableCell align="center">

                                        {
                                            new Date(row.duree * 1000).toISOString().substr(11, 8)
                                        }
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.ecran}
                                    </TableCell>
                                </TableRow>
                            )) : <div></div>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>

        </Container>

    )
}
