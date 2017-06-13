import React from 'react';
import {Row, Col} from 'antd'

import '../css/news_footer.css'
class NewsFooter extends React.Component{

    render(){
        return(
            <Row className='newsFooter'>
                <log span={24}>
                    &copy;2016 ReactNews. All Rights Reserved.
                </log>
            </Row>

        )
    }
}
export default NewsFooter