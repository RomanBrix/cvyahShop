import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getSalt = createAsyncThunk('GET_SALT', async(_,thunkApi)=>{
   console.log('thunk')
   console.log(_)
   console.log(thunkApi)
    return {
        salt:  window.localStorage.getItem('salt'),
        phone: window.localStorage.getItem('phone'),

    };
})

export const goVerif = createAsyncThunk('GET_SALT', async(_,thunkApi)=>{
   //
   /// Send phone and salt for verif
   //
    return {
        salt:  window.localStorage.getItem('salt'),
        phone: window.localStorage.getItem('phone'),

    };
})


const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    salt: null,
    phone: null,
    user: {},
    verif: false
  },
  reducers: {
    enter: (state, payload) => {
        console.log(payload)

      state = state;
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(getSalt.fulfilled, (state, {payload})=>{
        state = {
            ...state,
            salt: payload.salt,
            phone: payload.phone
        }
    });


    // builder.addCase(goVerif.fulfilled, (state, {payload})=>{
    //     state = {
    //         ...state,
    //         salt: payload.salt,
    //         phone: payload.phone
    //     }
    // })
  }
})

export const { enter } = LoginSlice.actions;
export default LoginSlice.reducer;