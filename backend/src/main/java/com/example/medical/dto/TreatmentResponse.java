package com.example.medical.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class TreatmentResponse {
    private Integer idTreatment;
    private String treatmentName;
    private String dosage;
    private String frequency;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}
