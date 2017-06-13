import  React from 'react'
import {Card} from 'antd';
import axios from 'axios';
import {Link} from 'react-router'

import '../css/news_image_block.css'

class NewsBlock extends React.Component{
    constructor(props){
        super(props)
        //初始化新闻状态
        this.state= {
            newsArr : []
        }
    }
    componentWillMount(){
        let{type,count} = this.props;
        //    配置url参数
        //let url = `http://wangyi.butterfly.mopaasapp.com/news/api?type=${type}&page=1&limit=${count}`;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        //发送ajax请求，获取新闻页面
        axios.get(url)
            .then(response =>{
                //获取新闻内容
                //let newsArr = response.data.list;
                let newsArr = response.data;
                //        更新状态
                this.setState({newsArr})

            })
            .catch(error =>{
                console.log(error.message)
            })

    }

    render(){
        let {title,count,type,width,imgWidth} = this.props;
        let{newsArr}= this.state;
        let newsList=newsArr.length>0
            ?(
                //    遍历
                newsArr.map((news,index)=> {
                    return(
                        /*<li>
                            <Link to={`/news_detail/${news.id}`}>{news.title}</Link>
                        </li>*/
                        <li>
                            <Link to={`/news_detail/${news.uniquekey}`}>{news.title}</Link>
                        </li>
                    )

                })
            )
            :'暂时没有推送消息';

        return(
            <div>
                <Card>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        )
    }
}
NewsBlock.propTypes = {
    count: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
};
export default NewsBlock;
