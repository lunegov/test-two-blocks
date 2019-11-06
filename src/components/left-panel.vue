<template>
  <div class="left-panel">
    <div class="left-panel__top-line">
      <div class="left-panel__title">Настройки</div>
      <button class="left-panel__button" @click.stop.prevent="save">Сохранить</button>
      <div class="left-panel__close" @click="close">X</div>
    </div>
    <div class="left-panel__form">
      <div
        v-for="(l, i) in getSettings"
        :key="`key_${i}`"
        class="left-panel__form-item"
      >
        <label :for="`id_${l.ID}`">{{l.Name}}</label>
        <input
          v-if="(l.filedType === 'input')"
          type="number"
          min="1"
          :value="parseInt(l.fieldValue, 10)"
          :id="`id_${l.ID}`"
          @change="changeInputValue"
        />

        <select
          v-if="(l.filedType === 'select')"
          :value="l.fieldValue"
          :id="`id_${l.ID}`"
          @change="changeSelectValue"
        >
          <option value="none">Да</option>
          <option value="block">Нет</option>
        </select>
      </div>
    </div>
  </div>
</template>


<script>

import { mapGetters, mapMutations } from 'vuex';
import { saveBlocks } from '@/rest/blocks';

export default {
  name: 'LeftPanel',
  mounted() {
    this.blockID = parseInt(this.$route.params.id, 10);
  },
  data() {
    return {
      blockID: 0,
      initialSettings: [],
    };
  },
  watch: {
    getSettings(val) {
      if (val.length && this.initialSettings.length === 0) {
        this.initialSettings = val;
      }
    },
  },
  computed: {
    ...mapGetters('blocks', ['blocks']),
    getSettings: {
      get() {
        const b = this.blocks.find(el => parseInt(el.blockID, 10) === parseInt(this.blockID, 10));
        return b ? b.settings : [];
      },
      set(b) {
        this.setBlocks(this.blocks.map(el => {
          if (el.blockID === this.blockID) {
            return {
              ...el,
              settings: b,
            };
          }

          return el;
        }));
      },
    },
  },
  methods: {
    ...mapMutations('blocks', ['setBlocks']),
    close() {
      this.getSettings = this.initialSettings;
      this.$router.push({ path: '/' });
    },
    save() {
      saveBlocks(this.blocks)
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch(() => {
          this.$router.push({ path: '/' });
        });
    },
    changeInputValue(e) {
      if (!e.target.id) return;

      const updeteID = parseInt(e.target.id.split('_')[1], 10);
      this.getSettings = this.getSettings.map(el => {
        if (el.ID === updeteID) {
          return {
            ...el,
            fieldValue: `${parseInt(e.target.value, 10)}px`,
          };
        }

        return el;
      });
    },
    changeSelectValue(e) {
      if (!e.target.id) return;

      const updeteID = parseInt(e.target.id.split('_')[1], 10);
      this.getSettings = this.getSettings.map(el => {
        if (el.ID === updeteID) {
          return {
            ...el,
            fieldValue: `${e.target.value}`,
          };
        }

        return el;
      });
    },
  },
};
</script>


<style lang="stylus" scoped>
.left-panel
  display block
  position fixed
  z-index 100
  top 0
  bottom 0
  left 0
  background-color rgba(#909090, 1)
  padding 8px 16px
  &__top-line
    display flex
    width 100%
    align-items center
    justify-content space-between
  &__title
      display block
      font-size 120%
  &__button
    border 1px solid #c2c2c2
    padding 6px 12px
    border-radius 4px
    cursor pointer
    margin 0 32px
  &__close
    display block
    font-size 150%
    font-weight bold
    cursor pointer
  &__form
    display block
    margin 16px 0
    &-item
      display block
      margin-bottom 16px
      & > label, & > input, & > select
        display block
        width 100%
</style>
