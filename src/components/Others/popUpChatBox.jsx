import React,{useState, useEffect,useRef} from 'react';
import "../../assets/css/popChat.css";
import { FaArrowDown, FaComment, FaPaperPlane, } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import {connect} from "react-redux";
import MultipleLoginForms from "../loginForm/MulipleLoginForms";
import IconButton from "@material-ui/core/IconButton";
import firebase from "../../config/firebase"


const PopUpChatBox = (props) => {
    const [chatbox,setChatbox] = useState(false)
    const [userMsg, setUserMsg] = useState("");
    const [oldMsgs, setOldMsgs] = useState([]);
 
    useEffect(() => {
      get_old_chats();  
    },[props.currentuser])

    const dbQueriesRef = firebase.database().ref('quickHelp');
    const demo = useRef();
    const btm = useRef();
    const chatScreen = useRef();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleUserMsgProps = (e) => {
      setUserMsg(e.target.value);
    };

    const sendMsgQury = (e) => {
      e.preventDefault();
      setTimeout(()=>{
        if(oldMsgs.length > 10){
          bringDownToChats();
        }
       
      },750)
       var dt = new Date();
      var h = dt.getHours(),
          m = dt.getMinutes();
      var time;
      if (h === 12) {
          time = h + ":" + m + " PM";
      } else {
          time = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + " AM";
      }
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;

      let sendMsg = {
        message: {
            msg: userMsg,
            sentTime: time,
            curtDate: today
        },
        senderDetails: {
            sentBy: props.currentuser.userName,
            senderEmail: props.currentuser.userEmail,
            uid: props.currentuser.userUid,
        },
    }

      dbQueriesRef.child(`/${props.currentuser.userUid }`).push(sendMsg)
          .then(() => {
              setUserMsg('');
       
          }).catch(function(error) {
             alert(error.message)
          })

  }

  const get_old_chats = () => {
        let chats = []
      let u = firebase.auth().currentUser;
      if(u){
        dbQueriesRef.child(`/${u.uid}`).on('child_added', function(data) {
          chats.push(data.val());
          setOldMsgs(chats);

      });
   
     

      }
       
}

const bringDownToChats = () => {
  demo.current.scrollIntoView({behavior:"smooth"});
};

const showGoToBottom = () => {
  const height = chatScreen.current.scrollHeight;
  const top = chatScreen.current.scrollTop;
  const client = chatScreen.current.clientHeight;

  // console.log(height - top, "===", client);
  if (height - top > client + 150) {
    btm.current.classList.add("show-btm");
  } else {
    btm.current.classList.remove("show-btm");
  }
};

const handleChatbox = () =>{
  chatbox ?  setChatbox(false) : setChatbox(true);
  setTimeout(()=>{
    if(demo.current){
      if(oldMsgs.length > 10){
        bringDownToChats();
      }
     
    }
    
  },750)
  setUserMsg('');
  get_old_chats();


}

    return (
        <>
        <MultipleLoginForms
        open={open}
        onClose={handleClose}
        againopen={handleClickOpen}
        closemsg={props.closemsg}
        
      />
           
        
        <div className="chatPopUpMain">
        {Object.keys(props.currentuser).length > 0 ? 
   <>
         {props.currentuser.admin   ?
         null
        
     
            : 
            <>

            <button onClick={handleChatbox} className="chatbox-open" >
              {chatbox ? <AiOutlineClose/> : <FaComment/>}
       
            </button>
      

            {chatbox && 
            <section className="chatbox-popup">
              <header className="chatbox-popup__header">
                <aside style={{flex: 1}}>
                  <h1>MR AutoMotive</h1> Agent (Online)
                </aside>
              </header>

              <main className="chatbox-popup__main">
                <>
                 <div
                  className="btm"
                  ref={btm}
                  onClick={bringDownToChats}
                >
                  <FaArrowDown/>
                </div>

                <ul ref={chatScreen} className="chat-pop-wrapp" onScroll={showGoToBottom}>


      
                {oldMsgs.length > 0 ?
            
                  
          
                  oldMsgs.map((msg,ind)=>{
                  return(
                    <li className="user-pop" key={ind}>{msg.message.msg}</li>
                  )
                  })
             : <p>
                We make it simple and seamless for<br /> bussiness and people to talk to each<br /> other. Ask us anything. 
                                </p>  
                                
                                    
             }
            <div ref={demo}> &nbsp;</div>  
             </ul>

            </>
              </main>
   
                <form onSubmit={(e)=> sendMsgQury(e)} className="chatbox-popup__footer">
                
                <aside style={{flex: 10}}>
                <input type="text" placeholder="Type your message here..." autoFocus onChange={(e)=> handleUserMsgProps(e)}  value={userMsg}/>
                
                 
                
                </aside>
                <aside style={{flex: 1, color: '#888', textAlign: 'center'}}>
               
                <IconButton type="submit" style={{ color:"#ff5e14", fontSize: "17px"}}>

              <FaPaperPlane  />
              </IconButton>
                </aside>
                </form>
                
    
            </section>
}
                </>
            }</>
              :    <button  onClick={handleClickOpen}className="chatbox-open">
              <FaComment/>
              
             
            </button> }
        </div>
      

        </>
    )
}


const mapStateToProps = (store) => ({
    currentuser: store.currentuser,
  });
  

export default connect(mapStateToProps,null)(PopUpChatBox);
