package com.example.medical.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PatientUpdateRequest {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @Past
    private LocalDate dateOfBirth;
    private String gender;
    private String phone;
    private String address;
    private String doctorName;
    private String riskLevel;
    private boolean familyHistoryAlzheimer;
    private String status;
}
