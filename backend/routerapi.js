const express = require('express');

const routerapi = express.Router()

// Projects
routerapi.use('/api/projects', require('./Router/Admin/ProjectsRouter'));
// Jobs
routerapi.use('/api/jobs', require('./Router/Admin/JobsRouter'));
// Client
routerapi.use('/api/client', require('./Router/Admin/ClientManagementRouter'));
// User
routerapi.use('/api/user', require('./Router/userRouter'));
// CostEstimates
routerapi.use('/api/costEstimates', require('./Router/Admin/CostEstimatesRouter'));
// TimeLogs
routerapi.use('/api/timeLogs', require('./Router/Admin/TimeLogsRouter'));
// ReceivablePurchase
routerapi.use('/api/receivablePurchase', require('./Router/Admin/ReceivablePurchaseRouter'));
// TimesheetWorklog
routerapi.use('/api/timesheetWorklog', require('./Router/Admin/TimesheetWorklogRouter'));
// InvoicingBilling
routerapi.use('/api/invoicingBilling', require('./Router/Admin/InvoicingBillingRouter'));
// AssignmentJob
routerapi.use('/api/AssignmentJob', require('./Router/Admin/AssignmentJobControllerRouter'));
// ReportsAnalyticsController
routerapi.use('/api/ReportsAnalytics', require('./Router/Admin/ReportsAnalyticsrRouter'));
// Remove Assign Job
routerapi.use('/api/Remove', require('./Router/Admin/removeAssignRouter'));
// PDFCreate
routerapi.use('/api/pdf', require('./Router/Admin/PDF_EstimatesRouter'));
///////Employee
routerapi.use('/api/employee/dashboard', require('./Router/Employee/DashboardRouter'));
//Plan
routerapi.use('/api/admin/plans', require('./Router/Admin/PlanRouter'));
//Coupons
routerapi.use('/api/coupons', require('./Router/Admin/CouponsRouter'));
//Domain
routerapi.use('/api/domain', require('./Router/Admin/DomainRouter'));
// notifiction 
routerapi.use('/api/notifiction',require('./Router/notifictionRouter'));

module.exports = routerapi