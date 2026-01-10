// import React, { useState, useEffect } from "react";
// import {
//   Building,
//   Users,
//   FileText,
//   CheckCircle,
//   TrendingUp,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";

// const ProvincialOverviewPage = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalDistricts: 0,
//     totalSocieties: 0,
//     totalOfficers: 0,
//     totalSubmissions: 0,
//     pendingSubmissions: 0,
//     approvedSubmissions: 0,
//     totalBorrowers: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadStatistics();
//   }, []);

//   const loadStatistics = async () => {
//     try {
//       const districts = await api.getDistricts();
//       const societies = await api.getSocieties();

//       let totalOfficers = 0;
//       let totalSubmissions = 0;

//       for (const district of districts) {
//         const officers = await api.getOfficersByDistrict(district.id);
//         totalOfficers += officers.length;

//         const submissions = await api.getApprovedSubmissionsByDistrict(
//           district.id
//         );
//         totalSubmissions += submissions.length;
//       }

//       setStats({
//         totalDistricts: districts.length,
//         totalSocieties: societies.length,
//         totalOfficers,
//         totalSubmissions,
//         pendingSubmissions: 0,
//         approvedSubmissions: totalSubmissions,
//         totalBorrowers: 0,
//       });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
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
//       <h2 className="fw-bold mb-3">පළාත් කාර්යාල පාලන පුවරුව</h2>
//       <p className="text-muted mb-4">මධ්‍ය පළාතේ සමස්ත සංඛ්‍යාලේඛන</p>

//       <div className="row g-4">
//         <div className="col-md-6 col-lg-3">
//           <div
//             className="card border-0 shadow-sm h-100"
//             style={{
//               borderRadius: "15px",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             }}
//           >
//             <div className="card-body text-white">
//               <div className="d-flex justify-content-between align-items-start mb-3">
//                 <div className="bg-white bg-opacity-25 p-3 rounded">
//                   <Building size={28} />
//                 </div>
//                 <TrendingUp size={20} className="opacity-75" />
//               </div>
//               <h6 className="opacity-75 mb-1">සම්පූර්ණ දිස්ත්‍රික්ක</h6>
//               <h2 className="fw-bold mb-0">{stats.totalDistricts}</h2>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-6 col-lg-3">
//           <div
//             className="card border-0 shadow-sm h-100"
//             style={{
//               borderRadius: "15px",
//               background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
//             }}
//           >
//             <div className="card-body text-white">
//               <div className="d-flex justify-content-between align-items-start mb-3">
//                 <div className="bg-white bg-opacity-25 p-3 rounded">
//                   <Building size={28} />
//                 </div>
//                 <TrendingUp size={20} className="opacity-75" />
//               </div>
//               <h6 className="opacity-75 mb-1">සම්පූර්ණ සමිති</h6>
//               <h2 className="fw-bold mb-0">{stats.totalSocieties}</h2>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-6 col-lg-3">
//           <div
//             className="card border-0 shadow-sm h-100"
//             style={{
//               borderRadius: "15px",
//               background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
//             }}
//           >
//             <div className="card-body text-white">
//               <div className="d-flex justify-content-between align-items-start mb-3">
//                 <div className="bg-white bg-opacity-25 p-3 rounded">
//                   <Users size={28} />
//                 </div>
//                 <TrendingUp size={20} className="opacity-75" />
//               </div>
//               <h6 className="opacity-75 mb-1">බේරුම්කරුවන්</h6>
//               <h2 className="fw-bold mb-0">{stats.totalOfficers}</h2>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-6 col-lg-3">
//           <div
//             className="card border-0 shadow-sm h-100"
//             style={{
//               borderRadius: "15px",
//               background: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
//             }}
//           >
//             <div className="card-body text-white">
//               <div className="d-flex justify-content-between align-items-start mb-3">
//                 <div className="bg-white bg-opacity-25 p-3 rounded">
//                   <FileText size={28} />
//                 </div>
//                 <TrendingUp size={20} className="opacity-75" />
//               </div>
//               <h6 className="opacity-75 mb-1">සම්පූර්ණ ඉදිරිපත් කිරීම්</h6>
//               <h2 className="fw-bold mb-0">{stats.totalSubmissions}</h2>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* District-wise breakdown */}
//       <div className="mt-5">
//         <h4 className="fw-bold mb-3">දිස්ත්‍රික් අනුව විස්තරය</h4>
//         <div
//           className="card border-0 shadow-sm"
//           style={{ borderRadius: "15px" }}
//         >
//           <div className="card-body">
//             <div
//               className="alert alert-info mb-0"
//               style={{ borderRadius: "10px" }}
//             >
//               <FileText size={18} className="me-2" />
//               දිස්ත්‍රික් විස්තරාත්මක විශ්ලේෂණය ඉදිරියේදී එකතු කරනු ලබයි
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="mt-5">
//         <h4 className="fw-bold mb-3">මෑත ක්‍රියාකාරකම්</h4>
//         <div
//           className="card border-0 shadow-sm"
//           style={{ borderRadius: "15px" }}
//         >
//           <div className="card-body">
//             <div className="d-flex align-items-center justify-content-center py-5 text-muted">
//               <CheckCircle size={48} className="me-3 opacity-50" />
//               <div>
//                 <h5 className="mb-1">පද්ධතිය සාර්ථකව ක්‍රියාත්මක වේ</h5>
//                 <p className="mb-0">
//                   සියලුම දිස්ත්‍රික්ක සහ සමිති ක්‍රියාත්මකයි
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProvincialOverviewPage;
