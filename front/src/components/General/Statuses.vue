<template>
    <div class="statuses">
        <div
            v-for="status in statuses"
            :key="status"
            :style="{ backgroundColor: getTeamTaskBackground(status), 'text-shadow': theme ? '1px 1px 1px #000' : 'unset'}"
            class="status-cell"
        >
            {{ statusesNames[status] }}
        </div>
    </div>
</template>

<script>
import { statuses, statusesNames } from '@/config';
import { getTeamTaskBackground } from '@/utils/colors';
import { mapState } from 'vuex';

export default {
    data: function () {
        return {
            statuses,
            statusesNames,
            getTeamTaskBackground,
        };
    },
  computed: mapState(['theme']),
};
</script>

<style lang="scss" scoped>
.statuses {
    margin-top: 2em;
    margin-bottom: 2em;

    display: flex;
    flex-flow: row nowrap;

    & > * {
        flex: 1 1 auto;
        text-align: center;
        padding: 0.5em;
    }

    .status-cell {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
    }
}
</style>
