export interface PatientResponse {
  idPatient: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: string;
  familyHistoryAlzheimer: boolean;
  status: string;
  createdAt: string;
}

export interface PatientCreateRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: string;
  familyHistoryAlzheimer: boolean;
  status: string;
}

export interface PatientUpdateRequest extends PatientCreateRequest {}

export interface MedicalRecordRequest {
  diagnosis: string;
  diseaseStage: string;
  medicalHistory: string;
  allergies: string;
}

export interface MedicalRecordResponse extends MedicalRecordRequest {
  idRecord: number;
  recordDate: string;
  lastUpdate: string;
}

export interface TreatmentRequest {
  treatmentName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string | null;
  status: string;
}

export interface TreatmentResponse extends TreatmentRequest {
  idTreatment: number;
}

export interface EmergencyContactRequest {
  fullName: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface EmergencyContactResponse extends EmergencyContactRequest {
  idContact: number;
}

export interface PatientDetailsResponse {
  patient: PatientResponse;
  medicalRecord: MedicalRecordResponse | null;
  treatments: TreatmentResponse[];
  emergencyContacts: EmergencyContactResponse[];
}
