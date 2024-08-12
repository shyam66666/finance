import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton
} from '@coreui/react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Monthlyverification() {
  const { state } = useLocation();
  const [submittedData, setSubmittedData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.formData) {
      setSubmittedData(state.formData);
      setVerifyModal(true);
    }
  }, [state]);

  const handleFinalSubmit = () => {
    axios.post("https://jsonplaceholder.typicode.com/posts", submittedData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage(true);
        setVerifyModal(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      {submittedData && verifyModal && (
        <div >
          <h2>Verify Your Details</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Address:</strong> {submittedData.address}</p>
          <p><strong>Principal:</strong> {submittedData.principal}</p>
          <p><strong>Rate:</strong> {submittedData.rate}%</p>
          <p><strong>Start Date:</strong> {submittedData.startDate}</p>
          <p><strong>Tenure:</strong> {submittedData.tenure} days</p>
          <p><strong>Final Date:</strong> {submittedData.finalDate}</p>
          <p><strong>Interest:</strong> {submittedData.interest}</p>
          <p><strong>Total Amount:</strong> {submittedData.totalAmount}</p>
          
          <p><strong>Aadhaar Card:</strong></p>
          <img src={submittedData.aadhaar.file ? URL.createObjectURL(submittedData.aadhaar.file) : '#'} alt="Aadhaar Card" style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }} />
          
          <p><strong>Collateral Document:</strong></p>
          <img src={submittedData.collateral.file ? URL.createObjectURL(submittedData.collateral.file) : '#'} alt="Collateral Document" style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }} />
          
          <p><strong>Promissory Note:</strong></p>
          <img src={submittedData.promissoryNote.file ? URL.createObjectURL(submittedData.promissoryNote.file) : '#'} alt="Promissory Note" style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }} />
          
          <p><strong>Photo:</strong></p>
          <img src={submittedData.photo.file ? URL.createObjectURL(submittedData.photo.file) : '#'} alt="Photo" style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }} />
          
          <p><strong>Guarantor Full Name:</strong> {submittedData.guarantorFullName}</p>
          <p><strong>Guarantor Phone Number:</strong> {submittedData.guarantorPhoneNumber}</p>
          <p><strong>Guarantor Email:</strong> {submittedData.gemail}</p>
          <p><strong>Guarantor Address:</strong> {submittedData.guarantorAddress}</p>
          
          <p><strong>Guarantor Aadhaar Card:</strong></p>
          <img src={submittedData.gaadhaar.file ? URL.createObjectURL(submittedData.gaadhaar.file) : '#'} alt="Guarantor Aadhaar Card" style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }} />
          
          <p><strong>Guarantor Photo:</strong></p>
          <img src={submittedData.gphoto.file ? URL.createObjectURL(submittedData.gphoto.file) : '#'} alt="Guarantor Photo" style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }} />
          <footer style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
  <CButton onClick={() => handleFinalSubmit()} color="success">Confirm</CButton>
  <CButton onClick={() => navigate('/finances/MonthlyRegistration')} color="danger">Cancel</CButton>
</footer>
        </div>
      )}


{/* Success Modal */}
{successMessage && (
        <CModal alignment="center" visible={successMessage} onClose={() => setSuccessMessage(false)}>
          <CModalHeader>
            <CModalTitle>
              <h3 style={{ color: 'green', fontStyle: 'oblique' }}>Submitted Successfully</h3>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Loan successfully added with the following details:</p>
            {submittedData && (
              <div>
                <p><strong>Full Name:</strong> {submittedData.fullName}</p>
                <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
                <p><strong>Email:</strong> {submittedData.email}</p>
                <p><strong>Address:</strong> {submittedData.address}</p>
                <p><strong>Principal:</strong> {submittedData.principal}</p>
                <p><strong>Rate:</strong> {submittedData.rate}%</p>
                <p><strong>Start Date:</strong> {submittedData.startDate}</p>
                <p><strong>Tenure:</strong> {submittedData.tenure} years</p>
                <p><strong>Final Date:</strong> {submittedData.finalDate}</p>
                <p><strong>Interest:</strong> {submittedData.interest}</p>
                <p><strong>Total Amount:</strong> {submittedData.totalAmount}</p>
                <p><strong>Aadhaar Card:</strong></p>
                <img
                  src={submittedData.aadhaar.file ? URL.createObjectURL(submittedData.aadhaar.file) : '#'}
                  alt="Aadhaar Card"
                  style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                />
                <p><strong>Collateral Document:</strong></p>
                <img
                  src={submittedData.collateral.file ? URL.createObjectURL(submittedData.collateral.file) : '#'}
                  alt="Collateral Document"
                  style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                />
                <p><strong>Promissory Note:</strong></p>
                <img
                  src={submittedData.promissoryNote.file ? URL.createObjectURL(submittedData.promissoryNote.file) : '#'}
                  alt="Promissory Note"
                  style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                />
                <p><strong>Photo:</strong></p>
                <img
                  src={submittedData.photo.file ? URL.createObjectURL(submittedData.photo.file) : '#'}
                  alt="Photo"
                  style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                />
                <p><strong>Guarantor Full Name:</strong> {submittedData.guarantorFullName}</p>
                <p><strong>Guarantor Phone Number:</strong> {submittedData.guarantorPhoneNumber}</p>
                <p><strong>Guarantor Email:</strong> {submittedData.gemail}</p>
                <p><strong>Guarantor Address:</strong> {submittedData.guarantorAddress}</p>
                <p><strong>Guarantor Aadhaar Card:</strong></p>
                <img
                  src={submittedData.gaadhaar.file ? URL.createObjectURL(submittedData.gaadhaar.file) : '#'}
                  alt="Guarantor Aadhaar Card"
                  style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                />
                <p><strong>Guarantor Photo:</strong></p>
                <img
                  src={submittedData.gphoto.file ? URL.createObjectURL(submittedData.gphoto.file) : '#'}
                  alt="Guarantor Photo"
                  style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                />
              </div>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="primary"  onClick={() => navigate('/finances')}>
              OK
            </CButton>
           
          </CModalFooter>
        </CModal>
      )}
    </div>
  );
}

export default Monthlyverification;
