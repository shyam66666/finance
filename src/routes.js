// import React from 'react'

// const Finances = React.lazy(() => import('./views/finances/Finances'))
// const Farmer = React.lazy(() => import('./views/farmer/Farmer'))
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// const routes = [
//   { path: '/', exact: true, name: 'Home' },
//   { path: '/views/finances/Finances', name: 'Dashboard', element: Finances },
//   { path: '/farmer', name: 'Farmer', element: Farmer },
//   { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
//   { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
//   { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
//   { path: '/widgets', name: 'Widgets', element: Widgets },
// ]

// export default routes
import React from 'react'

const Finances = React.lazy(() => import('./views/finances/Finances'))
const DailyRegistration = React.lazy(() => import('./views/finances/DailyRegistration'))
const DailyVerification = React.lazy(() => import('./views/finances/DailyVerification'))
const MonthlyRegistration = React.lazy(() => import('./views/finances/MonthlyRegistration'))
const Monthlyverification = React.lazy(() => import('./views/finances/Monthlyverifivation'))
const YearlyRegistration = React.lazy(() => import('./views/finances/YearlyRegistration'))
const Yearlyverification = React.lazy(() => import('./views/finances/Yearlyverification'))
const FarmerRegistration = React.lazy(() => import('./views/finances/FarmerRegistration'))
const Farmer = React.lazy(() => import('./views/farmer/Farmer'))
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Finances },
  { path: '/finances', exact: true, name: 'Finances Dashboard', element: Finances },
  { path: '/finances/FarmerRegistration', name: 'Farmer Registration', element: FarmerRegistration },
  { path: '/finances/DailyRegistration', name: 'Daily Registration', element: DailyRegistration },
  { path: '/finances/DailyVerification', name: 'Daily Verification', element: DailyVerification },
  { path: '/finances/MonthlyRegistration', name: 'Monthly Registration', element: MonthlyRegistration },
  { path: '/finances/Monthlyverification', name: 'Monthly Verification', element: Monthlyverification },
  { path: '/finances/YearlyRegistration', name: 'Yearly Registration', element: YearlyRegistration },
  { path: '/finances/Yearlyverification', name: 'Yearly Verification', element: Yearlyverification},
  { path: '/farmer', exact: true, name: 'Farmer Dashboard', element: Farmer },
  { path: '/notifications', exact: true, name: 'Notifications', element: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
