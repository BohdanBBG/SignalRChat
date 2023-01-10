import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { VuetifyCustomPreset } from './vuetifyPreset';

Vue.use(Vuetify);

export default new Vuetify({
    preset: VuetifyCustomPreset
});
