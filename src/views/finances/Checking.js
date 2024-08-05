import React, { useState } from 'react';
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
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
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cilOptions } from '@coreui/icons';
import axios from 'axios';

function Checking() {
  const [newRegistration, setNewRegistration] = useState(false);
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

  const getFinalDate = (startDateString, days) => {
    if (startDateString === '' || days === '') return '';

    const startDate = new Date(startDateString);
    const finalDate = new Date(startDate);

    finalDate.setDate(startDate.getDate() + parseInt(days, 10));
    return finalDate.toISOString().split('T')[0];
  };

  const calculateInterest = (principal, rate, tenure) => {
    const dailyRate = rate / 365;
    return (principal * dailyRate * tenure) / 100;
  };

  const handleFileChange = (e, setFileState) => {
    const file = e.target.files[0];
    setFileState({ file, name: file.name });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setError(regex.test(value) ? '' : 'Invalid email address.');
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const phoneNumberRegex = /^\d{0,10}$/

    if (phoneNumberRegex.test(value)) {
      setPhoneNumber(value);
      setPhnError('');
    } else {
      setPhnError('Phone number must be 10 digits.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error || phnError) {
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('principal', principal);
    formData.append('rate', rate);
    formData.append('startDate', startDate);
    formData.append('tenure', tenure);
    formData.append('finalDate', finalDate);
    formData.append('interest', interest);
    formData.append('totalAmount', totalAmount);
    formData.append('aadhaar', aadhaar.file);
    formData.append('collateral', collateral.file);
    formData.append('promissoryNote', promissoryNote.file);
    formData.append('photo', photo.file);

    
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Form submitted successfully');
        setNewRegistration(false);
        resetForm();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setAddress('');
    setPhoneNumber('');
    setPrincipal('');
    setRate('');
    setStartDate(new Date().toISOString().slice(0, 10));
    setTenure('');
    setFinalDate('');
    setInterest(null);
    setTotalAmount(null);
    setAadhaar({ file: null, name: '' });
    setCollateral({ file: null, name: '' });
    setPromissoryNote({ file: null, name: '' });
    setPhoto({ file: null, name: '' });
  };

  return (
    <div>
      <CRow>
     <CCol >
            <CWidgetStatsA
            className="mb-4"
            color="danger"
            value="Checking"
            // title="Daily"
            onClick={() => setNewRegistration(!newRegistration)}
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-danger'),
                      data: [65, 59, 84, 84, 51, 55, 40],
                      barPercentage: 0.6,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      border: {
                        display: false,
                      },
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 30,
                      max: 89,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                      tension: 0.4,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>

        {/* Modal for New Person Registration */}
        <CModal scrollable visible={newRegistration} onClose={() => setNewRegistration(false)}>
          <CModalHeader closeButton>
            <CModalTitle id="NewRegistration">Registration Form</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="newPersonName">Full Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="newPersonName"
                  placeholder="Enter name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="Email">Email:</CFormLabel>
                <CFormInput type="email" value={email} onChange={handleEmailChange} required />
                {error && <div style={{ color: 'red' }}>{error}</div>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="PhoneNumber">Phone Number:</CFormLabel>
                <CFormInput type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} required />
                {phnError && <div style={{ color: 'red' }}>{phnError}</div>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="address">Address</CFormLabel>
                <CFormTextarea
                  id="address"
                  rows="3"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></CFormTextarea>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="principal">Principal</CFormLabel>
                <CFormInput
                  type="number"
                  id="principal"
                  placeholder="Enter Principal Amount"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="rate">Rate of Interest</CFormLabel>
                <CFormInput
                  type="number"
                  id="rate"
                  placeholder="Enter Rate of Interest"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="startDate">Start Date</CFormLabel>
                <CFormInput
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={handleDateChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="tenure">Tenure (in days)</CFormLabel>
                <CFormInput
                  type="number"
                  id="tenure"
                  placeholder="Enter Tenure in days"
                  value={tenure}
                  onChange={handleTenureChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="finalDate">Final Date</CFormLabel>
                <CFormInput type="date" id="finalDate" value={finalDate} readOnly />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="interest">Interest</CFormLabel>
                <CFormInput type="number" id="interest" value={interest || ''} readOnly />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="totalAmount">Total Amount</CFormLabel>
                <CFormInput type="number" id="totalAmount" value={totalAmount || ''} readOnly />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="aadhaar">Aadhaar</CFormLabel>
                <CFormInput type="file" id="aadhaar" onChange={(e) => handleFileChange(e, setAadhaar)} required />
                {aadhaar.name && <div>{aadhaar.name}</div>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="collateral">Collateral</CFormLabel>
                <CFormInput type="file" id="collateral" onChange={(e) => handleFileChange(e, setCollateral)} required />
                {collateral.name && <div>{collateral.name}</div>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="promissoryNote">Promissory Note</CFormLabel>
                <CFormInput type="file" id="promissoryNote" onChange={(e) => handleFileChange(e, setPromissoryNote)} required />
                {promissoryNote.name && <div>{promissoryNote.name}</div>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="photo">Photo</CFormLabel>
                <CFormInput type="file" id="photo" onChange={(e) => handleFileChange(e, setPhoto)} required />
                {photo.name && <div>{photo.name}</div>}
              </div>

              <CButton type="submit" color="primary">
                Submit
              </CButton>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setNewRegistration(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    </div>
  );
}

export default Checking;


// const handleSubmit = async (e) => {
//   e.preventDefault();

  // const formData = {
  //   fullName,
  //   email,
  //   phoneNumber,
  //   address,
  //   principal,
  //   rate,
  //   startDate,
  //   tenure,
  //   finalDate,
  //   interest,
  //   totalAmount,
  //   guarantorFullName,
  //   guarantorPhoneNumber,
  //   guarantorAddress,
  //   gemail,
  // };


// try {
//   const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
//   console.log(response.data);
//   setNewRegistration(false);
//   // resetForm(); // Uncomment this line to reset the form after submission
// } catch (error) {
//   console.error('Error submitting form:', error);
// }
// };



// const handleDateChange = (e) => {
//   setStartDate(e.target.value);
// };

// const handleTenureChange = (e) => {
//   const selectedTenure = e.target.value;
//   setTenure(selectedTenure);

//   const finalDate = getFinalDate(startDate, selectedTenure);
//   setFinalDate(finalDate);

//   if (principal && rate) {
//     const interest = calculateInterest(principal, rate, selectedTenure);
//     setInterest(interest);
//     setTotalAmount(parseFloat(principal) + interest);
//   }
// };

// const getFinalDate = (startDateString, months) => {
//   if (startDateString === '' || months === '') return '';

//   const startDate = new Date(startDateString);
//   const finalDate = new Date(startDate);

//   finalDate.setMonth(startDate.getMonth() + parseInt(months, 10));
//   return finalDate.toISOString().split('T')[0];
// };

// const handlePrincipalChange = (e) => {
//   setPrincipal(e.target.value);
// };

// const handleRateChange = (e) => {
//   setRate(e.target.value);
// };

// const calculateInterest = (principal, rate, tenure) => {
//   return (principal * rate * tenure) / 100;
// };

// const handleAadhaarChange = (e) => {
//   const file = e.target.files[0];
//   setAadhaar({ file, name: file.name });
// };

// const handleCollateralChange = (e) => {
//   const file = e.target.files[0];
//   setCollateral({ file, name: file.name });
// };

// const handlePromissoryNoteChange = (e) => {
//   const file = e.target.files[0];
//   setPromissoryNote({ file, name: file.name });
// };

// const handlePhotoChange = (e) => {
//   const file = e.target.files[0];
//   setPhoto({ file, name: file.name });
// };

// const handleEmailChange = (e) => {
//   const value = e.target.value;
//   setEmail(value);
//   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   setError(regex.test(value) ? '' : 'Invalid email address.');
// };

// const handlePhoneNumberChange = (e) => {
//   const value = e.target.value;
//   const phoneNumberRegex = /^\d{0,10}$/;

//   if (phoneNumberRegex.test(value)) {
//     setPhoneNumber(value);
//     setPhnError('');
//   } else {
//     setPhnError('Phone number must be 10 digits.');
//   }
// };

// const handleFullNameChange = (e) => {
//   setFullName(e.target.value);
// };

// const handleAddressChange = (e) => {
//   setAddress(e.target.value);
// };

// const handleGuarantorFullNameChange = (e) => {
//   setGuarantorFullName(e.target.value);
// };
// const handleGuarantorPhoneNumberChange = (e) => {
//   const value = e.target.value;
//   const gphoneNumberRegex = /^\d{0,10}$/;
//   if (gphoneNumberRegex.test(value)) {
//     setGuarantorPhoneNumber(value);
//     setgPhnError('');
//   } else {
//     setgPhnError('Phone number must be 10 digits.');
//   }
// };

// const handleGuarantorAddressChange = (e) => {
//   setGuarantorAddress(e.target.value);
// };
// const handlegEmailChange = (e) => {
//   const value = e.target.value;
//   setgEmail(value);
//   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   setgError(regex.test(value) ? '' : 'Invalid email address.');
// };
// const handlegAadhaarChange = (e) => {
//   const file = e.target.files[0];
//   setgAadhaar({ file, name: file.name });
// };
// const handlegPhotoChange = (e) => {
//   const file = e.target.files[0];
//   setgPhoto({ file, name: file.name });
// };
