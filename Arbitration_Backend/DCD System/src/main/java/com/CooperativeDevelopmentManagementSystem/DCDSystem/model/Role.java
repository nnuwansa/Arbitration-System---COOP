package com.CooperativeDevelopmentManagementSystem.DCDSystem.model;

//public enum Role {
//    SOCIETY_MEMBER,
//    DISTRICT_ADMIN,
//    PROVINCIAL_ADMIN,
//    OFFICER
//}


public enum Role {
    SOCIETY_ADMIN,      // Creates submissions and sends to district
    SOCIETY_APPROVAL,// Approves/Rejects submissions
    SOCIETY_MEMBER,
    DISTRICT_ADMIN,
    PROVINCIAL_ADMIN,
    OFFICER,
    LEGAL_OFFICER
}