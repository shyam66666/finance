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
  CFormSelect,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react';
import { cilOptions } from '@coreui/icons';


function Monthly() {
  const [registrationList, setRegistrationList] = useState([]);
  const [newRegistration, setNewRegistration] = useState(false);
  const [showRegisteredList, setShowRegisteredList] = useState(false);
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

  const getFinalDate = (startDateString, months) => {
    if (startDateString === '' || months === '') return '';

    const startDate = new Date(startDateString);
    const finalDate = new Date(startDate);

    finalDate.setMonth(startDate.getMonth() + parseInt(months, 10));
    return finalDate.toISOString().split('T')[0];
  };

  const handlePrincipalChange = (e) => {
    setPrincipal(e.target.value);
  };

  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

  const calculateInterest = (principal, rate, tenure) => {
    return (principal * rate * tenure) / 100;
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
        aadhaar,
        collateral,
        promissoryNote,
        photo,
      },
      guarantorFullName,
      guarantorPhoneNumber,
      gemail,
      guarantorAddress,
      gdocuments: {
        gaadhaar,
        gphoto,
      },
    };

    setRegistrationList({...data, [e.target.name]: e.target.value});
    setNewRegistration(false);
    resetForm();
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
    setGuarantorFullName('');
    setGuarantorPhoneNumber('');
    setGuarantorAddress('');
    setgEmail('');
    setgAadhaar({ file: null, name: '' });
    setgPhoto({ file: null, name: '' });
  };

  return (
    <div>
      <CRow>
        <CCol >
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value="Monthly"
            action={
              <CDropdown>
                <CDropdownToggle caret={false} color="transparent" className="p-0">
                  <CIcon icon={cilOptions} className="text-white" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={() => setShowRegisteredList(true)}>
                    Registered list
                  </CDropdownItem>
                  <CDropdownItem onClick={() => setNewRegistration(true)}>
                    New person Registration
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: '#5856d6',
                      data: [65, 59, 84, 84, 51, 55, 40],
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
                <CFormLabel htmlFor="newPersonTenure">Tenure (in months)</CFormLabel>
                <CFormSelect
                  id="Tenure"
                  value={tenure}
                  onChange={handleTenureChange}
                  aria-label="Default select example"
                >
                  <option>Select Months</option>
                  <option value="1">1 Month</option>
                  <option value="2">2 Months</option>
                  <option value="3">3 Months</option>
                  <option value="4">4 Months</option>
                  <option value="5">5 Months</option>
                  <option value="6">6 Months</option>
                  <option value="7">7 Months</option>
                  <option value="8">8 Months</option>
                  <option value="9">9 Months</option>
                  <option value="10">10 Months</option>
                  <option value="11">11 Months</option>
                  <option value="12">12 Months</option>
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
                <CButton color="secondary" onClick={() => setNewRegistration(false)}>
                  Close
                </CButton>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CModalFooter>
            </CForm>
          </CModalBody>
        </CModal>
      </CRow>

      {/* Modal for Registered List */}
      <CModal scrollable visible={showRegisteredList} onClose={() => setShowRegisteredList(false)} size="xl">
        <CModalHeader closeButton>
          <CModalTitle id="RegisteredList">Registered List</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {registrationList.length > 0 ? (
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">SL.No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Principal</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Rate</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tenure</CTableHeaderCell>
                  <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Interest</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Documents</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                   <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                   <CTableHeaderCell scope="col">Documents</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {registrationList.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.fullName}</CTableDataCell>
                    <CTableDataCell>{item.email}</CTableDataCell>
                    <CTableDataCell>{item.address}</CTableDataCell>
                    <CTableDataCell>{item.phoneNumber}</CTableDataCell>
                    <CTableDataCell>{item.principal}</CTableDataCell>
                    <CTableDataCell>{item.rate}</CTableDataCell>
                    <CTableDataCell>{item.startDate}</CTableDataCell>
                    <CTableDataCell>{item.tenure}</CTableDataCell>
                    <CTableDataCell>{item.finalDate}</CTableDataCell>
                    <CTableDataCell>{item.interest.toFixed(2)}</CTableDataCell>
                    <CTableDataCell>{item.totalAmount.toFixed(2)}</CTableDataCell>
                    <CTableDataCell>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
  <li>
    <a
      href={URL.createObjectURL(item.documents.aadhaar.file)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
    >
      Aadhaar Card
    </a>
  </li>
  <li>
    <a
      href={URL.createObjectURL(item.documents.collateral.file)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
    >
      Collateral
    </a>
  </li>
  <li>
    <a
      href={URL.createObjectURL(item.documents.promissoryNote.file)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
    >
      Promissory Note
    </a>
  </li>
  <li>
    <a
      href={URL.createObjectURL(item.documents.photo.file)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
    >
      Photo
    </a>
  </li>
</ul>

                    </CTableDataCell>

                    <CTableDataCell>{item.guarantorFullName}</CTableDataCell>
                    <CTableDataCell>{item.guarantorPhoneNumber}</CTableDataCell>
                    <CTableDataCell>{item.gemail}</CTableDataCell>
                    <CTableDataCell>{item.guarantorAddress}</CTableDataCell>

                    <CTableDataCell>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
  <li>
    <a
      href={URL.createObjectURL(item.gdocuments.gaadhaar.file)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
    >
      Aadhaar Card
    </a>
  </li>
 
  <li>
    <a
      href={URL.createObjectURL(item.gdocuments.gphoto.file)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
    >
      Photo
    </a>
  </li>
</ul>


                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          ) : (
            <p>No registrations available.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowRegisteredList(false)}>
            Close
          </CButton>
        </CModalFooter>
        
      </CModal>
    </div>
  );
}

export default Monthly;
