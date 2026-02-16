package com.example.medical.controller.admin;

import com.example.medical.dto.*;
import com.example.medical.service.PatientManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminPatientController {

    private final PatientManagementService service;

    @GetMapping("/patients")
    public List<PatientResponse> getPatients() {
        return service.getPatients();
    }

    @PostMapping("/patients")
    @ResponseStatus(HttpStatus.CREATED)
    public PatientResponse createPatient(@Valid @RequestBody PatientCreateRequest request) {
        return service.createPatient(request);
    }

    @GetMapping("/patients/{id}")
    public PatientDetailsResponse getPatientDetails(@PathVariable Integer id) {
        return service.getPatientDetails(id);
    }

    @PutMapping("/patients/{id}")
    public PatientResponse updatePatient(@PathVariable Integer id, @Valid @RequestBody PatientUpdateRequest request) {
        return service.updatePatient(id, request);
    }

    @DeleteMapping("/patients/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePatient(@PathVariable Integer id) {
        service.deletePatient(id);
    }

    @GetMapping("/patients/{id}/medical-record")
    public MedicalRecordResponse getMedicalRecord(@PathVariable Integer id) {
        return service.getMedicalRecord(id);
    }

    @PostMapping("/patients/{id}/medical-record")
    @ResponseStatus(HttpStatus.CREATED)
    public MedicalRecordResponse createMedicalRecord(@PathVariable Integer id, @Valid @RequestBody MedicalRecordRequest request) {
        return service.createMedicalRecord(id, request);
    }

    @PutMapping("/patients/{id}/medical-record")
    public MedicalRecordResponse updateMedicalRecord(@PathVariable Integer id, @Valid @RequestBody MedicalRecordRequest request) {
        return service.updateMedicalRecord(id, request, true);
    }

    @GetMapping("/patients/{id}/treatments")
    public List<TreatmentResponse> getTreatments(@PathVariable Integer id) {
        return service.getTreatments(id);
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

    @GetMapping("/patients/{id}/emergency-contacts")
    public List<EmergencyContactResponse> getEmergencyContacts(@PathVariable Integer id) {
        return service.getEmergencyContacts(id);
    }

    @PostMapping("/patients/{id}/emergency-contacts")
    @ResponseStatus(HttpStatus.CREATED)
    public EmergencyContactResponse addEmergencyContact(@PathVariable Integer id,
                                                        @Valid @RequestBody EmergencyContactRequest request) {
        return service.addEmergencyContact(id, request);
    }

    @PutMapping("/patients/{id}/emergency-contacts/{contactId}")
    public EmergencyContactResponse updateEmergencyContact(@PathVariable Integer id, @PathVariable Integer contactId,
                                                           @Valid @RequestBody EmergencyContactRequest request) {
        return service.updateEmergencyContact(id, contactId, request);
    }

    @DeleteMapping("/patients/{id}/emergency-contacts/{contactId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmergencyContact(@PathVariable Integer id, @PathVariable Integer contactId) {
        service.deleteEmergencyContact(id, contactId);
    }
}
