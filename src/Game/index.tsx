import { Box, Grid } from '@mui/material';
import useStyle from './style';
import Clicker from './Clicker';
import Display from './Display';
import Shop from './Shop';
import { useEffect, useRef, useState } from 'react';
import prettyNumber from '../prettyNumber';
import { Autosave, useAutosave } from 'react-autosave';
import { enqueueSnackbar } from 'notistack';
import {DateTime} from 'luxon';

interface ShopItemData {
  // ID
  i: number;
  // Amount
  a: number;
}

interface UpgradeItemData {
  // ID
  i: number;
  // Unlocked
  u: boolean;
}

let data = {
  // Grains
  g: 0,
  // Shop items
  si: [] as ShopItemData[],
  // Upgrades
  u: [] as UpgradeItemData[],
  // Spent Grains
  s: 0,
  // Collected Grains
  c: 0,
  // Checksum
  cs: 0,
  // Date started
  d: 0,
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
  const [collectedGrains, setCollectedGrains] = useState(0);
  const [spentGrains, setSpentGrains] = useState(0);
  const [shopItems, setShopItems] = useState<ShopItem[]>(defaultShopItems);
  const [upgradeItems, setUpgradeItems] =
    useState<UpgradeItem[]>(defaultShopUpgrades);
  const [shouldSell, setShouldSell] = useState(false);
  const [buyAmount, setBuyAmount] = useState(1);
  const [dateStarted, setDateStarted] = useState(DateTime.now());
  const grainsRef = useRef(grains);

  const onClick = () => {
    setGrains(grains + 1);
    setCollectedGrains(collectedGrains + 1);
  };

  useEffect(() => {
    grainsRef.current = grains;
  }, [grains]);

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
        setSpentGrains(spentGrains + newShopItems[id].price);
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
    setSpentGrains(spentGrains + newUpgradeItems[id].price);
    newUpgradeItems[id].unlocked = true;
    console.log('Bought: ' + newUpgradeItems[id].name);
    setUpgradeItems(newUpgradeItems);
  };

  const saveData = () => {
    data.g = grains;
    data.si = [];
    data.u = [];
    data.c = collectedGrains;
    data.s = spentGrains;
    data.d = dateStarted.toSeconds();
    shopItems.forEach((shopItem) => {
      if (shopItem.amount > 0) {
        const newShopItemData = {
          i: shopItem.id,
          a: shopItem.amount,
        };
        data.si.push(newShopItemData);
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
  };

  useAutosave({ data: [grains, shopItems, upgradeItems], onSave: saveData, interval: 60000 });

  const checkSumFailed = () => {
    enqueueSnackbar('Unable to load your save data, it appears to be corrupted.', {variant: 'error', persist: true});
  }

  const checkData = (saveData: string) => {
    const parsedData = JSON.parse(saveData);
    console.log(saveData);
    // Little checksum
    console.log(saveData.length);
    console.log(parsedData.cs);
    if(saveData.length != parsedData.cs) {
      checkSumFailed();
      return false;
    } else {
      return true;
    }
  }

  const loadData = () => {
    let saveData;
    if (localStorage.getItem('data')) {
      // @ts-expect-error | The not-null check is right in front of it, TypeScript is just being autistic
      saveData = atob(localStorage.getItem('data'));
      if(checkData(saveData)) data = JSON.parse(saveData);
      else return;
    }
    else return;
    const parsedData = JSON.parse(saveData);
    console.log(parsedData);

    setGrains(parsedData.g);
    grainsRef.current = parsedData.g;
    setCollectedGrains(parsedData.c);
    setSpentGrains(parsedData.s);
    setDateStarted(DateTime.fromSeconds(parsedData.d));
    console.log(DateTime.fromSeconds(parsedData.d).diffNow().minutes);
    console.log(DateTime.now().toFormat('dd mm yyyy'));
    const newShopItems = [...defaultShopItems];
    parsedData.si.forEach((shopItem: ShopItemData) => {
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
    parsedData.u.forEach((upgradeItem: UpgradeItemData) => {
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
            <Display shopData={shopItems} upgradeData={upgradeItems} spentGrains={spentGrains} collectedGrains={collectedGrains} dateStarted={dateStarted} />
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
        <Autosave data={[grains, shopItems, upgradeItems]} onSave={saveData} interval={60000} />
      </Grid>
    </>
  );
}
