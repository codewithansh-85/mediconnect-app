import { configureStore } from "@reduxjs/toolkit";
import { docreducer } from "./Doctorreducers";

const store=configureStore({
    reducer:docreducer
})

export default store