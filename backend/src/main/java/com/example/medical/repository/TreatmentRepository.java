package com.example.medical.repository;

import com.example.medical.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TreatmentRepository extends JpaRepository<Treatment, Integer> {
    List<Treatment> findByPatientIdPatient(Integer patientId);
    Optional<Treatment> findByIdTreatmentAndPatientIdPatient(Integer idTreatment, Integer patientId);
}
