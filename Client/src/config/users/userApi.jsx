const userEndPoints =  {
    USER: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        GOOGLE_AUTH: "/auth/google",
        PROFILE:"/user/:id",
        UPLOAD_PROFILE:"/user/upload-profile",
        EDIT_PROFILE: "/user/edit-user/:id",
        BOOK_APPOINTMENT: "/appointments/book-appointment",
        RESCHEDULE_APPOINTMENT: "/appointments/reschedule-appointment",
        CANCEL_APPOINTMENT: "/appointments/cancel-appointment/:appointmentId",
        VIEW_USER_APPOINTMENT: "/appointments/:id",
        VIEW_APPOINTMENT_DETAILS: "/appointments/details/:appointmentId",
        TOTAL_APPOINTMENTS_COUNT: "/user/total-appointments/:userId",
        POST_REVIEW: "/reviews/post-review",
        GET_REVIEWS_OF_DOCTOR: "/reviews/:id",
        MAKE_PAYMENT: "/appointments/create-payment",
        VERIFY_PAYMENT: "/appointments/verify-payment",
      },
}

export default userEndPoints;