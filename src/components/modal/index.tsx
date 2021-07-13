import styled from "@emotion/styled";
import { Modal } from "antd"
import React, { useContext, useState } from "react"
console.log("modal index");

const modalRoot = document.getElementById('modals');


interface IMyModalContext{
  close:()=>void
}

const MyModalContext = React.createContext<IMyModalContext | null>(null);



export const MyModal = ({children}:React.ComponentProps<any>)=>{
  const [state,setState] = useState({
    visible:true
  });


  if(modalRoot){

    const handleCancel = () => {
      setState({
        visible:false
      });
    };

    const close = ()=>{
      setState({
        visible:false
      });
    }
    const afterClose = ()=>{
      console.log("afterClose");
    }


    return <MyModalContext.Provider value={{close}}>
      <Modal 
        visible={state.visible}
        afterClose={afterClose}
        // onOk={handleOk} 
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
        >
          <Container>
            {children}
          </Container>
      </Modal>
    </MyModalContext.Provider>
  }else{
    return null
  }
}

const Container = styled.div`
padding-bottom: 60px;
`

export const useMyModal = ()=>{
  const value = useContext(MyModalContext);
  console.log(value);
  return value;
}
