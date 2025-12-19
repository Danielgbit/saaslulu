export const getTomorrowAppointments = async () => {
    const res = await fetch(`/api/appointments/tomorrow`);

    if (!res.ok) {
        throw new Error("Failed to fetch appointments");
    }

    return res.json();
};
