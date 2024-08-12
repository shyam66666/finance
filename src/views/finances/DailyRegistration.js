import React, { useState, useEffect } from 'react';
import {
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

function DailyRegistration() {
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
  const [phnError, setPhnError] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [aadhaar, setAadhaar] = useState({ file: null, name: '' });
  const [collateral, setCollateral] = useState({ file: null, name: '' });
  const [promissoryNote, setPromissoryNote] = useState({ file: null, name: '' });
  const [photo, setPhoto] = useState({ file: null, name: '' });
  const [guarantorFullName, setGuarantorFullName] = useState('');
  const [guarantorPhoneNumber, setGuarantorPhoneNumber] = useState('');
  const [gphnError, setGPhnError] = useState('');
  const [guarantorAddress, setGuarantorAddress] = useState('');
  const [gemail, setGEmail] = useState('');
  const [gerror, setGError] = useState('');
  const [gaadhaar, setGAadhaar] = useState({ file: null, name: '' });
  const [gphoto, setGPhoto] = useState({ file: null, name: '' });

  useEffect(() => {
    const autofillData = () => {
      const today = new Date();
      const startDate = today.toISOString().slice(0, 10); // Automatically set today's date
      const tenure = '100'; // Example tenure of 100 days
      const finalDate = getFinalDate(today, tenure); // Calculate final date
      const principal = '10000';
      const rate = '5';
      const interest = calculateInterest(principal, rate, tenure);
      const totalAmount = parseFloat(principal) + interest;
      
      setStartDate(startDate);
      setTenure(tenure);
      setFinalDate(finalDate);
      setPrincipal(principal);
      setRate(rate);
      setInterest(interest);
      setTotalAmount(totalAmount);
      setEmail('test@example.com');
      setPhoneNumber('1234567890');
      setFullName('John Doe');
      setAddress('123 Test St, Test City');
      setAadhaar({ file: new File([''], 'aadhaar.pdf'), name: 'aadhaar.pdf' });
      setCollateral({ file: new File([''], 'collateral.pdf'), name: 'collateral.pdf' });
      setPromissoryNote({ file: new File([''], 'promissory_note.pdf'), name: 'promissory_note.pdf' });
      setPhoto({ file: new File([''], 'photo.jpg'), name: 'photo.jpg' });
      setGuarantorFullName('Jane Doe');
      setGuarantorPhoneNumber('0987654321');
      setGuarantorAddress('456 Test Ave, Test City');
      setGEmail('guarantor@example.com');
      setGAadhaar({ file: new File([''], 'guarantor_aadhaar.pdf'), name: 'guarantor_aadhaar.pdf' });
      setGPhoto({ file: new File([''], 'guarantor_photo.jpg'), name: 'guarantor_photo.jpg' });
    };

    autofillData();
  }, []);

  const handleDateChange = (e) => setStartDate(e.target.value);

  const handleTenureChange = (e) => {
    const selectedTenure = e.target.value;
    setTenure(selectedTenure);

    const finalDate = getFinalDate(new Date(startDate), selectedTenure);
    setFinalDate(finalDate);

    if (principal && rate) {
      const interest = calculateInterest(principal, rate, selectedTenure);
      setInterest(interest);
      setTotalAmount(parseFloat(principal) + interest);
    }
  };

  const getFinalDate = (startDate, tenure) => {
    if (!startDate || !tenure) return '';
    const finalDate = new Date(startDate);
    finalDate.setDate(finalDate.getDate() + parseInt(tenure, 10));
    return finalDate.toISOString().split('T')[0];
  };

  
  const calculateInterest = (principal, rate, tenure) => {
    const principalAmount = parseFloat(principal);
    const annualRate = parseFloat(rate) / 100;
    const totalDays = parseInt(tenure, 10);

    const interest = (principalAmount * annualRate * totalDays) / 365;
    return interest;
  };
  


  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    setter({ file, name: file.name });
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

  const handleGuarantorPhoneNumberChange = (e) => {
    const value = e.target.value;
    const gphoneNumberRegex = /^\d{0,10}$/;
    if (gphoneNumberRegex.test(value)) {
      setGuarantorPhoneNumber(value);
      setGPhnError('');
    } else {
      setGPhnError('Phone number must be 10 digits.');
    }
  };

  const handleGEmailChange = (e) => {
    const value = e.target.value;
    setGEmail(value);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setGError(regex.test(value) ? '' : 'Invalid email address.');
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirect to the verification page
    navigate('/finances/DailyVerification', { state: { 
      formData: {
        startDate,
        tenure,
        finalDate,
        principal,
        rate,
        interest,
        totalAmount,
        email,
        phoneNumber,
        fullName,
        address,
        aadhaar,
        collateral,
        promissoryNote,
        photo,
        guarantorFullName,
        guarantorPhoneNumber,
        guarantorAddress,
        gemail,
        gaadhaar,
        gphoto
      }
    }});
  };

  const resetForm = () => {
    const today = new Date();
    setStartDate(today.toISOString().slice(0, 10));
    setTenure('');
    setFinalDate('');
    setPrincipal('');
    setRate('');
    setInterest(null);
    setTotalAmount(null);
    setEmail('');
    setError('');
    setPhoneNumber('');
    setPhnError('');
    setFullName('');
    setAddress('');
    setAadhaar({ file: null, name: '' });
    setCollateral({ file: null, name: '' });
    setPromissoryNote({ file: null, name: '' });
    setPhoto({ file: null, name: '' });
    setGuarantorFullName('');
    setGuarantorPhoneNumber('');
    setGPhnError('');
    setGuarantorAddress('');
    setGEmail('');
    setGError('');
    setGAadhaar({ file: null, name: '' });
    setGPhoto({ file: null, name: '' });
  };

  return (
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="fullName">Full Name</CFormLabel>
        <CFormInput type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
        <CFormInput type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
        {phnError && <p style={{ color: 'red' }}>{phnError}</p>}
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="email">Email </CFormLabel>
        <CFormInput type="email" id="email" value={email} onChange={handleEmailChange} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="address">Address</CFormLabel>
        <CFormTextarea id="address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="aadhaar">Aadhaar Card</CFormLabel>
        <CFormInput type="file" id="aadhaar" onChange={handleFileChange(setAadhaar)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="collateral">Collateral</CFormLabel>
        <CFormInput type="file" id="collateral" onChange={handleFileChange(setCollateral)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="promissoryNote">Promissory Note</CFormLabel>
        <CFormInput type="file" id="promissoryNote" onChange={handleFileChange(setPromissoryNote)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="photo">Photo</CFormLabel>
        <CFormInput type="file" id="photo" onChange={handleFileChange(setPhoto)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="startDate">Start Date</CFormLabel>
        <CFormInput type="date" id="startDate" value={startDate} onChange={handleDateChange} readOnly />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="finalDate">Final Date</CFormLabel>
        <CFormInput type="date" id="finalDate" value={finalDate} readOnly />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="tenure">Tenure (in Days)</CFormLabel>
        <CFormInput
          id="tenure"
          type="number"
          value={tenure}
          onChange={handleTenureChange}
          aria-label="Enter tenure in days"
        />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="principal">Principal Amount</CFormLabel>
        <CFormInput type="number" id="principal" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="rate">Rate of Interest (%)</CFormLabel>
        <CFormInput type="number" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="interest">Calculated Interest</CFormLabel>
        <CFormInput type="text" id="interest" value={interest ? interest.toFixed(2) : ''} readOnly />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="totalAmount">Total Amount</CFormLabel>
        <CFormInput type="text" id="totalAmount" value={totalAmount ? totalAmount.toFixed(2) : ''} readOnly />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="guarantorFullName">Guarantor Full Name</CFormLabel>
        <CFormInput type="text" id="guarantorFullName" value={guarantorFullName} onChange={(e) => setGuarantorFullName(e.target.value)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="guarantorPhoneNumber">Guarantor Phone Number</CFormLabel>
        <CFormInput type="text" id="guarantorPhoneNumber" value={guarantorPhoneNumber} onChange={handleGuarantorPhoneNumberChange} />
        {gphnError && <p style={{ color: 'red' }}>{gphnError}</p>}
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="gemail">Guarantor Email</CFormLabel>
        <CFormInput type="email" id="gemail" value={gemail} onChange={handleGEmailChange} />
        {gerror && <p style={{ color: 'red' }}>{gerror}</p>}
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="guarantorAddress">Guarantor Address</CFormLabel>
        <CFormTextarea id="guarantorAddress" rows="3" value={guarantorAddress} onChange={(e) => setGuarantorAddress(e.target.value)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="gaadhaar">Guarantor Aadhaar Card</CFormLabel>
        <CFormInput type="file" id="gaadhaar" onChange={handleFileChange(setGAadhaar)} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="gphoto">Guarantor Photo</CFormLabel>
        <CFormInput type="file" id="gphoto" onChange={handleFileChange(setGPhoto)} />
      </div>

      <div className="mb-3">
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <CButton type="submit" color="primary">Submit</CButton>
          <CButton color="secondary" onClick={() => navigate('/finances')}>Cancel</CButton>
        </div>
      </div>
    </CForm>
  );
}

export default DailyRegistration;
