import React from 'react'
import Login from './Login/Login';
import App from './App';
import Content from './Content';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Abonnement from './Abonnement';
import Tabs from './Tabs';
import ArticleAffichage from './ArticleAffichage';
import PubAffichage from './PubAffichage';
import Contract from "./Contrat"
import Info from "./Info"
import VideoInfo from './VideoInfo';
import PubInfo from './PubInfo';
import ArticleLink from './ArticleLink';
import PubLink from './PubLink';
import PageNotFound from './PageNotFound';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Jour from './Jour';
import PubEtProgramme from './Programme';
import Edition from './Edition';
import Articles from './Articles';
import JourRadio from './JourRadio';
import PubEtProgrammeRadio from './ProgrammeRadio';
import AudioInfo from './AudioInfo';
import PubLiciteLink from './PubliciteLink';
import Tv from './Tv';
import JournalPage from './JournalPage';
import Panneau from './Panneau';
import Radio from './Radio';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto'
    }
})
export default function Global() {
    return (
        <ThemeProvider theme={theme}>

            <BrowserRouter>
                <Routes>
                    <Route path="/login" exact element={<Login />} />
                    <Route path="content" exact element={<App> <Content></Content></App>}></Route>
                    <Route path="tv" exact element={<App> <Tv></Tv></App>}></Route>
                    <Route path="journal" exact element={<App> <JournalPage></JournalPage></App>}></Route>
                    <Route path="panneau" exact element={<App> <Panneau></Panneau></App>}></Route>
                    <Route path="radio" exact element={<App> <Radio></Radio></App>}></Route>

                    <Route path="edition" exact element={<App> <Edition></Edition></App>}></Route>
                    <Route path="article" exact element={<App> <Articles></Articles></App>}></Route>
                    <Route path="articleinfo" exact element={<App> <ArticleAffichage></ArticleAffichage></App>}></Route>
                    {/* <Route path="pubinfo" element={<App> <PubAffichage></PubAffichage></App>}></Route>
                 */}<Route path="abonnement" exact element={<App><Abonnement></Abonnement></App>}></Route>
                    <Route path="contract" exact element={<App><Contract></Contract></App>}></Route>
                    <Route path="information" exact element={<App><Info></Info></App>}></Route>

                    <Route path="videoinfo" exact element={<App> <VideoInfo></VideoInfo></App>}></Route>
                    <Route path="jour" exact element={<App> <Jour></Jour></App>}></Route>
                    <Route path="programme" exact element={<App> <PubEtProgramme></PubEtProgramme></App>}></Route>

                    <Route path="jourradio" exact element={<App> <JourRadio></JourRadio></App>}></Route>
                    <Route path="programmeradio" exact element={<App> <PubEtProgrammeRadio></PubEtProgrammeRadio></App>}></Route>
                    <Route path="audioinfo" exact element={<App> <AudioInfo></AudioInfo></App>}></Route>



                    <Route path="pubinfo" exact element={<App> <PubInfo></PubInfo></App>}></Route>
                    <Route path="article/link/:id" exact element={<App> <ArticleLink></ArticleLink></App>}></Route>
                    <Route path="pub/link/:id" exact element={<App> <PubLink></PubLink></App>}></Route>
                    <Route path="publicite/link/:id" exact element={<App> <PubLiciteLink></PubLiciteLink></App>}></Route>
                    <Route path='*' element={<App><PageNotFound></PageNotFound></App>}></Route>

                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}
