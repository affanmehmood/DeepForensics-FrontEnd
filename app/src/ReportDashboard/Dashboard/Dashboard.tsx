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

import UpdateRounded from '@material-ui/icons/UpdateRounded';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { bugs, website, server } from "../variables/general";

import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle";
import { getReport } from '../../API';

const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [chartData, setChartData] = useState({
    barcharts: {
      barChart1: {
        categories: ['Q1', 'Q2', 'Q3'],
        series: [
          {
            name: 'Cars',
            data: [],
          },
          {
            name: 'Motorbike',
            data: [],
          },
          {
            name: 'Truck',
            data: [],
          },
        ],
      },
      barChart2: {
        categories: ['Q1', 'Q2', 'Q3'],
        series: [
          {
            name: 'Cars',
            data: [],
          },
          {
            name: 'Motorbike',
            data: [],
          },
          {
            name: 'Truck',
            data: [],
          },
        ],
      },
      barChart3: {
        categories: ['Q1', 'Q2', 'Q3'],
        series: [
          {
            name: 'Person',
            data: [],
          },
          {
            name: 'Handbag',
            data: [],
          },
          {
            name: 'Person',
            data: [],
          },
          {
            name: 'Knife',
            data: [],
          },
        ],
      },
      barChart4: {
        categories: ['Q1', 'Q2', 'Q3'],
        series: [
          {
            name: 'Person',
            data: [],
          },
          {
            name: 'Handbag',
            data: [],
          },
          {
            name: 'Person',
            data: [],
          },
          {
            name: 'Knife',
            data: [],
          },
        ],
      },
    },
    donuts: {
      donut1: {
        labels: ['Cars', 'Motorbike', 'Truck'],
        series: [],
      },
      donut2: {
        labels: ['Cars', 'Motorbike', 'Truck'],
        series: [],
      },
      donut3: {
        labels: ['Person', 'Handbag', 'Backpack', 'Knife'],
        series: [],
      },
      donut4: {
        labels: ['Person', 'Handbag', 'Backpack', 'Knife'],
        series: [],
      },
    },
  });
  const [titles, setTitles] = useState({
    countRV: '',
    avgRV: '',
    countObjs: '',
    avgObjs: '',
  });
  const { taskId } = useParams();
  const history = useHistory();

  function roundToTwo(num) {
    return +(Math.round(num + 'e+2') + 'e-2');
  }
  useEffect(() => {
    // Anything in here is fired on component mount.
    getReport(taskId).then((data) => {
      setTitles({
        countRV: data.column1.total,
        avgRV: data.column2.totalHMS,
        countObjs: data.column3.total,
        avgObjs: data.column4.totalHMS,
      });
      // column 1 fill
      setChartData({
        barcharts: {
          barChart1: {
            categories: ['Q1', 'Q2', 'Q3'],
            series: [
              {
                name: 'Cars',
                data: data.column1.car,
              },
              {
                name: 'Motorbike',
                data: data.column1.motorbike,
              },
              {
                name: 'Truck',
                data: data.column1.truck,
              },
            ],
          },
          barChart2: {
            categories: ['Q1', 'Q2', 'Q3'],
            series: [
              {
                name: 'Cars',
                data: data.column2.car,
              },
              {
                name: 'Motorbike',
                data: data.column2.motorbike,
              },
              {
                name: 'Truck',
                data: data.column2.truck,
              },
            ],
          },
          barChart3: {
            categories: ['Q1', 'Q2', 'Q3'],
            series: [
              {
                name: 'Person',
                data: data.column3.person,
              },
              {
                name: 'Handbag',
                data: data.column3.handbag,
              },
              {
                name: 'Backpack',
                data: data.column3.backpack,
              },
              {
                name: 'Knife',
                data: data.column3.knife,
              },
            ],
          },
          barChart4: {
            categories: ['Q1', 'Q2', 'Q3'],
            series: [
              {
                name: 'Person',
                data: data.column4.person,
              },
              {
                name: 'Handbag',
                data: data.column4.handbag,
              },
              {
                name: 'Backpack',
                data: data.column4.backpack,
              },
              {
                name: 'Knife',
                data: data.column4.knife,
              },
            ],
          },
        },
        donuts: {
          donut1: {
            labels: ['Cars', 'Motorbike', 'Truck'],
            series: [
              data.column1.carTotal,
              data.column1.motorbikeTotal,
              data.column1.truckTotal,
            ],
          },
          donut2: {
            labels: ['Cars', 'Motorbike', 'Truck'],
            series: [
              roundToTwo(data.column2.carAverage),
              roundToTwo(data.column2.motorbikeAverage),
              roundToTwo(data.column2.truckAverage),
            ],
          },
          donut3: {
            labels: ['Person', 'Handbag', 'Backpack', 'Knife'],
            series: [
              data.column3.personTotal,
              data.column3.handbagTotal,
              data.column3.backpackTotal,
              data.column3.knifeTotal,
            ],
          },
          donut4: {
            labels: ['Person', 'Handbag', 'Backpack', 'Knife'],
            series: [
              roundToTwo(data.column4.personAverage),
              roundToTwo(data.column4.handbagAverage),
              roundToTwo(data.column4.backpackAverage),
              roundToTwo(data.column4.knifeAverage),
            ],
          },
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
                <h3 className={classes.cardTitle}>{titles.avgObjs}</h3>
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
            <CardHeader className="pl-0 pb-0" color="danger">
            <Barchart cdata={chartData.barcharts.barChart3} />
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
            <CardHeader className="pl-0 pb-0" color="warning">
            <Barchart cdata={chartData.barcharts.barChart2} />
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
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Video Object Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
