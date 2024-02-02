import { Box, Grid } from "@mui/material"
import useStyle from './style'
import Clicker from "./Clicker";
import Display from "./Display";
import Shop from "./Shop";
import Header from "./Components/Header";
import { useState } from "react";

export default function Game() {
  const classes = useStyle();

  const [grains, setGrains] = useState(0);

  const onClick = () => {
      setGrains(grains + 1);
  }

  return (
    <>
        <Grid>
          <Box className={classes.header}>
            <Header/>
          </Box>
          <Grid 
            className={classes.container}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box className={classes.displayContainer}>
              <Clicker onClick={onClick} grains={grains}/>
            </Box>
            <Box className={classes.displayContainer}>
              <Display/>
            </Box>
            <Box className={classes.displayContainer}>
              <Shop/>
            </Box>
          </Grid>
        </Grid>
    </>
  )
}
