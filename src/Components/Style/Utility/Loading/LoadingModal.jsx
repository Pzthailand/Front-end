import React from 'react';
import '../Loading/LoadingModal.css' ; // นำเข้าไฟล์ CSS ใหม่

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null; // ถ้าไม่เปิด modal, return null

  return (
    <div className="loading-modal">
      <div className="loading-modal-content">
        <div className="loader"></div>
        {/*<p>Loading...</p>*/}
      </div>
    </div>
  );
};

export default LoadingModal;