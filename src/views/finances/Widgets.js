import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilArrowRight,
  cilBasket,
  cilBell,
  cilChartPie,
  cilMoon,
  cilLaptop,
  cilPeople,
  cilSettings,
  cilSpeech,
  cilSpeedometer,

  cilUserFollow,
} from '@coreui/icons'





const Widgets = () => {
  
  return (
    <CCard className="mb-4">
      <CCardHeader>############</CCardHeader>
      <CCardBody>
      
      
          <CRow xs={{ gutter: 4 }}>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="info"
                icon={<CIcon icon={cilPeople} height={36} />}
                value="87.500"
                title="Visitors"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="success"
                icon={<CIcon icon={cilUserFollow} height={36} />}
                value="385"
                title="New Clients"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="warning"
                icon={<CIcon icon={cilBasket} height={36} />}
                value="1238"
                title="Products sold"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="primary"
                icon={<CIcon icon={cilChartPie} height={36} />}
                value="28%"
                title="Returning Visitors"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="danger"
                icon={<CIcon icon={cilSpeedometer} height={36} />}
                value="5:34:11"
                title="Avg. Time"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                color="info"
                icon={<CIcon icon={cilSpeech} height={36} />}
                value="972"
                title="Comments"
                inverse
                progress={{ value: 75 }}
              />
            </CCol>
          </CRow>
       
      </CCardBody>
    </CCard>
  )
}

export default Widgets
