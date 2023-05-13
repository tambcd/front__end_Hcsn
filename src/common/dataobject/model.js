const DataObject = {   

  optionMenu : [
    {
      ItemID: 0,
      ItemTxt: "MISA QLTS",
      item_icon: "menu-item-home__icon",
      itemBg: "menu-item-overview",
      path: "/home",
      isheader: true,
      heightMenu:"44px"
    },
    {
      ItemID: 1,
      ItemTxt: "Tổng quan",
      item_icon: "menu-item-overview__icon",
      itemBg: "menu-item-overview",
      path: "/home",
      heightMenu:"44px"
    },
    {
      ItemID: 2,
      ItemTxt: "Tài sản",
      item_icon: "menu-item-assets__icon",
      itemBg: "menu-item-assets",
      path: "/assets",
      heightMenu:"44px"
    },
    {
      ItemID: 3,
      ItemTxt: "Ghi tăng",
      item_icon: "",
      itemBg: "menu-item-assets",
      path: "/",
      heightMenu:"30px"
    },
    {
      ItemID: 4,
      ItemTxt: "Thay đổi thông tin",
      item_icon: "",
      itemBg: "menu-item-assets",
      path: "/assets",
      heightMenu:"30px"
    },
    {
      ItemID: 5,
      ItemTxt: "Đánh giá lại",
      item_icon: "",
      itemBg: "menu-item-assets",
      path: "/assets",
      heightMenu:"30px"
    },
    {
      ItemID: 6,
      ItemTxt: "Tính hao mòn",
      item_icon: "",
      itemBg: "menu-item-assets",
      path: "/assets",
      heightMenu:"30px"
    },
    {
      ItemID: 7,
      ItemTxt: "Điều chuyển tài sản",
      item_icon: "",
      itemBg: "menu-item-assets",
      path: "/assets",
      heightMenu:"30px"
    },
    {
      ItemID: 8,
      ItemTxt: "Tài sản HT_DB",
      item_icon: "menu-item-assets--HTDB__icon",
      itemBg: "menu-item-assets--HTDB",
      path: "/login",
      heightMenu:"44px"
    },
    {
      ItemID: 9,
      ItemTxt: "Công cụ dụng cụ",
      item_icon: "menu-item-tools__icon",
      itemBg: "menu-item-tools",
      path: "/login",
      heightMenu:"44px"
    },
    {
      ItemID: 10,
      ItemTxt: "Danh mục",
      item_icon: "menu-item-catagory__icon",
      itemBg: "menu-item-catagory",
      path: "/",
      heightMenu:"44px"
    },
    
    {
      ItemID: 11,
      ItemTxt: "Báo cáo",
      item_icon: "menu-item-repost__icon",
      itemBg: "menu-item-repost",
      path: "/",
      heightMenu:"44px"
    },
    {
      ItemID: 12,
      ItemTxt: "Thu gọn",
      item_icon: "botton__menu",
      itemBg: "menu-item-repost",
      isbottom: true,
      heightMenu:"44px"
    },
  ],
  optionMenuMini : [
    {
      ItemID: 0,
      ItemTxt: "MISA QLTS",
      item_icon: "menu-item-home__icon",
      itemBg: "menu-item-overview",
      path: "/home",
      isheader: true,
      heightMenu:"44px"
    },
    {
      ItemID: 1,
      ItemTxt: "Tổng quan",
      item_icon: "menu-item-overview__icon",
      itemBg: "menu-item-overview",
      path: "/home",
      heightMenu:"44px"
    },
    {
      ItemID: 2,
      ItemTxt: "Tài sản",
      item_icon: "menu-item-assets__icon",
      itemBg: "menu-item-assets",
      path: "/assets",
      heightMenu:"44px"
    },
    
    {
      ItemID: 8,
      ItemTxt: "Tài sản HT_DB",
      item_icon: "menu-item-assets--HTDB__icon",
      itemBg: "menu-item-assets--HTDB",
      path: "/login",
      heightMenu:"44px"
    },
    {
      ItemID: 9,
      ItemTxt: "Công cụ dụng cụ",
      item_icon: "menu-item-tools__icon",
      itemBg: "menu-item-tools",
      path: "/login",
      heightMenu:"44px"
    },
    {
      ItemID: 10,
      ItemTxt: "Danh mục",
      item_icon: "menu-item-catagory__icon",
      itemBg: "menu-item-catagory",
      path: "/",
      heightMenu:"44px"
    },
    
    {
      ItemID: 11,
      ItemTxt: "Báo cáo",
      item_icon: "menu-item-repost__icon",
      itemBg: "menu-item-repost",
      path: "/",
      heightMenu:"44px"
    },
    {
      ItemID: 12,
      ItemTxt: "Thu gọn",
      item_icon: "botton__menu",
      itemBg: "menu-item-repost",
      isbottom: true,
      heightMenu:"44px"
    },
  ],
  headerTable :[
    {
      nameColumn:"STT",
      alignment: "center",
      withBase:"",
      minWith : "50px",
      directiveTooltip: true,
      nameTooltip: "Số thứ tự",
      isResize : true
    },
    {
      nameColumn:"Mã tài sản",
      alignment: "left",
      withBase:"",
      minWith : "100px",
      directiveTooltip:false,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Tên tài sản",
      alignment: "left",
      withBase:"",
      minWith : "100px",
      directiveTooltip:false,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Loại tài sản",
      alignment: "left",
      withBase:"",
      minWith : "100px",
      directiveTooltip:false,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Bộ phận sử dụng",
      alignment: "left",
      withBase:"",
      minWith : "200px",
      directiveTooltip:false,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Số lượng",
      alignment: "right",
      withBase:"",
      minWith : "100px",
      directiveTooltip:false,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Nguyên giá",
      alignment: "right",
      withBase:"",
      minWith : "150px",
      directiveTooltip:false,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"HM/KH lũy kế",
      alignment: "right",
      withBase:"",
      minWith : "150px",
      directiveTooltip: true,
      nameTooltip: "Hao mòn khấu hao lũy kế",
      isResize : true
    },
    {
      nameColumn:"Giá trị còn lại",
      alignment: "right",
      withBase:"",
      minWith : "150px",
      directiveTooltip:false,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Trạng thái",
      alignment: "left",
      withBase:"",
      minWith : "100px",
      directiveTooltip:false,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Chức năng",
      alignment: "center The-actions header-actions",
      withBase:"100px",
      minWith : "100px",
      directiveTooltip:false,
      nameTooltip: "",
      isResize : false
    }        
  ],

  TableLicense : {
    nameTable:'license',
    stateCheckBox:true,
    statePaging:true,

  headerTableLicense:[
    {
      nameColumn:"STT",
      alignment: "center",
      withBase:"",
      minWith : "50px",
      directiveTooltip: true,
      nameTooltip: "Số thứ tự",
      isResize : true
    },
    {
      nameColumn:"Số chứng từ",
      alignment: "left",
      withBase:"",
      minWith : "100px",
      directiveTooltip: true,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Ngày chứng từ",
      alignment: "center",
      withBase:"",
      minWith : "100px",
      directiveTooltip: true,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Ngày ghi tăng",
      alignment: "center",
      withBase:"",
      minWith : "100px",
      directiveTooltip: true,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Tổng nguyên giá",
      alignment: "right",
      withBase:"",
      minWith : "100px",
      directiveTooltip: true,
      nameTooltip: "",
      isResize : true
    },
    {
      nameColumn:"Nội dung",
      alignment: "left",
      withBase:"250px",
      minWith : "150px",
      directiveTooltip: true,
      nameTooltip: "",
      isResize : true
    },
  ],
  bodyTableLicense:[
    
    {
      column:"license_code",
      alignment: "left",
      typeData:1,
      color:"#1aa4c8"
      
    },
    {
      column:"license_date",
      alignment: "center", 
      typeData:2 ,
      color:"black"    
    },
    {
      column:"increase_date",
      alignment: "center",  
      typeData:2 ,
      color:"black" 
    },
    {
      column:"total_price",
      alignment: "right", 
      typeData:3,
      color:"black"
     
    },
    {
      column:"note",
      alignment: "left", 
      typeData:1 ,
      color:"black"
     
    },
  ]
},
TableLicenseAsset : {
  stateCheckBox:false,
  statePaging:false,
  nameTable:'fixed_asset',
headerTable:[
  {
    nameColumn:"STT",
    alignment: "center",
    withBase:"",
    minWith : "50px",
    directiveTooltip: true,
    nameTooltip: "Số thứ tự",
    isResize : true
  },
  {
    nameColumn:"Mã tài sản ",
    alignment: "left",
    withBase:"",
    minWith : "100px",
    directiveTooltip: true,
    nameTooltip: "",
    isResize : true
  },
  {
    nameColumn:"Tên tài sản ",
    alignment: "left",
    withBase:"",
    minWith : "100px",
    directiveTooltip: true,
    nameTooltip: "",
    isResize : true
  },
  {
    nameColumn:"Bộ phận sử dụng",
    alignment: "left",
    withBase:"",
    minWith : "100px",
    directiveTooltip: true,
    nameTooltip: "",
    isResize : true
  },
  {
    nameColumn:"Nguyên giá ",
    alignment: "right",
    withBase:"150px",
    minWith : "100px",
    directiveTooltip: true,
    nameTooltip: "",
    isResize : true
  },
  {
    nameColumn:"Hao mòn năm",
    alignment: "right",
    withBase:"150px",
    minWith : "150px",
    directiveTooltip: true,
    nameTooltip: "",
    isResize : true
  },
  {
    nameColumn:"Giá trị còn lại",
    alignment: "right",
    withBase:"150px",
    minWith : "150px",
    directiveTooltip: true,
    nameTooltip: "",
    isResize : true
  },
],
bodyTable:[
  
  {
    column:"fixed_asset_code",
    alignment: "left",
    typeData:1,
    
    
  },
  {
    column:"fixed_asset_name",
    alignment: "left",
    typeData:1
    
  },
  {
    column:"department_name",
    alignment: "left", 
    typeData:1     
  },
  {
    column:"cost",
    alignment: "right",  
    typeData:3  
  },
  {
    column:"depreciation_value",
    alignment: "right", 
    typeData:3
   
  },
  {
    column:"value_end",
    alignment: "right", 
    typeData:3    
  },
]
},

}
  export default DataObject;