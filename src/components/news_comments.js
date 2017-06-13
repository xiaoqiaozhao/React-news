import React from 'react';
import axios from 'axios';
import {
    Row,
    Col,
    Form,
    Card,
    Button,
    Input,
    message,
    notification

} from 'antd';

const FormItem = Form.Item;
class NewsComments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments : []
        }
    }
    componentWillMount(){
        let {newsId} = this.props;
        //let url = 'http://localhost:3000/comments'
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${newsId}`;
        axios.get(url)
            .then(response =>{
                let comments = response.data.map(comment=>{
                    return{
                        username: comment.UserName,
                        comment: comment.Comments,
                        datetime: comment.datetime
                    }
                })
            //    更新状态
                this.setState({comments})

            })
            .catch(error=>{
                console.log(error.message)
            })
    }

    //定义提交评论的方法
    handleSubmit = (event) =>{
    //    取消提交按钮的默认行为
        event.preventDefault()
    //    获取userId    localStorage.getItem('user_KEY')得到是一个对象。里面包含username和userId
        let userId = JSON.parse(localStorage.getItem('user_KEY') || '[]').userId;
    //    判断用户是否登录
        if(!userId){
            message.warn('请先登录')
            return
        }
        let {newsId} = this.props;
    //    获取评论内容
        let comment = this.props.form.getFieldValue('comment');
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${newsId}&commnet=${comment}`
    //    发送提交评论的请求
        axios.get(url)
            .then(response=>{
                message.success('提交评论成功');
                this.componentWillMount();
                /*刷新状态*/
                this.props.form.resetFields();
            })

    }

    //收藏文章的方法
    handleCollection= () =>{
        //    获取userId    localStorage.getItem('user_KEY')得到是一个对象。里面包含username和userId
        let userId = JSON.parse(localStorage.getItem('user_KEY') || '[]').userId;
        //    判断用户是否登录
        if(!userId){
            message.warning('请先登录')
            return
        }
        let {newsId} = this.props;
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${newsId}`
        //    发送收藏文章的请求
        axios.get(url)
            .then(response=>{
                //通知提醒框
                notification.success({
                    message:'ReactNews',
                    description:'收藏成功'

                });
            })
    }
    render(){
        let {comments} = this.state;
        let {getFieldDecorator} = this.props.form;
        let commentsList = comments.map((item,index)=>{
            return(
                <Card key={index} title={item.username} extra={<p style={{color:'blue'}}>{`发布于:${item.datetime}`}</p>}>
                    {item.comment}
                </Card>
            )
        })
        return (
            //显示评论区内容
            //添加评论
            <div>
               {commentsList}
               <Form onSubmit={this.handleSubmit}>
                   <FormItem label="您的评论" labelCol={{span: 13}}>
                       {
                           getFieldDecorator('comment')(
                               <Input type='textarea' placeholder="请输入您的评论内容" />
                           )
                       }
                   </FormItem>
                   <Row>
                       <Col span={6} push={10}>
                           <Button htmlType="submit" type='primary'>提交评论</Button>&nbsp;&nbsp;
                           <Button onClick={this.handleCollection} type='primary'>收藏该文章</Button>
                       </Col>
                   </Row>
               </Form>
            </div>
        )
    }
}
export default Form.create()(NewsComments);//得到 this.props.form