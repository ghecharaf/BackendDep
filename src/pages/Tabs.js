import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList'
import { AppBar, Tab } from '@mui/material'
import React, { useEffect } from 'react'

export default function Tabs(props) {

    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
        sessionStorage.setItem("active", parseInt(newValue))
        setValue(parseInt(newValue));
    };

    useEffect(() => {
        const v = sessionStorage.getItem("active")
        if (v) {
            setValue(parseInt(v));
        }
    }, [])

    return (
        <div>
            <TabContext value={value}>
                <AppBar
                    component="div"
                    position="static"
                    elevation={0}
                    sx={{ zIndex: 0 }}
                >
                    <TabList value={value} defaultValue={value} onChange={handleChange} textColor="inherit">
                        <Tab label="Revue de press" value={1} />
                        <Tab label="Suivie des panneaux" value={2} />
                        <Tab label="Suivie des chaines télévisionaires" value={3} />
                        <Tab label="Suivie des radios" value={4} />
                    </TabList>
                </AppBar>
                {props.children}
            </TabContext>
        </div>

    )
}
