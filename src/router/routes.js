/**
 * Created by leibo on 2018/12/4.
 */
export default [
  //登录
  {
    path: '/',
    name: 'Login',
    component: () => import ('@/views/Login'),
  },
  //首页
  {
    path: '/home',
    component: () => import ('@/views/Home'),
    name: 'Home',
  },
  // {
  //   path: '/adminEndOrder',
  //   component: () => import ('@/views/AdminEndOrder'),
  //   name: 'AdminEndOrder',
  // },
  // //收银台
  // {
  //   path: '/cashierDesk',
  //   component: () => import ('@/views/CashierDesk'),
  //   name: 'CashierDesk',
  //   hidden: true
  // },
  //收银台
  {
    path: '/cashierEndHomePage',
    name: 'CashierEndHomePage',
    component: () => import ('@/views/CashierEndUser/CashierEndHomePage'),
    children: [
      {
        path: 'cashierGuestRoom',
        name: 'CashierGuestRoom',
        component: () => import('@/views/CashierEndUser/CashierGuestRoom'),
      },
      {
        path: 'cashierOrder',
        name: 'CashierOrder',
        component: () => import('@/views/CashierEndUser/CashierOrder'),
      },
      {
        path: 'cashierComplaint',
        name: 'CashierComplaint',
        component: () => import('@/views/CashierEndUser/CashierComplaint'),
      },
      {
        path: 'cashierHandOverDuty',
        name: 'CashierHandOverDuty',
        component: () => import('@/views/CashierEndUser/CashierHandOverDuty'),
      },
      {
        path: 'cashierMemberVIP',
        name: 'CashierMemberVIP',
        component: () => import('@/views/CashierEndUser/CashierMemberVIP'),
      },


    ]
  },

  //投诉
  // {
  //   path: '/complain',
  //   name: 'Complain',
  //   component: () => import ('@/views/Complain'),
  //   hidden: true
  // },
  //后台管理首页

  {
    path: '/hotelBackstageHome',
    name: 'HotelBackstageHome',
    component: () => import('@/views/HotelBackstage/HotelBackstageHome'),
    children: [
      //房间
      {
        path: 'hotelRoomAdmin',
        name: 'HotelRoomAdmin',
        component: () => import('@/views/HotelBackstage/HotelRoomAdmin'),
      },
      {
        path: 'hotelRoomProduct/:id',
        name: 'HotelRoomProduct',
        component: () => import('@/views/HotelBackstage/HotelRoomProduct'),
      },
      {
        path: 'hotelRoomRoomFacilities/:id',
        name: 'HotelRoomRoomFacilities',
        component: () => import('@/views/HotelBackstage/HotelRoomRoomFacilities'),
      },
      {
        path: 'hotelRoomEntity/:id',
        name: 'HotelRoomEntity',
        component: () => import('@/views/HotelBackstage/HotelRoomEntity'),
      },
      //报表
      {
        path: 'hotelReportForm',
        name: 'HotelReportForm',
        component: () => import('@/views/HotelBackstage/HotelReportForm'),
      },
      //员工
      {
        path: 'hotelStaffAdmin',
        name: 'HotelStaffAdmin',
        component: () => import('@/views/HotelBackstage/HotelStaffAdmin'),
      },
      //投诉
      {
        path: 'hotelComplaint',
        name: 'HotelComplaint',
        component: () => import('@/views/HotelBackstage/HotelComplaint'),
      },
      //合作企业
      {
        path: 'hotelCooperativeEnterprise',
        name: 'HotelCooperativeEnterprise',
        component: () => import('@/views/HotelBackstage/HotelCooperativeEnterprise'),
      },
      //酒店会员
      {
        path: 'hotelMemberVIP',
        name: 'HotelMemberVIP',
        component: () => import('@/views/HotelBackstage/HotelMemberVIP'),
      },
      //OTA管理
      {
        path: 'oTAAdmin',
        name: 'OTAAdmin',
        component: () => import('@/views/HotelBackstage/OTAAdmin'),
      },
    ]
  }
]
