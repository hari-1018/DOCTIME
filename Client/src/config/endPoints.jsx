const endPoints = {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      GOOGLE_AUTH: "/auth/google",
      GET_DOCTORS: "auth/doctors"
    },
    ADMIN:{
      GET_ALL_USERS: "/admin/patients",
      GET_ALL_DOCTORS: "/admin/doctors",
      GET_ALL_APPOINTMENTS: "/admin/appointments",
      BLOCK_USER: (userID) => `/admin/patients/block/${userID}`,
      UNBLOCK_USER: (userID) => `/admin/patients/unblock/${userID}`,
      GET_TOTAL_USERS: "/admin/dashboard/total-users",
      GET_TOTAL_DOCTORS: "/admin/dashboard/total-doctors",
      GET_TOTAL_APPOINTMENTS: "/admin/dashboard/total-appointments",
      


    },
}

export default endPoints;