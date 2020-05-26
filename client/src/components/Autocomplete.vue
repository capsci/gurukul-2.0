<template>
    <div>
        <v-autocomplete
            v-model="select"
            :items="items"
            item-text="itemtext"
            :label="label"
            filled
            return-object>
            <div
                slot="prepend-item"
                class="grey--text">
                <!--
                    TODO: This number should reflect number of filtered options
                    {{ items.length }} available options
                -->
            </div>
            <template slot="selection" slot-scope="{ item }">
                <slot :item="item" name="selectionTemplate"></slot>
            </template>
            <template slot="item" slot-scope="{ item }">
                <slot :item="item" name="itemTemplate"></slot>
            </template>
        </v-autocomplete>
    </div>
</template>

<script>
export default {
    name: 'Autocomplete',
    props: {
        additemtext: Function,
        entries: Array,
        label: String,
        selectedItemId: String,
    },
    data: function() {
        return {
            select: null,
            search: null,
        }
    },
    computed: {
        items: function() {
            return this.entries.map(entry => {
                var itemtext = this.additemtext(entry);
                return Object.assign({}, entry, { itemtext })
            });
        }
    },
    watch: {
        search: function() {
            if (this.items.length > 0) return
        },
        select: function(val) {
            this.$emit('selectItem', val);
        }
    },
    mounted: function() {
        if (this.selectedItemId) {
            this.select = this.items
                .find(item => item._id == this.selectedItemId);
        }
    }
}
</script>

<!--
Usage:
<Autocomplete
    v-bind:entries="<ENTRIES_ARRAY>"
    v-bind:label="<LABEL_FOR_DROPDOWN>"
    v-bind:additemtext="<METHOD_TO_GENERATE_ITEM_TEXT_FOR_ENTRY>"
    v-bind:selectedItemId="<ID_OF_CURRENTLY SELECTED_ITEM>"
    @selectItem="<METHOD_TO_EMIT_SELECTED_ITEM>">
    <template slot="itemTemplate" slot-scope="{ item }">
        <DROPDOWN_ITEM_LAYOUT>
    </template>
    <template slot="selectionTemplate" slot-scope="{ item }">
        <SELECTED_ITEM_LAYOUT>
    </template>
</Autocomplete>
-->
