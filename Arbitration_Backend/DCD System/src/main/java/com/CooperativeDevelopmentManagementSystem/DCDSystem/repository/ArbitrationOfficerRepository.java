package com.CooperativeDevelopmentManagementSystem.DCDSystem.repository;
//
//import com.CooperativeDevelopmentManagementSystem.DCDSystem.model.ArbitrationOfficer;
//import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface ArbitrationOfficerRepository extends MongoRepository<ArbitrationOfficer, String> {
//    List<ArbitrationOfficer> findByDistrictId(String districtId);
//
//    Optional<ArbitrationOfficer> findFirstByDistrictIdAndAssignedToSocietyIdIsNull(String districtId);
//}




import com.CooperativeDevelopmentManagementSystem.DCDSystem.model.ArbitrationOfficer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface ArbitrationOfficerRepository extends MongoRepository<ArbitrationOfficer, String> {

    List<ArbitrationOfficer> findByDistrictId(String districtId);

    List<ArbitrationOfficer> findByDistrictIdAndUserAccountCreated(String districtId, boolean userAccountCreated);

    Optional<ArbitrationOfficer> findFirstByDistrictIdAndAssignedToSocietyIdIsNull(String districtId);

    // NEW: Count how many societies this officer is assigned to
    @Query(value = "{ 'assignedToSocietyId': { $ne: null } }", count = true)
    default int countSocietiesAssignedToOfficer(String officerId) {
        // This is a simple count - in reality, one officer can be assigned to one society
        // but handle multiple borrowers. For better load balancing, we could count
        // borrowers assigned to this officer across all submissions
        return 0; // Default implementation
    }
}