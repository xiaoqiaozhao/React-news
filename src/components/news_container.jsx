/**
 * Created by zqq on 2017/5/6.
 */
import React from 'react';
import {Link} from 'react-router';
import NewsImageBlock from './news_img_block';
import NewsBlock from './news_block';
import NewsProducts from './news_products';

import {
    Col,
    Row,
    Carousel,
    Tabs

} from 'antd'

import Carousel_1 from '../images/carousel_1.jpg'
import Carousel_2 from '../images/carousel_2.jpg'
import Carousel_3 from '../images/carousel_3.jpg'
import Carousel_4 from '../images/carousel_4.jpg'

import '../css/news_container.css'

const TabPane = Tabs.TabPane;

class NewsContainer extends React.Component{
    render(){
        return(
            /*<div className="newsContainer">
                <Row>
                    <Col span={2}></Col>>
                    <Col span={20}>
                        <div className="leftContainer1">
                            <Carousel autoplay  className="carousel">
                                <div><img src={Carousel_1} alt=""/></div>
                                <div><img src={Carousel_2} alt=""/></div>
                                <div><img src={Carousel_3} alt=""/></div>
                                <div><img src={Carousel_4} alt=""/></div>
                            </Carousel>
                            <NewsImageBlock title="军事" type="war" count={6} width="100%" imgWidth="108px" />

                        </div>
                        <Tabs className="news_tab">
                            <TabPane tab="娱乐新闻" key="1">
                                <NewsBlock type="ent" count={22}/>
                            </TabPane>
                            <TabPane tab="科技" key="2">
                                <NewsBlock type="tech" count={25}/>
                            </TabPane>
                        </Tabs>

                        <div>
                            <NewsImageBlock title="教育" type="edu" count={8} width="100%" imgWidth="115px"  />
                            <NewsImageBlock title="旅游" type="travel" count={16} width="100%" imgWidth="115px"  />
                        </div>

                    </Col>>
                    <Col span={2}></Col>>
                </Row>

            </div>*/
            <div className="newsContainer">
                <Row>
                    <Col span={1}></Col>

                    <Col span={22}>
                        <div className="leftContainer1">
                            <Carousel autoplay>
                                <div><img src={Carousel_1} alt=""/></div>
                                <div><img src={Carousel_2} alt=""/></div>
                                <div><img src={Carousel_3} alt=""/></div>
                                <div><img src={Carousel_4} alt=""/></div>
                            </Carousel>
                            <NewsImageBlock title="国际头条" count={6} type="guoji" width="100%" imgWidth="115px"/>
                        </div>
                        <Tabs className="news_tab">
                            <TabPane tab="娱乐新闻" key="1">
                                <NewsBlock type="yule" count={22}/>
                            </TabPane>
                            <TabPane tab="科技" key="2">
                                <NewsBlock type="keji" count={25}/>
                            </TabPane>

                        </Tabs>
                        <Tabs className="news_product">
                            <TabPane tab="React产品" key="1">
                                <NewsProducts />
                            </TabPane>
                        </Tabs>
                        <div>
                            <NewsImageBlock title="国内新闻" count={8} type="guonei" width="100%" imgWidth="115px"/>
                            <NewsImageBlock title="娱乐新闻" count={16} type="yule" width="100%" imgWidth="115px"/>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>

        )
    }
}
export default NewsContainer