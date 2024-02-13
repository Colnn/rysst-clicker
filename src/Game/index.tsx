import { Box, Grid } from '@mui/material';
import useStyle from './style';
import Clicker from './Clicker';
import Display from './Display';
import Shop from './Shop';
import { useEffect, useRef, useState } from 'react';
import prettyNumber from '../prettyNumber';
import { enqueueSnackbar } from 'notistack';

interface ShopItemData {
  i: number;
  a: number;
}

interface UpgradeItemData {
  i: number;
  u: boolean;
}

let data = {
  g: 0,
  s: [] as ShopItemData[],
  u: [] as UpgradeItemData[],
  cs: 0,
};

const defaultShopItems: ShopItem[] = [
  { id: 0, name: 'Developer', amount: 0, price: 15 },
];

const defaultShopUpgrades: UpgradeItem[] = [
  { id: 0, name: 'React Course', unlocked: false, price: 50 },
];

interface ShopItem {
  id: number;
  name: string;
  amount: number;
  price: number;
}

interface UpgradeItem {
  id: number;
  name: string;
  unlocked: boolean;
  price: number;
}

export default function Game() {
  const classes = useStyle();

  const [grains, setGrains] = useState(0);
  const [shopItems, setShopItems] = useState<ShopItem[]>(defaultShopItems);
  const [upgradeItems, setUpgradeItems] =
    useState<UpgradeItem[]>(defaultShopUpgrades);
  const [shouldSell, setShouldSell] = useState(false);
  const [buyAmount, setBuyAmount] = useState(1);
  const grainsRef = useRef(grains);
  const shopItemsRef = useRef(shopItems);
  const upgradeItemsRef = useRef(upgradeItems);

  const onClick = () => {
    setGrains(grains + 1);
  };

  useEffect(() => {
    grainsRef.current = grains;
  }, [grains]);
  useEffect(() => {
    shopItemsRef.current = shopItems;
  }, [shopItems]);
  useEffect(() => {
    upgradeItemsRef.current = upgradeItems;
  }, [upgradeItems]);

  const buyShopItem = (id: number) => {
    const newShopItems = [...shopItems];
    if (shouldSell) {
      for (let index = 0; index < buyAmount; index++) {
        setGrains(grains + newShopItems[id].price);
        newShopItems[id].amount -= 1;
        newShopItems[id].price = Math.round(newShopItems[id].price / 1.15);
        console.log('Sold: ' + newShopItems[id].name);
        setShopItems(newShopItems);
      }
    } else {
      for (let index = 0; index < buyAmount; index++) {
        setGrains(grains - newShopItems[id].price);
        newShopItems[id].amount += 1;
        newShopItems[id].price = Math.round(newShopItems[id].price * 1.15);
        console.log('Bought: ' + newShopItems[id].name);
        setShopItems(newShopItems);
      }
    }
  };

  const buyUpgrade = (id: number) => {
    const newUpgradeItems = [...upgradeItems];
    setGrains(grains - newUpgradeItems[id].price);
    newUpgradeItems[id].unlocked = true;
    console.log('Bought: ' + newUpgradeItems[id].name);
    setUpgradeItems(newUpgradeItems);
  };

  const saveData = () => {
    data.g = grainsRef.current;
    data.s = [];
    data.u = [];
    data.cs = 0;
    shopItems.forEach((shopItem) => {
      if (shopItem.amount > 0) {
        const newShopItemData = {
          i: shopItem.id,
          a: shopItem.amount,
        };
        data.s.push(newShopItemData);
      }
    });
    upgradeItems.forEach((upgradeItem) => {
      if (upgradeItem.unlocked) {
        const newUpgradeItemData = {
          i: upgradeItem.id,
          u: upgradeItem.unlocked,
        };
        data.u.push(newUpgradeItemData);
      }
    });
    const saveData = JSON.stringify(data);
    data.cs = saveData.length;
    localStorage.setItem('data', btoa(JSON.stringify(data)));
    enqueueSnackbar('Saved game data.', {autoHideDuration: 2000, anchorOrigin: {horizontal: 'right', vertical: 'bottom'}});
  };

  const checkSumFailed = () => {
    enqueueSnackbar('Unable to load your save data, it appears to be corrupted.', {variant: 'error', persist: true});
  }

  const checkData = (saveData: string) => {
    const parsedData = JSON.parse(saveData);
    console.log(saveData);
    // Little checksum
    console.log(saveData.length);
    console.log(parsedData.cs);
    saveData = saveData.replace(',"cs":' + parsedData.cs, ',"cs":0');
    if(saveData.length != parsedData.cs) {
      checkSumFailed();
      return false;
    } else {
      return true;
    }
  }

  const loadData = () => {
    if (localStorage.getItem('data')) {
      // @ts-expect-error | The not-null check is right in front of it, TypeScript is just being autistic
      const saveData = atob(localStorage.getItem('data'));
      if(checkData(saveData)) data = JSON.parse(saveData);
      else return;
    }
    else return;
    console.log(data);

    setGrains(data.g);
    grainsRef.current = data.g;
    const newShopItems = [...defaultShopItems];
    data.s.forEach((shopItem) => {
      if (newShopItems[shopItem.i]) {
        newShopItems[shopItem.i].amount = shopItem.a;
        for (let index = 0; index < shopItem.a; index++) {
          newShopItems[shopItem.i].price = Math.round(
            newShopItems[shopItem.i].price * 1.15,
          );
        }
      }
    });
    setShopItems(newShopItems);
    const newUpgradeItems = [...defaultShopUpgrades];
    data.u.forEach((upgradeItem) => {
      if (newUpgradeItems[upgradeItem.i])
        newUpgradeItems[upgradeItem.i].unlocked = upgradeItem.u;
    });
    setUpgradeItems(newUpgradeItems);

    startGame();
  };

  const startGame = () => {
    setInterval(() => {
      saveData();
    }, 60000);

    setInterval(() => {
      document.title = prettyNumber(grainsRef.current, 3) + ' grains | RYSST Clicker';
    }, 2500);

    window.onbeforeunload = () => {
      saveData();
    }
  }

  const wipeData = () => {
    localStorage.removeItem('data');
    location.reload();
  };

  useEffect(() => {
    loadData();
  }, []);

  // useEffect(() => {
  //   saveData();
  // }, [saved]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSaved(saved => saved + 1);
  //   }, 60000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);



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
          <Box className={classes.clickerContainer}>
            <Clicker onClick={onClick} grains={grains} />
          </Box>
          <Box className={classes.displayContainer}>
            <Display shopData={shopItems} />
          </Box>
          <Box className={classes.shopContainer}>
            <Shop
              grains={grains}
              shopData={shopItems}
              upgradeData={upgradeItems}
              handleShopBuy={buyShopItem}
              handleUpgradeBuy={buyUpgrade}
              shouldSell={shouldSell}
              setShouldSell={setShouldSell}
              buyAmount={buyAmount}
              setBuyAmount={setBuyAmount}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
