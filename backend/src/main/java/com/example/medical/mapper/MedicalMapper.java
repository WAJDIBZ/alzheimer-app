package com.example.medical.mapper;

import com.example.medical.dto.*;
import com.example.medical.entity.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MedicalMapper {

    public PatientResponse toPatientResponse(Patient p) {
        return PatientResponse.builder()
                .idPatient(p.getIdPatient())
                .firstName(p.getFirstName())
                .lastName(p.getLastName())
                .dateOfBirth(p.getDateOfBirth())
                .gender(p.getGender())
                .phone(p.getPhone())
                .address(p.getAddress())
                .doctorName(p.getDoctorName())
                .riskLevel(p.getRiskLevel())
                .familyHistoryAlzheimer(p.isFamilyHistoryAlzheimer())
                .status(p.getStatus())
                .createdAt(p.getCreatedAt())
                .build();
    }

    public MedicalRecordResponse toMedicalRecordResponse(MedicalRecord record) {
        if (record == null) return null;
        return MedicalRecordResponse.builder()
                .idRecord(record.getIdRecord())
                .diagnosis(record.getDiagnosis())
                .diseaseStage(record.getDiseaseStage())
                .medicalHistory(record.getMedicalHistory())
                .allergies(record.getAllergies())
                .recordDate(record.getRecordDate())
                .lastUpdate(record.getLastUpdate())
                .build();
    }

    public TreatmentResponse toTreatmentResponse(Treatment t) {
        return TreatmentResponse.builder()
                .idTreatment(t.getIdTreatment())
                .treatmentName(t.getTreatmentName())
                .dosage(t.getDosage())
                .frequency(t.getFrequency())
                .startDate(t.getStartDate())
                .endDate(t.getEndDate())
                .status(t.getStatus())
                .build();
    }

    public EmergencyContactResponse toEmergencyContactResponse(EmergencyContact c) {
        return EmergencyContactResponse.builder()
                .idContact(c.getIdContact())
                .fullName(c.getFullName())
                .relationship(c.getRelationship())
                .phone(c.getPhone())
                .email(c.getEmail())
                .build();
    }

    public PatientDetailsResponse toPatientDetailsResponse(Patient patient) {
        List<TreatmentResponse> treatments = patient.getTreatments().stream().map(this::toTreatmentResponse).toList();
        List<EmergencyContactResponse> contacts = patient.getEmergencyContacts().stream().map(this::toEmergencyContactResponse).toList();
        return PatientDetailsResponse.builder()
                .patient(toPatientResponse(patient))
                .medicalRecord(toMedicalRecordResponse(patient.getMedicalRecord()))
                .treatments(treatments)
                .emergencyContacts(contacts)
                .build();
    }
}
