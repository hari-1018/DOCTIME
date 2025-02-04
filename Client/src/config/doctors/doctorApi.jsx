const doctorEndPoints = {
    DOCTOR: {
        LOGIN: "/auth/doctor-login",
        GET_DOCTORS: "/doctors",
        GET_DOCTOR_BY_ID: "/doctors/:id",
        VIEW_DOCTOR_APPOINTMENT: "/appointments/doctor/:id"
    }
}

export default doctorEndPoints;