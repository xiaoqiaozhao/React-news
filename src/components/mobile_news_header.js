import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {
    Icon,
    Button,
    Modal,
    Tabs,
    Form,
    Input,
    message

} from 'antd';

import logo from '../images/logo.png';


const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class MobileNewsHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : null,
            userId : null,
            isShow : false
        }
    }
    //切换key的方法

    changeKey = (event) => {
        //console.log(event.key);
        //判断点击的是否是登录注册按钮
        if(event.key==='logAndRes'){
            this.setState({
                key : event.key,
                isShow : true
            });
            this.props.form.resetFields();
        }
        this.setState({key : event.key});
    };
    //处理对话框显示隐藏的方法
    handleShow = (isShow, event) => {
        //console.log(isShow, event);
        this.setState({isShow});
        console.log(    111)
    };

    //读取用户信息
    componentWillMount(){
        //读取用户数据
        let user = JSON.parse(localStorage.getItem('user_KEY'));
        if(user){//当读取到用户数据的时候
            this.setState({//更新状态
                username : user.username,
                userId : user.userId
            })
        }
    }
    //处理表单项提交的方法
    handleSubmit = (isRegister, event) => {
        //阻止默认行为
        event.preventDefault();
        //判断action
        let action = isRegister?'register':'login';
        //获取表单项的内容，准备url
        let {username, password, r_username, r_password, r_confirmPassword} = this.props.form.getFieldsValue();
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_username=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        //发送ajax请求提交数据
        axios.get(url)
            .then(response => {
                let data = response.data;
                //判断是登录还是注册
                if(isRegister){
                    message.success('恭喜您，注册成功');
                }else{
                    //判断登录是否成功
                    if(!data){//登录失败
                        message.error('登录失败');
                    }else{//登录成功
                        message.success('登录成功');
                        //修改用户状态
                        this.setState({
                            username : data.NickUserName,
                            userId : data.UserId
                        });
                        //保存用户信息到localStorage中
                        let {username, userId} = this.state;
                        localStorage.setItem('user_KEY', JSON.stringify({username, userId}));
                    }
                }
            });
        //修改对话框的状态为隐藏;
        this.setState({
            isShow : false
        });
    };
    render(){
        let {username, userId, isShow} = this.state;
        let {getFieldDecorator} = this.props.form;
        const UserMenu = username
            ? <Link to='/user_center'>
                <Icon type="inbox"/>
              </Link>
            : <Icon type="setting" onClick={this.handleShow.bind(this, true)}/>

        return (
            <div id="mobileheader">
                <header>
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </Link>

                        {UserMenu}
                    </div>
                    <Modal title="用户中心" visible={isShow}
                           okText='关闭' onOk={this.handleShow.bind(this,false)} onCancel={this.handleShow.bind(this,false)}>
                        <Tabs onChange={() => this.props.form.resetFields()}>
                            <TabPane tab="登录" key="1">
                                <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                    <FormItem label="用户名">
                                        {
                                            getFieldDecorator('username')(
                                                <Input type="text" placeholder="请输入用户名"/>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label="密码">
                                        {
                                            getFieldDecorator('password')(
                                                <Input type="password" placeholder="请输入用户密码"/>
                                            )
                                        }
                                    </FormItem>
                                    <Button type="primary" htmlType='submit'>登录</Button>
                                </Form>
                            </TabPane>
                            <TabPane tab="注册" key="2">
                                <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                    <FormItem label="用户名">
                                        {
                                            getFieldDecorator('r_username')(
                                                <Input type="text" placeholder="请输入用户名"/>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label="密码">
                                        {
                                            getFieldDecorator('r_password')(
                                                <Input type="password" placeholder="请输入用户密码"/>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label="确认密码">
                                        {
                                            getFieldDecorator('r_confirmPassword')(
                                                <Input type="password" placeholder="请再次确认输入密码"/>
                                            )
                                        }
                                    </FormItem>
                                    <Button type="primary" htmlType='submit'>注册</Button>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>
                </header>
            </div>

        )
    }
}
export default Form.create()(MobileNewsHeader);

//可以获取 this.props.form
//this.props.form.getFieldDecorator()