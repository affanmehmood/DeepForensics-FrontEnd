/* eslint-disable promise/catch-or-return */
import React, {useState, useEffect} from "react";
import { useParams, useHistory } from 'react-router-dom';
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Filter5Icon from '@material-ui/icons/Filter5';
import AccessTime from "@material-ui/icons/AccessTime";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Accessibility from "@material-ui/icons/Accessibility";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import Table from "../components/Table/Table";
import Tasks from "../components/Tasks/Tasks";
import CustomTabs from "../components/CustomTabs/CustomTabs";
import Danger from "../components/Typography/Danger";
import Card from "../components/Card/Card";
import CardHeader from "../components/Card/CardHeader";
import CardIcon from "../components/Card/CardIcon";
import CardBody from "../components/Card/CardBody";
import CardFooter from "../components/Card/CardFooter";
import Barchart from './Charts/Barchart';
import Donutchart from './Charts/Donut';
import CollapsibleTable from './CollapsibleTable'
import UpdateRounded from '@material-ui/icons/UpdateRounded';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { bugs, website, server } from "../variables/general";

import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle";
import { getReport } from '../../API';
import ViewFaceMatchingResults from '../../FaceMatching/ViewFaceMatchingResults'

const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [chartData, setChartData] = useState({
    barcharts: {
      barChart1: {
        categories: [],
        series: [],
      },
      barChart2: {
        categories: [],
        series: [],
      },
      barChart3: {
        categories: [],
        series: [],
      },
    },
    donuts: {
      donut1: {
        labels: [],
        series: [],
      },
      donut2: {
        labels: [],
        series: [],
      },
      donut3: {
        labels: [],
        series: [],
      },
    },
  });
  const [titles, setTitles] = useState({
    countRV: '',
    avgRV: '',
    countObjs: '',
    avgConf: '',
  });
  const [tableData, setTableData] = useState([])
  const { taskId } = useParams();
  const history = useHistory();

  function roundToTwo(num) {
    return +(Math.round(num + 'e+2') + 'e-2');
  }
  useEffect(() => {
    // Anything in here is fired on component mount.
    getReport(taskId).then((data) => {
      // myConsole.log("REPORT", data);
      setTableData(data.fig7);
      setTitles({
        countObjs: data.totalOccurrences,
        avgRV: data.averageTime,
        countRV: data.totalVehicles,
        avgConf: ((roundToTwo(data.averageConfidence)) * 100) + "%",
      });
      setChartData({
        barcharts: {
          barChart1: {
            categories: ['Q1', 'Q2', 'Q3'],
            series: data.fig1
          },
          barChart2: {
            categories: ['Q1', 'Q2', 'Q3'],
            series: data.fig2
          },
          barChart3: {
            categories: ['Q1', 'Q2', 'Q3'],
            series: data.fig3,
          },
        },
        donuts: {
          donut1: data.fig4,
          donut2: data.fig5,
          donut3: data.fig6,
        },
      });
    });
  }, [taskId]);

  const classes = useStyles();
  return (
    <div className=" mx-auto">
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <EmojiObjectsIcon />
                </CardIcon>
                <p className={classes.cardCategory}># of Objects</p>
                <h3 className={classes.cardTitle}>{titles.countObjs}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <HourglassEmptyIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Avg Duration Vehicles</p>
                <h3 className={classes.cardTitle}>{titles.avgRV}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        <GridItem xs={11} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                <DriveEtaIcon/>
                </CardIcon>
                <p className={classes.cardCategory}># of Vehicles</p>
                <h3 className={classes.cardTitle}>
                {titles.countRV}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>

                    <Warning/>
                    Get more space
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                <AssignmentTurnedInIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Avg Confidence</p>
                <h3 className={classes.cardTitle}>{titles.avgConf}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      <GridContainer >
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader className="pl-0 pb-0" color="success">
            <Barchart cdata={chartData.barcharts.barChart1} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Top 5 most occuring objects</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <Filter5Icon className={classes.Filter5Icon} />
                </span>{" "}
                The frequency of the most occuring objects are shown in each quater of the video where Q1 means 1st quater.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader className="pl-0 pb-0" color="warning">
            <Barchart cdata={chartData.barcharts.barChart2} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Avg time of top 5 objects</h4>
              <p className={classes.cardCategory}><span className={classes.successText}>
                  <AccessTime className={classes.Filter5Icon} />
                </span>{" "}
                The average time taken by each class from the top 5 most occuring objects in each quater of the video where Q1 means 1st quater.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader className="pl-0 pb-0" color="danger">
            <Barchart cdata={chartData.barcharts.barChart3} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Top 5 most occuring vehicles</h4>
              <p className={classes.cardCategory}><span className={classes.successText}>
                  <Filter5Icon className={classes.Filter5Icon} />
                </span>{" "}  The frequency of the most occuring vehicles are shown in each quater of the video where Q1 means 1st quater.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader className="pt-0 pb-0"  color="success">
            <Donutchart cdata={chartData.donuts.donut1} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Top 5 most occuring objects</h4>
              <p className={classes.cardCategory}>
              <span className={classes.successText}>
                  <Filter5Icon className={classes.Filter5Icon} />
                </span>{" "}
                The frequency of the most occuring objects from the entire video.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader className="pt-0 pb-0"  color="warning">
              <Donutchart cdata={chartData.donuts.donut2} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Avg time of top 5 objects</h4>
              <p className={classes.cardCategory}>
              <span className={classes.successText}>
                  <AccessTime className={classes.Filter5Icon} />
                </span>{" "}
                The average time taken by each class from the top 5 most occuring objects from the entire video.
</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader className="pt-0 pb-0"  color="danger">
            <Donutchart cdata={chartData.donuts.donut3} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Top 5 most occuring vehicles</h4>
              <p className={classes.cardCategory}>
              <span className={classes.successText}>
                  <Filter5Icon className={classes.Filter5Icon} />
                </span>{" "}  The frequency of the most occuring vehicles from the entire video.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Video Comprehensive Summary</h4>
              <p className={classes.cardCategoryWhite}>
                All the objects of each class are present here.
              </p>
            </CardHeader>
            <CardBody>
              <CollapsibleTable taskId={taskId} tableData = {tableData} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <ViewFaceMatchingResults taskId={taskId} />
    </div>
  );
}
