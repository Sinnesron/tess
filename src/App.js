import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import * as dsp from 'dsp.js-browser';

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [model, setModel] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState();

  const handleFileUpload = event => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    
    const audioContext = new AudioContext();
    const source = audioContext.createBufferSource();
    const analyser = audioContext.createAnalyser();
    const arrayBuffer = await selectedFile.arrayBuffer();
    audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
      setAudioBuffer(audioBuffer)
      source.buffer = audioBuffer;
      
      analyser.fftSize = 512;


      source.connect(analyser);
      source.start();

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      console.log(Array.from(dataArray))

      const float = audioBuffer.getChannelData(0);
      console.log(float)
      // const fft = new dsp.FFT(2048, 44100)
      // var spectrum = fft.spectrum;
      // console.log(spectrum, 'jjijdisjdisjdisj')
    
    })
    
  };

  const loadModel = async () => {
    try {
      const model = await tf.loadLayersModel('./model.json');
      setModel(model);
      const input = tf.randomNormal([1, 57])
      // const input = tf.zeros([[192,192]], 'int32')
      console.log(input, 'mmmmm')
      //['country', 'pop', 'hiphop', 'rock', 'metal', 'reggae', 'disco', 'classical', 'jazz', 'blues']
      const output = model.predict(input)
      const array = await output.array()
      console.log(array, 'aaarerr')
    }
    catch (err) {
      console.log(err, '????')
    }
  }

  useEffect(() => {
    loadModel();
  }, []);

useEffect(() => {
  console.log(audioBuffer, 'djiijij')
}, [audioBuffer])
  return (
    <div className="App">
      <input
        accept="audio/*"
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