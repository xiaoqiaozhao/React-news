import React from 'react';
import axios from 'axios';
import NewsComments from './news_comments';
import NewsImageBlock from './news_img_block';
import {
    Row,
    Col,
    BackTop
} from 'antd';

class MobileNewsDetail extends React.Component{

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
            <div>
                <div dangerouslySetInnerHTML={{__html : news.pagecontent}}></div>
                <NewsComments newsId={this.props.params.news_id}/>

                <BackTop></BackTop>
            </div>

        )
    }
}
export default MobileNewsDetail