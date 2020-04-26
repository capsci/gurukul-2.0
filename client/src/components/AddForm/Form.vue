<template>
    <v-form>
        <v-container>
            <v-row>
                <v-item-group
                    v-model="selectedSection"
                    class="shrink mr-6"
                    mandatory
                    tag="v-flex">
                    <v-item
                        v-for="section in formSections"
                        :key="section"
                        v-slot:default="{ active, toggle }">
                        <div>
                            <v-btn
                                :input-value="active"
                                icon
                                @click="toggle">
                                <v-icon>{{ section.icon }}</v-icon>
                            </v-btn>
                        </div>
                    </v-item>
                </v-item-group>
                <v-col>
                    <v-window
                    v-model="selectedSection"
                    class="elevation-1"
                    vertical>
                        <v-window-item>
                            <v-card flat>
                                <v-card-text>
                                    <v-row align="center">
                                        <strong class="title">
                                            {{ formSections.applicant.title }}
                                        </strong>
                                        <v-spacer></v-spacer>
                                        <v-icon>
                                            {{ formSections.applicant.icon }}
                                        </v-icon>
                                    </v-row>
                                    <ApplicantForm v-bind:row="row"/>
                                </v-card-text>
                            </v-card>
                        </v-window-item>
                        <v-window-item>
                            <v-card flat>
                                <v-card-text>
                                    <v-row align="center">
                                        <strong class="title">
                                            {{ formSections.universityDetails.title }}
                                        </strong>
                                        <v-spacer></v-spacer>
                                        <v-icon>
                                            {{ formSections.universityDetails.icon }}
                                        </v-icon>
                                    </v-row>
                                    <UniversityDetailsForm />
                                </v-card-text>
                            </v-card>
                        </v-window-item>
                        <v-window-item>
                            <v-card flat>
                                <v-card-text>
                                    <v-row align="center">
                                        <strong class="title">
                                            {{ formSections.referrers.title }}
                                        </strong>
                                        <v-spacer></v-spacer>
                                        <v-icon>
                                            {{ formSections.referrers.icon }}
                                        </v-icon>
                                    </v-row>
                                    <ReferrerForm />
                                    <ReferrerForm />
                                </v-card-text>
                            </v-card>
                        </v-window-item>
                        <v-window-item>
                            <v-card>
                                <v-card-text>
                                    <v-row align="center">
                                        <strong class="title">
                                            {{ formSections.previousSchool.title }}
                                        </strong>
                                        <v-spacer></v-spacer>
                                        <v-icon>
                                            {{ formSections.previousSchool.icon }}
                                        </v-icon>
                                    </v-row>
                                            <PreviousSchoolDetailsForm />
                                            <PreviousSchoolDetailsForm />
                                            <PreviousSchoolDetailsForm />
                                </v-card-text>
                            </v-card>
                        </v-window-item>
                        <v-window-item>
                            <v-card flat>
                                <v-card-text>
                                    <v-row align="center">
                                        <strong class="title">
                                            {{ formSections.writeup.title}}
                                        </strong>
                                        <v-spacer></v-spacer>
                                        <v-icon>
                                            {{ formSections.writeup.icon}}
                                        </v-icon>
                                    </v-row>
                                    <WriteupForm />
                                    <WriteupForm />
                                    <WriteupForm />
                                    <WriteupForm />
                                </v-card-text>
                            </v-card>
                        </v-window-item>
                        <v-window-item>
                            <v-card flat>
                                <v-card-text>
                                    <v-row align="center">
                                        <strong class="title">
                                            {{ formSections.additionalDocs.title }}
                                        </strong>
                                        <v-spacer></v-spacer>
                                        <v-icon>
                                            {{ formSections.additionalDocs.icon }}
                                        </v-icon>
                                    </v-row>
                                    <AddictionalDocsForm />
                                </v-card-text>
                            </v-card>
                        </v-window-item>
                    </v-window>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import ApplicantForm from './ApplicantForm';
import UniversityDetailsForm from './UniversityDetailsForm';
import ReferrerForm from './ReferrerForm';
import PreviousSchoolDetailsForm from './PreviousSchoolDetailsForm';
import WriteupForm from './WriteupForm';
import AddictionalDocsForm from './AdditionalDocsForm';

export default {
    name: "Form",
    props: ['row'],
    components: {
        ApplicantForm,
        UniversityDetailsForm,
        ReferrerForm,
        PreviousSchoolDetailsForm,
        WriteupForm,
        AddictionalDocsForm
    },
    data() {
        return {
            // unique sections
            formSections: {
                applicant: {
                    title: 'Applicant Details',
                    icon: 'mdi-file-document-edit'
                },
                universityDetails:{
                    title: 'University Details',
                    icon: 'mdi-school'
                },
                referrers: {
                    title: 'Referrers',
                    icon: 'mdi-account-tie'
                },
                previousSchool: {
                    title: 'Previous School Details',
                    icon: 'mdi-book-multiple'
                },
                writeup: {
                    title: 'Writeups',
                    icon: 'mdi-grease-pencil'
                },
                additionalDocs: {
                    title: 'Additional Documents',
                    icon: 'mdi-file-upload'
                }
            },
            selectedSection: 0,
        }
    }
}
</script>