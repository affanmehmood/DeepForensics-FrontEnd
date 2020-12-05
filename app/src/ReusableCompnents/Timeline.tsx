/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-else-return */
import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

export default function ColorsTimeline(props: any) {
  function getDot(index: number) {
    if (props.state === 'init') {
      if (index === 1) {
        return <TimelineDot color="secondary" />;
      } else {
        return <TimelineDot />;
      }
    } else if (props.state === 'track') {
      if (index === 2) {
        return <TimelineDot color="secondary" />;
      } else if (index === 1) {
        return <TimelineDot color="primary" />;
      } else {
        return <TimelineDot />;
      }
    } else if (props.state === 'face') {
      if (index === 3) {
        return <TimelineDot color="secondary" />;
      } else if (index === 1 || index === 2) {
        return <TimelineDot color="primary" />;
      } else {
        return <TimelineDot />;
      }
    } else {
      if (index === 4) {
        return <TimelineDot color="secondary" />;
      }
      return <TimelineDot color="primary" />;
    }
  }
  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineSeparator>
          {getDot(1)}
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Initialization</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          {getDot(2)}
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Object Detection & Tracking</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          {getDot(3)}
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Face Exteaction</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>{getDot(4)}</TimelineSeparator>
        <TimelineContent>Report Generation</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
