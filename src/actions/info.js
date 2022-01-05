import * as actions from './../constraints/info';
export const updateInfo = (info)=>{
    return{
        type:actions.updateInfo,
        info
    }
}