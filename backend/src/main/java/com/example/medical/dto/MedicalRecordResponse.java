package com.example.medical.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class MedicalRecordResponse {
    private Integer idRecord;
    private String diagnosis;
    private String diseaseStage;
    private String medicalHistory;
    private String allergies;
    private LocalDate recordDate;
    private LocalDate lastUpdate;
}
