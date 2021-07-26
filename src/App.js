import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {ReactPictureAnnotation, defaultShapeStyle, DefaultInputSection} from "react-picture-annotation";
import useStyles from "./Styles";

import "./App.css";

function App() {
    const classes = useStyles();
    const [pageSize, setPageSize] = useState({width:500, height: 300});
    const [selectedArea, setSelectedArea] = useState({error:"No data found"})    
    const [imageUrl, setImageUrl] = useState("https://source.unsplash.com/random/800x600")
    
    const onSelect = selectedId => console.log(selectedId);

    const onChange = (data) => {
      setSelectedArea(data)
      console.log("Selected Area is = ",selectedArea)
    };

    const handleChange = (event) => {
      setImageUrl(URL.createObjectURL(event.target.files[0]))
    }

    useEffect(()=>{
      setSelectedArea({error:"No data found"})
    },[imageUrl])
    
    return (<div className={
        classes.root
    }>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <ReactPictureAnnotation image={imageUrl}
                    onSelect={onSelect}
                    onChange={onChange}
                    width={
                        pageSize.width
                    }
                    height={
                        pageSize.height
                    }
                    annotationStyle={
                        {
                            ...defaultShapeStyle,
                            shapeStrokeStyle: "#2193ff",
                            transformerBackground: "black"
                        }
                    }
                    inputElement={
                        (value, onChange, onDelete) => (<DefaultInputSection placeholder={"Your Comment"}
                            {...{ value, onChange, onDelete }}/>)
                    }/>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={3}>
              <Paper className={classes.paper}>
                <div>
                  <input type="file" onChange={handleChange}/>
                </div>
              </Paper>
              </Grid>
              <Grid item xs={3}>
                <div>
                    {selectedArea.error == "No data found" ? <lable>No data found</lable>
                    : selectedArea.map((data)=>{
                      return(<div>
                        <lable>Id Is {data?.id}</lable> <br/>
                        <lable>X Position Is {data.mark.x}</lable><br/>
                        <lable>Y Position Is {data.mark.y}</lable><br/>
                        <lable>Width Is {data.mark.width}</lable><br/>
                        <lable>Height Is {data.mark.height}</lable><br/>
                        <br/>
                        </div>)
                    })
                    }
                  </div>
              </Grid>
            </Grid>
    </Grid>
</div>);
}

export default App;
