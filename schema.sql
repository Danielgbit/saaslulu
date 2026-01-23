-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.appointment_confirmations (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  appointment_id uuid NOT NULL,
  token text NOT NULL UNIQUE,
  used boolean DEFAULT false,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT appointment_confirmations_pkey PRIMARY KEY (id),
  CONSTRAINT appointment_confirmations_appointment_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id)
);
CREATE TABLE public.appointments (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  client_phone character varying NOT NULL,
  client_name character varying,
  service_id uuid,
  status USER-DEFINED DEFAULT 'confirmed'::appointment_status,
  created_at timestamp without time zone DEFAULT now(),
  employee_id uuid,
  start_at timestamp with time zone,
  end_at timestamp with time zone,
  CONSTRAINT appointments_pkey PRIMARY KEY (id),
  CONSTRAINT appointments_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id),
  CONSTRAINT appointments_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id)
);
CREATE TABLE public.business_hours (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  day_of_week integer NOT NULL,
  open_time time without time zone,
  close_time time without time zone,
  note text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT business_hours_pkey PRIMARY KEY (id)
);
CREATE TABLE public.employees (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  full_name character varying NOT NULL,
  phone character varying,
  email character varying UNIQUE,
  role character varying DEFAULT 'staff'::character varying,
  created_at timestamp without time zone DEFAULT now(),
  calendar_id text,
  auth_user_id uuid UNIQUE,
  is_admin boolean DEFAULT false,
  CONSTRAINT employees_pkey PRIMARY KEY (id)
);
CREATE TABLE public.recording_histories (
  id integer NOT NULL DEFAULT nextval('recording_histories_id_seq'::regclass),
  session_id character varying NOT NULL,
  message jsonb NOT NULL,
  CONSTRAINT recording_histories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying NOT NULL,
  price numeric NOT NULL,
  duration_minutes integer NOT NULL,
  description text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT services_pkey PRIMARY KEY (id)
);
CREATE TABLE public.services_completed (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  employee_id uuid NOT NULL,
  appointment_id uuid,
  service_name text NOT NULL,
  service_price numeric NOT NULL,
  duration_minutes integer NOT NULL,
  completed_at timestamp with time zone DEFAULT now(),
  notes text,
  CONSTRAINT services_completed_pkey PRIMARY KEY (id),
  CONSTRAINT fk_service_employee FOREIGN KEY (employee_id) REFERENCES public.employees(id),
  CONSTRAINT fk_service_appointment FOREIGN KEY (appointment_id) REFERENCES public.appointments(id)
);