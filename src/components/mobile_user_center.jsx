import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Tabs,
    Card,
    Upload,
    Modal,
    Icon
} from 'antd';
const TabPane = Tabs.TabPane;

class MobileUserCenter extends React.Component{
    constructor(props){
        super(props);
        //初始化状态
        this.state = {
            comments:[],
            collections:[],
            previewVisible:false,
            previewImage:'',
            fileList:[{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        }
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    componentWillMount() {
        let userId = this.props.params.userId;
        //    获取评论列表数据
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`

        axios.get(url)
            .then(response => {
                let comments = response.data;
                //    更新comments的状态
                this.setState({comments})
            })
        //    获取收藏列表数据
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
        axios.get(url)
            .then(response => {
                let collections = response.data;
                //    更新comments的状态
                this.setState({collections})
            })
    }
    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        let {comments,collections}= this.state;
        //遍历评论列表
        let commentsList = comments.length>0
            ?(
                comments.map((comment,index) => {
                    return(
                        <Card key={index} title={`于:${comment.datetime}评论了:${comment.uniquekey}`} extra={<p style={{color:'blue'}}><Link to={`/news_detail/${comment.uniquekey}`}>查看</Link></p>}>
                            {comment.Comments}
                        </Card>
                    )

                })
            )
            :'没有评论内容';
        // 遍历收藏列表
        let collectionsList = collections.length>0
            ?(
                collections.map((item,index)=>{
                    return(
                        <Card key={index} title={item.uniquekey} extra={<p style={{color:'blue'}}><Link to={`/news_detail/${item.uniquekey}`}>查看</Link></p>}>
                            {item.Title}
                        </Card>
                    )

                })
            )
            :'没有收藏内容';

        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Tabs>
                            <TabPane key="1" tab="我的收藏列表">
                                {collectionsList}
                            </TabPane>
                            <TabPane key="2" tab="我的评论列表">
                                {commentsList}
                            </TabPane>
                            <TabPane key="3" tab="头像设置">
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}  multiple="true"
                                >
                                    {uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}></Col>
                </Row>

            </div>
        )

    }
}
export default MobileUserCenter;