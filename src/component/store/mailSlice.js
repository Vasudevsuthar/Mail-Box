import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: 'email',
    initialState: {
        sent: [],
        email: localStorage.getItem("email")?.replace(".","")?.replace("@","") || "",
    },

    reducers: {
        sendMail(state, action){
            state.sent = action.payload;
        },
    },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;