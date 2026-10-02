CREATE TABLE patients (
  id            SERIAL PRIMARY KEY,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  phone         VARCHAR(20) NOT NULL UNIQUE,
  email         VARCHAR(255) UNIQUE,
  created_at    TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctors (
  id         SERIAL PRIMARY KEY,
  full_name  VARCHAR(150) NOT NULL,
  specialty  VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
  id             SERIAL PRIMARY KEY,
  patient_id     INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id      INTEGER NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT,
  appointment_at TIMESTAMP(6) NOT NULL,
  status         VARCHAR(20) NOT NULL DEFAULT 'scheduled'
                 CHECK (status IN ('scheduled','completed','cancelled','no_show')),
  notes          TEXT,
  created_at     TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);