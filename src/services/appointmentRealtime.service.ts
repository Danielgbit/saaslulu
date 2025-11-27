import { Appointment } from "@/types/appointments";
import { supabaseClient } from "../lib/supabaseClient";
import { AppointmentScheduler } from "./appointmentScheduler.service";


type Callback = (appointment: Appointment) => void;


class AppointmentRealtime {
    private static startSubscribers: Callback[] = [];
    private static endSubscribers: Callback[] = [];


    /** Initialize realtime listener */
    static init() {
        supabaseClient
            .channel("appointments-channel")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "appointments" }, async (payload) => {
                const appt = payload.new as Appointment;


                // Schedule start event
                AppointmentScheduler.scheduleStart(appt, () => {
                    this.startSubscribers.forEach((fn) => fn(appt));
                });


                // Schedule end event
                AppointmentScheduler.scheduleEnd(appt, () => {
                    this.endSubscribers.forEach((fn) => fn(appt));
                });
            })
            .subscribe();
    }


    static onStart(fn: Callback) {
        this.startSubscribers.push(fn);
    }


    static onEnd(fn: Callback) {
        this.endSubscribers.push(fn);
    }
}


export default AppointmentRealtime;