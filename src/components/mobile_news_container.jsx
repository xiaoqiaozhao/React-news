import React from 'react';
import NewsImageBlock from './news_img_block';
import MobileNewsBlock from './mobile_news_block';
import {
    Row,
    Col,
    Carousel,
    Tabs,
    Card
} from 'antd';

import Carousel_1 from '../images/carousel_1.jpg';
import Carousel_2 from '../images/carousel_2.jpg';
import Carousel_3 from '../images/carousel_3.jpg';
import Carousel_4 from '../images/carousel_4.jpg';

import '../css/news_container.css';

const TabPane = Tabs.TabPane;

class MobileNewsContainer  extends React.Component{
    render(){
        return (
            <Tabs>
                <TabPane tab="头条" key="top">
                    <div style={{width: '100%'}}>
                        <Carousel autoplay infinite>
                            <div><img src={Carousel_1}/></div>
                            <div><img src={Carousel_2}/></div>
                            <div><img src={Carousel_3}/></div>
                            <div><img src={Carousel_4}/></div>
                        </Carousel>
                    </div>
                    <MobileNewsBlock count={20} type="top"/>
                </TabPane>
                <TabPane tab="社会" key="shehui">
                    <MobileNewsBlock count={20} type="shehui"/>
                </TabPane>
                <TabPane tab="国内" key="guonei">
                    <MobileNewsBlock count={20} type="guonei"/>
                </TabPane>
                <TabPane tab="国际" key="guoji">
                    <MobileNewsBlock count={20} type="guoji"/>
                </TabPane>
                <TabPane tab="娱乐" key="yule">
                    <MobileNewsBlock count={20} type="yule"/>
                </TabPane>
            </Tabs>

        )
    }
}
export default MobileNewsContainer