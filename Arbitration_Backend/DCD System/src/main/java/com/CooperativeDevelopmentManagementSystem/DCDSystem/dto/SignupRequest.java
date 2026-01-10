package com.CooperativeDevelopmentManagementSystem.DCDSystem.dto;

//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Size;
//import lombok.Data;
//
//@Data
//public class SignupRequest {
//    @NotBlank
//    @Size(max = 100)
//    @Email
//    private String email;
//
//    @NotBlank
//    @Size(min = 6, max = 40)
//    private String password;
//
//    private String name;
//
//    private String district;
//
//    private String society;
//
//    private String designation;
//
//    @NotBlank
//    private String userType; // SOCIETY_MEMBER or OFFICER
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getDistrict() {
//        return district;
//    }
//
//    public void setDistrict(String district) {
//        this.district = district;
//    }
//
//    public String getSociety() {
//        return society;
//    }
//
//    public void setSociety(String society) {
//        this.society = society;
//    }
//
//    public String getDesignation() {
//        return designation;
//    }
//
//    public void setDesignation(String designation) {
//        this.designation = designation;
//    }
//
//    public String getUserType() {
//        return userType;
//    }
//
//    public void setUserType(String userType) {
//        this.userType = userType;
//    }
//}

//
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Size;
//import lombok.Data;
//
//@Data
//public class SignupRequest {
//    @NotBlank
//    @Size(max = 100)
//    @Email
//    private String email;
//
//    @NotBlank
//    @Size(min = 6, max = 40)
//    private String password;
//
//    private String name;
//
//    private String district;
//
//    private String society;
//
//    private String designation;
//
//    private String role;  // "SOCIETY_ADMIN" or "SOCIETY_APPROVAL" for society users
//
//    @NotBlank
//    private String userType; // "SOCIETY" or "OFFICER"
//}




//
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Size;
//import lombok.Data;
//
//@Data
//public class SignupRequest {
//    @NotBlank
//    @Size(max = 100)
//    @Email
//    private String email;
//
//    @NotBlank
//    @Size(min = 6, max = 40)
//    private String password;
//
//    private String name;
//
//    private String district;
//
//    private String society;
//
//    private String designation;
//
//    private String role;  // "SOCIETY_ADMIN" or "SOCIETY_APPROVAL" for society users
//
//    private String officerId; // NEW: ID of the selected arbitration officer (for OFFICER userType only)
//
//    @NotBlank
//    private String userType; // "SOCIETY" or "OFFICER"
//}

//
//
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Size;
//import lombok.Data;
//
//@Data
//public class SignupRequest {
//    @NotBlank
//    @Size(max = 100)
//    @Email
//    private String email;
//
//    @NotBlank
//    @Size(min = 6, max = 40)
//    private String password;
//
//    private String name;
//
//    // UPDATED: District is NOT required for Provincial Admin
//    // Validation will be done in the service layer based on userType and role
//    private String district;
//
//    private String society;
//
//    private String designation;
//
//    // For SOCIETY users: "SOCIETY_ADMIN" or "SOCIETY_APPROVAL"
//    // For OFFICER users: "OFFICER", "DISTRICT_ADMIN", or "PROVINCIAL_ADMIN"
//    private String role;
//
//    // NEW: ID of the selected arbitration officer (for OFFICER role only)
//    private String officerId;
//
//    @NotBlank
//    private String userType; // "SOCIETY" or "OFFICER"
//}



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank
    @Size(max = 100)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    private String name;

    // District is NOT required for Provincial Admin
    // Validation will be done in the service layer based on userType and role
    private String district;

    private String society; // Society name (deprecated - use societyId)

    // NEW: ID of the selected society (for SOCIETY users only)
    private String societyId;

    private String designation;
    // ⭐ NEW: Contact Number field
    private String contactNo;
    // For SOCIETY users: "SOCIETY_ADMIN" or "SOCIETY_APPROVAL"
    // For OFFICER users: "OFFICER", "DISTRICT_ADMIN", or "PROVINCIAL_ADMIN"
    private String role;

    // ID of the selected arbitration officer (for OFFICER role only)
    private String officerId;
    private String legalOfficerId;

    @NotBlank
    private String userType; // "SOCIETY" or "OFFICER"


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getSociety() {
        return society;
    }

    public void setSociety(String society) {
        this.society = society;
    }

    public String getSocietyId() {
        return societyId;
    }

    public void setSocietyId(String societyId) {
        this.societyId = societyId;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getOfficerId() {
        return officerId;
    }

    public void setOfficerId(String officerId) {
        this.officerId = officerId;
    }

    public String getLegalOfficerId() {
        return legalOfficerId;
    }

    public void setLegalOfficerId(String legalOfficerId) {
        this.legalOfficerId = legalOfficerId;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}