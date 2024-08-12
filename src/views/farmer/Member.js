import React, { useState } from 'react';
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableCaption,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react';
import {useQuery} from 'react-query'
import { getFinance } from '../../API/services';

const headers = [
  'Id', 'Full Name', 'Phone Number', 'Email', 'Address', 'Principal', 'Rate',
  'Start Date', 'Tenure', 'Final Date', 'Interest', 'Total Amount', 'Aadhaar Card',
  'Collateral Document', 'Promissory Note', 'Guarantor Full Name', 'Guarantor Phone Number',
  'Guarantor Email', 'Guarantor Address', 'Guarantor Aadhaar Card','Guarantor Photo',
];

const data = [
  {
    id: 1,
    fullName: 'John Doe',
    phoneNumber: '123-456-7890',
    email: 'johndoe@example.com',
    address: '123 Main St, Anytown, USA',
    principal: 10000,
    rate: 5,
    startDate: '2023-01-01',
    tenure: 5,
    finalDate: '2028-01-01',
    interest: 2500,
    totalAmount: 12500,
    aadhaarCard: 'https://example.com/aadhaar.jpg',
    collateralDocument: 'https://example.com/collateral.jpg',
    promissoryNote: 'https://example.com/promissoryNote.jpg',
    guarantorFullName: 'Jane Doe',
    guarantorPhoneNumber: '987-654-3210',
    guarantorEmail: 'janedoe@example.com',
    guarantorAddress: '456 Main St, Anytown, USA',
    guarantorAadhaarCard: 'https://example.com/gaadhaar.jpg',
    guarantorPhoto: 'https://example.com/gphoto.jpg'
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    phoneNumber: '987-654-3210',
    email: 'janesmith@example.com',
    address: '456 Elm St, Othertown, USA',
    principal: 15000,
    rate: 6,
    startDate: '2023-02-01',
    tenure: 4,
    finalDate: '2027-02-01',
    interest: 3600,
    totalAmount: 18600,
    aadhaarCard: 'https://example.com/aadhaar.jpg',
    collateralDocument: 'https://example.com/collateral.jpg',
    promissoryNote: 'https://example.com/promissoryNote.jpg',
    guarantorFullName: 'John Smith',
    guarantorPhoneNumber: '654-321-0987',
    guarantorEmail: 'johnsmith@example.com',
    guarantorAddress: '789 Maple St, Othertown, USA',
    guarantorAadhaarCard: 'https://example.com/gaadhaar.jpg',
    guarantorPhoto: 'https://example.com/gphoto.jpg'
  },
  {
    id: 3,
    fullName: 'Alice Johnson',
    phoneNumber: '555-123-4567',
    email: 'alicejohnson@example.com',
    address: '789 Pine St, Sometown, USA',
    principal: 20000,
    rate: 7,
    startDate: '2023-03-01',
    tenure: 3,
    finalDate: '2026-03-01',
    interest: 4200,
    totalAmount: 24200,
    aadhaarCard: 'https://example.com/aadhaar.jpg',
    collateralDocument: 'https://example.com/collateral.jpg',
    promissoryNote: 'https://example.com/promissoryNote.jpg',
    guarantorFullName: 'Bob Johnson',
    guarantorPhoneNumber: '321-654-9870',
    guarantorEmail: 'bobjohnson@example.com',
    guarantorAddress: '321 Oak St, Sometown, USA',
    guarantorAadhaarCard: 'https://example.com/gaadhaar.jpg',
    guarantorPhoto: 'https://example.com/gphoto.jpg'
  },
  // Add more data objects as needed
];

function Member() {

  const {data: members} = useQuery("getFianance",getFinance)
  console.log('members', members)

  const [records, setRecords] = useState(data);

  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const newData = data.filter(row => {
      return row.fullName.toLowerCase().includes(query) || String(row.id).includes(query);
    });
    setRecords(newData);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <div>
        <input type='text' placeholder="Search" style={{ marginLeft: "1000px" }} onChange={handleFilter} />
      </div>
      <CTable caption="top">
      {/* <CTableCaption>List of users</CTableCaption> */}
        <CTableHead >
          <CTableRow>
            {headers.map((header, index) => (
              <CTableHeaderCell key={index} scope="col">{header}</CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {records.map((row, rowIndex) => (
            <CTableRow key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <CTableDataCell key={cellIndex}>
                  {typeof cell === 'string' && cell.includes('http') ? (
                    <img src={cell} alt={headers[cellIndex]} style={{ maxWidth: '100px', height: 'auto' }} />
                  ) : cell}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
}

export default Member;
