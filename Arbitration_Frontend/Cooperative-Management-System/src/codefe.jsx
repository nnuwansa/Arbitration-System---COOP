import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Mock Data
const DISTRICTS = [
  { id: "nuwara-eliya", name: "Nuwara Eliya", code: "N" },
  { id: "kandy", name: "Kandy", code: "K" },
  { id: "matale", name: "Matale", code: "M" },
];

const INITIAL_ARBITRATION_OFFICERS = [
  {
    id: "ao1",
    name: "සුනිල් පෙරේරා",
    district: "nuwara-eliya",
    assignedTo: null,
  },
  {
    id: "ao2",
    name: "කමල් සිල්වා",
    district: "nuwara-eliya",
    assignedTo: null,
  },
  { id: "ao3", name: "නිමල් ජයවර්ධන", district: "kandy", assignedTo: null },
  { id: "ao4", name: "රංජිත් ප්‍රනාන්දු", district: "kandy", assignedTo: null },
  { id: "ao5", name: "අශෝක බණ්ඩාර", district: "matale", assignedTo: null },
];

const INITIAL_SOCIETIES = {
  "nuwara-eliya": [
    { id: "ne-s1", name: "ශ්‍රී ලංකා සමෘද්ධි සමිතිය - නුවරඑළිය" },
    { id: "ne-s2", name: "මධ්‍ය පළාත් සහයෝගී සමිතිය - නුවරඑළිය" },
  ],
  kandy: [
    { id: "k-s1", name: "මහනුවර සමෘද්ධි සමිතිය" },
    { id: "k-s2", name: "මධ්‍ය පළාත් සංවර්ධන සමිතිය - මහනුවර" },
  ],
  matale: [
    { id: "m-s1", name: "මාතලේ සහයෝගී සමිතිය" },
    { id: "m-s2", name: "මධ්‍ය පළාත් ප්‍රජා සමිතිය - මාතලේ" },
  ],
};

