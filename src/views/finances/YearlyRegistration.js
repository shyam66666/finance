


import React, { useState, useEffect } from 'react';
import {
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,

} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

function YearlyRegistration() {
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
      const startDate = new Date().toISOString().slice(0, 10);
      const tenure = '10';
      const finalDate = getFinalDate(startDate, tenure);
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
    const finalDate = getFinalDate(startDate, selectedTenure);
    setFinalDate(finalDate);

    if (principal && rate) {
      const interest = calculateInterest(principal, rate, selectedTenure);
      setInterest(interest);
      setTotalAmount(parseFloat(principal) + interest);
    }
  };

  const getFinalDate = (startDateString, days) => {
    if (!startDateString || !days) return '';
    const startDate = new Date(startDateString);
    startDate.setFullYear(startDate.getFullYear() + parseInt(days, 10));
    return startDate.toISOString().split('T')[0];
  };

  const handlePrincipalChange = (e) => setPrincipal(e.target.value);
  const handleRateChange = (e) => setRate(e.target.value);

  const calculateInterest = (principal, rate, tenure) => {
    return (principal * rate * (tenure*12)) / 100;
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
    navigate('/finances/Yearlyverification', { state: { 
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
        <CFormInput type="date" id="startDate" value={startDate} onChange={handleDateChange} />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="finalDate">Final Date</CFormLabel>
        <CFormInput type="date" id="finalDate" value={finalDate} readOnly />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="tenure">Tenure (in years)</CFormLabel>
        <CFormSelect id="tenure" value={tenure} onChange={handleTenureChange}>
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
          {/* Add more options as needed */}
        </CFormSelect>
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="principal">Principal Amount</CFormLabel>
        <CFormInput type="number" id="principal" value={principal} onChange={handlePrincipalChange} />
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="rate">Rate of Interest (%)</CFormLabel>
        <CFormInput type="number" id="rate" value={rate} onChange={handleRateChange} />
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
        <CButton type="submit" color="primary" on onSubmit={{resetForm}}>Submit</CButton>
        <CButton color="secondary" onClick={() => navigate('/finances')}>Cancel</CButton>
      </div>
    </div>
    </CForm>
  );
}

export default YearlyRegistration;


