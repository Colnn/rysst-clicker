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
import prettyNumber from '../../../../prettyNumber';
import GrainsIndicator from '../../../Components/GrainsIndicator';

interface ShopItemProps {
  id: number;
  name: string;
  icon: string;
  price: number;
  amount: number;
  buyAmount: number;
  handleClick: (id: number) => void;
  disabled: boolean;
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

export default function ShopItem({
  id,
  name,
  icon,
  price,
  amount,
  buyAmount,
  handleClick,
  disabled,
}: ShopItemProps) {
  const classes = useStyle();

  const onClick = () => {
    if (!disabled) handleClick(id);
  };

  return (
    <>
      <HtmlTooltip
        title={
          <ShopTooltip
            name={name}
            icon={icon}
            amount={amount}
            price={price}
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
              <Typography variant="h6">{name}</Typography>
              <Grid container direction={'row'} alignItems={'flex-end'} wrap={'nowrap'}>
                <Typography className={classes.buyAmount} fontWeight={600}>
                  x{buyAmount}
                </Typography>
                <GrainsIndicator variant={disabled ? "priceRed" : "priceGreen"} value={price} precision={3}/>
              </Grid>
            </Grid>
          </Box>
          <Typography
            fontSize={100}
            fontWeight={700}
            lineHeight={1}
            className={classes.amount}
          >
            {amount}
          </Typography>
        </Box>
      </HtmlTooltip>
    </>
  );
}
