import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from 'react-redux';



  
  
  const CHECK_TG_REG = gql`
      query checkTg($phone: String) {
        telegram(phone: $phone ) {
          telegram_id,
          user{
            role
          }  
        }
      }
  `

const Enter = () => {
    const [chatId, setChatId] = useState(null);
    const [values, setValues] = useState({
        phone: '',
        password: ''
    });

    const [goPass, setGoPass] = useState(false);
    const [logged, setLogged] = useState(false);
    
    const store = useStore()
    const [getCheck, { data }] = useLazyQuery(CHECK_TG_REG);
    // console.log(store.dispatch());
    console.log(store.getState());
    // console.log(store);
    useEffect(()=>{
            
        if(data?.telegram){
            if(data.telegram.user.role === 'admin'){
                setChatId(data.telegram.telegram_id);
            }
        }else{
            console.log('empty')
        }
        
    }, [data])

    useEffect(()=>{
        if (chatId) {
            axios.post('http://localhost:3002/bot-log-in', {
                chatId
            })
            .then(({data}) =>{
                console.log(data);
                if(!data){
                    alert('ERROR')
                }else{
                    setGoPass(true)
                }
            })
            .catch(err => console.log(err))
        }
    }, [chatId])
    
    // console.log(error)
    return (
        <>
        { !logged &&
            <div>
                
                <input type="text" placeholder='num' name='phone' value={values.phone} onChange={({target})=>{changeValue(target)}}/>
                <br />
                {   !goPass &&
                    <button onClick={()=>{checkAdmin()}}>Check</button>
                }
                {
                    goPass && 
                    <>
                    <input type="text" placeholder='pass' name="password" value={values.password} onChange={({target})=>{changeValue(target)}}/>
                    <button onClick={()=>{checkPassword()}}>Check</button>
                    </>
                }

            
            </div>
}
            {
                logged && <h1>Zdarova ebanui Hyi</h1>
            }
        </>
    );


    function checkPassword() {
        axios.post('http://localhost:3002/bot-check-pass', {
            pass: values.password,
            chatId
        })
        .then(({data}) => {
            console.log(data)
            if(data){
                window.localStorage.setItem('salt', 'asdasdasd')
                window.localStorage.setItem('phone', values.phone)
                setLogged(true);
            }else{
                alert('PIWOV NAHYI')
            }
        })
    }
    function checkAdmin() {
        getCheck({variables: { phone: values.phone }})
    }


    function changeValue(target) {
        setValues((pr)=>{
            return(
                {
                    ...pr,
                    [target.name]: target.value
                }
            )
        })
    }
}




export default Enter;
