import React from 'react'
import {ChatEngine} from "react-chat-engine";
import firebase from "../../../config/firebase";
import {connect} from "react-redux";

const ChatBoard = (props) => {
    const user = firebase.auth().currentUser;
    console.log(user)

    return (
        <div>
            <ChatEngine
           height="calc(100vh - 66px)"
           projectId="01224030-0b38-410a-9673-d8d748a35803"
           userName={user.email}
           userSecret={user.uid}
            />
        </div>
    )
}
const mapStateToProps = (store) => ({
    allProducts: store.allProducts,
    currentuser: store.currentuser,
  });
  
//   const mapDispatchToProps = (dispatch) => ({
//     get_All_Products: () => dispatch(get_All_Products()),
//     check_current_user: () => dispatch(check_current_user()),
//   });
export default connect(mapStateToProps, null)(ChatBoard);
