import { createSlice } from "@reduxjs/toolkit";

const unreadMails = localStorage.getItem("numberOfMails");
const mailSlice = createSlice({
  name: "email",
  initialState: {
    sent: [],
    email:
      localStorage.getItem("email")?.replace(".", "")?.replace("@", "") || "",
    received: [],
    unreadMails: unreadMails ? unreadMails : 0,
    trash: [],
  },

  reducers: {
    sentMail(state, action) {
      state.sent = action.payload;
    },
    receivedMail(state, action) {
      state.received = action.payload;
    },
    unreadMessage(state, action) {
      state.unreadMails = action.payload;
    },
    deleteMail(state, action){
      state.trash.push(action.payload);
    }
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
