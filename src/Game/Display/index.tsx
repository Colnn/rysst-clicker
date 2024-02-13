import { Box, Grid } from '@mui/material';
import useStyle from './style';
import MotivationalTexts from '../Components/motivationalTexts';
import ShopObjectDisplay from '../Components/ShopObjectDisplay';
import { useEffect, useState } from 'react';
import { defaultShopItems } from '..';
import Seperator from '../Components/Seperator';

interface ShopItem {
  id: number;
  name: string;
  amount: number;
  price: number;
}

interface DisplayProps {
  shopData: ShopItem[];
}

export default function Display({ shopData }: DisplayProps) {
  const classes = useStyle();

  return (
    <>
      <Grid container className={classes.container} direction={'row'} wrap={'nowrap'}>
        <Grid className={classes.innerContainer}>
          <MotivationalTexts />
          {shopData.map((item) => {
            return (
              <ShopObjectDisplay
                key={item.name}
                amount={item.amount}
                objectName={item.name}
                backgroundSVG="/rysst_cooker.png"
              />
            );
          })}
        </Grid>
        <Seperator/>
      </Grid>
    </>
  );
}
