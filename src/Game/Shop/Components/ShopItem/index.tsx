import {
  Box,
  Grid,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from '@mui/material';
import useStyle from './style';
import ShopTooltip from '../ShopTooltip';
import GrainsIndicator from '../../../Components/GrainsIndicator';

interface ShopItemProps {
  shopItem: ShopItem;
  icon: string;
  price: number;
  gps: number;
  amount: number;
  buyAmount: number;
  handleClick: (id: number) => void;
  disabled: boolean;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: theme.typography.pxToRem(12),
    backgroundColor: 'transparent',
    backgroundImage: 'url("/tooltip-background.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    imageRendering: 'pixelated',
  },
}));

export default function ShopItem({
  shopItem,
  icon,
  price,
  gps,
  amount,
  buyAmount,
  handleClick,
  disabled,
}: ShopItemProps) {
  const classes = useStyle();

  const onClick = () => {
    if (!disabled) handleClick(shopItem.id);
  };

  return (
    <>
      <HtmlTooltip
        title={
          <ShopTooltip
            shopItem={shopItem}
            icon={icon}
            gps={gps}
            amount={amount}
            disabled={disabled}
          />
        }
        placement="left"
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
          className={disabled ? classes.disabled : classes.container}
          onClick={onClick}
        >
          <Box className={classes.partContainer}>
            <Box
              component={'img'}
              src={icon}
              draggable={false}
              className={classes.icon}
            />
            <Grid container>
              <Typography variant="h6">{shopItem.name}</Typography>
              <Grid
                container
                direction={'row'}
                alignItems={'flex-end'}
                wrap={'nowrap'}
              >
                <Typography className={classes.buyAmount} fontWeight={600}>
                  x{buyAmount}
                </Typography>
                <GrainsIndicator
                  variant={disabled ? 'priceRed' : 'priceGreen'}
                  value={price}
                  precision={3}
                />
              </Grid>
            </Grid>
          </Box>
          {/* Tends to clip outside of page */}
          {/* <Typography
            fontSize={100}
            fontWeight={700}
            lineHeight={1}
            className={classes.amount}
          >
            {amount}
          </Typography> */}
        </Box>
      </HtmlTooltip>
    </>
  );
}
