import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MedicalRecordRequest, MedicalRecordResponse, PatientDetailsResponse, PatientResponse, TreatmentRequest, TreatmentResponse } from '../models/medical.models';

@Injectable({ providedIn: 'root' })
export class SoignantApiService {
  private readonly base = `${environment.apiBaseUrl}/api/soignant`;
  constructor(private http: HttpClient) {}

  getPatients() { return this.http.get<PatientResponse[]>(`${this.base}/patients`); }
  getPatient(id: number) { return this.http.get<PatientDetailsResponse>(`${this.base}/patients/${id}`); }
  updateMedicalRecord(id: number, payload: MedicalRecordRequest) { return this.http.put<MedicalRecordResponse>(`${this.base}/patients/${id}/medical-record`, payload); }
  addTreatment(id: number, payload: TreatmentRequest) { return this.http.post<TreatmentResponse>(`${this.base}/patients/${id}/treatments`, payload); }
  updateTreatment(id: number, treatmentId: number, payload: TreatmentRequest) { return this.http.put<TreatmentResponse>(`${this.base}/patients/${id}/treatments/${treatmentId}`, payload); }
  deleteTreatment(id: number, treatmentId: number) { return this.http.delete<void>(`${this.base}/patients/${id}/treatments/${treatmentId}`); }
}
