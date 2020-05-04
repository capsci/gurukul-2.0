<template>
    <v-toolbar
        dense
        short >
        <v-toolbar-title>Gurukul</v-toolbar-title>
        <v-spacer />
        <v-divider vertical />
        <div>
            <v-btn to="import">
                <v-icon>mdi-google-spreadsheet</v-icon>
                Import
            </v-btn>
        </div>
        <v-divider vertical />
        <div>
            <v-btn to="dashboard">
                <v-icon>mdi-tablet-dashboard</v-icon>
                Dashboard
            </v-btn>
        </div>
    </v-toolbar>
</template>
