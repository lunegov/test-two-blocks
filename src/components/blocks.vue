<template>
  <div class="blocks">
    <div
      v-for="(b, i) in blocks"
      :key="`key_${i}`"
      :style="getSettins(b)"
      class="blocks-item"
    >
      <div class="blocks-item__top-line">
        <button
          @click.stop.prevent="openSetting(b.blockID)"
          class="blocks-item__button"
        >Настройки</button>
      </div>
      <div
        v-html="b.bText"
        class="blocks-item__text"
      />
    </div>
  </div>
</template>


<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Blocks',
  computed: {
    ...mapGetters('blocks', ['blocks']),
  },
  methods: {
    openSetting(id) {
      this.$router.push({ path: `/block/settings/${id}` });
    },
    getSettins(block) {
      const props = {
        backgroundColor: block.bColor,
      };
      if (block.settings.length) {
        block.settings.forEach(p => {
          props[p.propName] = p.fieldValue;
        });
      }

      return props;
    },
  },
};
</script>


<style lang="stylus" scoped>
.blocks
  display block
  margin 0
  padding 0
  width 100%
  max-width 100%
  overflow-x auto
  &-item
    display block
    margin-bottom 32px
    padding 8px 16px
    border 1px solid #c2c2c2
    border-radius 8px
    transition all .3s linear
    &__top-line
      display block
      text-align right
    &__button
      border 1px solid #c2c2c2
      padding 6px 12px
      border-radius 4px
      cursor pointer
    &__text
      display block
      text-align justify
      margin-top 16px
</style>
