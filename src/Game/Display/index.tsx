import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import useStyle from './style';
import MotivationalTexts from './Components/MotivationalTexts';
import ShopObjectDisplay from '../Components/ShopObjectDisplay';
import { useEffect, useState } from 'react';
import { defaultShopItems } from '..';
import { Pageview } from '@mui/icons-material';

interface ShopItem {
  id: number;
  name: string;
  amount: number;
  price: number;
}

interface DisplayProps {
  shopData: ShopItem[];
  spentGrains: number;
  collectedGrains: number;
}

export default function Display({ shopData, spentGrains, collectedGrains }: DisplayProps) {
  const classes = useStyle();

  const [page, setPage] = useState(0);

  const changePage = (
    event: React.MouseEvent<HTMLElement>,
    page: number,
  ) => {
    if(!page) setPage(0);
    else setPage(page);
  }

  return (
    <>
      <Box className={classes.container}>
        <ToggleButtonGroup className={classes.topContainer} value={page} onChange={changePage}>
          <Grid
            className={classes.topContainer}
            container
            direction={'row'}
            justifyContent={'space-between'}
          >
            <Grid className={classes.options}>
              <ToggleButton value={1} fullWidth>
                Stats
              </ToggleButton>
            </Grid>
            <MotivationalTexts />
            <Grid className={classes.options}>
              <ToggleButton value={1} fullWidth>
                Test
              </ToggleButton>
            </Grid>
          </Grid>
        </ToggleButtonGroup>
        {page == 0 &&
          shopData.map((item) => {
            return (
              <ShopObjectDisplay
                key={item.name}
                amount={item.amount}
                objectName={item.name}
                backgroundSVG="/rysst_cooker.png"
              />
            );
          })}
        {page == 1 && (
          <Grid container direction={'column'}>
            <Box>Grains spent: {spentGrains}</Box>
            <Box>Grains collected: {collectedGrains}</Box>
          </Grid>
        )}
      </Box>
    </>
  );
}
