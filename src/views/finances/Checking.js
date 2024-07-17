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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cilOptions } from '@coreui/icons';

function Checking() {
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
    return (principal * dailyRate * tenure)/100;
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
    const phoneNumberRegex = /^\d{0,10}$/;

    if (phoneNumberRegex.test(value)) {
      setPhoneNumber(value);
      setPhnError('');
    } else {
      setPhnError('Phone number must be 10 digits.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error || phnError) {
      return;
    }

    const newEntry = {
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
    };

    setRegistrationList([...registrationList, newEntry]);
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
  };

  return (
    <div>
      <CRow>
        <CCol>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value="Checking"
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
                <CFormLabel htmlFor="Name">Full Name</CFormLabel>
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
                <CFormInput type="text" value={email} onChange={handleEmailChange} required />
                {error && <p className="text-danger">{error}</p>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="Phone">Phone Number:</CFormLabel>
                <CFormInput
                  type="tel"
                  id="Phone"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  maxLength="10"
                  required
                />
                {phnError && <p className="text-danger">{phnError}</p>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="Address">Address:</CFormLabel>
                <CFormTextarea
                  id="Address"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="Principal">Principal:</CFormLabel>
                <CFormInput
                  type="number"
                  id="Principal"
                  placeholder="Principal Amount"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="Rate">Rate:</CFormLabel>
                <CFormInput
                  type="number"
                  id="Rate"
                  placeholder="Rate of interest"
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
                <CFormLabel htmlFor="Tenure">Tenure (in days):</CFormLabel>
                <CFormInput
                  type="number"
                  id="Tenure"
                  value={tenure}
                  onChange={handleTenureChange}
                  required
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="finalDate">Final Date:</CFormLabel>
                <CFormInput type="text" id="finalDate" value={finalDate} readOnly />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="Interest">Interest:</CFormLabel>
                <CFormInput type="number" id="Interest" value={interest} readOnly />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="TotalAmount">Total Amount:</CFormLabel>
                <CFormInput type="number" id="TotalAmount" value={totalAmount} readOnly />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="aadhaar">Aadhaar:</CFormLabel>
                <CFormInput
                  type="file"
                  id="aadhaar"
                  onChange={(e) => handleFileChange(e, setAadhaar)}
                  required
                />
                {aadhaar.name && <p>Selected File: {aadhaar.name}</p>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="collateral">Collateral:</CFormLabel>
                <CFormInput
                  type="file"
                  id="collateral"
                  onChange={(e) => handleFileChange(e, setCollateral)}
                  required
                />
                {collateral.name && <p>Selected File: {collateral.name}</p>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="promissoryNote">Promissory Note:</CFormLabel>
                <CFormInput
                  type="file"
                  id="promissoryNote"
                  onChange={(e) => handleFileChange(e, setPromissoryNote)}
                  required
                />
                {promissoryNote.name && <p>Selected File: {promissoryNote.name}</p>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="photo">Photo:</CFormLabel>
                <CFormInput
                  type="file"
                  id="photo"
                  onChange={(e) => handleFileChange(e, setPhoto)}
                  required
                />
                {photo.name && <p>Selected File: {photo.name}</p>}
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

        {/* Modal for Registered List */}
        <CModal
          scrollable
          visible={showRegisteredList}
          onClose={() => setShowRegisteredList(false)}
          size="xl"
        >
          <CModalHeader closeButton>
            <CModalTitle id="RegisteredList">Registered List</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Phone</CTableHeaderCell>
                  <CTableHeaderCell>Principal</CTableHeaderCell>
                  <CTableHeaderCell>Rate</CTableHeaderCell>
                  <CTableHeaderCell>Start Date</CTableHeaderCell>
                  <CTableHeaderCell>Tenure</CTableHeaderCell>
                  <CTableHeaderCell>Final Date</CTableHeaderCell>
                  <CTableHeaderCell>Interest</CTableHeaderCell>
                  <CTableHeaderCell>Total Amount</CTableHeaderCell>
                  <CTableHeaderCell>Address</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {registrationList.map((entry, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{entry.fullName}</CTableDataCell>
                    <CTableDataCell>{entry.email}</CTableDataCell>
                    <CTableDataCell>{entry.phoneNumber}</CTableDataCell>
                    <CTableDataCell>{entry.principal}</CTableDataCell>
                    <CTableDataCell>{entry.rate}</CTableDataCell>
                    <CTableDataCell>{entry.startDate}</CTableDataCell>
                    <CTableDataCell>{entry.tenure}</CTableDataCell>
                    <CTableDataCell>{entry.finalDate}</CTableDataCell>
                    <CTableDataCell>{entry.interest}</CTableDataCell>
                    <CTableDataCell>{entry.totalAmount}</CTableDataCell>
                    <CTableDataCell>{entry.address}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CModalBody>
        </CModal>
      </CRow>
    </div>
  );
}

export default Checking;
