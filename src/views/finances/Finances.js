import React from 'react';
import Monthly from './Monthly.js';
import Yearly from './Yearly.js';
import Daily from './Daily.js'; 
import { CRow, CCol } from '@coreui/react';
import Checking from './Checking.js';
import Widgets from './Widgets.js';

function Finances() {
  return (
    <div>
      <CRow>
        <CCol sm={3} xl={3} xxl={3}>
          <Daily />
        </CCol>
        <CCol sm={3} xl={3} xxl={3}>
        <Monthly />
        </CCol>
        <CCol sm={3} xl={3} xxl={3}>
         <Yearly />
        </CCol>
        <CCol sm={3} xl={3} xxl={3}>
          <Checking />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={12}>
          <Widgets />
        </CCol>
      </CRow>
    </div>
  );
}

export default Finances;

