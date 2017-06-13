import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute, hashHistory} from 'react-router'
import MediaQuery from 'react-responsive';

import App from './components/app';
import NewsContainer from './components/news_container';
import NewsDetail from './components/news_detail';
import UserCenter from './components/user_center';

import MobileApp from './components/mobile_app';
import MobileNewsContainer from './components/mobile_news_container';
import MobileNewsDetail from './components/mobile_news_detail';
import MobileUserCenter from './components/mobile_user_center';

ReactDOM.render(
    (
        <div>
            <MediaQuery query='(min-device-width: 1224px)'>
                <Router history={hashHistory}>
                    <Route path="/" components={App}>
                        <IndexRoute components={NewsContainer}></IndexRoute>
                        <Route path="/news_detail/:news_id" components={NewsDetail}></Route>
                        <Route path="/user_center/:userId" components={UserCenter}></Route>
                    </Route>
                </Router>
            </MediaQuery>

            <MediaQuery query='(max-device-width: 1224px)'>
                <Router history={hashHistory}>
                    <Route path="/" components={MobileApp}>
                        <IndexRoute components={MobileNewsContainer}></IndexRoute>
                        <Route path="/news_detail/:news_id" components={MobileNewsDetail}></Route>
                        <Route path="/user_center" components={MobileUserCenter}></Route>
                    </Route>
                </Router>
            </MediaQuery>

        </div>

    ),
  document.getElementById('root')
);
