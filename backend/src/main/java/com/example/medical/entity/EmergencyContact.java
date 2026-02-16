package com.example.medical.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "emergency_contacts")
@Getter
@Setter
public class EmergencyContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idContact;

    @Column(nullable = false)
    private String fullName;

    private String relationship;

    @Column(nullable = false)
    private String phone;

    private String email;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
