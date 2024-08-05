import React, { useState } from 'react';
import {

  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
 
} from '@coreui/react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function YearlyRegistration() {
    const [successMessage, setSuccessMessage] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [verifyModal, setVerifyModal] = useState(false); // State for verification modal
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [tenure, setTenure] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [interest, setInterest] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phnError, setPhnError] = useState(null);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [aadhaar, setAadhaar] = useState({ file: null, name: '' });
    const [collateral, setCollateral] = useState({ file: null, name: '' });
    const [promissoryNote, setPromissoryNote] = useState({ file: null, name: '' });
    const [photo, setPhoto] = useState({ file: null, name: '' });
    const [guarantorFullName, setGuarantorFullName] = useState('');
    const [guarantorPhoneNumber, setGuarantorPhoneNumber] = useState('');
    const [gphnError, setgPhnError] = useState(null);
    const [guarantorAddress, setGuarantorAddress] = useState('');
    const [gemail, setgEmail] = useState('');
    const [gerror, setgError] = useState('');
    const [gaadhaar, setgAadhaar] = useState({ file: null, name: '' });
    const [gphoto, setgPhoto] = useState({ file: null, name: '' });
    
    const handleDateChange = (e) => {
        setStartDate(e.target.value);
      };
    
      const handleTenureChange = (e) => {
        const selectedTenure = e.target.value;
        setTenure(selectedTenure);
    
        const finalDate = getFinalDate(startDate, selectedTenure);
        setFinalDate(finalDate);
    
        if (principal && rate) {
          const interest = calculateInterest(principal, rate, selectedTenure);
          setInterest(interest);
          setTotalAmount(parseFloat(principal) + interest);
        }
      };
    
      const getFinalDate = (startDateString, tenure) => {
        if (startDateString === '' || tenure === '') return '';
        const planeDate = new Date(startDateString);
        const finalDate = new Date(planeDate);
        finalDate.setYear(planeDate.getFullYear() + parseInt(tenure));
        return finalDate.toISOString().split('T')[0];
      };
      const handlePrincipalChange = (e) => {
        setPrincipal(e.target.value);
      };
    
      const handleRateChange = (e) => {
        setRate(e.target.value);
      };
    
      const calculateInterest = (principal, rate, tenure) => {
        return (principal * rate * (tenure*12)) / 100;
      };
    
      const handleAadhaarChange = (e) => {
        const file = e.target.files[0];
        setAadhaar({ file, name: file.name });
      };
    
      const handleCollateralChange = (e) => {
        const file = e.target.files[0];
        setCollateral({ file, name: file.name });
      };
    
      const handlePromissoryNoteChange = (e) => {
        const file = e.target.files[0];
        setPromissoryNote({ file, name: file.name });
      };
    
      const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto({ file, name: file.name });
      };
    
      const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setError(regex.test(value) ? '' : 'Invalid email address.');
      };
    
      const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        const phoneNumberRegex = /^\d{0,10}$/;
    
        if (phoneNumberRegex.test(value)) {
          setPhoneNumber(value);
          setPhnError('');
        } else {
          setPhnError('Phone number must be 10 digits.');
        }
      };
    
      const handleFullNameChange = (e) => {
        setFullName(e.target.value);
      };
    
      const handleAddressChange = (e) => {
        setAddress(e.target.value);
      };
    
      const handleGuarantorFullNameChange = (e) => {
        setGuarantorFullName(e.target.value);
      };
      const handleGuarantorPhoneNumberChange = (e) => {
        const value = e.target.value;
        const gphoneNumberRegex = /^\d{0,10}$/;
        if (gphoneNumberRegex.test(value)) {
          setGuarantorPhoneNumber(value);
          setgPhnError('');
        } else {
          setgPhnError('Phone number must be 10 digits.');
        }
      };
    
      const handleGuarantorAddressChange = (e) => {
        setGuarantorAddress(e.target.value);
      };
      const handlegEmailChange = (e) => {
        const value = e.target.value;
        setgEmail(value);
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setgError(regex.test(value) ? '' : 'Invalid email address.');
      };
      const handlegAadhaarChange = (e) => {
        const file = e.target.files[0];
        setgAadhaar({ file, name: file.name });
      };
      const handlegPhotoChange = (e) => {
        const file = e.target.files[0];
        setgPhoto({ file, name: file.name });
      };
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      fullName,
      email,
      address,
      phoneNumber,
      principal,
      rate,
      startDate,
      tenure,
      finalDate,
      interest,
      totalAmount,
      documents: {
        aadhaar: { ...aadhaar, url: URL.createObjectURL(aadhaar.file) },
        collateral: { ...collateral, url: URL.createObjectURL(collateral.file) },
        promissoryNote: { ...promissoryNote, url: URL.createObjectURL(promissoryNote.file) },
        photo: { ...photo, url: URL.createObjectURL(photo.file) },
      },
      guarantorFullName,
      guarantorPhoneNumber,
      gemail,
      guarantorAddress,
      gdocuments: {
        gaadhaar: { ...gaadhaar, url: URL.createObjectURL(gaadhaar.file) },
        gphoto: { ...gphoto, url: URL.createObjectURL(gphoto.file) },
      },
    };

    setSubmittedData(data);
    setVerifyModal(true); // Open the verification modal
  };

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

    setNewRegistration(false);
    resetForm();
  };

  const resetForm = () => {
    setStartDate(new Date().toISOString().slice(0, 10));
    setTenure('');
    setFinalDate('');
    setPrincipal('');
    setRate('');
    setInterest(null);
    setTotalAmount(null);
    setEmail('');
    setError('');
    setPhoneNumber('');
    setPhnError(null);
    setFullName('');
    setAddress('');
    setAadhaar({ file: null, name: '' });
    setCollateral({ file: null, name: '' });
    setPromissoryNote({ file: null, name: '' });
    setPhoto({ file: null, name: '' });
    setGuarantorFullName('');
    setGuarantorPhoneNumber('');
    setgPhnError(null);
    setGuarantorAddress('');
    setgEmail('');
    setgError('');
    setgAadhaar({ file: null, name: '' });
    setgPhoto({ file: null, name: '' });
  };

  return (
    <>

      
        <CForm name=" form data " onSubmit={handleSubmit}>
         <div className="mb-3">
                <CFormLabel htmlFor="Name">Full Name</CFormLabel>
                <CFormInput type="text" id="newPersonName" placeholder="Enter name" value={fullName} onChange={handleFullNameChange} />
              </div>
              
              <div className="mb-3">
                <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                <CFormInput
                  type="number"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter Phone Number"
                />
                {phnError && <p style={{ color: 'red' }}>{phnError}</p>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="Name">Email:</CFormLabel>
                <CFormInput type="text" value={email} onChange={handleEmailChange} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>

            

              <div className="mb-3">
                <CFormLabel htmlFor="Address">Address</CFormLabel>
                <CFormTextarea id="newPersonDetails" rows={3} value={address} onChange={handleAddressChange}></CFormTextarea>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="Aadhaar">Attach Aadhaar Card</CFormLabel>
                <CFormInput
                  type="file"
                  onChange={handleAadhaarChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  id="newPersonDetails"
                  required
                />
                {aadhaar.name && <p>Attached: {aadhaar.name}</p>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="Collateral">Attach Collateral</CFormLabel>
                <CFormInput
                  type="file"
                  onChange={handleCollateralChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  id="newPersonDetails"
                  required
                />
                {collateral.name && <p>Attached: {collateral.name}</p>}
              </div>

             

              <div className="mb-3">
                <CFormLabel htmlFor="Amount">Principal Amount</CFormLabel>
                <CFormInput
                  type="number"
                  id="newPersonPrincipal"
                  placeholder="Enter Amount"
                  value={principal}
                  onChange={handlePrincipalChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="Rate">Rate of Interest</CFormLabel>
                <CFormInput
                  type="number"
                  id="newPersonRate"
                  placeholder="Enter Rate"
                  value={rate}
                  onChange={handleRateChange}
                  required
                />
              </div>


              <div className="mb-3">
                <CFormLabel htmlFor="newPersonStartDate">Start Date</CFormLabel>
                <CFormInput
                  type="date"
                  id="newPersonStartDate"
                  value={startDate}
                  onChange={handleDateChange}
                  disabled 
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="newPersonTenure">Tenure (in Years)</CFormLabel>
                <CFormSelect
                  id="Tenure"
                  value={tenure}
                  onChange={handleTenureChange}
                  aria-label="Default select example"
                >
                  <option>Select Years</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 Years</option>
                  <option value="6">6 Years</option>
                  <option value="7">7 Years</option>
                  <option value="8">8 Years</option>
                  <option value="9">9 Years</option>
                  <option value="10">10 Years</option>
                  <option value="11">11 Years</option>
                  <option value="12">12 Years</option>
                </CFormSelect>
              </div>

        <div className="mb-3">
          <CFormLabel htmlFor="newPersonFinalDate">End Date</CFormLabel>
          <CFormInput type="text" id="newPersonFinalDate" value={finalDate} disabled />
        </div>

        <div className="mb-3">
          <CFormLabel htmlFor="PromissoryNote">Attach Promissory Note</CFormLabel>
          <CFormInput
            type="file"
            onChange={handlePromissoryNoteChange}
            accept=".pdf,.jpg,.jpeg,.png"
            id="newPersonDetails"
            required
          />
          {promissoryNote.name && <p>Attached: {promissoryNote.name}</p>}
        </div>

        <div className="mb-3">
          <CFormLabel htmlFor="Photo">Attach Photo of Person</CFormLabel>
          <CFormInput
            type="file"
            onChange={handlePhotoChange}
            accept=".pdf,.jpg,.jpeg,.png"
            id="newPersonDetails"
            required
          />
          {photo.name && <p>Attached: {photo.name}</p>}
        </div>

        
        {interest !== null && totalAmount !== null && (
          <div className="mt-4">
            <h6>Calculated Interest: ₹{interest.toFixed(2)}</h6>
            <h6>Total Amount: ₹{totalAmount.toFixed(2)}</h6>
          </div>
        )}
        <hr  />
        <div className="mb-3">
        <CModalTitle id="NewRegistration">Guarantor Details </CModalTitle>
        </div>
        <hr></hr>
         <div className="mb-3">
          <CFormLabel htmlFor="Name">Full Name</CFormLabel>
          <CFormInput type="text" id="newPersonName" placeholder="Enter name" value={guarantorFullName} onChange={ handleGuarantorFullNameChange } />
        </div>

        <div className="mb-3">
          <CFormLabel htmlFor="guarantorAddress">Phone Number</CFormLabel>
          <CFormInput
            type="number"
            id="guarantorPhoneNumber"
            value={guarantorPhoneNumber}
            onChange={handleGuarantorPhoneNumberChange}
            placeholder="Enter Phone Number"
          />
          {gphnError && <p style={{ color: 'red' }}>{gphnError}</p>}
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="Name">Email:</CFormLabel>
          <CFormInput type="text" value={gemail} onChange={handlegEmailChange} />
          {gerror && <p style={{ color: 'red' }}>{gerror}</p>}
        </div>

        <div className="mb-3">
          <CFormLabel htmlFor="guarantorAddress">Address</CFormLabel>
          <CFormTextarea id="guarantorAddress" rows={3} value={guarantorAddress} onChange={handleGuarantorAddressChange}></CFormTextarea>
        </div>

        <div className="mb-3">
          <CFormLabel htmlFor="gAadhaar">Attach Aadhaar Card</CFormLabel>
          <CFormInput
            type="file"
            onChange={handlegAadhaarChange}
            accept=".pdf,.jpg,.jpeg,.png"
            id="newPersonDetails"
            required
          />
          {gaadhaar.name && <p>Attached: {gaadhaar.name}</p>}
        </div>

        <div className="mb-3">
          <CFormLabel htmlFor="gPhoto">Attach Photo of Person</CFormLabel>
          <CFormInput
            type="file"
            onChange={handlegPhotoChange}
            accept=".pdf,.jpg,.jpeg,.png"
            id="gphoto"
            required
          />
          {gphoto.name && <p>Attached: {gphoto.name}</p>}
        </div>
          <CModalFooter>
                <CButton color="secondary" onClick={() => navigate('/finances')} className="me-3">
                  Close
                </CButton>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CModalFooter>
        </CForm>
     
      <CModal visible={verifyModal} onClose={() => setVerifyModal(false)}>
        <CModalHeader>
          <CModalTitle>Verify Your Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p><strong>Full Name:</strong> {submittedData?.fullName}</p>
          <p><strong>Email:</strong> {submittedData?.email}</p>
          <p><strong>Address:</strong> {submittedData?.address}</p>
          <p><strong>Phone Number:</strong> {submittedData?.phoneNumber}</p>
          <p><strong>Principal:</strong> {submittedData?.principal}</p>
          <p><strong>Rate:</strong> {submittedData?.rate}</p>
          <p><strong>Start Date:</strong> {submittedData?.startDate}</p>
          <p><strong>Tenure:</strong> {submittedData?.tenure}</p>
          <p><strong>Final Date:</strong> {submittedData?.finalDate}</p>
          <p><strong>Interest:</strong> {submittedData?.interest}</p>
          <p><strong>Total Amount:</strong> {submittedData?.totalAmount}</p>

          {/* Displaying file names */}
          <p><strong>Aadhaar Document:</strong> {submittedData?.documents.aadhaar.name}</p>
          <p><strong>Collateral Document:</strong> {submittedData?.documents.collateral.name}</p>
          <p><strong>Promissory Note:</strong> {submittedData?.documents.promissoryNote.name}</p>
          <p><strong>Photo:</strong> {submittedData?.documents.photo.name}</p>

          {/* Guarantor details */}
          <p><strong>Guarantor Full Name:</strong> {submittedData?.guarantorFullName}</p>
          <p><strong>Guarantor Phone Number:</strong> {submittedData?.guarantorPhoneNumber}</p>
          <p><strong>Guarantor Email:</strong> {submittedData?.gemail}</p>
          <p><strong>Guarantor Address:</strong> {submittedData?.guarantorAddress}</p>
          <p><strong>Guarantor Aadhaar Document:</strong> {submittedData?.gdocuments.gaadhaar.name}</p>
          <p><strong>Guarantor Photo:</strong> {submittedData?.gdocuments.gphoto.name}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVerifyModal(false)}>Cancel</CButton>
          <CButton color="primary" onClick={handleFinalSubmit}>Submit</CButton>
        </CModalFooter>
      </CModal>

      <CModal alignment="center" visible={successMessage} onClose={() => setSuccessMessage(false)}>
         <CModalHeader>
           <CModalTitle><h3 style={{ color: 'green', fontStyle:'oblique'}}>Submitted Successfully</h3></CModalTitle>
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
                <img src={submittedData.documents.aadhaar.url} alt="Aadhaar Card"  style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }}
                />
                <p><strong>Collateral Document:</strong></p>
                <img src={submittedData.documents.collateral.url} alt="Collateral Document"  style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }}
                />
                <p><strong>Promissory Note:</strong></p>
                <img src={submittedData.documents.promissoryNote.url} alt="Promissory Note"  style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }}
                />
                <p><strong>Photo:</strong></p>
                <img src={submittedData.documents.photo.url} alt="Photo"  style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }}
 />
                <p><strong>Guarantor Full Name:</strong> {submittedData.guarantorFullName}</p>
                <p><strong>Guarantor Phone Number:</strong> {submittedData.guarantorPhoneNumber}</p>
                <p><strong>Guarantor Email:</strong> {submittedData.gemail}</p>
                <p><strong>Guarantor Address:</strong> {submittedData.guarantorAddress}</p>
                <p><strong>Guarantor Aadhaar Card:</strong></p>
                <img src={submittedData.gdocuments.gaadhaar.url} alt="Guarantor Aadhaar Card"  style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }}
 />
                <p><strong>Guarantor Photo:</strong></p>
                <img src={submittedData.gdocuments.gphoto.url} alt="Guarantor Photo"  style={{ maxWidth: '10%', height: 'auto', marginTop: '10px' }}
 />
              </div>
            )}
        </CModalBody>
        <CModalFooter>
         <CButton color="primary" onClick={() => setSuccessMessage(false)}>
         OK
         </CButton>
        </CModalFooter>
      </CModal> 
    </>
  );
}

export default YearlyRegistration;


