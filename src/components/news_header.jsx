
import React from 'react';
import axios from 'axios'
import {
    Row,
    Col,
    Menu,
    Icon,
    Button,
    Modal,
    Tabs,
    Form,
    Input,
    message


} from 'antd';
import {Link} from 'react-router'


import logo from '../images/logo.png';

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class NewsHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            key: 'top',
            username: null,
            userId:null,
            isShow: false
        }
    }
//定义导航切换到哪个页签
    changeKey = (event) =>{
//console.log(event);
        if(event.key === 'logAndReg'){
            this.setState({
                key:event.key,
                isShow:true
            })
            this.props.form.resetFields();
        }

        this.setState({key: event.key})
    }
//定义登录注册显示与隐藏
    handleShow = (isShow,event) =>{
        this.setState({isShow})
        console.log('显示隐藏正常')
    }
//定义退出
    handleOut = () => {
        this.setState({
            username : null,
            userId : null
        });
//删除用户储存信息
        localStorage.removeItem('user_KEY');
    };

//读取用户信息
    componentWillMount(){
//读取用户数据
        let user = JSON.parse(localStorage.getItem('user_KEY'));
        console.log('user = ' + user)
        if(user){//当读取到用户数据的时候
            this.setState({//更新状态
                username : user.username,
                userId : user.userId
            })
            console.log('读取用户数据正常')
        }
    }

//处理表单项提交的方法

    handleSubmit = (isRegister,event) =>{
        console.log(111)
        //阻止默认行为
        event.preventDefault();
        //判断action
        let action = isRegister?'register':'login';
        //获取表单项的内容，准备url
        let {username, password, r_username, r_password, r_confirmPassword} = this.props.form.getFieldsValue();
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_username=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        console.log(action)
//发送ajax请求提交数据
        axios.get(url)
            .then(response => {

                let data = response.data;
                if(isRegister){
                    message.success('恭喜您注册成功')
                }else{
                    //判断登录是否成功
                    if(!data){
                        message.error('登录失败')
                    }else{
                        message.success('登录成功')
                        // 修改用户状态
                        this.setState({
                            username: data.NickUserName,
                            userId:data.UserId
                        })
                        //保存用户信息到localStorage中
                        let {username, userId} = this.state;
                        localStorage.setItem('user_KEY', JSON.stringify({username, userId}));
                    }
                }
            })
        //修改对话框的状态为隐藏;
        this.setState({
            isShow : false
        });

    };
    render(){
        /*注意一定要先定义key*/
        let {key,username,userId,isShow} = this.state;
        /*先定义，下方登录注册会用*/
        let { getFieldDecorator } = this.props.form;
        let UserMenu = username
            ?(
                <MenuItem key="people" className="register">
                    <Button type="primary">{username}</Button>&nbsp;&nbsp;
                    <Button type="dashed"><Link to={`/user_center/${userId}`}>个人中心</Link></Button>&nbsp;&nbsp;
                    <Button  onClick={this.handleOut} type="Ghost">退出</Button>
                </MenuItem>
            )
            :(
                <MenuItem key="logAndReg" className="register">
                    <Icon type="appstore"/>
                    登录注册
                </MenuItem>
            )
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <div className="logo">
                            <Link to="/">
                                <img src={logo} alt="logo"/>
                                <span>ReactNews</span>
                            </Link>
                        </div>
                    </Col>
                    <Col span={19}>
                        <Menu onClick={this.changeKey} mode="horizontal" selectedKeys={[key]}>
                            <MenuItem key="top">
                                <Icon type="appstore" />头条
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Icon type="appstore"/>社会
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore"/>国内
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore"/>国际
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore"/>娱乐
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore"/>体育
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore"/>科技
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore"/>时尚
                            </MenuItem>
                            {UserMenu}
                        </Menu>
                        <Modal title='用户中心' visible={isShow} okText="关闭"
                            //this.handleShow.bind(this,false)这里使用bind是因为this在这里是Modal对象
                               onOk={this.handleShow.bind(this,false)} onCancel={this.handleShow.bind(this,false)}>
                            <Tabs onChange={() => this.props.form.resetFields()}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                        <FormItem label="用户名">
                                            {getFieldDecorator('username')(
                                                <Input type="text" placeholder="请输入用户名" />
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password')(
                                                <Input type="password" placeholder="请输入密码" />
                                            )}
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">登录</Button>
                                    </Form>

                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                        <FormItem label="用户名">
                                            {getFieldDecorator('r_username')(
                                                <Input type="text" placeholder="请输入用户名" />
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('r_password')(
                                                <Input type="password" placeholder="请输入密码" />
                                            )}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_confirmPassword')(
                                                <Input type="password" placeholder="请再次输入密码" />
                                            )}
                                        </FormItem>
                                    </Form>
                                    <Button type="primary" htmlType="submit">注册</Button>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}
export default Form.create()(NewsHeader);

