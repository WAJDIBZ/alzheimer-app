package com.example.medical.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EmergencyContactRequest {
    @NotBlank
    private String fullName;
    private String relationship;
    @NotBlank
    private String phone;
    @Email
    private String email;
}
