const endPoints = {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      GOOGLE_AUTH: "/auth/google"
    },
    ADMIN:{
      GET_ALL_USERS: "/admin/patients",
      GET_ALL_DOCTORS: "/admin/doctors",
      BLOCK_USER: (userID) => `/admin/patients/block/${userID}`,
      UNBLOCK_USER: (userID) => `/admin/patients/unblock/${userID}`,
      GET_TOTAL_USERS: "/admin/dashboard/total-users",
      GET_TOTAL_DOCTORS: "/admin/dashboard/total-doctors",
      


    },
}

export default endPoints;