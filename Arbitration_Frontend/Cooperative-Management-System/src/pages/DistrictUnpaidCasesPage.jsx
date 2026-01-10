// // // PaymentPendingCasesPage.jsx
// // // Place this file in: src/pages/PaymentPendingCasesPage.jsx

// // import React, { useState, useEffect } from "react";
// // import { AlertCircle, Eye, UserCheck, Scale, CheckCircle } from "lucide-react";
// // import { useAuth } from "../context/AuthContext";
// // import api from "../services/api";
// // import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

// // const PaymentPendingCasesPage = () => {
// //   const { user } = useAuth();
// //   const [paymentPendingCases, setPaymentPendingCases] = useState([]);
// //   const [legalOfficers, setLegalOfficers] = useState([]);
// //   const [courts, setCourts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedBorrower, setSelectedBorrower] = useState(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [showAssignModal, setShowAssignModal] = useState(false);
// //   const [selectedCase, setSelectedCase] = useState(null);
// //   const [assignmentData, setAssignmentData] = useState({
// //     legalOfficerId: "",
// //     courtId: "",
// //   });
// //   const [selectedCases, setSelectedCases] = useState({});

// //   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       const districtId = user.district;
// //       const casesData = await api.getPaymentPendingCases(districtId);
// //       setPaymentPendingCases(casesData);

// //       const officersData = await api.getLegalOfficersByDistrict(districtId);
// //       setLegalOfficers(officersData);

// //       const courtsData = await api.getCourtsByDistrict(districtId);
// //       setCourts(courtsData);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleOpenAssignModal = (caseData) => {
// //     setSelectedCase(caseData);
// //     setAssignmentData({
// //       legalOfficerId: "",
// //       courtId: "",
// //     });
// //     setShowAssignModal(true);
// //   };

// //   const handleAssignLegalOfficer = async () => {
// //     if (!assignmentData.legalOfficerId || !assignmentData.courtId) {
// //       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න");
// //       return;
// //     }

// //     try {
// //       await api.assignLegalOfficerToBorrower(
// //         selectedCase.submissionId,
// //         selectedCase.borrowerId,
// //         assignmentData.legalOfficerId,
// //         assignmentData.courtId
// //       );
// //       alert("උසාවි නිලධාරි	යා සාර්ථකව පවරන ලදී!");
// //       setShowAssignModal(false);
// //       loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   const handleSelectCase = (caseId) => {
// //     setSelectedCases((prev) => ({
// //       ...prev,
// //       [caseId]: !prev[caseId],
// //     }));
// //   };

// //   const handleBatchAssign = async () => {
// //     const selectedIds = Object.keys(selectedCases).filter(
// //       (id) => selectedCases[id]
// //     );

// //     if (selectedIds.length === 0) {
// //       alert("කරුණාකර අවම වශයෙන් එක් නඩුවක් තෝරන්න");
// //       return;
// //     }

// //     if (!assignmentData.legalOfficerId || !assignmentData.courtId) {
// //       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න");
// //       return;
// //     }

// //     const assignments = selectedIds.map((id) => {
// //       const caseData = paymentPendingCases.find(
// //         (c) => `${c.submissionId}-${c.borrowerId}` === id
// //       );
// //       return {
// //         submissionId: caseData.submissionId,
// //         borrowerId: caseData.borrowerId,
// //         legalOfficerId: assignmentData.legalOfficerId,
// //         courtId: assignmentData.courtId,
// //       };
// //     });

// //     try {
// //       const result = await api.batchAssignLegalOfficer(assignments);
// //       alert(
// //         `සාර්ථකව පවරන ලදී: ${result.successCount}\nඅසමත්: ${result.failCount}`
// //       );
// //       setSelectedCases({});
// //       loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center py-5">
// //         <div className="spinner-border text-primary" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <h2 className="fw-bold mb-3">ගෙවීම් නොකළ නඩු - නීති නිලධාරී පැවරීම</h2>
// //       <div
// //         className="alert alert-warning d-flex align-items-center mb-4"
// //         style={{ borderRadius: "10px" }}
// //       >
// //         <AlertCircle size={18} className="me-2" />
// //         බේරුම්කරු තීරණයෙන් පසු ගෙවීම නොකළ නඩු නීති නිලධාරීන්ට පවරන්න
// //       </div>

// //       {/* Batch Assignment Section */}
// //       {paymentPendingCases.length > 0 && (
// //         <div
// //           className="card border-0 shadow-sm mb-4"
// //           style={{ borderRadius: "15px" }}
// //         >
// //           <div className="card-body p-4">
// //             <h5 className="fw-bold mb-3">තොග පැවරීම</h5>
// //             <div className="row">
// //               <div className="col-md-4">
// //                 <label className="form-label fw-semibold">උසාවි නිලධාරි	යා</label>
// //                 <select
// //                   className="form-select"
// //                   value={assignmentData.legalOfficerId}
// //                   onChange={(e) =>
// //                     setAssignmentData({
// //                       ...assignmentData,
// //                       legalOfficerId: e.target.value,
// //                     })
// //                   }
// //                   style={{ borderRadius: "10px" }}
// //                 >
// //                   <option value="">උසාවි නිලධාරි	යෙකු තෝරන්න</option>
// //                   {legalOfficers.map((officer) => (
// //                     <option key={officer.id} value={officer.id}>
// //                       {officer.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div className="col-md-4">
// //                 <label className="form-label fw-semibold">උසාවිය</label>
// //                 <select
// //                   className="form-select"
// //                   value={assignmentData.courtId}
// //                   onChange={(e) =>
// //                     setAssignmentData({
// //                       ...assignmentData,
// //                       courtId: e.target.value,
// //                     })
// //                   }
// //                   style={{ borderRadius: "10px" }}
// //                 >
// //                   <option value="">උසාවියක් තෝරන්න</option>
// //                   {courts.map((court) => (
// //                     <option key={court.id} value={court.id}>
// //                       {court.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div className="col-md-4 d-flex align-items-end">
// //                 <button
// //                   onClick={handleBatchAssign}
// //                   className="btn btn-primary w-100"
// //                   style={{ borderRadius: "10px" }}
// //                   disabled={
// //                     Object.values(selectedCases).filter(Boolean).length === 0
// //                   }
// //                 >
// //                   <CheckCircle size={16} className="me-2" />
// //                   තෝරාගත් නඩු පවරන්න (
// //                   {Object.values(selectedCases).filter(Boolean).length})
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {paymentPendingCases.length === 0 ? (
// //         <div
// //           className="alert alert-info d-flex align-items-center"
// //           style={{ borderRadius: "10px" }}
// //         >
// //           <AlertCircle size={18} className="me-2" />
// //           ගෙවීම් නොකළ නඩු නොමැත
// //         </div>
// //       ) : (
// //         <div
// //           className="card border-0 shadow-sm"
// //           style={{ borderRadius: "15px" }}
// //         >
// //           <div className="table-responsive">
// //             <table className="table table-hover mb-0">
// //               <thead
// //                 style={{
// //                   background:
// //                     "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
// //                 }}
// //                 className="text-white"
// //               >
// //                 <tr>
// //                   <th className="fw-semibold">
// //                     <input
// //                       type="checkbox"
// //                       onChange={(e) => {
// //                         const newSelected = {};
// //                         if (e.target.checked) {
// //                           paymentPendingCases.forEach((c) => {
// //                             if (!c.sentToLegalOfficer) {
// //                               newSelected[
// //                                 `${c.submissionId}-${c.borrowerId}`
// //                               ] = true;
// //                             }
// //                           });
// //                         }
// //                         setSelectedCases(newSelected);
// //                       }}
// //                       className="form-check-input"
// //                     />
// //                   </th>
// //                   <th className="fw-semibold">තීරක අංකය</th>
// //                   <th className="fw-semibold">ණයගැතියාගේ නම</th>
// //                   <th className="fw-semibold">සමිතිය</th>
// //                   <th className="fw-semibold">ණය අංකය</th>
// //                   <th className="fw-semibold">ණය මුදල</th>
// //                   <th className="fw-semibold">තීරණ දිනය</th>
// //                   <th className="fw-semibold">තත්වය</th>
// //                   <th className="fw-semibold">ක්‍රියා</th>
// //                   <th className="fw-semibold">විස්තර</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {paymentPendingCases.map((caseData) => {
// //                   const caseId = `${caseData.submissionId}-${caseData.borrowerId}`;
// //                   return (
// //                     <tr key={caseId}>
// //                       <td>
// //                         {!caseData.sentToLegalOfficer && (
// //                           <input
// //                             type="checkbox"
// //                             checked={selectedCases[caseId] || false}
// //                             onChange={() => handleSelectCase(caseId)}
// //                             className="form-check-input"
// //                           />
// //                         )}
// //                       </td>
// //                       <td className="fw-bold text-primary">
// //                         {caseData.arbitrationNumber}
// //                       </td>
// //                       <td>
// //                         <strong>{caseData.borrowerName}</strong>
// //                       </td>
// //                       <td>{caseData.societyName}</td>
// //                       <td>{caseData.loanNumber}</td>
// //                       <td>
// //                         රු.{" "}
// //                         {parseFloat(caseData.loanAmount).toLocaleString(
// //                           "si-LK"
// //                         )}
// //                       </td>
// //                       <td>
// //                         {caseData.decisionDate
// //                           ? new Date(caseData.decisionDate).toLocaleDateString(
// //                               "si-LK"
// //                             )
// //                           : "-"}
// //                       </td>
// //                       <td>
// //                         {caseData.sentToLegalOfficer ? (
// //                           <span className="badge bg-success">
// //                             උසාවි නිලධාරි	යාට පවරා ඇත
// //                           </span>
// //                         ) : (
// //                           <span className="badge bg-danger">පවරා නැත</span>
// //                         )}
// //                       </td>
// //                       <td>
// //                         {!caseData.sentToLegalOfficer && (
// //                           <button
// //                             onClick={() => handleOpenAssignModal(caseData)}
// //                             className="btn btn-primary btn-sm"
// //                             style={{ borderRadius: "8px" }}
// //                           >
// //                             <UserCheck size={14} className="me-1" />
// //                             පවරන්න
// //                           </button>
// //                         )}
// //                       </td>
// //                       <td>
// //                         <button
// //                           onClick={() => {
// //                             setSelectedBorrower(caseData);
// //                             setShowDetailsModal(true);
// //                           }}
// //                           className="btn btn-outline-info btn-sm"
// //                           style={{ borderRadius: "8px" }}
// //                         >
// //                           <Eye size={14} className="me-1" />
// //                           විස්තර
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       )}

// //       {/* Assign Modal */}
// //       {showAssignModal && selectedCase && (
// //         <>
// //           <div
// //             className="modal-backdrop show"
// //             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
// //             onClick={() => setShowAssignModal(false)}
// //           ></div>
// //           <div
// //             className="modal show d-block"
// //             style={{ zIndex: 1055 }}
// //             tabIndex="-1"
// //           >
// //             <div className="modal-dialog modal-dialog-centered">
// //               <div
// //                 className="modal-content border-0 shadow-lg"
// //                 style={{ borderRadius: "20px" }}
// //               >
// //                 <div
// //                   className="modal-header text-white"
// //                   style={{
// //                     background:
// //                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //                     borderRadius: "20px 20px 0 0",
// //                   }}
// //                 >
// //                   <h5 className="modal-title fw-bold d-flex align-items-center">
// //                     <Scale size={20} className="me-2" />
// //                     උසාවි නිලධාරි	යා පවරන්න
// //                   </h5>
// //                   <button
// //                     type="button"
// //                     className="btn-close btn-close-white"
// //                     onClick={() => setShowAssignModal(false)}
// //                   ></button>
// //                 </div>
// //                 <div className="modal-body p-4">
// //                   <div className="alert alert-info mb-4">
// //                     <strong>ණයගැතියාගේ නම:</strong> {selectedCase.borrowerName}
// //                     <br />
// //                     <strong>තීරක අංකය:</strong> {selectedCase.arbitrationNumber}
// //                     <br />
// //                     <strong>සමිතිය:</strong> {selectedCase.societyName}
// //                   </div>

// //                   <div className="mb-3">
// //                     <label className="form-label fw-semibold">
// //                       උසාවි නිලධාරි	යා *
// //                     </label>
// //                     <select
// //                       className="form-select form-select-lg"
// //                       value={assignmentData.legalOfficerId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           legalOfficerId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවි නිලධාරි	යෙකු තෝරන්න</option>
// //                       {legalOfficers.map((officer) => (
// //                         <option key={officer.id} value={officer.id}>
// //                           {officer.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div className="mb-3">
// //                     <label className="form-label fw-semibold">උසාවිය *</label>
// //                     <select
// //                       className="form-select form-select-lg"
// //                       value={assignmentData.courtId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           courtId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවියක් තෝරන්න</option>
// //                       {courts.map((court) => (
// //                         <option key={court.id} value={court.id}>
// //                           {court.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <div className="modal-footer border-0 p-4">
// //                   <button
// //                     type="button"
// //                     className="btn btn-secondary btn-lg px-4"
// //                     onClick={() => setShowAssignModal(false)}
// //                     style={{ borderRadius: "10px" }}
// //                   >
// //                     අවලංගු කරන්න
// //                   </button>
// //                   <button
// //                     type="button"
// //                     className="btn btn-primary btn-lg px-4"
// //                     onClick={handleAssignLegalOfficer}
// //                     style={{
// //                       borderRadius: "10px",
// //                       background:
// //                         "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //                       border: "none",
// //                     }}
// //                   >
// //                     <CheckCircle size={16} className="me-2" />
// //                     පවරන්න
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       )}

// //       <BorrowerDetailsModal
// //         show={showDetailsModal}
// //         onClose={() => setShowDetailsModal(false)}
// //         borrower={selectedBorrower}
// //       />
// //     </div>
// //   );
// // };

// // export default PaymentPendingCasesPage;

// // PaymentPendingCasesPage.jsx
// // Place this file in: src/pages/PaymentPendingCasesPage.jsx

// // import React, { useState, useEffect } from "react";
// // import {
// //   AlertCircle,
// //   Eye,
// //   UserCheck,
// //   Scale,
// //   CheckCircle,
// //   History,
// //   Calendar,
// //   Building2,
// //   User,
// // } from "lucide-react";
// // import { useAuth } from "../context/AuthContext";
// // import api from "../services/api";
// // import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

// // const PaymentPendingCasesPage = () => {
// //   const { user } = useAuth();
// //   const [paymentPendingCases, setPaymentPendingCases] = useState([]);
// //   const [assignedCasesHistory, setAssignedCasesHistory] = useState([]);
// //   const [legalOfficers, setLegalOfficers] = useState([]);
// //   const [courts, setCourts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedBorrower, setSelectedBorrower] = useState(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [showAssignModal, setShowAssignModal] = useState(false);
// //   const [selectedCase, setSelectedCase] = useState(null);
// //   const [assignmentData, setAssignmentData] = useState({
// //     legalOfficerId: "",
// //     courtId: "",
// //   });
// //   const [selectedCases, setSelectedCases] = useState({});
// //   const [activeTab, setActiveTab] = useState("pending");

// //   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       const districtId = user.district;

// //       // Get all payment pending cases (both assigned and unassigned)
// //       const casesData = await api.getPaymentPendingCases(districtId);
// //       console.log("All cases data:", casesData);

// //       // Get legal officers and courts to map names
// //       const officersData = await api.getLegalOfficersByDistrict(districtId);
// //       const courtsData = await api.getCourtsByDistrict(districtId);

// //       setLegalOfficers(officersData);
// //       setCourts(courtsData);

// //       // Create lookup maps for officer and court names
// //       const officerMap = {};
// //       officersData.forEach((officer) => {
// //         officerMap[officer.id] = officer.name;
// //       });

// //       const courtMap = {};
// //       courtsData.forEach((court) => {
// //         courtMap[court.id] = court.name;
// //       });

// //       // Separate pending and assigned cases, and enrich assigned cases with names
// //       const pending = casesData.filter((c) => !c.sentToLegalOfficer);
// //       const assigned = casesData
// //         .filter((c) => c.sentToLegalOfficer)
// //         .map((c) => ({
// //           ...c,
// //           legalOfficerName: officerMap[c.legalOfficerId] || "N/A",
// //           courtName: courtMap[c.courtId] || "N/A",
// //         }));

// //       console.log("Pending cases:", pending);
// //       console.log("Assigned cases with details:", assigned);

// //       setPaymentPendingCases(pending);
// //       setAssignedCasesHistory(assigned);
// //     } catch (err) {
// //       console.error("Error loading data:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleOpenAssignModal = (caseData) => {
// //     setSelectedCase(caseData);
// //     setAssignmentData({
// //       legalOfficerId: "",
// //       courtId: "",
// //     });
// //     setShowAssignModal(true);
// //   };

// //   const handleAssignLegalOfficer = async () => {
// //     if (!assignmentData.legalOfficerId || !assignmentData.courtId) {
// //       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න");
// //       return;
// //     }

// //     try {
// //       await api.assignLegalOfficerToBorrower(
// //         selectedCase.submissionId,
// //         selectedCase.borrowerId,
// //         assignmentData.legalOfficerId,
// //         assignmentData.courtId
// //       );
// //       alert("උසාවි නිලධාරි	යා සාර්ථකව පවරන ලදී!");
// //       setShowAssignModal(false);
// //       setSelectedCases({});
// //       loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   const handleSelectCase = (caseId) => {
// //     setSelectedCases((prev) => ({
// //       ...prev,
// //       [caseId]: !prev[caseId],
// //     }));
// //   };

// //   const handleBatchAssign = async () => {
// //     const selectedIds = Object.keys(selectedCases).filter(
// //       (id) => selectedCases[id]
// //     );

// //     if (selectedIds.length === 0) {
// //       alert("කරුණාකර අවම වශයෙන් එක් නඩුවක් තෝරන්න");
// //       return;
// //     }

// //     if (!assignmentData.legalOfficerId || !assignmentData.courtId) {
// //       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න");
// //       return;
// //     }

// //     const assignments = selectedIds.map((id) => {
// //       const caseData = paymentPendingCases.find(
// //         (c) => `${c.submissionId}-${c.borrowerId}` === id
// //       );
// //       return {
// //         submissionId: caseData.submissionId,
// //         borrowerId: caseData.borrowerId,
// //         legalOfficerId: assignmentData.legalOfficerId,
// //         courtId: assignmentData.courtId,
// //       };
// //     });

// //     try {
// //       const result = await api.batchAssignLegalOfficer(assignments);
// //       alert(
// //         `සාර්ථකව පවරන ලදී: ${result.successCount}\nඅසමත්: ${result.failCount}`
// //       );
// //       setSelectedCases({});
// //       setAssignmentData({ legalOfficerId: "", courtId: "" });
// //       loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center py-5">
// //         <div className="spinner-border text-primary" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <h2 className="fw-bold mb-3">ගෙවීම් නොකළ නඩු - නීති නිලධාරී පැවරීම</h2>

// //       {/* Tabs */}
// //       <ul
// //         className="nav nav-tabs mb-4"
// //         style={{ borderRadius: "10px 10px 0 0" }}
// //       >
// //         <li className="nav-item">
// //           <button
// //             className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
// //             onClick={() => setActiveTab("pending")}
// //             style={{
// //               borderRadius: "10px 10px 0 0",
// //               fontWeight: activeTab === "pending" ? "bold" : "normal",
// //             }}
// //           >
// //             <AlertCircle size={16} className="me-2" />
// //             නීති නිලධාරීන්ට පැවරීමට ({paymentPendingCases.length})
// //           </button>
// //         </li>
// //         <li className="nav-item">
// //           <button
// //             className={`nav-link ${activeTab === "history" ? "active" : ""}`}
// //             onClick={() => setActiveTab("history")}
// //             style={{
// //               borderRadius: "10px 10px 0 0",
// //               fontWeight: activeTab === "history" ? "bold" : "normal",
// //             }}
// //           >
// //             <History size={16} className="me-2" />
// //             නීති නිලධාරීන්ට පවරා ඇති ({assignedCasesHistory.length})
// //           </button>
// //         </li>
// //       </ul>

// //       {/* Pending Cases Tab */}
// //       {activeTab === "pending" && (
// //         <>
// //           <div
// //             className="alert alert-warning d-flex align-items-center mb-4"
// //             style={{ borderRadius: "10px" }}
// //           >
// //             <AlertCircle size={18} className="me-2" />
// //             බේරුම්කරු තීරණයෙන් පසු ගෙවීම නොකළ නඩු නීති නිලධාරීන්ට පවරන්න
// //           </div>

// //           {/* Batch Assignment Section */}
// //           {paymentPendingCases.length > 0 && (
// //             <div
// //               className="card border-0 shadow-sm mb-4"
// //               style={{ borderRadius: "15px" }}
// //             >
// //               <div className="card-body p-4">
// //                 <h5 className="fw-bold mb-3">තොග පැවරීම</h5>
// //                 <div className="row">
// //                   <div className="col-md-4">
// //                     <label className="form-label fw-semibold">
// //                       උසාවි නිලධාරි	යා
// //                     </label>
// //                     <select
// //                       className="form-select"
// //                       value={assignmentData.legalOfficerId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           legalOfficerId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවි නිලධාරි	යෙකු තෝරන්න</option>
// //                       {legalOfficers.map((officer) => (
// //                         <option key={officer.id} value={officer.id}>
// //                           {officer.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                   <div className="col-md-4">
// //                     <label className="form-label fw-semibold">උසාවිය</label>
// //                     <select
// //                       className="form-select"
// //                       value={assignmentData.courtId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           courtId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවියක් තෝරන්න</option>
// //                       {courts.map((court) => (
// //                         <option key={court.id} value={court.id}>
// //                           {court.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                   <div className="col-md-4 d-flex align-items-end">
// //                     <button
// //                       onClick={handleBatchAssign}
// //                       className="btn btn-primary w-100"
// //                       style={{ borderRadius: "10px" }}
// //                       disabled={
// //                         Object.values(selectedCases).filter(Boolean).length ===
// //                         0
// //                       }
// //                     >
// //                       <CheckCircle size={16} className="me-2" />
// //                       තෝරාගත් නඩු පවරන්න (
// //                       {Object.values(selectedCases).filter(Boolean).length})
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Pending Cases Table */}
// //           {paymentPendingCases.length === 0 ? (
// //             <div
// //               className="alert alert-info d-flex align-items-center"
// //               style={{ borderRadius: "10px" }}
// //             >
// //               <AlertCircle size={18} className="me-2" />
// //               ගෙවීම් නොකළ නඩු නොමැත
// //             </div>
// //           ) : (
// //             <div
// //               className="card border-0 shadow-sm"
// //               style={{ borderRadius: "15px" }}
// //             >
// //               <div className="table-responsive">
// //                 <table className="table table-hover mb-0">
// //                   <thead
// //                     style={{
// //                       background:
// //                         "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
// //                     }}
// //                     className="text-white"
// //                   >
// //                     <tr>
// //                       <th className="fw-semibold">
// //                         <input
// //                           type="checkbox"
// //                           onChange={(e) => {
// //                             const newSelected = {};
// //                             if (e.target.checked) {
// //                               paymentPendingCases.forEach((c) => {
// //                                 newSelected[
// //                                   `${c.submissionId}-${c.borrowerId}`
// //                                 ] = true;
// //                               });
// //                             }
// //                             setSelectedCases(newSelected);
// //                           }}
// //                           className="form-check-input"
// //                         />
// //                       </th>
// //                       <th className="fw-semibold">තීරක අංකය</th>
// //                       <th className="fw-semibold">ණයගැතියාගේ නම</th>
// //                       <th className="fw-semibold">සමිතිය</th>
// //                       <th className="fw-semibold">ණය අංකය</th>
// //                       <th className="fw-semibold">ණය මුදල</th>
// //                       <th className="fw-semibold">තීරණ දිනය</th>
// //                       <th className="fw-semibold">ක්‍රියා</th>
// //                       <th className="fw-semibold">විස්තර</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {paymentPendingCases.map((caseData) => {
// //                       const caseId = `${caseData.submissionId}-${caseData.borrowerId}`;
// //                       return (
// //                         <tr key={caseId}>
// //                           <td>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectedCases[caseId] || false}
// //                               onChange={() => handleSelectCase(caseId)}
// //                               className="form-check-input"
// //                             />
// //                           </td>
// //                           <td className="fw-bold text-primary">
// //                             {caseData.arbitrationNumber}
// //                           </td>
// //                           <td>
// //                             <strong>{caseData.borrowerName}</strong>
// //                           </td>
// //                           <td>{caseData.societyName}</td>
// //                           <td>{caseData.loanNumber}</td>
// //                           <td>
// //                             රු.{" "}
// //                             {parseFloat(caseData.loanAmount).toLocaleString(
// //                               "si-LK"
// //                             )}
// //                           </td>
// //                           <td>
// //                             {caseData.decisionDate
// //                               ? new Date(
// //                                   caseData.decisionDate
// //                                 ).toLocaleDateString("si-LK")
// //                               : "-"}
// //                           </td>
// //                           <td>
// //                             <button
// //                               onClick={() => handleOpenAssignModal(caseData)}
// //                               className="btn btn-primary btn-sm"
// //                               style={{ borderRadius: "8px" }}
// //                             >
// //                               <UserCheck size={14} className="me-1" />
// //                               පවරන්න
// //                             </button>
// //                           </td>
// //                           <td>
// //                             <button
// //                               onClick={() => {
// //                                 setSelectedBorrower(caseData);
// //                                 setShowDetailsModal(true);
// //                               }}
// //                               className="btn btn-outline-info btn-sm"
// //                               style={{ borderRadius: "8px" }}
// //                             >
// //                               <Eye size={14} className="me-1" />
// //                               විස්තර
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* History Tab */}
// //       {activeTab === "history" && (
// //         <>
// //           <div
// //             className="alert alert-info d-flex align-items-center mb-4"
// //             style={{ borderRadius: "10px" }}
// //           >
// //             <History size={18} className="me-2" />
// //             නීති නිලධාරීන්ට පවරා ඇති සියලුම නඩු ඉතිහාසය
// //           </div>

// //           {assignedCasesHistory.length === 0 ? (
// //             <div
// //               className="alert alert-warning d-flex align-items-center"
// //               style={{ borderRadius: "10px" }}
// //             >
// //               <AlertCircle size={18} className="me-2" />
// //               තවම නීති නිලධාරීන්ට පවරා නොමැත
// //             </div>
// //           ) : (
// //             <>
// //               <div
// //                 className="card border-0 shadow-sm"
// //                 style={{ borderRadius: "15px" }}
// //               >
// //                 <div className="table-responsive">
// //                   <table className="table table-hover mb-0">
// //                     <thead
// //                       style={{
// //                         background:
// //                           "linear-gradient(135deg, #059669 0%, #047857 100%)",
// //                       }}
// //                       className="text-white"
// //                     >
// //                       <tr>
// //                         <th className="fw-semibold">තීරක අංකය</th>
// //                         <th className="fw-semibold">ණයගැතියාගේ නම</th>
// //                         <th className="fw-semibold">සමිතිය</th>
// //                         <th className="fw-semibold">ණය අංකය</th>
// //                         <th className="fw-semibold">ණය මුදල</th>
// //                         <th className="fw-semibold">තීරණ දිනය</th>
// //                         <th className="fw-semibold">උසාවි නිලධාරි	යා</th>
// //                         <th className="fw-semibold">උසාවිය</th>
// //                         <th className="fw-semibold">පවරන ලද දිනය</th>
// //                         <th className="fw-semibold">විස්තර</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {assignedCasesHistory
// //                         .sort((a, b) => {
// //                           // Sort by assigned date, newest first
// //                           if (a.assignedDate && b.assignedDate) {
// //                             return (
// //                               new Date(b.assignedDate) -
// //                               new Date(a.assignedDate)
// //                             );
// //                           }
// //                           return 0;
// //                         })
// //                         .map((caseData) => {
// //                           const caseId = `${caseData.submissionId}-${caseData.borrowerId}`;
// //                           return (
// //                             <tr key={caseId}>
// //                               <td className="fw-bold text-success">
// //                                 {caseData.arbitrationNumber}
// //                               </td>
// //                               <td>
// //                                 <strong>{caseData.borrowerName}</strong>
// //                               </td>
// //                               <td>{caseData.societyName}</td>
// //                               <td>{caseData.loanNumber}</td>
// //                               <td>
// //                                 රු.{" "}
// //                                 {parseFloat(caseData.loanAmount).toLocaleString(
// //                                   "si-LK"
// //                                 )}
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <Calendar
// //                                     size={14}
// //                                     className="me-1 text-muted"
// //                                   />
// //                                   {caseData.decisionDate
// //                                     ? new Date(
// //                                         caseData.decisionDate
// //                                       ).toLocaleDateString("si-LK")
// //                                     : "-"}
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <User size={14} className="me-1 text-info" />
// //                                   <span className="badge bg-info text-dark">
// //                                     {caseData.legalOfficerName}
// //                                   </span>
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <Building2
// //                                     size={14}
// //                                     className="me-1 text-secondary"
// //                                   />
// //                                   <span className="badge bg-secondary">
// //                                     {caseData.courtName}
// //                                   </span>
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <Calendar
// //                                     size={14}
// //                                     className="me-1 text-success"
// //                                   />
// //                                   {caseData.assignedDate
// //                                     ? new Date(
// //                                         caseData.assignedDate
// //                                       ).toLocaleDateString("si-LK")
// //                                     : "-"}
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <button
// //                                   onClick={() => {
// //                                     setSelectedBorrower(caseData);
// //                                     setShowDetailsModal(true);
// //                                   }}
// //                                   className="btn btn-outline-success btn-sm"
// //                                   style={{ borderRadius: "8px" }}
// //                                 >
// //                                   <Eye size={14} className="me-1" />
// //                                   විස්තර
// //                                 </button>
// //                               </td>
// //                             </tr>
// //                           );
// //                         })}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>

