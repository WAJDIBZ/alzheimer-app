package com.example.medical.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmergencyContactResponse {
    private Integer idContact;
    private String fullName;
    private String relationship;
    private String phone;
    private String email;
}
