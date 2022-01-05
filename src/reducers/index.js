import {combineReducers} from 'redux';
//reducers
import isLogin from './login';
import info from './info';
import friends from './listfriends';
import groups from './groups';
import texting from './texting';
import selected from './selected';
import request_friend from './request';
import accept_friend from './accept';
import messages from './messages';
const indexReducer = combineReducers({
    isLogin,
    info,
    friends,
    groups,
    texting,
    selected,
    request_friend,
    accept_friend,
    messages
});

export default indexReducer;