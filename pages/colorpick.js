import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from "three";
import styled from 'styled-components';
import {Row, Col, Tabs, Button, Menu} from 'antd';
import Link from "next/link";
import { PieChartOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import $ from "jquery";

// import PostForm from '../components/PostForm';
// import PostCard from '../components/PostCard';

const { TabPane } = Tabs;

import AppLayout from '../components/AppLayout';
import CurrentTask from '../components/Task/CurrentTask';

const MainViewSection = styled.div`
  position: relative;
  background : rgba(0,0,0,0);
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 20px;
`;
const MainContentsBG = styled.div`
  position: relative;
  background : #FFFFFF;
  margin: 0 auto;
  padding-top: 2vh;
  padding-bottom: 2vh;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
  border-radius: 0px;
`;

const ImageContents = styled.img`
  width: 320px;
  height: auto; 
  display: block;
  margin: 0px auto;
`
const CanvasContents = styled.canvas`
  width: 320px;
  height: 400px;
  display: block;
`


const BottomCaptureSection = styled.div`
  position: fixed; 
  bottom: 0;
  width: 100%; 
  padding: 30px 0px;
  background : rgba(0,0,0,0);
  max-width: 1400px;
  height: 16vh;
  margin: 0 auto;
  padding-top: 10px;
  padding-left: 0px;
`;
const BottomCaptureBG = styled.div`
  width:60px;
  height:60px;
  position: absolute;
  right: 20px;
  background : #E8C17B;
  margin: 0 auto;
  padding-top: 9px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
  border-radius: 70%;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

const BottomInput = styled.input`
  display: none;
`

/*Three.js*/


const Camera = () => {
  // const { isLoggedIn } = useSelector(state => state.user);
  // const { mainPosts } = useSelector(state => state.post);

  useEffect(() => {
    // $(document).ready(function(){
    //   alert('test');
    // });

    $(document).ready(function(){ 
      var img = document.getElementById("pic");
      var canvas = document.getElementById("pic-canvas");
      var ctx = canvas.getContext("2d");

      ctx.clearRect(0,0,canvas.width, canvas.height);

      var imageObj = new Image();
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      // ctx.canvas.width = canvas.width;
      // ctx.canvas.height = canvas.height;
      
      //alert(ctx.canvas.width+" X "+ctx.canvas.height);

      imageObj.onload = function() {
        ctx.drawImage(imageObj, 0, 0, window.innerWidth, window.innerHeight);
      };
      imageObj.src = '/assets/ColorGuideFull.png';

      // var onLoad_img = new Image();
      // onLoad_img.onload = function() {
      //   ctx.drawImage(onLoad_img, 0, 0, 320, (onLoad_img.height/onLoad_img.width) * 100);
      // }
      // onLoad_img.src = 'http://unsplash.it/400/450?image=122';

      if (!('url' in window) && ('webkitURL' in window)) {
        window.URL = window.webkitURL; 
      } 
      $('#camera-input').change(function(e){ 
        $('#pic').attr('src', URL.createObjectURL(e.target.files[0]));
        var onChange_img = document.getElementById("pic");
        imageObj.src = URL.createObjectURL(e.target.files[0]);
      });

      var position = document.getElementById('position');
      var color = document.getElementById('color');

      function pick(event) {
        var x = event.layerX*(ctx.canvas.width/320);
        var y = event.layerY*(ctx.canvas.height/400);
        // var x = event.layerX*1;
        // var y = event.layerY*1;
        position.textContent = 'x:' + event.layerX + ' ' + 'y: ' + event.layerY;
        var pixel = ctx.getImageData(x, y, 10, 10);
        var data = pixel.data;
        var rgba = 'rgba(' + data[0] + ', ' + data[1] +
          ', ' + data[2] + ', ' + (data[3] / 255) + ')';
        color.style.background = rgba;
        color.textContent = rgba;
        if (data[0] + data[1] + data[2] < 480) {
          color.style.color = "white";
        } else {
          color.style.color = "black";
        }
      }

      canvas.addEventListener('mousemove', pick);


    }); 

  }, [])

  return (
    <AppLayout>
      <Row>
        <MainViewSection>
          <MainContentsBG>
            <ImageContents id="pic" src ='/assets/ColorGuideFull.png'></ImageContents>
            <CanvasContents id="pic-canvas"></CanvasContents>
            <div>TEST RESULT</div>
            <div id='position'></div>
            <div id='color'></div>
          </MainContentsBG>
        </MainViewSection>
      </Row>
      <Row>
        <BottomCaptureSection>
          <BottomCaptureBG>
            <label for="camera-input"><img src='/assets/Icon-camera.png'/></label>
            <BottomInput type="file" id="camera-input" name="camera" capture="camera" accept="image/*" />
          </BottomCaptureBG>
        </BottomCaptureSection>
      </Row>
    </AppLayout>
  );
};

export default Camera;
