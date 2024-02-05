import { Box, Grid } from "@mui/material"
import useStyle from './style'
import Clicker from "./Clicker";
import Display from "./Display";
import Shop from "./Shop";
import { useEffect, useState } from "react";

let data = {
  'grains': 0,
  'shop': [] as ShopItem[],
};

const defaultShopItems: ShopItem[] = [
  { id: 0, name: 'Developer', amount: 0, price: 15 }
]

interface ShopItem {
  id: number,
  name: string,
  amount: number,
  price: number,
}

export default function Game() {
  const classes = useStyle();

  const [grains, setGrains] = useState(0);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  const onClick = () => {
      setGrains(grains + 1);
  }

  const shopBuy = (id: number) => {
    const newShopItems = [...shopItems];
    setGrains(grains - newShopItems[id].price);
    newShopItems[id].amount += 1;
    newShopItems[id].price = Math.round(newShopItems[id].price * 1.15);
    console.log("Bought: " + newShopItems[id].name);
    setShopItems(newShopItems);
  }

  const saveData = () => {
    data.grains = grains;
    data.shop = shopItems;
    localStorage.setItem("data", btoa(JSON.stringify(data)));
  }

  const loadData = () => {
    if(localStorage.getItem("data")) data = JSON.parse(atob(localStorage.getItem("data")));
    console.log(data);
    setGrains(data.grains);
    if(data.shop.length < 1) data.shop = defaultShopItems;
    setShopItems(data.shop);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
        <Grid>
          <Box className={classes.header}>
            {/* <Header/> */}
            <button onClick={saveData}>Save</button>
            <button onClick={loadData}>Load</button>
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
              <Shop grains={grains} shopData={shopItems} handleBuy={shopBuy}/>
            </Box>
          </Grid>
        </Grid>
    </>
  )
}
