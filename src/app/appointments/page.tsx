"use client";
import { useAppointmentEvents } from "../../hooks/useAppointmentEvents";


export default function AppointmentsPage() {
    const { started, ended } = useAppointmentEvents();


    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">Appointment Events</h1>


            {started && (
                <div className="p-4 bg-green-200 rounded-xl">
                    Appointment started: {started.id}
                </div>
            )}


            {ended && (
                <div className="p-4 bg-blue-200 rounded-xl">
                    Appointment ended: {ended.id}
                </div>
            )}
        </div>
    );
}