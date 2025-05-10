import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    chatCounter : 0,
    chatId:''
}

let chatCounterSlice = createSlice({
    name:'chatCounter',
    initialState,
    reducers:{
        increment: (state) => {
            state.chatCounter++
            console.log(state.chatCounter)
        },
        reNewChatID:(state,action)=>{
            console.log("befor : ",state.chatId)
            state.chatId = action.payload
            console.log("after : ",state.chatId)
        }       
    }
})

export const {increment,reNewChatID} = chatCounterSlice.actions
export default chatCounterSlice.reducer