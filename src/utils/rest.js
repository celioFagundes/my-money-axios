import { useEffect, useReducer } from "react"
import axios from "axios"

axios.defaults.validateStatus = code => code < 500
const initialState= {
  loading: true,
  data: {},
  error : '',
  code :''
}
const reducer = (state,action) =>{
    switch(action.type){
      case 'REQUEST' : 
        return {...state,loading : true}
      case 'SUCCESS' :
        return { 
          ...state, 
          loading:false, 
          data: action.payload}
      case 'FAILURE':
        return {
          ...state,
          loading:false,
          error : action.error,
          code: action.code
        }
      default : 
    return state
    }
  }
 
  const getAuth = () =>{
    const token = localStorage.getItem('token')
    if(token){
      return '?auth=' + token
    }
    return ''
  }
  const init = baseURL =>{
    
    
    const useGet = resource =>{

      const [state, dispatch] = useReducer(reducer, initialState)

      const carregar = async() =>{
        try{
          const res = await axios.get(baseURL + resource + '.json' + getAuth())
          if(res.data.error && Object.keys(res.data.error).length > 0){
            dispatch({type:'FAILURE', error : res.data.error})
          }
          else{
            dispatch({type : 'SUCCESS' , payload : res.data})
        }}
        catch(err){
          dispatch({type:'FAILURE', error : 'Unknow error'})
        }
      }
      useEffect(() =>{

        carregar()

      },[])
      return {
        ...state,
        refetch: carregar
      }
    }

    const usePost = resource =>{
      const [state, dispatch] = useReducer(reducer, initialState)

      const post = async(data) =>{
          dispatch({type: 'REQUEST'})
          const res = await axios.post(baseURL + resource + '.json' +  getAuth(),data)
          dispatch({type : 'SUCCESS' , payload : res.data}) 
       
      }
      return [state,post]
    }

    const useDelete = () =>{
      const [state, dispatch] = useReducer(reducer, initialState)
      const remove = async(resource) =>{
          dispatch({type: 'REQUEST'})
          await axios.delete(baseURL + resource + '.json' + getAuth())
          dispatch({type : 'SUCCESS'}) 
      }
      return [state,remove]
    }
    const usePatch = resource =>{
      const [state, dispatch] = useReducer(reducer, initialState)
      const patch = async(data) =>{
          dispatch({type: 'REQUEST'})
          await axios.patch(baseURL + resource + '.json' + getAuth(),data)
          dispatch({type : 'SUCCESS'}) 
      }
      return [state,patch]
    }
    return {useGet, usePost, useDelete,usePatch}
  }
  
  export const usePost = resource =>{
    const [state, dispatch] = useReducer(reducer, initialState)

    const post = async(data) =>{
        dispatch({type: 'REQUEST'})
        
        try{
          const res = await axios.post( resource + getAuth() ,data)
          if(res.data.error && Object.keys(res.data.error).length > 0){
            dispatch({type: 'FAILURE', error: res.data.error.message})
          }else{
          dispatch({type : 'SUCCESS' , payload : res.data}) 
          return res.data
        }
        }catch(err){

          dispatch({type: 'FAILURE', error : 'Unknow error'})
        }
      }
    return [state,post]
  }
  export default init