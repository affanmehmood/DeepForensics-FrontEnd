/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { withStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Slider from '@material-ui/core/Slider';

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
        <div className="row ml-0 pl-0 mr-0 pr-0">
          <div className="col-6 justify-content-center">
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
          <div className="col-2 ml-4 justify-content-center">
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
                  style={{ width: '160px' }}
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
                  style={{ width: '160px' }}
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
      </List>
    </div>
  );
}
