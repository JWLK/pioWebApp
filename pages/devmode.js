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

  const [isButtonClick, onChangeClick] = useState(false);

  const resultCheck = ()=> {
    onChangeClick(true)
    console.log(isButtonClick);
  }

  useEffect(() => {
    // $(document).ready(function(){
    //   alert('test');
    // });

    $(document).ready(function(){ 
      // var img = document.getElementById("pic");
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
      // imageObj.src = '/assets/ColorGuideFull.png';
      imageObj.src = '/assets/black_square.png';


      /* OnChange Event*/
      if (!('url' in window) && ('webkitURL' in window)) {
        window.URL = window.webkitURL; 
      } 
      $('#camera-input').change(function(e){ 
        $('#pic').attr('src', URL.createObjectURL(e.target.files[0]));
        var onChange_img = document.getElementById("pic");
        imageObj.src = URL.createObjectURL(e.target.files[0]);
      });

      var position = document.getElementById('position');

      var rgba = document.getElementById('rgba');


      function pick(event) {
        var x = event.layerX*(ctx.canvas.width/320);
        var y = event.layerY*(ctx.canvas.height/400);

        position.textContent = 'x:' + event.layerX + ' ' + 'y: ' + event.layerY + 'x:' + event.layerX + ' ' + 'y: ' + event.layerY;
        var pixel = ctx.getImageData(x, y, 1, 1);

        var data0 = pixel.data;

        var rgba0 = 'rgba(' + data0[0] + ', ' + data0[1] + ', ' + data0[2] + ', ' + (data0[3] / 255) + ')';

        rgba.style.background = rgba0;
        rgba.textContent = rgba0;

        if (data0[0] + data0[1] + data0[2] < 480) {
          rgba.style.color = "white";
        } else {
          rgba.style.color = "black";
        }

      }
      canvas.addEventListener('mousemove', pick);


      var x_min = ctx.canvas.width;
      var x_max = 0;

      var y_min = ctx.canvas.height;
      var y_max = 0;

      var result_board = document.getElementById('result_board');
      var pos_top_left = document.getElementById('pos_top_left');
      var pos_top_right = document.getElementById('pos_top_right');
      var pos_btm_left = document.getElementById('pos_btm_left');
      var pos_btm_right = document.getElementById('pos_btm_right');
      var pos_area_content = document.getElementById('pos_area_content');
      var result_check = false;

      var box_width = 0;
      var box_height = 0;
      var box_width_split = 0;
      var box_height_split = 0;
      
      var colorCalib_1 = 0;
      var colorCalib_2 = 0;
      var colorCalib_3 = 0;
      

      var resultColor_1 = document.getElementById('resultColor_1');
      var resultColor_1_calib = document.getElementById('resultColor_1_calib');
      var resultColor_2 = document.getElementById('resultColor_2');
      var resultColor_3 = document.getElementById('resultColor_3');


      var resultColorCheck_1 = false;
      var resultColorCheck_2 = false;
      var resultColorCheck_3 = false;
      
      $('#resultclick').click(function initResult() {
        for(var x=0 ; x<ctx.canvas.width ; x++){
          for(var y=0 ; y<ctx.canvas.height ; y++){
            var pixel = ctx.getImageData(x, y, 1, 1);
            var data0 = pixel.data;
            var rgba0 = 'rgba(' + data0[0] + ', ' + data0[1] + ', ' + data0[2] + ', ' + (data0[3] / 255) + ')';
            if(data0[0] <= 80 && data0[1]>=100 && (data0[2]>=70 && data0[2]<=140) ){
              if(x > x_max){
                x_max = x;
              }
              if(y > y_max){
                y_max = y;
              }

              if(x < x_min){
                x_min = x;
              }

              if(y < y_min){
                y_min = y;
              }
              result_check = true;
            } 
            
          }
        }
        box_width = x_max-x_min;
        box_height = y_max-y_min;
        box_width_split = Math.round(box_width/9);
        box_height_split = Math.round(box_height/3);
        

        // console.log("x_origin : " + x + " / " + "y_origin : " + y + " === " + "x_real : " + (x*320/ctx.canvas.width) + " / " + "y_real : " + (y*400/ctx.canvas.height))
        pos_top_left.textContent = "(" + x_min + "," + y_min + ") = (" + Math.round(x_min*320/ctx.canvas.width) + "," + Math.round(y_min*400/ctx.canvas.height) + ")";
        pos_top_right.textContent = "(" + x_max + "," + y_min + ") = (" + Math.round(x_max*320/ctx.canvas.width) + "," + Math.round(y_min*400/ctx.canvas.height) + ")";
        pos_btm_left.textContent = "(" + x_min + "," + y_max + ") = (" + Math.round(x_min*320/ctx.canvas.width) + "," + Math.round(y_max*400/ctx.canvas.height) + ")";
        pos_btm_right.textContent = "(" + x_max + "," + y_max + ") = (" + Math.round(x_max*320/ctx.canvas.width) + "," + Math.round(y_max*400/ctx.canvas.height) + ")";
        pos_area_content.textContent = "(" + (box_width) + "," + (box_height) + ") = (" + Math.round((box_width)*320/ctx.canvas.width) + "," + Math.round((box_height)*400/ctx.canvas.height) + ")";


        //Fint White Color Clali
        for(var x=x_min+(box_width_split*1) ; x<x_min+(box_width_split*2) ; x++){
          for(var y=y_min+(box_height_split) ; y<y_max+(box_height_split*2) ; y++){

            var pixel = ctx.getImageData(x, y, 1, 1);
            var dataCalib = pixel.data;
            var rgbaCalib = 'rgba(' + dataCalib[0] + ', ' + dataCalib[1] + ', ' + dataCalib[2] + ', ' + (dataCalib[3] / 255) + ')';
            
            if(dataCalib[0]>=200 && dataCalib[1]>=200 && dataCalib[2]>=200 ){
              colorCalib_1 = 255-dataCalib[0];
              colorCalib_2 = 255-dataCalib[1];
              colorCalib_3 = 255-dataCalib[2];
            } 
            
          }
        }

        //Find Line & Color
        for(var x=x_min+(box_width_split*2) ; x<x_min+(box_width_split*3) ; x++){
          for(var y=y_min+(box_height_split) ; y<y_max+(box_height_split*2) ; y++){

            var pixel = ctx.getImageData(x, y, 1, 1);
            var data1 = pixel.data;
            var data1_calib=pixel.data;
            if(data1[0]>=100 && data1[1]<=data1[0]-30 && data1[2]<=data1[0]-30 ){


              if(data1[0]-data1[1] < 40){
                resultColorCheck_1 = false;
              }else {
                resultColorCheck_1 = true;
              }

              var rgba1 = 'rgba(' + data1[0] + ', ' + data1[1] + ', ' + data1[2] + ', ' + (data1[3] / 255) + ')';

              resultColor_1.style.background = rgba1;
              resultColor_1.style.color = '#fff';
              resultColor_1.textContent = rgba1;

              data1[0] + colorCalib_1 > 255 ? data1_calib[0] =  255 : data1_calib[0] = (data1[0] + colorCalib_1);
              data1[1] + colorCalib_2 > 255 ? data1_calib[1] =  255 : data1_calib[1] = (data1[1] + colorCalib_2);
              data1[2] + colorCalib_3 > 255 ? data1_calib[2] =  255 : data1_calib[2] = (data1[2] + colorCalib_3);

              var rgba1_calib = 'rgba(' + data1_calib[0] + ', ' + data1_calib[1] + ', ' + data1_calib[2] + ', ' + (data1[3] / 255) + ')';

              resultColor_1_calib.style.background = rgba1_calib;
              resultColor_1_calib.style.color = '#fff';
              resultColor_1_calib.textContent = rgba1_calib;
            } 
            
          }
        }

        for(var x=x_min+(box_width_split*4) ; x<x_min+(box_width_split*5) ; x++){
          for(var y=y_min+(box_height_split) ; y<y_max+(box_height_split*2) ; y++){

            var pixel = ctx.getImageData(x, y, 1, 1);
            var data2 = pixel.data;
            var rgba2 = 'rgba(' + data2[0] + ', ' + data2[1] + ', ' + data2[2] + ', ' + (data2[3] / 255) + ')';
            
            if(data2[0]>=100 && data2[1]<=100 && data2[2]<=100 ){
              resultColor_2.style.background = rgba2;
              resultColor_2.style.color = '#fff';
              resultColor_2.textContent = rgba2;
              resultColorCheck_2 = true;
            }
            
          }
        }

        for(var x=x_min+(box_width_split*6) ; x<x_min+(box_width_split*7) ; x++){
          for(var y=y_min+(box_height_split) ; y<y_max+(box_height_split*2) ; y++){

            var pixel = ctx.getImageData(x, y, 1, 1);
            var data3 = pixel.data;
            var rgba3 = 'rgba(' + data3[0] + ', ' + data3[1] + ', ' + data3[2] + ', ' + (data3[3] / 255) + ')';
            
            if(data3[0]>=100 && data3[1]<=100 && data3[2]<=100 ){
              resultColor_3.style.background = rgba3;
              resultColor_3.style.color = '#fff';
              resultColor_3.textContent = rgba3;
            }
            
          }
        }

        //Result Show
        if(result_check){
          $('#result_board').show();
        } else {
          $('#result_fail').show()
        }

        if(resultColorCheck_1 == false && resultColorCheck_2 == false){
          $('#resultImage_0').show();
        } else if(resultColorCheck_1 == true && resultColorCheck_2 == false){
          $('#resultImage_1').show();
        } else if(resultColorCheck_1 == false && resultColorCheck_2 == true){
          $('#resultImage_2').show();
        } else if(resultColorCheck_1 == true && resultColorCheck_2 == true){
          $('#resultImage_3').show();
        }

      })
      
    }); 

  }, [])

  return (
    <AppLayout>
      <Row>
        <MainViewSection>
          <MainContentsBG>
            {/* <ImageContents id="pic" src ='/assets/ColorGuideFull.png'></ImageContents> */}
            <CanvasContents id="pic-canvas"></CanvasContents>

            <Button id='resultclick' style={{width: '100%', height: '50px' }} onClick={resultCheck}>결과 확인</Button>
            <div id='result_board' style={{display:'none'}}>
              <div>
                <div id='top_text' style={{fontSize:'18px', padding:'10px'}}>분석 영역</div>
                <div id='position' style={{padding:'10px'}}></div>
                <div id='rgba' style={{padding:'10px'}}></div>
                <div style={{width:'100%', padding:'10px'}}>
                  <div id='pos_top_left' style={{display:'inline-block', width:'50%', padding:'5px', fontSize:'12px'}}>좌상</div>
                  <div id='pos_top_right' style={{display:'inline-block', width:'50%', padding:'5px', fontSize:'12px'}}>우상</div>
                </div>
                <div style={{width:'100%', padding:'10px'}}>
                  <div id='pos_btm_left' style={{display:'inline-block', width:'50%', padding:'5px', fontSize:'12px'}}>좌하</div>
                  <div id='pos_btm_right' style={{display:'inline-block', width:'50%', padding:'5px', fontSize:'12px'}}>우하</div>
                </div>

                <div style={{width:'100%', padding:'10px'}}>
                  <div id='pos_area_title' style={{display:'inline-block', width:'50%', padding:'5px', fontSize:'12px'}}>총 영역 :</div>
                  <div id='pos_area_content' style={{display:'inline-block', width:'50%', padding:'5px', fontSize:'12px'}}>-</div>
                </div>
              </div>
              <div>
                <div style={{fontSize:'18px', padding:'10px'}}>분석 색상 및 보정</div>
                <div style={{width:'100%', padding:'10px'}}>
                  <div id='color1' style={{display:'inline-block', width:'50px', padding:'5px', fontSize:'12px'}}>라인1</div>
                  <div id='resultColor_1' style={{display:'inline-block', width:'40%', padding:'5px', fontSize:'8px'}}></div>
                  <div id='resultColor_1_calib' style={{display:'inline-block', width:'40%', padding:'5px', fontSize:'8px'}}></div>
                </div>
                <div style={{width:'100%', padding:'10px'}}>
                  <div id='color2' style={{display:'inline-block', width:'50px', padding:'5px', fontSize:'12px'}}>라인2</div>
                  <div id='resultColor_2' style={{display:'inline-block', width:'50%', padding:'5px', fontSize:'12px'}}></div>

                </div>
                <div style={{width:'100%', padding:'10px'}}>
                  <div id='color3' style={{display:'inline-block', width:'50px', padding:'5px', fontSize:'12px'}}>라인3</div>
                  <div id='resultColor_3' style={{display:'inline-block', width:'50%', padding:'5px', fontSize:'12px'}}></div>
                </div>
              </div>
              <div>
                <div style={{fontSize:'18px', padding:'10px'}}>분석 결과</div>
                <div>
                  <img id='resultImage_0' src='/assets/result_0.png' style={{width:'80%', display:'none'}}/>
                  <img id='resultImage_1' src='/assets/result_1.png' style={{width:'80%', display:'none'}}/>
                  <img id='resultImage_2' src='/assets/result_2.png' style={{width:'80%', display:'none'}}/>
                  <img id='resultImage_3' src='/assets/result_3.png' style={{width:'80%', display:'none'}}/>
                </div>
              </div>
            </div>
            <div id='result_fail' style={{display:'none'}}>
              <div id='color3' style={{display:'inline-block', width:'100%', padding:'5px', fontSize:'12px', textAlign:'center'}}>사진 촬영을 영역에 맞추어 다시 진행해주세요</div>
            </div>
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