// //               {/* Summary Statistics */}
// //               <div className="row mt-4">
// //                 <div className="col-md-6">
// //                   <div
// //                     className="card border-0 shadow-sm"
// //                     style={{ borderRadius: "15px" }}
// //                   >
// //                     <div className="card-body text-center">
// //                       <h3 className="text-success fw-bold">
// //                         {assignedCasesHistory.length}
// //                       </h3>
// //                       <p className="text-muted mb-0">මුළු පවරා ඇති නඩු ගණන</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="col-md-6">
// //                   <div
// //                     className="card border-0 shadow-sm"
// //                     style={{ borderRadius: "15px" }}
// //                   >
// //                     <div className="card-body text-center">
// //                       <h3 className="text-primary fw-bold">
// //                         {legalOfficers.length}
// //                       </h3>
// //                       <p className="text-muted mb-0">සක්‍රීය නීති නිලධාරීන්</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </>
// //           )}
// //         </>
// //       )}

// //       {/* Assign Modal */}
// //       {showAssignModal && selectedCase && (
// //         <>
// //           <div
// //             className="modal-backdrop show"
// //             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
// //             onClick={() => setShowAssignModal(false)}
// //           ></div>
// //           <div
// //             className="modal show d-block"
// //             style={{ zIndex: 1055 }}
// //             tabIndex="-1"
// //           >
// //             <div className="modal-dialog modal-dialog-centered">
// //               <div
// //                 className="modal-content border-0 shadow-lg"
// //                 style={{ borderRadius: "20px" }}
// //               >
// //                 <div
// //                   className="modal-header text-white"
// //                   style={{
// //                     background:
// //                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //                     borderRadius: "20px 20px 0 0",
// //                   }}
// //                 >
// //                   <h5 className="modal-title fw-bold d-flex align-items-center">
// //                     <Scale size={20} className="me-2" />
// //                     උසාවි නිලධාරි	යා පවරන්න
// //                   </h5>
// //                   <button
// //                     type="button"
// //                     className="btn-close btn-close-white"
// //                     onClick={() => setShowAssignModal(false)}
// //                   ></button>
// //                 </div>
// //                 <div className="modal-body p-4">
// //                   <div className="alert alert-info mb-4">
// //                     <strong>ණයගැතියාගේ නම:</strong> {selectedCase.borrowerName}
// //                     <br />
// //                     <strong>තීරක අංකය:</strong> {selectedCase.arbitrationNumber}
// //                     <br />
// //                     <strong>සමිතිය:</strong> {selectedCase.societyName}
// //                   </div>

// //                   <div className="mb-3">
// //                     <label className="form-label fw-semibold">
// //                       උසාවි නිලධාරි	යා *
// //                     </label>
// //                     <select
// //                       className="form-select form-select-lg"
// //                       value={assignmentData.legalOfficerId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           legalOfficerId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවි නිලධාරි	යෙකු තෝරන්න</option>
// //                       {legalOfficers.map((officer) => (
// //                         <option key={officer.id} value={officer.id}>
// //                           {officer.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div className="mb-3">
// //                     <label className="form-label fw-semibold">උසාවිය *</label>
// //                     <select
// //                       className="form-select form-select-lg"
// //                       value={assignmentData.courtId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           courtId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවියක් තෝරන්න</option>
// //                       {courts.map((court) => (
// //                         <option key={court.id} value={court.id}>
// //                           {court.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <div className="modal-footer border-0 p-4">
// //                   <button
// //                     type="button"
// //                     className="btn btn-secondary btn-lg px-4"
// //                     onClick={() => setShowAssignModal(false)}
// //                     style={{ borderRadius: "10px" }}
// //                   >
// //                     අවලංගු කරන්න
// //                   </button>
// //                   <button
// //                     type="button"
// //                     className="btn btn-primary btn-lg px-4"
// //                     onClick={handleAssignLegalOfficer}
// //                     style={{
// //                       borderRadius: "10px",
// //                       background:
// //                         "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //                       border: "none",
// //                     }}
// //                   >
// //                     <CheckCircle size={16} className="me-2" />
// //                     පවරන්න
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       )}

// //       <BorrowerDetailsModal
// //         show={showDetailsModal}
// //         onClose={() => setShowDetailsModal(false)}
// //         borrower={selectedBorrower}
// //       />
// //     </div>
// //   );
// // };

// // export default PaymentPendingCasesPage;

// // PaymentPendingCasesPage.jsx
// // Place this file in: src/pages/PaymentPendingCasesPage.jsx

// // import React, { useState, useEffect } from "react";
// // import {
// //   AlertCircle,
// //   Eye,
// //   UserCheck,
// //   Scale,
// //   CheckCircle,
// //   History,
// //   Calendar,
// //   Building2,
// //   User,
// // } from "lucide-react";
// // import { useAuth } from "../context/AuthContext";
// // import api from "../services/api";
// // import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

// // const PaymentPendingCasesPage = () => {
// //   const { user } = useAuth();
// //   const [paymentPendingCases, setPaymentPendingCases] = useState([]);
// //   const [assignedCasesHistory, setAssignedCasesHistory] = useState([]);
// //   const [legalOfficers, setLegalOfficers] = useState([]);
// //   const [courts, setCourts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedBorrower, setSelectedBorrower] = useState(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [showAssignModal, setShowAssignModal] = useState(false);
// //   const [selectedCase, setSelectedCase] = useState(null);
// //   const [assignmentData, setAssignmentData] = useState({
// //     legalOfficerId: "",
// //     courtId: "",
// //   });
// //   const [selectedCases, setSelectedCases] = useState({});
// //   const [activeTab, setActiveTab] = useState("pending");

// //   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       const districtId = user.district;

// //       // Get all payment pending cases (both assigned and unassigned)
// //       const casesData = await api.getPaymentPendingCases(districtId);
// //       console.log("All cases data:", casesData);

// //       // Get legal officers and courts to map names
// //       const officersData = await api.getLegalOfficersByDistrict(districtId);
// //       const courtsData = await api.getCourtsByDistrict(districtId);

// //       setLegalOfficers(officersData);
// //       setCourts(courtsData);

// //       // Create lookup maps for officer and court names
// //       const officerMap = {};
// //       officersData.forEach((officer) => {
// //         officerMap[officer.id] = officer.name;
// //       });

// //       const courtMap = {};
// //       courtsData.forEach((court) => {
// //         courtMap[court.id] = court.name;
// //       });

// //       // Separate pending and assigned cases, and enrich assigned cases with names
// //       const pending = casesData.filter((c) => !c.sentToLegalOfficer);
// //       const assigned = casesData
// //         .filter((c) => c.sentToLegalOfficer)
// //         .map((c) => ({
// //           ...c,
// //           legalOfficerName: officerMap[c.legalOfficerId] || "N/A",
// //           courtName: courtMap[c.courtId] || "N/A",
// //         }));

// //       console.log("Pending cases:", pending);
// //       console.log("Assigned cases with details:", assigned);

// //       setPaymentPendingCases(pending);
// //       setAssignedCasesHistory(assigned);
// //     } catch (err) {
// //       console.error("Error loading data:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleOpenAssignModal = (caseData) => {
// //     setSelectedCase(caseData);
// //     setAssignmentData({
// //       legalOfficerId: "",
// //       courtId: "",
// //     });
// //     setShowAssignModal(true);
// //   };

// //   const handleAssignLegalOfficer = async () => {
// //     if (!assignmentData.legalOfficerId || !assignmentData.courtId) {
// //       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න");
// //       return;
// //     }

// //     try {
// //       await api.assignLegalOfficerToBorrower(
// //         selectedCase.submissionId,
// //         selectedCase.borrowerId,
// //         assignmentData.legalOfficerId,
// //         assignmentData.courtId
// //       );
// //       alert("උසාවි නිලධාරි	යා සාර්ථකව පවරන ලදී!");
// //       setShowAssignModal(false);
// //       setSelectedCases({});
// //       loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   const handleSelectCase = (caseId) => {
// //     setSelectedCases((prev) => ({
// //       ...prev,
// //       [caseId]: !prev[caseId],
// //     }));
// //   };

// //   const handleBatchAssign = async () => {
// //     const selectedIds = Object.keys(selectedCases).filter(
// //       (id) => selectedCases[id]
// //     );

// //     if (selectedIds.length === 0) {
// //       alert("කරුණාකර අවම වශයෙන් එක් නඩුවක් තෝරන්න");
// //       return;
// //     }

// //     if (!assignmentData.legalOfficerId || !assignmentData.courtId) {
// //       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න");
// //       return;
// //     }

// //     const assignments = selectedIds.map((id) => {
// //       const caseData = paymentPendingCases.find(
// //         (c) => `${c.submissionId}-${c.borrowerId}` === id
// //       );
// //       return {
// //         submissionId: caseData.submissionId,
// //         borrowerId: caseData.borrowerId,
// //         legalOfficerId: assignmentData.legalOfficerId,
// //         courtId: assignmentData.courtId,
// //       };
// //     });

// //     try {
// //       const result = await api.batchAssignLegalOfficer(assignments);
// //       alert(
// //         `සාර්ථකව පවරන ලදී: ${result.successCount}\nඅසමත්: ${result.failCount}`
// //       );
// //       setSelectedCases({});
// //       setAssignmentData({ legalOfficerId: "", courtId: "" });
// //       loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   const generateAssignmentLetter = (caseData) => {
// //     const letterHTML = `
// // <!DOCTYPE html>
// // <html>
// // <head>
// //     <meta charset='utf-8'>
// //     <title>නීති නිලධාරී පැවරුම් ලිපිය</title>
// //     <style>
// //         @page { size: A4; margin: 2cm; }
// //         body {
// //             font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif;
// //             font-size: 11pt;
// //             line-height: 1.8;
// //             color: #333;
// //         }
// //         .header {
// //             text-align: center;
// //             font-weight: bold;
// //             font-size: 16pt;
// //             margin-bottom: 30px;
// //             border-bottom: 3px solid #667eea;
// //             padding-bottom: 15px;
// //         }
// //         .section {
// //             margin: 25px 0;
// //             padding: 15px;
// //             background: #f8f9fa;
// //             border-left: 4px solid #667eea;
// //             border-radius: 5px;
// //         }
// //         .section-title {
// //             font-weight: bold;
// //             font-size: 13pt;
// //             color: #667eea;
// //             margin-bottom: 15px;
// //             text-decoration: underline;
// //         }
// //         .field {
// //             margin: 12px 0;
// //             padding: 8px;
// //             background: white;
// //             border-radius: 3px;
// //         }
// //         .label {
// //             font-weight: bold;
// //             display: inline-block;
// //             min-width: 180px;
// //             color: #555;
// //         }
// //         .value {
// //             color: #000;
// //             font-weight: 500;
// //         }
// //         .footer {
// //             margin-top: 50px;
// //             padding-top: 20px;
// //             border-top: 2px solid #ddd;
// //             font-size: 10pt;
// //             text-align: center;
// //             color: #666;
// //         }
// //         .date-stamp {
// //             text-align: right;
// //             margin-top: 40px;
// //             font-style: italic;
// //             color: #666;
// //         }
// //     </style>
// // </head>
// // <body>
// //     <div class="header">
// //         නීති නිලධාරී පැවරුම් ලිපිය<br/>
// //         <small style="font-size: 12pt; font-weight: normal;">Legal Officer Assignment Letter</small>
// //     </div>

// //     <div class="section">
// //         <div class="section-title">ණයගැතියාගේ විස්තර (Borrower Details)</div>
// //         <div class="field">
// //             <span class="label">නම (Name):</span>
// //             <span class="value">${caseData.borrowerName}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">ලිපිනය (Address):</span>
// //             <span class="value">${caseData.borrowerAddress || "-"}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">ජාතික හැඳුනුම්පත් අංකය (NIC):</span>
// //             <span class="value">${caseData.borrowerNic || "-"}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">දුරකථන අංකය (Phone):</span>
// //             <span class="value">${caseData.borrowerPhone || "-"}</span>
// //         </div>
// //     </div>

// //     <div class="section">
// //         <div class="section-title">ණය විස්තර (Loan Details)</div>
// //         <div class="field">
// //             <span class="label">සමිතිය (Society):</span>
// //             <span class="value">${caseData.societyName}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">ණය අංකය (Loan Number):</span>
// //             <span class="value">${caseData.loanNumber}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">ණය මුදල (Loan Amount):</span>
// //             <span class="value">රු. ${parseFloat(
// //               caseData.loanAmount
// //             ).toLocaleString("si-LK")}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">අවසාන ණය මුදල (Final Amount):</span>
// //             <span class="value">රු. ${parseFloat(
// //               caseData.finalLoanAmount || caseData.loanAmount
// //             ).toLocaleString("si-LK")}</span>
// //         </div>
// //     </div>

// //     <div class="section">
// //         <div class="section-title">බේරුම්කරු තීරණ විස්තර (Arbitration Details)</div>
// //         <div class="field">
// //             <span class="label">තීරක අංකය (Arbitration No):</span>
// //             <span class="value">${caseData.arbitrationNumber}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">තීරණ දිනය (Decision Date):</span>
// //             <span class="value">${
// //               caseData.decisionDate
// //                 ? new Date(caseData.decisionDate).toLocaleDateString("si-LK")
// //                 : "-"
// //             }</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">අඩු කළ පොළිය (Interest Deducted):</span>
// //             <span class="value">රු. ${parseFloat(
// //               caseData.interestDeducted || 0
// //             ).toLocaleString("si-LK")}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">තීරණය (Decision):</span>
// //             <div class="value" style="margin-top: 8px; padding: 10px; background: #fff; border: 1px solid #ddd; border-radius: 3px;">
// //                 ${caseData.arbitrationDecision || "-"}
// //             </div>
// //         </div>
// //     </div>

// //     <div class="section">
// //         <div class="section-title">නීති නිලධාරී පැවරුම් විස්තර (Legal Assignment Details)</div>
// //         <div class="field">
// //             <span class="label">උසාවි නිලධාරි	යා (Legal Officer):</span>
// //             <span class="value">${caseData.legalOfficerName}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">උසාවිය (Court):</span>
// //             <span class="value">${caseData.courtName}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">පවරන ලද දිනය (Assigned Date):</span>
// //             <span class="value">${
// //               caseData.assignedDate
// //                 ? new Date(caseData.assignedDate).toLocaleDateString("si-LK")
// //                 : new Date().toLocaleDateString("si-LK")
// //             }</span>
// //         </div>
// //     </div>

// //     <div class="date-stamp">
// //         ලියවිල්ල සකසන ලද දිනය: ${new Date().toLocaleDateString("si-LK")}<br/>
// //         Document Generated: ${new Date().toLocaleString("en-US")}
// //     </div>

// //     <div class="footer">
// //         මෙය පද්ධතිය විසින් ස්වයංක්‍රීයව සකසන ලද ලිපියකි<br/>
// //         This is an automatically generated document by the system<br/>
// //         <strong>මධ්‍යම පළාත් සමුපකාර දෙපාර්තමේන්තුව - Arbitration Management System</strong>
// //     </div>
// // </body>
// // </html>`;

// //     const blob = new Blob(["\ufeff", letterHTML], {
// //       type: "application/msword;charset=utf-8",
// //     });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement("a");
// //     link.href = url;
// //     link.download = `නීති_පැවරුම්_ලිපිය_${
// //       caseData.arbitrationNumber || "document"
// //     }.doc`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //     URL.revokeObjectURL(url);
// //     alert("නීති නිලධාරී පැවරුම් ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ");
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center py-5">
// //         <div className="spinner-border text-primary" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <h2 className="fw-bold mb-3">ගෙවීම් නොකළ නඩු - නීති නිලධාරී පැවරීම</h2>

// //       {/* Tabs */}
// //       <ul
// //         className="nav nav-tabs mb-4"
// //         style={{ borderRadius: "10px 10px 0 0" }}
// //       >
// //         <li className="nav-item">
// //           <button
// //             className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
// //             onClick={() => setActiveTab("pending")}
// //             style={{
// //               borderRadius: "10px 10px 0 0",
// //               fontWeight: activeTab === "pending" ? "bold" : "normal",
// //             }}
// //           >
// //             <AlertCircle size={16} className="me-2" />
// //             පවරා නොමැති නඩු ({paymentPendingCases.length})
// //           </button>
// //         </li>
// //         <li className="nav-item">
// //           <button
// //             className={`nav-link ${activeTab === "history" ? "active" : ""}`}
// //             onClick={() => setActiveTab("history")}
// //             style={{
// //               borderRadius: "10px 10px 0 0",
// //               fontWeight: activeTab === "history" ? "bold" : "normal",
// //             }}
// //           >
// //             <History size={16} className="me-2" />
// //             පවරා ඇති නඩු ඉතිහාසය ({assignedCasesHistory.length})
// //           </button>
// //         </li>
// //       </ul>

// //       {/* Pending Cases Tab */}
// //       {activeTab === "pending" && (
// //         <>
// //           <div
// //             className="alert alert-warning d-flex align-items-center mb-4"
// //             style={{ borderRadius: "10px" }}
// //           >
// //             <AlertCircle size={18} className="me-2" />
// //             බේරුම්කරු තීරණයෙන් පසු ගෙවීම නොකළ නඩු නීති නිලධාරීන්ට පවරන්න
// //           </div>

// //           {/* Batch Assignment Section */}
// //           {paymentPendingCases.length > 0 && (
// //             <div
// //               className="card border-0 shadow-sm mb-4"
// //               style={{ borderRadius: "15px" }}
// //             >
// //               <div className="card-body p-4">
// //                 <h5 className="fw-bold mb-3">තොග පැවරීම</h5>
// //                 <div className="row">
// //                   <div className="col-md-4">
// //                     <label className="form-label fw-semibold">
// //                       උසාවි නිලධාරි	යා
// //                     </label>
// //                     <select
// //                       className="form-select"
// //                       value={assignmentData.legalOfficerId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           legalOfficerId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවි නිලධාරි	යෙකු තෝරන්න</option>
// //                       {legalOfficers.map((officer) => (
// //                         <option key={officer.id} value={officer.id}>
// //                           {officer.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                   <div className="col-md-4">
// //                     <label className="form-label fw-semibold">උසාවිය</label>
// //                     <select
// //                       className="form-select"
// //                       value={assignmentData.courtId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           courtId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවියක් තෝරන්න</option>
// //                       {courts.map((court) => (
// //                         <option key={court.id} value={court.id}>
// //                           {court.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                   <div className="col-md-4 d-flex align-items-end">
// //                     <button
// //                       onClick={handleBatchAssign}
// //                       className="btn btn-primary w-100"
// //                       style={{ borderRadius: "10px" }}
// //                       disabled={
// //                         Object.values(selectedCases).filter(Boolean).length ===
// //                         0
// //                       }
// //                     >
// //                       <CheckCircle size={16} className="me-2" />
// //                       තෝරාගත් නඩු පවරන්න (
// //                       {Object.values(selectedCases).filter(Boolean).length})
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Pending Cases Table */}
// //           {paymentPendingCases.length === 0 ? (
// //             <div
// //               className="alert alert-info d-flex align-items-center"
// //               style={{ borderRadius: "10px" }}
// //             >
// //               <AlertCircle size={18} className="me-2" />
// //               ගෙවීම් නොකළ නඩු නොමැත
// //             </div>
// //           ) : (
// //             <div
// //               className="card border-0 shadow-sm"
// //               style={{ borderRadius: "15px" }}
// //             >
// //               <div className="table-responsive">
// //                 <table className="table table-hover mb-0">
// //                   <thead
// //                     style={{
// //                       background:
// //                         "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
// //                     }}
// //                     className="text-white"
// //                   >
// //                     <tr>
// //                       <th className="fw-semibold">
// //                         <input
// //                           type="checkbox"
// //                           onChange={(e) => {
// //                             const newSelected = {};
// //                             if (e.target.checked) {
// //                               paymentPendingCases.forEach((c) => {
// //                                 newSelected[
// //                                   `${c.submissionId}-${c.borrowerId}`
// //                                 ] = true;
// //                               });
// //                             }
// //                             setSelectedCases(newSelected);
// //                           }}
// //                           className="form-check-input"
// //                         />
// //                       </th>
// //                       <th className="fw-semibold">තීරක අංකය</th>
// //                       <th className="fw-semibold">ණයගැතියාගේ නම</th>
// //                       <th className="fw-semibold">සමිතිය</th>
// //                       <th className="fw-semibold">ණය අංකය</th>
// //                       <th className="fw-semibold">ණය මුදල</th>
// //                       <th className="fw-semibold">තීරණ දිනය</th>
// //                       <th className="fw-semibold">ක්‍රියා</th>
// //                       <th className="fw-semibold">විස්තර</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {paymentPendingCases.map((caseData) => {
// //                       const caseId = `${caseData.submissionId}-${caseData.borrowerId}`;
// //                       return (
// //                         <tr key={caseId}>
// //                           <td>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectedCases[caseId] || false}
// //                               onChange={() => handleSelectCase(caseId)}
// //                               className="form-check-input"
// //                             />
// //                           </td>
// //                           <td className="fw-bold text-primary">
// //                             {caseData.arbitrationNumber}
// //                           </td>
// //                           <td>
// //                             <strong>{caseData.borrowerName}</strong>
// //                           </td>
// //                           <td>{caseData.societyName}</td>
// //                           <td>{caseData.loanNumber}</td>
// //                           <td>
// //                             රු.{" "}
// //                             {parseFloat(caseData.loanAmount).toLocaleString(
// //                               "si-LK"
// //                             )}
// //                           </td>
// //                           <td>
// //                             {caseData.decisionDate
// //                               ? new Date(
// //                                   caseData.decisionDate
// //                                 ).toLocaleDateString("si-LK")
// //                               : "-"}
// //                           </td>
// //                           <td>
// //                             <button
// //                               onClick={() => handleOpenAssignModal(caseData)}
// //                               className="btn btn-primary btn-sm"
// //                               style={{ borderRadius: "8px" }}
// //                             >
// //                               <UserCheck size={14} className="me-1" />
// //                               පවරන්න
// //                             </button>
// //                           </td>
// //                           <td>
// //                             <button
// //                               onClick={() => {
// //                                 setSelectedBorrower(caseData);
// //                                 setShowDetailsModal(true);
// //                               }}
// //                               className="btn btn-outline-info btn-sm"
// //                               style={{ borderRadius: "8px" }}
// //                             >
// //                               <Eye size={14} className="me-1" />
// //                               විස්තර
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* History Tab */}
// //       {activeTab === "history" && (
// //         <>
// //           <div
// //             className="alert alert-info d-flex align-items-center mb-4"
// //             style={{ borderRadius: "10px" }}
// //           >
// //             <History size={18} className="me-2" />
// //             නීති නිලධාරීන්ට පවරා ඇති සියලුම නඩු ඉතිහාසය
// //           </div>

// //           {assignedCasesHistory.length === 0 ? (
// //             <div
// //               className="alert alert-warning d-flex align-items-center"
// //               style={{ borderRadius: "10px" }}
// //             >
// //               <AlertCircle size={18} className="me-2" />
// //               තවම නීති නිලධාරීන්ට පවරා නොමැත
// //             </div>
// //           ) : (
// //             <>
// //               <div
// //                 className="card border-0 shadow-sm"
// //                 style={{ borderRadius: "15px" }}
// //               >
// //                 <div className="table-responsive">
// //                   <table className="table table-hover mb-0">
// //                     <thead
// //                       style={{
// //                         background:
// //                           "linear-gradient(135deg, #059669 0%, #047857 100%)",
// //                       }}
// //                       className="text-white"
// //                     >
// //                       <tr>
// //                         <th className="fw-semibold">තීරක අංකය</th>
// //                         <th className="fw-semibold">ණයගැතියාගේ නම</th>
// //                         <th className="fw-semibold">සමිතිය</th>
// //                         <th className="fw-semibold">ණය අංකය</th>
// //                         <th className="fw-semibold">ණය මුදල</th>
// //                         <th className="fw-semibold">තීරණ දිනය</th>
// //                         <th className="fw-semibold">උසාවි නිලධාරි	යා</th>
// //                         <th className="fw-semibold">උසාවිය</th>
// //                         <th className="fw-semibold">පවරන ලද දිනය</th>
// //                         <th className="fw-semibold">ලිපිය</th>
// //                         <th className="fw-semibold">විස්තර</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {assignedCasesHistory
// //                         .sort((a, b) => {
// //                           // Sort by assigned date, newest first
// //                           if (a.assignedDate && b.assignedDate) {
// //                             return (
// //                               new Date(b.assignedDate) -
// //                               new Date(a.assignedDate)
// //                             );
// //                           }
// //                           return 0;
// //                         })
// //                         .map((caseData) => {
// //                           const caseId = `${caseData.submissionId}-${caseData.borrowerId}`;
// //                           return (
// //                             <tr key={caseId}>
// //                               <td className="fw-bold text-success">
// //                                 {caseData.arbitrationNumber}
// //                               </td>
// //                               <td>
// //                                 <strong>{caseData.borrowerName}</strong>
// //                               </td>
// //                               <td>{caseData.societyName}</td>
// //                               <td>{caseData.loanNumber}</td>
// //                               <td>
// //                                 රු.{" "}
// //                                 {parseFloat(caseData.loanAmount).toLocaleString(
// //                                   "si-LK"
// //                                 )}
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <Calendar
// //                                     size={14}
// //                                     className="me-1 text-muted"
// //                                   />
// //                                   {caseData.decisionDate
// //                                     ? new Date(
// //                                         caseData.decisionDate
// //                                       ).toLocaleDateString("si-LK")
// //                                     : "-"}
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <User size={14} className="me-1 text-info" />
// //                                   <span className="badge bg-info text-dark">
// //                                     {caseData.legalOfficerName}
// //                                   </span>
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <Building2
// //                                     size={14}
// //                                     className="me-1 text-secondary"
// //                                   />
// //                                   <span className="badge bg-secondary">
// //                                     {caseData.courtName}
// //                                   </span>
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <Calendar
// //                                     size={14}
// //                                     className="me-1 text-success"
// //                                   />
// //                                   {caseData.assignedDate
// //                                     ? new Date(
// //                                         caseData.assignedDate
// //                                       ).toLocaleDateString("si-LK")
// //                                     : "-"}
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <button
// //                                   onClick={() => {
// //                                     setSelectedBorrower(caseData);
// //                                     setShowDetailsModal(true);
// //                                   }}
// //                                   className="btn btn-outline-success btn-sm"
// //                                   style={{ borderRadius: "8px" }}
// //                                 >
// //                                   <Eye size={14} className="me-1" />
// //                                   විස්තර
// //                                 </button>
// //                               </td>
// //                             </tr>
// //                           );
// //                         })}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>

// //               {/* Summary Statistics */}
// //               <div className="row mt-4">
// //                 <div className="col-md-6">
// //                   <div
// //                     className="card border-0 shadow-sm"
// //                     style={{ borderRadius: "15px" }}
// //                   >
// //                     <div className="card-body text-center">
// //                       <h3 className="text-success fw-bold">
// //                         {assignedCasesHistory.length}
// //                       </h3>
// //                       <p className="text-muted mb-0">මුළු පවරා ඇති නඩු ගණන</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="col-md-6">
// //                   <div
// //                     className="card border-0 shadow-sm"
// //                     style={{ borderRadius: "15px" }}
// //                   >
// //                     <div className="card-body text-center">
// //                       <h3 className="text-primary fw-bold">
// //                         {legalOfficers.length}
// //                       </h3>
// //                       <p className="text-muted mb-0">සක්‍රීය නීති නිලධාරීන්</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </>
// //           )}
// //         </>
// //       )}

// //       {/* Assign Modal */}
// //       {showAssignModal && selectedCase && (
// //         <>
// //           <div
// //             className="modal-backdrop show"
// //             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
// //             onClick={() => setShowAssignModal(false)}
// //           ></div>
// //           <div
// //             className="modal show d-block"
// //             style={{ zIndex: 1055 }}
// //             tabIndex="-1"
// //           >
// //             <div className="modal-dialog modal-dialog-centered">
// //               <div
// //                 className="modal-content border-0 shadow-lg"
// //                 style={{ borderRadius: "20px" }}
// //               >
// //                 <div
// //                   className="modal-header text-white"
// //                   style={{
// //                     background:
// //                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //                     borderRadius: "20px 20px 0 0",
// //                   }}
// //                 >
// //                   <h5 className="modal-title fw-bold d-flex align-items-center">
// //                     <Scale size={20} className="me-2" />
// //                     උසාවි නිලධාරි	යා පවරන්න
// //                   </h5>
// //                   <button
// //                     type="button"
// //                     className="btn-close btn-close-white"
// //                     onClick={() => setShowAssignModal(false)}
// //                   ></button>
// //                 </div>
// //                 <div className="modal-body p-4">
// //                   <div className="alert alert-info mb-4">
// //                     <strong>ණයගැතියාගේ නම:</strong> {selectedCase.borrowerName}
// //                     <br />
// //                     <strong>තීරක අංකය:</strong> {selectedCase.arbitrationNumber}
// //                     <br />
// //                     <strong>සමිතිය:</strong> {selectedCase.societyName}
// //                   </div>

