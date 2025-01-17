import React, { useRef, useEffect, useCallback } from "react"; 
import { useSpring, animated } from "react-spring"; 
import styled from "styled-components"; 
import { MdClose } from "react-icons/md"; 

const Background = styled.div`
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.8);
   position: fixed;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ModalWrapper = styled.div`
   width: 800px;
   height: 200px;
   box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
   background: #fff;
   color: #000;
   display: inline-block;
   grid-template-columns: 1fr 1fr;
   position: fixed;
   z-index: 10;
   border-radius: 10px;
`;

const ModalContent = styled.div`
   display: inline-block;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   line-height: 1;
   color: #141414;
   p {
     margin-bottom: 1rem;
   }
   button {
     width: 200px;
     padding: 10px 24px;
     margin-left: 10px;
     background: #141414;
     color: #fff;
     border: none;
   }
`;

const CloseModalButton = styled(MdClose)`
   cursor: pointer;
   position: absolute;
   top: 20px;
   right: 20px;
   width: 32px;
   height: 32px;
   padding: 0;
   z-index: 10;
`;

function Modal({ showPop, setShowPop }) {
   const modalRef = useRef();

   const animation = useSpring({
     config: { duration: 250 },
     opacity: showPop ? 1 : 0,
     transform: showPop ? `translateY(0%)` : `translateY(-100%)`,
   });

   const closeModal = (e) => {
     if (modalRef.current === e.target) {
       setShowPop(false);
     }
   };

   const keyPress = useCallback(
     (e) => {
       if (e.key === "Escape" && showPop) {
         setShowPop(false);
         console.log("Tôi đã nhấn phím Escape");
       }
     },
     [setShowPop, showPop]
   );

   useEffect(() => {
     document.addEventListener("keydown", keyPress);
     return () => document.removeEventListener("keydown", keyPress);
   }, [keyPress]);

   return (
     <>
       {showPop ? (
         <Background onClick={closeModal} ref={modalRef}>
           <animated.div style={animation}>
             <ModalWrapper showPop={showPop}>
               <ModalContent>
                 <h1>Xóa Người Dùng</h1>
                 <p>
                   {/* Nội dung thêm vào đây nếu cần */}
                 </p>
                 <button>Xóa</button>
                 <button>Hủy</button>
               </ModalContent>
               <CloseModalButton
                 aria-label="Đóng modal"
                 onClick={() => setShowPop((prev) => !prev)}
               />
             </ModalWrapper>
           </animated.div>
         </Background>
       ) : null}
     </>
   );
}

export default Modal;
