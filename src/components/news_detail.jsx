import React from 'react';
import NewsComments from './news_comments';
import NewsImageBlock from './news_img_block';

import axios from 'axios'
import{
    Row,
    Col,
    BackTop
} from 'antd'

class NewsDetail extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            news:''
        }
    }
    componentWillMount() {
        this.showDetail(this.props);
    }
    //详情页右侧的新闻点击后显示相应详情页
    /*
    * 思路：根据newsId获取到相应的评论列表(news_comments中的let {newsId} = this.props;)
    * 这时props也会相应的改变为，但是页面显示的评论列表还是原来的，于是需要再发送一个请求把最新的评论列表获取到。
    * 下面这步操作便起到了这个作用
    * */
    componentWillReceiveProps(nextProps) {
        this.showDetail(nextProps);
    }
    showDetail = (props) => {
        let newsId = this.props.params.news_id;
        //let url=`http://wangyi.butterfly.mopaasapp.com/detail/api?simpleId=${newsId}`
        let url= `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`
        //    发送ajax请求
        axios.get(url)
            .then(response => {
                let news = response.data;
                //    更新状态
                this.setState({news})
            })
            .catch(error =>{
                console.log(error.message);
            })
    }
    render(){
        let {news} = this.state;
        return(
            /*<div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <div dangerouslySetInnerHTML={{__html : news.content}}></div>
                        <NewsComments newsId={this.props.params.news_id}/>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock title="女人" count={18} type="lady" width="300px" imgWidth="115px"/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <NewsComments />
            </div>*/
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <div dangerouslySetInnerHTML={{__html : news.pagecontent}}></div>
                        <NewsComments newsId={this.props.params.news_id}/>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock type="keji" count={18} width="300px" imgWidth="115px"/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <BackTop></BackTop>
            </div>

        )
    }
}
export default NewsDetail