// //                   <div className="mb-3">
// //                     <label className="form-label fw-semibold">
// //                       උසාවි නිලධාරි	යා *
// //                     </label>
// //                     <select
// //                       className="form-select form-select-lg"
// //                       value={assignmentData.legalOfficerId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           legalOfficerId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවි නිලධාරි	යෙකු තෝරන්න</option>
// //                       {legalOfficers.map((officer) => (
// //                         <option key={officer.id} value={officer.id}>
// //                           {officer.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div className="mb-3">
// //                     <label className="form-label fw-semibold">උසාවිය *</label>
// //                     <select
// //                       className="form-select form-select-lg"
// //                       value={assignmentData.courtId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           courtId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවියක් තෝරන්න</option>
// //                       {courts.map((court) => (
// //                         <option key={court.id} value={court.id}>
// //                           {court.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <div className="modal-footer border-0 p-4">
// //                   <button
// //                     type="button"
// //                     className="btn btn-secondary btn-lg px-4"
// //                     onClick={() => setShowAssignModal(false)}
// //                     style={{ borderRadius: "10px" }}
// //                   >
// //                     අවලංගු කරන්න
// //                   </button>
// //                   <button
// //                     type="button"
// //                     className="btn btn-primary btn-lg px-4"
// //                     onClick={handleAssignLegalOfficer}
// //                     style={{
// //                       borderRadius: "10px",
// //                       background:
// //                         "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //                       border: "none",
// //                     }}
// //                   >
// //                     <CheckCircle size={16} className="me-2" />
// //                     පවරන්න
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       )}

// //       <BorrowerDetailsModal
// //         show={showDetailsModal}
// //         onClose={() => setShowDetailsModal(false)}
// //         borrower={selectedBorrower}
// //       />
// //     </div>
// //   );
// // };

// // export default PaymentPendingCasesPage;

// // PaymentPendingCasesPage.jsx
// // Place this file in: src/pages/PaymentPendingCasesPage.jsx

// // import React, { useState, useEffect } from "react";
// // import {
// //   AlertCircle,
// //   Eye,
// //   UserCheck,
// //   Scale,
// //   CheckCircle,
// //   History,
// //   Calendar,
// //   Building2,
// //   User,
// // } from "lucide-react";
// // import { useAuth } from "../context/AuthContext";
// // import api from "../services/api";
// // import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

// // const PaymentPendingCasesPage = () => {
// //   const { user } = useAuth();
// //   const [paymentPendingCases, setPaymentPendingCases] = useState([]);
// //   const [assignedCasesHistory, setAssignedCasesHistory] = useState([]);
// //   const [legalOfficers, setLegalOfficers] = useState([]);
// //   const [courts, setCourts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedBorrower, setSelectedBorrower] = useState(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [showAssignModal, setShowAssignModal] = useState(false);
// //   const [selectedCase, setSelectedCase] = useState(null);
// //   const [assignmentData, setAssignmentData] = useState({
// //     legalOfficerId: "",
// //     courtId: "",
// //   });
// //   const [selectedCases, setSelectedCases] = useState({});
// //   const [activeTab, setActiveTab] = useState("pending");

// //   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       const districtId = user.district;

// //       // Get all payment pending cases (both assigned and unassigned)
// //       const casesData = await api.getPaymentPendingCases(districtId);
// //       console.log("All cases data:", casesData);

// //       // Get legal officers and courts to map names
// //       const officersData = await api.getLegalOfficersByDistrict(districtId);
// //       const courtsData = await api.getCourtsByDistrict(districtId);

// //       setLegalOfficers(officersData);
// //       setCourts(courtsData);

// //       // Create lookup maps for officer and court names
// //       const officerMap = {};
// //       officersData.forEach((officer) => {
// //         officerMap[officer.id] = officer.name;
// //       });

// //       const courtMap = {};
// //       courtsData.forEach((court) => {
// //         courtMap[court.id] = court.name;
// //       });

// //       // Separate pending and assigned cases, and enrich assigned cases with names
// //       const pending = casesData.filter((c) => !c.sentToLegalOfficer);
// //       const assigned = casesData
// //         .filter((c) => c.sentToLegalOfficer)
// //         .map((c) => ({
// //           ...c,
// //           legalOfficerName: officerMap[c.legalOfficerId] || "N/A",
// //           courtName: courtMap[c.courtId] || "N/A",
// //         }));

// //       console.log("Pending cases:", pending);
// //       console.log("Assigned cases with details:", assigned);

// //       setPaymentPendingCases(pending);
// //       setAssignedCasesHistory(assigned);
// //     } catch (err) {
// //       console.error("Error loading data:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleOpenAssignModal = (caseData) => {
// //     setSelectedCase(caseData);
// //     setAssignmentData({
// //       legalOfficerId: "",
// //       courtId: "",
// //     });
// //     setShowAssignModal(true);
// //   };

// //   const handleAssignLegalOfficer = async () => {
// //     if (!assignmentData.legalOfficerId || !assignmentData.courtId) {
// //       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න");
// //       return;
// //     }

// //     try {
// //       await api.assignLegalOfficerToBorrower(
// //         selectedCase.submissionId,
// //         selectedCase.borrowerId,
// //         assignmentData.legalOfficerId,
// //         assignmentData.courtId
// //       );
// //       alert("උසාවි නිලධාරි	යා සාර්ථකව පවරන ලදී!");
// //       setShowAssignModal(false);
// //       setSelectedCases({});
// //       loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   const handleSelectCase = (caseId) => {
// //     setSelectedCases((prev) => ({
// //       ...prev,
// //       [caseId]: !prev[caseId],
// //     }));
// //   };

// //   const handleBatchAssign = async () => {
// //     const selectedIds = Object.keys(selectedCases).filter(
// //       (id) => selectedCases[id]
// //     );

// //     if (selectedIds.length === 0) {
// //       alert("කරුණාකර අවම වශයෙන් එක් නඩුවක් තෝරන්න");
// //       return;
// //     }

// //     if (!assignmentData.legalOfficerId || !assignmentData.courtId) {
// //       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න");
// //       return;
// //     }

// //     const assignments = selectedIds.map((id) => {
// //       const caseData = paymentPendingCases.find(
// //         (c) => `${c.submissionId}-${c.borrowerId}` === id
// //       );
// //       return {
// //         submissionId: caseData.submissionId,
// //         borrowerId: caseData.borrowerId,
// //         legalOfficerId: assignmentData.legalOfficerId,
// //         courtId: assignmentData.courtId,
// //       };
// //     });

// //     try {
// //       const result = await api.batchAssignLegalOfficer(assignments);
// //       alert(
// //         `සාර්ථකව පවරන ලදී: ${result.successCount}\nඅසමත්: ${result.failCount}`
// //       );
// //       setSelectedCases({});
// //       setAssignmentData({ legalOfficerId: "", courtId: "" });
// //       loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   const generateAssignmentLetter = (caseData) => {
// //     const letterHTML = `
// // <!DOCTYPE html>
// // <html>
// // <head>
// //     <meta charset='utf-8'>
// //     <title>නීති නිලධාරී පැවරුම් ලිපිය</title>
// //     <style>
// //         @page { size: A4; margin: 2cm; }
// //         body {
// //             font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif;
// //             font-size: 11pt;
// //             line-height: 1.8;
// //             color: #333;
// //         }
// //         .header {
// //             text-align: center;
// //             font-weight: bold;
// //             font-size: 16pt;
// //             margin-bottom: 30px;
// //             border-bottom: 3px solid #667eea;
// //             padding-bottom: 15px;
// //         }
// //         .section {
// //             margin: 25px 0;
// //             padding: 15px;
// //             background: #f8f9fa;
// //             border-left: 4px solid #667eea;
// //             border-radius: 5px;
// //         }
// //         .section-title {
// //             font-weight: bold;
// //             font-size: 13pt;
// //             color: #667eea;
// //             margin-bottom: 15px;
// //             text-decoration: underline;
// //         }
// //         .field {
// //             margin: 12px 0;
// //             padding: 8px;
// //             background: white;
// //             border-radius: 3px;
// //         }
// //         .label {
// //             font-weight: bold;
// //             display: inline-block;
// //             min-width: 180px;
// //             color: #555;
// //         }
// //         .value {
// //             color: #000;
// //             font-weight: 500;
// //         }
// //         .footer {
// //             margin-top: 50px;
// //             padding-top: 20px;
// //             border-top: 2px solid #ddd;
// //             font-size: 10pt;
// //             text-align: center;
// //             color: #666;
// //         }
// //         .date-stamp {
// //             text-align: right;
// //             margin-top: 40px;
// //             font-style: italic;
// //             color: #666;
// //         }
// //     </style>
// // </head>
// // <body>
// //     <div class="header">
// //         නීති නිලධාරී පැවරුම් ලිපිය<br/>
// //         <small style="font-size: 12pt; font-weight: normal;">Legal Officer Assignment Letter</small>
// //     </div>

// //     <div class="section">
// //         <div class="section-title">ණයගැතියාගේ විස්තර (Borrower Details)</div>
// //         <div class="field">
// //             <span class="label">නම (Name):</span>
// //             <span class="value">${caseData.borrowerName}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">ලිපිනය (Address):</span>
// //             <span class="value">${caseData.borrowerAddress || "-"}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">ජාතික හැඳුනුම්පත් අංකය (NIC):</span>
// //             <span class="value">${caseData.borrowerNic || "-"}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">දුරකථන අංකය (Phone):</span>
// //             <span class="value">${caseData.borrowerPhone || "-"}</span>
// //         </div>
// //     </div>

// //     <div class="section">
// //         <div class="section-title">ණය විස්තර (Loan Details)</div>
// //         <div class="field">
// //             <span class="label">සමිතිය (Society):</span>
// //             <span class="value">${caseData.societyName}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">ණය අංකය (Loan Number):</span>
// //             <span class="value">${caseData.loanNumber}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">ණය මුදල (Loan Amount):</span>
// //             <span class="value">රු. ${parseFloat(
// //               caseData.loanAmount
// //             ).toLocaleString("si-LK")}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">අවසාන ණය මුදල (Final Amount):</span>
// //             <span class="value">රු. ${parseFloat(
// //               caseData.finalLoanAmount || caseData.loanAmount
// //             ).toLocaleString("si-LK")}</span>
// //         </div>
// //     </div>

// //     <div class="section">
// //         <div class="section-title">බේරුම්කරු තීරණ විස්තර (Arbitration Details)</div>
// //         <div class="field">
// //             <span class="label">තීරක අංකය (Arbitration No):</span>
// //             <span class="value">${caseData.arbitrationNumber}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">තීරණ දිනය (Decision Date):</span>
// //             <span class="value">${
// //               caseData.decisionDate
// //                 ? new Date(caseData.decisionDate).toLocaleDateString("si-LK")
// //                 : "-"
// //             }</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">අඩු කළ පොළිය (Interest Deducted):</span>
// //             <span class="value">රු. ${parseFloat(
// //               caseData.interestDeducted || 0
// //             ).toLocaleString("si-LK")}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">තීරණය (Decision):</span>
// //             <div class="value" style="margin-top: 8px; padding: 10px; background: #fff; border: 1px solid #ddd; border-radius: 3px;">
// //                 ${caseData.arbitrationDecision || "-"}
// //             </div>
// //         </div>
// //     </div>

// //     <div class="section">
// //         <div class="section-title">නීති නිලධාරී පැවරුම් විස්තර (Legal Assignment Details)</div>
// //         <div class="field">
// //             <span class="label">උසාවි නිලධාරි	යා (Legal Officer):</span>
// //             <span class="value">${caseData.legalOfficerName}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">උසාවිය (Court):</span>
// //             <span class="value">${caseData.courtName}</span>
// //         </div>
// //         <div class="field">
// //             <span class="label">පවරන ලද දිනය (Assigned Date):</span>
// //             <span class="value">${
// //               caseData.assignedDate
// //                 ? new Date(caseData.assignedDate).toLocaleDateString("si-LK")
// //                 : new Date().toLocaleDateString("si-LK")
// //             }</span>
// //         </div>
// //     </div>

// //     <div class="date-stamp">
// //         ලියවිල්ල සකසන ලද දිනය: ${new Date().toLocaleDateString("si-LK")}<br/>
// //         Document Generated: ${new Date().toLocaleString("en-US")}
// //     </div>

// //     <div class="footer">
// //         මෙය පද්ධතිය විසින් ස්වයංක්‍රීයව සකසන ලද ලිපියකි<br/>
// //         This is an automatically generated document by the system<br/>
// //         <strong>මධ්‍යම පළාත් සමුපකාර දෙපාර්තමේන්තුව - Arbitration Management System</strong>
// //     </div>
// // </body>
// // </html>`;

// //     const blob = new Blob(["\ufeff", letterHTML], {
// //       type: "application/msword;charset=utf-8",
// //     });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement("a");
// //     link.href = url;
// //     link.download = `නීති_පැවරුම්_ලිපිය_${
// //       caseData.arbitrationNumber || "document"
// //     }.doc`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //     URL.revokeObjectURL(url);
// //     alert("නීති නිලධාරී පැවරුම් ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ");
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center py-5">
// //         <div className="spinner-border text-primary" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <h2 className="fw-bold mb-3">ගෙවීම් නොකළ නඩු - නීති නිලධාරී පැවරීම</h2>

// //       {/* Tabs */}
// //       <ul
// //         className="nav nav-tabs mb-4"
// //         style={{ borderRadius: "10px 10px 0 0" }}
// //       >
// //         <li className="nav-item">
// //           <button
// //             className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
// //             onClick={() => setActiveTab("pending")}
// //             style={{
// //               borderRadius: "10px 10px 0 0",
// //               fontWeight: activeTab === "pending" ? "bold" : "normal",
// //             }}
// //           >
// //             <AlertCircle size={16} className="me-2" />
// //             පවරා නොමැති නඩු ({paymentPendingCases.length})
// //           </button>
// //         </li>
// //         <li className="nav-item">
// //           <button
// //             className={`nav-link ${activeTab === "history" ? "active" : ""}`}
// //             onClick={() => setActiveTab("history")}
// //             style={{
// //               borderRadius: "10px 10px 0 0",
// //               fontWeight: activeTab === "history" ? "bold" : "normal",
// //             }}
// //           >
// //             <History size={16} className="me-2" />
// //             පවරා ඇති නඩු ඉතිහාසය ({assignedCasesHistory.length})
// //           </button>
// //         </li>
// //       </ul>

// //       {/* Pending Cases Tab */}
// //       {activeTab === "pending" && (
// //         <>
// //           <div
// //             className="alert alert-warning d-flex align-items-center mb-4"
// //             style={{ borderRadius: "10px" }}
// //           >
// //             <AlertCircle size={18} className="me-2" />
// //             බේරුම්කරු තීරණයෙන් පසු ගෙවීම නොකළ නඩු නීති නිලධාරීන්ට පවරන්න
// //           </div>

// //           {/* Batch Assignment Section */}
// //           {paymentPendingCases.length > 0 && (
// //             <div
// //               className="card border-0 shadow-sm mb-4"
// //               style={{ borderRadius: "15px" }}
// //             >
// //               <div className="card-body p-4">
// //                 <h5 className="fw-bold mb-3">තොග පැවරීම</h5>
// //                 <div className="row">
// //                   <div className="col-md-4">
// //                     <label className="form-label fw-semibold">
// //                       උසාවි නිලධාරි	යා
// //                     </label>
// //                     <select
// //                       className="form-select"
// //                       value={assignmentData.legalOfficerId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           legalOfficerId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවි නිලධාරි	යෙකු තෝරන්න</option>
// //                       {legalOfficers.map((officer) => (
// //                         <option key={officer.id} value={officer.id}>
// //                           {officer.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                   <div className="col-md-4">
// //                     <label className="form-label fw-semibold">උසාවිය</label>
// //                     <select
// //                       className="form-select"
// //                       value={assignmentData.courtId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           courtId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවියක් තෝරන්න</option>
// //                       {courts.map((court) => (
// //                         <option key={court.id} value={court.id}>
// //                           {court.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                   <div className="col-md-4 d-flex align-items-end">
// //                     <button
// //                       onClick={handleBatchAssign}
// //                       className="btn btn-primary w-100"
// //                       style={{ borderRadius: "10px" }}
// //                       disabled={
// //                         Object.values(selectedCases).filter(Boolean).length ===
// //                         0
// //                       }
// //                     >
// //                       <CheckCircle size={16} className="me-2" />
// //                       තෝරාගත් නඩු පවරන්න (
// //                       {Object.values(selectedCases).filter(Boolean).length})
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Pending Cases Table */}
// //           {paymentPendingCases.length === 0 ? (
// //             <div
// //               className="alert alert-info d-flex align-items-center"
// //               style={{ borderRadius: "10px" }}
// //             >
// //               <AlertCircle size={18} className="me-2" />
// //               ගෙවීම් නොකළ නඩු නොමැත
// //             </div>
// //           ) : (
// //             <div
// //               className="card border-0 shadow-sm"
// //               style={{ borderRadius: "15px" }}
// //             >
// //               <div className="table-responsive">
// //                 <table className="table table-hover mb-0">
// //                   <thead
// //                     style={{
// //                       background:
// //                         "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
// //                     }}
// //                     className="text-white"
// //                   >
// //                     <tr>
// //                       <th className="fw-semibold">
// //                         <input
// //                           type="checkbox"
// //                           onChange={(e) => {
// //                             const newSelected = {};
// //                             if (e.target.checked) {
// //                               paymentPendingCases.forEach((c) => {
// //                                 newSelected[
// //                                   `${c.submissionId}-${c.borrowerId}`
// //                                 ] = true;
// //                               });
// //                             }
// //                             setSelectedCases(newSelected);
// //                           }}
// //                           className="form-check-input"
// //                         />
// //                       </th>
// //                       <th className="fw-semibold">තීරක අංකය</th>
// //                       <th className="fw-semibold">ණයගැතියාගේ නම</th>
// //                       <th className="fw-semibold">සමිතිය</th>
// //                       <th className="fw-semibold">ණය අංකය</th>
// //                       <th className="fw-semibold">ණය මුදල</th>
// //                       <th className="fw-semibold">තීරණ දිනය</th>
// //                       <th className="fw-semibold">ක්‍රියා</th>
// //                       <th className="fw-semibold">විස්තර</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {paymentPendingCases.map((caseData) => {
// //                       const caseId = `${caseData.submissionId}-${caseData.borrowerId}`;
// //                       return (
// //                         <tr key={caseId}>
// //                           <td>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectedCases[caseId] || false}
// //                               onChange={() => handleSelectCase(caseId)}
// //                               className="form-check-input"
// //                             />
// //                           </td>
// //                           <td className="fw-bold text-primary">
// //                             {caseData.arbitrationNumber}
// //                           </td>
// //                           <td>
// //                             <strong>{caseData.borrowerName}</strong>
// //                           </td>
// //                           <td>{caseData.societyName}</td>
// //                           <td>{caseData.loanNumber}</td>
// //                           <td>
// //                             රු.{" "}
// //                             {parseFloat(caseData.loanAmount).toLocaleString(
// //                               "si-LK"
// //                             )}
// //                           </td>
// //                           <td>
// //                             {caseData.decisionDate
// //                               ? new Date(
// //                                   caseData.decisionDate
// //                                 ).toLocaleDateString("si-LK")
// //                               : "-"}
// //                           </td>
// //                           <td>
// //                             <button
// //                               onClick={() => handleOpenAssignModal(caseData)}
// //                               className="btn btn-primary btn-sm"
// //                               style={{ borderRadius: "8px" }}
// //                             >
// //                               <UserCheck size={14} className="me-1" />
// //                               පවරන්න
// //                             </button>
// //                           </td>
// //                           <td>
// //                             <button
// //                               onClick={() => {
// //                                 setSelectedBorrower(caseData);
// //                                 setShowDetailsModal(true);
// //                               }}
// //                               className="btn btn-outline-info btn-sm"
// //                               style={{ borderRadius: "8px" }}
// //                             >
// //                               <Eye size={14} className="me-1" />
// //                               විස්තර
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* History Tab */}
// //       {activeTab === "history" && (
// //         <>
// //           <div
// //             className="alert alert-info d-flex align-items-center mb-4"
// //             style={{ borderRadius: "10px" }}
// //           >
// //             <History size={18} className="me-2" />
// //             නීති නිලධාරීන්ට පවරා ඇති සියලුම නඩු ඉතිහාසය
// //           </div>

// //           {assignedCasesHistory.length === 0 ? (
// //             <div
// //               className="alert alert-warning d-flex align-items-center"
// //               style={{ borderRadius: "10px" }}
// //             >
// //               <AlertCircle size={18} className="me-2" />
// //               තවම නීති නිලධාරීන්ට පවරා නොමැත
// //             </div>
// //           ) : (
// //             <>
// //               <div
// //                 className="card border-0 shadow-sm"
// //                 style={{ borderRadius: "15px" }}
// //               >
// //                 <div className="table-responsive">
// //                   <table className="table table-hover mb-0">
// //                     <thead
// //                       style={{
// //                         background:
// //                           "linear-gradient(135deg, #059669 0%, #047857 100%)",
// //                       }}
// //                       className="text-white"
// //                     >
// //                       <tr>
// //                         <th className="fw-semibold">තීරක අංකය</th>
// //                         <th className="fw-semibold">ණයගැතියාගේ නම</th>
// //                         <th className="fw-semibold">සමිතිය</th>
// //                         <th className="fw-semibold">ණය අංකය</th>
// //                         <th className="fw-semibold">ණය මුදල</th>
// //                         <th className="fw-semibold">තීරණ දිනය</th>
// //                         <th className="fw-semibold">උසාවි නිලධාරි	යා</th>
// //                         <th className="fw-semibold">උසාවිය</th>
// //                         <th className="fw-semibold">පවරන ලද දිනය</th>
// //                         <th className="fw-semibold">ලිපිය</th>
// //                         <th className="fw-semibold">විස්තර</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {assignedCasesHistory
// //                         .sort((a, b) => {
// //                           // Sort by assigned date, newest first
// //                           if (a.assignedDate && b.assignedDate) {
// //                             return (
// //                               new Date(b.assignedDate) -
// //                               new Date(a.assignedDate)
// //                             );
// //                           }
// //                           return 0;
// //                         })
// //                         .map((caseData) => {
// //                           const caseId = `${caseData.submissionId}-${caseData.borrowerId}`;
// //                           return (
// //                             <tr key={caseId}>
// //                               <td className="fw-bold text-success">
// //                                 {caseData.arbitrationNumber}
// //                               </td>
// //                               <td>
// //                                 <strong>{caseData.borrowerName}</strong>
// //                               </td>
// //                               <td>{caseData.societyName}</td>
// //                               <td>{caseData.loanNumber}</td>
// //                               <td>
// //                                 රු.{" "}
// //                                 {parseFloat(caseData.loanAmount).toLocaleString(
// //                                   "si-LK"
// //                                 )}
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <Calendar
// //                                     size={14}
// //                                     className="me-1 text-muted"
// //                                   />
// //                                   {caseData.decisionDate
// //                                     ? new Date(
// //                                         caseData.decisionDate
// //                                       ).toLocaleDateString("si-LK")
// //                                     : "-"}
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <User size={14} className="me-1 text-info" />
// //                                   <span className="badge bg-info text-dark">
// //                                     {caseData.legalOfficerName}
// //                                   </span>
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <Building2
// //                                     size={14}
// //                                     className="me-1 text-secondary"
// //                                   />
// //                                   <span className="badge bg-secondary">
// //                                     {caseData.courtName}
// //                                   </span>
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <div className="d-flex align-items-center">
// //                                   <Calendar
// //                                     size={14}
// //                                     className="me-1 text-success"
// //                                   />
// //                                   {caseData.assignedDate
// //                                     ? new Date(
// //                                         caseData.assignedDate
// //                                       ).toLocaleDateString("si-LK")
// //                                     : "-"}
// //                                 </div>
// //                               </td>
// //                               <td>
// //                                 <button
// //                                   onClick={() => {
// //                                     setSelectedBorrower(caseData);
// //                                     setShowDetailsModal(true);
// //                                   }}
// //                                   className="btn btn-outline-success btn-sm"
// //                                   style={{ borderRadius: "8px" }}
// //                                 >
// //                                   <Eye size={14} className="me-1" />
// //                                   විස්තර
// //                                 </button>
// //                               </td>
// //                             </tr>
// //                           );
// //                         })}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>

// //               {/* Summary Statistics */}
// //               <div className="row mt-4">
// //                 <div className="col-md-6">
// //                   <div
// //                     className="card border-0 shadow-sm"
// //                     style={{ borderRadius: "15px" }}
// //                   >
// //                     <div className="card-body text-center">
// //                       <h3 className="text-success fw-bold">
// //                         {assignedCasesHistory.length}
// //                       </h3>
// //                       <p className="text-muted mb-0">මුළු පවරා ඇති නඩු ගණන</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="col-md-6">
// //                   <div
// //                     className="card border-0 shadow-sm"
// //                     style={{ borderRadius: "15px" }}
// //                   >
// //                     <div className="card-body text-center">
// //                       <h3 className="text-primary fw-bold">
// //                         {legalOfficers.length}
// //                       </h3>
// //                       <p className="text-muted mb-0">සක්‍රීය නීති නිලධාරීන්</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </>
// //           )}
// //         </>
// //       )}

// //       {/* Assign Modal */}
// //       {showAssignModal && selectedCase && (
// //         <>
// //           <div
// //             className="modal-backdrop show"
// //             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
// //             onClick={() => setShowAssignModal(false)}
// //           ></div>
// //           <div
// //             className="modal show d-block"
// //             style={{ zIndex: 1055 }}
// //             tabIndex="-1"
// //           >
// //             <div className="modal-dialog modal-dialog-centered">
// //               <div
// //                 className="modal-content border-0 shadow-lg"
// //                 style={{ borderRadius: "20px" }}
// //               >
// //                 <div
// //                   className="modal-header text-white"
// //                   style={{
// //                     background:
// //                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //                     borderRadius: "20px 20px 0 0",
// //                   }}
// //                 >
// //                   <h5 className="modal-title fw-bold d-flex align-items-center">
// //                     <Scale size={20} className="me-2" />
// //                     උසාවි නිලධාරි	යා පවරන්න
// //                   </h5>
// //                   <button
// //                     type="button"
// //                     className="btn-close btn-close-white"
// //                     onClick={() => setShowAssignModal(false)}
// //                   ></button>
// //                 </div>
// //                 <div className="modal-body p-4">
// //                   <div className="alert alert-info mb-4">
// //                     <strong>ණයගැතියාගේ නම:</strong> {selectedCase.borrowerName}
// //                     <br />
// //                     <strong>තීරක අංකය:</strong> {selectedCase.arbitrationNumber}
// //                     <br />
// //                     <strong>සමිතිය:</strong> {selectedCase.societyName}
// //                   </div>

// //                   <div className="mb-3">
// //                     <label className="form-label fw-semibold">
// //                       උසාවි නිලධාරි	යා *
// //                     </label>
// //                     <select
// //                       className="form-select form-select-lg"
// //                       value={assignmentData.legalOfficerId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           legalOfficerId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවි නිලධාරි	යෙකු තෝරන්න</option>
// //                       {legalOfficers.map((officer) => (
// //                         <option key={officer.id} value={officer.id}>
// //                           {officer.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   <div className="mb-3">
// //                     <label className="form-label fw-semibold">උසාවිය *</label>
// //                     <select
// //                       className="form-select form-select-lg"
// //                       value={assignmentData.courtId}
// //                       onChange={(e) =>
// //                         setAssignmentData({
// //                           ...assignmentData,
// //                           courtId: e.target.value,
// //                         })
// //                       }
// //                       style={{ borderRadius: "10px" }}
// //                     >
// //                       <option value="">උසාවියක් තෝරන්න</option>
// //                       {courts.map((court) => (
// //                         <option key={court.id} value={court.id}>
// //                           {court.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <div className="modal-footer border-0 p-4">
// //                   <button
// //                     type="button"
// //                     className="btn btn-secondary btn-lg px-4"
// //                     onClick={() => setShowAssignModal(false)}
// //                     style={{ borderRadius: "10px" }}
// //                   >
// //                     අවලංගු කරන්න
// //                   </button>
// //                   <button
// //                     type="button"
// //                     className="btn btn-primary btn-lg px-4"
// //                     onClick={handleAssignLegalOfficer}
// //                     style={{
// //                       borderRadius: "10px",
// //                       background:
// //                         "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //                       border: "none",
// //                     }}
// //                   >
// //                     <CheckCircle size={16} className="me-2" />
// //                     පවරන්න
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       )}

// //       <BorrowerDetailsModal
// //         show={showDetailsModal}
// //         onClose={() => setShowDetailsModal(false)}
// //         borrower={selectedBorrower}
// //       />
// //     </div>
// //   );
// // };

// // export default PaymentPendingCasesPage;

// import React, { useState, useEffect } from "react";
// import {
//   AlertCircle,
//   Eye,
//   UserCheck,
//   Scale,
//   CheckCircle,
//   History,
//   Calendar,
//   Building2,
//   User,
//   Gavel,
//   FileText,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

// const PaymentPendingCasesPage = () => {
//   const { user } = useAuth();
//   const [paymentPendingCases, setPaymentPendingCases] = useState([]);
//   const [assignedCasesHistory, setAssignedCasesHistory] = useState([]);
//   const [legalOfficers, setLegalOfficers] = useState([]);
//   const [courts, setCourts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBorrower, setSelectedBorrower] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [assignmentData, setAssignmentData] = useState({
//     legalOfficerId: "",
//     courtId: "",
//   });
//   const [selectedCases, setSelectedCases] = useState({});
//   const [activeTab, setActiveTab] = useState("pending");

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const districtId = user.district;

//       const casesData = await api.getPaymentPendingCases(districtId);
//       const officersData = await api.getLegalOfficersByDistrict(districtId);
//       const courtsData = await api.getCourtsByDistrict(districtId);

//       setLegalOfficers(officersData);
//       setCourts(courtsData);

//       const officerMap = {};
//       officersData.forEach((officer) => {
//         officerMap[officer.id] = officer.name;
//       });

