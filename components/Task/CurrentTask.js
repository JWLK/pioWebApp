import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Input, Row, Col, Image, Button} from 'antd';
import Link from "next/link";
import { Line, Bar, Doughnut } from "react-chartjs-2";

const server_url = "http://swirly.me/"

const axios = require('axios');
axios.defaults.baseURL = server_url
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


const CurrentTask = () => {
    const getData_JWLK = (e) => {
        e.preventDefault();
        console.log('You clicked getData_JWLK');
        axios.get()
        // 응답(성공)
        .then(function (response) {
            console.log(response);
        })
        // 응답(실패)
        .catch(function (error) {
            console.log(error);
        })
        // 응답(항상 실행)
        .then(function () {
            // ...
        });
    }
    const options = {
        legend: {
            display: false, // label 보이기 여부
        },
        scales: {
            yAxes: [{
            ticks: { 
                min: 0, // y축 스케일에 대한 최소값 설정
                stepSize: 1, // y축 그리드 한 칸당 수치
            }
            }]
        },
        
        // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
        // true : 크기가 알아서 결정됨.
        maintainAspectRatio: false 
    }
    const data = {
        // 각 막대별 라벨
        labels: ['1번 막대', '2번 막대', '3번 막대'],
        datasets: [
            {
            borderWidth: 1, // 테두리 두께
            data: [1,2,3], // 수치
            backgroundColor:['yellow','red','green'] // 각 막대 색
            }
        ]
    };

    const expData = {
        labels: ["작업라인 1", "작업라인 2", "남은 작업"],
        datasets: [
                    {
                    labels: ["작업라인 1", "작업라인 2", "남은 작업"],
                    data: [60, 13, 27],
                    borderWidth: 2,
                    hoverBorderWidth: 3,
                    backgroundColor: [
                        "rgba(238, 102, 121, 1)",
                        "rgba(98, 181, 229, 1)",
                        "rgba(255, 198, 0, 1)"
                    ],
                    fill: true
                    }
                ]
    };
    return (
        <>
            <Row gutter={10}>
                <Col xs={24} lg={12}>
                    <Doughnut options={{legend: {display: true, position: "right"}}}
                            data={expData}
                            height={200}
                        />
                </Col>
                <Col xs={24} lg={12}>
                    <Bar data={data} options={options} height={200} />
                </Col>
                    
            </Row>
            <Row gutter={10}>
                <Col>
                </Col>
            </Row>
            
        </>
    );
};

export default CurrentTask;
