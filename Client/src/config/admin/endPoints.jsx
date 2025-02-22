const adminEndPoints = {
    ADMIN:{
      LOGIN:"/auth/admin-login",
      GET_ALL_USERS: "/admin/patients",
      GET_ALL_DOCTORS: "/admin/doctors",
      ADD_DOCTOR: "/admin/add-doctors",
      EDIT_DOCTOR: "/admin/edit-doctor/:id",
      DOCTOR_DETAILS: "/admin/view-doctor/:id",
      USER_DETAILS: "/admin/view-user/:id",
      GET_ALL_APPOINTMENTS: "/admin/appointments",
      BLOCK_USER: (userId) => `/admin/block/${userId}`,
      UNBLOCK_USER: (userId) => `/admin/unblock/${userId}`,
      GET_TOTAL_USERS: "/admin/dashboard/total-users",
      GET_TOTAL_DOCTORS: "/admin/dashboard/total-doctors",
      GET_COUNT_SPECIALIZATION: "/admin/dashboard/count-specialization",
      GET_TOTAL_APPOINTMENTS: "/admin/dashboard/total-appointments",
      GET_PENDING_APPOINTMENTS: "/admin/dashboard/pending",
      GET_COMPLETED_APPOINTMENTS: "/admin/dashboard/completed",
      GET_TOTAL_REVENUE: "/admin/dashboard/total-revenue",
    },
}

export default adminEndPoints;