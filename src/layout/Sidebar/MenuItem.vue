<template>
  <router-link :to="isRouter">
    <div class="menu-item" :class="{ 'menu-item__bottom': isBottom }">
      <div
        class="menu-item__all menu-item-overview"
        :class="{ menu__select: seletionItem }"
      >
        <div
          class="menu-item___icon"
          :class="{ combobox__button__right: isTypeMenu && isBottom }"
        >
        <base-tooltip position="right" :tooltipText="content" :displayTooltip="isTypeMenu && !isBottom">
        
            <div
              class="backgrsvg icon36"
              :class="positionIcon"
              v-if="isHeader"
            ></div>
            <div class="backgrsvg icon24" :class="positionIcon" v-else></div>
        </base-tooltip>
        </div>
        <div class="menu__content" v-if="!isTypeMenu">{{ content }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
import BaseTooltip from '@/components/tooltip/BaseTooltip.vue';
export default {
  components: { BaseTooltip },
  props: {
    isTypeMenu: {
      default: true,
    },
    positionIcon: {
      default: "",
    },
    content: {
      default: "",
    },
    isHeader: {
      default: false,
    },
    isBottom: {
      default: false,
    },
    seletionItem: {
      default: false,
    },
    isRouter: {
      default: "",
    },
  },
};
</script>

<style>
</style>