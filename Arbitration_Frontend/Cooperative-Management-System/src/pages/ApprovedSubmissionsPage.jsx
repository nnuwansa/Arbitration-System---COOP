import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Eye } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import BorrowerDetailsModal from "../components/BorrowerDetailsModal";

const ApprovedSubmissionsPage = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadApprovedSubmissions();
  }, []);

  // const loadApprovedSubmissions = async () => {
  //   try {
  //     const data = await api.getSubmissionsBySociety(user.societyId);
  //     const approved = data.filter((s) => s.status === "approved");
  //     setSubmissions(approved);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loadApprovedSubmissions = async () => {
    try {
      const data = await api.getSubmissionsBySociety(user.societyId);
      const approved = data
        .filter((s) => s.status === "approved")
        .sort((a, b) => new Date(b.approvedDate) - new Date(a.approvedDate)); // 👈 newest first
      setSubmissions(approved);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const DecisionModal = ({ borrower, onClose }) => {
    if (!borrower) return null;

    const loanAmount = parseFloat(borrower.loanAmount || 0);
    const interest = parseFloat(borrower.interest || 0);
    const totalAmount = loanAmount + interest;

    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content" style={{ borderRadius: "15px" }}>
            <div
              className="modal-header text-white"
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <h5 className="modal-title fw-bold">
                තීරක නිලධාරියාගේ තීරණයේ සම්පූර්ණ විස්තර
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>
            <div className="modal-body p-4">
              {/* Basic Information */}
              <div
                className="alert alert-info mb-4"
                style={{ borderRadius: "10px" }}
              >
                <h6 className="fw-bold mb-3">මූලික තොරතුරු</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <strong>නම:</strong> <span>{borrower.borrowerName}</span>
                  </div>
                  <div className="col-md-6">
                    <strong>ලිපිනය:</strong>{" "}
                    <span>{borrower.borrowerAddress}</span>
                  </div>
                  <div className="col-md-6">
                    <strong>ණය අංකය:</strong> <span>{borrower.loanNumber}</span>
                  </div>
                  <div className="col-md-6">
                    <strong>බේරුම් අංකය:</strong>{" "}
                    <span className="text-primary fw-bold">
                      {borrower.arbitrationNumber}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <strong>බේරුම්කරු:</strong>{" "}
                    <span className="text-success">
                      {borrower.assignedOfficerName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div
                className="card border-0 shadow-sm mb-4"
                style={{ borderRadius: "10px", background: "#f8f9fa" }}
              >
                <div
                  className="card-header bg-success text-white"
                  style={{ borderRadius: "10px 10px 0 0" }}
                >
                  <h6 className="mb-0 fw-bold">මූල් ණය විස්තර</h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <strong>ණය මුදල:</strong>
                      <div className="fs-5 text-primary">
                        රු. {loanAmount.toLocaleString("si-LK")}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <strong>පොළිය:</strong>
                      <div className="fs-5 text-warning">
                        රු. {interest.toLocaleString("si-LK")}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <strong>පොළී අනුපාතය:</strong>
                      <div className="fs-5 text-info">
                        {borrower.interestRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arbitration Decision */}
              {borrower.status === "decision-given" ? (
                <div
                  className="card border-0 shadow-sm"
                  style={{ borderRadius: "10px" }}
                >
                  <div
                    className="card-header text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      borderRadius: "10px 10px 0 0",
                    }}
                  >
                    <h6 className="mb-0 fw-bold">බේරුම්කරු තීන්දුව</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          තීරණ දුන් දිනය:
                        </label>
                        <div className="text-muted">
                          {borrower.decisionDate
                            ? new Date(
                                borrower.decisionDate
                              ).toLocaleDateString("si-LK")
                            : "-"}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          අවසන් ණය මුදල:
                        </label>
                        <div className="fs-5 text-success fw-bold">
                          රු.{" "}
                          {parseFloat(
                            borrower.finalLoanAmount || 0
                          ).toLocaleString("si-LK")}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          අඩු කළ පොළිය:
                        </label>
                        <div className="fs-5 text-danger fw-bold">
                          රු.{" "}
                          {parseFloat(
                            borrower.interestDeducted || 0
                          ).toLocaleString("si-LK")}
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          තීන්දුව / සටහන්:
                        </label>
                        <div
                          className="p-3 bg-light"
                          style={{ borderRadius: "8px" }}
                        >
                          {borrower.arbitrationDecision || "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="alert alert-warning"
                  style={{ borderRadius: "10px" }}
                >
                  <AlertCircle size={18} className="me-2" />
                  තීන්දුවක් තවමත් ලබා දී නොමැත
                </div>
              )}
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
      <h2 className="fw-bold mb-4">අනුමත කළ ඉදිරිපත් කිරීම්</h2>
      <div
        className="alert alert-success d-flex align-items-center mb-4"
        style={{ borderRadius: "10px" }}
      >
        <CheckCircle size={18} className="me-2" />
        මෙම ඉදිරිපත් කිරීම් අනුමත කර දිස්ත්‍රික් කාර්යාලයට යවන ලදී.
      </div>

      {submissions.length === 0 ? (
        <div
          className="alert alert-info d-flex align-items-center"
          style={{ borderRadius: "10px" }}
        >
          <AlertCircle size={18} className="me-2" />
          තවම අනුමත කළ ඉදිරිපත් කිරීම් නොමැත
        </div>
      ) : (
        submissions.map((submission) => (
          <div
            key={submission.id}
            className="card mb-4 border-0 shadow-sm"
            style={{ borderRadius: "15px" }}
          >
            <div
              className="card-header text-white"
              style={{
                background: "linear-gradient(135deg, #92a4f4 0%, #b08dd3 100%)",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">
                    ඉදිරිපත් කළ දිනය:{" "}
                    {new Date(submission.submittedDate).toLocaleDateString(
                      "si-LK"
                    )}{" "}
                    | ඉදිරිපත් කළ අය: {submission.submittedBy}
                  </h6>
                </div>

                <span className="badge bg-success fs-8">අනුමත</span>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead style={{ background: "#f8f9fa" }}>
                    <tr>
                      <th className="fw-semibold">ලැබුණු දිනය</th>
                      <th className="fw-semibold">ණය අංකය</th>
                      <th className="fw-semibold">නම</th>
                      <th className="fw-semibold">ලිපිනය</th>
                      <th className="fw-semibold">ණය මුදල</th>
                      <th className="fw-semibold">තීරක අංකය</th>
                      <th className="fw-semibold">තීරක නිලධාරියා</th>
                      <th className="fw-semibold">තීන්දුව</th>
                      <th className="fw-semibold">විස්තර</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submission.borrowers.map((borrower) => (
                      <tr key={borrower.id}>
                        <td>
                          {/* ⭐ Show received date with proper formatting */}
                          {submission.submittedDate
                            ? new Date(submission.submittedDate).toLocaleString(
                                "si-LK",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )
                            : "-"}
                        </td>
                        <td>{borrower.loanNumber}</td>
                        <td>
                          <strong>{borrower.borrowerName}</strong>
                        </td>
                        <td>{borrower.borrowerAddress}</td>
                        <td>
                          රු.{" "}
                          {parseFloat(borrower.loanAmount).toLocaleString(
                            "si-LK"
                          )}
                        </td>
                        <td className="fw-bold text-primary">
                          {borrower.arbitrationNumber || "-"}
                        </td>
                        <td>{borrower.assignedOfficerName || "-"}</td>
                        <td>
                          {borrower.status === "decision-given" ? (
                            <button
                              onClick={() => {
                                setSelectedBorrower(borrower);
                                setShowDecisionModal(true);
                              }}
                              className="btn btn-sm btn-success"
                              style={{ borderRadius: "8px" }}
                            >
                              <Eye size={16} className="me-1" />
                              තීන්දුව බලන්න
                            </button>
                          ) : (
                            <span className="badge bg-secondary">
                              තීන්දුවක් ලබා දී නැත
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setSelectedBorrower(borrower);
                              setShowDetailsModal(true);
                            }}
                            className="btn btn-outline-info btn-sm"
                            style={{ borderRadius: "8px" }}
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
        ))
      )}

      {showDecisionModal && (
        <DecisionModal
          borrower={selectedBorrower}
          onClose={() => {
            setShowDecisionModal(false);
            setSelectedBorrower(null);
          }}
        />
      )}

      <BorrowerDetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        borrower={selectedBorrower}
      />
    </div>
  );
};

export default ApprovedSubmissionsPage;
