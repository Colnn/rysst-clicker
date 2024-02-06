import { Box, Grid } from "@mui/material"
import useStyle from './style'
import Clicker from "./Clicker";
import Display from "./Display";
import Shop from "./Shop";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

let data = {
  'grains': 0,
  'shop': [] as ShopItem[],
  'upgrades': [] as UpgradeItem[],
};

const defaultShopItems: ShopItem[] = [
  { id: 0, name: 'Developer', amount: 0, price: 15 },
];

const defaultShopUpgrades: UpgradeItem[] = [
  { id: 0, name: 'React Course', unlocked: false, price: 50 },
];

interface ShopItem {
  id: number,
  name: string,
  amount: number,
  price: number,
}

interface UpgradeItem {
  id: number,
  name: string,
  unlocked: boolean,
  price: number,
}

export default function Game() {
  const classes = useStyle();

  const [grains, setGrains] = useState(0);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [upgradeItems, setUpgradeItems] = useState<UpgradeItem[]>([]);
  const [shouldSell, setShouldSell] = useState(false);
  const [buyAmount, setBuyAmount] = useState(1);

  const onClick = () => {
      setGrains(grains + 1);
  }

  const buyShopItem = (id: number) => {
    const newShopItems = [...shopItems];
    setGrains(grains - (newShopItems[id].price * buyAmount));
    newShopItems[id].amount += buyAmount;
    for (let index = 0; index < buyAmount; index++) {
      newShopItems[id].price = Math.round(newShopItems[id].price * 1.15);
    }
    console.log("Bought: " + newShopItems[id].name);
    setShopItems(newShopItems);
  }

  const buyUpgrade = (id: number) => {
    const newUpgradeItems = [...upgradeItems];
    setGrains(grains - newUpgradeItems[id].price);
    newUpgradeItems[id].unlocked = true;
    console.log("Bought: " + newUpgradeItems[id].name);
    setUpgradeItems(newUpgradeItems);
  }

  const saveData = () => {
    data.grains = grains;
    data.shop = shopItems;
    data.upgrades = upgradeItems;
    localStorage.setItem("data", btoa(JSON.stringify(data)));
    enqueueSnackbar('Saved data', {
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });
  }

  const loadData = () => {
    // @ts-expect-error | The not-null check is right in front of it, TypeScript is just being autistic
    if(localStorage.getItem("data")) data = JSON.parse(atob(localStorage.getItem("data")));
    console.log(data);
    setGrains(data.grains);
    if(data.shop.length < 1) data.shop = defaultShopItems;
    setShopItems(data.shop);
    if(data.upgrades.length < 1) data.upgrades = defaultShopUpgrades;
    setUpgradeItems(data.upgrades);
  }

  const wipeData = () => {
    localStorage.removeItem("data");
    location.reload();
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      saveData();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
        <Grid>
          <Box className={classes.header}>
            {/* <Header/> */}
            <button onClick={saveData}>Save</button>
            <button onClick={loadData}>Load</button>
            <button onClick={wipeData}>Wipe</button>
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
              <Shop grains={grains} shopData={shopItems} upgradeData={upgradeItems} handleShopBuy={buyShopItem} handleUpgradeBuy={buyUpgrade} shouldSell={shouldSell} setShouldSell={setShouldSell} buyAmount={buyAmount} setBuyAmount={setBuyAmount}/>
            </Box>
          </Grid>
        </Grid>
    </>
  )
}
