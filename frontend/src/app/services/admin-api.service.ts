import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmergencyContactRequest, EmergencyContactResponse, MedicalRecordRequest, MedicalRecordResponse, PatientCreateRequest, PatientDetailsResponse, PatientResponse, PatientUpdateRequest, TreatmentRequest, TreatmentResponse } from '../models/medical.models';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly base = `${environment.apiBaseUrl}/api/admin`;
  constructor(private http: HttpClient) {}

  getPatients() { return this.http.get<PatientResponse[]>(`${this.base}/patients`); }
  createPatient(payload: PatientCreateRequest) { return this.http.post<PatientResponse>(`${this.base}/patients`, payload); }
  getPatient(id: number) { return this.http.get<PatientDetailsResponse>(`${this.base}/patients/${id}`); }
  updatePatient(id: number, payload: PatientUpdateRequest) { return this.http.put<PatientResponse>(`${this.base}/patients/${id}`, payload); }
  deletePatient(id: number) { return this.http.delete<void>(`${this.base}/patients/${id}`); }

  getMedicalRecord(id: number) { return this.http.get<MedicalRecordResponse>(`${this.base}/patients/${id}/medical-record`); }
  createMedicalRecord(id: number, payload: MedicalRecordRequest) { return this.http.post<MedicalRecordResponse>(`${this.base}/patients/${id}/medical-record`, payload); }
  updateMedicalRecord(id: number, payload: MedicalRecordRequest) { return this.http.put<MedicalRecordResponse>(`${this.base}/patients/${id}/medical-record`, payload); }

  getTreatments(id: number) { return this.http.get<TreatmentResponse[]>(`${this.base}/patients/${id}/treatments`); }
  addTreatment(id: number, payload: TreatmentRequest) { return this.http.post<TreatmentResponse>(`${this.base}/patients/${id}/treatments`, payload); }
  updateTreatment(id: number, treatmentId: number, payload: TreatmentRequest) { return this.http.put<TreatmentResponse>(`${this.base}/patients/${id}/treatments/${treatmentId}`, payload); }
  deleteTreatment(id: number, treatmentId: number) { return this.http.delete<void>(`${this.base}/patients/${id}/treatments/${treatmentId}`); }

  getContacts(id: number) { return this.http.get<EmergencyContactResponse[]>(`${this.base}/patients/${id}/emergency-contacts`); }
  addContact(id: number, payload: EmergencyContactRequest) { return this.http.post<EmergencyContactResponse>(`${this.base}/patients/${id}/emergency-contacts`, payload); }
  updateContact(id: number, contactId: number, payload: EmergencyContactRequest) { return this.http.put<EmergencyContactResponse>(`${this.base}/patients/${id}/emergency-contacts/${contactId}`, payload); }
  deleteContact(id: number, contactId: number) { return this.http.delete<void>(`${this.base}/patients/${id}/emergency-contacts/${contactId}`); }
}
