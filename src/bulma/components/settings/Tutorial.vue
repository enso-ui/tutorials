<template>
    <div class="level is-mobile tutorial-setting">
        <div class="level-left">
            <div class="level-item m-0 is-flex is-align-items-center">
                {{ i18n('Tutorial') }}
            </div>
        </div>
        <div class="level-right">
            <div class="level-item m-0 is-flex is-align-items-center">
                <core-tutorial>
                    <template #default="{ itemEvents }">
                        <a class="button is-small is-naked p-0 is-flex is-align-items-center is-justify-content-center"
                            v-on="itemEvents">
                            <span class="icon is-small m-0 is-flex is-align-items-center is-justify-content-center">
                                <fa :icon="faQuestion"/>
                            </span>
                        </a>
                    </template>
                </core-tutorial>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import CoreTutorial from '../../../core/components/settings/Tutorial.vue';

export default {
    name: 'Tutorial',

    components: { CoreTutorial, Fa },

    inject: ['i18n'],

    data: () => ({
        faQuestion,
    }),
};
</script>

<style lang="scss">
    @import 'driver.js/dist/driver.min.css';

    .tutorial-setting .svg-inline--fa {
        vertical-align: 0;
    }
</style>
