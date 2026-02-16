INSERT INTO patients (id_patient, first_name, last_name, date_of_birth, gender, phone, address, family_history_alzheimer, status, created_at)
VALUES
(1, 'Marie', 'Dupont', '1950-03-21', 'F', '0600000001', '12 rue des Lilas, Paris', true, 'Suivi régulier', '2024-01-02'),
(2, 'Jean', 'Martin', '1947-11-10', 'M', '0600000002', '8 avenue Victor Hugo, Lyon', false, 'Stabilisé', '2024-01-05'),
(3, 'Lucie', 'Bernard', '1955-06-17', 'F', '0600000003', '45 boulevard Carnot, Lille', true, 'À évaluer', '2024-01-08')
ON DUPLICATE KEY UPDATE id_patient=id_patient;

INSERT INTO medical_records (id_record, diagnosis, disease_stage, medical_history, allergies, record_date, last_update, patient_id)
VALUES
(1, 'Maladie d\'Alzheimer probable', 'Modéré', 'Hypertension traitée depuis 10 ans', 'Pénicilline', '2024-01-10', '2024-01-10', 1)
ON DUPLICATE KEY UPDATE id_record=id_record;

INSERT INTO treatments (id_treatment, treatment_name, dosage, frequency, start_date, end_date, status, patient_id)
VALUES
(1, 'Donepezil', '10mg', '1 fois/jour', '2024-01-15', NULL, 'Actif', 1),
(2, 'Memantine', '5mg', '2 fois/jour', '2024-02-01', NULL, 'Actif', 1)
ON DUPLICATE KEY UPDATE id_treatment=id_treatment;

INSERT INTO emergency_contacts (id_contact, full_name, relationship, phone, email, patient_id)
VALUES
(1, 'Paul Dupont', 'Fils', '0611111111', 'paul.dupont@example.com', 1),
(2, 'Claire Martin', 'Épouse', '0622222222', 'claire.martin@example.com', 2)
ON DUPLICATE KEY UPDATE id_contact=id_contact;
