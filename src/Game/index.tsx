import { Box, Grid } from "@mui/material"
import useStyle from './style'
import Clicker from "./Clicker";
import Display from "./Display";
import Shop from "./Shop";
import Header from "./Components/Header";

export default function Game() {
  const classes = useStyle();

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
              <Clicker/>
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
