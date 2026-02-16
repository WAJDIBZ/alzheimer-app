package com.example.medical.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class PatientResponse {
    private Integer idPatient;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String gender;
    private String phone;
    private String address;
    private boolean familyHistoryAlzheimer;
    private String status;
    private LocalDate createdAt;
}
