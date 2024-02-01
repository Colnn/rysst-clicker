import { Box, Grid } from "@mui/material"
import useStyle from './style'
import Clicker from "./Components/Clicker";
import Display from "./Components/Display";
import Shop from "./Components/Shop";

export default function Game() {
  const classes = useStyle();

  return (
    <>
        <Grid>
          <Box className={classes.header}>

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
