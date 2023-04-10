const DataObject = {   
   
     optionMenu : [
    {
      ItemID: 0,
      ItemTxt: "MISA QLTS",
      item_icon: "menu-item-home__icon",
      itemBg: "menu-item-overview",
      path: "/home",
      isheader: true,
    },
    {
      ItemID: 1,
      ItemTxt: "Tổng quan",
      item_icon: "menu-item-overview__icon",
      itemBg: "menu-item-overview",
      path: "/home",
    },
    {
      ItemID: 2,
      ItemTxt: "Tài sản",
      item_icon: "menu-item-assets__icon",
      itemBg: "menu-item-assets",
      path: "/assets",
    },
    {
      ItemID: 3,
      ItemTxt: "Tài sản HT_DB",
      item_icon: "menu-item-assets--HTDB__icon",
      itemBg: "menu-item-assets--HTDB",
      path: "/login",
    },
    {
      ItemID: 4,
      ItemTxt: "Công cụ dụng cụ",
      item_icon: "menu-item-tools__icon",
      itemBg: "menu-item-tools",
      path: "/login",
    },
    {
      ItemID: 5,
      ItemTxt: "Danh mục",
      item_icon: "menu-item-catagory__icon",
      itemBg: "menu-item-catagory",
      path: "/",
    },
    {
      ItemID: 6,
      ItemTxt: "Tra cứu",
      item_icon: "menu-item-search__icon",
      itemBg: "menu-item-search",
      path: "/",
    },
    {
      ItemID: 7,
      ItemTxt: "Báo cáo",
      item_icon: "menu-item-repost__icon",
      itemBg: "menu-item-repost",
      path: "/",
    },
    {
      ItemID: 8,
      ItemTxt: "Thu gọn",
      item_icon: "botton__menu",
      itemBg: "menu-item-repost",
      isbottom: true,
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
      nameColumn:"Chức năng",
      alignment: "center The-actions header-actions",
      withBase:"100px",
      minWith : "100px",
      directiveTooltip:false,
      nameTooltip: "",
      isResize : false
    }        
  ]

}
  export default DataObject;