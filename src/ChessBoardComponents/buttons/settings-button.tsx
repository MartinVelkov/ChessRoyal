import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import GradientIcon from '@mui/icons-material/Gradient';
import MenuSimple from './poper'; // Import the component you want to trigger
import SettingsIcon from '@mui/icons-material/Settings';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
}));

interface Action {
  icon: JSX.Element;
  name: string;
  onClick: () => void;
}

// Function to handle the action when the SpeedDial item is clicked
const handleTileColorChange = () => {
  // Call the function or perform the action you want here
  MenuSimple(); // This should trigger the MenuSimple component
};

const actions: Action[] = [
  { icon: <GradientIcon />, name: 'Tile Colour', onClick: handleTileColorChange },
];

export default function PlaygroundSpeedDial() {
  const [direction, setDirection] = React.useState<SpeedDialProps['direction']>('down');
  const [hidden, setHidden] = React.useState(false);

  const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHidden(event.target.checked);
  };

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Box sx={{ position: 'relative', mt: 3, height: 320 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          icon={<SettingsIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick} // Assign the onClick handler here
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
  );
}