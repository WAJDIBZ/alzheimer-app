package com.example.medical.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "medical_records")
@Getter
@Setter
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRecord;

    private String diagnosis;
    private String diseaseStage;

    @Column(columnDefinition = "TEXT")
    private String medicalHistory;

    private String allergies;

    @Column(nullable = false)
    private LocalDate recordDate;

    @Column(nullable = false)
    private LocalDate lastUpdate;

    @OneToOne
    @JoinColumn(name = "patient_id", nullable = false, unique = true)
    private Patient patient;

    @PrePersist
    public void prePersist() {
        LocalDate now = LocalDate.now();
        if (recordDate == null) {
            recordDate = now;
        }
        lastUpdate = now;
    }

    @PreUpdate
    public void preUpdate() {
        lastUpdate = LocalDate.now();
    }
}
