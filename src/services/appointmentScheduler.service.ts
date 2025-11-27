import { Appointment } from "@/types/appointments";

export class AppointmentScheduler {
    /** Schedules a callback for the appointment start */
    static scheduleStart(appointment: Appointment, cb: () => void) {
        const start = new Date(appointment.appointment_date).getTime();
        const now = Date.now();
        const delay = start - now;


        if (delay <= 0) {
            cb();
            return;
        }


        setTimeout(cb, delay);
    }


    /** Schedules a callback for the appointment end */
    static scheduleEnd(appointment: Appointment, cb: () => void) {
        const start = new Date(appointment.appointment_date).getTime();
        const end = start + appointment.duration_minutes * 60 * 1000;
        const now = Date.now();
        const delay = end - now;


        if (delay <= 0) {
            cb();
            return;
        }


        setTimeout(cb, delay);
    }
}