package com.example.medical.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TreatmentRequest {
    @NotBlank
    private String treatmentName;
    private String dosage;
    private String frequency;
    @NotNull
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;

    @AssertTrue(message = "startDate must be before or equal to endDate")
    public boolean isDateRangeValid() {
        return endDate == null || !startDate.isAfter(endDate);
    }
}