//       const courtMap = {};
//       courtsData.forEach((court) => {
//         courtMap[court.id] = court.name;
//       });

//       const pending = casesData.filter((c) => !c.sentToLegalOfficer);
//       const assigned = casesData
//         .filter((c) => c.sentToLegalOfficer)
//         .map((c) => ({
//           ...c,
//           legalOfficerName: officerMap[c.legalOfficerId] || "N/A",
//           courtName: courtMap[c.courtId] || "N/A",
//         }));

//       setPaymentPendingCases(pending);
//       setAssignedCasesHistory(assigned);
//     } catch (err) {
//       console.error("Error loading data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpenAssignModal = (caseData) => {
//     setSelectedCase(caseData);
//     setAssignmentData({
//       legalOfficerId: "",
//       courtId: "",
//     });
//     setShowAssignModal(true);
//   };

//   const handleAssignLegalOfficer = async () => {
//     if (!assignmentData.legalOfficerId || !assignmentData.courtId) {
//       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න");
//       return;
//     }

//     try {
//       await api.assignLegalOfficerToBorrower(
//         selectedCase.submissionId,
//         selectedCase.borrowerId,
//         assignmentData.legalOfficerId,
//         assignmentData.courtId
//       );
//       alert("උසාවි නිලධාරි	යා සාර්ථකව පවරන ලදී!");
//       setShowAssignModal(false);
//       setSelectedCases({});
//       loadData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleSelectCase = (caseId) => {
//     setSelectedCases((prev) => ({
//       ...prev,
//       [caseId]: !prev[caseId],
//     }));
//   };

//   const handleBatchAssign = async () => {
//     const selectedIds = Object.keys(selectedCases).filter(
//       (id) => selectedCases[id]
//     );

//     if (selectedIds.length === 0) {
//       alert("කරුණාකර අවම වශයෙන් එක් නඩුවක් තෝරන්න");
//       return;
//     }

//     if (!assignmentData.legalOfficerId || !assignmentData.courtId) {
//       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න");
//       return;
//     }

//     const assignments = selectedIds.map((id) => {
//       const caseData = paymentPendingCases.find(
//         (c) => `${c.submissionId}-${c.borrowerId}` === id
//       );
//       return {
//         submissionId: caseData.submissionId,
//         borrowerId: caseData.borrowerId,
//         legalOfficerId: assignmentData.legalOfficerId,
//         courtId: assignmentData.courtId,
//       };
//     });

//     try {
//       const result = await api.batchAssignLegalOfficer(assignments);
//       alert(
//         `සාර්ථකව පවරන ලදී: ${result.successCount}\nඅසමත්: ${result.failCount}`
//       );
//       setSelectedCases({});
//       setAssignmentData({ legalOfficerId: "", courtId: "" });
//       loadData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const generateAssignmentLetter = (caseData) => {
//     const letterHTML = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset='utf-8'>
//     <title>නීති නිලධාරී පැවරුම් ලිපිය</title>
//     <style>
//         @page { size: A4; margin: 2cm; }
//         body {
//             font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif;
//             font-size: 11pt;
//             line-height: 1.8;
//             color: #333;
//         }
//         .header {
//             text-align: center;
//             font-weight: bold;
//             font-size: 16pt;
//             margin-bottom: 30px;
//             border-bottom: 3px solid #667eea;
//             padding-bottom: 15px;
//         }
//         .section {
//             margin: 25px 0;
//             padding: 15px;
//             background: #f8f9fa;
//             border-left: 4px solid #667eea;
//             border-radius: 5px;
//         }
//         .section-title {
//             font-weight: bold;
//             font-size: 13pt;
//             color: #667eea;
//             margin-bottom: 15px;
//             text-decoration: underline;
//         }
//         .field {
//             margin: 12px 0;
//             padding: 8px;
//             background: white;
//             border-radius: 3px;
//         }
//         .label {
//             font-weight: bold;
//             display: inline-block;
//             min-width: 180px;
//             color: #555;
//         }
//         .value {
//             color: #000;
//             font-weight: 500;
//         }
//         .footer {
//             margin-top: 50px;
//             padding-top: 20px;
//             border-top: 2px solid #ddd;
//             font-size: 10pt;
//             text-align: center;
//             color: #666;
//         }
//         .date-stamp {
//             text-align: right;
//             margin-top: 40px;
//             font-style: italic;
//             color: #666;
//         }
//     </style>
// </head>
// <body>
//     <div class="header">
//         නීති නිලධාරී පැවරුම් ලිපිය<br/>
//         <small style="font-size: 12pt; font-weight: normal;">Legal Officer Assignment Letter</small>
//     </div>

//     <div class="section">
//         <div class="section-title">ණයගැතියාගේ විස්තර (Borrower Details)</div>
//         <div class="field">
//             <span class="label">නම (Name):</span>
//             <span class="value">${caseData.borrowerName}</span>
//         </div>
//         <div class="field">
//             <span class="label">ලිපිනය (Address):</span>
//             <span class="value">${caseData.borrowerAddress || "-"}</span>
//         </div>
//         <div class="field">
//             <span class="label">ජාතික හැඳුනුම්පත් අංකය (NIC):</span>
//             <span class="value">${caseData.borrowerNic || "-"}</span>
//         </div>
//         <div class="field">
//             <span class="label">දුරකථන අංකය (Phone):</span>
//             <span class="value">${caseData.borrowerPhone || "-"}</span>
//         </div>
//     </div>

//     <div class="section">
//         <div class="section-title">ණය විස්තර (Loan Details)</div>
//         <div class="field">
//             <span class="label">සමිතිය (Society):</span>
//             <span class="value">${caseData.societyName}</span>
//         </div>
//         <div class="field">
//             <span class="label">ණය අංකය (Loan Number):</span>
//             <span class="value">${caseData.loanNumber}</span>
//         </div>
//         <div class="field">
//             <span class="label">ණය මුදල (Loan Amount):</span>
//             <span class="value">රු. ${parseFloat(
//               caseData.loanAmount
//             ).toLocaleString("si-LK")}</span>
//         </div>
//         <div class="field">
//             <span class="label">අවසාන ණය මුදල (Final Amount):</span>
//             <span class="value">රු. ${parseFloat(
//               caseData.finalLoanAmount || caseData.loanAmount
//             ).toLocaleString("si-LK")}</span>
//         </div>
//     </div>

//     <div class="section">
//         <div class="section-title">බේරුම්කරු තීරණ විස්තර (Arbitration Details)</div>
//         <div class="field">
//             <span class="label">තීරක අංකය (Arbitration No):</span>
//             <span class="value">${caseData.arbitrationNumber}</span>
//         </div>
//         <div class="field">
//             <span class="label">තීරණ දිනය (Decision Date):</span>
//             <span class="value">${
//               caseData.decisionDate
//                 ? new Date(caseData.decisionDate).toLocaleDateString("si-LK")
//                 : "-"
//             }</span>
//         </div>
//         <div class="field">
//             <span class="label">අඩු කළ පොළිය (Interest Deducted):</span>
//             <span class="value">රු. ${parseFloat(
//               caseData.interestDeducted || 0
//             ).toLocaleString("si-LK")}</span>
//         </div>
//         <div class="field">
//             <span class="label">තීරණය (Decision):</span>
//             <div class="value" style="margin-top: 8px; padding: 10px; background: #fff; border: 1px solid #ddd; border-radius: 3px;">
//                 ${caseData.arbitrationDecision || "-"}
//             </div>
//         </div>
//     </div>

//     <div class="section">
//         <div class="section-title">නීති නිලධාරී පැවරුම් විස්තර (Legal Assignment Details)</div>
//         <div class="field">
//             <span class="label">උසාවි නිලධාරි	යා (Legal Officer):</span>
//             <span class="value">${caseData.legalOfficerName}</span>
//         </div>
//         <div class="field">
//             <span class="label">උසාවිය (Court):</span>
//             <span class="value">${caseData.courtName}</span>
//         </div>
//         <div class="field">
//             <span class="label">පවරන ලද දිනය (Assigned Date):</span>
//             <span class="value">${
//               caseData.assignedDate
//                 ? new Date(caseData.assignedDate).toLocaleDateString("si-LK")
//                 : new Date().toLocaleDateString("si-LK")
//             }</span>
//         </div>
//     </div>

//     ${
//       caseData.judgmentDate ||
//       caseData.judgmentNumber ||
//       caseData.judgmentResult
//         ? `
//     <div class="section">
//         <div class="section-title">නඩු විස්තර (Case Details)</div>
//         ${
//           caseData.judgmentDate
//             ? `
//         <div class="field">
//             <span class="label">නඩු දිනය (Case Date):</span>
//             <span class="value">${new Date(
//               caseData.judgmentDate
//             ).toLocaleDateString("si-LK")}</span>
//         </div>`
//             : ""
//         }
//         ${
//           caseData.judgmentNumber
//             ? `
//         <div class="field">
//             <span class="label">නඩු අංකය (Case Number):</span>
//             <span class="value">${caseData.judgmentNumber}</span>
//         </div>`
//             : ""
//         }
//         ${
//           caseData.judgmentResult
//             ? `
//         <div class="field">
//             <span class="label">නඩු තීන්දුව (Judgment Result):</span>
//             <div class="value" style="margin-top: 8px; padding: 10px; background: #fff; border: 1px solid #ddd; border-radius: 3px;">
//                 ${caseData.judgmentResult}
//             </div>
//         </div>`
//             : ""
//         }
//     </div>`
//         : ""
//     }

//     <div class="date-stamp">
//         ලියවිල්ල සකසන ලද දිනය: ${new Date().toLocaleDateString("si-LK")}<br/>
//         Document Generated: ${new Date().toLocaleString("en-US")}
//     </div>

//     <div class="footer">
//         මෙය පද්ධතිය විසින් ස්වයංක්‍රීයව සකසන ලද ලිපියකි<br/>
//         This is an automatically generated document by the system<br/>
//         <strong>මධ්‍යම පළාත් සමුපකාර දෙපාර්තමේන්තුව - Arbitration Management System</strong>
//     </div>
// </body>
// </html>`;

//     const blob = new Blob(["\ufeff", letterHTML], {
//       type: "application/msword;charset=utf-8",
//     });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `නීති_පැවරුම්_ලිපිය_${
//       caseData.arbitrationNumber || "document"
//     }.doc`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//     alert("නීති නිලධාරී පැවරුම් ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ");
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
//       <h2 className="fw-bold mb-3">ගෙවීම් නොකළ නඩු - නීති නිලධාරී පැවරීම</h2>

