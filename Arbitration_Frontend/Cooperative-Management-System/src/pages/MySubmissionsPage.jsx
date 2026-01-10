
//CORRECT**************************
// import React, { useState, useEffect } from "react";
// import { FileText, AlertCircle, Eye, XCircle } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

// const MySubmissionsPage = () => {
//   const { user } = useAuth();
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBorrower, setSelectedBorrower] = useState(null);
//   const [showDecisionModal, setShowDecisionModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);

//   useEffect(() => {
//     loadSubmissions();
//   }, []);

//   const loadSubmissions = async () => {
//     try {
//       if (!user.societyId) {
//         console.error("❌ No societyId found in user object!");
//         return;
//       }

//       // ✅ Query by societyId (the MongoDB ObjectId)
//       const data = await api.getSubmissionsBySociety(user.societyId);

//       // 🆕 Sort submissions so newest appear first
//       const sortedData = data.sort(
//         (a, b) => new Date(b.submittedDate) - new Date(a.submittedDate)
//       );

//       setSubmissions(sortedData);
//       console.log("✅ Submissions loaded (newest first):", sortedData.length);
//     } catch (err) {
//       console.error("❌ Error loading submissions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const DecisionModal = ({ borrower, onClose }) => {
//     if (!borrower) return null;

//     const loanAmount = parseFloat(borrower.loanAmount || 0);
//     const interest = parseFloat(borrower.interest || 0);
//     const totalAmount = loanAmount + interest;

//     return (
//       <div
//         className="modal show d-block"
//         style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         onClick={onClose}
//       >
//         <div
//           className="modal-dialog modal-lg modal-dialog-centered"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="modal-content" style={{ borderRadius: "15px" }}>
//             <div
//               className="modal-header text-white"
//               style={{
//                 background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
//                 borderRadius: "15px 15px 0 0",
//               }}
//             >
//               <h5 className="modal-title fw-bold">
//                 තීරක නිලධාරියාගේ තීන්දුවේ සම්පූර්ණ විස්තර
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close btn-close-white"
//                 onClick={onClose}
//               />
//             </div>
//             <div className="modal-body p-4">
//               {/* Basic Information */}
//               <div
//                 className="alert alert-info mb-4"
//                 style={{ borderRadius: "10px" }}
//               >
//                 <h6 className="fw-bold mb-3">මූලික තොරතුරු</h6>
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <strong>නම:</strong> <span>{borrower.borrowerName}</span>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>ලිපිනය:</strong>{" "}
//                     <span>{borrower.borrowerAddress}</span>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>ණය අංකය:</strong> <span>{borrower.loanNumber}</span>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>තීරක අංකය:</strong>{" "}
//                     <span className="text-primary fw-bold">
//                       {borrower.arbitrationNumber}
//                     </span>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>තීරක නිලධාරියා:</strong>{" "}
//                     <span className="text-success">
//                       {borrower.assignedOfficerName}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Loan Details */}
//               <div
//                 className="card border-0 shadow-sm mb-4"
//                 style={{ borderRadius: "10px", background: "#f8f9fa" }}
//               >
//                 <div
//                   className="card-header bg-success text-white"
//                   style={{ borderRadius: "10px 10px 0 0" }}
//                 >
//                   <h6 className="mb-0 fw-bold">මූල් ණය විස්තර</h6>
//                 </div>
//                 <div className="card-body">
//                   <div className="row g-3">
//                     <div className="col-md-4">
//                       <strong>ණය මුදල:</strong>
//                       <div className="fs-5 text-primary">
//                         රු. {loanAmount.toLocaleString("si-LK")}
//                       </div>
//                     </div>
//                     <div className="col-md-4">
//                       <strong>පොළිය:</strong>
//                       <div className="fs-5 text-warning">
//                         රු. {interest.toLocaleString("si-LK")}
//                       </div>
//                     </div>
//                     <div className="col-md-4">
//                       <strong>පොළී අනුපාතය:</strong>
//                       <div className="fs-5 text-info">
//                         {borrower.interestRate}%
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Arbitration Decision */}
//               {borrower.status === "decision-given" ? (
//                 <div
//                   className="card border-0 shadow-sm"
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <div
//                     className="card-header text-white"
//                     style={{
//                       background:
//                         "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//                       borderRadius: "10px 10px 0 0",
//                     }}
//                   >
//                     <h6 className="mb-0 fw-bold">තීරක නිලධාරියාගේ තීන්දුව</h6>
//                   </div>
//                   <div className="card-body">
//                     <div className="row g-3">
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">
//                           තීරණ දුන් දිනය:
//                         </label>
//                         <div className="text-muted">
//                           {borrower.decisionDate
//                             ? new Date(
//                                 borrower.decisionDate
//                               ).toLocaleDateString("si-LK")
//                             : "-"}
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <label className="form-label fw-semibold">
//                           අඩු කළ පොළිය:
//                         </label>
//                         <div className="fs-5 text-danger fw-bold">
//                           රු.{" "}
//                           {parseFloat(
//                             borrower.interestDeducted || 0
//                           ).toLocaleString("si-LK")}
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <label className="form-label fw-semibold">
//                           තීන්දුව / සටහන්:
//                         </label>
//                         <div
//                           className="p-3 bg-light"
//                           style={{ borderRadius: "8px" }}
//                         >
//                           {borrower.arbitrationDecision || "-"}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   className="alert alert-warning"
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <AlertCircle size={18} className="me-2" />
//                   තීන්දුවක් තවමත් ලබා දී නොමැත
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="fw-bold mb-4">මාගේ ඉදිරිපත් කිරීම්</h2>

