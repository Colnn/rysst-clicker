import { Box, Grid } from '@mui/material';
import useStyle from './style';
import Clicker from './Clicker';
import Display from './Display';
import Shop from './Shop';
import { useEffect, useRef, useState } from 'react';
import prettyNumber from '../prettyNumber';
import { enqueueSnackbar } from 'notistack';
import { DateTime } from 'luxon';
import axios from 'axios';

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
  { id: 0, name: 'Developer', amount: 0, price: 15, gps: 1 },
  { id: 1, name: 'RYSST ball', amount: 0, price: 100, gps: 10 },
];

const defaultShopUpgrades: UpgradeItem[] = [
  {
    id: 0,
    name: 'This is just the beninging...',
    unlocked: false,
    price: 50,
    shopItemID: 0,
    action: 'multiplyGPS',
    value: 2,
    description:
      'Your developers work TWICE as fast.\n"Your developers are now working on actual projects"',
  },
  {
    id: 1,
    name: 'MOOORE Experience!!!',
    unlocked: false,
    price: 50,
    shopItemID: 0,
    action: 'multiplyGPS',
    value: 2,
    description:
      'Your developers work TWICE as fast.\n"Your developers are gaining more and more experience by the day"',
  },
  {
    id: 2,
    name: 'These are a great snack',
    unlocked: false,
    price: 100,
    shopItemID: 1,
    action: 'multiplyGPS',
    value: 2,
    description:
      'These rysst balls are TWICE as efficient.\n"These rysst balls are reallyyy delicious!"',
  },
  // { id: 3, name: ''}
];

const defaultOptions: Options = {
  backgroundGrainsEnabled: true,
};

interface ShopItem {
  id: number;
  name: string;
  amount: number;
  price: number;
  gps: number;
}

interface UpgradeItem {
  id: number;
  name: string;
  unlocked: boolean;
  price: number;
  shopItemID: number;
  action: string;
  value: number;
  description: string;
}

interface Options {
  backgroundGrainsEnabled: boolean;
}

