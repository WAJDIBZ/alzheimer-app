package com.example.medical.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PatientDetailsResponse {
    private PatientResponse patient;
    private MedicalRecordResponse medicalRecord;
    private List<TreatmentResponse> treatments;
    private List<EmergencyContactResponse> emergencyContacts;
}