//       {/* Tabs */}
//       <ul
//         className="nav nav-tabs mb-4"
//         style={{ borderRadius: "10px 10px 0 0" }}
//       >
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
//             onClick={() => setActiveTab("pending")}
//             style={{
//               borderRadius: "10px 10px 0 0",
//               fontWeight: activeTab === "pending" ? "bold" : "normal",
//             }}
//           >
//             <AlertCircle size={16} className="me-2" />
//             පවරා නොමැති නඩු ({paymentPendingCases.length})
//           </button>
//         </li>
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === "history" ? "active" : ""}`}
//             onClick={() => setActiveTab("history")}
//             style={{
//               borderRadius: "10px 10px 0 0",
//               fontWeight: activeTab === "history" ? "bold" : "normal",
//             }}
//           >
//             <History size={16} className="me-2" />
//             පවරා ඇති නඩු ඉතිහාසය ({assignedCasesHistory.length})
//           </button>
//         </li>
//       </ul>

//       {/* Pending Cases Tab */}
//       {activeTab === "pending" && (
//         <>
//           <div
//             className="alert alert-warning d-flex align-items-center mb-4"
//             style={{ borderRadius: "10px" }}
//           >
//             <AlertCircle size={18} className="me-2" />
//             බේරුම්කරු තීරණයෙන් පසු ගෙවීම නොකළ නඩු නීති නිලධාරීන්ට පවරන්න
//           </div>

//           {/* Batch Assignment Section */}
//           {paymentPendingCases.length > 0 && (
//             <div
//               className="card border-0 shadow-sm mb-4"
//               style={{ borderRadius: "15px" }}
//             >
//               <div className="card-body p-4">
//                 <h5 className="fw-bold mb-3">තොග පැවරීම</h5>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       උසාවි නිලධාරි	යා
//                     </label>
//                     <select
//                       className="form-select"
//                       value={assignmentData.legalOfficerId}
//                       onChange={(e) =>
//                         setAssignmentData({
//                           ...assignmentData,
//                           legalOfficerId: e.target.value,
//                         })
//                       }
//                       style={{ borderRadius: "10px" }}
//                     >
//                       <option value="">උසාවි නිලධාරි	යෙකු තෝරන්න</option>
//                       {legalOfficers.map((officer) => (
//                         <option key={officer.id} value={officer.id}>
//                           {officer.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">උසාවිය</label>
//                     <select
//                       className="form-select"
//                       value={assignmentData.courtId}
//                       onChange={(e) =>
//                         setAssignmentData({
//                           ...assignmentData,
//                           courtId: e.target.value,
//                         })
//                       }
//                       style={{ borderRadius: "10px" }}
//                     >
//                       <option value="">උසාවියක් තෝරන්න</option>
//                       {courts.map((court) => (
//                         <option key={court.id} value={court.id}>
//                           {court.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-md-4 d-flex align-items-end">
//                     <button
//                       onClick={handleBatchAssign}
//                       className="btn btn-primary w-100"
//                       style={{ borderRadius: "10px" }}
//                       disabled={
//                         Object.values(selectedCases).filter(Boolean).length ===
//                         0
//                       }
//                     >
//                       <CheckCircle size={16} className="me-2" />
//                       තෝරාගත් නඩු පවරන්න (
//                       {Object.values(selectedCases).filter(Boolean).length})
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Pending Cases Table */}
//           {paymentPendingCases.length === 0 ? (
//             <div
//               className="alert alert-info d-flex align-items-center"
//               style={{ borderRadius: "10px" }}
//             >
//               <AlertCircle size={18} className="me-2" />
//               ගෙවීම් නොකළ නඩු නොමැත
//             </div>
//           ) : (
//             <div
//               className="card border-0 shadow-sm"
//               style={{ borderRadius: "15px" }}
//             >
//               <div className="table-responsive">
//                 <table className="table table-hover mb-0">
//                   <thead
//                     style={{
//                       background:
//                         "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
//                     }}
//                     className="text-white"
//                   >
//                     <tr>
//                       <th className="fw-semibold">
//                         <input
//                           type="checkbox"
//                           onChange={(e) => {
//                             const newSelected = {};
//                             if (e.target.checked) {
//                               paymentPendingCases.forEach((c) => {
//                                 newSelected[
//                                   `${c.submissionId}-${c.borrowerId}`
//                                 ] = true;
//                               });
//                             }
//                             setSelectedCases(newSelected);
//                           }}
//                           className="form-check-input"
//                         />
//                       </th>
//                       <th className="fw-semibold">තීරක අංකය</th>
//                       <th className="fw-semibold">ණයගැතියාගේ නම</th>
//                       <th className="fw-semibold">සමිතිය</th>
//                       <th className="fw-semibold">ණය අංකය</th>
//                       <th className="fw-semibold">ණය මුදල</th>
//                       <th className="fw-semibold">තීරණ දිනය</th>
//                       <th className="fw-semibold">ක්‍රියා</th>
//                       <th className="fw-semibold">විස්තර</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paymentPendingCases.map((caseData) => {
//                       const caseId = `${caseData.submissionId}-${caseData.borrowerId}`;
//                       return (
//                         <tr key={caseId}>
//                           <td>
//                             <input
//                               type="checkbox"
//                               checked={selectedCases[caseId] || false}
//                               onChange={() => handleSelectCase(caseId)}
//                               className="form-check-input"
//                             />
//                           </td>
//                           <td className="fw-bold text-primary">
//                             {caseData.arbitrationNumber}
//                           </td>
//                           <td>
//                             <strong>{caseData.borrowerName}</strong>
//                           </td>
//                           <td>{caseData.societyName}</td>
//                           <td>{caseData.loanNumber}</td>
//                           <td>
//                             රු.{" "}
//                             {parseFloat(caseData.loanAmount).toLocaleString(
//                               "si-LK"
//                             )}
//                           </td>
//                           <td>
//                             {caseData.decisionDate
//                               ? new Date(
//                                   caseData.decisionDate
//                                 ).toLocaleDateString("si-LK")
//                               : "-"}
//                           </td>
//                           <td>
//                             <button
//                               onClick={() => handleOpenAssignModal(caseData)}
//                               className="btn btn-primary btn-sm"
//                               style={{ borderRadius: "8px" }}
//                             >
//                               <UserCheck size={14} className="me-1" />
//                               පවරන්න
//                             </button>
//                           </td>
//                           <td>
//                             <button
//                               onClick={() => {
//                                 setSelectedBorrower(caseData);
//                                 setShowDetailsModal(true);
//                               }}
//                               className="btn btn-outline-info btn-sm"
//                               style={{ borderRadius: "8px" }}
//                             >
//                               <Eye size={14} className="me-1" />
//                               විස්තර
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* History Tab */}
//       {activeTab === "history" && (
//         <>
//           <div
//             className="alert alert-info d-flex align-items-center mb-4"
//             style={{ borderRadius: "10px" }}
//           >
//             <History size={18} className="me-2" />
//             නීති නිලධාරීන්ට පවරා ඇති සියලුම නඩු ඉතිහාසය
//           </div>

//           {assignedCasesHistory.length === 0 ? (
//             <div
//               className="alert alert-warning d-flex align-items-center"
//               style={{ borderRadius: "10px" }}
//             >
//               <AlertCircle size={18} className="me-2" />
//               තවම නීති නිලධාරීන්ට පවරා නොමැත
//             </div>
//           ) : (
//             <>
//               <div
//                 className="card border-0 shadow-sm"
//                 style={{ borderRadius: "15px" }}
//               >
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0">
//                     <thead
//                       style={{
//                         background:
//                           "linear-gradient(135deg, #059669 0%, #047857 100%)",
//                       }}
//                       className="text-white"
//                     >
//                       <tr>
//                         <th className="fw-semibold">තීරක අංකය</th>
//                         <th className="fw-semibold">ණයගැතියාගේ නම</th>
//                         <th className="fw-semibold">සමිතිය</th>
//                         <th className="fw-semibold">ණය අංකය</th>
//                         <th className="fw-semibold">ණය මුදල</th>
//                         <th className="fw-semibold">තීරණ දිනය</th>
//                         <th className="fw-semibold">උසාවි නිලධාරි	යා</th>
//                         <th className="fw-semibold">උසාවිය</th>
//                         <th className="fw-semibold">පවරන ලද දිනය</th>
//                         <th className="fw-semibold">නඩු විස්තර</th>
//                         <th className="fw-semibold">ලිපිය</th>
//                         <th className="fw-semibold">විස්තර</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {assignedCasesHistory
//                         .sort((a, b) => {
//                           if (a.assignedDate && b.assignedDate) {
//                             return (
//                               new Date(b.assignedDate) -
//                               new Date(a.assignedDate)
//                             );
//                           }
//                           return 0;
//                         })
//                         .map((caseData) => {
//                           const caseId = `${caseData.submissionId}-${caseData.borrowerId}`;
//                           return (
//                             <tr key={caseId}>
//                               <td className="fw-bold text-success">
//                                 {caseData.arbitrationNumber}
//                               </td>
//                               <td>
//                                 <strong>{caseData.borrowerName}</strong>
//                               </td>
//                               <td>{caseData.societyName}</td>
//                               <td>{caseData.loanNumber}</td>
//                               <td>
//                                 රු.{" "}
//                                 {parseFloat(caseData.loanAmount).toLocaleString(
//                                   "si-LK"
//                                 )}
//                               </td>
//                               <td>
//                                 <div className="d-flex align-items-center">
//                                   <Calendar
//                                     size={14}
//                                     className="me-1 text-muted"
//                                   />
//                                   {caseData.decisionDate
//                                     ? new Date(
//                                         caseData.decisionDate
//                                       ).toLocaleDateString("si-LK")
//                                     : "-"}
//                                 </div>
//                               </td>
//                               <td>
//                                 <div className="d-flex align-items-center">
//                                   <User size={14} className="me-1 text-info" />
//                                   <span className="badge bg-info text-dark">
//                                     {caseData.legalOfficerName}
//                                   </span>
//                                 </div>
//                               </td>
//                               <td>
//                                 <div className="d-flex align-items-center">
//                                   <Building2
//                                     size={14}
//                                     className="me-1 text-secondary"
//                                   />
//                                   <span className="badge bg-secondary">
//                                     {caseData.courtName}
//                                   </span>
//                                 </div>
//                               </td>
//                               <td>
//                                 <div className="d-flex align-items-center">
//                                   <Calendar
//                                     size={14}
//                                     className="me-1 text-success"
//                                   />
//                                   {caseData.assignedDate
//                                     ? new Date(
//                                         caseData.assignedDate
//                                       ).toLocaleDateString("si-LK")
//                                     : "-"}
//                                 </div>
//                               </td>
//                               <td>
//                                 {caseData.judgmentDate ||
//                                 caseData.judgmentNumber ||
//                                 caseData.judgmentResult ? (
//                                   <div className="small">
//                                     {caseData.judgmentDate && (
//                                       <div className="d-flex align-items-center mb-1">
//                                         <Calendar
//                                           size={12}
//                                           className="me-1 text-success"
//                                         />
//                                         <span className="text-success">
//                                           {new Date(
//                                             caseData.judgmentDate
//                                           ).toLocaleDateString("si-LK")}
//                                         </span>
//                                       </div>
//                                     )}
//                                     {caseData.judgmentNumber && (
//                                       <div className="d-flex align-items-center mb-1">
//                                         <Scale
//                                           size={12}
//                                           className="me-1 text-primary"
//                                         />
//                                         <span className="badge bg-primary">
//                                           {caseData.judgmentNumber}
//                                         </span>
//                                       </div>
//                                     )}
//                                     {caseData.judgmentResult && (
//                                       <div className="d-flex align-items-start">
//                                         <Gavel
//                                           size={12}
//                                           className="me-1 text-warning mt-1"
//                                         />
//                                         <span
//                                           className="text-muted small"
//                                           style={{
//                                             maxWidth: "150px",
//                                             overflow: "hidden",
//                                             textOverflow: "ellipsis",
//                                             whiteSpace: "nowrap",
//                                           }}
//                                           title={caseData.judgmentResult}
//                                         >
//                                           {caseData.judgmentResult}
//                                         </span>
//                                       </div>
//                                     )}
//                                   </div>
//                                 ) : (
//                                   <span className="text-muted">
//                                     තවමත් එකතු කර නැත
//                                   </span>
//                                 )}
//                               </td>
//                               <td>
//                                 <button
//                                   onClick={() =>
//                                     generateAssignmentLetter(caseData)
//                                   }
//                                   className="btn btn-primary btn-sm"
//                                   style={{ borderRadius: "8px" }}
//                                 >
//                                   <FileText size={12} className="me-1" />
//                                   ලිපිය
//                                 </button>
//                               </td>
//                               <td>
//                                 <button
//                                   onClick={() => {
//                                     setSelectedBorrower(caseData);
//                                     setShowDetailsModal(true);
//                                   }}
//                                   className="btn btn-outline-success btn-sm"
//                                   style={{ borderRadius: "8px" }}
//                                 >
//                                   <Eye size={14} className="me-1" />
//                                   විස්තර
//                                 </button>
//                               </td>
//                             </tr>
//                           );
//                         })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Summary Statistics */}
//               <div className="row mt-4">
//                 <div className="col-md-6">
//                   <div
//                     className="card border-0 shadow-sm"
//                     style={{ borderRadius: "15px" }}
//                   >
//                     <div className="card-body text-center">
//                       <h3 className="text-success fw-bold">
//                         {assignedCasesHistory.length}
//                       </h3>
//                       <p className="text-muted mb-0">මුළු පවරා ඇති නඩු ගණන</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div
//                     className="card border-0 shadow-sm"
//                     style={{ borderRadius: "15px" }}
//                   >
//                     <div className="card-body text-center">
//                       <h3 className="text-primary fw-bold">
//                         {legalOfficers.length}
//                       </h3>
//                       <p className="text-muted mb-0">සක්‍රීය නීති නිලධාරීන්</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </>
//       )}

//       {/* Assign Modal */}
//       {showAssignModal && selectedCase && (
//         <>
//           <div
//             className="modal-backdrop show"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//             onClick={() => setShowAssignModal(false)}
//           ></div>
//           <div
//             className="modal show d-block"
//             style={{ zIndex: 1055 }}
//             tabIndex="-1"
//           >
//             <div className="modal-dialog modal-dialog-centered">
//               <div
//                 className="modal-content border-0 shadow-lg"
//                 style={{ borderRadius: "20px" }}
//               >
//                 <div
//                   className="modal-header text-white"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     borderRadius: "20px 20px 0 0",
//                   }}
//                 >
//                   <h5 className="modal-title fw-bold d-flex align-items-center">
//                     <Scale size={20} className="me-2" />
//                     උසාවි නිලධාරි	යා පවරන්න
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowAssignModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body p-4">
//                   <div className="alert alert-info mb-4">
//                     <strong>ණයගැතියාගේ නම:</strong> {selectedCase.borrowerName}
//                     <br />
//                     <strong>තීරක අංකය:</strong> {selectedCase.arbitrationNumber}
//                     <br />
//                     <strong>සමිතිය:</strong> {selectedCase.societyName}
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       උසාවි නිලධාරි	යා *
//                     </label>
//                     <select
//                       className="form-select form-select-lg"
//                       value={assignmentData.legalOfficerId}
//                       onChange={(e) =>
//                         setAssignmentData({
//                           ...assignmentData,
//                           legalOfficerId: e.target.value,
//                         })
//                       }
//                       style={{ borderRadius: "10px" }}
//                     >
//                       <option value="">උසාවි නිලධාරි	යෙකු තෝරන්න</option>
//                       {legalOfficers.map((officer) => (
//                         <option key={officer.id} value={officer.id}>
//                           {officer.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">උසාවිය *</label>
//                     <select
//                       className="form-select form-select-lg"
//                       value={assignmentData.courtId}
//                       onChange={(e) =>
//                         setAssignmentData({
//                           ...assignmentData,
//                           courtId: e.target.value,
//                         })
//                       }
//                       style={{ borderRadius: "10px" }}
//                     >
//                       <option value="">උසාවියක් තෝරන්න</option>
//                       {courts.map((court) => (
//                         <option key={court.id} value={court.id}>
//                           {court.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="modal-footer border-0 p-4">
//                   <button
//                     type="button"
//                     className="btn btn-secondary btn-lg px-4"
//                     onClick={() => setShowAssignModal(false)}
//                     style={{ borderRadius: "10px" }}
//                   >
//                     අවලංගු කරන්න
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg px-4"
//                     onClick={handleAssignLegalOfficer}
//                     style={{
//                       borderRadius: "10px",
//                       background:
//                         "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       border: "none",
//                     }}
//                   >
//                     <CheckCircle size={16} className="me-2" />
//                     පවරන්න
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       <BorrowerDetailsModal
//         show={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         borrower={selectedBorrower}
//       />
//     </div>
//   );
// };

// export default PaymentPendingCasesPage;

// import React, { useState, useEffect } from "react";
// import {
//   AlertCircle,
//   Eye,
//   UserPlus,
//   Building,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

// const DistrictUnpaidCasesPage = () => {
//   const { user } = useAuth();
//   const [paymentPendingCases, setPaymentPendingCases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBorrower, setSelectedBorrower] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [legalOfficers, setLegalOfficers] = useState([]);
//   const [courts, setCourts] = useState([]);
//   const [selectedLegalOfficer, setSelectedLegalOfficer] = useState("");
//   const [selectedCourt, setSelectedCourt] = useState("");
//   const [assigning, setAssigning] = useState(false);

//   useEffect(() => {
//     loadPaymentPendingCases();
//     loadLegalOfficers();
//     loadCourts();
//   }, []);

//   const loadPaymentPendingCases = async () => {
//     try {
//       if (!user.district) {
//         console.error("❌ No district found!");
//         return;
//       }

//       const data = await api.getPaymentPendingCases(user.district);
//       setPaymentPendingCases(data);
//       console.log("✅ Payment pending cases loaded:", data.length);
//     } catch (err) {
//       console.error("❌ Error loading payment pending cases:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadLegalOfficers = async () => {
//     try {
//       const data = await api.getLegalOfficersByDistrict(user.district);
//       setLegalOfficers(data);
//     } catch (err) {
//       console.error("❌ Error loading legal officers:", err);
//     }
//   };

//   const loadCourts = async () => {
//     try {
//       const data = await api.getCourtsByDistrict(user.district);
//       setCourts(data);
//     } catch (err) {
//       console.error("❌ Error loading courts:", err);
//     }
//   };

//   const handleOpenAssignModal = (caseItem) => {
//     setSelectedCase(caseItem);
//     setSelectedLegalOfficer(caseItem.legalOfficerId || "");
//     setSelectedCourt(caseItem.courtId || "");
//     setShowAssignModal(true);
//   };

//   const handleAssignLegalOfficer = async () => {
//     if (!selectedLegalOfficer || !selectedCourt) {
//       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න!");
//       return;
//     }

//     if (
//       !window.confirm("තෝරාගත් උසාවි නිලධාරි	යා සහ උසාවිය මෙම නඩුවට පවරන්න?")
//     ) {
//       return;
//     }

//     setAssigning(true);
//     try {
//       await api.assignLegalOfficerToBorrower(
//         selectedCase.submissionId,
//         selectedCase.borrowerId,
//         selectedLegalOfficer,
//         selectedCourt
//       );

//       alert("උසාවි නිලධාරි	යා සාර්ථකව පවරන ලදී!");
//       setShowAssignModal(false);
//       loadPaymentPendingCases();
//     } catch (err) {
//       console.error("❌ Error assigning legal officer:", err);
//       alert("උසාවි නිලධාරි	යා පැවරීමේදී දෝෂයක් ඇති විය!");
//     } finally {
//       setAssigning(false);
//     }
//   };

//   const AssignLegalOfficerModal = () => {
//     if (!showAssignModal || !selectedCase) return null;

//     return (
//       <div
//         className="modal show d-block"
//         style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         onClick={() => setShowAssignModal(false)}
//       >
//         <div
//           className="modal-dialog modal-lg modal-dialog-centered"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="modal-content" style={{ borderRadius: "15px" }}>
//             <div
//               className="modal-header text-white"
//               style={{
//                 background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//                 borderRadius: "15px 15px 0 0",
//               }}
//             >
//               <h5 className="modal-title fw-bold">
//                 උසාවි නිලධාරි	යා සහ උසාවිය පැවරීම
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close btn-close-white"
//                 onClick={() => setShowAssignModal(false)}
//               />
//             </div>
//             <div className="modal-body p-4">
//               {/* Case Information */}
//               <div
//                 className="alert alert-info mb-4"
//                 style={{ borderRadius: "10px" }}
//               >
//                 <h6 className="fw-bold mb-3">නඩු තොරතුරු</h6>
//                 <div className="row g-2">
//                   <div className="col-md-6">
//                     <strong>ණය ගැතියා:</strong>{" "}
//                     <span>{selectedCase.borrowerName}</span>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>ණය අංකය:</strong> {selectedCase.loanNumber}
//                   </div>
//                   <div className="col-md-6">
//                     <strong>සංගමය:</strong> {selectedCase.societyName}
//                   </div>
//                 </div>
//               </div>

//               {/* Legal Officer Selection */}
//               <div className="mb-4">
//                 <label className="form-label fw-semibold">
//                   <UserPlus size={18} className="me-2" />
//                   උසාවි නිලධාරි	යා තෝරන්න *
//                 </label>
//                 <select
//                   className="form-select"
//                   value={selectedLegalOfficer}
//                   onChange={(e) => setSelectedLegalOfficer(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <option value="">උසාවි නිලධාරි	යෙක් තෝරන්න</option>
//                   {legalOfficers.map((officer) => (
//                     <option key={officer.id} value={officer.id}>
//                       {officer.name} - {officer.designation}
//                     </option>
//                   ))}
//                 </select>
//                 {legalOfficers.length === 0 && (
//                   <small className="text-danger">
//                     මෙම දිස්ත්‍රික්කයට නීති නිලධාරීන් නොමැත
//                   </small>
//                 )}
//               </div>

//               {/* Court Selection */}
//               <div className="mb-4">
//                 <label className="form-label fw-semibold">
//                   <Building size={18} className="me-2" />
//                   උසාවිය තෝරන්න *
//                 </label>
//                 <select
//                   className="form-select"
//                   value={selectedCourt}
//                   onChange={(e) => setSelectedCourt(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <option value="">උසාවියක් තෝරන්න</option>
//                   {courts.map((court) => (
//                     <option key={court.id} value={court.id}>
//                       {court.name} - {court.type}
//                     </option>
//                   ))}
//                 </select>
//                 {courts.length === 0 && (
//                   <small className="text-danger">
//                     මෙම දිස්ත්‍රික්කයට අධිකරණ නොමැත
//                   </small>
//                 )}
//               </div>

//               {/* Current Assignment (if exists) */}
//               {selectedCase.legalOfficerId && (
//                 <div
//                   className="alert alert-warning"
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <strong>දැනට පවරා ඇත:</strong>
//                   <br />
//                   උසාවි නිලධාරි	යා: {selectedCase.legalOfficerName}
//                   <br />
//                   උසාවිය: {selectedCase.courtName}
//                 </div>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setShowAssignModal(false)}
//                 style={{ borderRadius: "10px" }}
//               >
//                 <XCircle size={16} className="me-2" />
//                 අවලංගු කරන්න
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleAssignLegalOfficer}
//                 disabled={!selectedLegalOfficer || !selectedCourt || assigning}
//                 style={{ borderRadius: "10px" }}
//               >
//                 {assigning ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm me-2"
//                       role="status"
//                     />
//                     පවරමින්...
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle size={16} className="me-2" />
//                     පවරන්න
//                   </>
//                 )}
//               </button>
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
//       <div className="mb-4">
//         <h2 className="fw-bold">ගෙවීම් අපේක්ෂිත නඩු (නීති කටයුතු සඳහා)</h2>
//         <p className="text-muted">
//           තීරණයෙන් පසුව ගෙවීම් සිදු නොකළ නඩු - නීති නිලධාරීන්ට පැවරීමට
//         </p>
//       </div>

//       {paymentPendingCases.length === 0 ? (
//         <div
//           className="alert alert-info d-flex align-items-center"
//           style={{ borderRadius: "10px" }}
//         >
//           <AlertCircle size={18} className="me-2" />
//           ගෙවීම් අපේක්ෂිත නඩු හමු නොවීය
//         </div>
//       ) : (
//         <div
//           className="card border-0 shadow-sm"
//           style={{ borderRadius: "15px" }}
//         >
//           <div
//             className="card-header text-white"
//             style={{
//               background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//               borderRadius: "15px 15px 0 0",
//             }}
//           >
//             <h6 className="mb-0 fw-bold">
//               ගෙවීම් අපේක්ෂිත නඩු ({paymentPendingCases.length})
//             </h6>
//           </div>
//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table table-hover mb-0">
//                 <thead style={{ background: "#f8f9fa" }}>
//                   <tr>
//                     <th className="fw-semibold">තීරක අංකය</th>
//                     <th className="fw-semibold">ණය ගැතියාගේ නම</th>
//                     <th className="fw-semibold">ලිපිනය</th>
//                     <th className="fw-semibold">ණය අංකය</th>
//                     <th className="fw-semibold">සංගමය</th>
//                     <th className="fw-semibold">අවසන් මුදල</th>
//                     <th className="fw-semibold">තීරණ දිනය</th>
//                     <th className="fw-semibold">අනුමත දිනය</th>
//                     <th className="fw-semibold">තීරක නිලධාරියා</th>
//                     <th className="fw-semibold">උසාවි නිලධාරි	යා</th>
//                     <th className="fw-semibold">උසාවිය</th>
//                     <th className="fw-semibold">ක්‍රියාමාර්ග</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paymentPendingCases.map((caseItem) => (
//                     <tr key={`${caseItem.submissionId}-${caseItem.borrowerId}`}>
//                       <td className="fw-bold text-primary">
//                         {caseItem.arbitrationNumber}
//                       </td>
//                       <td>
//                         <strong>{caseItem.borrowerName}</strong>
//                       </td>
//                       <td className="text-muted small">
//                         {caseItem.borrowerAddress}
//                       </td>
//                       <td>{caseItem.loanNumber}</td>
//                       <td className="text-muted">{caseItem.societyName}</td>
//                       <td className="fw-bold text-success">
//                         රු.{" "}
//                         {parseFloat(caseItem.finalLoanAmount).toLocaleString(
//                           "si-LK"
//                         )}
//                       </td>
//                       <td>
//                         {caseItem.decisionDate
//                           ? new Date(caseItem.decisionDate).toLocaleDateString(
//                               "si-LK"
//                             )
//                           : "-"}
//                       </td>
//                       <td>
//                         {caseItem.approvedForDistrictDate
//                           ? new Date(
//                               caseItem.approvedForDistrictDate
//                             ).toLocaleDateString("si-LK")
//                           : "-"}
//                       </td>
//                       <td className="text-muted small">
//                         {caseItem.assignedOfficerName}
//                       </td>
//                       <td>
//                         {caseItem.legalOfficerName ? (
//                           <span className="badge bg-success">
//                             {caseItem.legalOfficerName}
//                           </span>
//                         ) : (
//                           <span className="badge bg-secondary">පවරා නැත</span>
//                         )}
//                       </td>
//                       <td>
//                         {caseItem.courtName ? (
//                           <span className="text-info small">
//                             {caseItem.courtName}
//                           </span>
//                         ) : (
//                           <span className="text-muted small">-</span>
//                         )}
//                       </td>
//                       <td>
//                         <div className="btn-group" role="group">
//                           <button
//                             onClick={() => handleOpenAssignModal(caseItem)}
//                             className="btn btn-sm btn-primary"
//                             style={{ borderRadius: "8px 0 0 8px" }}
//                             title="උසාවි නිලධාරි	යා පැවරීම"
//                           >
//                             <UserPlus size={14} />
//                           </button>
//                           <button
//                             onClick={() => {
//                               setSelectedBorrower(caseItem);
//                               setShowDetailsModal(true);
//                             }}
//                             className="btn btn-sm btn-outline-info"
//                             style={{ borderRadius: "0 8px 8px 0" }}
//                             title="විස්තර බලන්න"
//                           >
//                             <Eye size={14} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="card-footer bg-light">
//             <div className="d-flex justify-content-between align-items-center">
//               <span className="text-muted">
//                 මුළු නඩු: {paymentPendingCases.length} | නීති නිලධාරීන්ට පවරා
//                 ඇත: {paymentPendingCases.filter((c) => c.legalOfficerId).length}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}

//       <AssignLegalOfficerModal />

//       <BorrowerDetailsModal
//         show={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         borrower={selectedBorrower}
//       />
//     </div>
//   );
// };

// export default DistrictUnpaidCasesPage;

// import React, { useState, useEffect } from "react";
// import {
//   AlertCircle,
//   Eye,
//   UserPlus,
//   Building,
//   CheckCircle,
//   XCircle,
//   History,
//   Gavel,
//   Calendar,
//   FileText,
//   User,
//   Search,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

// const DistrictUnpaidCasesPage = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("pending"); // "pending" or "history"
//   const [paymentPendingCases, setPaymentPendingCases] = useState([]);
//   const [historyData, setHistoryData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBorrower, setSelectedBorrower] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [legalOfficers, setLegalOfficers] = useState([]);
//   const [courts, setCourts] = useState([]);
//   const [selectedLegalOfficer, setSelectedLegalOfficer] = useState("");
//   const [selectedCourt, setSelectedCourt] = useState("");
//   const [assigning, setAssigning] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   useEffect(() => {
//     loadPaymentPendingCases();
//     loadHistory();
//     loadLegalOfficers();
//     loadCourts();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [searchTerm, filterStatus, historyData]);

//   const loadPaymentPendingCases = async () => {
//     try {
//       if (!user.district) {
//         console.error("❌ No district found!");
//         return;
//       }

//       const data = await api.getPaymentPendingCases(user.district);
//       setPaymentPendingCases(data);
//       console.log("✅ Payment pending cases loaded:", data.length);
//     } catch (err) {
//       console.error("❌ Error loading payment pending cases:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadHistory = async () => {
//     try {
//       if (!user.district) return;

//       const submissions = await api.getSubmissionsByDistrict(user.district);
//       const history = [];

//       submissions.forEach((submission) => {
//         submission.borrowers.forEach((borrower) => {
//           if (
//             borrower.sentToLegalOfficer === true ||
//             borrower.assignedLegalOfficerId
//           ) {
//             history.push({
//               ...borrower,
//               submissionId: submission.id,
//               societyName: submission.societyName,
//               districtName: submission.districtName,
//             });
//           }
//         });
//       });

//       history.sort((a, b) => {
//         const dateA = new Date(a.legalAssignmentDate || 0);
//         const dateB = new Date(b.legalAssignmentDate || 0);
//         return dateB - dateA;
//       });

//       setHistoryData(history);
//     } catch (err) {
//       console.error("❌ Error loading history:", err);
//     }
//   };

//   const loadLegalOfficers = async () => {
//     try {
//       const data = await api.getLegalOfficersByDistrict(user.district);
//       setLegalOfficers(data);
//     } catch (err) {
//       console.error("❌ Error loading legal officers:", err);
//     }
//   };

//   const loadCourts = async () => {
//     try {
//       const data = await api.getCourtsByDistrict(user.district);
//       setCourts(data);
//     } catch (err) {
//       console.error("❌ Error loading courts:", err);
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...historyData];

//     if (searchTerm) {
//       const search = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (borrower) =>
//           borrower.borrowerName?.toLowerCase().includes(search) ||
//           borrower.arbitrationNumber?.toLowerCase().includes(search) ||
//           borrower.loanNumber?.toLowerCase().includes(search) ||
//           borrower.judgmentNumber?.toLowerCase().includes(search) ||
//           borrower.societyName?.toLowerCase().includes(search)
//       );
//     }

//     if (filterStatus !== "all") {
//       filtered = filtered.filter((borrower) => {
//         switch (filterStatus) {
//           case "assigned":
//             return borrower.assignedLegalOfficerId && !borrower.judgmentResult;
//           case "judgment":
//             return borrower.judgmentResult;
//           default:
//             return true;
//         }
//       });
//     }

//     setFilteredData(filtered);
//   };

//   const handleOpenAssignModal = (caseItem) => {
//     setSelectedCase(caseItem);
//     setSelectedLegalOfficer(caseItem.legalOfficerId || "");
//     setSelectedCourt(caseItem.courtId || "");
//     setShowAssignModal(true);
//   };

//   const handleAssignLegalOfficer = async () => {
//     if (!selectedLegalOfficer || !selectedCourt) {
//       alert("කරුණාකර උසාවි නිලධාරි	යා සහ උසාවිය තෝරන්න!");
//       return;
//     }

//     if (
//       !window.confirm("තෝරාගත් උසාවි නිලධාරි	යා සහ උසාවිය මෙම නඩුවට පවරන්න?")
//     ) {
//       return;
//     }

//     setAssigning(true);
//     try {
//       await api.assignLegalOfficerToBorrower(
//         selectedCase.submissionId,
//         selectedCase.borrowerId,
//         selectedLegalOfficer,
//         selectedCourt
//       );

//       alert("උසාවි නිලධාරියා සාර්ථකව පවරන ලදී!");
//       setShowAssignModal(false);
//       loadPaymentPendingCases();
//       loadHistory();
//     } catch (err) {
//       console.error("❌ Error assigning legal officer:", err);
//       alert("උසාවි නිලධාරි	යා පැවරීමේදී දෝෂයක් ඇති විය!");
//     } finally {
//       setAssigning(false);
//     }
//   };

//   const getStatusBadge = (borrower) => {
//     if (borrower.judgmentResult) {
//       return (
//         <span className="badge bg-success">
//           <Gavel size={12} className="me-1" />
//           නඩු තීන්දුව ලබා දී ඇත
//         </span>
//       );
//     } else if (borrower.assignedLegalOfficerId) {
//       return (
//         <span className="badge bg-warning">
//           <User size={12} className="me-1" />
//           උසාවි නිලධාරි	යාට පවරා ඇත
//         </span>
//       );
//     }
//     return <span className="badge bg-secondary">-</span>;
//   };

//   const AssignLegalOfficerModal = () => {
//     if (!showAssignModal || !selectedCase) return null;

//     return (
//       <div
//         className="modal show d-block"
//         style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         onClick={() => setShowAssignModal(false)}
//       >
//         <div
//           className="modal-dialog modal-lg modal-dialog-centered"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="modal-content" style={{ borderRadius: "15px" }}>
//             <div
//               className="modal-header text-white"
//               style={{
//                 background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//                 borderRadius: "15px 15px 0 0",
//               }}
//             >
//               <h5 className="modal-title fw-bold">
//                 උසාවි නිලධාරි	යා සහ උසාවිය පැවරීම
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close btn-close-white"
//                 onClick={() => setShowAssignModal(false)}
//               />
//             </div>
//             <div className="modal-body p-4">
//               <div
//                 className="alert alert-info mb-4"
//                 style={{ borderRadius: "10px" }}
//               >
//                 <h6 className="fw-bold mb-3">නඩු තොරතුරු</h6>
//                 <div className="row g-2">
//                   <div className="col-md-6">
//                     <strong>තීරක අංකය:</strong>{" "}
//                     <span className="text-primary">
//                       {selectedCase.arbitrationNumber}
//                     </span>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>ණය ගැතියා:</strong>{" "}
//                     <span>{selectedCase.borrowerName}</span>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>ණය අංකය:</strong> {selectedCase.loanNumber}
//                   </div>
//                   <div className="col-md-6">
//                     <strong>සංගමය:</strong> {selectedCase.societyName}
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="form-label fw-semibold">
//                   <UserPlus size={18} className="me-2" />
//                   උසාවි නිලධාරි	යා තෝරන්න *
//                 </label>
//                 <select
//                   className="form-select"
//                   value={selectedLegalOfficer}
//                   onChange={(e) => setSelectedLegalOfficer(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <option value="">උසාවි නිලධාරි	යෙක් තෝරන්න</option>
//                   {legalOfficers.map((officer) => (
//                     <option key={officer.id} value={officer.id}>
//                       {officer.name} - {officer.designation}
//                     </option>
//                   ))}
//                 </select>
//                 {legalOfficers.length === 0 && (
//                   <small className="text-danger">
//                     මෙම දිස්ත්‍රික්කයට නීති නිලධාරීන් නොමැත
//                   </small>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="form-label fw-semibold">
//                   <Building size={18} className="me-2" />
//                   උසාවිය තෝරන්න *
//                 </label>
//                 <select
//                   className="form-select"
//                   value={selectedCourt}
//                   onChange={(e) => setSelectedCourt(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <option value="">උසාවියක් තෝරන්න</option>
//                   {courts.map((court) => (
//                     <option key={court.id} value={court.id}>
//                       {court.name} - {court.type}
//                     </option>
//                   ))}
//                 </select>
//                 {courts.length === 0 && (
//                   <small className="text-danger">
//                     මෙම දිස්ත්‍රික්කයට අධිකරණ නොමැත
//                   </small>
//                 )}
//               </div>

//               {selectedCase.legalOfficerId && (
//                 <div
//                   className="alert alert-warning"
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <strong>දැනට පවරා ඇත:</strong>
//                   <br />
//                   උසාවි නිලධාරි	යා: {selectedCase.legalOfficerName}
//                   <br />
//                   උසාවිය: {selectedCase.courtName}
//                 </div>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setShowAssignModal(false)}
//                 style={{ borderRadius: "10px" }}
//               >
//                 <XCircle size={16} className="me-2" />
//                 අවලංගු කරන්න
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleAssignLegalOfficer}
//                 disabled={!selectedLegalOfficer || !selectedCourt || assigning}
//                 style={{ borderRadius: "10px" }}
//               >
//                 {assigning ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm me-2"
//                       role="status"
//                     />
//                     පවරමින්...
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle size={16} className="me-2" />
//                     පවරන්න
//                   </>
//                 )}
//               </button>
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
//       <div className="mb-4">
//         <h2 className="fw-bold">ගෙවීම් අපේක්ෂිත නඩු (නීති කටයුතු සඳහා)</h2>
//         <p className="text-muted">
//           තීරණයෙන් පසුව ගෙවීම් සිදු නොකළ නඩු - නීති නිලධාරීන්ට පැවරීමට
//         </p>
//       </div>

//       {/* Tabs */}
//       <ul
//         className="nav nav-tabs mb-4"
//         style={{ borderBottom: "2px solid #dee2e6" }}
//       >
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
//             onClick={() => setActiveTab("pending")}
//             style={{
//               borderRadius: "10px 10px 0 0",
//               fontWeight: activeTab === "pending" ? "bold" : "normal",
//               backgroundColor: activeTab === "pending" ? "#fff" : "transparent",
//               border: activeTab === "pending" ? "2px solid #dee2e6" : "none",
//               borderBottom: activeTab === "pending" ? "2px solid #fff" : "none",
//               marginBottom: "-2px",
//             }}
//           >
//             <AlertCircle size={18} className="me-2" />
//             ගෙවීම් අපේක්ෂිත ({paymentPendingCases.length})
//           </button>
//         </li>
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === "history" ? "active" : ""}`}
//             onClick={() => setActiveTab("history")}
//             style={{
//               borderRadius: "10px 10px 0 0",
//               fontWeight: activeTab === "history" ? "bold" : "normal",
//               backgroundColor: activeTab === "history" ? "#fff" : "transparent",
//               border: activeTab === "history" ? "2px solid #dee2e6" : "none",
//               borderBottom: activeTab === "history" ? "2px solid #fff" : "none",
//               marginBottom: "-2px",
//             }}
//           >
//             <History size={18} className="me-2" />
//             නීතිමය නඩු ඉතිහාසය ({historyData.length})
//           </button>
//         </li>
//       </ul>

//       {/* Pending Cases Tab */}
//       {activeTab === "pending" && (
//         <>
//           {paymentPendingCases.length === 0 ? (
//             <div
//               className="alert alert-info d-flex align-items-center"
//               style={{ borderRadius: "10px" }}
//             >
//               <AlertCircle size={18} className="me-2" />
//               ගෙවීම් අපේක්ෂිත නඩු හමු නොවීය
//             </div>
//           ) : (
//             <div
//               className="card border-0 shadow-sm"
//               style={{ borderRadius: "15px" }}
//             >
//               <div
//                 className="card-header text-white"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//                   borderRadius: "15px 15px 0 0",
//                 }}
//               >
//                 <h6 className="mb-0 fw-bold">
//                   ගෙවීම් අපේක්ෂිත නඩු ({paymentPendingCases.length})
//                 </h6>
//               </div>
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0">
//                     <thead style={{ background: "#f8f9fa" }}>
//                       <tr>
//                         <th className="fw-semibold">තීරක අංකය</th>
//                         <th className="fw-semibold">ණය ගැතියාගේ නම</th>
//                         <th className="fw-semibold">ලිපිනය</th>
//                         <th className="fw-semibold">ණය අංකය</th>
//                         <th className="fw-semibold">සංගමය</th>
//                         <th className="fw-semibold">අවසන් මුදල</th>
//                         <th className="fw-semibold">තීරණ දිනය</th>
//                         <th className="fw-semibold">අනුමත දිනය</th>
//                         <th className="fw-semibold">උසාවි නිලධාරි	යා</th>
//                         <th className="fw-semibold">උසාවිය</th>
//                         <th className="fw-semibold">ක්‍රියාමාර්ග</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paymentPendingCases.map((caseItem) => (
//                         <tr
//                           key={`${caseItem.submissionId}-${caseItem.borrowerId}`}
//                         >
//                           <td className="fw-bold text-primary">
//                             {caseItem.arbitrationNumber}
//                           </td>
//                           <td>
//                             <strong>{caseItem.borrowerName}</strong>
//                           </td>
//                           <td className="text-muted small">
//                             {caseItem.borrowerAddress}
//                           </td>
//                           <td>{caseItem.loanNumber}</td>
//                           <td className="text-muted">{caseItem.societyName}</td>
//                           <td className="fw-bold text-success">
//                             රු.{" "}
//                             {parseFloat(
//                               caseItem.finalLoanAmount
//                             ).toLocaleString("si-LK")}
//                           </td>
//                           <td>
//                             {caseItem.decisionDate
//                               ? new Date(
//                                   caseItem.decisionDate
//                                 ).toLocaleDateString("si-LK")
//                               : "-"}
//                           </td>
//                           <td>
//                             {caseItem.approvedForDistrictDate
//                               ? new Date(
//                                   caseItem.approvedForDistrictDate
//                                 ).toLocaleDateString("si-LK")
//                               : "-"}
//                           </td>
//                           <td>
//                             {caseItem.legalOfficerName ? (
//                               <span className="badge bg-success">
//                                 {caseItem.legalOfficerName}
//                               </span>
//                             ) : (
//                               <span className="badge bg-secondary">
//                                 පවරා නැත
//                               </span>
//                             )}
//                           </td>
//                           <td>
//                             {caseItem.courtName ? (
//                               <span className="text-info small">
//                                 {caseItem.courtName}
//                               </span>
//                             ) : (
//                               <span className="text-muted small">-</span>
//                             )}
//                           </td>
//                           <td>
//                             <div className="btn-group" role="group">
//                               <button
//                                 onClick={() => handleOpenAssignModal(caseItem)}
//                                 className="btn btn-sm btn-primary"
//                                 style={{ borderRadius: "8px 0 0 8px" }}
//                                 title="උසාවි නිලධාරි	යා පැවරීම"
//                               >
//                                 <UserPlus size={14} />
//                               </button>
//                               <button
//                                 onClick={() => {
//                                   setSelectedBorrower(caseItem);
//                                   setShowDetailsModal(true);
//                                 }}
//                                 className="btn btn-sm btn-outline-info"
//                                 style={{ borderRadius: "0 8px 8px 0" }}
//                                 title="විස්තර බලන්න"
//                               >
//                                 <Eye size={14} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               <div className="card-footer bg-light">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="text-muted">
//                     මුළු නඩු: {paymentPendingCases.length} | නීති නිලධාරීන්ට
//                     පවරා ඇත:{" "}
//                     {paymentPendingCases.filter((c) => c.legalOfficerId).length}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* History Tab */}
//       {activeTab === "history" && (
//         <>
//           {/* Search and Filters */}
//           <div
//             className="card mb-4 border-0 shadow-sm"
//             style={{ borderRadius: "15px" }}
//           >
//             <div className="card-body">
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <div className="input-group">
//                     <span
//                       className="input-group-text"
//                       style={{ borderRadius: "10px 0 0 10px" }}
//                     >
//                       <Search size={18} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="නම, තීරක අංකය, ණය අංකය, නඩු අංකය හෝ සංගමය අනුව සොයන්න..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       style={{ borderRadius: "0 10px 10px 0" }}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <select
//                     className="form-select"
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     style={{ borderRadius: "10px" }}
//                   >
//                     <option value="all">සියලු තත්වයන්</option>
//                     <option value="assigned">උසාවි නිලධාරි	යාට පවරා ඇත</option>
//                     <option value="judgment">නඩු තීන්දුව ලබා දී ඇත</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {filteredData.length === 0 ? (
//             <div
//               className="alert alert-info d-flex align-items-center"
//               style={{ borderRadius: "10px" }}
//             >
//               <History size={18} className="me-2" />
//               {searchTerm || filterStatus !== "all"
//                 ? "සෙවුම් ප්‍රතිඵල හමු නොවීය"
//                 : "ඉතිහාස දත්ත හමු නොවීය"}
//             </div>
//           ) : (
//             <div
//               className="card border-0 shadow-sm"
//               style={{ borderRadius: "15px" }}
//             >
//               <div
//                 className="card-header text-white"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
//                   borderRadius: "15px 15px 0 0",
//                 }}
//               >
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h6 className="mb-0 fw-bold">
//                     නීතිමය නඩු ඉතිහාසය ({filteredData.length})
//                   </h6>
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       className="btn btn-sm btn-light"
//                       style={{ borderRadius: "8px" }}
//                     >
//                       සෙවුම හිස් කරන්න
//                     </button>
//                   )}
//                 </div>
//               </div>
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0">
//                     <thead style={{ background: "#f8f9fa" }}>
//                       <tr>
//                         <th className="fw-semibold">තීරක අංකය</th>
//                         <th className="fw-semibold">නම</th>
//                         <th className="fw-semibold">ලිපිනය</th>
//                         <th className="fw-semibold">සංගමය</th>
//                         <th className="fw-semibold">ණය අංකය</th>
//                         <th className="fw-semibold">ණය මුදල</th>
//                         <th className="fw-semibold">උසාවි නිලධාරි	යා</th>
//                         <th className="fw-semibold">උසාවිය</th>
//                         <th className="fw-semibold">පවරා ඇති දිනය</th>
//                         <th className="fw-semibold">නඩු දිනය</th>
//                         <th className="fw-semibold">නඩු අංකය</th>
//                         <th className="fw-semibold">නඩු තීන්දුව</th>
//                         <th className="fw-semibold">තත්වය</th>
//                         <th className="fw-semibold">විස්තර</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.map((borrower) => (
//                         <tr key={`${borrower.submissionId}-${borrower.id}`}>
//                           <td className="fw-bold text-primary">
//                             {borrower.arbitrationNumber}
//                           </td>
//                           <td>
//                             <strong>{borrower.borrowerName}</strong>
//                           </td>
//                           <td
//                             className="small text-muted"
//                             style={{ maxWidth: "150px" }}
//                           >
//                             {borrower.borrowerAddress}
//                           </td>
//                           <td className="text-muted small">
//                             {borrower.societyName}
//                           </td>
//                           <td>{borrower.loanNumber}</td>
//                           <td className="text-success fw-bold">
//                             රු.{" "}
//                             {parseFloat(
//                               borrower.finalLoanAmount || 0
//                             ).toLocaleString("si-LK")}
//                           </td>
//                           <td>
//                             {borrower.assignedLegalOfficerName ? (
//                               <span className="badge bg-info">
//                                 <User size={12} className="me-1" />
//                                 {borrower.assignedLegalOfficerName}
//                               </span>
//                             ) : (
//                               <span className="text-muted">-</span>
//                             )}
//                           </td>
//                           <td>
//                             {borrower.assignedCourtName ? (
//                               <span className="badge bg-secondary">
//                                 <Building size={12} className="me-1" />
//                                 {borrower.assignedCourtName}
//                               </span>
//                             ) : (
//                               <span className="text-muted">-</span>
//                             )}
//                           </td>
//                           <td className="text-muted small">
//                             {borrower.legalAssignmentDate ? (
//                               <>
//                                 <Calendar size={14} className="me-1" />
//                                 {new Date(
//                                   borrower.legalAssignmentDate
//                                 ).toLocaleDateString("si-LK")}
//                               </>
//                             ) : (
//                               "-"
//                             )}
//                           </td>
//                           <td>
//                             {borrower.judgmentDate ? (
//                               <span className="text-muted small">
//                                 <Calendar size={14} className="me-1" />
//                                 {new Date(
//                                   borrower.judgmentDate
//                                 ).toLocaleDateString("si-LK")}
//                               </span>
//                             ) : (
//                               <span className="text-muted">-</span>
//                             )}
//                           </td>
//                           <td>
//                             {borrower.judgmentNumber ? (
//                               <span className="fw-bold text-info">
//                                 <FileText size={14} className="me-1" />
//                                 {borrower.judgmentNumber}
//                               </span>
//                             ) : (
//                               <span className="text-muted">-</span>
//                             )}
//                           </td>
//                           <td>
//                             {borrower.judgmentResult ? (
//                               <div
//                                 className="p-2 bg-light"
//                                 style={{
//                                   borderRadius: "6px",
//                                   maxWidth: "200px",
//                                   fontSize: "0.85rem",
//                                 }}
//                               >
//                                 <Gavel
//                                   size={14}
//                                   className="me-1 text-warning"
//                                 />
//                                 {borrower.judgmentResult}
//                               </div>
//                             ) : (
//                               <span className="text-muted">-</span>
//                             )}
//                           </td>
//                           <td>{getStatusBadge(borrower)}</td>
//                           <td>
//                             <button
//                               onClick={() => {
//                                 setSelectedBorrower(borrower);
//                                 setShowDetailsModal(true);
//                               }}
//                               className="btn btn-outline-info btn-sm"
//                               style={{ borderRadius: "8px" }}
//                             >
//                               <Eye size={14} className="me-1" />
//                               විස්තර
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               <div className="card-footer bg-light">
//                 <div className="row g-3">
//                   <div className="col-md-4">
//                     <div className="text-center">
//                       <div className="fs-4 fw-bold text-primary">
//                         {filteredData.length}
//                       </div>
//                       <div className="small text-muted">
//                         {searchTerm || filterStatus !== "all"
//                           ? "සෙවුම් ප්‍රතිඵල"
//                           : "මුළු නඩු"}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="text-center">
//                       <div className="fs-4 fw-bold text-warning">
//                         {
//                           filteredData.filter(
//                             (b) => b.assignedLegalOfficerId && !b.judgmentResult
//                           ).length
//                         }
//                       </div>
//                       <div className="small text-muted">
//                         නීති නිලධාරීන්ට පවරා ඇත
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="text-center">
//                       <div className="fs-4 fw-bold text-success">
//                         {filteredData.filter((b) => b.judgmentResult).length}
//                       </div>
//                       <div className="small text-muted">නඩු තීන්දු ලබා ඇත</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       <AssignLegalOfficerModal />

