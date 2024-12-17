import React, { useEffect, useState } from "react"; 
import { Button, Dialog, Select, Slide, Zoom } from "@material-ui/core"; 
import { BsPlus, FaRegAddressBook, IoList } from "react-icons/all"; 
import OrderItem from "./OrderItem"; 
import AddressItem from "./AddressItem"; 
import EditAddress from "./AddressBook/EditAddress"; 
import AddAddress from "./AddressBook/AddAddress"; 
import axios from "axios"; 

function AddressBook(props) {   
  const [openAddAddress, setAdd] = useState(false);   
  const [addresses, setAddresses] = useState([]);   

  useEffect(() => {     
    axios       
      .get(         
        `http://localhost:8070/deliveries/addresses/${localStorage.getItem(           
          "Email"         
        )}`       
      )       
      .then((res) => {         
        setAddresses(res.data);       
      })       
      .catch((err) => {         
        console.log("Lỗi=>" + err);       
      });   
  },[]);    

  const handleClickOpenPop = (value) => {     
    if (value === "add") {       
      setAdd(true);     
    }   
  };    

  const handleClosePop = (value) => {     
    if (value === "add") {       
      setAdd(false);     
    }   
  };   

  return (     
    <div>       
      <div>         
        <h6 className="profile-divider">           
          <span>Sổ Địa Chỉ</span>         
        </h6>{" "}       
      </div>       

      <div className="d-flex justify-content-end ">         
        <div>           
          <Button             
            className={"add-new-address"}             
            startIcon={<BsPlus />}             
            onClick={() => handleClickOpenPop("add")}           
          >             
            Thêm Mới           
          </Button>{" "}         
        </div>       
      </div>        

      {addresses.map((address, index) => {         
        return (           
          <div key={index}>             
            <AddressItem address={address} />           
          </div>         
        );       
      })}        

      <div>         
        <Dialog           
          style={{ zIndex: 9999 }}           
          open={openAddAddress}           
          fullWidth={true}           
          TransitionComponent={Zoom}           
          onClose={() => handleClosePop("add")}         
        >           
          <AddAddress close={handleClosePop} />         
        </Dialog>       
      </div>     
    </div>   
  ); 
}  

export default AddressBook;
