import React from 'react';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from 'video-react';

// eslint-disable-next-line
export default function About(props: any): JSX.Element {
  const { vidsrc } = props;
  return (
    <>
      <link
        rel="stylesheet"
        href="https://video-react.github.io/assets/video-react.css"
      />

      <Player>
        <source src="http://media.w3.org/2010/05/bunny/movie.mp4" />

        <ControlBar>
          <ReplayControl seconds={10} order={1.1} />
          <ForwardControl seconds={30} order={1.2} />
          <CurrentTimeDisplay order={4.1} />
          <TimeDivider order={4.2} />
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
          <VolumeMenuButton enabled />
        </ControlBar>
      </Player>
    </>
  );
}