//       <BorrowerDetailsModal
//         show={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         borrower={selectedBorrower}
//       />
//     </div>
//   );
// };

// export default DistrictUnpaidCasesPage;

// import React, { useState, useEffect } from "react";
// import {
//   AlertCircle,
//   Eye,
//   UserPlus,
//   Building,
//   CheckCircle,
//   XCircle,
//   History,
//   Gavel,
//   Calendar,
//   FileText,
//   User,
//   Search,
//   DollarSign,
//   MessageSquare,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

// const DistrictUnpaidCasesPage = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("pending"); // "pending" or "history"
//   const [paymentPendingCases, setPaymentPendingCases] = useState([]);
//   const [historyData, setHistoryData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBorrower, setSelectedBorrower] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [legalOfficers, setLegalOfficers] = useState([]);
//   const [courts, setCourts] = useState([]);
//   const [selectedLegalOfficer, setSelectedLegalOfficer] = useState("");
//   const [selectedCourt, setSelectedCourt] = useState("");
//   const [assigning, setAssigning] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
//   const [selectedPaymentHistory, setSelectedPaymentHistory] = useState(null);
//   const [showTextModal, setShowTextModal] = useState(false);
//   const [modalContent, setModalContent] = useState({
//     title: "",
//     content: "",
//     icon: null,
//   });

//   useEffect(() => {
//     loadPaymentPendingCases();
//     loadHistory();
//     loadLegalOfficers();
//     loadCourts();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [searchTerm, filterStatus, historyData]);

//   const loadPaymentPendingCases = async () => {
//     try {
//       if (!user.district) {
//         console.error("❌ No district found!");
//         return;
//       }

//       const data = await api.getPaymentPendingCases(user.district);
//       setPaymentPendingCases(data);
//       console.log("✅ Payment pending cases loaded:", data.length);
//     } catch (err) {
//       console.error("❌ Error loading payment pending cases:", err);
//       // If this specific endpoint fails, try getting from all submissions
//       try {
//         console.log("📝 Trying alternate method...");
//         const submissions = await api.getSubmissionsByDistrict(user.district);
//         const pendingCases = [];

//         submissions.forEach((submission) => {
//           submission.borrowers.forEach((borrower) => {
//             if (
//               borrower.status === "payment-pending" &&
//               borrower.approvedForDistrict === true
//             ) {
//               pendingCases.push({
//                 ...borrower,
//                 submissionId: submission.id,
//                 societyName: submission.societyName,
//                 districtName: submission.districtName,
//               });
//             }
//           });
//         });

//         setPaymentPendingCases(pendingCases);
//         console.log(
//           "✅ Payment pending cases loaded (alternate):",
//           pendingCases.length
//         );
//       } catch (alternateErr) {
//         console.error("❌ Alternate method also failed:", alternateErr);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const TableTextCell = ({ content, icon: Icon, iconColor, type }) => {
//     if (!content) {
//       return <span className="text-muted">-</span>;
//     }

//     const handleViewMore = () => {
//       setModalContent({
//         title: type === "judgment" ? "නඩු තීන්දුව" : "නීති නිලධාරී සටහන්",
//         content: content,
//         icon: Icon,
//         iconColor: iconColor,
//       });
//       setShowTextModal(true);
//     };

//     return (
//       <div
//         className="p-2 bg-light"
//         style={{
//           borderRadius: "6px",
//           maxWidth: "180px",
//           fontSize: "0.85rem",
//         }}
//       >
//         <div className="d-flex align-items-start">
//           {Icon && (
//             <Icon
//               size={14}
//               className={`me-2 ${iconColor} flex-shrink-0`}
//               style={{ marginTop: "2px" }}
//             />
//           )}
//           <div className="flex-grow-1">
//             <div
//               style={{
//                 display: "-webkit-box",
//                 WebkitLineClamp: "1",
//                 WebkitBoxOrient: "vertical",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 marginBottom: "4px",
//               }}
//             >
//               {content}
//             </div>
//             <button
//               onClick={handleViewMore}
//               className="btn btn-link btn-sm p-0"
//               style={{
//                 fontSize: "0.7rem",
//                 textDecoration: "none",
//                 lineHeight: "1",
//               }}
//             >
//               <Eye size={11} className="me-1" />
//               විස්තර බලන්න
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const loadHistory = async () => {
//     try {
//       if (!user.district) return;

//       const submissions = await api.getSubmissionsByDistrict(user.district);
//       const history = [];

//       submissions.forEach((submission) => {
//         submission.borrowers.forEach((borrower) => {
//           // ⭐ Show ALL cases that were approved for district
//           // Including those with and without legal officer assignment
//           if (borrower.approvedForDistrict === true) {
//             history.push({
//               ...borrower,
//               submissionId: submission.id,
//               societyName: submission.societyName,
//               districtName: submission.districtName,
//               submittedDate: submission.submittedDate,
//             });
//           }
//         });
//       });

//       // Sort by latest activity (judgment > legal assignment > approval date)
//       history.sort((a, b) => {
//         const dateA = new Date(
//           a.judgmentDate ||
//             a.legalAssignmentDate ||
//             a.approvedForDistrictDate ||
//             0
//         );
//         const dateB = new Date(
//           b.judgmentDate ||
//             b.legalAssignmentDate ||
//             b.approvedForDistrictDate ||
//             0
//         );
//         return dateB - dateA;
//       });

//       setHistoryData(history);
//       console.log("✅ District legal cases history loaded:", history.length);
//     } catch (err) {
//       console.error("❌ Error loading history:", err);
//     }
//   };

//   // Function to open payment details modal
//   const handleShowPaymentDetails = (borrower) => {
//     setSelectedPaymentHistory({
//       borrowerName: borrower.borrowerName,
//       arbitrationNumber: borrower.arbitrationNumber,
//       payments: borrower.courtPayments,
//     });
//     setShowPaymentDetailsModal(true);
//   };

//   // Helper function to calculate total
//   const calculateTotal = (payments) => {
//     return payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
//   };

//   const generateLetter = (caseData) => {
//     const letterHTML = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset='utf-8'>
//     <title>නඩු ලිපිය</title>
//     <style>
//         @page { size: A4; margin: 2cm; }
//         body { font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif; font-size: 11pt; line-height: 1.6; }
//         .header { text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 20px; }
//         .content { margin: 20px 0; }
//         .field { margin: 10px 0; }
//         .label { font-weight: bold; }
//     </style>
// </head>
// <body>
//     <div class="header">නඩු විස්තර ලිපිය</div>
//     <div class="content">
//         <div class="field"><span class="label">තීරක අංකය:</span> ${
//           caseData.arbitrationNumber || "-"
//         }</div>
//         <div class="field"><span class="label">ණයගැතියාගේ නම:</span> ${
//           caseData.borrowerName
//         }</div>
//         <div class="field"><span class="label">ලිපිනය:</span> ${
//           caseData.borrowerAddress
//         }</div>
//         <div class="field"><span class="label">ණය අංකය:</span> ${
//           caseData.loanNumber
//         }</div>
//         <div class="field"><span class="label">ණය මුදල:</span> රු. ${parseFloat(
//           caseData.loanAmount
//         ).toLocaleString("si-LK")}</div>
//         <div class="field"><span class="label">සමිතිය:</span> ${
//           caseData.societyName
//         }</div>
//         <div class="field"><span class="label">උසාවිය:</span> ${
//           caseData.assignedCourtName || "-"
//         }</div>
//         <div class="field"><span class="label">පැවරූ දිනය:</span> ${
//           caseData.legalAssignmentDate
//             ? new Date(caseData.legalAssignmentDate).toLocaleDateString("si-LK")
//             : "-"
//         }</div>
//         ${
//           caseData.judgmentDate
//             ? `<div class="field"><span class="label">නඩු දිනය:</span> ${new Date(
//                 caseData.judgmentDate
//               ).toLocaleDateString("si-LK")}</div>`
//             : ""
//         }
//         ${
//           caseData.judgmentNumber
//             ? `<div class="field"><span class="label">නඩු අංකය:</span> ${caseData.judgmentNumber}</div>`
//             : ""
//         }
//         ${
//           caseData.judgmentResult
//             ? `<div class="field"><span class="label">නඩු තීන්දුව:</span> ${caseData.judgmentResult}</div>`
//             : ""
//         }
//     </div>
// </body>
// </html>`;

//     const blob = new Blob(["\ufeff", letterHTML], {
//       type: "application/msword;charset=utf-8",
//     });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `නඩු_ලිපිය_${caseData.arbitrationNumber || "document"}.doc`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//     alert("ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ");
//   };

//   const loadLegalOfficers = async () => {
//     try {
//       const data = await api.getLegalOfficersByDistrict(user.district);
//       setLegalOfficers(data);
//     } catch (err) {
//       console.error("❌ Error loading legal officers:", err);
//     }
//   };

//   const loadCourts = async () => {
//     try {
//       const data = await api.getCourtsByDistrict(user.district);
//       setCourts(data);
//     } catch (err) {
//       console.error("❌ Error loading courts:", err);
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...historyData];

//     if (searchTerm) {
//       const search = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (borrower) =>
//           borrower.borrowerName?.toLowerCase().includes(search) ||
//           borrower.arbitrationNumber?.toLowerCase().includes(search) ||
//           borrower.loanNumber?.toLowerCase().includes(search) ||
//           borrower.judgmentNumber?.toLowerCase().includes(search) ||
//           borrower.societyName?.toLowerCase().includes(search)
//       );
//     }

//     if (filterStatus !== "all") {
//       filtered = filtered.filter((borrower) => {
//         switch (filterStatus) {
//           case "assigned":
//             return borrower.assignedLegalOfficerId && !borrower.judgmentResult;
//           case "judgment":
//             return borrower.judgmentResult;
//           default:
//             return true;
//         }
//       });
//     }

//     setFilteredData(filtered);
//   };

//   const handleOpenAssignModal = (caseItem) => {
//     setSelectedCase(caseItem);
//     setSelectedLegalOfficer(caseItem.legalOfficerId || "");
//     setSelectedCourt(caseItem.courtId || "");
//     setShowAssignModal(true);
//   };

//   const handleAssignLegalOfficer = async () => {
//     if (!selectedLegalOfficer || !selectedCourt) {
//       alert("කරුණාකර උසාවි නිලධාරියා සහ උසාවිය තෝරන්න!");
//       return;
//     }

//     if (
//       !window.confirm("තෝරාගත් උසාවි නිලධාරියා	 සහ උසාවිය මෙම නඩුවට පවරන්න?")
//     ) {
//       return;
//     }

//     setAssigning(true);
//     try {
//       await api.assignLegalOfficerToBorrower(
//         selectedCase.submissionId,
//         selectedCase.borrowerId,
//         selectedLegalOfficer,
//         selectedCourt
//       );

//       alert("උසාවි නිලධාරියා	 සාර්ථකව පවරන ලදී!");
//       setShowAssignModal(false);
//       loadPaymentPendingCases();
//       loadHistory();
//     } catch (err) {
//       console.error("❌ Error assigning legal officer:", err);
//       alert("උසාවි නිලධාරියා	 පැවරීමේදී දෝෂයක් ඇති විය!");
//     } finally {
//       setAssigning(false);
//     }
//   };

//   // const getStatusBadge = (borrower) => {
//   //   if (borrower.judgmentResult) {
//   //     return (
//   //       <span className="badge bg-success">
//   //         <Gavel size={12} className="me-1" />
//   //         නඩු තීන්දුව ලබා දී ඇත
//   //       </span>
//   //     );
//   //   } else if (borrower.assignedLegalOfficerId) {
//   //     return (
//   //       <span className="badge bg-warning">
//   //         <User size={12} className="me-1" />
//   //         උසාවි නිලධාරියා	ට පවරා ඇත
//   //       </span>
//   //     );
//   //   }
//   //   return <span className="badge bg-secondary">-</span>;
//   // };

//   const getStatusBadge = (borrower) => {
//     if (borrower.judgmentResult) {
//       return (
//         <span
//           className="badge  d-flex align-items-center justify-content-center"
//           style={{
//             whiteSpace: "normal",
//             lineHeight: "1.1",
//             minWidth: "80px",
//             background: "#5be382f8",
//           }}
//         >
//           <Gavel size={12} className="me-1 flex-shrink-0" />
//           <span>
//             නඩු තීන්දුව
//             <br />
//             ලබා දී ඇත
//           </span>
//         </span>
//       );
//     } else if (borrower.assignedLegalOfficerId) {
//       return (
//         <span
//           className="badge d-flex align-items-center justify-content-center"
//           style={{
//             whiteSpace: "normal",
//             lineHeight: "1.1",
//             minWidth: "100px",
//             background: "#dbe05f",
//           }}
//         >
//           <User size={12} className="me-1 flex-shrink-0" />
//           <span>
//             උසාවි නිලධාරියා	ට
//             <br />
//             පවරා ඇත
//           </span>
//         </span>
//       );
//     }
//     return <span className="badge bg-secondary">-</span>;
//   };

//   const AssignLegalOfficerModal = () => {
//     if (!showAssignModal || !selectedCase) return null;

//     return (
//       <div
//         className="modal show d-block"
//         style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         onClick={() => setShowAssignModal(false)}
//       >
//         <div
//           className="modal-dialog modal-lg modal-dialog-centered"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="modal-content" style={{ borderRadius: "15px" }}>
//             <div
//               className="modal-header text-white"
//               style={{
//                 background: "linear-gradient(135deg, #7c3aed 0%, #b299ea 100%)",
//                 borderRadius: "15px 15px 0 0",
//               }}
//             >
//               <h5 className="modal-title fw-bold">
//                 උසාවි නිලධාරියා	 සහ උසාවිය පැවරීම
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close btn-close-white"
//                 onClick={() => setShowAssignModal(false)}
//               />
//             </div>
//             <div className="modal-body p-4">
//               <div
//                 className="alert alert-info mb-4"
//                 style={{ borderRadius: "10px" }}
//               >
//                 <h6 className="fw-bold mb-3">නඩු තොරතුරු</h6>
//                 <div className="row g-2">
//                   <div className="col-md-6">
//                     <strong>තීරක අංකය:</strong>{" "}
//                     <span className="text-primary">
//                       {selectedCase.arbitrationNumber}
//                     </span>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>ණය ගැතියා:</strong>{" "}
//                     <span>{selectedCase.borrowerName}</span>
//                   </div>
//                   <div className="col-md-6">
//                     <strong>ණය අංකය:</strong> {selectedCase.loanNumber}
//                   </div>
//                   <div className="col-md-6">
//                     <strong>සංගමය:</strong> {selectedCase.societyName}
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="form-label fw-semibold">
//                   <UserPlus size={18} className="me-2" />
//                   උසාවි නිලධාරියා	 තෝරන්න *
//                 </label>
//                 <select
//                   className="form-select"
//                   value={selectedLegalOfficer}
//                   onChange={(e) => setSelectedLegalOfficer(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <option value="">නීති නිලධාරියෙක් තෝරන්න</option>
//                   {legalOfficers.map((officer) => (
//                     <option key={officer.id} value={officer.id}>
//                       {officer.name} - {officer.designation}
//                     </option>
//                   ))}
//                 </select>
//                 {legalOfficers.length === 0 && (
//                   <small className="text-danger">
//                     මෙම දිස්ත්‍රික්කයට නීති නිලධාරීන් නොමැත
//                   </small>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="form-label fw-semibold">
//                   <Building size={18} className="me-2" />
//                   උසාවිය තෝරන්න *
//                 </label>
//                 <select
//                   className="form-select"
//                   value={selectedCourt}
//                   onChange={(e) => setSelectedCourt(e.target.value)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <option value="">උසාවියක් තෝරන්න</option>
//                   {courts.map((court) => (
//                     <option key={court.id} value={court.id}>
//                       {court.name} - {court.type}
//                     </option>
//                   ))}
//                 </select>
//                 {courts.length === 0 && (
//                   <small className="text-danger">
//                     මෙම දිස්ත්‍රික්කයට අධිකරණ නොමැත
//                   </small>
//                 )}
//               </div>

