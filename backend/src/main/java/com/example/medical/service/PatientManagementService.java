package com.example.medical.service;

import com.example.medical.dto.*;
import com.example.medical.entity.EmergencyContact;
import com.example.medical.entity.MedicalRecord;
import com.example.medical.entity.Patient;
import com.example.medical.entity.Treatment;
import com.example.medical.exception.ConflictException;
import com.example.medical.exception.ResourceNotFoundException;
import com.example.medical.mapper.MedicalMapper;
import com.example.medical.repository.EmergencyContactRepository;
import com.example.medical.repository.MedicalRecordRepository;
import com.example.medical.repository.PatientRepository;
import com.example.medical.repository.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PatientManagementService {

    private final PatientRepository patientRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final TreatmentRepository treatmentRepository;
    private final EmergencyContactRepository emergencyContactRepository;
    private final MedicalMapper mapper;

    @Transactional(readOnly = true)
    public List<PatientResponse> getPatients() {
        return patientRepository.findAll().stream().map(mapper::toPatientResponse).toList();
    }

    public PatientResponse createPatient(PatientCreateRequest request) {
        Patient p = new Patient();
        applyPatientFields(p, request.getFirstName(), request.getLastName(), request.getDateOfBirth(), request.getGender(), request.getPhone(), request.getAddress(), request.isFamilyHistoryAlzheimer(), request.getStatus());
        return mapper.toPatientResponse(patientRepository.save(p));
    }

    @Transactional(readOnly = true)
    public PatientDetailsResponse getPatientDetails(Integer id) {
        return mapper.toPatientDetailsResponse(getPatientOrThrow(id));
    }

    public PatientResponse updatePatient(Integer id, PatientUpdateRequest request) {
        Patient p = getPatientOrThrow(id);
        applyPatientFields(p, request.getFirstName(), request.getLastName(), request.getDateOfBirth(), request.getGender(), request.getPhone(), request.getAddress(), request.isFamilyHistoryAlzheimer(), request.getStatus());
        return mapper.toPatientResponse(patientRepository.save(p));
    }

    public void deletePatient(Integer id) {
        Patient p = getPatientOrThrow(id);
        patientRepository.delete(p);
    }

    @Transactional(readOnly = true)
    public MedicalRecordResponse getMedicalRecord(Integer patientId) {
        return mapper.toMedicalRecordResponse(getMedicalRecordOrThrow(patientId));
    }

    public MedicalRecordResponse createMedicalRecord(Integer patientId, MedicalRecordRequest request) {
        Patient patient = getPatientOrThrow(patientId);
        if (patient.getMedicalRecord() != null) {
            throw new ConflictException("Medical record already exists for patient " + patientId);
        }
        MedicalRecord record = new MedicalRecord();
        record.setPatient(patient);
        updateMedicalRecordEntity(record, request);
        patient.setMedicalRecord(record);
        return mapper.toMedicalRecordResponse(medicalRecordRepository.save(record));
    }

    public MedicalRecordResponse updateMedicalRecord(Integer patientId, MedicalRecordRequest request, boolean allowCreate) {
        Patient patient = getPatientOrThrow(patientId);
        MedicalRecord record = patient.getMedicalRecord();
        if (record == null) {
            if (!allowCreate) {
                throw new ResourceNotFoundException("Medical record not found for patient " + patientId);
            }
            record = new MedicalRecord();
            record.setPatient(patient);
            patient.setMedicalRecord(record);
        }
        updateMedicalRecordEntity(record, request);
        return mapper.toMedicalRecordResponse(medicalRecordRepository.save(record));
    }

    @Transactional(readOnly = true)
    public List<TreatmentResponse> getTreatments(Integer patientId) {
        getPatientOrThrow(patientId);
        return treatmentRepository.findByPatientIdPatient(patientId).stream().map(mapper::toTreatmentResponse).toList();
    }

    public TreatmentResponse addTreatment(Integer patientId, TreatmentRequest request) {
        validateTreatmentDates(request);
        Patient patient = getPatientOrThrow(patientId);
        Treatment t = new Treatment();
        t.setPatient(patient);
        updateTreatmentEntity(t, request);
        return mapper.toTreatmentResponse(treatmentRepository.save(t));
    }

    public TreatmentResponse updateTreatment(Integer patientId, Integer treatmentId, TreatmentRequest request) {
        validateTreatmentDates(request);
        Treatment t = treatmentRepository.findByIdTreatmentAndPatientIdPatient(treatmentId, patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found for patient"));
        updateTreatmentEntity(t, request);
        return mapper.toTreatmentResponse(treatmentRepository.save(t));
    }

    public void deleteTreatment(Integer patientId, Integer treatmentId) {
        Treatment t = treatmentRepository.findByIdTreatmentAndPatientIdPatient(treatmentId, patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found for patient"));
        treatmentRepository.delete(t);
    }

    @Transactional(readOnly = true)
    public List<EmergencyContactResponse> getEmergencyContacts(Integer patientId) {
        getPatientOrThrow(patientId);
        return emergencyContactRepository.findByPatientIdPatient(patientId).stream().map(mapper::toEmergencyContactResponse).toList();
    }

    public EmergencyContactResponse addEmergencyContact(Integer patientId, EmergencyContactRequest request) {
        Patient patient = getPatientOrThrow(patientId);
        EmergencyContact c = new EmergencyContact();
        c.setPatient(patient);
        updateContactEntity(c, request);
        return mapper.toEmergencyContactResponse(emergencyContactRepository.save(c));
    }

    public EmergencyContactResponse updateEmergencyContact(Integer patientId, Integer contactId, EmergencyContactRequest request) {
        EmergencyContact c = emergencyContactRepository.findByIdContactAndPatientIdPatient(contactId, patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Emergency contact not found for patient"));
        updateContactEntity(c, request);
        return mapper.toEmergencyContactResponse(emergencyContactRepository.save(c));
    }

    public void deleteEmergencyContact(Integer patientId, Integer contactId) {
        EmergencyContact c = emergencyContactRepository.findByIdContactAndPatientIdPatient(contactId, patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Emergency contact not found for patient"));
        emergencyContactRepository.delete(c);
    }

    private void validateTreatmentDates(TreatmentRequest request) {
        if (request.getEndDate() != null && request.getStartDate().isAfter(request.getEndDate())) {
            throw new IllegalArgumentException("startDate must be before or equal to endDate");
        }
    }

    private Patient getPatientOrThrow(Integer id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id " + id));
    }

    private MedicalRecord getMedicalRecordOrThrow(Integer patientId) {
        return medicalRecordRepository.findByPatientIdPatient(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Medical record not found for patient " + patientId));
    }

    private void applyPatientFields(Patient p, String firstName, String lastName, java.time.LocalDate dateOfBirth,
                                    String gender, String phone, String address, boolean familyHistoryAlzheimer, String status) {
        p.setFirstName(firstName);
        p.setLastName(lastName);
        p.setDateOfBirth(dateOfBirth);
        p.setGender(gender);
        p.setPhone(phone);
        p.setAddress(address);
        p.setFamilyHistoryAlzheimer(familyHistoryAlzheimer);
        p.setStatus(status);
    }

    private void updateMedicalRecordEntity(MedicalRecord record, MedicalRecordRequest request) {
        record.setDiagnosis(request.getDiagnosis());
        record.setDiseaseStage(request.getDiseaseStage());
        record.setMedicalHistory(request.getMedicalHistory());
        record.setAllergies(request.getAllergies());
    }

    private void updateTreatmentEntity(Treatment treatment, TreatmentRequest request) {
        treatment.setTreatmentName(request.getTreatmentName());
        treatment.setDosage(request.getDosage());
        treatment.setFrequency(request.getFrequency());
        treatment.setStartDate(request.getStartDate());
        treatment.setEndDate(request.getEndDate());
        treatment.setStatus(request.getStatus());
    }

    private void updateContactEntity(EmergencyContact contact, EmergencyContactRequest request) {
        contact.setFullName(request.getFullName());
        contact.setRelationship(request.getRelationship());
        contact.setPhone(request.getPhone());
        contact.setEmail(request.getEmail());
    }
}
