 const MISAEnum = {
    /**kiểu của form nhập liệu 
     * @ add =  1 : thêm
     * @ update = 2 : sửa 
     * @ Replication = 2 : nhan bản 
     * */ 
    stateDialog : {
        add :1, 
        update:2 ,
        replication:3
    },
    /**kiểu của form nhập liệu 
     * @ delete =  1 : xóa
     * @ erro = 2 : cảnh báo 
     * 
     * */ 
    typeMessage:{
        delete:1,
        erro:2

    },
    /** Key combobox 
     * @ deparment =  1 : phòng ban
     * @ category = 2 : loại tài sản 
     * 
     * */ 
    typeCombobox:{
        deparment:"department",
        category:"fixed_asset_category"

    },
     /** kiểu validate
     * @ empty =  1 : để trống
     * @ cost = 2 : nguyên giá lớn hơn giá trị hao mòn
     * 
     * */ 
     typeValidate:{
        empty:1,
        cost:2

    }
    
}
export default MISAEnum;