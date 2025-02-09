const userEndPoints =  {
    USER: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        GOOGLE_AUTH: "/auth/google",
        BOOK_APPOINTMENT: "/appointments/book-appointment",
        RESCHEDULE_APPOINTMENT: "/appointments/reschedule-appointment",
        VIEW_USER_APPOINTMENT: "/appointments/:id",
        VIEW_APPOINTMENT_DETAILS: "/appointments/details/:appointmentId",
        POST_REVIEW: "/reviews/post-review",
        GET_REVIEWS_OF_DOCTOR: "/reviews/:id",
        MAKE_PAYMENT: "/appointments/create-payment",
        VERIFY_PAYMENT: "/appointments/verify-payment",
      },
}

export default userEndPoints;