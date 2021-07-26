import {
    makeStyles,
    Card,
    Button,
    Typography,
    CardContent,
    CardActions,
    AppBar,
    Toolbar,
    IconButton,
    

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import React,{ useEffect,useState } from 'react';
import {ReactComponent as ReactLogo} from '../logo.svg';
const useStyles=makeStyles((theme)=>({
    root: {
        minWidth: 275,
        maxWidth:700,
        marginTop:30,
        margin:'auto',
        flexDirection: 'column'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 24,
      },
      pos: {
        marginBottom: 12,
      },

}));
const ModelResult=(props)=>{
    const classes=useStyles();
    const [Data,setData]=useState([]);
    const [visible,setVisible]=useState(false);
    
    const getData=async()=>{
    // const response=await fetch('http://localhost:8080/getData', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    // });
    const response=await axios.get('http://localhost:8080/getData', {
      
    });
    setVisible(true);
   const data_recieved= response.data;
    //  const obj = JSON. parse(data_recieved);
    // console.log(obj);
    //const data=Array.from(data_recieved);
    //console.log(data_recieved);
    //console.log(data);
    //console.log(data_recieved.describe);
    const json_data=[
        data_recieved.describe,
        data_recieved.shape,
        data_recieved.column_present,
        data_recieved.column_present_actual,
        data_recieved.dtypes,
        data_recieved.num_cols,
        data_recieved.Accuracy_Score,
        data_recieved.F1_Score,
        data_recieved.ROC_AUC_Score,
        data_recieved.Accuracy_Score_test,
        data_recieved.F1_Score_test,
        data_recieved.ROC_AUC_Score_test,
    ];
    //const array=Array.from(json_data);
    setData(json_data);
    //console.log(array);
    // console.log(data);
     //console.log(typeof(data_recieved));
     //console.log("response");
  

    
    
    //const data=await response.json();
    
    };

    useEffect(()=>{
        console.log("inside useEffect");
     getData();
    },[])
  if(visible){
    return(
        <div>
            <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            AutoMl
          </Typography>
          
        </Toolbar>
      </AppBar>
    
    <Card className={classes.root}>
        <CardContent>
        <Typography variant="h6" className={classes.title}>
            Accuracy metrices:
          </Typography>
        <Typography>
              Accuracy-Score on training data-{Data[6]}
            </Typography>
            <Typography>
              f1-score on trainig data-{Data[7]}
            </Typography>
            <Typography>
              roc-auc-score on training data-{Data[8]}
            </Typography>
            <Typography>
            Accuracy-Score on test data-{Data[9]}
            </Typography>

           <Typography>
           f1-score on test data-{Data[10]}
            </Typography>
            <Typography>
            roc-auc-score on test data-{Data[11]}
            </Typography>


        </CardContent>
    </Card>    
    </div>
    );
  }
  else{
      return(
      <div>
            <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            AutoMl
          </Typography>
          
        </Toolbar>
      </AppBar>
      <p><b>WAIT THIS TAKES TIME</b></p>
      <ReactLogo/>
      </div>
      );
  }


}
export default ModelResult;