//               {selectedCase.legalOfficerId && (
//                 <div
//                   className="alert alert-warning"
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <strong>දැනට පවරා ඇත:</strong>
//                   <br />
//                   උසාවි නිලධාරියා	: {selectedCase.legalOfficerName}
//                   <br />
//                   උසාවිය: {selectedCase.courtName}
//                 </div>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setShowAssignModal(false)}
//                 style={{ borderRadius: "10px" }}
//               >
//                 <XCircle size={16} className="me-2" />
//                 අවලංගු කරන්න
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleAssignLegalOfficer}
//                 disabled={!selectedLegalOfficer || !selectedCourt || assigning}
//                 style={{ borderRadius: "10px" }}
//               >
//                 {assigning ? (
//                   <>
//                     <span
//                       className="spinner-border spinner-border-sm me-2"
//                       role="status"
//                     />
//                     පවරමින්...
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle size={16} className="me-2" />
//                     පවරන්න
//                   </>
//                 )}
//               </button>
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
//       <div className="mb-4">
//         <h2 className="fw-bold">
//           නීති නිලධාරීන්ට පැවරීමට අපේක්ෂිත (නීති කටයුතු සඳහා)
//         </h2>
//         <p className="text-muted">
//           තීරකකරණයෙන් පසුව නිසි පරිදි ගෙවීම් සිදු නොකළ ණයගැතියන් - නීති
//           නිලධාරීන්ට පැවරීමට
//         </p>
//       </div>
//       {/* Tabs */}
//       {/* <ul
//         className="nav nav-tabs mb-4"
//         style={{ borderBottom: "2px solid #dee2e6" }}
//       >
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
//             onClick={() => setActiveTab("pending")}
//             style={{
//               borderRadius: "10px 10px 0 0",
//               fontWeight: activeTab === "pending" ? "bold" : "normal",
//               backgroundColor: activeTab === "pending" ? "#fff" : "transparent",
//               border: activeTab === "pending" ? "2px solid #dee2e6" : "none",
//               borderBottom: activeTab === "pending" ? "2px solid #fff" : "none",
//               marginBottom: "-2px",
//             }}
//           >
//             <AlertCircle size={18} className="me-2" />
//             නීති නිලධාරීන්ට පැවරීමට ඇති ({paymentPendingCases.length})
//           </button>
//         </li>
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === "history" ? "active" : ""}`}
//             onClick={() => setActiveTab("history")}
//             style={{
//               borderRadius: "10px 10px 0 0",
//               fontWeight: activeTab === "history" ? "bold" : "normal",
//               backgroundColor: activeTab === "history" ? "#fff" : "transparent",
//               border: activeTab === "history" ? "2px solid #dee2e6" : "none",
//               borderBottom: activeTab === "history" ? "2px solid #fff" : "none",
//               marginBottom: "-2px",
//             }}
//           >
//             <History size={18} className="me-2" />
//             නීති නිලධාරීන්ට පවරා ඇති ({historyData.length})
//           </button>
//         </li>
//       </ul> */}

//       <ul
//         className="nav nav-tabs mb-4"
//         style={{ borderBottom: "2px solid #dee2e6" }}
//       >
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
//             onClick={() => setActiveTab("pending")}
//             style={{
//               borderRadius: "10px 10px 0 0",
//               fontWeight: activeTab === "pending" ? "bold" : "normal",
//               backgroundColor: activeTab === "pending" ? "#fff" : "#e9d5ff",
//               color: activeTab === "pending" ? "#000" : "#7647a5",
//               border:
//                 activeTab === "pending"
//                   ? "2px solid #dee2e6"
//                   : "2px solid #e9d5ff",
//               borderBottom: activeTab === "pending" ? "2px solid #fff" : "none",
//               marginBottom: "-2px",
//               transition: "all 0.3s ease",
//             }}
//           >
//             <AlertCircle size={18} className="me-2" />
//             නීති නිලධාරීන්ට පැවරීමට ඇති ({paymentPendingCases.length})
//           </button>
//         </li>
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === "history" ? "active" : ""}`}
//             onClick={() => setActiveTab("history")}
//             style={{
//               borderRadius: "10px 10px 0 0",
//               fontWeight: activeTab === "history" ? "bold" : "normal",
//               backgroundColor: activeTab === "history" ? "#fff" : "#e9d5ff",
//               color: activeTab === "history" ? "#000" : "#7424c4",
//               border:
//                 activeTab === "history"
//                   ? "2px solid #dee2e6"
//                   : "2px solid #e9d5ff",
//               borderBottom: activeTab === "history" ? "2px solid #fff" : "none",
//               marginBottom: "-2px",
//               transition: "all 0.3s ease",
//             }}
//           >
//             <History size={18} className="me-2" />
//             නීති නිලධාරීන්ට පවරා ඇති ({historyData.length})
//           </button>
//         </li>
//       </ul>
//       {/* Pending Cases Tab */}
//       {activeTab === "pending" && (
//         <>
//           {paymentPendingCases.length === 0 ? (
//             <div
//               className="alert alert-info d-flex align-items-center"
//               style={{ borderRadius: "10px" }}
//             >
//               <AlertCircle size={18} className="me-2" />
//               පැවරීමට අපේක්ෂිත නඩු හමු නොවීය
//             </div>
//           ) : (
//             <div
//               className="card border-0 shadow-sm"
//               style={{ borderRadius: "15px" }}
//             >
//               <div
//                 className="card-header text-white"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #7c3aed 0%, #a485ec 100%)",
//                   borderRadius: "15px 15px 0 0",
//                 }}
//               >
//                 <h6 className="mb-0 fw-bold">
//                   පැවරීමට අපේක්ෂිත නඩු ({paymentPendingCases.length})
//                 </h6>
//               </div>
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0">
//                     <thead style={{ background: "#f8f9fa" }}>
//                       <tr>
//                         <th className="fw-semibold">තීරක අංකය</th>
//                         <th className="fw-semibold">ණයගැතියාගේ නම</th>
//                         <th className="fw-semibold">ලිපිනය</th>
//                         <th className="fw-semibold">ණය අංකය</th>
//                         <th className="fw-semibold">සංගමය</th>
//                         <th className="fw-semibold">අවසන් මුදල</th>
//                         <th className="fw-semibold">තීරණ දිනය</th>
//                         <th className="fw-semibold">අනුමත දිනය</th>
//                         <th className="fw-semibold">උසාවි නිලධාරියා	</th>
//                         <th className="fw-semibold">උසාවිය</th>
//                         <th className="fw-semibold">ක්‍රියාමාර්ග</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paymentPendingCases.map((caseItem) => (
//                         <tr
//                           key={`${caseItem.submissionId}-${caseItem.borrowerId}`}
//                         >
//                           <td className="fw-bold text-primary">
//                             {caseItem.arbitrationNumber}
//                           </td>
//                           <td>
//                             <strong>{caseItem.borrowerName}</strong>
//                           </td>
//                           <td className="text-muted small">
//                             {caseItem.borrowerAddress}
//                           </td>
//                           <td>{caseItem.loanNumber}</td>
//                           <td className="text-muted">{caseItem.societyName}</td>
//                           <td className="fw-bold text-success">
//                             රු.{" "}
//                             {parseFloat(
//                               caseItem.finalLoanAmount
//                             ).toLocaleString("si-LK")}
//                           </td>
//                           <td>
//                             {caseItem.decisionDate
//                               ? new Date(
//                                   caseItem.decisionDate
//                                 ).toLocaleDateString("si-LK")
//                               : "-"}
//                           </td>
//                           <td>
//                             {caseItem.approvedForDistrictDate
//                               ? new Date(
//                                   caseItem.approvedForDistrictDate
//                                 ).toLocaleDateString("si-LK")
//                               : "-"}
//                           </td>
//                           <td>
//                             {caseItem.legalOfficerName ? (
//                               <span className="badge bg-success">
//                                 {caseItem.legalOfficerName}
//                               </span>
//                             ) : (
//                               <span className="badge bg-secondary">
//                                 පවරා නැත
//                               </span>
//                             )}
//                           </td>
//                           <td>
//                             {caseItem.courtName ? (
//                               <span className="text-info small">
//                                 {caseItem.courtName}
//                               </span>
//                             ) : (
//                               <span className="text-muted small">-</span>
//                             )}
//                           </td>
//                           <td>
//                             <div className="btn-group" role="group">
//                               <button
//                                 onClick={() => handleOpenAssignModal(caseItem)}
//                                 className="btn btn-sm btn-primary"
//                                 style={{ borderRadius: "8px 0 0 8px" }}
//                                 title="උසාවි නිලධාරියා	 පැවරීම"
//                               >
//                                 <UserPlus size={14} />
//                               </button>
//                               <button
//                                 onClick={() => {
//                                   setSelectedBorrower(caseItem);
//                                   setShowDetailsModal(true);
//                                 }}
//                                 className="btn btn-sm btn-outline-info"
//                                 style={{ borderRadius: "0 8px 8px 0" }}
//                                 title="විස්තර බලන්න"
//                               >
//                                 <Eye size={14} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               <div className="card-footer bg-light">
//                 {/* <div className="d-flex justify-content-between align-items-center">
//                   <span className="text-muted">
//                     මුළු නඩු: {paymentPendingCases.length} | නීති නිලධාරීන්ට
//                     පවරා ඇත:{" "}
//                     {paymentPendingCases.filter((c) => c.legalOfficerId).length}
//                   </span>
//                 </div> */}
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {activeTab === "history" && (
//         <>
//           {/* Search and Filters */}
//           <div
//             className="card mb-4 border shadow-sm"
//             style={{ borderRadius: "3px", borderColor: "#ddd" }}
//           >
//             <div className="card-body">
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <div className="input-group">
//                     <span
//                       className="input-group-text"
//                       style={{
//                         borderRadius: "3px 0 0 3px",
//                         background: "#f5f5f5",
//                         borderColor: "#999",
//                       }}
//                     >
//                       <Search size={18} />
//                     </span>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="නම, තීරක අංකය, ණය අංකය, නඩු අංකය හෝ සංගමය අනුව සොයන්න..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       style={{
//                         borderRadius: "0 3px 3px 0",
//                         borderColor: "#999",
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <select
//                     className="form-select"
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     style={{ borderRadius: "3px", borderColor: "#999" }}
//                   >
//                     <option value="all">සියලු තත්වයන්</option>
//                     <option value="assigned">උසාවි නිලධාරියා	ට පවරා ඇත</option>
//                     <option value="judgment">නඩු තීන්දුව ලබා දී ඇත</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {filteredData.length === 0 ? (
//             <div
//               className="d-flex align-items-center p-3"
//               style={{
//                 borderRadius: "3px",
//                 background: "#f8f8f8",
//                 border: "1px solid #ddd",
//               }}
//             >
//               <History size={18} className="me-2" />
//               {searchTerm || filterStatus !== "all"
//                 ? "සෙවුම් ප්‍රතිඵල හමු නොවීය"
//                 : "ඉතිහාස දත්ත හමු නොවීය"}
//             </div>
//           ) : (
//             <div
//               className="card border shadow-sm"
//               style={{ borderRadius: "3px", borderColor: "#ddd" }}
//             >
//               <div
//                 className="card-header"
//                 style={{
//                   background: "#f5f5f5",
//                   borderBottom: "2px solid #333",
//                   borderRadius: "0",
//                 }}
//               >
//                 <div className="d-flex justify-content-between align-items-center">
//                   <h6 className="mb-0 fw-bold" style={{ color: "#333" }}>
//                     නීති නිලධාරීන්ට පවරා ඇති ({filteredData.length})
//                   </h6>
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm("")}
//                       className="btn btn-sm btn-secondary"
//                       style={{ borderRadius: "3px" }}
//                     >
//                       සෙවුම හිස් කරන්න
//                     </button>
//                   )}
//                 </div>
//               </div>
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table
//                     className="table table-bordered mb-0"
//                     style={{ fontSize: "14px" }}
//                   >
//                     <thead
//                       style={{
//                         background: "#f5f5f5",
//                         borderBottom: "2px solid #333",
//                       }}
//                     >
//                       <tr>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           තීරක අංකය
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           නම
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           ලිපිනය
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           සංගමය
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           ණය අංකය
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           ණය මුදල
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           උසාවි නිලධාරියා
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           උසාවිය
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           ලිපිය
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           නඩු දිනය
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           නඩු අංකය
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{
//                             borderRight: "1px solid #ddd",
//                             width: "150px",
//                           }}
//                         >
//                           නඩු තීන්දුව
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{
//                             borderRight: "1px solid #ddd",
//                             width: "220px",
//                           }}
//                         >
//                           උසාවි ගෙවීම
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           නීති නිලධාරී සටහන්
//                         </th>
//                         <th
//                           className="fw-semibold"
//                           style={{ borderRight: "1px solid #ddd" }}
//                         >
//                           තත්වය
//                         </th>
//                         <th className="fw-semibold">විස්තර</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.map((borrower) => (
//                         <tr
//                           key={`${borrower.submissionId}-${borrower.id}`}
//                           style={{ borderBottom: "1px solid #ddd" }}
//                         >
//                           <td
//                             style={{
//                               borderRight: "1px solid #ddd",
//                               fontWeight: "500",
//                             }}
//                           >
//                             {borrower.arbitrationNumber}
//                           </td>
//                           <td
//                             style={{
//                               borderRight: "1px solid #ddd",
//                               fontWeight: "500",
//                             }}
//                           >
//                             {borrower.borrowerName}
//                           </td>
//                           <td
//                             className="small"
//                             style={{
//                               borderRight: "1px solid #ddd",
//                               maxWidth: "150px",
//                               color: "#666",
//                             }}
//                           >
//                             {borrower.borrowerAddress}
//                           </td>
//                           <td
//                             className="small"
//                             style={{
//                               borderRight: "1px solid #ddd",
//                               color: "#666",
//                             }}
//                           >
//                             {borrower.societyName}
//                           </td>
//                           <td style={{ borderRight: "1px solid #ddd" }}>
//                             {borrower.loanNumber}
//                           </td>
//                           <td
//                             style={{
//                               borderRight: "1px solid #ddd",
//                               fontWeight: "500",
//                             }}
//                           >
//                             රු.{" "}
//                             {parseFloat(
//                               borrower.finalLoanAmount || 0
//                             ).toLocaleString("si-LK")}
//                           </td>
//                           <td style={{ borderRight: "1px solid #ddd" }}>
//                             {borrower.assignedLegalOfficerName ? (
//                               <span
//                                 style={{
//                                   padding: "3px 8px",
//                                   background: "#e8e8e8",
//                                   borderRadius: "3px",
//                                   fontSize: "12px",
//                                   display: "inline-block",
//                                 }}
//                               >
//                                 <User size={12} className="me-1" />
//                                 {borrower.assignedLegalOfficerName}
//                               </span>
//                             ) : (
//                               <span style={{ color: "#999" }}>-</span>
//                             )}
//                           </td>
//                           <td style={{ borderRight: "1px solid #ddd" }}>
//                             {borrower.assignedCourtName ? (
//                               <span
//                                 style={{
//                                   padding: "3px 8px",
//                                   background: "#e8e8e8",
//                                   borderRadius: "3px",
//                                   fontSize: "12px",
//                                   display: "inline-block",
//                                 }}
//                               >
//                                 <Building size={12} className="me-1" />
//                                 {borrower.assignedCourtName}
//                               </span>
//                             ) : (
//                               <span style={{ color: "#999" }}>-</span>
//                             )}
//                           </td>
//                           <td
//                             className="text-center"
//                             style={{ borderRight: "1px solid #ddd" }}
//                           >
//                             <button
//                               onClick={() => generateLetter(borrower)}
//                               className="btn btn-outline-secondary btn-sm"
//                               style={{
//                                 borderRadius: "3px",
//                                 fontSize: "11px",
//                                 padding: "3px 8px",
//                               }}
//                             >
//                               <FileText size={12} className="me-1" />
//                               ලිපිය
//                             </button>
//                           </td>
//                           <td style={{ borderRight: "1px solid #ddd" }}>
//                             {borrower.judgmentDate ? (
//                               <span className="small" style={{ color: "#666" }}>
//                                 <Calendar size={12} className="me-1" />
//                                 {new Date(
//                                   borrower.judgmentDate
//                                 ).toLocaleDateString("si-LK")}
//                               </span>
//                             ) : (
//                               <span style={{ color: "#999" }}>-</span>
//                             )}
//                           </td>
//                           <td style={{ borderRight: "1px solid #ddd" }}>
//                             {borrower.judgmentNumber ? (
//                               <span style={{ fontWeight: "500" }}>
//                                 <FileText size={12} className="me-1" />
//                                 {borrower.judgmentNumber}
//                               </span>
//                             ) : (
//                               <span style={{ color: "#999" }}>-</span>
//                             )}
//                           </td>
//                           <td
//                             style={{
//                               borderRight: "1px solid #ddd",
//                               width: "150px",
//                             }}
//                           >
//                             <TableTextCell
//                               content={borrower.judgmentResult}
//                               icon={Gavel}
//                               iconColor="text-secondary"
//                               type="judgment"
//                             />
//                           </td>
//                           <td
//                             style={{
//                               borderRight: "1px solid #ddd",
//                               width: "220px",
//                             }}
//                           >
//                             {borrower.courtPayments &&
//                             borrower.courtPayments.length > 0 ? (
//                               <div className="text-center">
//                                 <div
//                                   style={{
//                                     padding: "2px 8px",
//                                     background: "#f0f0f0",
//                                     borderRadius: "3px",
//                                     marginBottom: "4px",
//                                     fontSize: "8px",
//                                   }}
//                                 >
//                                   ගෙවා ඇත
//                                 </div>
//                                 <div
//                                   className="small fw-bold"
//                                   style={{ color: "#333" }}
//                                 >
//                                   රු.{" "}
//                                   {borrower.courtPayments
//                                     .reduce(
//                                       (sum, p) =>
//                                         sum + parseFloat(p.amount || 0),
//                                       0
//                                     )
//                                     .toLocaleString("si-LK")}
//                                 </div>
//                                 <div
//                                   className="small"
//                                   style={{ fontSize: "10px", color: "#666" }}
//                                 >
//                                   ({borrower.courtPayments.length} ගෙවීම්)
//                                 </div>
//                                 <button
//                                   className="btn btn-sm btn-outline-success mt-1"
//                                   style={{
//                                     fontSize: "7px",
//                                     padding: "1px 2px",
//                                     borderRadius: "3px",
//                                   }}
//                                   onClick={() =>
//                                     handleShowPaymentDetails(borrower)
//                                   }
//                                 >
//                                   විස්තර බලන්න
//                                 </button>
//                               </div>
//                             ) : (
//                               <span
//                                 style={{
//                                   padding: "3px 8px",
//                                   background: "#f5f5f5",
//                                   borderRadius: "3px",
//                                   fontSize: "8px",
//                                   color: "#666",
//                                 }}
//                               >
//                                 ගෙවීම් නැත
//                               </span>
//                             )}
//                           </td>
//                           <td style={{ borderRight: "1px solid #ddd" }}>
//                             <TableTextCell
//                               content={borrower.legalOfficerRemarks}
//                               icon={MessageSquare}
//                               iconColor="text-secondary"
//                               type="remarks"
//                             />
//                           </td>
//                           <td style={{ borderRight: "1px solid #ddd" }}>
//                             {getStatusBadge(borrower)}
//                           </td>
//                           <td>
//                             <button
//                               onClick={() => {
//                                 setSelectedBorrower(borrower);
//                                 setShowDetailsModal(true);
//                               }}
//                               className="btn btn-outline-secondary btn-sm"
//                               style={{ borderRadius: "3px", fontSize: "12px" }}
//                             >
//                               <Eye size={12} className="me-1" />
//                               විස්තර
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               <div
//                 className="card-footer"
//                 style={{ background: "#fafafa", borderTop: "1px solid #ddd" }}
//               >
//                 <div className="row g-3">
//                   <div className="col-md-4">
//                     <div className="text-center">
//                       <div className="fs-4 fw-bold" style={{ color: "#333" }}>
//                         {filteredData.length}
//                       </div>
//                       <div className="small" style={{ color: "#666" }}>
//                         {searchTerm || filterStatus !== "all"
//                           ? "සෙවුම් ප්‍රතිඵල"
//                           : "මුළු නඩු"}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="text-center">
//                       <div className="fs-4 fw-bold" style={{ color: "#333" }}>
//                         {
//                           filteredData.filter(
//                             (b) => b.assignedLegalOfficerId && !b.judgmentResult
//                           ).length
//                         }
//                       </div>
//                       <div className="small" style={{ color: "#666" }}>
//                         නීති නිලධාරීන්ට පවරා ඇත
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="text-center">
//                       <div className="fs-4 fw-bold" style={{ color: "#333" }}>
//                         {filteredData.filter((b) => b.judgmentResult).length}
//                       </div>
//                       <div className="small" style={{ color: "#666" }}>
//                         නඩු තීන්දු ලබා ඇත
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Payment Details Modal */}
//       {showPaymentDetailsModal && selectedPaymentHistory && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//           onClick={() => setShowPaymentDetailsModal(false)}
//         >
//           <div
//             className="modal-dialog modal-lg modal-dialog-centered"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-content" style={{ borderRadius: "15px" }}>
//               <div
//                 className="modal-header text-white"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//                   borderRadius: "15px 15px 0 0",
//                 }}
//               >
//                 <h5 className="modal-title fw-bold">
//                   <DollarSign size={20} className="me-2" />
//                   උසාවි ගෙවීම් විස්තර
//                 </h5>
//                 <button
//                   className="btn-close btn-close-white"
//                   onClick={() => setShowPaymentDetailsModal(false)}
//                 />
//               </div>

//               <div className="modal-body p-4">
//                 {/* Borrower Info */}
//                 <div className="row mb-4">
//                   <div className="col-md-6">
//                     <div className="p-3 bg-light rounded">
//                       <small className="text-muted d-block mb-1">
//                         තීරක අංකය
//                       </small>
//                       <strong className="text-primary">
//                         {selectedPaymentHistory.arbitrationNumber}
//                       </strong>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="p-3 bg-light rounded">
//                       <small className="text-muted d-block mb-1">
//                         ණයගැතියා
//                       </small>
//                       <strong>{selectedPaymentHistory.borrowerName}</strong>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Payment History Table */}
//                 <h6 className="fw-bold mb-3">ගෙවීම් ඉතිහාසය</h6>
//                 <div className="table-responsive">
//                   <table className="table table-hover table-bordered">
//                     <thead style={{ background: "#f8f9fa" }}>
//                       <tr>
//                         <th className="fw-semibold">#</th>
//                         <th className="fw-semibold">
//                           <Calendar size={14} className="me-1" />
//                           දිනය
//                         </th>
//                         <th className="fw-semibold text-end">
//                           <DollarSign size={14} className="me-1" />
//                           මුදල (රු.)
//                         </th>
//                         <th className="fw-semibold">
//                           <User size={14} className="me-1" />
//                           එකතු කළ අය
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedPaymentHistory.payments.map((payment, index) => (
//                         <tr key={payment.id || index}>
//                           <td className="text-center">{index + 1}</td>
//                           <td>
//                             {new Date(payment.paymentDate).toLocaleDateString(
//                               "si-LK",
//                               {
//                                 year: "numeric",
//                                 month: "long",
//                                 day: "numeric",
//                               }
//                             )}
//                           </td>
//                           <td className="text-end fw-semibold text-success">
//                             රු.{" "}
//                             {parseFloat(payment.amount).toLocaleString("si-LK")}
//                           </td>
//                           <td>
//                             <span className="badge bg-info">
//                               {payment.addedBy}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}

//                       {/* Total Row */}
//                       <tr className="table-success">
//                         <td colSpan="2" className="text-end fw-bold">
//                           මුළු ගෙවූ මුදල:
//                         </td>
//                         <td className="text-end fw-bold fs-5">
//                           රු.{" "}
//                           {calculateTotal(
//                             selectedPaymentHistory.payments
//                           ).toLocaleString("si-LK")}
//                         </td>
//                         <td></td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Summary */}
//                 <div className="alert alert-info d-flex align-items-center mt-3">
//                   <DollarSign size={18} className="me-2" />
//                   <div>
//                     <strong>මුළු ගෙවීම් ගණන:</strong>{" "}
//                     {selectedPaymentHistory.payments.length} ගෙවීම්
//                   </div>
//                 </div>
//               </div>

//               <div className="modal-footer">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setShowPaymentDetailsModal(false)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   වසන්න
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Text Details Modal */}
//       {showTextModal && modalContent && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//           onClick={() => setShowTextModal(false)}
//         >
//           <div
//             className="modal-dialog modal-lg modal-dialog-centered"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-content" style={{ borderRadius: "15px" }}>
//               <div
//                 className="modal-header text-white"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #7c3aed 0%, #a485ec 100%)",
//                   borderRadius: "15px 15px 0 0",
//                 }}
//               >
//                 <h5 className="modal-title fw-bold">
//                   {modalContent.icon && (
//                     <modalContent.icon size={20} className="me-2" />
//                   )}
//                   {modalContent.title}
//                 </h5>
//                 <button
//                   className="btn-close btn-close-white"
//                   onClick={() => setShowTextModal(false)}
//                 />
//               </div>

//               <div className="modal-body p-4">
//                 <div
//                   className="p-3 bg-light rounded"
//                   style={{
//                     fontSize: "0.95rem",
//                     lineHeight: "1.8",
//                     whiteSpace: "pre-wrap",
//                     maxHeight: "60vh",
//                     overflowY: "auto",
//                   }}
//                 >
//                   {modalContent.icon && (
//                     <modalContent.icon
//                       size={18}
//                       className={`me-2 ${modalContent.iconColor}`}
//                     />
//                   )}
//                   {modalContent.content}
//                 </div>
//               </div>

//               <div className="modal-footer">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setShowTextModal(false)}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   වසන්න
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <AssignLegalOfficerModal />
//       <BorrowerDetailsModal
//         show={showDetailsModal}
//         onClose={() => setShowDetailsModal(false)}
//         borrower={selectedBorrower}
//       />
//     </div>
//   );
// };

// export default DistrictUnpaidCasesPage;

import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  Eye,
  UserPlus,
  Building,
  CheckCircle,
  XCircle,
  History,
  Gavel,
  Calendar,
  FileText,
  User,
  Search,
  DollarSign,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

const DistrictUnpaidCasesPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("pending");
  const [paymentPendingCases, setPaymentPendingCases] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [legalOfficers, setLegalOfficers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [selectedLegalOfficer, setSelectedLegalOfficer] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [selectedPaymentHistory, setSelectedPaymentHistory] = useState(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
    icon: null,
  });

  useEffect(() => {
    loadPaymentPendingCases();
    loadHistory();
    loadLegalOfficers();
    loadCourts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterStatus, historyData]);

  const loadPaymentPendingCases = async () => {
    try {
      if (!user.district) {
        console.error("❌ No district found!");
        return;
      }

      const data = await api.getPaymentPendingCases(user.district);
      setPaymentPendingCases(data);
      console.log("✅ Payment pending cases loaded:", data.length);
    } catch (err) {
      console.error("❌ Error loading payment pending cases:", err);
      try {
        console.log("📝 Trying alternate method...");
        const submissions = await api.getSubmissionsByDistrict(user.district);
        const pendingCases = [];

        submissions.forEach((submission) => {
          submission.borrowers.forEach((borrower) => {
            if (
              borrower.status === "payment-pending" &&
              borrower.approvedForDistrict === true
            ) {
              pendingCases.push({
                ...borrower,
                submissionId: submission.id,
                societyName: submission.societyName,
                districtName: submission.districtName,
              });
            }
          });
        });

        setPaymentPendingCases(pendingCases);
        console.log(
          "✅ Payment pending cases loaded (alternate):",
          pendingCases.length
        );
      } catch (alternateErr) {
        console.error("❌ Alternate method also failed:", alternateErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const TableTextCell = ({ content, icon: Icon, iconColor, type }) => {
    if (!content) {
      return <span className="text-muted">-</span>;
    }

    const handleViewMore = () => {
      setModalContent({
        title: type === "judgment" ? "නඩු තීන්දුව" : "නීති නිලධාරී සටහන්",
        content: content,
        icon: Icon,
        iconColor: iconColor,
      });
      setShowTextModal(true);
    };

    return (
      <div
        className="p-2 bg-light"
        style={{
          borderRadius: "6px",
          maxWidth: type === "judgment" ? "190px" : "250px",
          fontSize: "0.85rem",
        }}
      >
        <div className="d-flex align-items-start">
          {Icon && (
            <Icon
              size={14}
              className={`me-2 ${iconColor} flex-shrink-0`}
              style={{ marginTop: "2px" }}
            />
          )}
          <div className="flex-grow-1">
            <div
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: "4px",
              }}
            >
              {content}
            </div>
            <button
              onClick={handleViewMore}
              className="btn btn-link btn-sm p-0"
              style={{
                fontSize: "0.7rem",
                textDecoration: "none",
                lineHeight: "1",
              }}
            >
              <Eye size={11} className="me-1" />
              විස්තර බලන්න
            </button>
          </div>
        </div>
      </div>
    );
  };

  const loadHistory = async () => {
    try {
      if (!user.district) return;

      const submissions = await api.getSubmissionsByDistrict(user.district);
      const history = [];

      submissions.forEach((submission) => {
        submission.borrowers.forEach((borrower) => {
          if (borrower.approvedForDistrict === true) {
            history.push({
              ...borrower,
              submissionId: submission.id,
              societyName: submission.societyName,
              districtName: submission.districtName,
              submittedDate: submission.submittedDate,
            });
          }
        });
      });

      history.sort((a, b) => {
        const dateA = new Date(
          a.judgmentDate ||
            a.legalAssignmentDate ||
            a.approvedForDistrictDate ||
            0
        );
        const dateB = new Date(
          b.judgmentDate ||
            b.legalAssignmentDate ||
            b.approvedForDistrictDate ||
            0
        );
        return dateB - dateA;
      });

      setHistoryData(history);
      console.log("✅ District legal cases history loaded:", history.length);
    } catch (err) {
      console.error("❌ Error loading history:", err);
    }
  };

  const handleShowPaymentDetails = (borrower) => {
    setSelectedPaymentHistory({
      borrowerName: borrower.borrowerName,
      arbitrationNumber: borrower.arbitrationNumber,
      payments: borrower.courtPayments,
    });
    setShowPaymentDetailsModal(true);
  };

  const calculateTotal = (payments) => {
    return payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
  };

  //   const generateLetter = (caseData) => {
  //     const letterHTML = `
  // <!DOCTYPE html>
  // <html>
  // <head>
  //     <meta charset='utf-8'>
  //     <title>නඩු ලිපිය</title>
  //     <style>
  //         @page { size: A4; margin: 2cm; }
  //         body { font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif; font-size: 11pt; line-height: 1.6; }
  //         .header { text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 20px; }
  //         .content { margin: 20px 0; }
  //         .field { margin: 10px 0; }
  //         .label { font-weight: bold; }
  //     </style>
  // </head>
  // <body>
  //     <div class="header">නඩු විස්තර ලිපිය</div>
  //     <div class="content">
  //         <div class="field"><span class="label">තීරක අංකය:</span> ${
  //           caseData.arbitrationNumber || "-"
  //         }</div>
  //         <div class="field"><span class="label">ණයගැතියාගේ නම:</span> ${
  //           caseData.borrowerName
  //         }</div>
  //         <div class="field"><span class="label">ලිපිනය:</span> ${
  //           caseData.borrowerAddress
  //         }</div>
  //         <div class="field"><span class="label">ණය අංකය:</span> ${
  //           caseData.loanNumber
  //         }</div>
  //         <div class="field"><span class="label">ණය මුදල:</span> රු. ${parseFloat(
  //           caseData.loanAmount
  //         ).toLocaleString("si-LK")}</div>
  //         <div class="field"><span class="label">සමිතිය:</span> ${
  //           caseData.societyName
  //         }</div>
  //         <div class="field"><span class="label">උසාවිය:</span> ${
  //           caseData.assignedCourtName || "-"
  //         }</div>
  //         <div class="field"><span class="label">පැවරූ දිනය:</span> ${
  //           caseData.legalAssignmentDate
  //             ? new Date(caseData.legalAssignmentDate).toLocaleDateString("si-LK")
  //             : "-"
  //         }</div>
  //         ${
  //           caseData.judgmentDate
  //             ? `<div class="field"><span class="label">නඩු දිනය:</span> ${new Date(
  //                 caseData.judgmentDate
  //               ).toLocaleDateString("si-LK")}</div>`
  //             : ""
  //         }
  //         ${
  //           caseData.judgmentNumber
  //             ? `<div class="field"><span class="label">නඩු අංකය:</span> ${caseData.judgmentNumber}</div>`
  //             : ""
  //         }
  //         ${
  //           caseData.judgmentResult
  //             ? `<div class="field"><span class="label">නඩු තීන්දුව:</span> ${caseData.judgmentResult}</div>`
  //             : ""
  //         }
  //     </div>
  // </body>
  // </html>`;

  //     const blob = new Blob(["\ufeff", letterHTML], {
  //       type: "application/msword;charset=utf-8",
  //     });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `නඩු_ලිපිය_${caseData.arbitrationNumber || "document"}.doc`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(url);
  //     alert("ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ");
  //   };

  const generateLetter = (caseData) => {
    const currentDate = new Date().toLocaleDateString("en-GB");

    const loanAmount = parseFloat(
      caseData.proposedLoanBalance || caseData.outstandingLoanAmount || 0
    );
    const interest = parseFloat(
      caseData.proposedLoanInterest || caseData.interest || 0
    );
    const stationeryFees = parseFloat(caseData.stationeryFees || 0);
    const deductLoan = parseFloat(caseData.deductionsFromLoanAmount || 0);
    const deductInterest = parseFloat(
      caseData.deductionsFromInterestAmount || 0
    );
    const courtCharges = parseFloat(caseData.courtCharges || 0);
    const rebateDeductions = parseFloat(caseData.rebateDeductions || 0);
    const bondAndInterest = parseFloat(caseData.bondAndInterest || 0);
    const otherRebate = parseFloat(caseData.otherRebateDeductions || 0);
    const totalDeductions =
      deductLoan +
      deductInterest +
      courtCharges +
      rebateDeductions +
      bondAndInterest +
      otherRebate;
    const subtotal = loanAmount + interest + stationeryFees;
    const forwardInterest = parseFloat(caseData.forwardInterest || 0);
    const remainingAmount = subtotal - totalDeductions;
    const totalClaim = remainingAmount + forwardInterest;

    const letterHTML = `<!DOCTYPE html>
<html lang="si">
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: A4; margin: 0.5in 0.6in; }
    body { font-family: 'FM Abhaya', 'Noto Sans Sinhala', Arial, sans-serif; font-size: 9pt; line-height: 1.3; margin: 0; padding: 0; }
    .header-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 9pt; }
    .title { text-align: center; font-weight: bold; margin: 10px 0 12px 0; font-size: 10pt; text-decoration: underline; }
    .content { text-align: justify; margin: 6px 0; font-size: 9pt; line-height: 1.35; }
    .section-header { text-align: center; font-weight: bold; margin: 2px 0 2px 0; font-size: 9pt; }
    .financial-table { width: 100%; margin: 2px 0; border-collapse: collapse; font-size: 9pt; }
    .financial-table td { padding: 0px 4px; border: none; line-height: 1.05; }
    .financial-table .label { width: 60%; text-align: left; }
    .financial-table .currency { width: 10%; text-align: left; }
    .financial-table .value { width: 30%; border-bottom: 1px dotted #666; text-align: right; }
    .total-row { font-weight: bold; border-top: 1px solid #000; }
    .guarantor-list { margin: 8px 0 8px 20px; font-size: 9pt; line-height: 1.4; }
    .guarantor-item { margin: 4px 0; }
    .signature-section { margin-top: 20px; font-size: 9pt; }
    .signature-row { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 10px; }
    .copies-section { margin-top: 15px; font-size: 8.5pt; line-height: 1.3; }
    .copies-section p { margin: 2px 0; }
    p { margin: 4px 0; }
  </style>
</head>
<body>
  <div class="header-row">
    <div>තීරක අංකය: ${
      caseData.arbitrationNumber || "..................................."
    }</div>
    <div>නඩු අංකය: ${
      caseData.judgmentNumber ||
      ".................................................."
    }</div>
  </div>
  <div class="content">
    <p>1993අංක 04 දරණ සමුපකාර සමිති (සංශෝධිත) ප්‍රඥ්ප්තියෙන් සංශෝධිත මධ්‍යම පළාත් සභාවේ 1990 අංක 10 දරණ සමුපකාර සමිති ප්‍රඥ්ප්තියෙන් 59 (1) ඇ වගන්තිය යටතේ නිකුත් කරනු ලබන</p>
  </div>
  <div class="title">තීරක තීන්දු සහතිකය</div>
  <div class="content">
    <p>${
      caseData.assignedCourtName || "....................."
    } මහෙස්ත්‍රාත්තුමා වෙතටයි,</p>
    <p>1993අංක 04 දරණ සමුපකාර සමිති (සංශෝධිත) ප්‍රඥ්ප්තියෙන් සංශෝධිත මධ්‍යම පළාත් සභාවේ 1990 අංක 10 දරණ සමුපකාර සමිති ප්‍රඥ්ප්තියෙන් 59 (1) ඇ වගන්තියෙන් මධ්‍යම පළාත් සභාවේ සමිති රෙජිස්ටාර් වෙත පැවරුණු බලතල අනුව හා අංක 2258/55 හා ${
      caseData.legalAssignmentDate
        ? new Date(caseData.legalAssignmentDate).toLocaleDateString("en-GB")
        : "......................."
    } දිනැති ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රීක සමාජවාදී ජනරජයේ ගැසට් පත්‍රයේ සඳහන් නිවේදනයෙන් සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස් ${
      caseData.user?.name || "................................."
    } වන ම වෙත පැවරී ඇති බලතල ප්‍රකාරව මෙසේ සහතික කරමි. ඉහත කී සමුපකාර සමිති ප්‍රඥ්ප්තිය යටතේ ${
      caseData.decisionDate
        ? new Date(caseData.decisionDate).toLocaleDateString("en-GB")
        : "................................."
    } වෙනි දින ලබා දී ඇත්තා වූ ද, මීට අමුණා ඇති තීරක තීන්දුව අනුව</p>
  </div>
  <table class="financial-table">
    <tr><td class="label">මුල් මුදල</td><td class="currency">රු :</td><td class="value">${loanAmount.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
    <tr><td class="label">පොළිය</td><td class="currency">රු :</td><td class="value">${interest.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
    <tr><td class="label">බේරුම්කරණ වියදම්</td><td class="currency">රු :</td><td class="value">${stationeryFees.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
    <tr class="total-row"><td class="label">එකතුව</td><td class="currency">රු:</td><td class="value">${subtotal.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
  </table>
  <div class="section-header">අඩුකිරීම්</div>
  <table class="financial-table">
    <tr><td class="label">මුල් මුදලින්</td><td class="currency">රු :</td><td class="value">${deductLoan.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
    <tr><td class="label">පොළිය</td><td class="currency">රු :</td><td class="value">${deductInterest.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
    <tr><td class="label">නඩු ගාස්තු</td><td class="currency">රු :</td><td class="value">${courtCharges.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
    <tr><td class="label">හිලව් කිරීම්</td><td class="currency">රු :</td><td class="value">${rebateDeductions.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
    <tr><td class="label">ඇප හා පොළිය</td><td class="currency">රු :</td><td class="value">${bondAndInterest.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
    <tr><td class="label">වෙනත් හිලව් කිරීම්</td><td class="currency">රු :</td><td class="value">${otherRebate.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
    <tr class="total-row"><td class="label">එකතුව</td><td class="currency">රු :</td><td class="value">${totalDeductions.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
  </table>
  <table class="financial-table" style="margin-top: 2px;">
    <tr><td class="label">${
      caseData.decisionDate
        ? new Date(caseData.decisionDate).toLocaleDateString("en-GB")
        : "................"
    } දින සිට ${currentDate} දින දක්වා මුල් මුදලට ${
      caseData.forwardInterestRate || "..."
    }% බැගින් පොළිය</td><td class="currency">රු :</td><td class="value">${forwardInterest.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
    <tr class="total-row"><td class="label">අයවීමට ඇති මුදල</td><td class="currency">රු :</td><td class="value">${totalClaim.toLocaleString(
      "en-US",
      { minimumFractionDigits: 2 }
    )}</td></tr>
  </table>
  <div class="content" style="margin-top: 6px;">
    <p>එකී මුදල පහත සඳහන් විත්තිකරුවන්ගෙන් අයවීමට ඇත.</p>
  </div>
  <table style="width: 100%; margin: 8px 0; border-collapse: collapse; font-size: 9pt;">
    <tr>
      <td style="width: 48%; vertical-align: top; padding-right: 20px;">
        <div style="margin-bottom: 5px;"><strong>විත්තිකරු</strong></div>
        <div style="margin: 3px 0;">1. ${
          caseData.guarantor1Name || "................................."
        }</div>
        <div style="margin: 3px 0;">2. ${
          caseData.guarantor2Name || "................................."
        }</div>
        <div style="margin: 3px 0;">3. ${
          caseData.borrowerName || "................................."
        }</div>
      </td>
      <td style="width: 52%; vertical-align: top; padding-left: 20px;">
        <div style="margin-bottom: 5px;"><strong>පදිංචි ලිපිනය</strong></div>
        <div style="margin: 3px 0;">${
          caseData.guarantor1Address || "................................."
        }</div>
        <div style="margin: 3px 0;">${
          caseData.guarantor2Address || "................................."
        }</div>
        <div style="margin: 3px 0;">${
          caseData.borrowerAddress || "................................."
        }</div>
      </td>
    </tr>
  </table>
  <div class="content" style="margin-top: 12px;">
    <p>මෙම අයවිය යුතු මුදලින් කිසිවක් ගෙවා නොමැති බැවින් ඉහත සඳහන් ප්‍රඥප්තියේ 59(4) වගන්තිය අනුව එකී මුදල් අයකර ම වෙත එවන මෙන් ඉල්ලමි.</p>
  </div>
  <div class="signature-section">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 35%; vertical-align: top;">
          <p>...................................</p>
          <p>දිනය</p>
        </td>
        <td style="width: 65%; vertical-align: top; text-align: center;">
          <p>...................................</p>
          <p>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස්</p>
          <p style="margin-top: 5px;">මධ්‍යම පළාත</p>
        </td>
      </tr>
    </table>
  </div>
  <div class="copies-section">
    <p><strong>පිටපත් විත්තිකරුවන්ට ප්‍රඥප්තියේ 59(4) වගන්තිය යටතේ,</strong></p>
    <p>1. ${caseData.guarantor1Name || "..........."}</p>
    <p>2. ${caseData.guarantor2Name || "..........."}</p>
    <p>3. ${caseData.borrowerName || "................"}</p>
    <br/>
    <p><strong>පැමිණිලිකරු</strong></p>
    <p>1. ${caseData.societyName || "society name"}</p>
    <p>2. උසාවි නිලධාරි</p>
    <p>3. කාර්යාල පිටපත</p>
  </div>
</body>
</html>`;

    const blob = new Blob(["\ufeff", letterHTML], {
      type: "application/msword;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `තීරක_තීන්දු_සහතිකය_${
      caseData.arbitrationNumber || "document"
    }.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    const printWindow = window.open("", "_blank");
    printWindow.document.write(letterHTML);
    printWindow.document.close();

    alert("තීරක තීන්දු සහතිකය Word ලියවිල්ලක් ලෙස බාගත වේ");
  };

  const loadLegalOfficers = async () => {
    try {
      const data = await api.getLegalOfficersByDistrict(user.district);
      setLegalOfficers(data);
    } catch (err) {
      console.error("❌ Error loading legal officers:", err);
    }
  };

  const loadCourts = async () => {
    try {
      const data = await api.getCourtsByDistrict(user.district);
      setCourts(data);
    } catch (err) {
      console.error("❌ Error loading courts:", err);
    }
  };

  const applyFilters = () => {
    let filtered = [...historyData];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (borrower) =>
          borrower.borrowerName?.toLowerCase().includes(search) ||
          borrower.arbitrationNumber?.toLowerCase().includes(search) ||
          borrower.loanNumber?.toLowerCase().includes(search) ||
          borrower.judgmentNumber?.toLowerCase().includes(search) ||
          borrower.societyName?.toLowerCase().includes(search)
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((borrower) => {
        switch (filterStatus) {
          case "assigned":
            return borrower.assignedLegalOfficerId && !borrower.judgmentResult;
          case "judgment":
            return borrower.judgmentResult;
          default:
            return true;
        }
      });
    }

    setFilteredData(filtered);
  };

  const handleOpenAssignModal = (caseItem) => {
    setSelectedCase(caseItem);
    setSelectedLegalOfficer(caseItem.legalOfficerId || "");
    setSelectedCourt(caseItem.courtId || "");
    setShowAssignModal(true);
  };

  const handleAssignLegalOfficer = async () => {
    if (!selectedLegalOfficer || !selectedCourt) {
      alert("කරුණාකර උසාවි නිලධාරියා	 සහ උසාවිය තෝරන්න!");
      return;
    }

    if (
      !window.confirm("තෝරාගත් උසාවි නිලධාරියා	 සහ උසාවිය මෙම නඩුවට පවරන්න?")
    ) {
      return;
    }

    setAssigning(true);
    try {
      await api.assignLegalOfficerToBorrower(
        selectedCase.submissionId,
        selectedCase.borrowerId,
        selectedLegalOfficer,
        selectedCourt
      );

      alert("උසාවි නිලධාරියා	 සාර්ථකව පවරන ලදී!");
      setShowAssignModal(false);
      loadPaymentPendingCases();
      loadHistory();
    } catch (err) {
      console.error("❌ Error assigning legal officer:", err);
      alert("උසාවි නිලධාරියා	 පැවරීමේදී දෝෂයක් ඇති විය!");
    } finally {
      setAssigning(false);
    }
  };

  const getStatusBadge = (borrower) => {
    if (borrower.judgmentResult) {
      return (
        <span
          className="badge  d-flex align-items-center justify-content-center"
          style={{
            whiteSpace: "normal",
            lineHeight: "1.1",
            minWidth: "80px",
            fontSize: "10px !important",
            background: "linear-gradient(135deg, #24af7c 0%, #6cd6a3 100%)",
            padding: "4px 6px",
          }}
        >
          <Gavel size={10} className="me-1 flex-shrink-0" />
          <span style={{ fontSize: "10px" }}>
            නඩු තීන්දුව
            <br />
            ලබා දී ඇත
          </span>
        </span>
      );
    } else if (borrower.assignedLegalOfficerId) {
      return (
        <span
          className="badge d-flex align-items-center justify-content-center"
          style={{
            whiteSpace: "normal",
            lineHeight: "1.1",
            minWidth: "100px",
            fontSize: "10px !important",
            background: "linear-gradient(135deg, #bcae17 0%, #f0f47d 100%)",
            padding: "4px 6px",
          }}
        >
          <User size={10} className="me-1 flex-shrink-0" />
          <span style={{ fontSize: "10px" }}>
            උසාවි නිලධාරියා ට
            <br />
            පවරා ඇත
          </span>
        </span>
      );
    }
    return <span className="badge bg-secondary">-</span>;
  };

  const AssignLegalOfficerModal = () => {
    if (!showAssignModal || !selectedCase) return null;

    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={() => setShowAssignModal(false)}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content" style={{ borderRadius: "15px" }}>
            <div
              className="modal-header text-white"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #b299ea 100%)",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <h5 className="modal-title fw-bold">
                උසාවි නිලධාරියා සහ උසාවිය පැවරීම
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowAssignModal(false)}
              />
            </div>
            <div className="modal-body p-4">
              <div
                className="alert alert-info mb-4"
                style={{ borderRadius: "10px" }}
              >
                <h6 className="fw-bold mb-3">නඩු තොරතුරු</h6>
                <div className="row g-2">
                  <div className="col-md-6">
                    <strong>තීරක අංකය:</strong>{" "}
                    <span className="text-primary">
                      {selectedCase.arbitrationNumber}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <strong>ණය ගැතියා:</strong>{" "}
                    <span>{selectedCase.borrowerName}</span>
                  </div>
                  <div className="col-md-6">
                    <strong>ණය අංකය:</strong> {selectedCase.loanNumber}
                  </div>
                  <div className="col-md-6">
                    <strong>සංගමය:</strong> {selectedCase.societyName}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <UserPlus size={18} className="me-2" />
                  උසාවි නිලධාරියා තෝරන්න *
                </label>
                <select
                  className="form-select"
                  value={selectedLegalOfficer}
                  onChange={(e) => setSelectedLegalOfficer(e.target.value)}
                  style={{ borderRadius: "10px" }}
                >
                  <option value="">නීති නිලධාරියෙක් තෝරන්න</option>
                  {legalOfficers.map((officer) => (
                    <option key={officer.id} value={officer.id}>
                      {officer.name} - {officer.designation}
                    </option>
                  ))}
                </select>
                {legalOfficers.length === 0 && (
                  <small className="text-danger">
                    මෙම දිස්ත්‍රික්කයට නීති නිලධාරීන් නොමැත
                  </small>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <Building size={18} className="me-2" />
                  උසාවිය තෝරන්න *
                </label>
                <select
                  className="form-select"
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  style={{ borderRadius: "10px" }}
                >
                  <option value="">උසාවියක් තෝරන්න</option>
                  {courts.map((court) => (
                    <option key={court.id} value={court.id}>
                      {court.name} - {court.type}
                    </option>
                  ))}
                </select>
                {courts.length === 0 && (
                  <small className="text-danger">
                    මෙම දිස්ත්‍රික්කයට අධිකරණ නොමැත
                  </small>
                )}
              </div>

              {selectedCase.legalOfficerId && (
                <div
                  className="alert alert-warning"
                  style={{ borderRadius: "10px" }}
                >
                  <strong>දැනට පවරා ඇත:</strong>
                  <br />
                  උසාවි නිලධාරියා : {selectedCase.legalOfficerName}
                  <br />
                  උසාවිය: {selectedCase.courtName}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowAssignModal(false)}
                style={{ borderRadius: "10px" }}
              >
                <XCircle size={16} className="me-2" />
                අවලංගු කරන්න
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAssignLegalOfficer}
                disabled={!selectedLegalOfficer || !selectedCourt || assigning}
                style={{ borderRadius: "10px" }}
              >
                {assigning ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    පවරමින්...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="me-2" />
                    පවරන්න
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">
          නීති නිලධාරීන්ට පැවරීමට අපේක්ෂිත (නීති කටයුතු සඳහා)
        </h2>
        <p className="text-muted">
          තීරකකරණයෙන් පසුව නිසි පරිදි ගෙවීම් සිදු නොකළ ණයගැතියන් - නීති
          නිලධාරීන්ට පැවරීමට
        </p>
      </div>

      <ul
        className="nav nav-tabs mb-4"
        style={{ borderBottom: "2px solid #dee2e6" }}
      >
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
            style={{
              borderRadius: "10px 10px 0 0",
              fontWeight: activeTab === "pending" ? "bold" : "normal",
              backgroundColor: activeTab === "pending" ? "#fff" : "#e9d5ff",
              color: activeTab === "pending" ? "#000" : "#7647a5",
              border:
                activeTab === "pending"
                  ? "2px solid #dee2e6"
                  : "2px solid #e9d5ff",
              borderBottom: activeTab === "pending" ? "2px solid #fff" : "none",
              marginBottom: "-2px",
              transition: "all 0.3s ease",
            }}
          >
            <AlertCircle size={18} className="me-2" />
            නීති නිලධාරීන්ට පැවරීමට ඇති ({paymentPendingCases.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
            style={{
              borderRadius: "10px 10px 0 0",
              fontWeight: activeTab === "history" ? "bold" : "normal",
              backgroundColor: activeTab === "history" ? "#fff" : "#e9d5ff",
              color: activeTab === "history" ? "#000" : "#7424c4",
              border:
                activeTab === "history"
                  ? "2px solid #dee2e6"
                  : "2px solid #e9d5ff",
              borderBottom: activeTab === "history" ? "2px solid #fff" : "none",
              marginBottom: "-2px",
              transition: "all 0.3s ease",
            }}
          >
            <History size={18} className="me-2" />
            නීති නිලධාරීන්ට පවරා ඇති ({historyData.length})
          </button>
        </li>
      </ul>

      {activeTab === "pending" && (
        <>
          {paymentPendingCases.length === 0 ? (
            <div
              className="alert alert-info d-flex align-items-center"
              style={{ borderRadius: "10px" }}
            >
              <AlertCircle size={18} className="me-2" />
              නීති නිලධාරීන්ට පැවරීමට ඇති ණයගැතියන් හමු නොවීය.
            </div>
          ) : (
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "15px" }}
            >
              <div
                className="card-header text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #a485ec 100%)",
                  borderRadius: "15px 15px 0 0",
                }}
              >
                <h6 className="mb-0 fw-bold">
                  නීති නිලධාරීන්ට පැවරීමට අපේක්ෂිත ({paymentPendingCases.length}
                  )
                </h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead style={{ background: "#f8f9fa" }}>
                      <tr>
                        <th className="fw-semibold">තීරක අංකය</th>
                        <th className="fw-semibold">ණයගැතියාගේ නම</th>
                        <th className="fw-semibold">ලිපිනය</th>
                        <th className="fw-semibold">ණය අංකය</th>
                        <th className="fw-semibold">සංගමය</th>
                        <th className="fw-semibold">අවසන් මුදල</th>
                        <th className="fw-semibold">තීරණ දිනය</th>
                        <th className="fw-semibold">අනුමත දිනය</th>
                        <th className="fw-semibold">උසාවි නිලධාරියා </th>
                        <th className="fw-semibold">උසාවිය</th>
                        <th className="fw-semibold">ක්‍රියාමාර්ග</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentPendingCases.map((caseItem) => (
                        <tr
                          key={`${caseItem.submissionId}-${caseItem.borrowerId}`}
                        >
                          <td className="fw-bold text-primary">
                            {caseItem.arbitrationNumber}
                          </td>
                          <td>
                            <strong>{caseItem.borrowerName}</strong>
                          </td>
                          <td className="text-muted small">
                            {caseItem.borrowerAddress}
                          </td>
                          <td>{caseItem.loanNumber}</td>
                          <td className="text-muted">{caseItem.societyName}</td>
                          <td className="fw-bold text-success">
                            රු.{" "}
                            {parseFloat(
                              caseItem.finalLoanAmount
                            ).toLocaleString("si-LK")}
                          </td>
                          <td>
                            {caseItem.decisionDate
                              ? new Date(
                                  caseItem.decisionDate
                                ).toLocaleDateString("si-LK")
                              : "-"}
                          </td>
                          <td>
                            {caseItem.approvedForDistrictDate
                              ? new Date(
                                  caseItem.approvedForDistrictDate
                                ).toLocaleDateString("si-LK")
                              : "-"}
                          </td>
                          <td>
                            {caseItem.legalOfficerName ? (
                              <span className="badge bg-success">
                                {caseItem.legalOfficerName}
                              </span>
                            ) : (
                              <span className="badge bg-secondary">
                                පවරා නැත
                              </span>
                            )}
                          </td>
                          <td>
                            {caseItem.courtName ? (
                              <span className="text-info small">
                                {caseItem.courtName}
                              </span>
                            ) : (
                              <span className="text-muted small">-</span>
                            )}
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                onClick={() => handleOpenAssignModal(caseItem)}
                                className="btn btn-sm btn-primary"
                                style={{ borderRadius: "8px 0 0 8px" }}
                                title="උසාවි නිලධාරියා	 පැවරීම"
                              >
                                <UserPlus size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedBorrower(caseItem);
                                  setShowDetailsModal(true);
                                }}
                                className="btn btn-sm btn-outline-info"
                                style={{ borderRadius: "0 8px 8px 0" }}
                                title="විස්තර බලන්න"
                              >
                                <Eye size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer bg-light"></div>
            </div>
          )}
        </>
      )}

      {activeTab === "history" && (
        <>
          <div
            className="card mb-4 border shadow-sm"
            style={{ borderRadius: "3px", borderColor: "#ddd" }}
          >
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      style={{
                        borderRadius: "3px 0 0 3px",
                        background: "#f5f5f5",
                        borderColor: "#999",
                      }}
                    >
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="නම, තීරක අංකය, ණය අංකය, නඩු අංකය හෝ සංගමය අනුව සොයන්න..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        borderRadius: "0 3px 3px 0",
                        borderColor: "#999",
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ borderRadius: "3px", borderColor: "#999" }}
                  >
                    <option value="all">සියලු තත්වයන්</option>
                    <option value="assigned">උසාවි නිලධාරියා ට පවරා ඇත</option>
                    <option value="judgment">නඩු තීන්දුව ලබා දී ඇත</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {filteredData.length === 0 ? (
            <div
              className="d-flex align-items-center p-3"
              style={{
                borderRadius: "3px",
                background: "#f8f8f8",
                border: "1px solid #ddd",
              }}
            >
              <History size={18} className="me-2" />
              {searchTerm || filterStatus !== "all"
                ? "සෙවුම් ප්‍රතිඵල හමු නොවීය"
                : "ඉතිහාස දත්ත හමු නොවීය"}
            </div>
          ) : (
            <div
              className="card border shadow-sm"
              style={{ borderRadius: "3px", borderColor: "#ddd" }}
            >
              <div
                className="card-header"
                style={{
                  background:
                    "linear-gradient(135deg, #8c58c3 0%, #8e44ad 100%)",
                  borderBottom: "none",
                  borderRadius: "0",
                  color: "#fff",
                  borderRadius: "5px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h6
                    className="mb-0 fw-bold text-white"
                    style={{ color: "#fff" }}
                  >
                    නීති නිලධාරීන්ට පවරා ඇති ({filteredData.length})
                  </h6>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="btn btn-sm btn-light"
                      style={{ borderRadius: "3px" }}
                    >
                      සෙවුම හිස් කරන්න
                    </button>
                  )}
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table
                    className="table table-bordered mb-0"
                    style={{ fontSize: "14px" }}
                  >
                    <thead
                      style={{
                        background:
                          "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
                        color: "#fff",
                      }}
                    >
                      <tr>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          තීරක අංකය
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          නම
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          ලිපිනය
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          සංගමය
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          ණය අංකය
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          ණය මුදල
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          උසාවි නිලධාරියා
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          උසාවිය
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          ලිපිය
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          නඩු දිනය
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          නඩු අංකය
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{
                            borderRight: "1px solid #ddd",
                            width: "200px",
                            minWidth: "200px",
                          }}
                        >
                          නඩු තීන්දුව
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{
                            borderRight: "1px solid #ddd",
                            width: "150px",
                            minWidth: "150px",
                          }}
                        >
                          උසාවි ගෙවීම
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          උසාවි නිලධාරී සටහන්
                        </th>
                        <th
                          className="fw-semibold text-dark"
                          style={{ borderRight: "1px solid #ddd" }}
                        >
                          තත්වය
                        </th>
                        <th className="fw-semibold text-dark">විස්තර</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((borrower) => (
                        <tr
                          key={`${borrower.submissionId}-${borrower.id}`}
                          style={{ borderBottom: "1px solid #ddd" }}
                        >
                          <td
                            style={{
                              borderRight: "1px solid #ddd",
                              fontWeight: "500",
                            }}
                          >
                            {borrower.arbitrationNumber}
                          </td>
                          <td
                            style={{
                              borderRight: "1px solid #ddd",
                              fontWeight: "500",
                            }}
                          >
                            {borrower.borrowerName}
                          </td>
                          <td
                            className="small"
                            style={{
                              borderRight: "1px solid #ddd",
                              maxWidth: "150px",
                              color: "#666",
                            }}
                          >
                            {borrower.borrowerAddress}
                          </td>
                          <td
                            className="small"
                            style={{
                              borderRight: "1px solid #ddd",
                              color: "#666",
                            }}
                          >
                            {borrower.societyName}
                          </td>
                          <td style={{ borderRight: "1px solid #ddd" }}>
                            {borrower.loanNumber}
                          </td>
                          <td
                            style={{
                              borderRight: "1px solid #ddd",
                              fontWeight: "500",
                            }}
                          >
                            රු.{" "}
                            {parseFloat(
                              borrower.finalLoanAmount || 0
                            ).toLocaleString("si-LK")}
                          </td>
                          <td style={{ borderRight: "1px solid #ddd" }}>
                            {borrower.assignedLegalOfficerName ? (
                              <span
                                style={{
                                  padding: "3px 8px",
                                  background: "#e8e8e8",
                                  borderRadius: "3px",
                                  fontSize: "12px",
                                  display: "inline-block",
                                }}
                              >
                                <User size={12} className="me-1" />
                                {borrower.assignedLegalOfficerName}
                              </span>
                            ) : (
                              <span style={{ color: "#999" }}>-</span>
                            )}
                          </td>
                          <td style={{ borderRight: "1px solid #ddd" }}>
                            {borrower.assignedCourtName ? (
                              <span
                                style={{
                                  padding: "3px 8px",
                                  background: "#e8e8e8",
                                  borderRadius: "3px",
                                  fontSize: "12px",
                                  display: "inline-block",
                                }}
                              >
                                <Building size={12} className="me-1" />
                                {borrower.assignedCourtName}
                              </span>
                            ) : (
                              <span style={{ color: "#999" }}>-</span>
                            )}
                          </td>
                          <td
                            className="text-center"
                            style={{ borderRight: "1px solid #ddd" }}
                          >
                            <button
                              onClick={() => generateLetter(borrower)}
                              className="btn btn-outline-secondary btn-sm"
                              style={{
                                borderRadius: "3px",
                                fontSize: "11px",
                                padding: "3px 8px",
                              }}
                            >
                              <FileText size={12} className="me-1" />
                              ලිපිය
                            </button>
                          </td>
                          <td style={{ borderRight: "1px solid #ddd" }}>
                            {borrower.judgmentDate ? (
                              <span className="small" style={{ color: "#666" }}>
                                <Calendar size={12} className="me-1" />
                                {new Date(
                                  borrower.judgmentDate
                                ).toLocaleDateString("si-LK")}
                              </span>
                            ) : (
                              <span style={{ color: "#999" }}>-</span>
                            )}
                          </td>
                          <td style={{ borderRight: "1px solid #ddd" }}>
                            {borrower.judgmentNumber ? (
                              <span style={{ fontWeight: "500" }}>
                                <FileText size={12} className="me-1" />
                                {borrower.judgmentNumber}
                              </span>
                            ) : (
                              <span style={{ color: "#999" }}>-</span>
                            )}
                          </td>
                          <td
                            style={{
                              borderRight: "1px solid #ddd",
                              width: "200px",
                              minWidth: "200px",
                            }}
                          >
                            <TableTextCell
                              content={borrower.judgmentResult}
                              icon={Gavel}
                              iconColor="text-secondary"
                              type="judgment"
                            />
                          </td>
                          <td
                            style={{
                              borderRight: "1px solid #ddd",
                              width: "150px",
                              minWidth: "150px",
                              padding: "6px",
                            }}
                          >
                            {borrower.courtPayments &&
                            borrower.courtPayments.length > 0 ? (
                              <div
                                className="d-flex align-items-center justify-content-between"
                                style={{ width: "100%", padding: "4px" }}
                              >
                                <div style={{ textAlign: "left", flex: "1" }}>
                                  <div
                                    style={{
                                      fontSize: "9px",
                                      color: "#666",
                                      lineHeight: "1.3",
                                    }}
                                  >
                                    <span
                                      style={{
                                        background: "#e8f5e9",
                                        padding: "2px 8px",
                                        borderRadius: "2px",
                                        fontSize: "10px",
                                      }}
                                    >
                                      ගෙවා ඇත
                                    </span>{" "}
                                    රු.{" "}
                                    <span
                                      className="fw-bold"
                                      style={{
                                        color: "#333",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {borrower.courtPayments
                                        .reduce(
                                          (sum, p) =>
                                            sum + parseFloat(p.amount || 0),
                                          0
                                        )
                                        .toLocaleString("si-LK")}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "9px",
                                      color: "#666",
                                      lineHeight: "1.3",
                                    }}
                                  >
                                    (ගෙවීම් - {borrower.courtPayments.length} )
                                  </div>
                                </div>
                                <button
                                  className="btn btn-sm btn-outline-success"
                                  style={{
                                    fontSize: "9px",
                                    padding: "3px 8px",
                                    borderRadius: "3px",
                                    lineHeight: "1.3",
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={() =>
                                    handleShowPaymentDetails(borrower)
                                  }
                                >
                                  විස්තර
                                </button>
                              </div>
                            ) : (
                              <span
                                style={{
                                  padding: "4px 8px",
                                  background: "#f5f5f5",
                                  borderRadius: "3px",
                                  fontSize: "10px",
                                  color: "#666",
                                }}
                              >
                                ගෙවීම් නැත
                              </span>
                            )}
                          </td>
                          <td style={{ borderRight: "1px solid #ddd" }}>
                            <TableTextCell
                              content={borrower.legalOfficerRemarks}
                              icon={MessageSquare}
                              iconColor="text-secondary"
                              type="remarks"
                            />
                          </td>
                          <td style={{ borderRight: "1px solid #ddd" }}>
                            {getStatusBadge(borrower)}
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                setSelectedBorrower(borrower);
                                setShowDetailsModal(true);
                              }}
                              className="btn btn-outline-secondary btn-sm"
                              style={{ borderRadius: "3px", fontSize: "12px" }}
                            >
                              <Eye size={12} className="me-1" />
                              විස්තර
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="card-footer"
                style={{ background: "#fafafa", borderTop: "1px solid #ddd" }}
              >
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="text-center">
                      <div className="fs-4 fw-bold" style={{ color: "#333" }}>
                        {filteredData.length}
                      </div>
                      <div className="small" style={{ color: "#666" }}>
                        {searchTerm || filterStatus !== "all"
                          ? "සෙවුම් ප්‍රතිඵල"
                          : "මුළු නඩු"}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center">
                      <div className="fs-4 fw-bold" style={{ color: "#333" }}>
                        {
                          filteredData.filter(
                            (b) => b.assignedLegalOfficerId && !b.judgmentResult
                          ).length
                        }
                      </div>
                      <div className="small" style={{ color: "#666" }}>
                        නීති නිලධාරීන්ට පවරා ඇත
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="text-center">
                      <div className="fs-4 fw-bold" style={{ color: "#333" }}>
                        {filteredData.filter((b) => b.judgmentResult).length}
                      </div>
                      <div className="small" style={{ color: "#666" }}>
                        නඩු තීන්දු ලබා ඇත
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {showPaymentDetailsModal && selectedPaymentHistory && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowPaymentDetailsModal(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: "15px" }}>
              <div
                className="modal-header text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  borderRadius: "15px 15px 0 0",
                }}
              >
                <h5 className="modal-title fw-bold">
                  <DollarSign size={20} className="me-2" />
                  උසාවි ගෙවීම් විස්තර
                </h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowPaymentDetailsModal(false)}
                />
              </div>

              <div className="modal-body p-4">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block mb-1">
                        තීරක අංකය
                      </small>
                      <strong className="text-primary">
                        {selectedPaymentHistory.arbitrationNumber}
                      </strong>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block mb-1">
                        ණයගැතියා
                      </small>
                      <strong>{selectedPaymentHistory.borrowerName}</strong>
                    </div>
                  </div>
                </div>

                <h6 className="fw-bold mb-3">ගෙවීම් ඉතිහාසය</h6>
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead style={{ background: "#f8f9fa" }}>
                      <tr>
                        <th className="fw-semibold">#</th>
                        <th className="fw-semibold">
                          <Calendar size={14} className="me-1" />
                          දිනය
                        </th>
                        <th className="fw-semibold text-end">
                          <DollarSign size={14} className="me-1" />
                          මුදල (රු.)
                        </th>
                        <th className="fw-semibold">
                          <User size={14} className="me-1" />
                          එකතු කළ අය
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPaymentHistory.payments.map((payment, index) => (
                        <tr key={payment.id || index}>
                          <td className="text-center">{index + 1}</td>
                          <td>
                            {new Date(payment.paymentDate).toLocaleDateString(
                              "si-LK",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </td>
                          <td className="text-end fw-semibold text-success">
                            රු.{" "}
                            {parseFloat(payment.amount).toLocaleString("si-LK")}
                          </td>
                          <td>
                            <span className="badge bg-info">
                              {payment.addedBy}
                            </span>
                          </td>
                        </tr>
                      ))}

                      <tr className="table-success">
                        <td colSpan="2" className="text-end fw-bold">
                          මුළු ගෙවූ මුදල:
                        </td>
                        <td className="text-end fw-bold fs-5">
                          රු.{" "}
                          {calculateTotal(
                            selectedPaymentHistory.payments
                          ).toLocaleString("si-LK")}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="alert alert-info d-flex align-items-center mt-3">
                  <DollarSign size={18} className="me-2" />
                  <div>
                    <strong>මුළු ගෙවීම් ගණන:</strong>{" "}
                    {selectedPaymentHistory.payments.length} ගෙවීම්
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowPaymentDetailsModal(false)}
                  style={{ borderRadius: "10px" }}
                >
                  වසන්න
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTextModal && modalContent && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowTextModal(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: "15px" }}>
              <div
                className="modal-header text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #a485ec 100%)",
                  borderRadius: "15px 15px 0 0",
                }}
              >
                <h5 className="modal-title fw-bold">
                  {modalContent.icon && (
                    <modalContent.icon size={20} className="me-2" />
                  )}
                  {modalContent.title}
                </h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowTextModal(false)}
                />
              </div>

              <div className="modal-body p-4">
                <div
                  className="p-3 bg-light rounded"
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: "1.8",
                    whiteSpace: "pre-wrap",
                    maxHeight: "60vh",
                    overflowY: "auto",
                  }}
                >
                  {modalContent.icon && (
                    <modalContent.icon
                      size={18}
                      className={`me-2 ${modalContent.iconColor}`}
                    />
                  )}
                  {modalContent.content}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowTextModal(false)}
                  style={{ borderRadius: "10px" }}
                >
                  වසන්න
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AssignLegalOfficerModal />
      <BorrowerDetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        borrower={selectedBorrower}
      />
    </div>
  );
};

export default DistrictUnpaidCasesPage;
