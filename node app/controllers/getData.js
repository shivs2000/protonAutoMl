var spawn=require('child_process').spawn;
const getData= (req,res)=>{
    var process = spawn('python',["./model.py",
                            ] );
  
    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        // const data_json= typeof(data);
        // console.log(data_json);
        // console.log(Object.values(data));
        data_object=data.toString();
        // console.log(typeof(data_object));
        // console.log(data_object.describe);
        
        const dataArr = data_object.split("@");
        //data_object_string=JSON.stringify(data_object);
        console.log(dataArr);
        
       // console.log(myArr[0]);
        // myArr[0].replace('{descibe:','');
        // const describe={"describe":myArr[0]};
        // myArr[1].replace('{shape:','');
        // const shape={"shape":myArr[1]};
        // myArr[2].replace('{column_present:','');
        // myArr[3].replace('{column_present_actual_json:','');
        // myArr[4].replace('{dtypes:','');
        // myArr[5].replace('{num_cols:','');
        // myArr[6].replace('{Accuracy_Score:','');
        // myArr[7].replace('{F1_Score','');
        // myArr[8].replace('{ROC_AUC_Score:','');
        // myArr[9].replace('{Accuracy_Score:','');
        // myArr[10].replace('{F1_Score','');
        // myArr[11].replace('{ROC_AUC_Score:','')
        //myArr.forEach(myFunction);

// function myFunction(value, index, array) {
//   console.log(value);
// }
        

        
        
       const json_data= {
          "describe":dataArr[0],
          "shape":dataArr[1],
          "column_present":dataArr[2],
          "column_present_actual":dataArr[3],
          "dtypes":dataArr[4],
          "num_cols":dataArr[5],
          "Accuracy_Score":dataArr[6],
          "F1_Score":dataArr[7],
          "ROC_AUC_Score":dataArr[8],
          "Accuracy_Score_test":dataArr[9],
          "F1_Score_test":dataArr[10],
          "ROC_AUC_Score_test":dataArr[11], 
          

      };
      res.json(json_data);
    })

};
module.exports=getData;