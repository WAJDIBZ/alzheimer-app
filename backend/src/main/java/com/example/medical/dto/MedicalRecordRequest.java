package com.example.medical.dto;

import lombok.Data;

@Data
public class MedicalRecordRequest {
    private String diagnosis;
    private String diseaseStage;
    private String medicalHistory;
    private String allergies;
}
