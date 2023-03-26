import BaseTooltipTable from '@/components/tooltip/BaseTooltipTable.vue'
import BaseTooltip from '@/components/tooltip/BaseTooltip.vue'
import DatePicker from 'vue-datepicker-next'
import TheButton from '@/components/button/BaseButton.vue'
import DialogMessage from "@/components/message/DialogMessage.vue";
import BaseInput from "@/components/input/BaseInput";



export const requiredComponents = [    
    {
        componentName: 'DatePicker',
        component: DatePicker,
    },
     {
        componentName: 'BaseTooltipTable',
        component: BaseTooltipTable,
    },
     {
        componentName: 'BaseTooltip',
        component: BaseTooltip,
    },
     {
        componentName: 'TheButton',
        component: TheButton,
    },
     {
        componentName: 'DialogMessage',
        component: DialogMessage,
    },
     {
        componentName: 'BaseInput',
        component: BaseInput,
    },
     
    


]

