package com.example.medical.controller.soignant;

import com.example.medical.dto.*;
import com.example.medical.service.PatientManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/soignant")
@RequiredArgsConstructor
public class SoignantPatientController {

    private final PatientManagementService service;

    @GetMapping("/patients")
    public List<PatientResponse> getPatients() {
        return service.getPatients();
    }

    @GetMapping("/patients/{id}")
    public PatientDetailsResponse getPatientDetails(@PathVariable Integer id) {
        return service.getPatientDetails(id);
    }

    @PutMapping("/patients/{id}/medical-record")
    public MedicalRecordResponse updateMedicalRecord(@PathVariable Integer id, @Valid @RequestBody MedicalRecordRequest request) {
        return service.updateMedicalRecord(id, request, false);
    }

    @PostMapping("/patients/{id}/treatments")
    @ResponseStatus(HttpStatus.CREATED)
    public TreatmentResponse addTreatment(@PathVariable Integer id, @Valid @RequestBody TreatmentRequest request) {
        return service.addTreatment(id, request);
    }

    @PutMapping("/patients/{id}/treatments/{treatmentId}")
    public TreatmentResponse updateTreatment(@PathVariable Integer id, @PathVariable Integer treatmentId,
                                             @Valid @RequestBody TreatmentRequest request) {
        return service.updateTreatment(id, treatmentId, request);
    }

    @DeleteMapping("/patients/{id}/treatments/{treatmentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTreatment(@PathVariable Integer id, @PathVariable Integer treatmentId) {
        service.deleteTreatment(id, treatmentId);
    }
}