//       {submissions.length === 0 ? (
//         <div
//           className="alert alert-info d-flex align-items-center"
//           style={{ borderRadius: "10px" }}
//         >
//           <AlertCircle size={18} className="me-2" />
//           ඉදිරිපත් කිරීම් හමු නොවීය
//         </div>
//       ) : (
//         submissions.map((submission) => (
//           <div
//             key={submission.id}
//             className="card mb-4 border-0 shadow-sm"
//             style={{ borderRadius: "15px" }}
//           >
//             <div
//               className="card-header text-white"
//               style={{
//                 background: "linear-gradient(135deg, #92a4f4 0%, #b08dd3 100%)",
//                 borderRadius: "15px 15px 0 0",
//               }}
//             >
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h6 className="mb-1">
//                     ඉදිරිපත් කළ දිනය:{" "}
//                     {new Date(submission.submittedDate).toLocaleDateString(
//                       "si-LK"
//                     )}{" "}
//                     | ඉදිරිපත් කළ අය: {submission.submittedBy}
//                   </h6>
//                 </div>

//                 <span
//                   className={`badge ${
//                     submission.status === "approved"
//                       ? "bg-success"
//                       : submission.status === "rejected"
//                       ? "bg-danger"
//                       : "bg-warning"
//                   } fs-8`}
//                 >
//                   {submission.status === "approved"
//                     ? "අනුමත"
//                     : submission.status === "rejected"
//                     ? "ප්‍රතික්ෂේප"
//                     : "අනුමැතියට"}
//                 </span>
//               </div>
//             </div>
//             <div className="card-body p-0">
//               <div className="table-responsive">
//                 <table className="table table-hover mb-0">
//                   <thead style={{ background: "#f8f9fa" }}>
//                     <tr>
//                       <th className="fw-semibold">ඉදිරිපත් කළ දිනය</th>
//                       <th className="fw-semibold">ණය අංකය</th>
//                       <th className="fw-semibold">නම</th>
//                       <th className="fw-semibold">ලිපිනය</th>
//                       <th className="fw-semibold">ණය මුදල</th>
//                       <th className="fw-semibold">තීරක අංකය</th>
//                       <th className="fw-semibold">තීරක නිලධාරියා</th>
//                       <th className="fw-semibold">තීන්දුව</th>
//                       <th className="fw-semibold">විස්තර</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {submission.borrowers.map((borrower) => (
//                       <tr key={borrower.id}>
//                         <td className="fw-semibold text-muted">
//                           {submission.submittedDate
//                             ? new Date(
//                                 submission.submittedDate
//                               ).toLocaleDateString("si-LK")
//                             : "-"}
//                         </td>
//                         <td>{borrower.loanNumber}</td>
//                         <td>
//                           <strong>{borrower.borrowerName}</strong>
//                         </td>
//                         <td>{borrower.borrowerAddress}</td>
//                         <td>
//                           රු.{" "}
//                           {parseFloat(borrower.loanAmount).toLocaleString(
//                             "si-LK"
//                           )}
//                         </td>
//                         <td className="fw-bold text-primary">
//                           {borrower.arbitrationNumber || "-"}
//                         </td>
//                         <td>{borrower.assignedOfficerName || "-"}</td>
//                         <td>
//                           {borrower.status === "decision-given" ? (
//                             <button
//                               onClick={() => {
//                                 setSelectedBorrower(borrower);
//                                 setShowDecisionModal(true);
//                               }}
//                               className="btn btn-sm btn-success"
//                               style={{ borderRadius: "8px" }}
//                             >
//                               <Eye size={14} className="me-1 mb-0" />
//                               තීන්දුව බලන්න
//                             </button>
//                           ) : (
//                             <span className="badge bg-secondary">
//                               තීන්දුවක් ලබා දී නැත
//                             </span>
//                           )}
//                         </td>
//                         <td>
//                           <button
//                             onClick={() => {
//                               setSelectedBorrower(borrower);
//                               setShowDetailsModal(true);
//                             }}
//                             className="btn btn-outline-info btn-sm"
//                             style={{ borderRadius: "8px" }}
//                           >
//                             <Eye size={14} className="me-1" />
//                             විස්තර
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       {showDecisionModal && (
//         <DecisionModal
//           borrower={selectedBorrower}
//           onClose={() => {
//             setShowDecisionModal(false);
//             setSelectedBorrower(null);
//           }}
//         />
//       )}

//       <BorrowerDetailsModal
//         show={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         borrower={selectedBorrower}
//       />
//     </div>
//   );
// };

// export default MySubmissionsPage;

import React, { useState, useEffect } from "react";
import {
  FileText,
  AlertCircle,
  Eye,
  XCircle,
  CheckCircle,
  Clock,
  Calendar,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import BorrowerDetailsModal from "../components/BorrowerDetailsModal";
import DecisionViewModal from "../components/DecisionViewModal";

const MySubmissionsPage = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [selectedDecisionView, setSelectedDecisionView] = useState(null);
  const [showDecisionViewModal, setShowDecisionViewModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      if (!user.societyId) {
        console.error("❌ No societyId found in user object!");
        return;
      }

      const data = await api.getSubmissionsBySociety(user.societyId);
      const sortedData = data.sort(
        (a, b) => new Date(b.submittedDate) - new Date(a.submittedDate)
      );

      setSubmissions(sortedData);
      console.log("✅ Submissions loaded (newest first):", sortedData.length);
    } catch (err) {
      console.error("❌ Error loading submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return {
          badge: "bg-success",
          text: "අනුමත",
          icon: CheckCircle,
          gradient: "linear-gradient(135deg, #7755b5 0%, #bfa4e9 100%)",
          borderColor: "rgba(255, 255, 255, 0.4)",
        };
      case "rejected":
        return {
          badge: "bg-danger",
          text: "ප්‍රතික්ෂේප",
          icon: XCircle,
          gradient: "linear-gradient(135deg, #7755b5 0%, #e75c5c 100%)",
          borderColor: "rgba(255, 255, 255, 0.4)",
        };
      default:
        return {
          badge: "bg-warning",
          text: "අනුමැතියට",
          icon: Clock,
          gradient: "linear-gradient(135deg, #7755b5 0%, #d5a44e 100%)",
          borderColor: "rgba(255, 255, 255, 0.4)",
        };
    }
  };

  // const DecisionModal = ({ borrower, onClose }) => {
  //   if (!borrower) return null;

  //   const loanAmount = parseFloat(borrower.loanAmount || 0);
  //   const interest = parseFloat(borrower.interest || 0);
  //   const totalAmount = loanAmount + interest;

  //   return (
  //     <div
  //       className="modal show d-block"
  //       style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  //       onClick={onClose}
  //     >
  //       <div
  //         className="modal-dialog modal-lg modal-dialog-centered"
  //         onClick={(e) => e.stopPropagation()}
  //       >
  //         <div
  //           className="modal-content shadow-lg"
  //           style={{
  //             borderRadius: "20px",
  //             border: "2px solid rgba(163, 173, 219, 0.3)",
  //           }}
  //         >
  //           <div
  //             className="modal-header text-white"
  //             style={{
  //               background:
  //                 "linear-gradient(135deg, #a3addbfa 0%, #b988e9c0 100%)",
  //               borderRadius: "20px 20px 0 0",
  //               border: "none",
  //               borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
  //             }}
  //           >
  //             <h5 className="modal-title fw-bold">
  //               තීරක නිලධාරියාගේ තීන්දුවේ සම්පූර්ණ විස්තර
  //             </h5>
  //             <button
  //               type="button"
  //               className="btn-close btn-close-white"
  //               onClick={onClose}
  //             />
  //           </div>
  //           <div className="modal-body p-4">
  //             {/* Basic Information */}
  //             <div
  //               className="card shadow-sm mb-4"
  //               style={{
  //                 borderRadius: "15px",
  //                 background:
  //                   "linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)",
  //                 border: "2px solid rgba(163, 173, 219, 0.3)",
  //               }}
  //             >
  //               <div className="card-body p-4">
  //                 <h6 className="fw-bold mb-3" style={{ color: "#6366f1" }}>
  //                   මූලික තොරතුරු
  //                 </h6>
  //                 <div className="row g-3">
  //                   <div className="col-md-6">
  //                     <div className="d-flex flex-column">
  //                       <small className="text-muted mb-1">නම</small>
  //                       <strong>{borrower.borrowerName}</strong>
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6">
  //                     <div className="d-flex flex-column">
  //                       <small className="text-muted mb-1">ලිපිනය</small>
  //                       <strong>{borrower.borrowerAddress}</strong>
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6">
  //                     <div className="d-flex flex-column">
  //                       <small className="text-muted mb-1">ණය අංකය</small>
  //                       <strong>{borrower.loanNumber}</strong>
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6">
  //                     <div className="d-flex flex-column">
  //                       <small className="text-muted mb-1">තීරක අංකය</small>
  //                       <strong className="text-primary">
  //                         {borrower.arbitrationNumber}
  //                       </strong>
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6">
  //                     <div className="d-flex flex-column">
  //                       <small className="text-muted mb-1">
  //                         තීරක නිලධාරියා
  //                       </small>
  //                       <strong className="text-success">
  //                         {borrower.assignedOfficerName}
  //                       </strong>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Loan Details */}
  //             <div className="row g-3 mb-4">
  //               <div className="col-md-4">
  //                 <div
  //                   className="card shadow-sm h-100"
  //                   style={{
  //                     borderRadius: "15px",
  //                     background:
  //                       "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
  //                     border: "2px solid rgba(59, 130, 246, 0.2)",
  //                   }}
  //                 >
  //                   <div className="card-body text-center p-4">
  //                     <small className="text-muted d-block mb-2">ණය මුදල</small>
  //                     <h4 className="fw-bold mb-0" style={{ color: "#3b82f6" }}>
  //                       රු. {loanAmount.toLocaleString("si-LK")}
  //                     </h4>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="col-md-4">
  //                 <div
  //                   className="card shadow-sm h-100"
  //                   style={{
  //                     borderRadius: "15px",
  //                     background:
  //                       "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
  //                     border: "2px solid rgba(245, 158, 11, 0.2)",
  //                   }}
  //                 >
  //                   <div className="card-body text-center p-4">
  //                     <small className="text-muted d-block mb-2">පොළිය</small>
  //                     <h4 className="fw-bold mb-0" style={{ color: "#f59e0b" }}>
  //                       රු. {interest.toLocaleString("si-LK")}
  //                     </h4>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="col-md-4">
  //                 <div
  //                   className="card shadow-sm h-100"
  //                   style={{
  //                     borderRadius: "15px",
  //                     background:
  //                       "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
  //                     border: "2px solid rgba(16, 185, 129, 0.2)",
  //                   }}
  //                 >
  //                   <div className="card-body text-center p-4">
  //                     <small className="text-muted d-block mb-2">
  //                       පොළී අනුපාතය
  //                     </small>
  //                     <h4 className="fw-bold mb-0" style={{ color: "#10b981" }}>
  //                       {borrower.interestRate}%
  //                     </h4>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Arbitration Decision */}
  //             {borrower.status === "decision-given" ? (
  //               <div
  //                 className="card shadow-sm"
  //                 style={{
  //                   borderRadius: "15px",
  //                   border: "2px solid rgba(16, 185, 129, 0.3)",
  //                 }}
  //               >
  //                 <div
  //                   className="card-header text-white"
  //                   style={{
  //                     background:
  //                       "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  //                     borderRadius: "15px 15px 0 0",
  //                     border: "none",
  //                     borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
  //                   }}
  //                 >
  //                   <h6 className="mb-0 fw-bold">තීරක නිලධාරියාගේ තීන්දුව</h6>
  //                 </div>
  //                 <div className="card-body p-4">
  //                   <div className="row g-3">
  //                     <div className="col-md-6">
  //                       <small className="text-muted d-block mb-2">
  //                         තීරණ දුන් දිනය
  //                       </small>
  //                       <strong>
  //                         {borrower.decisionDate
  //                           ? new Date(
  //                               borrower.decisionDate
  //                             ).toLocaleDateString("si-LK")
  //                           : "-"}
  //                       </strong>
  //                     </div>
  //                     <div className="col-md-6">
  //                       <small className="text-muted d-block mb-2">
  //                         අඩු කළ පොළිය
  //                       </small>
  //                       <h5 className="fw-bold mb-0 text-danger">
  //                         රු.{" "}
  //                         {parseFloat(
  //                           borrower.interestDeducted || 0
  //                         ).toLocaleString("si-LK")}
  //                       </h5>
  //                     </div>
  //                     <div className="col-12">
  //                       <small className="text-muted d-block mb-2">
  //                         තීන්දුව / සටහන්
  //                       </small>
  //                       <div
  //                         className="p-3 bg-light"
  //                         style={{
  //                           borderRadius: "10px",
  //                           border: "1px solid rgba(0, 0, 0, 0.1)",
  //                         }}
  //                       >
  //                         {borrower.arbitrationDecision || "-"}
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             ) : (
  //               <div
  //                 className="alert alert-warning"
  //                 style={{
  //                   borderRadius: "15px",
  //                   border: "2px solid rgba(245, 158, 11, 0.3)",
  //                 }}
  //               >
  //                 <div className="d-flex align-items-center">
  //                   <AlertCircle size={20} className="me-2" />
  //                   <span>තීන්දුවක් තවමත් ලබා දී නොමැත</span>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        />
        <p className="mt-3 text-muted">පූරණය වෙමින් පවතී...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">තීරකකරණය සදහා ඉදිරිපත් කරන ලද ගොනු</h2>
          <p className="text-muted mb-0">
            <FileText size={16} className="me-2" />
            මුළු ඉදිරිපත් කිරීම්: <strong>{submissions.length}</strong>
          </p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div
          className="card shadow-sm"
          style={{
            borderRadius: "20px",
            border: "2px solid rgba(163, 173, 219, 0.2)",
          }}
        >
          <div className="card-body text-center p-5">
            <AlertCircle size={48} className="text-muted mb-3" />
            <h5 className="text-muted">ඉදිරිපත් කිරීම් හමු නොවීය</h5>
            <p className="text-muted mb-0">
              ඔබ තවමත් කිසිදු ඉදිරිපත් කිරීමක් සිදු කර නැත
            </p>
          </div>
        </div>
      ) : (
        submissions.map((submission) => {
          const statusConfig = getStatusConfig(submission.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={submission.id}
              className="card mb-4 shadow-sm"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: `2px solid ${statusConfig.borderColor}`,
              }}
            >
              {/* Card Header */}
              <div
                className="card-header text-white p-2"
                style={{
                  background: statusConfig.gradient,
                  border: "none",
                  borderBottom: `2px solid ${statusConfig.borderColor}`,
                }}
              >
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="d-flex align-items-center mb-1">
                      <Calendar size={18} className="me-3" />
                      <h6 className="mb-0 fw-semibold">
                        ඉදිරිපත් කළ දිනය:{" "}
                        {new Date(submission.submittedDate).toLocaleDateString(
                          "si-LK"
                        )}
                      </h6>
                    </div>
                    <small className="opacity-90 mx-2">
                      ඉදිරිපත් කළ අය: <strong>{submission.submittedBy}</strong>
                    </small>
                  </div>
                  <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    <div className="d-flex align-items-center justify-content-md-end">
                      <StatusIcon size={16} className="me-2" />
                      <span
                        className="badge bg-white text-dark px-2 py-2"
                        style={{
                          fontSize: "0.75rem",
                          border: "2px solid rgba(255, 255, 255, 0.5)",
                        }}
                      >
                        {statusConfig.text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body - Table */}
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead
                      style={{
                        background: "#f8f9fa",
                        borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <tr>
                        <th
                          className="fw-semibold px-4 py-3"
                          style={{
                            borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          ඉදිරිපත් කළ දිනය
                        </th>
                        <th
                          className="fw-semibold py-3"
                          style={{
                            borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          ණය අංකය
                        </th>
                        <th
                          className="fw-semibold py-3"
                          style={{
                            borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          නම
                        </th>
                        <th
                          className="fw-semibold py-3"
                          style={{
                            borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          ලිපිනය
                        </th>
                        <th
                          className="fw-semibold py-3"
                          style={{
                            borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          ණය මුදල
                        </th>
                        <th
                          className="fw-semibold py-3"
                          style={{
                            borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          තීරක අංකය
                        </th>
                        <th
                          className="fw-semibold py-3"
                          style={{
                            borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          තීරක නිලධාරියා
                        </th>
                        <th
                          className="fw-semibold py-3"
                          style={{
                            borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          තීන්දුව
                        </th>
                        <th className="fw-semibold py-3">විස්තර</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submission.borrowers.map((borrower, idx) => (
                        <tr
                          key={borrower.id}
                          style={{
                            transition: "all 0.2s",
                            borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          <td
                            className="fw-semibold text-muted px-4 py-3"
                            style={{
                              borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            {submission.submittedDate
                              ? new Date(
                                  submission.submittedDate
                                ).toLocaleDateString("si-LK")
                              : "-"}
                          </td>
                          <td
                            className="py-3"
                            style={{
                              borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            <span
                              className="badge bg-light text-dark"
                              style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                            >
                              {borrower.loanNumber}
                            </span>
                          </td>
                          <td
                            className="py-3"
                            style={{
                              borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            <strong>{borrower.borrowerName}</strong>
                          </td>
                          <td
                            className="py-3"
                            style={{
                              borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            {borrower.borrowerAddress}
                          </td>
                          <td
                            className="py-3"
                            style={{
                              borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            <strong className="text-primary">
                              රු.{" "}
                              {parseFloat(borrower.loanAmount).toLocaleString(
                                "si-LK"
                              )}
                            </strong>
                          </td>
                          <td
                            className="py-3"
                            style={{
                              borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            <span
                              className="badge bg-primary bg-opacity-10 text-primary px-3 py-2"
                              style={{
                                border: "1px solid rgba(99, 102, 241, 0.2)",
                              }}
                            >
                              {borrower.arbitrationNumber || "-"}
                            </span>
                          </td>
                          <td
                            className="py-3"
                            style={{
                              borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            <span className="text-success fw-semibold">
                              {borrower.assignedOfficerName || "-"}
                            </span>
                          </td>
                          <td
                            className="py-3"
                            style={{
                              borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            {borrower.status === "decision-given" ? (
                              <button
                                onClick={() => {
                                  setSelectedDecisionView(borrower);
                                  setShowDecisionViewModal(true);
                                }}
                                className="btn btn-sm btn-success"
                                style={{
                                  borderRadius: "10px",
                                  border: "2px solid rgba(16, 185, 129, 0.3)",
                                }}
                              >
                                <Eye size={14} className="me-1" />
                                තීන්දුව බලන්න
                              </button>
                            ) : (
                              <span
                                className="badge bg-secondary bg-opacity-25 text-secondary px-3 py-2"
                                style={{
                                  border: "1px solid rgba(108, 117, 125, 0.2)",
                                }}
                              >
                                තීන්දුවක් ලබා දී නැත
                              </span>
                            )}
                          </td>
                          <td className="py-3">
                            <button
                              onClick={() => {
                                setSelectedBorrower(borrower);
                                setShowDetailsModal(true);
                              }}
                              className="btn btn-outline-info btn-sm"
                              style={{
                                borderRadius: "10px",
                                border: "2px solid rgba(6, 182, 212, 0.3)",
                              }}
                            >
                              <Eye size={14} className="me-1" />
                              විස්තර
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* {showDecisionModal && (
        <DecisionModal
          borrower={selectedBorrower}
          onClose={() => {
            setShowDecisionModal(false);
            setSelectedBorrower(null);
          }}
        />
      )} */}

      <DecisionViewModal
        show={showDecisionViewModal}
        onClose={() => {
          setShowDecisionViewModal(false);
          setSelectedDecisionView(null);
        }}
        borrower={selectedDecisionView}
      />

      <BorrowerDetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        borrower={selectedBorrower}
      />
    </div>
  );
};

export default MySubmissionsPage;
