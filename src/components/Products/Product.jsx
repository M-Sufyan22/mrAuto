import React,{useEffect, useState,forwardRef} from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart, ShoppingBasket } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../../config/firebase";
import Carousel from "react-material-ui-carousel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SettingsIcon from "@material-ui/icons/Settings";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import MultipleLoginForms from "../loginForm/MulipleLoginForms";
import {check_current_user} from "../../store/action/action";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import EditRounded from "@material-ui/icons/EditRounded";
import PageviewIcon from "@material-ui/icons/Pageview";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";



const useStyles = makeStyles(() => ({

  media: {
    // minHeight: "250px",
    paddingTop:"50%"

  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0",
    paddingRight: "8px",
    paddingBottom: "7px"
  },
  anchorBtnc: {
    textDecoration: "none",
    padding: "0 !important",
    color: "inherit",
    "&:hover": {
      textDecoration: "none",
      color: "#ff5e14"
    },

  },
}));

const Product = (props) => {

    


  useEffect(()=>{
    setOpen(false)
  },[props.currentuser]);

  const [open,setOpen] = useState(false);
  const classes = useStyles();
  const product = props.product.prod;
  const [myalert, setAlert] = useState({
    show: false,
    msg: "",
    head: ""
  });
  const handleAddtoCart = (key) => {
    let userUid = props.currentuser.userUid;

    if(userUid){
   
    let dbRef = firebase.database().ref("users");
    dbRef
      .child(userUid)
      .get()
      .then((user) => {
        if (user.exists()) {
          dbRef.child(userUid).child('cartItems').get().then((cart) => {
           
              if (cart.exists()) {
               
                dbRef.child(userUid).child('cartItems').child(key).get().then((crtItem) => {
                  if (crtItem.exists()) {

                    dbRef.child(userUid).child('cartItems').child(key).set({
            productID: key,
            cate: product.category,
            qtn: crtItem.val().qtn >= 5 ? 5 : crtItem.val().qtn + 1
          })
            props.check_current_user();
           if(crtItem.val().qtn >=5 ){
            setAlert({show: true, msg: "You can add Only 5 items of each products",head:"Alert"})
           }else{
            setAlert({show: true, msg: "Product Added to Cart",head:"Thanks"})
           }
                  }else{
                 
          dbRef
          .child(userUid).child('cartItems').child(key).set({
            productID: key,
            cate: product.category,
            qtn: 1,
          });  props.check_current_user()
          setAlert({show: true, msg: "Product Added to Cart",head:"Thanks"})
                  }
                });
      
              }else{
                 
                dbRef
                .child(userUid).child('cartItems').child(key).set({
                  productID: key,
                  cate: product.category,
                  qtn: 1,
                });  props.check_current_user();
                setAlert({show: true, msg: "Product Added to Cart",head:"Thanks"})
                        }
            }).catch((error)=>console.log(error.message));

        }else{openLoginForm()}
      });

    }else{openLoginForm()}
  };
  const openLoginForm = () => {
    open ? setOpen(false) : setOpen(true);
};
  return (
    
    <Card className="card">
        <MultipleLoginForms
                open={open}
                onClose={openLoginForm}
                againopen={openLoginForm}
            />
      <Carousel
        autoPlay={false}
        animation="slide"
        swipe={true}
        indicators={true}
        IndicatorIcon={
        <SettingsIcon style={{ width: "15px" }} />} // Previous Example
        indicatorIconButtonProps={{
          style: {
            color: "#000",
            fontSize: "10px",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#ff5e14",
          },
        }}

        NextIcon={<ArrowForwardIcon />}
        PrevIcon={<ArrowBackIcon />}
        

      >
        {product.imgs.map((item, i) => (
          <CardSlider key={i} item={item} category={product.category} link={product.key} />
        ))}
      </Carousel>

      <Link
        to={{ pathname: `/Shop/${product.category}/${product.key}`  }}
        params={{ category: product.category, id: product.key }}
        className={classes.anchorBtnc}
      >
        <CardContent>
          <div>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className="prodTitle"
            >
              {product.title}
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              RS {product.price}
            </Typography>
          </div>
          <Typography
            className="prodPara"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {product.description} 
         
          </Typography>
        </CardContent>
      </Link>
      <CardActions className={classes.cardActions}>
        <IconButton style={{color: "#ff5e14"}} aria-label="Add to Cart"  onClick={() => handleAddtoCart(product.key)} >
          <AddShoppingCart 
          />
        </IconButton>
      </CardActions>

      {myalert.show && <ConfirmDialog msg={myalert.msg} head={myalert.head} open={myalert.show} close={()=> {setAlert({show: false, msg: ""})}}/>}
    </Card>
  );
};

function CardSlider(props) {
  const classes = useStyles();
  
  return (
    <CardMedia
      className={classes.media}
 
      image={props.item}
      component={Link}
      to={{ pathname: `/Shop/${props.category}/${props.link}`  }}
      params={{ category: props.category , id:props.link  }}
      // className={classes.anchorBtnc}
    />
  );
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ConfirmDialog = (props) => {


  return (
    <>

      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.close}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.head}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          {props.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
        component={Link}
        to="/MyCart"
        aria-label="View Cart"
        variant="contained"
        style={{ backgroundColor: "#ff5e14",color: "#fff"}}
        
      >
          View Cart 
        <ShoppingBasket />
    
      </Button>
          <Button
            color= {props.head === "Thanks" ? "primary": "secondary"}
            onClick={props.close}
            variant="contained"
          >
            ok 
            <DoneAllIcon  />
          </Button>
      
        </DialogActions>
      </Dialog>
    </>
  );
};
const mapStateToProps = (store) => ({
  currentuser: store.currentuser,
  allProducts: store.allProducts,

})

const mapDispatchToProps = (dispatch) => ({
  check_current_user: () => dispatch(check_current_user())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Product));
