import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import * as tf from '@tensorflow/tfjs';

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [model, setModel] = useState(null);

  const handleFileUpload = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    // Upload the file to a server here
    // This is just a placeholder and won't actually upload the file
    console.log(selectedFile);
  };

  const loadModel = async () => {
    try {
      const model = await tf.loadLayersModel('./model.json');
      setModel(model);
      const input = tf.randomNormal([1, 57])
      // const input = tf.zeros([[192,192]], 'int32')
      console.log(input, 'mmmmm')
      const output = model.predict(input)
      const array = await output.array()
      console.log(array, 'aaarerr')
    }
    catch (err) {
      console.log(err, '????')
    }
  }

  useEffect(() => {
    // loadModel();
   

  }, []);


  return (
    <div className="App">
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span">
          Upload
        </Button>
      </label>
      <Button onClick={handleUpload} variant="contained" color="primary">
        Submit
      </Button>
      <div>{model ? <p>ssss</p> : <p>kllll</p>}</div>
    </div>
  );
}

export default App;