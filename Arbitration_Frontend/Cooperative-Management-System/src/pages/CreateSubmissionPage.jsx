import React, { useState } from "react";
import {
  FileText,
  XCircle,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Users,
  DollarSign,
  UserCheck,
  Home,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const CreateSubmissionPage = () => {
  const { user } = useAuth();
  const [borrowers, setBorrowers] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBorrower, setEditingBorrower] = useState(null);
  const [currentBorrower, setCurrentBorrower] = useState({
    loanNumber: "",
    borrowerName: "",
    borrowerNIC: "",
    borrowerAddress: "",
    membershipNo: "",
    registrationDate: "",
    loanType: "",
    guarantor1Name: "",
    guarantor1NIC: "",
    guarantor1MembershipNo: "",
    guarantor1Address: "",
    guarantor2Name: "",
    guarantor2NIC: "",
    guarantor2MembershipNo: "",
    guarantor2Address: "",
    loanAmount: "",
    outstandingLoanAmount: "",
    interest: "",
    interestRate: "",
    stationeryFees: "",
  });

  const loanTypes = [
    { value: "ණය", label: "ණය" },
    { value: "විවිධ", label: "විවිධ" },
    { value: "තැන්පතු", label: "තැන්පතු" },
  ];

  const resetForm = () => {
    setCurrentBorrower({
      loanNumber: "",
      borrowerName: "",
      borrowerNIC: "",
      borrowerAddress: "",
      membershipNo: "",
      registrationDate: "",
      loanType: "",
      guarantor1Name: "",
      guarantor1NIC: "",
      guarantor1MembershipNo: "",
      guarantor1Address: "",
      guarantor2Name: "",
      guarantor2NIC: "",
      guarantor2MembershipNo: "",
      guarantor2Address: "",
      loanAmount: "",
      outstandingLoanAmount: "",
      interest: "",
      interestRate: "",
      stationeryFees: "",
    });
    setEditingBorrower(null);
    setShowAddForm(false);
  };

  const handleAddBorrower = () => {
    if (!currentBorrower.loanNumber || !currentBorrower.borrowerName) {
      alert("කරුණාකර අවම වශයෙන් ණය අංකය සහ නම පුරවන්න");
      return;
    }

    if (!currentBorrower.registrationDate) {
      alert("කරුණාකර ලියාපදිංචි වූ දිනය තෝරන්න");
      return;
    }

    if (editingBorrower !== null) {
      const updated = [...borrowers];
      updated[editingBorrower] = { ...currentBorrower, id: Date.now() };
      setBorrowers(updated);
    } else {
      setBorrowers([...borrowers, { ...currentBorrower, id: Date.now() }]);
    }

    resetForm();
  };

  const handleEditBorrower = (index) => {
    setCurrentBorrower(borrowers[index]);
    setEditingBorrower(index);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteBorrower = (index) => {
    if (window.confirm("මෙම ණයගැතියා ඉවත් කරන්නද?")) {
      setBorrowers(borrowers.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (borrowers.length === 0) {
      setError("කරුණාකර අවම වශයෙන් එක් ණයගැතියෙකු එක් කරන්න");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const districtId = user.districtId || user.district;
      const societyId = user.societyId || user.society;

      if (!districtId || !societyId) {
        throw new Error(
          "User missing districtId or societyId. Please log out and log back in."
        );
      }

      const submissionData = {
        districtId: districtId,
        societyId: societyId,
        borrowers: borrowers.map(({ id, ...b }) => ({
          ...b,
          loanAmount: parseFloat(b.loanAmount) || 0,
          outstandingLoanAmount: parseFloat(b.outstandingLoanAmount) || 0,
          interest: parseFloat(b.interest) || 0,
          interestRate: parseFloat(b.interestRate) || 0,
          stationeryFees: parseFloat(b.stationeryFees) || 0,
        })),
      };

      const response = await api.createSubmission(submissionData);
      setSuccess("ඉදිරිපත් කිරීම සාර්ථකව සාදන ලදී!");
      setBorrowers([]);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("❌ Submission error:", err);
      setError(
        err.message || "An error occurred while creating the submission"
      );
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (borrower) => {
    const outstandingAmount = parseFloat(borrower.outstandingLoanAmount) || 0;
    const interest = parseFloat(borrower.interest) || 0;
    const fees = parseFloat(borrower.stationeryFees) || 0;
    return outstandingAmount + interest + fees;
  };

  const getTotalLoanAmount = () => {
    return borrowers.reduce(
      (sum, b) => sum + (parseFloat(b.loanAmount) || 0),
      0
    );
  };

  const getTotalOutstandingAmount = () => {
    return borrowers.reduce(
      (sum, b) => sum + (parseFloat(b.outstandingLoanAmount) || 0),
      0
    );
  };

  const getTotalInterest = () => {
    return borrowers.reduce((sum, b) => sum + (parseFloat(b.interest) || 0), 0);
  };

  const getTotalFees = () => {
    return borrowers.reduce(
      (sum, b) => sum + (parseFloat(b.stationeryFees) || 0),
      0
    );
  };

  const getGrandTotal = () => {
    return getTotalOutstandingAmount() + getTotalInterest() + getTotalFees();
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "2rem" }}>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold text-dark" style={{ fontSize: "2rem" }}>
          <FileText size={32} className="me-3 mb-2" />
          නව ඉදිරිපත් කිරීම
        </h2>
        <p className="text-muted" style={{ fontSize: "1.1rem" }}>
          තීරකකරණය සදහා ඉදිරිපත් කළ යුතු ණයගැතියන්ගේ තොරතුරු
        </p>
      </div>

      {/* Summary Statistics */}
      {borrowers.length > 0 && (
        <div className="row g-3 mb-4">
          <div className="col-md-2">
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body">
                <small className="text-muted d-block mb-2">
                  එකතු කළ ණයගැතියන්
                </small>
                <h4 className="fw-bold text-primary">{borrowers.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body">
                <small className="text-muted d-block mb-2">මුළු ණය</small>
                <h5
                  className="fw-bold text-info"
                  style={{ fontSize: "0.9rem" }}
                >
                  රු. {getTotalLoanAmount().toLocaleString("si-LK")}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body">
                <small className="text-muted d-block mb-2">මුළු higa ණය</small>
                <h5
                  className="fw-bold text-danger"
                  style={{ fontSize: "0.9rem" }}
                >
                  රු. {getTotalOutstandingAmount().toLocaleString("si-LK")}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body">
                <small className="text-muted d-block mb-2">
                  මුළු හිඟ ණය පොළිය
                </small>
                <h5
                  className="fw-bold text-warning"
                  style={{ fontSize: "0.9rem" }}
                >
                  රු. {getTotalInterest().toLocaleString("si-LK")}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body">
                <small className="text-muted d-block mb-2">මුළු ගාස්තු</small>
                <h5
                  className="fw-bold text-secondary"
                  style={{ fontSize: "0.9rem" }}
                >
                  රු. {getTotalFees().toLocaleString("si-LK")}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)",
              }}
            >
              <div className="card-body">
                <small className="text-white d-block mb-2">මුළු වටිනාකම</small>
                <h5
                  className="fw-bold text-white"
                  style={{ fontSize: "0.9rem" }}
                >
                  රු. {getGrandTotal().toLocaleString("si-LK")}
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Alert */}
      <div
        className="alert alert-info border-0"
        style={{ borderRadius: "12px", backgroundColor: "#e3f2fd" }}
      >
        <AlertCircle size={18} className="me-2 mb-1" />
        මෙම ඉදිරිපත් කිරීම සම්බන්ධව ණයගැතියන් පිළිබඳ තොරතුරු එකතු කර සමිති අනුමත
        කිරීමේ නිලධාරියා වෙත යවනු ලැබේ।
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div
          className="alert alert-danger border-0"
          style={{ borderRadius: "12px", marginBottom: "1rem" }}
        >
          <XCircle size={18} className="me-2 mb-1" />
          {error}
        </div>
      )}

      {success && (
        <div
          className="alert alert-success border-0"
          style={{ borderRadius: "12px", marginBottom: "1rem" }}
        >
          <CheckCircle size={18} className="me-2 mb-1" />
          {success}
        </div>
      )}

      {/* Add/Edit Borrower Form */}
      {showAddForm && (
        <div
          className="card border-0 shadow-lg mb-4"
          style={{ borderRadius: "15px", background: "white" }}
        >
          <div
            className="card-header text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: "15px 15px 0 0",
              padding: "1.5rem",
            }}
          >
            <h5 className="mb-0 fw-bold">
              {editingBorrower !== null
                ? "🖊️ ණයගැතියා සංස්කරණය කරන්න"
                : "➕ නව ණයගැතියෙකු එකතු කරන්න"}
            </h5>
          </div>

          <div className="card-body p-4">
            {/* Basic Information */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 text-dark">
                <Home size={18} className="me-2 mb-1" /> මූලික තොරතුරු
              </h6>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label fw-semibold">ණය අංකය *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.loanNumber}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        loanNumber: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    placeholder="ණය අංකය"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    ණයගැතියාගේ නම *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.borrowerName}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        borrowerName: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    placeholder="සම්පූර්ණ නම"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    {" "}
                    ජාතික හැදුනුම්පත් අංකය - (NIC) *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.borrowerNIC}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        borrowerNIC: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    placeholder=" ජාතික හැදුනුම්පත් අංකය - (NIC)"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    සාමාජික අංකය *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.membershipNo}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        membershipNo: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    placeholder="සාමාජික අංකය"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    ණය ලබාගත් දිනය *
                  </label>
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
                    style={{ borderRadius: "8px", colorScheme: "light" }}
                    required
                  />
                </div>
                {/* <div className="col-md-3">
                  <label className="form-label fw-semibold">ණය ස්වභාවය *</label>
                  <select
                    className="form-control"
                    value={currentBorrower.loanType}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        loanType: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    required
                  >
                    {loanTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                
                */}

                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    ආරවුලේ ස්වභාවය *
                  </label>
                  <select
                    className="form-control"
                    value={currentBorrower.loanType || ""}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        loanType: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    required
                  >
                    <option value="" disabled>
                      ආරවුලේ ස්වභාවය තෝරන්න
                    </option>
                    {loanTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    ණයගැතියාගේ ලිපිනය *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.borrowerAddress}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        borrowerAddress: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    placeholder="ලිපිනය"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Guarantor 1 Information */}
            <div
              className="mb-4 p-3"
              style={{ background: "#f0fdf4", borderRadius: "10px" }}
            >
              <h6 className="fw-bold mb-3 text-success">
                <UserCheck size={18} className="me-2 mb-1" /> පළමු ඇපකරු විස්තර
              </h6>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label fw-semibold">නම *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.guarantor1Name}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        guarantor1Name: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    {" "}
                    ජාතික හැදුනුම්පත් අංකය - (NIC) *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.guarantor1NIC}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        guarantor1NIC: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    සාමාජික අංකය *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.guarantor1MembershipNo}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        guarantor1MembershipNo: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">ලිපිනය *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.guarantor1Address}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        guarantor1Address: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Guarantor 2 Information */}
            <div
              className="mb-4 p-3"
              style={{ background: "#fef3c7", borderRadius: "10px" }}
            >
              <h6 className="fw-bold mb-3 text-warning">
                <UserCheck size={18} className="me-2 mb-1" /> දෙවන ඇපකරු විස්තර
              </h6>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label fw-semibold">නම *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.guarantor2Name}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        guarantor2Name: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    {" "}
                    ජාතික හැදුනුම්පත් අංකය - (NIC) *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.guarantor2NIC}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        guarantor2NIC: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    සාමාජික අංකය *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.guarantor2MembershipNo}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        guarantor2MembershipNo: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">ලිපිනය *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBorrower.guarantor2Address}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        guarantor2Address: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3 text-info">
                <DollarSign size={18} className="me-2 mb-1" /> මූල්‍ය තොරතුරු
              </h6>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    ණය මුදල (රු.) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={currentBorrower.loanAmount}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        loanAmount: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    හිඟ ණය ශේෂය (රු.) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={currentBorrower.outstandingLoanAmount}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        outstandingLoanAmount: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    හිඟ ණය පොළිය (රු.) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={currentBorrower.interest}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        interest: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    පොලී අනුපාතය (%) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={currentBorrower.interestRate}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        interestRate: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    ලිපිද්‍රව්‍ය ගාස්තු හා නඩු ගාස්තු (රු.) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={currentBorrower.stationeryFees}
                    onChange={(e) =>
                      setCurrentBorrower({
                        ...currentBorrower,
                        stationeryFees: e.target.value,
                      })
                    }
                    style={{ borderRadius: "8px" }}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mt-3">
                <div className="col-md-3">
                  <div
                    className="p-3"
                    style={{ background: "#e3f2fd", borderRadius: "8px" }}
                  >
                    <small className="text-muted d-block">ණය මුදල</small>
                    <h6 className="fw-bold text-primary">
                      රු.{" "}
                      {parseFloat(
                        currentBorrower.loanAmount || 0
                      ).toLocaleString("si-LK")}
                    </h6>
                  </div>
                </div>
                <div className="col-md-3">
                  <div
                    className="p-3"
                    style={{ background: "#fce4ec", borderRadius: "8px" }}
                  >
                    <small className="text-muted d-block">හිඟ ණය ශේෂය</small>
                    <h6 className="fw-bold text-danger">
                      රු.{" "}
                      {parseFloat(
                        currentBorrower.outstandingLoanAmount || 0
                      ).toLocaleString("si-LK")}
                    </h6>
                  </div>
                </div>
                <div className="col-md-3">
                  <div
                    className="p-3"
                    style={{ background: "#fff3e0", borderRadius: "8px" }}
                  >
                    <small className="text-muted d-block">හිඟ ණය පොළිය</small>
                    <h6 className="fw-bold text-warning">
                      රු.{" "}
                      {parseFloat(currentBorrower.interest || 0).toLocaleString(
                        "si-LK"
                      )}
                    </h6>
                  </div>
                </div>
                <div className="col-md-3">
                  <div
                    className="p-3"
                    style={{ background: "#f3e5f5", borderRadius: "8px" }}
                  >
                    <small className="text-muted d-block">
                      ලිපිද්‍රව්‍ය ගාස්තු හා නඩු ගාස්තු
                    </small>
                    <h6 className="fw-bold text-info">
                      රු.{" "}
                      {parseFloat(
                        currentBorrower.stationeryFees || 0
                      ).toLocaleString("si-LK")}
                    </h6>
                  </div>
                </div>
              </div>

              {/* Grand Total for Single Borrower */}
              <div className="row mt-3">
                <div className="col-md-12">
                  <div
                    className="p-3"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  >
                    <small className="d-block opacity-75">
                      මුළු වටිනාකම = හිඟ ණය ශේෂය + හිඟ ණය පොළිය + ලිපිද්‍රව්‍ය
                      ගාස්තු හා නඩු ගාස්තු
                    </small>
                    <h5 className="fw-bold mb-0">
                      රු.{" "}
                      {calculateTotal(currentBorrower).toLocaleString("si-LK")}
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2 mt-4">
              <button
                type="button"
                onClick={handleAddBorrower}
                className="btn btn-primary btn-lg"
                style={{ borderRadius: "10px" }}
              >
                <CheckCircle size={18} className="me-2" />
                {editingBorrower !== null ? "යාවත්කාලීන කරන්න" : "එකතු කරන්න"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary btn-lg"
                style={{ borderRadius: "10px" }}
              >
                <XCircle size={18} className="me-2" />
                අවලංගු කරන්න
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Borrower Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-lg mb-4 shadow-sm"
          style={{
            borderRadius: "12px",
            background: "linear-gradient(135deg, #919fe0 0%, #ae85d7 100%)",
            color: "white",
            border: "none",
            padding: "1rem 2rem",
          }}
        >
          <Plus size={20} className="me-2" />
          ණයගැතියෙකු එකතු කරන්න
        </button>
      )}

      {/* Added Borrowers List */}
      {borrowers.length > 0 && (
        <div
          className="card mb-4 border-0 shadow-sm"
          style={{ borderRadius: "15px" }}
        >
          <div
            className="card-header text-white"
            style={{
              background: "linear-gradient(135deg, #81efcc 0%,#a8e8d3 100%)",
              borderRadius: "15px 15px 0 0",
              padding: "1.25rem",
            }}
          >
            <h5 className="mb-0 fw-bold">
              ✅ එකතු කළ ණයගැතියන් ({borrowers.length})
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead
                  style={{
                    background:
                      "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  }}
                >
                  <tr>
                    <th className="fw-semibold py-3">ණය අංකය</th>
                    <th className="fw-semibold py-3">නම / NIC</th>
                    <th className="fw-semibold py-3">ණය ස්වභාවය</th>
                    <th className="fw-semibold py-3">ණය මුදල</th>
                    <th className="fw-semibold py-3">හිඟ ණය ශේෂය</th>
                    <th className="fw-semibold py-3">හිඟ ණය පොළිය</th>
                    <th className="fw-semibold py-3">ගාස්තු</th>
                    <th className="fw-semibold py-3 text-center">
                      මුළු වටිනාකම
                    </th>
                    <th className="fw-semibold py-3 text-center">
                      ක්‍රියාමාර්ග
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {borrowers.map((borrower, index) => (
                    <tr
                      key={borrower.id || index}
                      style={{
                        background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      }}
                    >
                      <td className="fw-bold text-primary py-3">
                        {borrower.loanNumber}
                      </td>
                      <td className="py-3">
                        <strong>{borrower.borrowerName}</strong>
                        <br />
                        <small className="text-muted">
                          {borrower.borrowerNIC}
                        </small>
                      </td>
                      <td className="py-3">{borrower.loanType}</td>
                      <td className="py-3 text-success fw-bold">
                        රු.{" "}
                        {parseFloat(borrower.loanAmount || 0).toLocaleString(
                          "si-LK"
                        )}
                      </td>
                      <td className="py-3 text-danger fw-bold">
                        රු.{" "}
                        {parseFloat(
                          borrower.outstandingLoanAmount || 0
                        ).toLocaleString("si-LK")}
                      </td>
                      <td className="py-3 text-warning fw-bold">
                        රු.{" "}
                        {parseFloat(borrower.interest || 0).toLocaleString(
                          "si-LK"
                        )}
                      </td>
                      <td className="py-3 text-info fw-bold">
                        රු.{" "}
                        {parseFloat(
                          borrower.stationeryFees || 0
                        ).toLocaleString("si-LK")}
                      </td>
                      <td
                        className="py-3 text-center fw-bold"
                        style={{ background: "#f3e5f5", borderRadius: "6px" }}
                      >
                        රු. {calculateTotal(borrower).toLocaleString("si-LK")}
                      </td>
                      <td className="py-3">
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            onClick={() => handleEditBorrower(index)}
                            className="btn btn-sm btn-outline-primary"
                            style={{ borderRadius: "8px" }}
                          >
                            <Edit size={14} className="me-1" /> සංස්කරණය
                          </button>
                          <button
                            onClick={() => handleDeleteBorrower(index)}
                            className="btn btn-sm btn-outline-danger"
                            style={{ borderRadius: "8px" }}
                          >
                            <Trash2 size={14} className="me-1" /> මකන්න
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div style={{ borderTop: "2px solid #e9ecef", padding: "1.5rem" }}>
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="text-center">
                    <small className="text-muted d-block mb-2">
                      මුළු ණය මුදල
                    </small>
                    <h6 className="fw-bold text-success">
                      රු. {getTotalLoanAmount().toLocaleString("si-LK")}
                    </h6>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <small className="text-muted d-block mb-2">
                      මුළු හිඟ ණය ශේෂය
                    </small>
                    <h6 className="fw-bold text-danger">
                      රු. {getTotalOutstandingAmount().toLocaleString("si-LK")}
                    </h6>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <small className="text-muted d-block mb-2">
                      මුළු හිඟ ණය පොළිය
                    </small>
                    <h6 className="fw-bold text-warning">
                      රු. {getTotalInterest().toLocaleString("si-LK")}
                    </h6>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="text-center">
                    <small className="text-muted d-block mb-2">
                      මුළු ගාස්තු
                    </small>
                    <h6 className="fw-bold text-info">
                      රු. {getTotalFees().toLocaleString("si-LK")}
                    </h6>
                  </div>
                </div>
                <div className="col-md-2">
                  <div
                    className="text-center p-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  >
                    <small className="d-block opacity-75">මුළු වටිනාකම</small>
                    <h6 className="fw-bold text-white mb-0">
                      රු. {getGrandTotal().toLocaleString("si-LK")}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Submit Button */}
      {borrowers.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="btn btn-lg shadow-lg"
            disabled={loading}
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3ab98e 0%, #1bd499 100%)",
              color: "white",
              border: "none",
              padding: "1rem 3rem",
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                යවමින්...
              </>
            ) : (
              <>
                <CheckCircle size={20} className="me-2" />
                සමිති අනුමැතියට යවන්න ({borrowers.length} ණයගැතියන්)
              </>
            )}
          </button>
        </div>
      )}

      {/* Empty State */}
      {borrowers.length === 0 && !showAddForm && (
        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body text-center py-5">
            <Users size={64} className="text-muted mb-3 opacity-50" />
            <h6 className="text-muted mb-2">ණයගැතියන් එකතු කර නොමැත</h6>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-lg"
              style={{
                borderRadius: "10px",
                fontSize: "13px",
                background: "linear-gradient(135deg, #c3ace8 0%, #9fcce7 100%)",
                color: "white",
                border: "none",
              }}
            >
              <Plus size={14} className="me-2" />
              පළමු ණයගැතියා එකතු කරන්න
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSubmissionPage;
