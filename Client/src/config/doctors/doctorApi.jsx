const doctorEndPoints = {
    DOCTOR: {
        LOGIN: "/auth/doctor-login",
        GET_DOCTORS: "/doctors",
        GET_DOCTOR_BY_ID: "/doctors/:id",
        FORGOT_PASSWORD: "/doctors/forgot-password",
        RESET_PASSWORD: "/doctors/reset-password/:token",
        VIEW_DOCTOR_APPOINTMENT: "/appointments/doctor/:id",
        UPDATE_APPOINTMENT_STATUS: "/doctors/:appointmentId/change-status"

    }
}

export default doctorEndPoints;