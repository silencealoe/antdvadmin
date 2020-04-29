const login = {
    namespaced: true,
    state:{
        username:'',
        password:''
    },
    mutations:{
        setUsernameAndPassword(state, payload){
            state.username=payload.userName
            state.password=payload.password
            localStorage.setItem('username', state.username)
            console.log('state', state)
        }
    },
    actions:{

    }
}
export default  login
