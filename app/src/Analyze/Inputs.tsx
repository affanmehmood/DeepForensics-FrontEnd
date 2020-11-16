/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {
  useTheme,
  createStyles,
  withStyles,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

// for 80 classes

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'person',
  'bicycle',
  'car',
  'motorbike',
  'aeroplane',
  'bus',
  'train',
  'truck',
  'boat',
  'traffic light',
  'fire hydrant',
  'stop sign',
  'parking meter',
  'bench',
  'bird',
  'cat',
  'dog',
  'horse',
  'sheep',
  'cow',
  'elephant',
  'bear',
  'zebra',
  'giraffe',
  'backpack',
  'umbrella',
  'handbag',
  'tie',
  'suitcase',
  'frisbee',
  'skis',
  'snowboard',
  'sports ball',
  'kite',
  'baseball bat',
  'baseball glove',
  'skateboard',
  'surfboard',
  'tennis racket',
  'bottle',
  'wine glass',
  'cup',
  'fork',
  'knife',
  'spoon',
  'bowl',
  'banana',
  'apple',
  'sandwich',
  'orange',
  'broccoli',
  'carrot',
  'hot dog',
  'pizza',
  'donut',
  'cake',
  'chair',
  'sofa',
  'potted plant',
  'bed',
  'dining table',
  'toilet',
  'tvmonitor',
  'laptop',
  'mouse',
  'remote',
  'keyboard',
  'cell phone',
  'microwave',
  'oven',
  'toaster',
  'sink',
  'refrigerator',
  'book',
  'clock',
  'vase',
  'scissors',
  'teddy bear',
  'hair drier',
  'toothbrush',
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// for sliders
const useStylesSlider = makeStyles({
  root: {
    width: 300,
  },
});
function valuetext(value: number) {
  return `${value}°C`;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function SwitchesGroup() {
  // for 80 classes
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChangeClasses = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPersonName(event.target.value as string[]);
  };
  const [state, setState] = React.useState({
    tiny: true,
    iou: 0,
  });
  const classSlider = useStylesSlider();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className="row">
      <List>
        <div className="col-12 justify-content-center">
          <ListSubheader>Configure Backend</ListSubheader>
        </div>
        <div className="row ml-0 pl-0 mt-3" style={{ width: 350 }}>
          <div className="col-6">
            <FormControlLabel
              control={
                <Switch
                  checked={state.tiny}
                  onChange={handleChange}
                  name="tiny"
                />
              }
              labelPlacement="start"
              label="Tiny"
            />
          </div>
          <div className="col-2 ml-0 pl-0 ">
            <HtmlTooltip
              title={
                <>
                  <Typography color="inherit">Tiny Model</Typography>
                  <em>Tiny model: speed{'>'}accuracy</em>.<br />
                  {
                    'If you want to do a fast but less accurate report then keep this on.'
                  }
                </>
              }
            >
              <HelpOutlineIcon
                className="aligin-self-center mt-2"
                fontSize="small"
              />
            </HtmlTooltip>
          </div>
        </div>
        <Divider className="col-12" variant="middle" />
        <div className="row ml-3 pl-0 mt-3">
          <div className={classSlider.root + 'col-10'}>
            <FormControlLabel
              control={
                <Slider
                  style={{ width: '200px' }}
                  defaultValue={45}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              }
              labelPlacement="top"
              label="IOU Threshold"
            />
          </div>
          <div className="col-2 ml-0 justify-content-center">
            <HtmlTooltip
              title={
                <>
                  <Typography color="inherit">Model IOU</Typography>
                  <em>Intersection Over Union</em>.<br />
                  {'Usually 45 gives the best results.'}
                </>
              }
            >
              <HelpOutlineIcon
                className="aligin-self-center mt-2"
                fontSize="small"
              />
            </HtmlTooltip>
          </div>
        </div>
        <Divider className="col-12" variant="middle" />
        <div className="row ml-3 pl-0 mt-3">
          <div className={classSlider.root + 'col-10'}>
            <FormControlLabel
              control={
                <Slider
                  style={{ width: '200px' }}
                  defaultValue={50}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              }
              labelPlacement="top"
              label="Score Threshold"
            />
          </div>
          <div className="col-2 ml-0 justify-content-center">
            <HtmlTooltip
              title={
                <>
                  <Typography color="inherit">Model Score</Typography>
                  <em>Confedence Threshold</em>.<br />
                  {'The minimum confidence the detections should have.'}
                  {'It will ignore the detections that have lower confidence'}
                </>
              }
            >
              <HelpOutlineIcon
                className="aligin-self-center mt-2"
                fontSize="small"
              />
            </HtmlTooltip>
          </div>
        </div>
        <Divider className="col-12" variant="middle" />
        <div className="row ml-3 pl-0 mt-3">
          <div className="col-9">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">
                Ignored Classes
              </InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={personName}
                onChange={handleChangeClasses}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {(selected as string[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-3 ml-0 pl-0">
            <HtmlTooltip
              title={
                <>
                  <Typography color="inherit">Ignored Classes</Typography>
                  <em>Select unwanted classes</em>.<br />
                  {'The classes selected here will be ignored by the backend.'}
                </>
              }
            >
              <HelpOutlineIcon
                className="aligin-self-center mt-2"
                fontSize="small"
              />
            </HtmlTooltip>
          </div>
        </div>
        <Divider className="col-12" variant="middle" />
      </List>
    </div>
  );
}