const App = () => {
  const [userRole, setUserRole] = useState("society");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSociety, setSelectedSociety] = useState("");
  const [districtOfficeDistrict, setDistrictOfficeDistrict] = useState("");

  const [arbitrationOfficers, setArbitrationOfficers] = useState(
    INITIAL_ARBITRATION_OFFICERS
  );
  const [societies, setSocieties] = useState(INITIAL_SOCIETIES);

  const [borrowers, setBorrowers] = useState([]);
  const [currentBorrower, setCurrentBorrower] = useState({
    registrationNo: "",
    registeredAddress: "",
    registrationDate: "",
    loanNumber: "",
    borrowerName: "",
    borrowerAddress: "",
    membershipNo: "",
    guarantor1Name: "",
    guarantor1Address: "",
    guarantor1MembershipNo: "",
    guarantor2Name: "",
    guarantor2Address: "",
    guarantor2MembershipNo: "",
    loanAmount: "",
    interest: "",
    interestRate: "",
    stationeryFees: "",
  });

  const [submissions, setSubmissions] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [viewMode, setViewMode] = useState("form");
  const [expandedBorrower, setExpandedBorrower] = useState(null);
  const [districtTab, setDistrictTab] = useState("submissions");

  const [newOfficer, setNewOfficer] = useState({ name: "", district: "" });
  const [newSociety, setNewSociety] = useState({ name: "", district: "" });

  // Modal states
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    message: "",
    type: "info",
  });
  const [showDecisionDetailsModal, setShowDecisionDetailsModal] =
    useState(false);
  const [viewDecisionDetails, setViewDecisionDetails] = useState(null);

  const [currentDecision, setCurrentDecision] = useState({
    submissionId: null,
    borrowerId: null,
    decisionDate: "",
    finalLoanAmount: "",
    interestDeducted: "",
    arbitrationDecision: "",
  });

  // Custom Alert Modal
  const showAlert = (title, message, type = "info") => {
    setAlertMessage({ title, message, type });
    setShowAlertModal(true);
  };

  const openDecisionModal = (submissionId, borrowerId) => {
    setCurrentDecision({
      submissionId,
      borrowerId,
      decisionDate: "",
      finalLoanAmount: "",
      interestDeducted: "",
      arbitrationDecision: "",
    });
    setShowDecisionModal(true);
  };

  const closeDecisionModal = () => {
    setShowDecisionModal(false);
    setCurrentDecision({
      submissionId: null,
      borrowerId: null,
      decisionDate: "",
      finalLoanAmount: "",
      interestDeducted: "",
      arbitrationDecision: "",
    });
  };

  const openDecisionDetailsModal = (borrower) => {
    setViewDecisionDetails(borrower);
    setShowDecisionDetailsModal(true);
  };

  const closeDecisionDetailsModal = () => {
    setShowDecisionDetailsModal(false);
    setViewDecisionDetails(null);
  };

  const submitDecision = () => {
    if (
      !currentDecision.decisionDate ||
      !currentDecision.finalLoanAmount ||
      !currentDecision.interestDeducted ||
      !currentDecision.arbitrationDecision
    ) {
      showAlert("දෝෂයකි!", "කරුණාකර සියලු තොරතුරු පුරවන්න", "warning");
      return;
    }

    addArbitrationDecision(
      currentDecision.submissionId,
      currentDecision.borrowerId,
      {
        decisionDate: currentDecision.decisionDate,
        finalLoanAmount: currentDecision.finalLoanAmount,
        interestDeducted: currentDecision.interestDeducted,
        arbitrationDecision: currentDecision.arbitrationDecision,
      }
    );

    closeDecisionModal();
    showAlert("සාර්ථකයි!", "තීරණය සාර්ථකව එකතු කරන ලදී!", "success");
  };

  const addBorrower = () => {
    if (!currentBorrower.borrowerName || !currentBorrower.loanNumber) {
      showAlert("දෝෂයකි!", "කරුණාකර අවශ්‍ය තොරතුරු පුරවන්න", "warning");
      return;
    }

    setBorrowers([...borrowers, { ...currentBorrower, id: Date.now() }]);
    setCurrentBorrower({
      registrationNo: "",
      registeredAddress: "",
      registrationDate: "",
      loanNumber: "",
      borrowerName: "",
      borrowerAddress: "",
      membershipNo: "",
      guarantor1Name: "",
      guarantor1Address: "",
      guarantor1MembershipNo: "",
      guarantor2Name: "",
      guarantor2Address: "",
      guarantor2MembershipNo: "",
      loanAmount: "",
      interest: "",
      interestRate: "",
      stationeryFees: "",
    });
    showAlert("සාර්ථකයි!", "ණයගැතියා සාර්ථකව එකතු කරන ලදී!", "success");
  };

  const removeBorrower = (id) => {
    setBorrowers(borrowers.filter((b) => b.id !== id));
  };

  const submitForApproval = () => {
    if (borrowers.length === 0) {
      showAlert(
        "දෝෂයකි!",
        "කරුණාකර අවම වශයෙන් එක් ණයගැතියෙක් එක් කරන්න",
        "warning"
      );
      return;
    }

    const pendingSubmission = {
      id: Date.now(),
      district: selectedDistrict,
      society: selectedSociety,
      borrowers: [...borrowers],
      submittedDate: new Date().toISOString(),
      status: "pending-approval",
    };

    setPendingApprovals([...pendingApprovals, pendingSubmission]);
    setBorrowers([]);
    showAlert(
      "සාර්ථකයි!",
      "අනුමැතිය සඳහා සාර්ථකව ඉදිරිපත් කරන ලදී!",
      "success"
    );
    setViewMode("pending");
  };

  const approveSubmission = (pendingId) => {
    const pending = pendingApprovals.find((p) => p.id === pendingId);
    if (!pending) return;

    const approvedSubmission = {
      ...pending,
      borrowers: pending.borrowers.map((b) => ({
        ...b,
        arbitrationFeePaid: false,
        arbitrationNumber: null,
        assignedOfficer: null,
        status: "pending",
      })),
      status: "approved",
      approvedDate: new Date().toISOString(),
    };

    setSubmissions([...submissions, approvedSubmission]);
    setPendingApprovals(pendingApprovals.filter((p) => p.id !== pendingId));
    showAlert(
      "සාර්ථකයි!",
      "ජිල්ලා කාර්යාලයට සාර්ථකව ඉදිරිපත් කරන ලදී!",
      "success"
    );
  };

  const rejectSubmission = (pendingId) => {
    setPendingApprovals(pendingApprovals.filter((p) => p.id !== pendingId));
    showAlert(
      "ප්‍රතික්ෂේප කරන ලදී",
      "ඉදිරිපත් කිරීම ප්‍රතික්ෂේප කරන ලදී",
      "warning"
    );
  };

  const updateArbitrationFee = (submissionId, borrowerId, isPaid) => {
    setSubmissions(
      submissions.map((sub) => {
        if (sub.id === submissionId) {
          return {
            ...sub,
            borrowers: sub.borrowers.map((b) => {
              if (b.id === borrowerId && isPaid) {
                const district = DISTRICTS.find((d) => d.id === sub.district);
                const existingNumbers = submissions
                  .flatMap((s) => s.borrowers)
                  .filter(
                    (b) =>
                      b.arbitrationNumber &&
                      b.arbitrationNumber.includes(district.code)
                  )
                  .map((b) => {
                    const match = b.arbitrationNumber.match(/(\d+)$/);
                    return match ? parseInt(match[1]) : 0;
                  });
                const nextNumber =
                  existingNumbers.length > 0
                    ? Math.max(...existingNumbers) + 1
                    : 1;
                const arbitrationNumber = `CDC/${district.code}/2025/${String(
                  nextNumber
                ).padStart(4, "0")}`;

                const availableOfficer = arbitrationOfficers.find(
                  (ao) => ao.district === sub.district && ao.assignedTo === null
                );

                if (!availableOfficer) {
                  showAlert(
                    "දෝෂයකි!",
                    "මෙම දිස්ත්‍රික්කයේ ලබා ගත හැකි බේරුම්කරුවන් නොමැත!",
                    "error"
                  );
                  return b;
                }

                setArbitrationOfficers(
                  arbitrationOfficers.map((ao) =>
                    ao.id === availableOfficer.id
                      ? { ...ao, assignedTo: sub.society }
                      : ao
                  )
                );

                return {
                  ...b,
                  arbitrationFeePaid: true,
                  arbitrationNumber,
                  assignedOfficer: availableOfficer.name,
                  assignedOfficerId: availableOfficer.id,
                  status: "assigned",
                  arbitrationDecision: null,
                  decisionDate: null,
                  finalLoanAmount: null,
                  interestDeducted: null,
                };
              }
              return { ...b, arbitrationFeePaid: isPaid };
            }),
          };
        }
        return sub;
      })
    );
  };

  const addArbitrationDecision = (submissionId, borrowerId, decision) => {
    setSubmissions(
      submissions.map((sub) => {
        if (sub.id === submissionId) {
          return {
            ...sub,
            borrowers: sub.borrowers.map((b) => {
              if (b.id === borrowerId) {
                return {
                  ...b,
                  ...decision,
                  status: "decision-given",
                };
              }
              return b;
            }),
          };
        }
        return sub;
      })
    );
  };

  const addArbitrationOfficer = () => {
    if (!newOfficer.name || !newOfficer.district) {
      showAlert("දෝෂයකි!", "කරුණාකර සියලු තොරතුරු පුරවන්න", "warning");
      return;
    }
    const officer = {
      id: "ao-" + Date.now(),
      name: newOfficer.name,
      district: newOfficer.district,
      assignedTo: null,
    };
    setArbitrationOfficers([...arbitrationOfficers, officer]);
    setNewOfficer({ name: "", district: "" });
    showAlert("සාර්ථකයි!", "බේරුම්කරු සාර්ථකව එකතු කරන ලදී!", "success");
  };

  const addNewSociety = () => {
    if (!newSociety.name || !newSociety.district) {
      showAlert("දෝෂයකි!", "කරුණාකර සියලු තොරතුරු පුරවන්න", "warning");
      return;
    }
    const society = {
      id: newSociety.district.substring(0, 1) + "-s-" + Date.now(),
      name: newSociety.name,
    };
    setSocieties({
      ...societies,
      [newSociety.district]: [...societies[newSociety.district], society],
    });
    setNewSociety({ name: "", district: "" });
    showAlert("සාර්ථකයි!", "සමිතිය සාර්ථකව එකතු කරන ලදී!", "success");
  };

  //   const generateLetter = (borrower, submission) => {
  //     const district = DISTRICTS.find((d) => d.id === submission.district);
  //     const society = societies[submission.district].find(
  //       (s) => s.id === submission.society
  //     );

  //     const currentDate = new Date().toLocaleDateString("si-LK");

  //     const totalAmount =
  //       parseFloat(borrower.loanAmount) + parseFloat(borrower.interest);

  //     const letterHTML = `
  // <!DOCTYPE html>
  // <html>
  // <head>
  //     <meta charset="utf-8">
  //     <title>ආරවුලක් සිරවත් කිරීමට භාර කිරීම</title>
  //     <style>
  //         @page {
  //             size: A4;
  //             margin: 2cm;
  //         }
  //         body {
  //             font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif;
  //             font-size: 11pt;
  //             line-height: 1.5;
  //             color: #000;
  //         }
  //         .page-border {
  //             border: 2px solid #000;
  //             padding: 25px;
  //             min-height: 27cm;
  //         }
  //         .header-logo {
  //             text-align: right;
  //             font-size: 9pt;
  //             font-style: italic;
  //             color: #666;
  //             margin-bottom: 15px;
  //         }
  //         .header-title {
  //             text-align: center;
  //             font-size: 12pt;
  //             font-weight: bold;
  //             margin-bottom: 20px;
  //         }
  //         .ref-text {
  //             font-size: 10pt;
  //             text-align: justify;
  //             margin-bottom: 10px;
  //             line-height: 1.4;
  //         }
  //         .main-section {
  //             margin-top: 20px;
  //         }
  //         .to-section {
  //             margin: 20px 0;
  //         }
  //         .content-para {
  //             text-align: justify;
  //             margin-bottom: 12px;
  //             line-height: 1.6;
  //         }
  //         .details-section {
  //             margin: 20px 0 20px 40px;
  //             line-height: 2;
  //         }
  //         .signature-section {
  //             margin-top: 60px;
  //         }
  //         .footer-note {
  //             margin-top: 30px;
  //             font-size: 9pt;
  //             font-style: italic;
  //             line-height: 1.4;
  //         }
  //         .filled-data {
  //             font-weight: bold;
  //         }
  //     </style>
  // </head>
  // <body>
  //     <div class="page-border">
  //         <div class="header-logo">
  //             තීරක අංකය: <span class="filled-data">${
  //               borrower.arbitrationNumber || "..........................."
  //             }</span>
  //         </div>

  //         <div class="header-title">
  //             ආරවුලක් නිරවුල් කිරීමට භාර කිරීම ( ණය මුදල් )
  //         </div>

  //         <div class="ref-text">
  //             1953 අංක 04 දරණ සමුපකාර සමිති (සංශෝධන) පනතෙහි සංශෝධිත ආධ්‍යාය පළාත් සභාවේ 1000 අංක 10
  //             දරණ සමුපකාර සමිති ආඥා පනතේ 58 වන වගන්තිය සහ ඊ වෙනි ප්‍රඥප්තියේ 51 වගන්ති හා 83 110 (ඇ) වගන්ති
  //             වගන්ති යටතේ රෙජිස්ට්‍රාර්වරයා වෙත පැවරී ඇති බලයන්ත අනුව අංක <span class="filled-data">${
  //               borrower.registrationNo || "............................."
  //             }</span> දරණ ගැසට් පත්‍රයේ
  //             ප්‍රකාශිත සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස් <span class="filled-data">${
  //               borrower.assignedOfficer
  //             }</span>
  //         </div>

  //         <div class="ref-text">
  //             දරණ ගැසට් පත්‍රයේ සඳු කරන ලද නිවේදනයෙන් මා වෙත පවරන ලද නිධන වශයෙන් මධ්‍යම පළාතේ
  //             ලියාපදිංචි කරු වශයෙන් ලියාපදිංචි සමුපකාර සමිතියක් වන <span class="filled-data">${
  //               society.name
  //             }</span> සමිතිය
  //             හා විත්තිකරුවන් වශයෙන් ඊ සමිතියේ සාමාජිකයින් වන ණයකරුවෝ <span class="filled-data">${
  //               borrower.borrowerName
  //             }</span> සහ ඇපකරුවෝ නම්
  //             <span class="filled-data">${
  //               borrower.guarantor1Name
  //             }</span> සහ <span class="filled-data">${
  //       borrower.guarantor2Name
  //     }</span> ගෙන් සහ ඇපකාර,
  //             අතර ණය මුදල වශයෙන්
  //         </div>

  //         <div class="main-section">
  //             <div class="to-section">
  //                 රු. <span class="filled-data">${parseFloat(
  //                   borrower.loanAmount
  //                 ).toLocaleString("si-LK")}</span>
  //             </div>

  //             <div class="content-para">
  //                 සහ වාර්ෂික පොළියක්, අංක <span class="filled-data">${
  //                   borrower.loanNumber
  //                 }</span> වන තුරු අවුරුදු ගණන මුළු මුදල
  //                 <span class="filled-data">${totalAmount.toLocaleString(
  //                   "si-LK"
  //                 )}</span> තේපල ප්‍රතිශතයක් <span class="filled-data">${
  //       borrower.interestRate
  //     }%</span> දී ණය දුන් දිනයෙන් සිට මුළු මුදල ගෙවා නිම කරන්නා වන
  //                 තුරු මුල් මුදලට අදුනා ගත යුතු පොළියක්, සමුපකාර සමිතියට අයවිය යුතු වශයෙන් පැන ඇති බවට ආරවුල
  //                 නිසා අනු අතිහීමක් යටතේ වූ වෙත ඉදිරිපත් කරන ලදින්, එහි ආරවුල තීරණය කිරීමට තීරණ තාවක්කාරු
  //                 දීම සඳහා ආරවුල් බේරුම්කරු තීරණ තාවක්කාරුවක් වශයෙන් <span class="filled-data">${
  //                   borrower.assignedOfficer
  //                 }</span>
  //                 මහතා / මිය මෙයින් පත් කරමි.
  //             </div>

  //             <div style="margin-top: 30px;">
  //                 <div>මධ්‍ය පළාත් සමුපකාර සංවර්ධන දෙපාර්තුමේන්තුව</div>
  //                 <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස්</div>
  //                 <div><span class="filled-data">${district.name}</span>,</div>
  //             </div>

  //             <div style="margin-top: 30px;">
  //                 <div>දිනය</div>
  //                 <div><span class="filled-data">${currentDate}</span></div>
  //             </div>

  //             <div class="signature-section">
  //                 <div>...........................................................</div>
  //                 <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් /</div>
  //                 <div>නියෝජ්‍ය කොමසාරිස්</div>
  //             </div>

  //             <div class="footer-note">
  //                 * ආරවුලේ වන් පාර්ශවයක් ඇපකරුවෙකු නොවන අඩ වගන්තිය තහවුරු කර පිහි සම්පූර්ණ නම් සඳහන් කරන්න.
  //             </div>

  //             <div class="footer-note">
  //                 එහි පැවතරුන්ගේ හෝ විත්තිකාරන්ගේ තත්වය දැක්වන, එනම් ලියාපදිංචි කරන ලද සමිතියක හෝ හිටපු
  //                 සාමාජිකයෙකු හෝ හිටපු / මියගිය ) සාමාජිකයෙකු විත්තිකරුවෙකු හෝ හිටපු කාරක සභාව අධිකාරියෙකු /
  //                 සේවකයෙකු හෝ මියගිය අධිකාරියෙකු / සේවකයෙකු නීත්‍යානුකූල නියෝජිතයෙකු / උරුමක්කාරයෙකු /
  //                 බාල වයස්කාරයෙකු උරුමක්කාරයෙකුගේ භාරකාරයෙකු හෝ යනාදී යම් පාර්ශවයක් ඇපකරුවෙකු වන විට ලියාපදිංචි
  //                 ඇපකරුවෙකු යනුවෙන්ද සඳහන් කළ යුතුය.
  //             </div>
  //         </div>
  //     </div>
  // </body>
  // </html>
  //   `;

  //     const exportToWord = (html, filename) => {
  //       const blob = new Blob(["\ufeff", html], {
  //         type: "application/msword",
  //       });

  //       const url = URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.download =
  //         filename || `ආරවුල_භාර_කිරීම_${borrower.arbitrationNumber}.doc`;
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(url);
  //     };

  //     exportToWord(
  //       letterHTML,
  //       `ආරවුල_භාර_කිරීම_${borrower.arbitrationNumber}.doc`
  //     );

  const generateLetter = (borrower, submission) => {
    const currentDate = new Date().toLocaleDateString("si-LK");
    const totalAmount =
      parseFloat(borrower.loanAmount) + parseFloat(borrower.interest);

    const letterHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ආරවුලක් සිරවත් කිරීමට භාර කිරීම</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        body {
            font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000;
        }
        .page-border {
            border: 2px solid #000;
            padding: 25px;
            min-height: 27cm;
        }
        .header-logo {
            text-align: right;
            font-size: 9pt;
            font-style: italic;
            color: #666;
            margin-bottom: 15px;
        }
        .header-title {
            text-align: center;
            font-size: 12pt;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .ref-text {
            font-size: 10pt;
            text-align: justify;
            margin-bottom: 10px;
            line-height: 1.4;
        }
        .main-section {
            margin-top: 20px;
        }
        .to-section {
            margin: 20px 0;
        }
        .content-para {
            text-align: justify;
            margin-bottom: 12px;
            line-height: 1.6;
        }
        .signature-section {
            margin-top: 60px;
        }
        .footer-note {
            margin-top: 30px;
            font-size: 9pt;
            font-style: italic;
            line-height: 1.4;
        }
        .filled-data {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="page-border">
        <div class="header-logo">
            තීරක අංකය: <span class="filled-data">${
              borrower.arbitrationNumber || "..........................."
            }</span>
        </div>

        <div class="header-title">
            ආරවුලක් නිරවුල් කිරීමට භාර කිරීම ( ණය මුදල් )
        </div>

        <div class="ref-text">
            1953 අංක 04 දරණ සමුපකාර සමිති (සංශෝධන) පනතෙහි සංශෝධිත ආධ්‍යාය පළාත් සභාවේ 1000 අංක 10
            දරණ සමුපකාර සමිති ආඥා පනතේ 58 වන වගන්තිය සහ ඊ වෙනි ප්‍රඥප්තියේ 51 වගන්ති හා 83 110 (ඇ) වගන්ති
            වගන්ති යටතේ රෙජිස්ට්‍රාර්වරයා වෙත පැවරී ඇති බලයන්ත අනුව අංක <span class="filled-data">${
              borrower.membershipNo || "............................."
            }</span> දරණ ගැසට් පත්‍රයේ
            ප්‍රකාශිත සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස්
        </div>

        <div class="ref-text">
            දරණ ගැසට් පත්‍රයේ සඳහන් කරන ලද නිවේදනයෙන් මා වෙත පවරන ලද බලය අනුව මධ්‍යම පළාතේ
            ලියාපදිංචි කරු වශයෙන් ලියාපදිංචි සමුපකාර සමිතියක් වන <span class="filled-data">${
              submission?.societyName || "සමිතිය"
            }</span>
            හා විත්තිකරුවන් වශයෙන් ඊ සමිතියේ සාමාජිකයින් වන ණයකරුවෝ <span class="filled-data">${
              borrower.borrowerName
            }</span> සහ ඇපකරුවෝ නම්
            <span class="filled-data">${
              borrower.guarantor1Name
            }</span> සහ <span class="filled-data">${
      borrower.guarantor2Name
    }</span> අතර ණය මුදල වශයෙන්
        </div>

        <div class="main-section">
            <div class="to-section">
                රු. <span class="filled-data">${parseFloat(
                  borrower.loanAmount
                ).toLocaleString("si-LK")}</span>
            </div>

            <div class="content-para">
                සහ වාර්ෂික පොළියක්, අංක <span class="filled-data">${
                  borrower.loanNumber
                }</span> වන තුරු අවුරුදු ගණන මුළු මුදල
                <span class="filled-data">රු. ${totalAmount.toLocaleString(
                  "si-LK"
                )}</span> පොලී ප්‍රතිශතයක් <span class="filled-data">${
      borrower.interestRate
    }%</span> දී ණය දුන් දිනයෙන් සිට මුළු මුදල ගෙවා නිම කරන්නා වන
                තුරු මුල් මුදලට අදුනා ගත යුතු පොළියක්, සමුපකාර සමිතියට අයවිය යුතු වශයෙන් පැන ඇති බවට ආරවුල
                නිසා අනු අතිහීමක් යටතේ වූ වෙත ඉදිරිපත් කරන ලදින්, එහි ආරවුල තීරණය කිරීමට තීරණ තාවක්කාරු
                දීම සඳහා ආරවුල් බේරුම්කරු තීරණ තාවක්කාරුවක් වශයෙන් <span class="filled-data">${
                  borrower.assignedOfficerName || "බේරුම්කරු"
                }</span>
                මහතා / මිය මෙයින් පත් කරමි.
            </div>

            <div style="margin-top: 30px;">
                <div>මධ්‍ය පළාත් සමුපකාර සංවර්ධන දෙපාර්තුමේන්තුව</div>
                <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස්</div>
                <div><span class="filled-data">${
                  submission?.districtName || "දිස්ත්‍රික්කය"
                }</span></div>
            </div>

            <div style="margin-top: 30px;">
                <div>දිනය</div>
                <div><span class="filled-data">${currentDate}</span></div>
            </div>

            <div class="signature-section">
                <div>...........................................................</div>
                <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් /</div>
                <div>නියෝජ්‍ය කොමසාරිස්</div>
            </div>

            <div class="footer-note">
                * ආරවුලේ එක් පාර්ශවයක් ඇපකරුවෙකු නොවන අවස්ථාවේදී ඒ වගන්තිය තහවුරු කර එහි සම්පූර්ණ නම් සඳහන් කරන්න.
            </div>

            <div class="footer-note">
                එහි පැවතුන්ගේ හෝ විත්තිකරුවන්ගේ තත්වය දැක්වන, එනම් ලියාපදිංචි කරන ලද සමිතියක හෝ හිටපු
                සාමාජිකයෙකු හෝ හිටපු / මියගිය සාමාජිකයෙකු විත්තිකරුවෙකු හෝ හිටපු කාරක සභාව අධිකාරියෙකු /
                සේවකයෙකු හෝ මියගිය අධිකාරියෙකු / සේවකයෙකු නීත්‍යානුකූල නියෝජිතයෙකු / උරුමක්කාරයෙකු /
                බාල වයස්කාරයෙකුගේ භාරකාරයෙකු හෝ යනාදී යම් පාර්ශවයක් ඇපකරුවෙකු වන විට ලියාපදිංචි
                ඇපකරුවෙකු යනුවෙන්ද සඳහන් කළ යුතුය.
            </div>
        </div>
    </div>
</body>
</html>
  `;

    const blob = new Blob(["\ufeff", letterHTML], {
      type: "application/msword",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ආරවුල_භාර_කිරීම_${borrower.arbitrationNumber}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert("ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ");
  };

  // Alert Modal Component
  const AlertModal = () => {
    if (!showAlertModal) return null;

    const getIconAndColor = () => {
      switch (alertMessage.type) {
        case "success":
          return { icon: "fa-check-circle", color: "#28a745", bg: "#d4edda" };
        case "error":
          return { icon: "fa-times-circle", color: "#dc3545", bg: "#f8d7da" };
        case "warning":
          return {
            icon: "fa-exclamation-triangle",
            color: "#ffc107",
            bg: "#fff3cd",
          };
        default:
          return { icon: "fa-info-circle", color: "#17a2b8", bg: "#d1ecf1" };
      }
    };

    const style = getIconAndColor();

    return (
      <>
        <div
          className="modal-backdrop show"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          onClick={() => setShowAlertModal(false)}
        ></div>
        <div
          className="modal show d-block"
          style={{ zIndex: 1055 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{
                border: "none",
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <div className="modal-body p-0">
                <div
                  className="text-center p-4"
                  style={{ backgroundColor: style.bg }}
                >
                  <i
                    className={`fas ${style.icon} fa-3x mb-3`}
                    style={{ color: style.color }}
                  ></i>
                  <h4 className="mb-2" style={{ color: style.color }}>
                    {alertMessage.title}
                  </h4>
                  <p
                    className="mb-0"
                    style={{ whiteSpace: "pre-line", color: "#666" }}
                  >
                    {alertMessage.message}
                  </p>
                </div>
              </div>
              <div
                className="modal-footer border-0"
                style={{ justifyContent: "center" }}
              >
                <button
                  type="button"
                  className="btn btn-lg px-5"
                  style={{
                    backgroundColor: style.color,
                    color: "white",
                    borderRadius: "10px",
                    border: "none",
                  }}
                  onClick={() => setShowAlertModal(false)}
                >
                  හරි
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Decision Modal Component
  const DecisionModal = () => {
    if (!showDecisionModal) return null;

    return (
      <>
        <div
          className="modal-backdrop show"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          onClick={closeDecisionModal}
        ></div>
        <div
          className="modal show d-block"
          style={{ zIndex: 1055 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div
              className="modal-content shadow-lg"
              style={{ border: "none", borderRadius: "15px" }}
            >
              <div
                className="modal-header"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  borderRadius: "15px 15px 0 0",
                }}
              >
                <h5 className="modal-title">
                  <i className="fas fa-gavel me-2"></i>
                  බේරුම්කරු තීරණය එකතු කරන්න
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeDecisionModal}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      <i className="fas fa-calendar-alt me-2 text-primary"></i>
                      ණය ලබා දුන් අවසාන දිනය *
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      value={currentDecision.decisionDate}
                      onChange={(e) =>
                        setCurrentDecision({
                          ...currentDecision,
                          decisionDate: e.target.value,
                        })
                      }
                      style={{ borderRadius: "10px" }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      <i className="fas fa-money-bill-wave me-2 text-success"></i>
                      ලැබුණු ණය මුදල (රු.) *
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      placeholder="0.00"
                      value={currentDecision.finalLoanAmount}
                      onChange={(e) =>
                        setCurrentDecision({
                          ...currentDecision,
                          finalLoanAmount: e.target.value,
                        })
                      }
                      style={{ borderRadius: "10px" }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      <i className="fas fa-percent me-2 text-warning"></i>
                      අඩු කළ පොලිය (රු.) *
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      placeholder="0.00"
                      value={currentDecision.interestDeducted}
                      onChange={(e) =>
                        setCurrentDecision({
                          ...currentDecision,
                          interestDeducted: e.target.value,
                        })
                      }
                      style={{ borderRadius: "10px" }}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">
                      <i className="fas fa-file-alt me-2 text-info"></i>
                      බේරුම්කරුගේ තීරණය / සටහන් *
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      rows="4"
                      placeholder="තීරණය හෝ සටහන් මෙහි ඇතුළත් කරන්න..."
                      value={currentDecision.arbitrationDecision}
                      onChange={(e) =>
                        setCurrentDecision({
                          ...currentDecision,
                          arbitrationDecision: e.target.value,
                        })
                      }
                      style={{ borderRadius: "10px" }}
                    ></textarea>
                  </div>
                </div>

                <div
                  className="alert alert-info mt-4 mb-0"
                  style={{ borderRadius: "10px" }}
                >
                  <i className="fas fa-info-circle me-2"></i>
                  <small>
                    සියලු තාරකා (*) සලකුණු කළ ක්ෂේත්‍ර පුරවීම අනිවාර්ය වේ
                  </small>
                </div>
              </div>
              <div
                className="modal-footer"
                style={{ borderTop: "2px solid #f0f0f0" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-lg px-4"
                  onClick={closeDecisionModal}
                  style={{ borderRadius: "10px" }}
                >
                  <i className="fas fa-times me-2"></i>
                  අවලංගු කරන්න
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4"
                  onClick={submitDecision}
                  style={{
                    borderRadius: "10px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                  }}
                >
                  <i className="fas fa-check me-2"></i>
                  තීරණය සුරකින්න
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Decision Details Modal Component
  const DecisionDetailsModal = () => {
    if (!showDecisionDetailsModal || !viewDecisionDetails) return null;

    return (
      <>
        <div
          className="modal-backdrop show"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          onClick={closeDecisionDetailsModal}
        ></div>
        <div
          className="modal show d-block"
          style={{ zIndex: 1055 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div
              className="modal-content shadow-lg"
              style={{ border: "none", borderRadius: "15px" }}
            >
              <div
                className="modal-header"
                style={{
                  background:
                    "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
                  color: "white",
                  borderRadius: "15px 15px 0 0",
                }}
              >
                <h5 className="modal-title">
                  <i className="fas fa-info-circle me-2"></i>
                  බේරුම්කරු තීරණයේ සම්පූර්ණ විස්තර
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeDecisionDetailsModal}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-12">
                    <div className="card border-primary">
                      <div className="card-header bg-primary text-white">
                        <h6 className="mb-0">
                          <i className="fas fa-user me-2"></i>
                          ණයගැතියාගේ තොරතුරු
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <p className="mb-2">
                              <strong>නම:</strong>{" "}
                              {viewDecisionDetails.borrowerName}
                            </p>
                            <p className="mb-2">
                              <strong>ණය අංකය:</strong>{" "}
                              {viewDecisionDetails.loanNumber}
                            </p>
                            <p className="mb-0">
                              <strong>බේරුම් අංකය:</strong>{" "}
                              <span className="text-primary fw-bold">
                                {viewDecisionDetails.arbitrationNumber}
                              </span>
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p className="mb-2">
                              <strong>ලිපිනය:</strong>{" "}
                              {viewDecisionDetails.borrowerAddress}
                            </p>
                            <p className="mb-2">
                              <strong>බේරුම්කරු:</strong>{" "}
                              {viewDecisionDetails.assignedOfficer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="card border-success">
                      <div className="card-header bg-success text-white">
                        <h6 className="mb-0">
                          <i className="fas fa-money-bill-wave me-2"></i>
                          මුල් ණය විස්තර
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4">
                            <p className="mb-2">
                              <strong>ණය මුදල:</strong>
                              <br />
                              <span className="text-success fs-5">
                                රු.{" "}
                                {parseFloat(
                                  viewDecisionDetails.loanAmount
                                ).toLocaleString()}
                              </span>
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p className="mb-2">
                              <strong>පොලිය:</strong>
                              <br />
                              <span className="text-warning fs-5">
                                රු.{" "}
                                {parseFloat(
                                  viewDecisionDetails.interest
                                ).toLocaleString()}
                              </span>
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p className="mb-0">
                              <strong>පොලී අනුපාතය:</strong>
                              <br />
                              <span className="text-info fs-5">
                                {viewDecisionDetails.interestRate}%
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="card border-info">
                      <div className="card-header bg-info text-white">
                        <h6 className="mb-0">
                          <i className="fas fa-gavel me-2"></i>
                          බේරුම්කරු තීරණය
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label className="text-muted small">
                              ණය ලබා දුන් අවසාන දිනය
                            </label>
                            <p className="fw-bold">
                              {viewDecisionDetails.decisionDate
                                ? new Date(
                                    viewDecisionDetails.decisionDate
                                  ).toLocaleDateString("si-LK")
                                : "-"}
                            </p>
                          </div>
                          <div className="col-md-4">
                            <label className="text-muted small">
                              ලැබුණු ණය මුදල
                            </label>
                            <p className="fw-bold text-success fs-5">
                              රු.{" "}
                              {viewDecisionDetails.finalLoanAmount
                                ? parseFloat(
                                    viewDecisionDetails.finalLoanAmount
                                  ).toLocaleString()
                                : "0"}
                            </p>
                          </div>
                          <div className="col-md-4">
                            <label className="text-muted small">
                              අඩු කළ පොලිය
                            </label>
                            <p className="fw-bold text-danger fs-5">
                              රු.{" "}
                              {viewDecisionDetails.interestDeducted
                                ? parseFloat(
                                    viewDecisionDetails.interestDeducted
                                  ).toLocaleString()
                                : "0"}
                            </p>
                          </div>
                        </div>

                        <div
                          className="alert alert-light border"
                          style={{ borderRadius: "10px" }}
                        >
                          <label className="text-muted small mb-2">
                            තීරණය / සටහන්
                          </label>
                          <p
                            className="mb-0"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {viewDecisionDetails.arbitrationDecision || "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal-footer"
                style={{ borderTop: "2px solid #f0f0f0" }}
              >
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-5"
                  onClick={closeDecisionDetailsModal}
                  style={{
                    borderRadius: "10px",
                    background:
                      "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
                    border: "none",
                  }}
                >
                  <i className="fas fa-times me-2"></i>
                  වසන්න
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const SocietyDashboard = () => (
    <div className="container-fluid">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">සමිති පාලන පුවරුව</h2>

          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label fw-bold">දිස්ත්‍රික්කය තෝරන්න</label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedSociety("");
                }}
                className="form-select"
              >
                <option value="">තෝරන්න</option>
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">සමිතිය තෝරන්න</label>
              <select
                value={selectedSociety}
                onChange={(e) => setSelectedSociety(e.target.value)}
                className="form-select"
                disabled={!selectedDistrict}
              >
                <option value="">තෝරන්න</option>
                {selectedDistrict &&
                  societies[selectedDistrict].map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="btn-group mb-4" role="group">
            <button
              onClick={() => setViewMode("form")}
              className={`btn ${
                viewMode === "form" ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              පෝරමය
            </button>
            <button
              onClick={() => setViewMode("pending")}
              className={`btn ${
                viewMode === "pending" ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              අනුමැතිය සඳහා බලා සිටින (
              {
                pendingApprovals.filter((p) => p.society === selectedSociety)
                  .length
              }
              )
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`btn ${
                viewMode === "table" ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              අනුමත කළ ඉදිරිපත් කිරීම්
            </button>
          </div>

          {viewMode === "form" && (
            <>
              {!selectedDistrict || !selectedSociety ? (
                <div className="alert alert-warning">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  කරුණාකර දිස්ත්‍රික්කය සහ සමිතිය තෝරන්න
                </div>
              ) : (
                <>
                  <div className="row g-3 mb-3">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ලියාපදිංචි අංකය"
                        value={currentBorrower.registrationNo}
                        onChange={(e) =>
                          setCurrentBorrower({
                            ...currentBorrower,
                            registrationNo: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ලියාපදිංචි ලිපිනය"
                        value={currentBorrower.registeredAddress}
                        onChange={(e) =>
                          setCurrentBorrower({
                            ...currentBorrower,
                            registeredAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="date"
                        className="form-control"
                        value={currentBorrower.registrationDate}
                        onChange={(e) =>
                          setCurrentBorrower({
                            ...currentBorrower,
                            registrationDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="card bg-light mb-3">
                    <div className="card-body">
                      <h5 className="card-title">ණයගැතියාගේ තොරතුරු</h5>
                      <div className="row g-3">
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="ණය අංකය *"
                            value={currentBorrower.loanNumber}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                loanNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="ණයගැතියාගේ නම *"
                            value={currentBorrower.borrowerName}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                borrowerName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="ලිපිනය"
                            value={currentBorrower.borrowerAddress}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                borrowerAddress: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="සාමාජික අංකය"
                            value={currentBorrower.membershipNo}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                membershipNo: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-light mb-3">
                    <div className="card-body">
                      <h5 className="card-title">පළමු ඇපකරු</h5>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="නම"
                            value={currentBorrower.guarantor1Name}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                guarantor1Name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="ලිපිනය"
                            value={currentBorrower.guarantor1Address}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                guarantor1Address: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="සාමාජික අංකය"
                            value={currentBorrower.guarantor1MembershipNo}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                guarantor1MembershipNo: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-light mb-3">
                    <div className="card-body">
                      <h5 className="card-title">දෙවන ඇපකරු</h5>
                      <div className="row g-3">
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="නම"
                            value={currentBorrower.guarantor2Name}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                guarantor2Name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="ලිපිනය"
                            value={currentBorrower.guarantor2Address}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                guarantor2Address: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="සාමාජික අංකය"
                            value={currentBorrower.guarantor2MembershipNo}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                guarantor2MembershipNo: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-light mb-3">
                    <div className="card-body">
                      <h5 className="card-title">ණය තොරතුරු</h5>
                      <div className="row g-3">
                        <div className="col-md-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="ණය මුදල"
                            value={currentBorrower.loanAmount}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                loanAmount: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="පොලිය"
                            value={currentBorrower.interest}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                interest: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="පොලී අනුපාතය %"
                            value={currentBorrower.interestRate}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                interestRate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="ලිපි ද්‍රව්‍ය ගාස්තු"
                            value={currentBorrower.stationeryFees}
                            onChange={(e) =>
                              setCurrentBorrower({
                                ...currentBorrower,
                                stationeryFees: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={addBorrower}
                    className="btn btn-success w-100 mb-3"
                  >
                    <i className="fas fa-plus me-2"></i>ණයගැතියා එකතු කරන්න
                  </button>

                  {borrowers.length > 0 && (
                    <div>
                      <h5 className="mb-3">
                        එකතු කළ ණයගැතියන් ({borrowers.length})
                      </h5>
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>ණය අංකය</th>
                              <th>නම</th>
                              <th>ලිපිනය</th>
                              <th>ණය මුදල</th>
                              <th>ක්‍රියාව</th>
                            </tr>
                          </thead>
                          <tbody>
                            {borrowers.map((b) => (
                              <tr key={b.id}>
                                <td>{b.loanNumber}</td>
                                <td>{b.borrowerName}</td>
                                <td>{b.borrowerAddress}</td>
                                <td>
                                  රු.{" "}
                                  {parseFloat(b.loanAmount).toLocaleString()}
                                </td>
                                <td>
                                  <button
                                    onClick={() => removeBorrower(b.id)}
                                    className="btn btn-danger btn-sm"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <button
                        onClick={submitForApproval}
                        className="btn btn-warning w-100"
                      >
                        <i className="fas fa-clock me-2"></i>අනුමැතිය සඳහා
                        ඉදිරිපත් කරන්න
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {viewMode === "pending" && (
            <div>
              <h5 className="mb-3">අනුමැතිය සඳහා බලා සිටින ඉදිරිපත් කිරීම්</h5>
              {pendingApprovals
                .filter((p) => p.society === selectedSociety)
                .map((pending) => (
                  <div key={pending.id} className="card mb-4 border-warning">
                    <div className="card-header bg-warning text-dark">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">
                            <i className="fas fa-clock me-2"></i>
                            අනුමැතිය බලා සිටින ඉදිරිපත් කිරීම
                          </h6>
                          <small>
                            ඉදිරිපත් කළ දිනය:{" "}
                            {new Date(pending.submittedDate).toLocaleDateString(
                              "si-LK"
                            )}
                          </small>
                        </div>
                        <div className="btn-group">
                          <button
                            onClick={() => approveSubmission(pending.id)}
                            className="btn btn-success"
                          >
                            <i className="fas fa-check me-2"></i>අනුමත කරන්න
                          </button>
                          <button
                            onClick={() => rejectSubmission(pending.id)}
                            className="btn btn-danger"
                          >
                            <i className="fas fa-times me-2"></i>ප්‍රතික්ෂේප
                            කරන්න
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-sm">
                          <thead className="table-light">
                            <tr>
                              <th>ණය අංකය</th>
                              <th>නම</th>
                              <th>ලිපිනය</th>
                              <th>ණය මුදල</th>
                              <th>පොලිය</th>
                              <th>විස්තර</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pending.borrowers.map((b) => (
                              <React.Fragment key={b.id}>
                                <tr>
                                  <td>{b.loanNumber}</td>
                                  <td>{b.borrowerName}</td>
                                  <td>{b.borrowerAddress}</td>
                                  <td>
                                    රු.{" "}
                                    {parseFloat(b.loanAmount).toLocaleString()}
                                  </td>
                                  <td>
                                    රු.{" "}
                                    {parseFloat(b.interest).toLocaleString()}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        setExpandedBorrower(
                                          expandedBorrower === b.id
                                            ? null
                                            : b.id
                                        )
                                      }
                                      className="btn btn-info btn-sm"
                                    >
                                      <i className="fas fa-eye"></i> විස්තර
                                    </button>
                                  </td>
                                </tr>
                                {expandedBorrower === b.id && (
                                  <tr>
                                    <td colSpan="6" className="bg-light">
                                      <div className="row g-3 p-3">
                                        <div className="col-md-6">
                                          <div className="card">
                                            <div className="card-body">
                                              <h6 className="card-title text-primary border-bottom pb-2">
                                                සම්පූර්ණ තොරතුරු
                                              </h6>
                                              <p className="mb-1">
                                                <strong>
                                                  ලියාපදිංචි අංකය:
                                                </strong>{" "}
                                                {b.registrationNo}
                                              </p>
                                              <p className="mb-1">
                                                <strong>
                                                  ලියාපදිංචි ලිපිනය:
                                                </strong>{" "}
                                                {b.registeredAddress}
                                              </p>
                                              <p className="mb-1">
                                                <strong>
                                                  ලියාපදිංචි දිනය:
                                                </strong>{" "}
                                                {b.registrationDate}
                                              </p>
                                              <p className="mb-1">
                                                <strong>සාමාජික අංකය:</strong>{" "}
                                                {b.membershipNo}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="card">
                                            <div className="card-body">
                                              <h6 className="card-title text-success border-bottom pb-2">
                                                ණය විස්තර
                                              </h6>
                                              <p className="mb-1">
                                                <strong>පොලී අනුපාතය:</strong>{" "}
                                                {b.interestRate}%
                                              </p>
                                              <p className="mb-1">
                                                <strong>
                                                  ලිපි ද්‍රව්‍ය ගාස්තු:
                                                </strong>{" "}
                                                රු.{" "}
                                                {parseFloat(
                                                  b.stationeryFees
                                                ).toLocaleString()}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="card">
                                            <div className="card-body">
                                              <h6 className="card-title text-info border-bottom pb-2">
                                                පළමු ඇපකරු
                                              </h6>
                                              <p className="mb-1">
                                                <strong>නම:</strong>{" "}
                                                {b.guarantor1Name}
                                              </p>
                                              <p className="mb-1">
                                                <strong>ලිපිනය:</strong>{" "}
                                                {b.guarantor1Address}
                                              </p>
                                              <p className="mb-0">
                                                <strong>සාමාජික අංකය:</strong>{" "}
                                                {b.guarantor1MembershipNo}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="card">
                                            <div className="card-body">
                                              <h6 className="card-title text-info border-bottom pb-2">
                                                දෙවන ඇපකරු
                                              </h6>
                                              <p className="mb-1">
                                                <strong>නම:</strong>{" "}
                                                {b.guarantor2Name}
                                              </p>
                                              <p className="mb-1">
                                                <strong>ලිපිනය:</strong>{" "}
                                                {b.guarantor2Address}
                                              </p>
                                              <p className="mb-0">
                                                <strong>සාමාජික අංකය:</strong>{" "}
                                                {b.guarantor2MembershipNo}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              {pendingApprovals.filter((p) => p.society === selectedSociety)
                .length === 0 && (
                <div className="alert alert-info text-center">
                  <i className="fas fa-info-circle me-2"></i>
                  අනුමැතිය සඳහා බලා සිටින ඉදිරිපත් කිරීම් නොමැත
                </div>
              )}
            </div>
          )}

          {viewMode === "table" && (
            <div>
              <h5 className="mb-3">අනුමත කළ ඉදිරිපත් කිරීම්</h5>
              {submissions
                .filter((s) => s.society === selectedSociety)
                .map((submission) => (
                  <div key={submission.id} className="card mb-4">
                    <div className="card-body">
                      <p className="text-muted mb-1">
                        අනුමත කළ දිනය:{" "}
                        {submission.approvedDate
                          ? new Date(
                              submission.approvedDate
                            ).toLocaleDateString("si-LK")
                          : "-"}
                      </p>
                      <p className="text-muted">
                        ඉදිරිපත් කළ දිනය:{" "}
                        {new Date(submission.submittedDate).toLocaleDateString(
                          "si-LK"
                        )}
                      </p>
                      <div className="table-responsive">
                        <table className="table table-bordered table-sm">
                          <thead className="table-light">
                            <tr>
                              <th>ණය අංකය</th>
                              <th>නම</th>
                              <th>ණය මුදල</th>
                              <th>බේරුම් ගාස්තු</th>
                              <th>බේරුම් අංකය</th>
                              <th>බේරුම්කරු</th>
                              <th>තීරණය</th>
                              <th>තත්වය</th>
                              <th>විස්තර</th>
                            </tr>
                          </thead>
                          <tbody>
                            {submission.borrowers.map((b) => (
                              <React.Fragment key={b.id}>
                                <tr>
                                  <td>{b.loanNumber}</td>
                                  <td>{b.borrowerName}</td>
                                  <td>
                                    රු.{" "}
                                    {parseFloat(b.loanAmount).toLocaleString()}
                                  </td>
                                  <td className="text-center">
                                    {b.arbitrationFeePaid ? (
                                      <span className="badge bg-success">
                                        ගෙවා ඇත
                                      </span>
                                    ) : (
                                      <span className="badge bg-danger">
                                        නොගෙවා
                                      </span>
                                    )}
                                  </td>
                                  <td>{b.arbitrationNumber || "-"}</td>
                                  <td>{b.assignedOfficer || "-"}</td>
                                  <td className="text-center">
                                    {b.arbitrationDecision ? (
                                      <button
                                        onClick={() =>
                                          openDecisionDetailsModal(b)
                                        }
                                        className="btn btn-info btn-sm"
                                      >
                                        <i className="fas fa-eye me-1"></i>
                                        තීරණය බලන්න
                                      </button>
                                    ) : b.status === "assigned" ? (
                                      <span className="badge bg-warning">
                                        බලා සිටින්න
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                  <td>
                                    {b.status === "pending" && "අනුමැතියට"}
                                    {b.status === "assigned" && "පවරා ඇත"}
                                    {b.status === "decision-given" &&
                                      "තීරණය ලබා දී ඇත"}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        setExpandedBorrower(
                                          expandedBorrower === b.id
                                            ? null
                                            : b.id
                                        )
                                      }
                                      className="btn btn-info btn-sm"
                                    >
                                      <i className="fas fa-eye"></i> විස්තර
                                    </button>
                                  </td>
                                </tr>
                                {expandedBorrower === b.id && (
                                  <tr>
                                    <td colSpan="9" className="bg-light">
                                      <div className="row g-3 p-3">
                                        <div className="col-md-6">
                                          <div className="card">
                                            <div className="card-body">
                                              <h6 className="card-title text-primary border-bottom pb-2">
                                                ණයගැතියාගේ සම්පූර්ණ තොරතුරු
                                              </h6>
                                              <p className="mb-1">
                                                <strong>නම:</strong>{" "}
                                                {b.borrowerName}
                                              </p>
                                              <p className="mb-1">
                                                <strong>ලිපිනය:</strong>{" "}
                                                {b.borrowerAddress}
                                              </p>
                                              <p className="mb-1">
                                                <strong>සාමාජික අංකය:</strong>{" "}
                                                {b.membershipNo}
                                              </p>
                                              <p className="mb-1">
                                                <strong>
                                                  ලියාපදිංචි අංකය:
                                                </strong>{" "}
                                                {b.registrationNo}
                                              </p>
                                              <p className="mb-1">
                                                <strong>
                                                  ලියාපදිංචි ලිපිනය:
                                                </strong>{" "}
                                                {b.registeredAddress}
                                              </p>
                                              <p className="mb-0">
                                                <strong>
                                                  ලියාපදිංචි දිනය:
                                                </strong>{" "}
                                                {b.registrationDate}
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="card">
                                            <div className="card-body">
                                              <h6 className="card-title text-primary border-bottom pb-2">
                                                ණය විස්තර
                                              </h6>
                                              <p className="mb-1">
                                                <strong>ණය අංකය:</strong>{" "}
                                                {b.loanNumber}
                                              </p>
                                              <p className="mb-1">
                                                <strong>ණය මුදල:</strong> රු.{" "}
                                                {parseFloat(
                                                  b.loanAmount
                                                ).toLocaleString()}
                                              </p>
                                              <p className="mb-1">
                                                <strong>පොලිය:</strong> රු.{" "}
                                                {parseFloat(
                                                  b.interest
                                                ).toLocaleString()}
                                              </p>
                                              <p className="mb-1">
                                                <strong>පොලී අනුපාතය:</strong>{" "}
                                                {b.interestRate}%
                                              </p>
                                              <p className="mb-0">
                                                <strong>
                                                  ලිපි ද්‍රව්‍ය ගාස්තු:
                                                </strong>{" "}
                                                රු.{" "}
                                                {parseFloat(
                                                  b.stationeryFees
                                                ).toLocaleString()}
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="card">
                                            <div className="card-body">
                                              <h6 className="card-title text-success border-bottom pb-2">
                                                පළමු ඇපකරු
                                              </h6>
                                              <p className="mb-1">
                                                <strong>නම:</strong>{" "}
                                                {b.guarantor1Name}
                                              </p>
                                              <p className="mb-1">
                                                <strong>ලිපිනය:</strong>{" "}
                                                {b.guarantor1Address}
                                              </p>
                                              <p className="mb-0">
                                                <strong>සාමාජික අංකය:</strong>{" "}
                                                {b.guarantor1MembershipNo}
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="card">
                                            <div className="card-body">
                                              <h6 className="card-title text-success border-bottom pb-2">
                                                දෙවන ඇපකරු
                                              </h6>
                                              <p className="mb-1">
                                                <strong>නම:</strong>{" "}
                                                {b.guarantor2Name}
                                              </p>
                                              <p className="mb-1">
                                                <strong>ලිපිනය:</strong>{" "}
                                                {b.guarantor2Address}
                                              </p>
                                              <p className="mb-0">
                                                <strong>සාමාජික අංකය:</strong>{" "}
                                                {b.guarantor2MembershipNo}
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        {b.arbitrationDecision && (
                                          <div className="col-12">
                                            <div className="card">
                                              <div className="card-body">
                                                <h6 className="card-title text-info border-bottom pb-2">
                                                  බේරුම්කරුගේ තීරණය
                                                </h6>
                                                <p className="mb-1">
                                                  <strong>
                                                    ණය ලබා දුන් අවසාන දිනය:
                                                  </strong>{" "}
                                                  {b.decisionDate}
                                                </p>
                                                <p className="mb-1">
                                                  <strong>
                                                    ලැබුණු ණය මුදල:
                                                  </strong>{" "}
                                                  රු.{" "}
                                                  {parseFloat(
                                                    b.finalLoanAmount
                                                  ).toLocaleString()}
                                                </p>
                                                <p className="mb-1">
                                                  <strong>අඩු කළ පොලිය:</strong>{" "}
                                                  රු.{" "}
                                                  {parseFloat(
                                                    b.interestDeducted
                                                  ).toLocaleString()}
                                                </p>
                                                <p className="mb-0">
                                                  <strong>තීරණය:</strong>{" "}
                                                  {b.arbitrationDecision}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              {submissions.filter((s) => s.society === selectedSociety)
                .length === 0 && (
                <div className="alert alert-info text-center">
                  <i className="fas fa-info-circle me-2"></i>
                  තවමත් අනුමත කළ ඉදිරිපත් කිරීම් නොමැත
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const DistrictDashboard = () => {
    const districtSubmissions = districtOfficeDistrict
      ? submissions.filter((s) => s.district === districtOfficeDistrict)
      : [];

    return (
      <div className="container-fluid">
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">ජිල්ලා කාර්යාල පාලන පුවරුව</h2>

            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold">
                  දිස්ත්‍රික්කය තෝරන්න
                </label>
                <select
                  value={districtOfficeDistrict}
                  onChange={(e) => setDistrictOfficeDistrict(e.target.value)}
                  className="form-select"
                >
                  <option value="">තෝරන්න</option>
                  {DISTRICTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!districtOfficeDistrict ? (
              <div className="alert alert-warning">
                <i className="fas fa-exclamation-triangle me-2"></i>
                කරුණාකර දිස්ත්‍රික්කයක් තෝරන්න
              </div>
            ) : (
              <>
                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        districtTab === "submissions" ? "active" : ""
                      }`}
                      onClick={() => setDistrictTab("submissions")}
                    >
                      ඉදිරිපත් කිරීම්
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        districtTab === "officers" ? "active" : ""
                      }`}
                      onClick={() => setDistrictTab("officers")}
                    >
                      බේරුම්කරුවන්
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        districtTab === "societies" ? "active" : ""
                      }`}
                      onClick={() => setDistrictTab("societies")}
                    >
                      සමිති
                    </button>
                  </li>
                </ul>

                {districtTab === "submissions" && (
                  <>
                    {districtSubmissions.map((submission) => {
                      const district = DISTRICTS.find(
                        (d) => d.id === submission.district
                      );
                      const society = societies[submission.district].find(
                        (s) => s.id === submission.society
                      );

                      return (
                        <div key={submission.id} className="card mb-4">
                          <div className="card-body">
                            <h5 className="card-title">{society.name}</h5>
                            <p className="text-muted mb-1">
                              දිස්ත්‍රික්කය: {district.name}
                            </p>
                            <p className="text-muted">
                              අනුමත කළ දිනය:{" "}
                              {submission.approvedDate
                                ? new Date(
                                    submission.approvedDate
                                  ).toLocaleDateString("si-LK")
                                : "-"}
                            </p>

                            <div className="table-responsive">
                              <table className="table table-bordered table-sm">
                                <thead className="table-light">
                                  <tr>
                                    <th>ණය අංකය</th>
                                    <th>නම</th>
                                    <th>ලිපිනය</th>
                                    <th>ණය මුදල</th>
                                    <th>පොලිය</th>
                                    <th>බේරුම් ගාස්තු</th>
                                    <th>බේරුම් අංකය</th>
                                    <th>බේරුම්කරු</th>
                                    <th>තීරණය එකතු කරන්න</th>
                                    <th>ක්‍රියාව</th>
                                    <th>විස්තර</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {submission.borrowers.map((borrower) => (
                                    <React.Fragment key={borrower.id}>
                                      <tr>
                                        <td>{borrower.loanNumber}</td>
                                        <td>{borrower.borrowerName}</td>
                                        <td>{borrower.borrowerAddress}</td>
                                        <td>
                                          රු.{" "}
                                          {parseFloat(
                                            borrower.loanAmount
                                          ).toLocaleString()}
                                        </td>
                                        <td>
                                          රු.{" "}
                                          {parseFloat(
                                            borrower.interest
                                          ).toLocaleString()}
                                        </td>
                                        <td className="text-center">
                                          {borrower.arbitrationFeePaid ? (
                                            <span className="badge bg-success">
                                              ගෙවා ඇත
                                            </span>
                                          ) : (
                                            <div className="btn-group btn-group-sm">
                                              <button
                                                onClick={() =>
                                                  updateArbitrationFee(
                                                    submission.id,
                                                    borrower.id,
                                                    false
                                                  )
                                                }
                                                className="btn btn-danger"
                                              >
                                                නොගෙවා
                                              </button>
                                              <button
                                                onClick={() =>
                                                  updateArbitrationFee(
                                                    submission.id,
                                                    borrower.id,
                                                    true
                                                  )
                                                }
                                                className="btn btn-success"
                                              >
                                                ගෙවා ඇත
                                              </button>
                                            </div>
                                          )}
                                        </td>
                                        <td className="fw-bold text-primary">
                                          {borrower.arbitrationNumber || "-"}
                                        </td>
                                        <td>
                                          {borrower.assignedOfficer || "-"}
                                        </td>
                                        <td className="text-center">
                                          {borrower.status === "assigned" &&
                                            !borrower.arbitrationDecision && (
                                              <button
                                                onClick={() =>
                                                  openDecisionModal(
                                                    submission.id,
                                                    borrower.id
                                                  )
                                                }
                                                className="btn btn-info btn-sm"
                                              >
                                                තීරණය එකතු කරන්න
                                              </button>
                                            )}
                                          {borrower.arbitrationDecision && (
                                            <button
                                              onClick={() =>
                                                openDecisionDetailsModal(
                                                  borrower
                                                )
                                              }
                                              className="btn btn-success btn-sm"
                                            >
                                              <i className="fas fa-eye me-1"></i>
                                              තීරණය බලන්න
                                            </button>
                                          )}
                                        </td>
                                        <td className="text-center">
                                          {borrower.arbitrationNumber && (
                                            <button
                                              onClick={() =>
                                                generateLetter(
                                                  borrower,
                                                  submission
                                                )
                                              }
                                              className="btn btn-primary btn-sm"
                                            >
                                              <i className="fas fa-file-alt"></i>{" "}
                                              ලිපිය
                                            </button>
                                          )}
                                        </td>
                                        <td>
                                          <button
                                            onClick={() =>
                                              setExpandedBorrower(
                                                expandedBorrower === borrower.id
                                                  ? null
                                                  : borrower.id
                                              )
                                            }
                                            className="btn btn-info btn-sm"
                                          >
                                            <i className="fas fa-eye"></i>{" "}
                                            විස්තර
                                          </button>
                                        </td>
                                      </tr>
                                      {expandedBorrower === borrower.id && (
                                        <tr>
                                          <td colSpan="11" className="bg-light">
                                            <div className="row g-3 p-3">
                                              <div className="col-md-6">
                                                <div className="card">
                                                  <div className="card-body">
                                                    <h6 className="card-title text-primary border-bottom pb-2">
                                                      ණයගැතියාගේ සම්පූර්ණ
                                                      තොරතුරු
                                                    </h6>
                                                    <p className="mb-1">
                                                      <strong>නම:</strong>{" "}
                                                      {borrower.borrowerName}
                                                    </p>
                                                    <p className="mb-1">
                                                      <strong>ලිපිනය:</strong>{" "}
                                                      {borrower.borrowerAddress}
                                                    </p>
                                                    <p className="mb-1">
                                                      <strong>
                                                        සාමාජික අංකය:
                                                      </strong>{" "}
                                                      {borrower.membershipNo}
                                                    </p>
                                                    <p className="mb-1">
                                                      <strong>
                                                        ලියාපදිංචි අංකය:
                                                      </strong>{" "}
                                                      {borrower.registrationNo}
                                                    </p>
                                                    <p className="mb-1">
                                                      <strong>
                                                        ලියාපදිංචි ලිපිනය:
                                                      </strong>{" "}
                                                      {
                                                        borrower.registeredAddress
                                                      }
                                                    </p>
                                                    <p className="mb-0">
                                                      <strong>
                                                        ලියාපදිංචි දිනය:
                                                      </strong>{" "}
                                                      {
                                                        borrower.registrationDate
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="card">
                                                  <div className="card-body">
                                                    <h6 className="card-title text-primary border-bottom pb-2">
                                                      ණය විස්තර
                                                    </h6>
                                                    <p className="mb-1">
                                                      <strong>ණය අංකය:</strong>{" "}
                                                      {borrower.loanNumber}
                                                    </p>
                                                    <p className="mb-1">
                                                      <strong>ණය මුදල:</strong>{" "}
                                                      රු.{" "}
                                                      {parseFloat(
                                                        borrower.loanAmount
                                                      ).toLocaleString()}
                                                    </p>
                                                    <p className="mb-1">
                                                      <strong>පොලිය:</strong>{" "}
                                                      රු.{" "}
                                                      {parseFloat(
                                                        borrower.interest
                                                      ).toLocaleString()}
                                                    </p>
                                                    <p className="mb-1">
                                                      <strong>
                                                        පොලී අනුපාතය:
                                                      </strong>{" "}
                                                      {borrower.interestRate}%
                                                    </p>
                                                    <p className="mb-0">
                                                      <strong>
                                                        ලිපි ද්‍රව්‍ය ගාස්තු:
                                                      </strong>{" "}
                                                      රු.{" "}
                                                      {parseFloat(
                                                        borrower.stationeryFees
                                                      ).toLocaleString()}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="card">
                                                  <div className="card-body">
                                                    <h6 className="card-title text-success border-bottom pb-2">
                                                      පළමු ඇපකරු
                                                    </h6>
                                                    <p className="mb-1">
                                                      <strong>නම:</strong>{" "}
                                                      {borrower.guarantor1Name}
                                                    </p>
                                                    <p className="mb-1">
                                                      <strong>ලිපිනය:</strong>{" "}
                                                      {
                                                        borrower.guarantor1Address
                                                      }
                                                    </p>
                                                    <p className="mb-0">
                                                      <strong>
                                                        සාමාජික අංකය:
                                                      </strong>{" "}
                                                      {
                                                        borrower.guarantor1MembershipNo
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="card">
                                                  <div className="card-body">
                                                    <h6 className="card-title text-success border-bottom pb-2">
                                                      දෙවන ඇපකරු
                                                    </h6>
                                                    <p className="mb-1">
                                                      <strong>නම:</strong>{" "}
                                                      {borrower.guarantor2Name}
                                                    </p>
                                                    <p className="mb-1">
                                                      <strong>ලිපිනය:</strong>{" "}
                                                      {
                                                        borrower.guarantor2Address
                                                      }
                                                    </p>
                                                    <p className="mb-0">
                                                      <strong>
                                                        සාමාජික අංකය:
                                                      </strong>{" "}
                                                      {
                                                        borrower.guarantor2MembershipNo
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>

                                              {borrower.arbitrationDecision && (
                                                <div className="col-12">
                                                  <div className="card">
                                                    <div className="card-body">
                                                      <h6 className="card-title text-info border-bottom pb-2">
                                                        බේරුම්කරුගේ තීරණය
                                                      </h6>
                                                      <p className="mb-1">
                                                        <strong>
                                                          ණය ලබා දුන් අවසාන
                                                          දිනය:
                                                        </strong>{" "}
                                                        {borrower.decisionDate}
                                                      </p>
                                                      <p className="mb-1">
                                                        <strong>
                                                          ලැබුණු ණය මුදල:
                                                        </strong>{" "}
                                                        රු.{" "}
                                                        {parseFloat(
                                                          borrower.finalLoanAmount
                                                        ).toLocaleString()}
                                                      </p>
                                                      <p className="mb-1">
                                                        <strong>
                                                          අඩු කළ පොලිය:
                                                        </strong>{" "}
                                                        රු.{" "}
                                                        {parseFloat(
                                                          borrower.interestDeducted
                                                        ).toLocaleString()}
                                                      </p>
                                                      <p className="mb-0">
                                                        <strong>තීරණය:</strong>{" "}
                                                        {
                                                          borrower.arbitrationDecision
                                                        }
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </td>
                                        </tr>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {districtSubmissions.length === 0 && (
                      <div className="alert alert-info text-center">
                        මෙම දිස්ත්‍රික්කයේ තවමත් ඉදිරිපත් කිරීම් නොමැත
                      </div>
                    )}
                  </>
                )}

                {districtTab === "officers" && (
                  <div>
                    <h5 className="mb-4">බේරුම්කරුවන් කළමනාකරණය</h5>

                    <div className="card bg-light mb-4">
                      <div className="card-body">
                        <h6 className="card-title">
                          නව බේරුම්කරුවෙකු එකතු කරන්න
                        </h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="නම"
                              value={newOfficer.name}
                              onChange={(e) =>
                                setNewOfficer({
                                  ...newOfficer,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <button
                              onClick={() => {
                                if (!newOfficer.name) {
                                  showAlert(
                                    "දෝෂයකි!",
                                    "කරුණාකර නම ඇතුළත් කරන්න",
                                    "warning"
                                  );
                                  return;
                                }
                                const officer = {
                                  id: "ao-" + Date.now(),
                                  name: newOfficer.name,
                                  district: districtOfficeDistrict,
                                  assignedTo: null,
                                };
                                setArbitrationOfficers([
                                  ...arbitrationOfficers,
                                  officer,
                                ]);
                                setNewOfficer({ name: "", district: "" });
                                showAlert(
                                  "සාර්ථකයි!",
                                  "බේරුම්කරු සාර්ථකව එකතු කරන ලදී!",
                                  "success"
                                );
                              }}
                              className="btn btn-success w-100"
                            >
                              එකතු කරන්න
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>නම</th>
                            <th>තත්වය</th>
                            <th>පවරා ඇති සමිතිය</th>
                          </tr>
                        </thead>
                        <tbody>
                          {arbitrationOfficers
                            .filter(
                              (ao) => ao.district === districtOfficeDistrict
                            )
                            .map((officer) => {
                              const assignedSociety = officer.assignedTo
                                ? societies[officer.district].find(
                                    (s) => s.id === officer.assignedTo
                                  )
                                : null;

                              return (
                                <tr key={officer.id}>
                                  <td>{officer.name}</td>
                                  <td className="text-center">
                                    {officer.assignedTo === null ? (
                                      <span className="badge bg-success">
                                        ලබා ගත හැකිය
                                      </span>
                                    ) : (
                                      <span className="badge bg-danger">
                                        පවරා ඇත
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    {assignedSociety
                                      ? assignedSociety.name
                                      : "-"}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {districtTab === "societies" && (
                  <div>
                    <h5 className="mb-4">සමිති කළමනාකරණය</h5>

                    <div className="card bg-light mb-4">
                      <div className="card-body">
                        <h6 className="card-title">නව සමිතියක් එකතු කරන්න</h6>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="සමිතියේ නම"
                              value={newSociety.name}
                              onChange={(e) =>
                                setNewSociety({
                                  ...newSociety,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <button
                              onClick={() => {
                                if (!newSociety.name) {
                                  showAlert(
                                    "දෝෂයකි!",
                                    "කරුණාකර සමිතියේ නම ඇතුළත් කරන්න",
                                    "warning"
                                  );
                                  return;
                                }
                                const society = {
                                  id:
                                    districtOfficeDistrict.substring(0, 1) +
                                    "-s-" +
                                    Date.now(),
                                  name: newSociety.name,
                                };
                                setSocieties({
                                  ...societies,
                                  [districtOfficeDistrict]: [
                                    ...societies[districtOfficeDistrict],
                                    society,
                                  ],
                                });
                                setNewSociety({ name: "", district: "" });
                                showAlert(
                                  "සාර්ථකයි!",
                                  "සමිතිය සාර්ථකව එකතු කරන ලදී!",
                                  "success"
                                );
                              }}
                              className="btn btn-success w-100"
                            >
                              එකතු කරන්න
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>සමිතියේ නම</th>
                            <th>ඉදිරිපත් කිරීම් ගණන</th>
                          </tr>
                        </thead>
                        <tbody>
                          {societies[districtOfficeDistrict].map((society) => {
                            const submissionCount = submissions.filter(
                              (s) =>
                                s.society === society.id &&
                                s.district === districtOfficeDistrict
                            ).length;

                            return (
                              <tr key={society.id}>
                                <td>{society.name}</td>
                                <td className="text-center">
                                  {submissionCount}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProvincialDashboard = () => (
    <div className="container-fluid">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">පළාත් කාර්යාල පාලන පුවරුව</h2>
          <p className="text-muted mb-4">
            මධ්‍ය පළාතේ සියලුම දිස්ත්‍රික්ක වල තොරතුරු
          </p>

          {DISTRICTS.map((district) => {
            const districtSubmissions = submissions.filter(
              (s) => s.district === district.id
            );
            const totalBorrowers = districtSubmissions.reduce(
              (sum, sub) => sum + sub.borrowers.length,
              0
            );
            const completedDecisions = districtSubmissions
              .flatMap((s) => s.borrowers)
              .filter((b) => b.status === "decision-given").length;

            return (
              <div key={district.id} className="card mb-4 border-primary">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {district.name} දිස්ත්‍රික්කය
                  </h4>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <div className="card bg-info text-white">
                        <div className="card-body text-center">
                          <h5 className="card-title">ඉදිරිපත් කිරීම්</h5>
                          <h2>{districtSubmissions.length}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card bg-warning text-white">
                        <div className="card-body text-center">
                          <h5 className="card-title">ණයගැතියන්</h5>
                          <h2>{totalBorrowers}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card bg-success text-white">
                        <div className="card-body text-center">
                          <h5 className="card-title">තීරණ</h5>
                          <h2>{completedDecisions}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card bg-secondary text-white">
                        <div className="card-body text-center">
                          <h5 className="card-title">සමිති</h5>
                          <h2>{societies[district.id].length}</h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  {districtSubmissions.length > 0 ? (
                    districtSubmissions.map((submission) => {
                      const society = societies[submission.district].find(
                        (s) => s.id === submission.society
                      );

                      return (
                        <div key={submission.id} className="card mb-3">
                          <div className="card-header">
                            <h6 className="mb-0">{society.name}</h6>
                            <small className="text-muted">
                              අනුමත කළ දිනය:{" "}
                              {submission.approvedDate
                                ? new Date(
                                    submission.approvedDate
                                  ).toLocaleDateString("si-LK")
                                : "-"}
                            </small>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-sm table-bordered">
                                <thead className="table-light">
                                  <tr>
                                    <th>ණය අංකය</th>
                                    <th>ණයගැතියා</th>
                                    <th>ණය මුදල</th>
                                    <th>බේරුම් අංකය</th>
                                    <th>බේරුම්කරු</th>
                                    <th>තත්වය</th>
                                    <th>තීරණය</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {submission.borrowers.map((borrower) => (
                                    <tr key={borrower.id}>
                                      <td>{borrower.loanNumber}</td>
                                      <td>{borrower.borrowerName}</td>
                                      <td>
                                        රු.{" "}
                                        {parseFloat(
                                          borrower.loanAmount
                                        ).toLocaleString()}
                                      </td>
                                      <td>
                                        {borrower.arbitrationNumber || "-"}
                                      </td>
                                      <td>{borrower.assignedOfficer || "-"}</td>
                                      <td>
                                        {borrower.status === "pending" && (
                                          <span className="badge bg-warning">
                                            අනුමැතියට
                                          </span>
                                        )}
                                        {borrower.status === "assigned" && (
                                          <span className="badge bg-info">
                                            පවරා ඇත
                                          </span>
                                        )}
                                        {borrower.status ===
                                          "decision-given" && (
                                          <span className="badge bg-success">
                                            තීරණය ලබා දී ඇත
                                          </span>
                                        )}
                                      </td>
                                      <td className="text-center">
                                        {borrower.arbitrationDecision ? (
                                          <button
                                            onClick={() =>
                                              openDecisionDetailsModal(borrower)
                                            }
                                            className="btn btn-info btn-sm"
                                          >
                                            <i className="fas fa-eye me-1"></i>
                                            තීරණය බලන්න
                                          </button>
                                        ) : borrower.status === "assigned" ? (
                                          <span className="badge bg-warning">
                                            බලා සිටින්න
                                          </span>
                                        ) : (
                                          "-"
                                        )}
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
                  ) : (
                    <div className="alert alert-info">
                      මෙම දිස්ත්‍රික්කයේ තවමත් ඉදිරිපත් කිරීම් නොමැත
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        padding: "30px 0",
      }}
    >
      <div className="container">
        <div className="card shadow-lg mb-4">
          <div className="card-body text-center">
            <h1 className="mb-2">මධ්‍ය පළාත් ණය එකතු කිරීමේ පද්ධතිය</h1>
            <p className="text-muted mb-4">
              Central Province Debt Collection System
            </p>

            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button
                onClick={() => setUserRole("society")}
                className={`btn ${
                  userRole === "society" ? "btn-primary" : "btn-outline-primary"
                } btn-lg`}
              >
                <i className="fas fa-building me-2"></i>සමිති ප්‍රවේශය
              </button>
              <button
                onClick={() => setUserRole("district")}
                className={`btn ${
                  userRole === "district"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn-lg`}
              >
                <i className="fas fa-landmark me-2"></i>ජිල්ලා කාර්යාල ප්‍රවේශය
              </button>
              <button
                onClick={() => setUserRole("provincial")}
                className={`btn ${
                  userRole === "provincial"
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn-lg`}
              >
                <i className="fas fa-city me-2"></i>පළාත් කාර්යාල ප්‍රවේශය
              </button>
            </div>
          </div>
        </div>

        {userRole === "society" && <SocietyDashboard />}
        {userRole === "district" && <DistrictDashboard />}
        {userRole === "provincial" && <ProvincialDashboard />}
      </div>

      <AlertModal />
      <DecisionModal />
      <DecisionDetailsModal />
    </div>
  );
};

export default App;






import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Users,
  Building,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Search,
  X,
} from "lucide-react";
import api from "../services/api";

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("SOCIETY");
  const [districts, setDistricts] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [legalOfficers, setLegalOfficers] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    district: "",
    societyId: "",
    role: "SOCIETY_ADMIN",
    officerId: "",
    legalOfficerId: "",
    designation: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // States for searchable dropdowns
  const [societySearch, setSocietySearch] = useState("");
  const [showSocietyDropdown, setShowSocietyDropdown] = useState(false);
  const [officerSearch, setOfficerSearch] = useState("");
  const [showOfficerDropdown, setShowOfficerDropdown] = useState(false);
  const [legalOfficerSearch, setLegalOfficerSearch] = useState("");
  const [showLegalOfficerDropdown, setShowLegalOfficerDropdown] = useState(false);

  const societyDropdownRef = useRef(null);
  const officerDropdownRef = useRef(null);
  const legalOfficerDropdownRef = useRef(null);

  useEffect(() => {
    loadDistricts();
  }, []);

  useEffect(() => {
    if (formData.district && userType === "SOCIETY") {
      loadAvailableSocieties(formData.district);
    }
  }, [formData.district, userType]);

  useEffect(() => {
    if (
      formData.district &&
      userType === "OFFICER" &&
      formData.role === "OFFICER"
    ) {
      loadAvailableOfficers(formData.district);
    }
  }, [formData.district, formData.role, userType]);

  useEffect(() => {
    if (
      formData.district &&
      userType === "OFFICER" &&
      formData.role === "LEGAL_OFFICER"
    ) {
      loadAvailableLegalOfficers(formData.district);
    }
  }, [formData.district, formData.role, userType]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        societyDropdownRef.current &&
        !societyDropdownRef.current.contains(event.target)
      ) {
        setShowSocietyDropdown(false);
      }
      if (
        officerDropdownRef.current &&
        !officerDropdownRef.current.contains(event.target)
      ) {
        setShowOfficerDropdown(false);
      }
      if (
        legalOfficerDropdownRef.current &&
        !legalOfficerDropdownRef.current.contains(event.target)
      ) {
        setShowLegalOfficerDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadDistricts = async () => {
    try {
      const data = await api.getDistricts();
      setDistricts(data);
    } catch (err) {
      setError("Failed to load districts");
    }
  };

  const loadAvailableSocieties = async (districtId) => {
    try {
      const data = await api.getAvailableSocietiesForRegistration(districtId);
      setSocieties(data || []);
    } catch (err) {
      console.error("Failed to load societies:", err);
      setSocieties([]);
    }
  };

  const loadAvailableOfficers = async (districtId) => {
    try {
      const data = await api.getAvailableOfficersForRegistration(districtId);
      setOfficers(data || []);
    } catch (err) {
      console.error("Failed to load officers:", err);
      setOfficers([]);
    }
  };

  const loadAvailableLegalOfficers = async (districtId) => {
    try {
      const data = await api.getAvailableLegalOfficersForRegistration(districtId);
      setLegalOfficers(data || []);
    } catch (err) {
      console.error("Failed to load legal officers:", err);
      setLegalOfficers([]);
    }
  };

  // Transliteration helper - converts Sinhala to English phonetic
  const transliterateSinhalaToEnglish = (text) => {
    // Compound characters MUST be replaced first (consonant + vowel sign combinations)
    const compounds = {
      // ම combinations
      මො: "mo", මෝ: "mo", මා: "ma", මැ: "ma", මෑ: "ma",
      මි: "mi", මී: "mi", මු: "mu", මූ: "mu", මේ: "me", මෙ: "me",
      // න combinations
      නො: "no", නෝ: "no", නා: "na", නැ: "na", නෑ: "na",
      නි: "ni", නී: "ni", නු: "nu", නූ: "nu", නේ: "ne", නෙ: "ne",
      // ක combinations
      කො: "ko", කෝ: "ko", කා: "ka", කැ: "ka", කෑ: "ka",
      කි: "ki", කී: "ki", කු: "ku", කූ: "ku", කේ: "ke", කෙ: "ke",
      // ග combinations
      ගො: "go", ගෝ: "go", ගා: "ga", ගැ: "ga", ගෑ: "ga",
      ගි: "gi", ගී: "gi", ගු: "gu", ගූ: "gu", ගේ: "ge", ගෙ: "ge",
      // ජ combinations
      ජො: "jo", ජෝ: "jo", ජා: "ja", ජැ: "ja", ජෑ: "ja",
      ජි: "ji", ජී: "ji", ජු: "ju", ජූ: "ju", ජේ: "je", ජෙ: "je",
      // ප combinations
      පො: "po", පෝ: "po", පා: "pa", පැ: "pa", පෑ: "pa",
      පි: "pi", පී: "pi", පු: "pu", පූ: "pu", පේ: "pe", පෙ: "pe",
      // බ combinations
      බො: "bo", බෝ: "bo", බා: "ba", බැ: "ba", බෑ: "ba",
      බි: "bi", බී: "bi", බු: "bu", බූ: "bu", බේ: "be", බෙ: "be",
      // ත combinations
      තො: "to", තෝ: "to", තා: "ta", තැ: "ta", තෑ: "ta",
      ති: "ti", තී: "ti", තු: "tu", තූ: "tu", තේ: "te", තෙ: "te",
      // ද combinations
      දො: "do", දෝ: "do", දා: "da", දැ: "da", දෑ: "da",
      දි: "di", දී: "di", දු: "du", දූ: "du", දේ: "de", දෙ: "de",
      // ස combinations
      සො: "so", සෝ: "so", සා: "sa", සැ: "sa", සෑ: "sa",
      සි: "si", සී: "si", සු: "su", සූ: "su", සේ: "se", සෙ: "se",
      // ව combinations
      වො: "wo", වෝ: "wo", වා: "wa", වැ: "wa", වෑ: "wa",
      වි: "wi", වී: "wi", වු: "wu", වූ: "wu", වේ: "we", වෙ: "we",
      // ර combinations
      රො: "ro", රෝ: "ro", රා: "ra", රැ: "ra", රෑ: "ra",
      රි: "ri", රී: "ri", රු: "ru", රූ: "ru", රේ: "re", රෙ: "re",
      // ල combinations
      ලො: "lo", ලෝ: "lo", ලා: "la", ලැ: "la", ලෑ: "la",
      ලි: "li", ලී: "li", ලු: "lu", ලූ: "lu", ලේ: "le", ලෙ: "le",
      // ය combinations
      යො: "yo", යෝ: "yo", යා: "ya", යැ: "ya", යෑ: "ya",
      යි: "yi", යී: "yi", යු: "yu", යූ: "yu", යේ: "ye", යෙ: "ye",
      // හ combinations
      හො: "ho", හෝ: "ho", හා: "ha", හැ: "ha", හෑ: "ha",
      හි: "hi", හී: "hi", හු: "hu", හූ: "hu", හේ: "he", හෙ: "he",
    };

    // First replace compound characters
    let result = text;
    for (const [sinhala, english] of Object.entries(compounds)) {
      result = result.split(sinhala).join(english);
    }

    // Then handle individual characters
    const sinhalaToEnglish = {
      අ: "a", ආ: "a", ඇ: "a", ඈ: "a", ඉ: "i", ඊ: "i",
      උ: "u", ඌ: "u", එ: "e", ඒ: "e", ඔ: "o", ඕ: "o",
      ක: "ka", ඛ: "kha", ග: "ga", ඝ: "gha", ඞ: "nga",
      ච: "cha", ඡ: "chha", ජ: "ja", ඣ: "jha", ඤ: "nya",
      ට: "ta", ඨ: "tha", ඩ: "da", ඪ: "dha", ණ: "na",
      ත: "ta", ථ: "tha", ද: "da", ධ: "dha", න: "na",
      ප: "pa", ඵ: "pha", බ: "ba", භ: "bha", ම: "ma",
      ය: "ya", ර: "ra", ල: "la", ව: "wa",
      ශ: "sha", ෂ: "sha", ස: "sa", හ: "ha", ළ: "la", ෆ: "fa",
      "ං": "ng", "ඃ": "h", "්": "", "ා": "a", "ැ": "a", "ෑ": "a",
      "ි": "i", "ී": "i", "ු": "u", "ූ": "u", "ෙ": "e", "ේ": "e",
      "ෛ": "ai", "ො": "o", "ෝ": "o", "ෞ": "au",
    };

    let finalResult = "";
    for (let char of result) {
      finalResult += sinhalaToEnglish[char] || char;
    }
    return finalResult.toLowerCase();
  };

  const getFilteredSocieties = () => {
    if (!societySearch) return societies;
    const searchLower = societySearch.toLowerCase();

    return societies.filter((s) => {
      const nameLower = s.name.toLowerCase();
      const transliterated = transliterateSinhalaToEnglish(s.name);

      return (
        nameLower.includes(searchLower) ||
        transliterated.includes(searchLower) ||
        transliterated.split(" ").some((word) => word.startsWith(searchLower))
      );
    });
  };

  const getFilteredOfficers = () => {
    if (!officerSearch) return officers;
    const searchLower = officerSearch.toLowerCase();

    return officers.filter((o) => {
      const nameLower = o.name.toLowerCase();
      const transliterated = transliterateSinhalaToEnglish(o.name);

      return (
        nameLower.includes(searchLower) ||
        transliterated.includes(searchLower) ||
        transliterated.split(" ").some((word) => word.startsWith(searchLower))
      );
    });
  };

  const getFilteredLegalOfficers = () => {
    if (!legalOfficerSearch) return legalOfficers;
    const searchLower = legalOfficerSearch.toLowerCase();

    return legalOfficers.filter((o) => {
      const nameLower = o.name.toLowerCase();
      const transliterated = transliterateSinhalaToEnglish(o.name);

      return (
        nameLower.includes(searchLower) ||
        transliterated.includes(searchLower) ||
        transliterated.split(" ").some((word) => word.startsWith(searchLower))
      );
    });
  };

  const getSelectedSocietyName = () => {
    const selected = societies.find((s) => s.id === formData.societyId);
    return selected
      ? `${selected.name} ${
          selected.registrationNo ? "- " + selected.registrationNo : ""
        }`
      : "";
  };

  const getSelectedOfficerName = () => {
    const selected = officers.find((o) => o.id === formData.officerId);
    return selected ? selected.name : "";
  };

  const getSelectedLegalOfficerName = () => {
    const selected = legalOfficers.find((o) => o.id === formData.legalOfficerId);
    return selected ? selected.name : "";
  };

  const handleSocietySelect = (societyId) => {
    setFormData({ ...formData, societyId: societyId });
    setShowSocietyDropdown(false);
    setSocietySearch("");
    setError("");
  };

  const handleOfficerSelect = (officerId) => {
    setFormData({ ...formData, officerId: officerId });
    setShowOfficerDropdown(false);
    setOfficerSearch("");
    setError("");
  };

  const handleLegalOfficerSelect = (legalOfficerId) => {
    setFormData({ ...formData, legalOfficerId: legalOfficerId });
    setShowLegalOfficerDropdown(false);
    setLegalOfficerSearch("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (
      !(userType === "OFFICER" && formData.role === "PROVINCIAL_ADMIN") &&
      !formData.district
    ) {
      setError("Please select a district");
      return;
    }

    // Validate society selection for SOCIETY users
    if (userType === "SOCIETY" && !formData.societyId) {
      setError("Please select a society");
      return;
    }

    setLoading(true);

    try {
      let signupData = {
        email: formData.email,
        password: formData.password,
        userType: userType,
      };

      if (!(userType === "OFFICER" && formData.role === "PROVINCIAL_ADMIN")) {
        signupData.district = formData.district;
      }

      if (userType === "SOCIETY") {
        signupData = {
          ...signupData,
          name: formData.name,
          societyId: formData.societyId,
          role: formData.role,
          designation: formData.designation || "Society Member",
        };
      } else if (userType === "OFFICER") {
        if (formData.role === "OFFICER") {
          signupData = {
            ...signupData,
            officerId: formData.officerId,
            designation: "Arbitration Officer",
          };
        } else if (formData.role === "LEGAL_OFFICER") {
          signupData = {
            ...signupData,
            legalOfficerId: formData.legalOfficerId,
            designation: "Legal Officer",
          };
        } else {
          signupData = {
            ...signupData,
            name: formData.name,
            designation:
              formData.role === "DISTRICT_ADMIN"
                ? "District Administrator"
                : "Provincial Administrator",
          };
        }
        signupData.role = formData.role;
      }

      await api.signup(signupData);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div
              className="card shadow-lg border-0"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body p-5">
                <h2 className="text-center mb-4 fw-bold">
                  Register New Account
                </h2>

                {error && (
                  <div className="alert alert-danger d-flex align-items-center">
                    <AlertCircle size={18} className="me-2" />
                    {error}
                  </div>
                )}
                {success && (
                  <div className="alert alert-success d-flex align-items-center">
                    <CheckCircle size={18} className="me-2" />
                    {success}
                  </div>
                )}

                <div className="btn-group w-100 mb-4" role="group">
                  <button
                    type="button"
                    className="btn"
                    style={{
                      backgroundColor:
                        userType === "SOCIETY" ? "#6980e5" : "transparent",
                      color: userType === "SOCIETY" ? "white" : "#7085e6",
                      borderColor: "#7186e1",
                    }}
                    onClick={() => {
                      setUserType("SOCIETY");
                      setFormData({
                        ...formData,
                        role: "SOCIETY_ADMIN",
                        societyId: "",
                        officerId: "",
                        legalOfficerId: "",
                        designation: "",
                      });
                      setSocietySearch("");
                      setOfficerSearch("");
                      setLegalOfficerSearch("");
                      setError("");
                    }}
                  >
                    <Users size={18} className="me-2" />
                    Society Member
                  </button>
                  <button
                    type="button"
                    className="btn"
                    style={{
                      backgroundColor:
                        userType === "OFFICER" ? "#7187e8" : "transparent",
                      color: userType === "OFFICER" ? "white" : "#697ede",
                      borderColor: "#7389e8",
                    }}
                    onClick={() => {
                      setUserType("OFFICER");
                      setFormData({
                        ...formData,
                        societyId: "",
                        role: "OFFICER",
                        officerId: "",
                        legalOfficerId: "",
                        name: "",
                        designation: "",
                      });
                      setSocietySearch("");
                      setOfficerSearch("");
                      setLegalOfficerSearch("");
                      setError("");
                    }}
                  >
                    <Building size={18} className="me-2" />
                    Officer/Admin
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {!(
                      userType === "OFFICER" &&
                      formData.role === "PROVINCIAL_ADMIN"
                    ) && (
                      <div className="col-12 mb-3">
                        <label className="form-label fw-semibold">
                          District (දිස්ත්‍රික්කය) *
                        </label>
                        <select
                          className="form-select"
                          value={formData.district}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              district: e.target.value,
                              societyId: "",
                              officerId: "",
                              legalOfficerId: "",
                            });
                            setSocietySearch("");
                            setOfficerSearch("");
                            setLegalOfficerSearch("");
                            setError("");
                          }}
                          required
                        >
                          <option value="">Select District</option>
                          {districts.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {userType === "OFFICER" && (
                      <div className="col-12 mb-3">
                        <label className="form-label fw-semibold">
                          Role (භූමිකාව) *
                        </label>
                        <select
                          className="form-select"
                          value={formData.role}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              role: e.target.value,
                              officerId: "",
                              legalOfficerId: "",
                              name: "",
                              district:
                                e.target.value === "PROVINCIAL_ADMIN"
                                  ? ""
                                  : formData.district,
                            });
                            setOfficerSearch("");
                            setLegalOfficerSearch("");
                            setError("");
                          }}
                          required
                        >
                          <option value="OFFICER">
                            Arbitration Officer - බේරුම්කරු
                          </option>
                          <option value="LEGAL_OFFICER">
                            Legal Officer - නීති නිලධාරී
                          </option>
                          <option value="DISTRICT_ADMIN">
                            District Administrator - දිස්ත්‍රික් පරිපාලක
                          </option>
                          <option value="PROVINCIAL_ADMIN">
                            Provincial Administrator - පළාත් පරිපාලක
                          </option>
                        </select>
                      </div>
                    )}

                    {userType === "OFFICER" && formData.role === "OFFICER" && (
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          Select Your Name (ඔබේ නම තෝරන්න) *
                        </label>
                        <div
                          className="position-relative"
                          ref={officerDropdownRef}
                        >
                          <div
                            className="form-control d-flex align-items-center justify-content-between"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              if (formData.district) {
                                setShowOfficerDropdown(!showOfficerDropdown);
                              }
                            }}
                          >
                            <span
                              className={
                                !getSelectedOfficerName() ? "text-muted" : ""
                              }
                            >
                              {getSelectedOfficerName() ||
                                "-- Select Your Name from List --"}
                            </span>
                            <Search size={16} className="text-muted" />
                          </div>

                          {showOfficerDropdown && (
                            <div
                              className="position-absolute w-100 bg-white border rounded shadow-lg"
                              style={{
                                zIndex: 1000,
                                maxHeight: "300px",
                                overflowY: "auto",
                              }}
                            >
                              <div className="p-2 border-bottom sticky-top bg-white">
                                <div className="input-group input-group-sm">
                                  <span className="input-group-text bg-light border-0">
                                    <Search size={14} />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control border-0"
                                    placeholder="Type to search..."
                                    value={officerSearch}
                                    onChange={(e) =>
                                      setOfficerSearch(e.target.value)
                                    }
                                    autoFocus
                                  />
                                  {officerSearch && (
                                    <button
                                      className="btn btn-sm"
                                      onClick={() => setOfficerSearch("")}
                                    >
                                      <X size={14} />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div>
                                {getFilteredOfficers().length === 0 ? (
                                  <div className="p-3 text-center text-muted">
                                    <AlertCircle size={16} className="me-2" />
                                    No officers available for registration
                                  </div>
                                ) : (
                                  getFilteredOfficers().map((officer) => (
                                    <div
                                      key={officer.id}
                                      className="p-2 px-3 cursor-pointer hover-bg-light"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleOfficerSelect(officer.id)
                                      }
                                      onMouseEnter={(e) =>
                                        (e.target.style.backgroundColor =
                                          "#f8f9fa")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.target.style.backgroundColor =
                                          "white")
                                      }
                                    >
                                      {officer.name}
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {!formData.district && (
                          <small className="text-muted">
                            Please select a district first
                          </small>
                        )}
                      </div>
                    )}

                    {userType === "OFFICER" && formData.role === "LEGAL_OFFICER" && (
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          Select Your Name (ඔබේ නම තෝරන්න) *
                        </label>
                        <div
                          className="position-relative"
                          ref={legalOfficerDropdownRef}
                        >
                          <div
                            className="form-control d-flex align-items-center justify-content-between"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              if (formData.district) {
                                setShowLegalOfficerDropdown(!showLegalOfficerDropdown);
                              }
                            }}
                          >
                            <span
                              className={
                                !getSelectedLegalOfficerName() ? "text-muted" : ""
                              }
                            >
                              {getSelectedLegalOfficerName() ||
                                "-- Select Your Name from List --"}
                            </span>
                            <Search size={16} className="text-muted" />
                          </div>

                          {showLegalOfficerDropdown && (
                            <div
                              className="position-absolute w-100 bg-white border rounded shadow-lg"
                              style={{
                                zIndex: 1000,
                                maxHeight: "300px",
                                overflowY: "auto",
                              }}
                            >
                              <div className="p-2 border-bottom sticky-top bg-white">
                                <div className="input-group input-group-sm">
                                  <span className="input-group-text bg-light border-0">
                                    <Search size={14} />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control border-0"
                                    placeholder="Type to search..."
                                    value={legalOfficerSearch}
                                    onChange={(e) =>
                                      setLegalOfficerSearch(e.target.value)
                                    }
                                    autoFocus
                                  />
                                  {legalOfficerSearch && (
                                    <button
                                      className="btn btn-sm"
                                      onClick={() => setLegalOfficerSearch("")}
                                    >
                                      <X size={14} />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div>
                                {getFilteredLegalOfficers().length === 0 ? (
                                  <div className="p-3 text-center text-muted">
                                    <AlertCircle size={16} className="me-2" />
                                    No legal officers available for registration
                                  </div>
                                ) : (
                                  getFilteredLegalOfficers().map((legalOfficer) => (
                                    <div
                                      key={legalOfficer.