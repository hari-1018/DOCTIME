const adminEndPoints = {
    ADMIN:{
      GET_ALL_USERS: "/admin/patients",
      GET_ALL_DOCTORS: "/admin/doctors",
      GET_ALL_APPOINTMENTS: "/admin/appointments",
      BLOCK_USER: (userId) => `/admin/block/${userId}`,
      UNBLOCK_USER: (userId) => `/admin/unblock/${userId}`,
      GET_TOTAL_USERS: "/admin/dashboard/total-users",
      GET_TOTAL_DOCTORS: "/admin/dashboard/total-doctors",
      GET_TOTAL_APPOINTMENTS: "/admin/dashboard/total-appointments",
    },
}

export default adminEndPoints;