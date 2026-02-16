package com.example.medical.repository;

import com.example.medical.entity.EmergencyContact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Integer> {
    List<EmergencyContact> findByPatientIdPatient(Integer patientId);
    Optional<EmergencyContact> findByIdContactAndPatientIdPatient(Integer idContact, Integer patientId);
}
