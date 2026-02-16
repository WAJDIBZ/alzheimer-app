package com.example.medical.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "treatments")
@Getter
@Setter
public class Treatment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTreatment;

    @Column(nullable = false)
    private String treatmentName;

    private String dosage;
    private String frequency;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
