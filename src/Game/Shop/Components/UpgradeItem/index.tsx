import {
  Box,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from '@mui/material';
import useStyle from './style';
import UpgradeTooltip from '../UpgradeTooltip';

interface UpgradeItemProps {
  upgrade: UpgradeItem;
  icon: string;
  handleClick: (id: number) => void;
  disabled: boolean;
  itemName: string;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: theme.typography.pxToRem(12),
    backgroundColor: 'transparent',
    backgroundImage: 'url("/upgrade-tooltip-background.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    imageRendering: 'pixelated',
  },
}));

export default function UpgradeItem({
  upgrade,
  icon,
  handleClick,
  disabled,
  itemName,
}: UpgradeItemProps) {
  const classes = useStyle();

  const onClick = () => {
    if (!disabled) handleClick(upgrade.id);
  };

  return (
    <>
      <HtmlTooltip
        title={
          <UpgradeTooltip
            upgrade={upgrade}
            icon={icon}
            disabled={disabled}
            itemName={itemName}
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
          <Box
            className={classes.icon}
            component={'img'}
            src={icon}
            draggable={false}
          />
        </Box>
      </HtmlTooltip>
    </>
  );
}
