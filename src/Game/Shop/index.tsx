import { Box, Grid, Typography } from '@mui/material';
import useStyle from './style';
import ShopItem from './Components/ShopItem';
import UpgradeItem from './Components/UpgradeItem';
import SettingsBar from './Components/SettingsBar';

interface ShopProps {
  grains: number;
  shopData: ShopItem[];
  upgradeData: UpgradeItem[];
  handleShopBuy: (id: number) => void;
  handleUpgradeBuy: (id: number) => void;
  shouldSell: boolean;
  setShouldSell: (shouldSell: boolean) => void;
  buyAmount: number;
  setBuyAmount: (buyAmount: number) => void;
}

export default function Shop({
  grains,
  shopData,
  upgradeData,
  handleShopBuy,
  handleUpgradeBuy,
  shouldSell,
  setShouldSell,
  buyAmount,
  setBuyAmount,
}: ShopProps) {
  const classes = useStyle();

  const calculatePrice = (price: number) => {
    let totalPrice = 0;
    for (let index = 0; index < buyAmount; index++) {
      if (shouldSell) price = Math.round(price / 1.2);
      totalPrice += price;
      price = shouldSell ? Math.round(price / 1.15) : Math.round(price * 1.15);
    }
    return totalPrice;
  };

  return (
    <>
      <Grid container direction={'column'} className={classes.container}>
        <Box className={classes.header}>
          <Typography variant="h4">Shop</Typography>
        </Box>
        <Box className={classes.upgradesContainer}>
          {/* Upgrades here */}
          {upgradeData.map((upgrade) => {
            if (!upgrade.unlocked)
              return (
                <UpgradeItem
                  upgrade={upgrade}
                  icon={
                    '/' + upgrade.name.toLowerCase().replace(/ /g, '_') + '.png'
                  }
                  handleClick={handleUpgradeBuy}
                  disabled={upgrade.price > grains}
                  itemName={
                    shopData.map((item) => item.name)[upgrade.shopItemID]
                  }
                />
              );
          })}
        </Box>
        <Box>
          <SettingsBar
            action={shouldSell}
            setAction={setShouldSell}
            buyAmount={buyAmount}
            setBuyAmount={setBuyAmount}
          />
          <Grid
            container
            direction={'row'}
            className={classes.shopItemsContainer}
          >
            {shopData.map((item) => {
              const disabled = shouldSell
                ? item.amount < buyAmount
                : item.price * buyAmount > grains;
              return (
                <ShopItem
                  shopItem={item}
                  price={calculatePrice(item.price)}
                  icon={
                    '/' + item.name.toLowerCase().replace(' ', '_') + '.png'
                  }
                  amount={item.amount}
                  buyAmount={buyAmount}
                  handleClick={handleShopBuy}
                  disabled={disabled}
                />
              );
            })}
          </Grid>
        </Box>
      </Grid>
    </>
  );
}
