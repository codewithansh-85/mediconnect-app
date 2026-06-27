import {createSlice} from "@reduxjs/toolkit"

const initialState={
    MyClinics:[],
    Patient:[]

}

const DoctorSlice=createSlice({
    name:"Doctor",
    initialState,
    reducers:{

        setMyclinics:(state,action)=>{
            state.MyClinics=action.payload



        },
        clearMyclinics:(state,action)=>{
           state.MyClinics=[] 
        },
        setPatient:(state,action)=>{
            state.Patient=action.payload
        },
        clearPatient:(state,action)=>{
            state.Patient=[]
        }

    }
})

export const {setMyclinics,setPatient,clearPatient,clearMyclinics}=DoctorSlice.actions;

export  const docreducer=DoctorSlice.reducer
