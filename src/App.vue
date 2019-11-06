<template>
  <div id="app">
    <router-view/>
    <Blocks />
  </div>
</template>

<script>

import { mapMutations } from 'vuex';
import { getBlocks } from '@/rest/blocks';

import Blocks from '@/components/blocks.vue';

export default {
  name: 'App',
  components: {
    Blocks,
  },
  mounted() {
    getBlocks().then(data => {
      this.setBlocks(data);
    }).catch(Err => {
      console.error(Err);
    });
  },
  methods: {
    ...mapMutations('blocks', ['setBlocks']),
  },
};
</script>


<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>
