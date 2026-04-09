<template>
    <enso-table class="box p-0"
        id="tutorials">
        <template #placement="{ column, row }">
            <span class="tag is-info">
                {{ column.enum._get(row.placement) }}
            </span>
        </template>
    </enso-table>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: { EnsoTable },
};
</script>
