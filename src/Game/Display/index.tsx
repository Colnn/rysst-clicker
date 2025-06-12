import {
  Box,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from '@mui/material';
import useStyle from './style';
import MotivationalTexts from './Components/MotivationalTexts';
import ShopObjectDisplay from './Components/ShopObjectDisplay';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import GrainsIndicator from '../Components/GrainsIndicator';
import UpgradeTooltip from '../Shop/Components/UpgradeTooltip';
import Seperator from '../Components/Seperator';

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
  shopItemID: number;
  action: string;
  value: number;
  description: string;
}

interface Options {
  backgroundGrainsEnabled: boolean;
}

interface DisplayProps {
  shopData: ShopItem[];
  upgradeData: UpgradeItem[];
  spentGrains: number;
  collectedGrains: number;
  dateStarted: DateTime;
  saveData: () => void;
  wipeData: () => void;
  options: Options;
  setOptions: (options: Options) => void;
  gamePhase: number;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: theme.typography.pxToRem(12),
  },
}));

export default function Display({
  shopData,
  upgradeData,
  spentGrains,
  collectedGrains,
  dateStarted,
  saveData,
  wipeData,
  options,
  setOptions,
  gamePhase,
}: DisplayProps) {
  const classes = useStyle();

  const [page, setPage] = useState(0);
  const [backgroundGrainsEnabled, setBackgroundParticlesEnabled] = useState(
    options.backgroundGrainsEnabled,
  );

  // @ts-expect-error | Event is required
  const changePage = (event: React.MouseEvent<HTMLElement>, page: number) => {
    if (!page) setPage(0);
    else setPage(page);
  };

  const toggleBackgroundParticles = () => {
    setBackgroundParticlesEnabled((value) => !value);
  };

  useEffect(() => {
    const newOptions = { ...options };
    newOptions.backgroundGrainsEnabled = backgroundGrainsEnabled;
    setOptions(newOptions);
  }, [backgroundGrainsEnabled]);

  return (
    <>
      <Grid
        container
        className={classes.container}
        direction={'row'}
        wrap={'nowrap'}
      >
        <Grid className={classes.innerContainer}>
          <ToggleButtonGroup
            className={classes.topContainer}
            value={page}
            onChange={changePage}
            exclusive
          >
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
              <MotivationalTexts gamePhase={gamePhase}/>
              <Grid className={classes.options}>
                <ToggleButton value={2} fullWidth>
                  Options
                </ToggleButton>
              </Grid>
            </Grid>
          </ToggleButtonGroup>
          <Seperator direction={'horizontal'} />
          {page == 0 &&
            shopData.map((item) => {
              return (
                <ShopObjectDisplay
                  key={item.name}
                  amount={item.amount}
                  objectName={item.name}
                />
              );
            })}
          {page == 1 && (
            <Grid container direction={'column'}>
              <Grid container direction={'column'}>
                <Box className={classes.statsHeader}>
                  <Typography variant="h5">General</Typography>
                </Box>
                <Grid
                  container
                  direction={'row'}
                  alignItems={'center'}
                  wrap={'nowrap'}
                >
                  <Typography>RYSST-grains sold: </Typography>
                  <GrainsIndicator
                    variant={'default'}
                    value={spentGrains}
                    precision={3}
                  />
                </Grid>
                <Grid
                  container
                  direction={'row'}
                  alignItems={'center'}
                  wrap={'nowrap'}
                >
                  <Typography>RYSST-grains cooked: </Typography>
                  <GrainsIndicator
                    variant={'default'}
                    value={collectedGrains}
                    precision={3}
                  />
                </Grid>
                <Box>
                  Run started: {dateStarted.toFormat('dd-MM-yyyy HH:mm')}
                </Box>
                <Box>RYSST-grains per second: {0}</Box>
                <Box>RYSST-grains per click: {0}</Box>
              </Grid>
              <Grid container direction={'column'}>
                <Box className={classes.statsHeader}>
                  <Typography variant="h5">Upgrades</Typography>
                </Box>
                <Grid container direction={'row'}>
                  {upgradeData.map((upgrade) => {
                    if (!upgrade.unlocked) return;
                    return (
                      <>
                        <HtmlTooltip
                          title={
                            <UpgradeTooltip
                              name={upgrade.name}
                              icon={
                                '/' +
                                upgrade.name.toLowerCase().replace(' ', '_') +
                                '.png'
                              }
                              price={upgrade.price}
                              disabled={false}
                              itemName={shopData[upgrade.shopItemID].name}
                              action={upgrade.action}
                              description={upgrade.description}
                            />
                          }
                          placement="top"
                          slotProps={{
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, -4],
                                  },
                                },
                              ],
                            },
                          }}
                        >
                          <Box className={classes.upgradeContainer}>
                            <Box
                              className={classes.icon}
                              component={'img'}
                              src={
                                '/' +
                                upgrade.name.toLowerCase().replace(' ', '_') +
                                '.png'
                              }
                              draggable={false}
                            />
                          </Box>
                        </HtmlTooltip>
                      </>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          )}
          {page == 2 && (
            // TODO: Some styling necessary
            <Grid>
              <Grid container direction={'column'}>
                <Grid container direction={'row'} alignItems={'center'}>
                  <button
                    className={
                      classes.importantButton + ' ' + classes.greenButton
                    }
                    onClick={saveData}
                  >
                    Save
                  </button>{' '}
                  <Typography>
                    Save your progress. (This also happens automatically every
                    60 seconds)
                  </Typography>
                </Grid>
                <Grid container direction={'row'} alignItems={'center'}>
                  <button
                    className={
                      classes.importantButton + ' ' + classes.redButton
                    }
                    onClick={wipeData}
                  >
                    Wipe
                  </button>{' '}
                  <Typography>
                    Wipe your save data.{' '}
                    <b>Be careful! You cannot restore this data!</b>
                  </Typography>
                </Grid>
              </Grid>

              <Grid>
                <Box className={classes.statsHeader}>
                  <Typography variant="h5">Options</Typography>
                </Box>
                <Button onClick={toggleBackgroundParticles}>
                  Background particles: {backgroundGrainsEnabled ? 'On' : 'Off'}
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Seperator direction={'vertical'} />
      </Grid>
    </>
  );
}
