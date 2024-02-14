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

export const defaultShopItems: ShopItem[] = [
  { id: 0, name: 'Developer', amount: 0, price: 15, gps: 1, },
  { id: 1, name: 'Rysst ball', amount: 0, price: 100, gps: 10 },
];

const defaultShopUpgrades: UpgradeItem[] = [
  { id: 0, name: 'React Course', unlocked: false, price: 50, shopItemID: 0, action: 'multiplyGPS', value: 2},
  { id: 1, name: 'React Course', unlocked: false, price: 50, shopItemID: 0, action: 'multiplyGPS', value: 2},
];

interface ShopItem {
  id: number,
  name: string,
  amount: number,
  price: number,
  gps: number,
}

interface UpgradeItem {
  id: number,
  name: string,
  unlocked: boolean,
  price: number,
  shopItemID: number,
  action: string,
  value: any,
}

export default function Game() {
  const classes = useStyle();
  const [grains, setGrains] = useState(0);
  const [grainsPerSecond, setGrainsPerSecond] = useState(0);
  const [grainsPerClick, setGrainsPerClick] = useState(0.01);
  const [shopItems, setShopItems] = useState<ShopItem[]>(defaultShopItems);
  const [upgradeItems, setUpgradeItems] =
    useState<UpgradeItem[]>(defaultShopUpgrades);
  const [shouldSell, setShouldSell] = useState(false);
  const [buyAmount, setBuyAmount] = useState(1);
  const grainsRef = useRef(grains);
  const shopItemsRef = useRef(shopItems);
  const upgradeItemsRef = useRef(upgradeItems);

  const calculateGrainsPerSecond = (newUpgradeItems?: UpgradeItem[], newShopItems?: ShopItem[]) => {
    const upgrades = newUpgradeItems || upgradeItems;
    const buildings = newShopItems || shopItems;
    let totalGPS = 0;

    console.log("totalGPS:")
    console.log(totalGPS)

    for(let i = 0; i < buildings.length; i++) {
      let tempGPS = 0;
      tempGPS = buildings[i].gps * buildings[i].amount;
      console.log("tempGPS:")
      console.log(tempGPS)
      for(let j = 0; j < upgrades.length; j++) {
        const upgrade = upgrades[j];
        if(upgrade.unlocked) {
          if(upgrade.shopItemID == i) {
            tempGPS = upgrade.value * tempGPS;
          }
        }
        console.log("tempGPS:")
        console.log(tempGPS)
      }
      totalGPS += tempGPS;
    }

    console.log("totalGPS:")
    console.log(totalGPS)
    
    setGrainsPerSecond(totalGPS);
  }

  const onClick = () => {
      setGrains(grains + ((Math.round(grainsPerSecond * grainsPerClick)) === 0 ? 1 : (Math.round(grainsPerSecond * grainsPerClick))));
  }

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
    let newGrains = grains;
    if(shouldSell) {
      for (let index = 0; index < buyAmount; index++) {
        console.log(buyAmount);
        newGrains += newShopItems[id].price;
        newShopItems[id].amount -= 1;
        newShopItems[id].price = Math.round(newShopItems[id].price / 1.15);
        console.log('Sold: ' + newShopItems[id].name);
        setShopItems(newShopItems);
      }
    } else {
      for (let index = 0; index < buyAmount; index++) {
        console.log("kut ding");
        console.log(newShopItems[id].price);
        newGrains -= newShopItems[id].price;
        newShopItems[id].amount += 1;
        newShopItems[id].price = Math.round(newShopItems[id].price * 1.15);
        console.log('Bought: ' + newShopItems[id].name);
        setShopItems(newShopItems);
        console.log(shopItems)
      }
    }
    calculateGrainsPerSecond(upgradeItems, newShopItems);
    setGrains(newGrains);
  }

  const buyUpgrade = (id: number) => {
    const newUpgradeItems = [...upgradeItems];
    setGrains(grains - newUpgradeItems[id].price);
    newUpgradeItems[id].unlocked = true;
    console.log('Bought: ' + newUpgradeItems[id].name);
    setUpgradeItems(newUpgradeItems);
    calculateGrainsPerSecond(newUpgradeItems)
  }

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
    let totalGPS = 0;
    for(let i = 0; i < newShopItems.length; i++) {
      totalGPS = totalGPS + (shopItems[i].gps * shopItems[i].amount)
    }
    setGrainsPerSecond(totalGPS)
    console.log(shopItems)

    startGame();

    calculateGrainsPerSecond(newUpgradeItems, newShopItems);
  };

  const startGame = () => {
    setInterval(() => {
      saveData();
    }, 60000);

    setInterval(() => {
      document.title = prettyNumber(grainsRef.current, 3) + ' grains | RYSST Clicker';
    }, 2500);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setGrains(prevGrains => prevGrains + grainsPerSecond);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [grainsPerSecond]);

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
            <Clicker onClick={onClick} grains={grains} gps={grainsPerSecond}/>
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