export default function Game() {
  const classes = useStyle();
  const [grains, setGrains] = useState(0);
  const [grainsPerSecond, setGrainsPerSecond] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [grainsPerClick] = useState(0.01);
  const [collectedGrains, setCollectedGrains] = useState(0);
  const [spentGrains, setSpentGrains] = useState(0);
  const [shopItems, setShopItems] = useState<ShopItem[]>(defaultShopItems);
  const [upgradeItems, setUpgradeItems] =
    useState<UpgradeItem[]>(defaultShopUpgrades);
  const [shouldSell, setShouldSell] = useState(false);
  const [buyAmount, setBuyAmount] = useState(1);
  const [dateStarted, setDateStarted] = useState(DateTime.now());
  const [options, setOptions] = useState<Options>(defaultOptions);
  const [gamePhase, setGamePhase] = useState(1);
  const version = 'v0.0.1';

  // Refs
  const grainsRef = useRef(grains);
  const collectedGrainsRef = useRef(collectedGrains);
  const spentGrainsRef = useRef(spentGrains);
  const shopItemsRef = useRef(shopItems);
  const upgradeItemsRef = useRef(upgradeItems);

  const calculateGrainsPerSecond = (
    newUpgradeItems?: UpgradeItem[],
    newShopItems?: ShopItem[],
  ) => {
    const upgrades = newUpgradeItems || upgradeItems;
    const buildings = newShopItems || shopItems;
    let totalGPS = 0;

    for (let i = 0; i < buildings.length; i++) {
      let tempGPS = 0;
      tempGPS = buildings[i].gps * buildings[i].amount;
      for (let j = 0; j < upgrades.length; j++) {
        const upgrade = upgrades[j];
        if (upgrade.unlocked) {
          if (upgrade.shopItemID == i) {
            tempGPS = upgrade.value * tempGPS;
          }
        }
      }
      totalGPS += tempGPS;
    }

    setGrainsPerSecond(totalGPS);
  };

  const onClick = () => {
    const addedGrains =
      Math.round(grainsPerSecond * grainsPerClick) === 0
        ? 1
        : Math.round(grainsPerSecond * grainsPerClick);
    setCollectedGrains(collectedGrains + addedGrains);
    setGrains(grains + addedGrains);
  };

  useEffect(() => {
    grainsRef.current = grains;
    collectedGrainsRef.current = collectedGrains;
    spentGrainsRef.current = spentGrains;
    shopItemsRef.current = shopItems;
    upgradeItemsRef.current = upgradeItems;
  }, [grains, collectedGrains, spentGrains, shopItems, upgradeItems]);

  const buyShopItem = (id: number) => {
    const newShopItems = [...shopItems];
    let newGrains = grains;
    if (shouldSell) {
      for (let index = 0; index < buyAmount; index++) {
        newGrains += newShopItems[id].price;
        newShopItems[id].amount -= 1;
        newShopItems[id].price = Math.round(newShopItems[id].price / 1.15);
        setShopItems(newShopItems);
      }
    } else {
      for (let index = 0; index < buyAmount; index++) {
        newGrains -= newShopItems[id].price;
        setSpentGrains(spentGrains + newShopItems[id].price);
        newShopItems[id].amount += 1;
        newShopItems[id].price = Math.round(newShopItems[id].price * 1.15);
        setShopItems(newShopItems);
      }
    }
    calculateGrainsPerSecond(upgradeItems, newShopItems);
    setGrains(newGrains);
  };

  const buyUpgrade = (id: number) => {
    const newUpgradeItems = [...upgradeItems];
    setGrains(grains - newUpgradeItems[id].price);
    setSpentGrains(spentGrains + newUpgradeItems[id].price);
    newUpgradeItems[id].unlocked = true;
    setUpgradeItems(newUpgradeItems);
    calculateGrainsPerSecond(newUpgradeItems);
  };

  const saveData = () => {
    data.g = grainsRef.current;
    data.si = [];
    data.u = [];
    data.c = collectedGrainsRef.current;
    data.s = spentGrainsRef.current;
    data.d = dateStarted.toSeconds();
    data.cs = 0;
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
    enqueueSnackbar('Saved game data.', {
      autoHideDuration: 2000,
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
    });
  };

  const checkSumFailed = () => {
    enqueueSnackbar(
      'Unable to load your save data, it appears to be corrupted.',
      { variant: 'error', persist: true },
    );
  };

  const checkData = (saveData: string) => {
    const parsedData = JSON.parse(saveData);
    // Little checksum
    saveData = saveData.replace(',"cs":' + parsedData.cs, ',"cs":0');
    if (saveData.length != parsedData.cs) {
      checkSumFailed();
      return false;
    } else {
      return true;
    }
  };

  const checkVersion = async () => {
    const latest = (await axios.get('https://api.github.com/repos/Colnn/rysst-clicker/releases')).data[0];
    if(latest.tag_name != version) {
      console.log("A new version of RYSST Clicker is available! \n Contact the administrator about updating.\n If you're the administrator, check " + latest.url + ".");
      enqueueSnackbar('New version available, check the console.', {
        autoHideDuration: 2000,
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
    }
  }

  const loadData = () => {
    let saveData;
    if (localStorage.getItem('data')) {
      saveData = atob(localStorage.getItem('data'));
      if (checkData(saveData)) data = JSON.parse(saveData);
      else return;
    } else return;
    const parsedData = JSON.parse(saveData);

    setGrains(parsedData.g);
    grainsRef.current = parsedData.g;
    setCollectedGrains(parsedData.c);
    setSpentGrains(parsedData.s);
    setDateStarted(DateTime.fromSeconds(parsedData.d));
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
    let totalGPS = 0;
    for (let i = 0; i < newShopItems.length; i++) {
      totalGPS = totalGPS + shopItems[i].gps * shopItems[i].amount;
    }
    setGrainsPerSecond(totalGPS);
    checkGamePhase();
    calculateGrainsPerSecond(newUpgradeItems, newShopItems);

    checkVersion();

    startGame();
  };

  const checkGamePhase = () => {
    const c = collectedGrainsRef.current;
    if(c >= 1e6) {
      setGamePhase(2);
    } else if(c >= 1e12) {
      setGamePhase(3);
    } else if(c >= 1e24) {
      setGamePhase(4);
    }
  }

  const startGame = () => {
    setInterval(() => {
      saveData();
    }, 60000);

    setInterval(() => {
      document.title =
        prettyNumber(grainsRef.current, 3) + ' grains | RYSST Clicker';
    }, 2500);

    setInterval(() => {
      checkGamePhase();
    }, 180000)

    window.onbeforeunload = () => {
      if (localStorage.getItem('data')) {
        saveData();
      }
    };
  };

  const wipeData = () => {
    localStorage.removeItem('data');
    window.location.reload();
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
      setCollectedGrains((prev) => prev + grainsPerSecond / 10);
      setGrains((prevGrains) => prevGrains + grainsPerSecond / 10);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [grainsPerSecond]);

  return (
    <>
      <Grid>
        <Box className={classes.header}>{/* <Header/> */}</Box>
        <Grid
          className={classes.container}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box className={classes.clickerContainer}>
            <Clicker
              options={options}
              onClick={onClick}
              grains={grains}
              gps={grainsPerSecond}
              gpc={
                Math.round(grainsPerSecond * grainsPerClick) === 0
                  ? 1
                  : Math.round(grainsPerSecond * grainsPerClick)
              }
            />
          </Box>
          <Box className={classes.displayContainer}>
            <Display
              options={options}
              setOptions={setOptions}
              shopData={shopItems}
              upgradeData={upgradeItems}
              spentGrains={spentGrains}
              collectedGrains={collectedGrains}
              dateStarted={dateStarted}
              saveData={saveData}
              wipeData={wipeData}
              gamePhase={gamePhase}
            />
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
