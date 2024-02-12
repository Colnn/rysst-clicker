import { Box, Grid, ToggleButton, ToggleButtonGroup, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from '@mui/material';
import useStyle from './style';
import MotivationalTexts from './Components/MotivationalTexts';
import ShopObjectDisplay from '../Components/ShopObjectDisplay';
import { useState } from 'react';
import { DateTime } from 'luxon';
import GrainsIndicator from '../Components/GrainsIndicator';
import UpgradeTooltip from '../Shop/Components/UpgradeTooltip';

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

interface DisplayProps {
  shopData: ShopItem[];
  upgradeData: UpgradeItem[];
  spentGrains: number;
  collectedGrains: number;
  dateStarted: DateTime;
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

export default function Display({ shopData, upgradeData, spentGrains, collectedGrains, dateStarted }: DisplayProps) {
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
            <Grid container direction={'column'}>
              <Box className={classes.statsHeader}><Typography variant='h5'>General</Typography></Box>
              <Grid container direction={'row'} alignItems={'center'} wrap={'nowrap'}><Typography>RYSST-grains sold: </Typography><GrainsIndicator variant={"default"} value={spentGrains} precision={3}/></Grid>
              <Grid container direction={'row'} alignItems={'center'} wrap={'nowrap'}><Typography>RYSST-grains cooked: </Typography><GrainsIndicator variant={"default"} value={collectedGrains} precision={3}/></Grid>
              <Box>Run started: {dateStarted.toFormat('dd-MM-yyyy HH:mm')}</Box>
              <Box>RYSST-grains per second: {0}</Box>
              <Box>RYSST-grains per click: {0}</Box>
            </Grid>
            <Grid container direction={'column'}>
              <Box className={classes.statsHeader}><Typography variant='h5'>Upgrades</Typography></Box>
              <Grid container direction={'row'}>
                {upgradeData.map((upgrade) => {
                  if(!upgrade.unlocked) return;
                  return (
                    <>
                      <HtmlTooltip
                        title={
                          <UpgradeTooltip
                            name={upgrade.name}
                            icon={'/' + upgrade.name.toLowerCase().replace(' ', '_') + '.png'}
                            price={upgrade.price}
                            disabled={false}
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
                        <Box
                          className={classes.upgradeContainer}
                        >
                          <Box className={classes.icon} component={'img'} src={'/' + upgrade.name.toLowerCase().replace(' ', '_') + '.png'} draggable={false} />
                        </Box>
                      </HtmlTooltip>
                    </>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}
